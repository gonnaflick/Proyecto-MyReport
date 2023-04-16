import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessesComponent } from './accesses/accesses.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LogInComponent } from './pages/auth/log-in/log-in.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { UsersComponent } from './users/users.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'accesses', component: AccessesComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'login', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-out', component: SignOutComponent },
  { path: 'users', component: UsersComponent },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'log-in', loadChildren: () => import('./pages/auth/log-in/log-in.module').then(m => m.LogInModule) },
  { path: 'sign-up', loadChildren: () => import('./pages/auth/sign-up/sign-up.module').then(m => m.SignUpModule) },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
