import { NgModule } from '@angular/core';
import { Html5TestsRouting } from './html5tests-routing.module';
import { Html5TestsComponent } from './html5tests.component';

@NgModule({
  imports: [Html5TestsRouting],
  declarations: [
    Html5TestsComponent
  ]
})
export class Html5TestsModule {
}
