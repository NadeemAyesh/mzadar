import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActiveAccountPage } from './active-account.page';

const routes: Routes = [
  {
    path: '',
    component: ActiveAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiveAccountPageRoutingModule {}
