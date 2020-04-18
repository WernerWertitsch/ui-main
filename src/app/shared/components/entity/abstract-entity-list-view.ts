import { Observable} from "rxjs";
import {PageState} from "../../service/abstract-rest/pagable-rest-service";
import {Person} from "../../../modules/person/domain";
import {map} from "rxjs/operators";
import {NavOptions} from "../../service/abstract-rest/generic-rest-service";
import {EntityService} from "../../service/entity-service";
import {Input, OnInit} from "@angular/core";

export class AbstractEntityListView<T> implements OnInit {

  // showImporter: boolean = false;
  @Input()
  entityService: EntityService<T>;

  @Input()
  fullTextSearchFieldNames: any = {};

  errs: Observable<any>;
  loading$: Observable<boolean>;
  pageState$: Observable<PageState<Person>>;
  progress$: Observable<number>;
  title$: Observable<string>;

  constructor() {}

  ngOnInit(): void {
    this.pageState$ = this.entityService.getPageState$();
    this.errs = this.entityService.getErrors$();
    this.title$ = this.entityService.getPageTitle$();
    this.loading$ = this.entityService.getLoadingEvents$().pipe(
      map(l => l.length>0)
    );
  }

  import(data: { filtered: T[], all: T[] }) {
    const all: Observable<Person>[] = [];
    const d = data.filtered ? data.filtered : data.all;
    // d.map(p => {
    //   this.clientService.createPerson(p)
    // })
    this.entityService.pushBulk(d);
  }

  load() {
    this.loadEvent(undefined);
  }

  loadEvent(filter: string) {
    let param;
    if(filter && this.fullTextSearchFieldNames) {
      param = {};
      for(let k of this.fullTextSearchFieldNames) {
        param[k] = filter;
      }
    }
    this.entityService.load(param);
  }

  navigationEvent(navOption: NavOptions) {
    this.entityService.navigate(navOption);
  }

  pageSizeEvent(newPageSize: number) {
    this.entityService.changePageSizeAndReload(newPageSize);
  }

  // openImporter(): void {
  //   let dialogRef = this.dialog.open(CsvImportDialogComponent, {
  //     width: "90%",
  //     height: "80%"
  //   });
  //   dialogRef.afterClosed().pipe(
  //     filter(ps =>
  //       ps != undefined && ps.length > 0))
  //     .subscribe(p =>
  //       this.import(p))
  // }
}
