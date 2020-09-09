import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { P2pService } from 'src/app/services/p2p.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(public p2pService: P2pService, private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => this.router.navigateByUrl('chat'), 2000);
  }
}
