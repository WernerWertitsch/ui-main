import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {TinyLogService} from "../../components/parts/tiny-log/tiny-log.service";
import {HttpClient} from "@angular/common/http";
import {BaseEntity} from "../../domain/base-domain";

export abstract class GenericRestService<T extends BaseEntity> {
  loading$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  errs$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  // lastListUrl: string;

  constructor(private httpClient: HttpClient, private tinyLogService: TinyLogService, private maxErrs: number = 5) {
  }

  public getSingle<T>(url: string, errorReturnValue: any = undefined): Observable<T> {
    this.tinyLogService.addMessage("GET "+url, false);
    const eventName="GET"+url;
    this.loadingEvent(true, eventName);
    return this.httpClient.get(url).pipe(
      tap(r =>
        this.loadingEvent(false, eventName)),
      map((r) => {
        if(r['_embedded']) { //List
          throw new Error("Retrieved List but expected a single entity:" +url)
        }
        return r as T;
      }),
      catchError(err => {
        this.errorOccurred(err);
        this.loadingEvent(false, eventName);
        return of(errorReturnValue);
      })
    )
  }


  protected getListPageFromCompleteUrl(url: string): Observable<ListResponse<T>> {
    return this.getListPage(url);
  }

  protected getListPage<T>(url: string, paging: PagingRequest = undefined,
             parameters: {[id:string]:string} = undefined,
             errorReturnValue=[]): Observable<ListResponse<T>> {
    this.tinyLogService.addMessage("(list) GET "+url, false);
    const finalUrl = this.getFinalUrl(url, paging, parameters);
    // this.lastListUrl = finalUrl;
    const eventName="(list)GET"+finalUrl;
    this.loadingEvent(true, eventName);
    return this.httpClient.get(finalUrl).pipe(
      tap(r =>
        this.loadingEvent(false, eventName)),
      map(r  => {
        if(!r['_embedded']) { //List
          throw new Error("Expected List for URL but no list was embedded:"+url)
        }
        const listKey = Object.keys(r['_embedded'])[0];
        if(!listKey) {
          throw new Error("Response was invalid, _embedded was present, but no entity list")
        }
        return {
          data: r['_embedded'][listKey].map(t => {
            return {...t, ...{self: this.selfLink(t)}}}) as T[],
          page: r['page'] as PagingResponse,
          navigation: r['_links'] as HrefNavigation
        } as ListResponse<T>;
      }),
      //remove the basepath (eg "localhost:8080/", we dont need it here TODO check if we might need to without proxy.conf
      map((p: ListResponse<T>) => {
        const n = p.navigation;
        const ret = {}
        for (let pKey in p.navigation) {
          const href = p.navigation[pKey].href;
          const start = href.indexOf(url);
          //we use the original url to determine where (eg) "localhost:8080/ends", but to compare we need to remove the parameters, thatshhy the "split"
          ret[pKey] = href.substr(href.indexOf(url.split("\?")[0]));
        }
        return {...p, ...{navigation: ret}} as ListResponse<T>;
      }),
      catchError(err => {
        this.errorOccurred(err);
        this.loadingEvent(false, eventName);
        return of({
          data: errorReturnValue,
          page: undefined,
          navigation: undefined
        } as ListResponse<T>);
      })
    )
  }

  protected postEntity<T>(url: string, entity: T | T[]): Observable<T> {
    const eventName="POST"+url;
    return this.httpClient.post(url, entity).pipe(
      map((e: T) => {
        return {...e, ...{self: this.selfLink(e)}} as T
        }),
      catchError(err => {
        this.errorOccurred(err);
        this.loadingEvent(false, eventName);
        return of(undefined)
      })
    )
  }

  protected putEntity<T>(url: string, entity: T | T[]): Observable<T> {
    const eventName="PUT"+url;
    return this.httpClient.put(url, entity).pipe(
      map((e: T) => {
        return {...e, ...{self: this.selfLink(e)}} as T
      }),
      catchError(err => {
        this.errorOccurred(err);
        this.loadingEvent(false, eventName);
        return of(undefined)
      })
    )
  }

  protected deleteEntity<T>(url: string): Observable<boolean> {
    const eventName="DELETE"+url;
    return this.httpClient.delete(url).pipe(
      map((e: T) => true),
      catchError(err => {
        this.errorOccurred(err);
        this.loadingEvent(false, eventName);
        return of(false)
      })
    )
  }

  private selfLink(ent: any): string {
    // return ent['_links']['self']['href'];
    try {
      return ent._links.self.href;
    } catch (e) {
      return "ERR-NO-SELF-LINK"
    }
  }

//sort string should be "firstname&firstname.desc"
  private getFinalUrl(url: string, paging: PagingRequest, parameters: {[id: string]: string}):string {
    if(!paging && !parameters) {
      return url;
    }
    const withPaging =
      paging ?
      `${url}?page=${paging.page}&size=${paging.size}${paging.sort ? '&sort='+paging.sort : ''}`
      : url;
    if(parameters) {
      const paramsAsString =
        `${!paging ? '?' : '&'}` +
        Object.keys(parameters).map((k, index) =>
          `${k}=${parameters[k]}`).join('&');
      return `${withPaging}${paramsAsString}`
    }
    return withPaging;
  }



  private loadingEvent(loading: boolean, logName: string) {
    this.tinyLogService.addMessage(("Event: " +  (loading?"Started ":"Finished ") + logName), false);
    setTimeout(t=> {
      const l = this.loading$.getValue();
      if (loading) {
        // if (l.indexOf(logName) < 0) {
          l.push(logName);
        // }
        this.loading$.next(l);   //DONNERSTAG -> SET TIMEOUT HIER, oder warum geht das nicht?
      } else {
        this.removeFromLoading(logName);
      }
    }, 0);
  }

  protected errorOccurred(err: any) {
    this.tinyLogService.addMessage(err.message, true);
    console.log(err);
    const errs = this.errs$.getValue();
    this.errs$.next([...[err], ...(errs.length >= this.maxErrs ? errs.slice(0, errs.length - 1) : errs)]);
  }

  private removeFromLoading(process: string) {
    const l = this.loading$.getValue();
    let index = l.indexOf(process);
    if(!l || l.length<2) {
      this.loading$.next([]);
      return;
    }

    if (index >= 0) {
      l.splice(index, index+1);
      this.loading$.next(l);
    }
  }
}

// export? proceted possible?
export interface HrefNavigation {
  first: string;
  prev: string;
  next: string;
  last: string;
}

export interface PagingResponse {
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}

export interface PagingRequest {
  page: number;
  size: number;
  sort: string;
}

export interface ListResponse<T> {
  data: T[];
  page: PagingResponse;
  navigation: HrefNavigation;
}

export enum NavOptions {
  first= "first",
  prev = "prev",
  next = "next",
  last = "last"
}
