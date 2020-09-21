import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageRouterComponent } from './messagerouter.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: MessageRouterComponent }
    ])
  ],
  exports: [RouterModule]
})
export class MessageRouterRouting { }
