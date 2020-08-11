import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import { ProfileComponent } from './components/profile/profile.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import {MessageService} from './services/message.service';
import {UserService} from './services/user.service';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { UpgradeUserComponent } from './components/upgrade-user/upgrade-user.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { RenovarComponent } from './components/renovar/renovar.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    DashboardComponent,
    TrackingComponent,
    RegisterUserComponent,
    UpgradeUserComponent,
    MyProfileComponent,
    NavbarComponent,
    RegisterAdminComponent,
    RenovarComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxSpinnerModule,
        HttpClientModule,
        FormsModule,
    ],
  providers: [MessageService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
