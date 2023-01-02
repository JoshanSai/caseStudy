import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { GuestroomComponent } from './guestroom/guestroom.component';

const routes: Routes = [
  {path:'guestroom',component:GuestroomComponent,canActivate:[AuthGuard],}
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class GuestRoomsRoutingModule { }
