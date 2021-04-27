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
import {MenuComponent} from './components/menu/menu.component';
import {ContentsComponent} from './components/contents/contents.component';
import {ProfileContentsComponent} from './components/profile-contents/profile-contents.component';
import {CartComponent} from './components/cart/cart.component';
import {ConfirmComponent} from './components/confirm/confirm.component';
import {DetailsConfirmComponent} from './components/details-confirm/details-confirm.component';
import {TrackingUserComponent} from './components/tracking-user/tracking-user.component';
import {MyShoppingComponent} from './components/my-shopping/my-shopping.component';
import {UserProfileDataComponent} from './components/user-profile-data/user-profile-data.component';
import {TrackingUserProductComponent} from './components/tracking-user-product/tracking-user-product.component';


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
  {path: 'menu', component: MenuComponent},
  {path: 'contents', component: ContentsComponent},
  {path: 'profile-contents/:id', component: ProfileContentsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'cart/confirm', component: ConfirmComponent},
  {path: 'cart/confirm/details-confirm', component: DetailsConfirmComponent},
  {path: 'profile-user/tracking-user', component: TrackingUserComponent},
  {path: 'profile-user/my-shopping', component: MyShoppingComponent},
  {path: 'profile-user/settings', component: UserProfileDataComponent},
  {path: 'profile-user/tracking-user/product', component: TrackingUserProductComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
