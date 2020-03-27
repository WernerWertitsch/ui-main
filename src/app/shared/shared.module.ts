import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule} from "@angular/material/card";
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    FlexLayoutModule,
    MatInputModule
  ],
  exports: [
    FormsModule,
    MatCardModule,
    FlexLayoutModule,
    MatInput
  ]
})
export class SharedModule { }
