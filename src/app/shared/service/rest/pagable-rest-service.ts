import {GenericRestService, HrefNavigation, NavOptions, PagingRequest, PagingResponse} from "./generic-rest-service";
import {BaseEntity} from "../../domain/base-domain";
import {map, tap} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TinyLogService} from "../../components/tiny-log/tiny-log.service";

export abstract class PagableRestService<T extends BaseEntity> extends GenericRestService<T> {
  readonly defaultResponsePageInfo: CurrentPage = {
    size: 50,
    totalElements: undefined,
    totalPages: undefined,
    page: 0,
    sort: undefined,
    number: undefined  //is the same as page, but as it comes in the response, maybe take it out, its not needed probably
  }

  lastListUrl: string;
  pageState$: BehaviorSubject<PageState<T>> = new BehaviorSubject(undefined);


  constructor(httpClient: HttpClient, tinyLogService: TinyLogService) {
    super(httpClient, tinyLogService);
  }

  navigate(url: string, navOption: NavOptions) {
    const navUrl = this.pageState$.value.navigation[navOption.toString()];
    this.load(navUrl);
  }


  reload() {
    this.load(this.lastListUrl);
  }

  load(url: string, parameter: { [id: string]: string } = undefined): void {
    this.lastListUrl = url;
    super.getListPage<T>(url, this.pageState$.value.pageInfo, parameter).pipe(
      map(r => {
        const pageState = this.pageState$.value;
        this.nextPageState(pageState, true);
        return {
          pageInfo: {...pageState.pageInfo, ...r.page},
          navigation: r.navigation,
          data: r.data,
          loading: false
        } as PageState<T>
      })
    ).subscribe(pageState => {
      this.nextPageState(pageState);
    })
  }

  loadSingle(url: string, replaceEntityInList: boolean = true, reloadList: boolean = false): void {
    this.nextLoading(true);
    super.getSingle<T>(url).subscribe(e => {
      if (reloadList) {
        this.reload();
      } else {
        if (e && replaceEntityInList) {
          this.updatePageStatesWithEntity(e);
        }
      }

    })
  }

  save(url: string, entity: T, updateListsOnPosts: boolean = true, reloadListOnPost: boolean = true) {
    this.nextLoading(true);
    let obs = entity.id ? super.putEntity<T>(url, entity) : super.postEntity(url, entity);
    obs.subscribe(e => {
      this.nextLoading(false);
      if (entity && (!entity.id && updateListsOnPosts)) {
        this.reload();
      } else {
        if (entity && (!entity.id && reloadListOnPost)) {
          this.updatePageStatesWithEntity(entity);
        }
      }
    })
  }

  import(url: string, entities: T[]) {
    this.nextLoading(true);
    super.postEntity(url, entities)
  }

  private updatePageStatesWithEntity(newEntity: T): void {
    const pageState: PageState<T> = this.pageState$.value;
    const newState = {
      ...pageState, ...{
        data: pageState.data.map(e => (e.id === newEntity.id ? newEntity : e))
      }
    };
    this.nextPageState(newState);
  }

  // private getUrlKey(url: string) {
  //   const index = url.indexOf(this.relUrl)+this.relUrl.length;
  //   return url.substr(index);
  // }
  //
  // private getPageStateForUrl(url: string) {
  //   return this.getPageState(this.getUrlKey(url));
  // }

  // private getPageState(key: string): PageState<T> {
  //   if(!this.pageStates$[key]) {
  //     this.pageStates$[key]= new BehaviorSubject({
  //       pageInfo: {...this.defaultResponsePageInfo},
  //       navigation: undefined,
  //       data: undefined} as PageState<T>);
  //   }
  //   return this.pageStates$[key].value;
  // }

  private nextLoading(loading: boolean) {
    this.nextPageState(this.pageState$.value, loading);
  }

  private nextPageState(newPageState: PageState<T>, loading: boolean = false) {
    this.pageState$.next(this.setLoading(newPageState, loading));
  }

  private setLoading(pageState: PageState<T>, loading: boolean): PageState<T> {
    return {...pageState, ...{loading: true}};
  }

}

export interface CurrentPage extends PagingResponse, PagingRequest {
}


export class PageState<T> {
  pageInfo: CurrentPage = undefined;
  navigation: HrefNavigation = undefined;
  data: T[];
  loading: boolean = false;
}
