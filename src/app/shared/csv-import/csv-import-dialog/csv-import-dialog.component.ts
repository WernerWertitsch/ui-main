import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';
import {BaseEntity} from "../../domain/base-domain";
import {Importer} from "../importer";
import {TinyLogService} from "../../tiny-log/tiny-log.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-filedialog',
  templateUrl: './csv-import-dialog.component.html',
  styleUrls: ['./csv-import-dialog.component.css']
})
export class CsvImportDialogComponent<T extends BaseEntity> implements OnInit {
  fileList: File[];
  currentEntities: Subject<BaseEntity[]> = new ReplaySubject();
  firstLoadHappened = false;
  delimiter = "";
  importer: Importer<any>;

  constructor(private tinyLogService: TinyLogService,
              public dialogRef: MatDialogRef<CsvImportDialogComponent<any>>,
  @Inject(MAT_DIALOG_DATA) public type: string) {

  }



  ngOnInit() {
    this.importer = new Importer(this.tinyLogService);
    this.delimiter = this.importer.delimiter;

    //TODO - Alle these layers of subjects should not be necessary..but when I hand over the subject of the importer nothing happens on next
    // this.currentEntities = this.importer.objects;

    this.importer.objects.subscribe( (entities ) => {
        this.firstLoadHappened=true;
        this.currentEntities.next(entities);
    });
  }

  fileChosen($fileEvent: any) {
    this.fileList = $fileEvent.currentFiles;
    this.parseFile();
  }

  parseFile() {
    if(!this.fileList) {
      console.log("=======> NO FILE WAS SELECTED");
      return;
    }
    this.importer.delimiter = this.delimiter;
    for(let i=0; i<this.fileList.length; i++) {
      let file: File = this.fileList[i];
      this.importer.load(file);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  confirmed(): void {
    //hier evtl doch this.currentEntites.subscribe
    this.currentEntities.subscribe((entities) => {
        this.dialogRef.close(entities);
    });
  }

}
