import { Component } from '@angular/core';
import { AuthService } from '../services/auth.services';
import { NotifierService } from '../../../services/notifier.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  firstName: string = '';
  lastName: string = '';
  birthday: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';

  constructor(
    private authService: AuthService,
    private toast: NotifierService,
    private readonly router: Router
  ) {}

  onSubmit(signupForm: NgForm) {
    if (signupForm.valid) {
      this.authService
        .signUp(
          this.email,
          this.firstName,
          this.lastName,
          this.birthday,
          this.password,
          this.phone
        )
        .then((result) => {
          if (result) {
            console.log(result);
            this.redirectUser();
            this.toast.ShowInfo(
              'Cuenta creada con exito',
              'Espere a que el administrador valide su cuenta.'
            );
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
