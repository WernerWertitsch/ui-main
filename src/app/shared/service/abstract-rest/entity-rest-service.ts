import {HttpClient} from "@angular/common/http";
import {TinyLogService} from "../../components/parts/tiny-log/tiny-log.service";
import {Person} from "../../../modules/person/domain";
import {PagableRestService, PageState} from "./pagable-rest-service";
import {BaseEntity} from "../../domain/base-domain";
import {EntityService} from "../entity-service";
import {Observable, of} from "rxjs";

export abstract class EntityRestService<T extends BaseEntity> extends PagableRestService<T> implements EntityService<T>{
  baseUrlFuzzy: string;
  baseUrlBulk: string;

  constructor(private entityName: string, httpClient: HttpClient, tinyLogService: TinyLogService) {
    super( httpClient, tinyLogService);
    this.entityName = `/${this.entityName}/search/fuzzy`;
    this.baseUrlBulk = `/${this.entityName}/bulk`;
  }

  public load(searchParams?: any) {
    const pageInfo = {...this.pageState$.value.pageInfo, ...{page: 0}};
    super.nextPageState({...this.pageState$.value, ...{pageInfo: pageInfo}});
    if(!searchParams) {
      super.fetch(this.entityName);
    } else {
      super.fetch(this.baseUrlFuzzy, false, searchParams);
    }
  }

  public getPageTitle$(): Observable<string> {
    return of(this.entityName.split("/")[this.entityName.split("/").length-1]);
  }

  public pushBulk(entities: T[]) {
    super.import(this.baseUrlBulk, entities);
  }

  public getErrors$(): Observable<any[]> {
    return this.errs$;
  }

  public getLoadingEvents$(): Observable<string[]> {
    return this.loading$;
  }

  public getPageState$(): Observable<PageState<T>> {
    return this.pageState$;
  };

}