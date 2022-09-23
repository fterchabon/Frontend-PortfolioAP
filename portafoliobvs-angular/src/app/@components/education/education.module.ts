import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './education.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EducationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [EducationComponent]
})
export class EducationModule { }
