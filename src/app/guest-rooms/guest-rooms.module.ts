import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoomsRoutingModule } from './guest-rooms-routing.module';
import { GuestroomComponent } from './guestroom/guestroom.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GuestroomComponent
  ],
  imports: [
    CommonModule,
    GuestRoomsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GuestRoomsModule { }
