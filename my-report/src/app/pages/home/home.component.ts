import { Component, OnInit, OnDestroy, LOCALE_ID } from '@angular/core';
import { AuthService } from '../../pages/auth/services/auth.services';
import { Subscription } from 'rxjs';
import { User } from '@supabase/supabase-js';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public user: User | null;
  userSubscription: Subscription;
  loggedIn: boolean | null = null;
  current_user: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = null;
    this.userSubscription = new Subscription();
  }

  async ngOnInit() {
    const reload = this.route.snapshot.data['reload'];
    if (reload) {
      this.router.navigate(['/home'], {
        relativeTo: this.route,
        replaceUrl: true,
      });
    }
    const user$ = await this.authService.getCurrentUser();
    user$.subscribe((user) => {
      if (user) {
        this.loggedIn = true;
        this.current_user = user.user_metadata?.['first_name'];
      } else {
        this.loggedIn = false;
      }
      console.log(user);
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
