import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import  { AngularFireModule } from 'angularfire2'
import  { AngularFirestoreModule } from 'angularfire2/firestore'
import { environment } from '../environments/environment'

import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
