import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListGeneratePage } from './list-generate';

@NgModule({
  declarations: [
    ListGeneratePage,
  ],
  imports: [
    IonicPageModule.forChild(ListGeneratePage),
  ],
})
export class ListGeneratePageModule {}
