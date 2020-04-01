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

  personList: BehaviorSubject<Person[]> = new BehaviorSubject([]);

  constructor(private dialog: MatDialog, private clientService: PersonClientService) {
      this.clientService.watchAllPersons().subscribe(ps => {
        this.personList.next(ps);
      });
  }


  ngOnInit(): void {

  }

  import(data: {filtered: Person[], all: Person[]}) {
    const all: Observable<Person>[] = [];
    (data.filtered ? data.filtered : data.all).forEach(p => {
      all.push(this.clientService.createPerson(p));
    });
    merge(forkJoin(all)).subscribe(
      (r) => {
          this.personList.next(r.concat(this.personList.value));
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
