import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import { PersonComponent } from './components/person/person.component';
import { PersonViewComponent } from './components/person-view/person-view.component';
import {PersonListComponent} from "./components/person-list/person-list.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonToggleModule} from "@angular/material/button-toggle";



@NgModule({
  declarations: [PersonListComponent, PersonComponent, PersonViewComponent],
    imports: [
        CommonModule,
        SharedModule,
    ],
  exports: [PersonViewComponent]
})
export class PersonModule { }
