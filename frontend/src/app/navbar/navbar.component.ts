import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isSidebarShowing=false;
  openSideBar(){
    this.isSidebarShowing=true;
    }
    closeSideBar(){
     this.isSidebarShowing=false;
    }
}
