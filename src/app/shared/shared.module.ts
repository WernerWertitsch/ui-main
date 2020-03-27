import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule} from "@angular/material/card";
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatInput, MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatInputModule
  ],
  exports: [
    MatCardModule,
    FlexLayoutModule,
    MatInput
  ]
})
export class SharedModule { }
