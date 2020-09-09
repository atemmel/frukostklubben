import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatViewComponent } from './pages/chat-view/chat-view.component';
import { SplashscreenComponent } from './pages/splashscreen/splashscreen.component';
import { LoginComponent } from './pages/login/login.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: '/splashscreen', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatViewComponent },
  { path: 'splashscreen', component: SplashscreenComponent },
  { path: 'welcome', component: WelcomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
