import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AjaxXhrRouting } from './ajaxxhr-routing.module.';
import { AjaxXhrComponent } from './ajaxxhr.component';

@NgModule({
  imports: [CommonModule, AjaxXhrRouting],
  declarations: [
    AjaxXhrComponent
  ]
})
export class AjaxXhrModule {
}
