import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import { PersonViewComponent } from './components/person-view/person-view.component';
import {AddressViewComponent} from "./components/address-view/address-view.component";
import {StimmberichtViewComponent} from "./components/stimmbericht-view/stimmbericht-view.component";



@NgModule({
  declarations: [PersonViewComponent, AddressViewComponent, StimmberichtViewComponent],
    imports: [
        CommonModule,
        SharedModule,
    ],
  exports: [PersonViewComponent, AddressViewComponent, StimmberichtViewComponent]
})
export class EntityUIModule { }
