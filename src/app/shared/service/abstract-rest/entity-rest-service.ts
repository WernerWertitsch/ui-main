import {HttpClient} from "@angular/common/http";
import {TinyLogService} from "../../components/parts/tiny-log/tiny-log.service";
import {Person} from "../../../modules/entity-ui/domain";
import {PagableRestService, PageState} from "./pagable-rest-service";
import {BaseEntity} from "../../domain/base-domain";
import {EntityService} from "../entity-service";
import {BehaviorSubject, Observable, of} from "rxjs";

export abstract class EntityRestService<T extends BaseEntity> extends PagableRestService<T> implements EntityService<T>{
  baseUrl: string
  baseUrlFuzzy: string;
  baseUrlBulk: string;

  newEntity$: BehaviorSubject<T> = new BehaviorSubject(undefined);
  explicitFields$: BehaviorSubject<string[]> = new BehaviorSubject(undefined);
  emptyTemplateObject: any;



  constructor(private entityName: string,
              httpClient: HttpClient,
              tinyLogService: TinyLogService,
              private explicitFields?: string[],
              private ignoreFields: string[] = ["_links", "self"]) {
    super( httpClient, tinyLogService);
    this.baseUrl = `/${this.entityName}`;
    this.baseUrlFuzzy = `/${this.entityName}/search/fuzzy`;
    this.baseUrlBulk = `/${this.entityName}/bulk`;
    if(explicitFields) {
      this.explicitFields$.next(explicitFields);
    } else {
      this.pageState$.subscribe(ps => this.defineFields(ps.data));
    }
  }



  public load(searchParams?: any) {
    const pageInfo = {...this.pageState$.value.pageInfo, ...{page: 0}};
    super.nextPageState({...this.pageState$.value, ...{pageInfo: pageInfo}});
    if(!searchParams) {
      super.fetch(this.baseUrl);
    } else {
      super.fetch(this.baseUrlFuzzy, false, searchParams);
    }
  }

  public getPageTitle$(): Observable<string> {
    return of(this.entityName);
  }

  public pushBulk(entities: T[]) {
    super.import(this.baseUrlBulk, entities);
  }

  public saveEntity(entity: T, reloadList:boolean = true): void {
    this.resetNewEntity(); //might not be necessary, but new should be undefined in all cases here
    this.save(this.baseUrl, entity, reloadList);
  }

  public loadEntity(url: string): Observable<T> {
    return this.loadSingle(url);
  }

  public resetNewEntity() {
    this.newEntity$.next(undefined);
  }

  public getErrors$(): Observable<any[]> {
    return this.errs$;
  }

  public getLoadingEvents$(): Observable<string[]> {
    return this.loading$;
  }

  public getNewEntity$(): Observable<T> {
    return this.newEntity$;
  }

  public getPageState$(): Observable<PageState<T>> {
    return this.pageState$;
  };


  public getEntityFields$(): Observable<string[]> {
    return this.explicitFields$;
  }

  public newEntity(): void {
    this.newEntity$.next(this.emptyTemplateObject);
  }




  private defineFields(entities: T[]) {
    if(!entities || entities.length==0) {
     return;
    }
    if(!this.explicitFields$.value) {
        this.explicitFields$.next(Object.keys(entities[0]).filter(k => (this.ignoreFields.concat(this.ignoreFields)).filter(i => k.indexOf(i)>=0).length==0));
    }
    this.emptyTemplateObject = {};
    this.explicitFields$.value.forEach(f => Array.isArray(entities[0][f]) ? [] : this.emptyTemplateObject[f]=undefined);
  }





}
