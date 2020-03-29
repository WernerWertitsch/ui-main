import {Component, OnInit} from '@angular/core';
import {PersonClientService} from "../../service/person-client.service";
import {forkJoin, merge, Observable, of} from "rxjs";
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

  personList: Observable<Person[]>;

  constructor(private dialog: MatDialog, private clientService: PersonClientService) {
    this.personList = this.clientService.watchAllPersons();
  }


  ngOnInit(): void {

  }

  import(persons: Person[]) {
    const all: Observable<Person>[] = [];
    persons.forEach(p => {
      all.push(this.clientService.createPerson(p));
    });
    combineLatest(forkJoin(all), this.personList),
      ([imported, original]: [Person[], Person[]]) => {
        this.personList = of(imported.concat(original));
      }
  }

  openImporter(): void {
    let dialogRef = this.dialog.open(CsvImportDialogComponent, {
      width: '80%'
    });
    dialogRef.afterClosed().pipe(
      filter(ps =>
        ps != undefined && ps.length > 0))
      .subscribe(p =>
        import(p))
  }

}
