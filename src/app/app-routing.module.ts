import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PersonViewComponent} from "./modules/entity-ui/components/person-view/person-view.component";
import {AddressViewComponent} from "./modules/entity-ui/components/address-view/address-view.component";


const routes: Routes = [
  { path: 'person', component: PersonViewComponent },
  { path: 'address', component: AddressViewComponent },
  { path: '', component: PersonViewComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
