import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule} from "@angular/material/card";
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {CsvImportDialogComponent} from "./csv-import/csv-import-dialog/csv-import-dialog.component";
import {TinyLogComponent} from "./tiny-log/tiny-log.component";
import {BaseEntity} from "./domain/base-domain";
import { GenericEntityTableComponent } from './csv-import/csv-import-dialog/generic-entity-table/generic-entity-table.component';
import {MatIconModule} from "@angular/material/icon";
import {FileUploadModule} from "ng2-file-upload";
import {TinyLogService} from "./tiny-log/tiny-log.service";


@NgModule({
  declarations: [CsvImportDialogComponent, TinyLogComponent, GenericEntityTableComponent],
  providers: [TinyLogService],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    FlexLayoutModule,
    MatInputModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    FileUploadModule,
  ],
  exports: [
    FormsModule,
    MatCardModule,
    FlexLayoutModule,
    MatInput,
    FileUploadModule,
    MatDialogModule
  ]
})
export class SharedModule { }
