import {Component, OnInit} from '@angular/core';
import {PersonClientService} from "../../service/person-client.service";
import {BehaviorSubject, forkJoin, merge, Observable, of} from "rxjs";
import {Person} from "../../domain";
import {MatDialog} from "@angular/material/dialog";
import {CsvImportDialogComponent} from "../../../../shared/csv-import/csv-import-dialog/csv-import-dialog.component";
import {combineLatest, filter} from "rxjs/operators";
import {ScrollStrategyOptions} from "@angular/cdk/overlay";

@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.scss']
})
export class PersonViewComponent implements OnInit {

  //TODO Hier behavioursubject machen, dann schauen warum das mapping des mutation return objects nicht funktioniert

  showImporter: boolean=false;
  errs: Observable<any>;
  progress$: BehaviorSubject<number> = new BehaviorSubject<number>(undefined);
  loading$: Observable<string[]>;
  status: string;

  personList: BehaviorSubject<Person[]> = new BehaviorSubject([]);

  constructor(private dialog: MatDialog, private clientService: PersonClientService) {
      this.clientService.watchAllPersons().subscribe(ps => {
        this.personList.next(ps);
      });
      this.errs = this.clientService.errs;
  }


  ngOnInit(): void {
    this.loading$ = this.clientService.loading;
  }

  import(data: {filtered: Person[], all: Person[]}) {
    const all: Observable<Person>[] = [];
    const d = data.filtered ? data.filtered : data.all;
    this.status = "Pushing imported to Server";
    d.forEach((p, index) => {
      try {
        setTimeout(t => {
          if(index==d.length-1) {
            this.progress$.next(undefined);
          } else {
            this.progress$.next(Math.round(index/d.length*100));
          }
        }, 0);
        all.push(this.clientService.createPerson(p));
      } catch (e) {
        this.clientService.errorOccurred(e);
      }

    });
    merge(forkJoin(all)).subscribe(
      (r) => {
          this.personList.next(r.concat(this.personList.value));
          this.status = "";
      })
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
