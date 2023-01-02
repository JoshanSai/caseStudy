import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperRoutingModule } from './super-routing.module';
import { CommunityComponent } from './community/community.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CaseDataService } from '../case-data.service';
import { MaterialModule } from '../material/material.module';
import { FlatsComponent } from './flats/flats.component';
import { GuestFunctionComponent } from './guest-function/guest-function.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SuperCommonComponent } from './super-common/super-common.component';
import { AuthGuard } from '../auth.guard';
import { TenantComponent } from './tenant/tenant.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    CommunityComponent,
    FlatsComponent,
    GuestFunctionComponent,
    SuperCommonComponent,
    TenantComponent,
    NavBarComponent,
  ],
  imports: [
    CommonModule,
    SuperRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,

  ],
  providers: [CaseDataService,AuthGuard]
})
export class SuperModule { }
