import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddstorePageRoutingModule } from './addstore-routing.module';

import { AddstorePage } from './addstore.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddstorePageRoutingModule,ReactiveFormsModule,
  ],
  declarations: [AddstorePage]
})
export class AddstorePageModule {}
