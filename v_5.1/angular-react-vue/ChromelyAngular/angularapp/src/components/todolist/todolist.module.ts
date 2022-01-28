import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { TodoListRouting } from './todolist-routing.module.';
import { TodoListComponent } from './todolist.component';

@NgModule({
  imports: [CommonModule, TodoListRouting],
  declarations: [
    TodoListComponent
  ]
})
export class TodoListModule {
}
