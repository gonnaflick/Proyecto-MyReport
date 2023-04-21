import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.services';
import { NotifierService } from '../../../services/notifier.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private toast: NotifierService,
    private authService: AuthService,
    private readonly router: Router
  ) {
    this.email = '';
    this.password = '';
  }

  ngOnInit(): void {}

  ShowInfoEmail() {
    this.toast.ShowInfo(
      'Nombre de usuario',
      'Has elegido iniciar sesión con tu nombre de usuario.'
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService
        .logIn(this.email, this.password)
        .then((result) => {
          if (result) {
            console.log(result);
            this.redirectUser();
          }
        })
        .catch((error) => {
          this.toast.ShowError('Error', error);
          console.error(error);
        });
    } else {
      this.toast.ShowInfo('Tip', 'Llene todos los puntos indicados.');
    }
  }

  private redirectUser(): void {
    this.router.navigate(['/home']);
  }
}
