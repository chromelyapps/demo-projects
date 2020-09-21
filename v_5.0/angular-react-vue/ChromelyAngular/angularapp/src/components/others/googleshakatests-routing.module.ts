import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GoogleShakaTestsComponent } from './googleshakatests.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: GoogleShakaTestsComponent }
    ])
  ],
  exports: [RouterModule]
})
export class GoogleShakaTestsRouting { }
