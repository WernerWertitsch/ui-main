import {Apollo} from "apollo-angular";
import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {TinyLogService} from "../../components/tiny-log/tiny-log.service";
import {HttpClient} from "@angular/common/http";
import {BaseEntity} from "../../domain/base-domain";

export abstract class GenericRestService<T extends BaseEntity> {
  loading$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  errs$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  // lastListUrl: string;

  constructor(private httpClient: HttpClient, private tinyLogService: TinyLogService, private maxErrs: number = 5) {
  }

  getSingle<T>(url: string, errorReturnValue: any = undefined): Observable<T> {
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


  getListPageFromCompleteUrl(url: string): Observable<ListResponse<T>> {
    return this.getListPage(url);
  }

  getListPage<T>(url: string, paging: PagingRequest = undefined,
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
        return {
          data: r['_embedded'].map(t => {return {...t, ...{self: this.selfLink(t)}}}) as T[],
          page: r['page'] as PagingResponse,
          navigation: r['_links'] as HrefNavigation
        } as ListResponse<T>;
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

  postEntity<T>(url: string, entity: T | T[]): Observable<T> {
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

  putEntity<T>(url: string, entity: T | T[]): Observable<T> {
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

  deleteEntity<T>(url: string): Observable<boolean> {
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
    const withPaging = paging ? `${url}?sort=${paging.sort}&page=${paging.page}&size=${paging.size}` : url;
    if(parameters) {
      const paramsAsString = Object.keys(parameters).map((k, index) =>
        `${index==0 && !paging ? '?' : '&'}${parameters[k]}`);
      return `withPaging&${paramsAsString}`
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

  errorOccurred(err: any) {
    this.tinyLogService.addMessage(err.message, true);
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
  prev = "prec",
  next = "next",
  last = "last"
}
