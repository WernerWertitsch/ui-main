import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import { PersonComponent } from './components/person/person.component';
import { PersonViewComponent } from './components/person-view/person-view.component';



@NgModule({
  declarations: [PersonComponent, PersonViewComponent],
    imports: [
        CommonModule,
        SharedModule,
    ],
  exports: [PersonViewComponent]
})
export class PersonModule { }
