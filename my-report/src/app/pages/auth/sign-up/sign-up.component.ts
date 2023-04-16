import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.services';
import { NotifierService } from '../../../services/notifier.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  authForm!: FormGroup;

  constructor(private authService: AuthService, private toast: NotifierService, private readonly fb: FormBuilder) { }

  onSubmit(firstName: string, lastName: string, birthday: string, email: string, password: string, phone: string) {
    if (form.valid) {
      // Hacer algo cuando el formulario es válido
    } else {
      // Mostrar un mensaje de error o hacer otra cosa si el formulario no es válido
    }
    this.authService.signUp(email, firstName, lastName, birthday, password, phone)
      .then(result => {
        if (result)
          console.log(result);
      })
      .catch(error => {
        this.toast.ShowError("Error", Error);
        console.error(error);
      });
  }

  private initForm(): void {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
}
