import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrl: './admin-nav.component.css'
})
export class AdminNavComponent {
  isSidebarShowing=false;
  openSideBar(){
    this.isSidebarShowing=true;
    }
    closeSideBar(){
     this.isSidebarShowing=false;
    }
}
