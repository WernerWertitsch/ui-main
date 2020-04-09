import {Component, OnInit} from '@angular/core';
import {PersonClientService} from "../../service/person-client.service";
import {BehaviorSubject, forkJoin, merge, Observable, of} from "rxjs";
import {Person} from "../../domain";
import {MatDialog} from "@angular/material/dialog";
import {CsvImportDialogComponent} from "../../../../shared/components/csv-import/csv-import-dialog/csv-import-dialog.component";
import {combineLatest, filter, map, tap} from "rxjs/operators";
import {ScrollStrategyOptions} from "@angular/cdk/overlay";
import {PageState} from "../../../../shared/service/rest/pagable-rest-service";
import {NavOptions} from "../../../../shared/service/rest/generic-rest-service";

@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.scss']
})
export class PersonViewComponent implements OnInit {

  //TODO Hier behavioursubject machen, dann schauen warum das mapping des mutation return objects nicht funktioniert

  showImporter: boolean = false;
  errs: Observable<any>;
  progress$: BehaviorSubject<number> = new BehaviorSubject<number>(undefined);
  loading$: Observable<boolean>;
  pageState$: Observable<PageState<Person>>;
  status: string;
  currentFilter: string;


  constructor(private dialog: MatDialog, private clientService: PersonClientService) {
    this.pageState$ = this.clientService.pageState$;
    this.errs = this.clientService.errs$;
  }


  ngOnInit(): void {
    this.loading$ = this.clientService.loading$.pipe(
      map(l => l.length>0)
    );

    // the actual Loading will be triggered by the first filter declaration (empty string)

    // this.load();
    // this.loading$.subscribe(x =>
    //   console.log(x));
  }

  import(data: { filtered: Person[], all: Person[] }) {
    const all: Observable<Person>[] = [];
    const d = data.filtered ? data.filtered : data.all;
    this.status = "Pushing imported to Server";
    // d.map(p => {
    //   this.clientService.createPerson(p)
    // })
    this.clientService.pushBulk(d);
  }

  load() {
    this.loadEvent('');
  }

  loadEvent(filter: string) {
    this.currentFilter = filter;
    this.clientService.load(this.currentFilter);
  }

  navigationEvent(navOption: NavOptions) {
    this.clientService.navigate(navOption);
  }

  pageSizeEvent(newPageSize: number) {
    this.clientService.changePageSizeAndReload(newPageSize);
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
