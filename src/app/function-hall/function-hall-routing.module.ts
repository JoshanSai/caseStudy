import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { FunctionsComponent } from './functions/functions.component';

const routes: Routes = [
  {path:'functions',component:FunctionsComponent,canActivate:[AuthGuard],}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FunctionHallRoutingModule { }
