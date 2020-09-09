import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { P2pService } from 'src/app/services/p2p.service';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.component.html',
  styleUrls: ['./splashscreen.component.scss'],
})
export class SplashscreenComponent implements OnInit {
  constructor(private router: Router, private p2pService: P2pService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigateByUrl('chat');
    }, 5000);
  }
}
