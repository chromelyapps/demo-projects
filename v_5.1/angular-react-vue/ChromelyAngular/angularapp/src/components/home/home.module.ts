import { NgModule } from '@angular/core';
import { HomeRouting } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [HomeRouting],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {
}

