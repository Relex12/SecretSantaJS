import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ParticipantComponent } from './participant/participant.component';
import { NameInputComponent } from './name-input/name-input.component';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { BlacklistComponent } from './blacklist/blacklist.component';
import { MailAddressInputComponent } from './mail-address-input/mail-address-input.component';

@NgModule({
  declarations: [
    AppComponent,
    ParticipantComponent,
    NameInputComponent,
    BlacklistComponent,
    MailAddressInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
