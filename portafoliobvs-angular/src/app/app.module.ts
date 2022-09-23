import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AboutModule } from './@components/about/about.module';
import { EducationModule } from './@components/education/education.module';
import { ExperienceModule } from './@components/experience/experience.module';
import { NavbarModule } from './@components/navbar/navbar.module';
import { ProjectsModule } from './@components/projects/projects.module';
import { SkillsModule } from './@components/skills/skills.module';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './@components/home/home.component';
import { LoginComponent } from './@components/login/login.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { interceptorProvider } from './service/interceptor-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent, 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AboutModule,
    EducationModule,
    ExperienceModule,
    NavbarModule,
    ProjectsModule,
    SkillsModule,
    NgCircleProgressModule.forRoot({}),
    NgbModule,
  ],
  providers: [
    interceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
