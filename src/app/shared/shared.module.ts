import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {CsvImportDialogComponent} from "./components/csv-import/csv-import-dialog/csv-import-dialog.component";
import {TinyLogComponent} from "./components/tiny-log/tiny-log.component";
import {BaseEntity} from "./domain/base-domain";
import {GenericEntityTableComponent} from './components/csv-import/csv-import-dialog/generic-entity-table/generic-entity-table.component';
import {MatIconModule} from "@angular/material/icon";
import {FileUploadModule} from "ng2-file-upload";
import {TinyLogService} from "./components/tiny-log/tiny-log.service";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { PageStateComponent } from './components/page-state/page-state.component';


@NgModule({
  declarations: [CsvImportDialogComponent, TinyLogComponent, GenericEntityTableComponent, PageStateComponent],
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
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  exports: [
    FormsModule,
    MatCardModule,
    FlexLayoutModule,
    MatInput,
    FileUploadModule,
    MatDialogModule,
    MatExpansionModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,

    TinyLogComponent,
    PageStateComponent,
    CsvImportDialogComponent
  ]
})
export class SharedModule {
}
