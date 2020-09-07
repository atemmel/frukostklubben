import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { FkPopupDialog } from '../fk-popup/fk-popup.component';

@Component({
  selector: 'app-fk-button',
  templateUrl: './fk-button.component.html',
  styleUrls: ['./fk-button.component.scss'],
})
export class FkButtonComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openFkPopup() {
    const dialogRef = this.dialog.open(FkPopupDialog);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
}
