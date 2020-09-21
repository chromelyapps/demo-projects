import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AjaxXhrComponent } from './ajaxxhr.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: AjaxXhrComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AjaxXhrRouting { }
