import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FunctionHallRoutingModule } from './function-hall-routing.module';
import { FunctionsComponent } from './functions/functions.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FunctionsComponent
  ],
  imports: [
    CommonModule,
    FunctionHallRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FunctionHallModule { }
