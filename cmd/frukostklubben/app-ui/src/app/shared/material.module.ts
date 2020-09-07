import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';

import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatDialogModule } from '@angular/material/dialog';

import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    ScrollingModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatListModule,
  ],
  exports: [
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    ScrollingModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatListModule,
  ],
})
export class MaterialModule {}
