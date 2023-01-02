import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { SuperUserComponent } from './super-user/super-user.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SuperModule } from '../super/super.module';
import { CaseDataService } from '../case-data.service';
import { MaterialModule } from '../material/material.module';
import { CommunityManagerComponent } from './community-manager/community-manager.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { ChooseCommunityComponent } from './choose-community/choose-community.component';
import { AuthGuard } from '../auth.guard';
import { TenantCommonComponent } from './tenant-common/tenant-common.component';
import { TokenInterceptorService } from '../token-interceptor.service';


@NgModule({
  declarations: [
    LoginPageComponent,
    SuperUserComponent,
    CommunityManagerComponent,
    DashBoardComponent,
    ChooseCommunityComponent,
    TenantCommonComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SuperModule,
    MaterialModule
 
  ],
  providers: [CaseDataService,DatePipe,AuthGuard,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}]
})
export class LoginModule { }
