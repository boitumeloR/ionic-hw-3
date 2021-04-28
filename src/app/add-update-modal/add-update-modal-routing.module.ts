import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUpdateModalPage } from './add-update-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdateModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUpdateModalPageRoutingModule {}
