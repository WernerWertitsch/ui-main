import {Apollo} from "apollo-angular";
import {BehaviorSubject, Observable, of} from "rxjs";
import gql from "graphql-tag";
import {catchError, map, tap} from "rxjs/operators";

export abstract class AbstractGraphqlService {
  loading: BehaviorSubject<string[]> = new BehaviorSubject([]);
  errs: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private apollo: Apollo, private maxErrs: number = 5) {
  }

  watch<T>(query: string, queryName: string, errorReturnValue: any): Observable<T> {
    this.loadingEvent(true, queryName);
    return this.apollo
    .watchQuery({
      query: gql`${query}`
    }).valueChanges.pipe(
      tap(({data, loading}) => this.loadingEvent(loading, queryName)),
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
    return this.apollo.mutate({
      mutation: gql`${query}`
    }).pipe(
      tap(r => this.loadingEvent(false, queryName)),
      map(r =>
        r.data[queryName] as T),
      catchError(err => {
        this.errorOccurred(err);
        this.loadingEvent(false, queryName);
        return of(errorReturnValue);
      }));
  }

  private loadingEvent(loading: boolean, logName: string) {
    const l = this.loading.getValue();
    if (loading) {
      if (l.indexOf(logName) < 0) {
        l.push(logName);
      }
      this.loading.next(l);   //DONNERSTAG -> SET TIMEOUT HIER, oder warum geht das nicht?
    } else {
      this.removeFromLoading(logName);
    }
  }

  errorOccurred(err: any) {
    const errs = this.errs.getValue();
    this.errs.next([...[err], ...(errs.length >= this.maxErrs ? errs.slice(0, errs.length - 1) : errs)]);
  }

  private removeFromLoading(process: string) {
    const l = this.loading.getValue();
    let index = l.indexOf(process);
    if (index >= 0) {
      this.loading.next(l.slice(index, 1));
    }
  }
}
