import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddstorePage } from './addstore.page';

const routes: Routes = [
  {
    path: '',
    component: AddstorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddstorePageRoutingModule {}
