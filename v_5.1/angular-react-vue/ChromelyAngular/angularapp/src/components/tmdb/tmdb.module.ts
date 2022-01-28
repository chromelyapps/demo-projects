import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { TmdbRouting } from './tmdb-routing.module.';
import { TmdbComponent } from './tmdb.component';

@NgModule({
  imports: [CommonModule, TmdbRouting],
  declarations: [
    TmdbComponent
  ]
})
export class TmdbModule {
}
