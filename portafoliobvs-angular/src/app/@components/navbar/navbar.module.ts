import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
