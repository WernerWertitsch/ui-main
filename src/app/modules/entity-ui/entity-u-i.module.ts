import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import { PersonViewComponent } from './components/person-view/person-view.component';
import {AddressViewComponent} from "./components/address-view/address-view.component";



@NgModule({
  declarations: [PersonViewComponent, AddressViewComponent],
    imports: [
        CommonModule,
        SharedModule,
    ],
  exports: [PersonViewComponent, AddressViewComponent]
})
export class EntityUIModule { }
