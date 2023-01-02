import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { TenantCommonComponent } from '../login/tenant-common/tenant-common.component';
import { CommunityComponent } from './community/community.component';
import { FlatsComponent } from './flats/flats.component';
import { GuestFunctionComponent } from './guest-function/guest-function.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SuperCommonComponent } from './super-common/super-common.component';
import { TenantComponent } from './tenant/tenant.component';


const routes: Routes = [
  // {path:'community',component:CommunityComponent},
//   {path:'flats/:id',component:FlatsComponent,canActivate:[AuthGuard],
// },
  // {path:'guest-function',component:GuestFunctionComponent},
  {path: 'superCommon', component:SuperCommonComponent,canActivate:[AuthGuard],
    children:[
      { path: '', component:CommunityComponent,canActivate:[AuthGuard]},
      { path: 'flats', component: FlatsComponent,canActivate:[AuthGuard]}, 
      { path: 'tenant', component: TenantComponent,canActivate:[AuthGuard]},
      { path: 'navBar/:id', component: NavBarComponent,canActivate:[AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperRoutingModule { }
