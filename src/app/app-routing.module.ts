import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PersonViewComponent} from "./modules/entity-ui/components/person-view/person-view.component";
import {AddressViewComponent} from "./modules/entity-ui/components/address-view/address-view.component";
import {StimmberichtViewComponent} from "./modules/entity-ui/components/stimmbericht-view/stimmbericht-view.component";


const routes: Routes = [
  { path: 'person', component: PersonViewComponent },
  { path: 'stimmbericht', component: StimmberichtViewComponent },
  { path: '',   redirectTo: '/person', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
