import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

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
    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;
    //dialogConfig.autoFocus = true;

    //dialogConfig.hasBackdrop = false;

    dialogConfig.panelClass = 'popup-background';

    const dialogRef = this.dialog.open(FkPopupDialog, {
      panelClass: 'fk-popup',
      backdropClass: 'fk-backdrop',
      width: '100vh',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
