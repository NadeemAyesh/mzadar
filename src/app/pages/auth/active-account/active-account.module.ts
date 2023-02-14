import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActiveAccountPageRoutingModule } from './active-account-routing.module';

import { ActiveAccountPage } from './active-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActiveAccountPageRoutingModule
  ],
  declarations: [ActiveAccountPage]
})
export class ActiveAccountPageModule {}
