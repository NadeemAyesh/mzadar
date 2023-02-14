import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ItemComponent } from './components/item/item.component';
import { FishItemComponent } from './components/fish-item/fish-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  exports: [ItemComponent, FishItemComponent],
  declarations: [ItemComponent, FishItemComponent]
})
export class SharedModule { }
