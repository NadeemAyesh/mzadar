import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleFishPage } from './single-fish.page';

const routes: Routes = [
  {
    path: '',
    component: SingleFishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleFishPageRoutingModule {}
