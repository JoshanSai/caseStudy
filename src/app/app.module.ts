import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { SuperModule } from './super/super.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CaseDataService } from './case-data.service';
import { MaterialModule } from './material/material.module';
import { ExpendituresModule } from './expenditures/expenditures.module';
import { GuestRoomsModule } from './guest-rooms/guest-rooms.module';
import { FunctionHallModule } from './function-hall/function-hall.module';
import { AuthGuard } from './auth.guard';
// import { TokenInterceptorService } from './token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginModule,
    SuperModule,
    BrowserAnimationsModule,
    MaterialModule,
    ExpendituresModule,
    GuestRoomsModule,
    FunctionHallModule
  ],
  providers: [CaseDataService,AuthGuard],//,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}----- change josh
  bootstrap: [AppComponent]
})
export class AppModule { }
