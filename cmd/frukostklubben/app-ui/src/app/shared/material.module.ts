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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatProgressSpinnerModule,
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
    MatProgressSpinnerModule,
  ],
})
export class MaterialModule {}
