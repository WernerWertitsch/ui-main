import { Component, OnInit } from '@angular/core';
import {PersonClientService} from "../../service/person-client.service";
import {Observable} from "rxjs";
import {Person} from "../../domain";
import {MatDialog} from "@angular/material/dialog";
import {CsvImportDialogComponent} from "../../../../shared/csv-import/csv-import-dialog/csv-import-dialog.component";

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

  openImporter(): void {
    let dialogRef = this.dialog.open(CsvImportDialogComponent);
  }

}
