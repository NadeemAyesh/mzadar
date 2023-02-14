import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseStaticPageRoutingModule } from './choose-static-routing.module';

import { ChooseStaticPage } from './choose-static.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseStaticPageRoutingModule
  ],
  declarations: [ChooseStaticPage]
})
export class ChooseStaticPageModule {}
