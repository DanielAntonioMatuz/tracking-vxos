import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './components/profile/profile.component';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {ContactComponent} from './components/contact/contact.component';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TrackingComponent} from './components/tracking/tracking.component';
import {RegisterUserComponent} from './components/register-user/register-user.component';
import {UpgradeUserComponent} from './components/upgrade-user/upgrade-user.component';
import {MyProfileComponent} from './components/my-profile/my-profile.component';
import {RegisterAdminComponent} from './components/register-admin/register-admin.component';
import {RenovarComponent} from './components/renovar/renovar.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'tracking', component: TrackingComponent},
  {path: 'register-user', component: RegisterUserComponent},
  {path: 'upgrade', component: UpgradeUserComponent},
  {path: 'my-profile/:id', component: MyProfileComponent},
  {path: 'register-admin', component: RegisterAdminComponent},
  {path: 'renovar', component: RenovarComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
