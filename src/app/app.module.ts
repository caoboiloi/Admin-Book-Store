import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// receive data from form in angular with ReactiveFormsModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';

import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';

import { appRouter } from './app.routes';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AccountComponent } from './components/account/account.component';
import { FormatDecodeBase64Pipe } from './pipes/format-decode-base64.pipe';
import { ProviderComponent } from './components/provider/provider.component';
import { PublisherComponent } from './components/publisher/publisher.component';
import { UserComponent } from './components/user/user.component';
import { BookComponent } from './components/book/book.component';
import { ShipperComponent } from './components/shipper/shipper.component';
import { FormatImgPipe } from './pipes/format-img.pipe';
import { EditComponent } from './components/edit/edit.component';
import { AddComponent } from './components/add/add.component';
import { AuthorComponent } from './components/author/author.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    ErrorComponent,
    LogoutComponent,
    AccountComponent,
    FormatDecodeBase64Pipe,
    ProviderComponent,
    PublisherComponent,
    UserComponent,
    BookComponent,
    ShipperComponent,
    FormatImgPipe,
    EditComponent,
    AddComponent,
    AuthorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRouter),
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
