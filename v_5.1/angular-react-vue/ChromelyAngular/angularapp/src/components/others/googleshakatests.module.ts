import { NgModule } from '@angular/core';
import { GoogleShakaTestsRouting } from './googleshakatests-routing.module';
import { GoogleShakaTestsComponent } from './googleshakatests.component';

@NgModule({
  imports: [GoogleShakaTestsRouting],
  declarations: [
    GoogleShakaTestsComponent
  ]
})
export class GoogleShakaTestsModule {
}
