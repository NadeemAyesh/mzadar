import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MazadatyPage } from './mazadaty.page';

const routes: Routes = [
  {
    path: '',
    component: MazadatyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MazadatyPageRoutingModule {}
