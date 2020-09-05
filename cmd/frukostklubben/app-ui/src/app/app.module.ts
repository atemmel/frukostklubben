import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ChatComponent } from './components/chat/chat.component';
import { UserSectionComponent } from './components/user-section/user-section.component';
<<<<<<< HEAD
import { UserTypingComponent } from './components/user-typing/user-typing.component';
=======
import { HttpClientModule } from '@angular/common/http';
>>>>>>> 7a3e02572f4a8fca8d33101f300d1b4fb7575814

@NgModule({
  declarations: [
    AppComponent,
    ChatMessageComponent,
    ChatComponent,
    UserSectionComponent,
    UserTypingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
<<<<<<< HEAD
    FormsModule,
=======
    HttpClientModule
>>>>>>> 7a3e02572f4a8fca8d33101f300d1b4fb7575814
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
