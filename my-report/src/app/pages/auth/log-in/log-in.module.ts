import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInRoutingModule } from './log-in-routing.module';
import { LogInComponent } from './log-in.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LogInComponent],
  imports: [
    CommonModule,
    LogInRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [LogInComponent],
})
export class LogInModule {}
