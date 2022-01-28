import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TmdbComponent } from './tmdb.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: TmdbComponent }
    ])
  ],
  exports: [RouterModule]
})
export class TmdbRouting { }
