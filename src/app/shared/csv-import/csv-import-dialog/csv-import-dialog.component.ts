import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';
import {BaseEntity} from "../../domain/base-domain";
import {Importer, ImportProgress} from "../importer";
import {TinyLogService} from "../../tiny-log/tiny-log.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FileUploader} from "ng2-file-upload";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-csv-import',
  templateUrl: './csv-import-dialog.component.html',
  styleUrls: ['./csv-import-dialog.component.scss']
})
export class CsvImportDialogComponent<T extends BaseEntity> implements OnInit {
  @Output()
  dataChosen: EventEmitter<{filtered: T[], all: T[]}> = new EventEmitter();

  @Input()
  forcedArrayFields: string[] = [];

  importProgress$: Observable<number>;


  fileList: File[];
  public uploader:FileUploader = new FileUploader({url: 'htt://orf.at'});
  currentEntities: BehaviorSubject<T[]> = new BehaviorSubject(undefined);
  filteredEntities: T[];
  firstLoadHappened = false;
  delimiter = "";
  importer: Importer<any>;

  hasBaseDropZoneOver: boolean = false;


  constructor(private tinyLogService: TinyLogService) {

  }


  ngOnInit() {
    this.importer = new Importer(this.tinyLogService);
    this.importProgress$ = this.importer.progress.pipe(
      map(p => p==undefined? undefined : Math.round(p.percentage))
    );

    this.importProgress$.subscribe( e => {
      console.log(e);
    });
    this.delimiter = this.importer.delimiter;

    //TODO - Alle these layers of subjects should not be necessary..but when I hand over the subject of the importer nothing happens on next
    // this.currentEntities = this.importer.objects;

    this.importer.objects.subscribe( (entities ) => {
        this.firstLoadHappened=true;
        this.currentEntities.next(entities);
    });

    this.importProgress$.subscribe(p => {
      console.log(p);
    })
  }

  entitiesFilteredInTable($event: T[]) {
    this.filteredEntities = $event;
  }

  fileChosen($fileEvent: any) {
    if($fileEvent) {
      this.fileList = [$fileEvent[0]];
      this.parseFile();
    }

  }

  parseFile() {
    this.currentEntities.next(undefined);
    if(!this.fileList) {
      console.log("=======> NO FILE WAS SELECTED");
      return;
    }
    this.importer.delimiter = this.delimiter;
    for(let i=0; i<this.fileList.length; i++) {
      let file: File = this.fileList[i];
      this.importer.load(file, this.forcedArrayFields);
    }
  }

  fileOverBase($event) {
    this.hasBaseDropZoneOver = $event;
  }

  importFilterChanged(entities: T[]) {
    this.filteredEntities = entities;
  }

  // cancel(): void {
  //   this.currentEntities.next(undefined);
  // }

  confirmed(): void {
    //hier evtl doch this.currentEntites.subscribe
    this.dataChosen.emit({filtered: this.filteredEntities, all: this.currentEntities.value});
    // this.dialogRef.close(this.currentEntities.value);
  }

}
