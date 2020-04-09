import {
  GenericRestService,
  HrefNavigation,
  ListResponse,
  NavOptions,
  PagingRequest,
  PagingResponse
} from "./generic-rest-service";
import {BaseEntity} from "../../domain/base-domain";
import {map, tap} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TinyLogService} from "../../components/tiny-log/tiny-log.service";
const defaultPageInfo: PageInfo = {
  size: 50,
  totalElements: undefined,
  totalPages: undefined,
  page: 0,
  sort: undefined,
  number: undefined  //is the same as page, but as it comes in the response, maybe take it out, its not needed probably
}

/*
  A few things might seem awkawrd. Reasons:
  with REST we get back NavigationLinks ("prec", "start", "next", etc) which we can use 1:1 when paging, except when the pageSoue changes
  if we dont have navigation links (first time laod) or cant reuse them (eg when changing page size) we use the PageInfo Object
  in the pageState (which shoould procude similar paraemters to the ones in the returned navigation urls
 */
export abstract class PagableRestService<T extends BaseEntity> extends GenericRestService<T> {
  readonly defaultPageState: PageState<T>  = {
    data: undefined,
    loading: false,
    pageInfo: defaultPageInfo,
    navigation: undefined
  } as PageState<T>;

  lastListUrl: string;
  lastParameters: { [id: string]: string } = undefined;
  pageState$: BehaviorSubject<PageState<T>> = new BehaviorSubject(this.defaultPageState);


  constructor(httpClient: HttpClient, tinyLogService: TinyLogService) {
    super(httpClient, tinyLogService);
  }

  navigate(navOption: NavOptions) {
    const navUrl = this.pageState$.value.navigation[navOption.toString()];
    this.fetch(navUrl, true);
  }


  reload() {
    this.fetch(this.lastListUrl, true);
  }


  changePageSizeAndReload(size: number) {
    // first set the new size in the page object
    const pageInfo = {...this.pageState$.value.pageInfo, ...{size:size, page: 0}};
    this.nextPageState({...this.pageState$.value, ...{pageInfo: pageInfo}});
    //then fetch again, but omit the parameters from lasturl-string if there where any. As a result we need to use the lastParameters again
    this.fetch(this.lastListUrl.split("\?")[0], false, this.lastParameters);
  }


  protected fetch(url: string, omitPaging: boolean = false, parameter: { [id: string]: string } = undefined): void {
    this.lastListUrl = url;
    this.lastParameters = parameter;
    const pageState = this.pageState$.value;
    this.nextPageState(pageState, true);
    super.getListPage<T>(url, omitPaging ? undefined : this.pageState$.value.pageInfo, parameter).pipe(
      map(r => {
        return {
          pageInfo: {...pageState.pageInfo, ...r.page},
          navigation: r.navigation,
          data: r.data,
          loading: false
        } as PageState<T>
      }),
      map((p: PageState<T>) => {
        const n = {...p.pageInfo, ...{page: p.pageInfo.number}};
        return {...p, ...{pageInfo:n}} as PageState<T>
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

  protected nextLoading(loading: boolean) {
    this.nextPageState(this.pageState$.value, loading);
  }

  protected nextPageState(newPageState: PageState<T>, loading: boolean = false) {
    this.pageState$.next(this.setLoading(newPageState, loading));
  }

  private setLoading(pageState: PageState<T>, loading: boolean): PageState<T> {
    return {...pageState, ...{loading: true}};
  }

}

export interface PageInfo extends PagingResponse, PagingRequest {
}


export interface PageState<T> {
  pageInfo: PageInfo;
  navigation: HrefNavigation;
  data;
  loading: boolean;
}
