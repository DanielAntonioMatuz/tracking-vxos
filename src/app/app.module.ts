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
import { NotificationsComponent } from './components/notifications/notifications.component';
import {NotificationsService} from './services/notifications.service';
import {SettingsService} from './services/settings.service';
import { MenuComponent } from './components/menu/menu.component';
import {MenuService} from './services/menu.service';
import  {MomentModule} from 'angular2-moment';

import { NgxDropzoneModule } from 'ngx-dropzone';
import {UploadService} from './services/upload.service';
import {HorarioSettingsService} from './services/horarioSettings.service';
import { ContentsComponent } from './components/contents/contents.component';
import { ProfileContentsComponent } from './components/profile-contents/profile-contents.component';
import { NavbarContentsComponent } from './components/navbar-contents/navbar-contents.component';
import {EmpresaConnectionsService} from './services/empresaConnections.service';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { DetailsConfirmComponent } from './components/details-confirm/details-confirm.component';
import { TrackingUserComponent } from './components/tracking-user/tracking-user.component';
import { NavbarUserComponent } from './components/navbar-user/navbar-user.component';
import { MyShoppingComponent } from './components/my-shopping/my-shopping.component';
import { UserProfileDataComponent } from './components/user-profile-data/user-profile-data.component';
import { TrackingUserProductComponent } from './components/tracking-user-product/tracking-user-product.component';


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
    RenovarComponent,
    NotificationsComponent,
    MenuComponent,
    ContentsComponent,
    ProfileContentsComponent,
    NavbarContentsComponent,
    CartComponent,
    ConfirmComponent,
    DetailsConfirmComponent,
    TrackingUserComponent,
    NavbarUserComponent,
    MyShoppingComponent,
    UserProfileDataComponent,
    TrackingUserProductComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxSpinnerModule,
        HttpClientModule,
        FormsModule,
        MomentModule,
        NgxDropzoneModule
    ],
  providers: [MessageService, UserService, NotificationsService, SettingsService,
  MenuService, UploadService, HorarioSettingsService, EmpresaConnectionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
