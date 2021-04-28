import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUpdateModalPageRoutingModule } from './add-update-modal-routing.module';

import { AddUpdateModalPage } from './add-update-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddUpdateModalPageRoutingModule
  ],
  declarations: [AddUpdateModalPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AddUpdateModalPageModule {}
