import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { CommunityExpendituresComponent } from '../expenditures/community-expenditures/community-expenditures.component';
import { FunctionsComponent } from '../function-hall/functions/functions.component';
import { GuestroomComponent } from '../guest-rooms/guestroom/guestroom.component';
import { ChooseCommunityComponent } from './choose-community/choose-community.component';
import { CommunityManagerComponent } from './community-manager/community-manager.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SuperUserComponent } from './super-user/super-user.component';
import { TenantCommonComponent } from './tenant-common/tenant-common.component';


const routes: Routes = [
  {path:'' ,component:LoginPageComponent,},
  {path:'superUser',component:SuperUserComponent,},
  {path:'communityManager',component:CommunityManagerComponent,},
  {path:'dashBoard',component:DashBoardComponent,canActivate:[AuthGuard],},
  {path:'chooseCommunity',component:ChooseCommunityComponent,canActivate:[AuthGuard],},
  {path: 'tenantCommon', component:TenantCommonComponent,canActivate:[AuthGuard],
  children:[
    
    {path:'',component:DashBoardComponent,canActivate:[AuthGuard]},
    { path: 'tenatCommunity/expenditures', component: CommunityExpendituresComponent,canActivate:[AuthGuard]}, 
    { path: 'tenatCommunity/guestRooms', component: GuestroomComponent,canActivate:[AuthGuard]}, 
    { path: 'tenatCommunity/funtionHalls', component: FunctionsComponent,canActivate:[AuthGuard]}, 
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
