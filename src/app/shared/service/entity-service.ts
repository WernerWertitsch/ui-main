import {PageState} from "./abstract-rest/pagable-rest-service";
import {BehaviorSubject, Observable} from "rxjs";
import {NavOptions} from "./abstract-rest/generic-rest-service";

export interface EntityService<T> {
  getErrors$(): Observable<any[]>;
  getLoadingEvents$(): Observable<string[]>;
  getPageState$(): Observable<PageState<T>>;
  getPageTitle$(): Observable<string>;
  getEntityFields$(): Observable<string[]>;
  getNewEntity$(): Observable<T>;

  newEntity(): void;
  resetNewEntity(): void;
  pushBulk(newEntities: T[]): void;
  load(searchParams?: any): void;
  saveEntity(entity: T): void;
  navigate(navOption: NavOptions): void;
  changePageSizeAndReload(size: number);
}
