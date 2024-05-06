import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  isDropdownOpen = false;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
