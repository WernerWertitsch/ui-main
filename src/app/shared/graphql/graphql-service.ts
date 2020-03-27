import {Apollo} from "apollo-angular";
import {BehaviorSubject, Observable} from "rxjs";
import gql from "graphql-tag";
import {catchError, map, tap} from "rxjs/operators";

export abstract class AbstractGraphqlService {
  loading: BehaviorSubject<string[]> = new BehaviorSubject([]);
  errs: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private apollo: Apollo, private maxErrs: number = 5) { }

  watch<T>(query: string, queryName: string, errorReturnValue: any): Observable<T> {
    return this.apollo
    .watchQuery({
      query: gql`${query}`
    }).valueChanges.pipe(
      tap(({ data, loading }) => this.loadingEvent(loading, queryName)),
      map(({ data, loading }) => {
        return data[queryName];
      }),
      catchError(err => {
        this.errorOccurred(err);
        return errorReturnValue;
      })
    )
  }

  private loadingEvent(loading: boolean, logName: string) {
    const l = this.loading.getValue();
    if(loading) {
      if(l.indexOf(logName) < 0) {
        l.push(logName);
      }
    } else {
      this.removeFromLoading(logName);
    }
  }

  errorOccurred(err: any) {
    const errs = this.errs.getValue();
    this.errs.next([...[err], ...(errs.length >= this.maxErrs ? errs.slice(0, errs.length-1) : errs)]);
  }

  private removeFromLoading(process: string) {
    const l = this.loading.getValue();
    let index = l.indexOf(process);
    if(index>=0) {
      this.loading.next(l.slice(index, 1));
    }
  }
}
