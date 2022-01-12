import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddadoptionPage } from './addadoption.page';

const routes: Routes = [
  {
    path: '',
    component: AddadoptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddadoptionPageRoutingModule {}
