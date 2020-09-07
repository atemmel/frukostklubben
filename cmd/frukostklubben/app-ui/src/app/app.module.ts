import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './shared/material.module';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ChatComponent } from './components/chat/chat.component';
import { UserSectionComponent } from './components/user-section/user-section.component';
import { UserTypingComponent } from './components/user-typing/user-typing.component';
import { HttpClientModule } from '@angular/common/http';
import { FkButtonComponent } from './components/fk-button/fk-button.component';
import { FkPopupDialog } from './components/fk-popup/fk-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatMessageComponent,
    ChatComponent,
    UserSectionComponent,
    UserTypingComponent,
    FkButtonComponent,
    FkPopupDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [FkPopupDialog],
})
export class AppModule {}
