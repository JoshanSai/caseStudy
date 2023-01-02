import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { CommunityExpendituresComponent } from './community-expenditures/community-expenditures.component';

const routes: Routes = [
  {path:'communityExpenditures',component:CommunityExpendituresComponent,canActivate:[AuthGuard],}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpendituresRoutingModule { }
