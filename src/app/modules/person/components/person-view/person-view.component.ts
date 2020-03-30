import {Component, OnInit} from '@angular/core';
import {PersonClientService} from "../../service/person-client.service";
import {BehaviorSubject, forkJoin, merge, Observable, of} from "rxjs";
import {Person} from "../../domain";
import {MatDialog} from "@angular/material/dialog";
import {CsvImportDialogComponent} from "../../../../shared/csv-import/csv-import-dialog/csv-import-dialog.component";
import {combineLatest, filter} from "rxjs/operators";

@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.scss']
})
export class PersonViewComponent implements OnInit {

  //TODO Hier behavioursubject machen, dann schauen warum das mapping des mutation return objects nicht funktioniert



  personList: BehaviorSubject<Person[]> = new BehaviorSubject([]);

  constructor(private dialog: MatDialog, private clientService: PersonClientService) {
      this.clientService.watchAllPersons().subscribe(ps => {
        this.personList.next(ps);
      });
  }


  ngOnInit(): void {

  }

  import(persons: Person[]) {
    const all: Observable<Person>[] = [];
    persons.forEach(p => {
      all.push(this.clientService.createPerson(p));
    });
    merge(forkJoin(all)).subscribe(
      (r) => {
          this.personList.next(r.concat(this.personList.value));
      })
  }

  openImporter(): void {
    let dialogRef = this.dialog.open(CsvImportDialogComponent, {
      width: '80%'
    });
    dialogRef.afterClosed().pipe(
      filter(ps =>
        ps != undefined && ps.length > 0))
      .subscribe(p =>
        this.import(p))
  }

}
