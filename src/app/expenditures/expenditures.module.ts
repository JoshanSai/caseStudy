import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpendituresRoutingModule } from './expenditures-routing.module';
import { CommunityExpendituresComponent } from './community-expenditures/community-expenditures.component';
import { CaseDataService } from '../case-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../auth.guard';
@NgModule({
  declarations: [
    CommunityExpendituresComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ExpendituresRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
   
    HttpClientModule
  ],
  providers:[CaseDataService,AuthGuard]
})
export class ExpendituresModule { }
