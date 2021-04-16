import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './views/checkout/checkout.component';
import { DefaultLayoutComponent } from './container/default-layout/default-layout.component';
import { HomeComponent } from './views/home/home.component';
import { RegisterComponent } from './common/components/register/register.component';
import { LoginComponent } from './common/components/login/login.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  entryComponents: [
    LoginComponent,RegisterComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
