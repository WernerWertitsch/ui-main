import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {CsvImportDialogComponent} from "./components/parts/csv-import/csv-import-dialog/csv-import-dialog.component";
import {TinyLogComponent} from "./components/parts/tiny-log/tiny-log.component";
import {BaseEntity} from "./domain/base-domain";
import {GenericEntityTableComponent} from './components/parts/csv-import/csv-import-dialog/generic-entity-table/generic-entity-table.component';
import {MatIconModule} from "@angular/material/icon";
import {FileUploadModule} from "ng2-file-upload";
import {TinyLogService} from "./components/parts/tiny-log/tiny-log.service";
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
import { PageNavigationComponent } from './components/parts/page-navigation/page-navigation.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ListNavigationComponent } from './components/parts/list-navigation/list-navigation.component';
import { FilterFieldComponent } from './components/parts/filter-field/filter-field.component';
import { ListHeader } from './components/parts/list-header/list-header.component';
import { EntityListFrameComponent } from './components/entity/entity-list-frame/entity-list-frame.component';
import { PureEntityListComponent } from './components/parts/pure-entity-list/pure-entity-list.component';
import { PureEntityTableComponent } from './components/parts/pure-entity-table/pure-entity-table.component';


@NgModule({
  declarations: [CsvImportDialogComponent, TinyLogComponent, GenericEntityTableComponent, PageNavigationComponent, ListNavigationComponent, FilterFieldComponent, ListHeader, EntityListFrameComponent, PureEntityListComponent, PureEntityTableComponent],
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
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatSnackBarModule
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
        BrowserAnimationsModule,
        TinyLogComponent,
        PageNavigationComponent,
        CsvImportDialogComponent,
        MatInputModule,
        EntityListFrameComponent,
    ]
})
export class SharedModule {
}
