import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ButtonsComponent } from './shared/buttons/buttons.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './shared/menu/menu.component';
import { ViewAllTenderUsComponent } from './view-all-tender-us/view-all-tender-us.component';
import { BidHistoryComponent } from './bid-history/bid-history.component';
import { BidTenderComponent } from './bid-tender/bid-tender.component';
import { AdminComponent } from './admin/admin.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { ViewAllTenderAdComponent } from './view-all-tender-ad/view-all-tender-ad.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { AssignedTenderComponent } from './assigned-tender/assigned-tender.component';
import { CreateTenderComponent } from './create-tender/create-tender.component';
import { AcceptBidsComponent } from './accept-bids/accept-bids.component';
import { AdminLogComponent } from './admin-log/admin-log.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { FormsModule } from '@angular/forms';
import { TenderService } from './service/tender.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationService } from './service/registration.service';
import { AuthService } from './service/auth.service';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { AccountComponent } from './account/account.component';
@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    NavbarComponent,
    ButtonsComponent,
    HomeComponent,
    MenuComponent,
    ViewAllTenderUsComponent,
    BidHistoryComponent,
    BidTenderComponent,
    AdminComponent,
    AdminNavComponent,
    ViewAllTenderAdComponent,
    VendorListComponent,
    AssignedTenderComponent,
    CreateTenderComponent,
    AcceptBidsComponent,
    AdminLogComponent,
    RegisterUserComponent,
    HomepageComponent,
    FooterComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    TenderService,
    HttpClient,
    RegistrationService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
