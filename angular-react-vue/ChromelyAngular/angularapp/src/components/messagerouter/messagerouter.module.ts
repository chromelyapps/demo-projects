import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MessageRouterRouting } from './messagerouter-routing.module.';
import { MessageRouterComponent } from './messagerouter.component';

@NgModule({
  imports: [CommonModule, MessageRouterRouting],
  declarations: [
    MessageRouterComponent
  ]
})
export class MessageRouterModule {
}

