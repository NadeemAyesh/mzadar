import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseStaticPage } from './choose-static.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseStaticPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseStaticPageRoutingModule {}
