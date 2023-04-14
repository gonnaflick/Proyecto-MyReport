import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserComponent } from './user/user.component';
import { AccessesComponent } from './accesses/accesses.component';
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './header/header.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DataServices } from './data.services';

import { HttpClientModule } from '@angular/common/http';
import { AccessComponent } from './access/access.component';

import { NgToastModule } from 'ng-angular-popup'

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SignUpComponent,
    UserComponent,
    AccessesComponent,
    UsersComponent,
    HeaderComponent,
    SignOutComponent,
    AccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    Ng2SearchPipeModule,
    FormsModule,
    HttpClientModule,
    NgToastModule
  ],
  providers: [DataServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
