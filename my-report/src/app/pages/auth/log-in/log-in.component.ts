import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.services';
import { NotifierService } from '../../../services/notifier.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {
  authForm!: FormGroup;

  constructor(private toast: NotifierService, private readonly fb: FormBuilder) { }

  ShowInfoEmail() {
    this.toast.ShowInfo("Nombre de usuario", "Has elegido iniciar sesión con tu nombre de usuario.");
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    console.log('Save', this.authForm.value);
  }

  private initForm(): void {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
}