import {GenericRestService, HrefNavigation, NavOptions, PagingRequest, PagingResponse} from "./generic-rest-service";
import {BaseEntity} from "../domain/base-domain";
import {map, tap} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TinyLogService} from "../tiny-log/tiny-log.service";

export abstract class NavigatableRestService<T extends BaseEntity> extends GenericRestService<T> {
  readonly defaultResponsePageInfo: CurrentPage = {
    size: 50,
    totalElements: undefined,
    totalPages: undefined,
    page: 0,
    sort: undefined,
    number: undefined  //is the same as page, but as it comes in the response, maybe take it out, its not needed probably
  }



  pageStates$: {[id:string]: BehaviorSubject<PageState<T>>} = {};

  constructor(private relUrl: string, httpClient: HttpClient, tinyLogService: TinyLogService) {
    super(httpClient, tinyLogService);
  }

  navigate(url: string, navOption: NavOptions) {
    const key = this.getUrlKey(url);
    const navUrl = this.getPageState(key).navigation[navOption.toString()];
    this.load(navUrl);
  }

  load(url: string, parameter: {[id:string]:string} = undefined): void {
    const key = this.getUrlKey(url);
     super.getListPage<T>(url, this.getPageState(key).pageInfo, parameter).pipe(
       map(r => {
         const pageState = this.getPageState(key);
          this.nextPageState(key, pageState, true);
         return {
           pageInfo: {...pageState.pageInfo, ...r.page},
           navigation: r.navigation,
           data: r.data,
           loading: false
        } as PageState<T>
       })
     ).subscribe(pageState => {
       this.nextPageState(key, pageState);
     })
  }

  loadSingle(url: string, updateList: boolean = true): void {
    const key = this.getUrlKey(url);
    this.nextLoading(key, true);
    super.getSingle<T>(url).subscribe(e => {
      if(e && updateList) {
        this.updatePageStatesWithEntity(e);
      }
    })
  }

  save(url: string, entity: T,  updateListsOnPosts: boolean = true, updateListsOnPut: boolean = false) {
    const key = this.getUrlKey(url);
    this.nextLoading(key, true);
    let obs = entity.id ? super.putEntity<T>(url, entity) : super.postEntity(url, entity);
      obs.subscribe(e => {
        this.nextLoading(key, false);
        if(entity && (entity.id && updateListsOnPut || !entity.id && updateListsOnPosts)) {
          this.updatePageStatesWithEntity(entity);
        }
      })
  }

  protected updatePageStatesWithEntity(newEntity: T): void {
    for (let key in this.pageStates$) {
      const pageState: PageState<T> = this.getPageState(key);
      const state =  this.pageStates$[key].value;
      const newState = {...state, ...{
          data: state.data.map(e => (e.id === newEntity.id ? newEntity : e))
        }};
      this.nextPageState(key, newState);
    }
  }

  protected getUrlKey(url: string) {
    const index = url.indexOf(this.relUrl)+this.relUrl.length;
    return url.substr(index);
  }



  protected getPageState(key: string): PageState<T> {
    if(!this.pageStates$[key]) {
      this.pageStates$[key]= new BehaviorSubject({
        pageInfo: {...this.defaultResponsePageInfo},
        navigation: undefined,
        data: undefined} as PageState<T>);
    }
    return this.pageStates$[key].value;
  }

  private nextLoading(key: string, loading: boolean) {
    this.nextPageState(key, this.pageStates$[key].value, loading);
  }

  private nextPageState(key: string, newPageState: PageState<T>, loading: boolean = false) {
    this.pageStates$[key].next(this.setLoading(newPageState, loading));
  }

  private setLoading(pageState: PageState<T>, loading: boolean): PageState<T> {
    return {...pageState, ...{loading: true}};
  }

}

export interface CurrentPage extends PagingResponse, PagingRequest {
}



class PageState<T> {
  pageInfo: CurrentPage = undefined;
  navigation: HrefNavigation = undefined;
  data: T[];
  loading: boolean = false;
}
