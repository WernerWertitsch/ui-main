import {Apollo} from "apollo-angular";
import {BehaviorSubject, Observable, of} from "rxjs";
import gql from "graphql-tag";
import {catchError, map, tap} from "rxjs/operators";
import {TinyLogService} from "../tiny-log/tiny-log.service";

export abstract class AbstractGraphqlService {
  loading$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  errs$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private apollo: Apollo, private tinyLogService: TinyLogService, private maxErrs: number = 5) {
  }

  watch<T>(query: string, queryName: string, errorReturnValue: any): Observable<T> {
    this.tinyLogService.addMessage("Calling "+queryName, false);
    this.loadingEvent(true, queryName);
    return this.apollo
    .watchQuery({
      query: gql`${query}`
    }).valueChanges.pipe(
      tap(({data, loading}) =>
        this.loadingEvent(loading, queryName)),
      map(({data, loading}) => {
        return data[queryName];
      }),
      catchError(err => {
        this.errorOccurred(err);
        this.loadingEvent(false, queryName);
        return of(errorReturnValue);
      })
    )
  }

  mutation<T>(query: string, queryName: string, errorReturnValue: T): Observable<T> {
    this.loadingEvent(true, queryName);
    return this.apollo.mutate({
      mutation: gql`${query}`
    }).pipe(
      tap(r =>
        this.loadingEvent(false, queryName)),
      map(r =>
        r.data[queryName] as T),
      catchError(err => {
        this.errorOccurred(err);
        this.loadingEvent(false, queryName);
        return of(errorReturnValue);
      }));
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
