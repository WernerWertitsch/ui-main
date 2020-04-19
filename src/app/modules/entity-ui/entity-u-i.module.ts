import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import { PersonComponent } from './components/person-view/person/person.component';
import { PersonViewComponent } from './components/person-view/person-view.component';
import {AddressViewComponent} from "./components/address-view/address-view.component";
import {AddressComponent} from "./components/address-view/address/address.component";



@NgModule({
  declarations: [PersonComponent, PersonViewComponent, AddressComponent, AddressViewComponent],
    imports: [
        CommonModule,
        SharedModule,
    ],
  exports: [PersonViewComponent, AddressViewComponent]
})
export class EntityUIModule { }
