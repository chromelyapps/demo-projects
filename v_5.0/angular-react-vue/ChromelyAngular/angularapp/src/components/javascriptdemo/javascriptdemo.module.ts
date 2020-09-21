import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { JavaScriptDemoRouting } from './javascriptdemo-routing.module.';
import { JavaScriptDemoComponent } from './javascriptdemo.component';

@NgModule({
  imports: [CommonModule, JavaScriptDemoRouting],
  declarations: [
    JavaScriptDemoComponent
  ]
})
export class JavaScriptDemoModule {
}


