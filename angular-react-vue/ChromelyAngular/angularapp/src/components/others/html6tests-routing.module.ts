import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Html6TestsComponent } from './html6tests.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: Html6TestsComponent }
    ])
  ],
  exports: [RouterModule]
})
export class Html6TestsRouting { }
