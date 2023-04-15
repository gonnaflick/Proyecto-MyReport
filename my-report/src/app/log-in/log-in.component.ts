import { Component, OnInit } from '@angular/core';
import { NotifierService } from '../notifier.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  emailInput?: HTMLInputElement;
  emailPassword?: HTMLInputElement;
  usernameInput?: HTMLInputElement;
  usernamePassword?: HTMLInputElement;

  constructor(private toast: NotifierService) { }

  ShowInfoEmail() {
    this.toast.ShowInfo("Nombre de usuario", "Has elegido iniciar sesión con tu nombre de usuario.");
  }

  ShowInfoUsername() {
    this.toast.ShowInfo("Correo electronico", "Has elegido iniciar sesión con tu correo electronico.");
  }

  ngOnInit(): void {
    const emailButton = document.getElementById("email-button");
    const usernameButton = document.getElementById("username-button");
    const emailForm = document.getElementById("email-form");
    const usernameForm = document.getElementById("username-form");
    this.emailInput = emailForm!.querySelector('input[type="email"]') as HTMLInputElement;
    this.emailPassword = emailForm!.querySelector('input[type="password"]') as HTMLInputElement;
    this.usernameInput = usernameForm!.querySelector('input[type="text"]') as HTMLInputElement;
    this.usernamePassword = usernameForm!.querySelector('input[type="password"]') as HTMLInputElement;

    emailButton?.addEventListener("click", () => {
      emailButton.classList.add("active");
      usernameButton?.classList.remove("active");
      fadeOut(usernameForm!, () => {
        emailForm!.style.display = "block";
        this.emailInput!.value = '';
        this.emailPassword!.value = '';
        fadeIn(emailForm!);
      });
      this.ShowInfoEmail();
    });

    usernameButton?.addEventListener("click", () => {
      usernameButton.classList.add("active");
      emailButton?.classList.remove("active");
      fadeOut(emailForm!, () => {
        usernameForm!.style.display = "block";
        this.usernameInput!.value = '';
        this.usernamePassword!.value = '';
        fadeIn(usernameForm!);
      });
      this.ShowInfoUsername();
    });
  }
}

function fadeOut(element: HTMLElement, callback: Function) {
  let opacity = 1;
  const timer = setInterval(function () {
    if (opacity <= 0.1) {
      clearInterval(timer);
      element.style.display = "none";
      callback();
    }
    element.style.opacity = opacity.toString();
    opacity -= opacity * 0.1;
  }, 10);
}

function fadeIn(element: HTMLElement) {
  element.style.opacity = "0";
  element.style.display = "block";
  let opacity = 0;
  const timer = setInterval(function () {
    if (opacity >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = opacity.toString();
    opacity += 0.1;
  }, 10);
}
