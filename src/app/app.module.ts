import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MetrComponent } from './metr/metr.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MetrComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatSliderModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
