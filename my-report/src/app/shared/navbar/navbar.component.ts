import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../pages/auth/services/auth.services';
import { registerLocaleData } from '@angular/common';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  loggedIn: boolean | null = null;

  constructor(
    private authService: AuthService,
    private readonly router: Router
  ) {}

  async ngOnInit() {
    const user$ = await this.authService.getCurrentUser();
    user$.subscribe((user) => {
      this.loggedIn = user ? true : false;
    });
  }

  async signOut(): Promise<void> {
    await this.authService.signOut();
    this.redirectUser();
  }

  private redirectUser(): void {
    this.router.navigate(['/home_reload'], { queryParams: { reload: true } });
  }
}
