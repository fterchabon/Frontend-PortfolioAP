import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from './skills.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SkillsComponent
  ],
  imports: [
    CommonModule,
    NgCircleProgressModule.forRoot({}),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [SkillsComponent]
})
export class SkillsModule { }
