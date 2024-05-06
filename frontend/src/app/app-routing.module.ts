import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BidTenderComponent } from './bid-tender/bid-tender.component';
import { BidHistoryComponent } from './bid-history/bid-history.component';
import { ViewAllTenderUsComponent } from './view-all-tender-us/view-all-tender-us.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { CreateTenderComponent } from './create-tender/create-tender.component';
import { AssignedTenderComponent } from './assigned-tender/assigned-tender.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { ViewAllTenderAdComponent } from './view-all-tender-ad/view-all-tender-ad.component';
import { AcceptBidsComponent } from './accept-bids/accept-bids.component';
import { AdminLogComponent } from './admin-log/admin-log.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AccountComponent } from './account/account.component';
import { RegisterUserComponent } from './register-user/register-user.component';

const routes: Routes = [
  
  {path: 'login',component:UserLoginComponent},
  {path:'register',component:RegisterUserComponent},
  {path:'TenderTime',component:HomeComponent,
  children: [
    {path:'home' ,component:HomepageComponent},
    {path:'view-all-tender',component:ViewAllTenderUsComponent},
    {path:'bid-history',component:BidHistoryComponent},
    {path:'bid-tender/:tenderId',component:BidTenderComponent},
    {path:'profile',component:AccountComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
 ]
},

{path:'admin',component:AdminComponent,
children:[
  {path:'create-tender',component:CreateTenderComponent},
  {path:'assigned-tender',component:AssignedTenderComponent},
  {path:'vendor-list',component:VendorListComponent},
  {path:'view-all-details',component:ViewAllTenderAdComponent},
  {path:'accept-bids',component:AcceptBidsComponent},
  { path: '**', redirectTo: 'create-tender' }
]
},
{ path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
