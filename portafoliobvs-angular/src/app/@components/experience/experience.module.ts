import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from './experience.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ExperienceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ExperienceComponent]
})
export class ExperienceModule { }
