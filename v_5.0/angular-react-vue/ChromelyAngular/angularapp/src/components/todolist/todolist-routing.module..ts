import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TodoListComponent } from './todolist.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: TodoListComponent }
    ])
  ],
  exports: [RouterModule]
})
export class TodoListRouting { }
