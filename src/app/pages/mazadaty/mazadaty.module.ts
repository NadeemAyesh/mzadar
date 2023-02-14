import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MazadatyPageRoutingModule } from './mazadaty-routing.module';

import { MazadatyPage } from './mazadaty.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MazadatyPageRoutingModule,
    SharedModule
  ],
  declarations: [MazadatyPage]
})
export class MazadatyPageModule {}
