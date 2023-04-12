import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  ngOnInit() {
    const emailButton = document.getElementById("email-button") as HTMLInputElement;
    const usernameButton = document.getElementById("username-button") as HTMLInputElement;
    const emailForm = document.getElementById("email-form") as HTMLElement;
    const usernameForm = document.getElementById("username-form") as HTMLElement;
    const emailInput = emailForm.querySelector('input[type="email"]') as HTMLInputElement;
    const emailPassword = emailForm.querySelector('input[type="password"]') as HTMLInputElement;
    const usernameInput = usernameForm.querySelector('input[type="text"]') as HTMLInputElement;
    const usernamePassword = usernameForm.querySelector('input[type="password"]') as HTMLInputElement;

    emailButton?.addEventListener("click", function () {
      emailButton?.classList.add("active");
      usernameButton?.classList.remove("active");
      fadeOut(usernameForm, function () {
        emailForm.style.display = "block";
        fadeIn(emailForm);
        emailInput.value = '';
        emailPassword.value = '';
      });
    });

    usernameButton?.addEventListener("click", function () {
      usernameButton?.classList.add("active");
      emailButton?.classList.remove("active");
      fadeOut(emailForm, function () {
        usernameForm.style.display = "block";
        fadeIn(usernameForm);
        usernameInput.value = '';
        usernamePassword.value = '';
      });
    });

    emailButton?.click();
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