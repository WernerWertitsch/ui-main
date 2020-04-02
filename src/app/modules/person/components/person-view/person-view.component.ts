import {Component, OnInit} from '@angular/core';
import {PersonClientService} from "../../service/person-client.service";
import {BehaviorSubject, forkJoin, merge, Observable, of} from "rxjs";
import {Person} from "../../domain";
import {MatDialog} from "@angular/material/dialog";
import {CsvImportDialogComponent} from "../../../../shared/csv-import/csv-import-dialog/csv-import-dialog.component";
import {combineLatest, filter, map, tap} from "rxjs/operators";
import {ScrollStrategyOptions} from "@angular/cdk/overlay";

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
  status: string;

  personList: BehaviorSubject<Person[]> = new BehaviorSubject([]);

  constructor(private dialog: MatDialog, private clientService: PersonClientService) {
    this.clientService.watchAllPersons().subscribe(ps => {
      this.personList.next(ps);
    });
    this.errs = this.clientService.errs$;
  }


  ngOnInit(): void {
    this.loading$ = this.clientService.loading$.pipe(
      map(l => l.length>0)
    );
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

    d.forEach((p, index) => {
      setTimeout(t => {
        try {
          this.clientService.createPerson(p).pipe(
            tap(p => {
              setTimeout(t=> {
                this.progress$.next(index == d.length - 1 ? undefined : Math.round(index / d.length * 100));
              }, 0);
              // this.personList.next(this.personList.value.concat(p));
            })
          ).subscribe(p => {
            this.personList.next(this.personList.value.concat(p));
          });
        } catch (e) {
          this.clientService.errorOccurred(e);
        }
      }, index*20);
    });
    //   merge(forkJoin(all)).subscribe(
    //     (r) => {
    //
    //       this.status = "";
    //     })
    // }, 0)
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
