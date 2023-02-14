import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleFishPageRoutingModule } from './single-fish-routing.module';

import { SingleFishPage } from './single-fish.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleFishPageRoutingModule,
    SwiperModule
  ],
  declarations: [SingleFishPage]
})
export class SingleFishPageModule {}
