import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JavaScriptDemoComponent } from './javascriptdemo.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: JavaScriptDemoComponent }
    ])
  ],
  exports: [RouterModule]
})
export class JavaScriptDemoRouting { }
