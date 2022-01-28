import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Html5TestsComponent } from './html5tests.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: Html5TestsComponent }
    ])
  ],
  exports: [RouterModule]
})
export class Html5TestsRouting { }
