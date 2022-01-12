import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddadoptionPageRoutingModule } from './addadoption-routing.module';

import { AddadoptionPage } from './addadoption.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddadoptionPageRoutingModule,ReactiveFormsModule,FormsModule
  ],
  declarations: [AddadoptionPage]
})
export class AddadoptionPageModule {}
