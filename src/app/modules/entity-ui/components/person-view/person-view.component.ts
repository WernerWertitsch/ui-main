import {Component, OnInit} from '@angular/core';
import {PersonClientService} from "../../service/person-client.service";
import {BehaviorSubject, forkJoin, merge, Observable, of} from "rxjs";
import {Person} from "../../domain";
import {MatDialog} from "@angular/material/dialog";
import {CsvImportDialogComponent} from "../../../../shared/components/parts/csv-import/csv-import-dialog/csv-import-dialog.component";
import {combineLatest, filter, map, tap} from "rxjs/operators";
import {ScrollStrategyOptions} from "@angular/cdk/overlay";
import {PageState} from "../../../../shared/service/abstract-rest/pagable-rest-service";
import {NavOptions} from "../../../../shared/service/abstract-rest/generic-rest-service";

@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.scss']
})
export class PersonViewComponent implements OnInit {

  constructor(private personClientService: PersonClientService) {

  }


  ngOnInit(): void {
    this.personClientService.load();
  }

  clientService(): PersonClientService {
    return this.personClientService;
  }


}
