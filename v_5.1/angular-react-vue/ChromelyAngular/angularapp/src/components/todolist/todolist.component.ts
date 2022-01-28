import { Component, NgZone } from '@angular/core';
import { ChromelyService } from './../../services/chromely.service';

type  TodoItem = {
  Id: string;
  Todo: string;
  TodoHtml: string;
  Completed: number;
  ItemChecked: boolean;
  CheckboxId: string;
};

type Dict1 = { [key: string]: string };
type Dict2 = { [key: string]: TodoItem };

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodoListComponent {

  _checkedAll: boolean;
  _todoItemsList: Array<TodoItem>;

  constructor(private _chromelyService: ChromelyService, private _zone: NgZone) {
    this._checkedAll = false;
    this._todoItemsList = new Array<TodoItem>();
 }

  getTodoList(reqType:string, id:string, todo:string, completed: number) {
    const parameters: Dict1 = {};
    parameters["name"] = reqType;
    parameters["id"] = id;
    parameters["todo"] = todo;
    parameters["completed"] = completed.toString();

    this._chromelyService.cefQueryGetRequest('/todolistcontroller/items', parameters, data => {
      this._zone.run(
          () => {
            this.onGetListsCallback(data);
          })
    });
  }

  onGetListsCallback(res: any) {
    const dictList: Dict2 = {};
    const tempList = new Array<TodoItem>();
    for (var i = 0; i < res.length; i++) {

        var todoItem = res[i];
        
        var itemChecked = todoItem.Completed == 1;
        var delTagStart = todoItem.Completed == 1 ? "<del>" : "";
        var delTagEnd = todoItem.Completed == 1 ? "</del>" : "";

        var tempItem = {
          Id: todoItem.Id,
          Todo: todoItem.Todo,
          TodoHtml: delTagStart + todoItem.Todo + delTagEnd,
          Completed:todoItem.Completed,
          ItemChecked: itemChecked,
          CheckboxId: todoItem.Id + "CheckboxTodoItem"
        };

        dictList[todoItem.Id] = tempItem;
        tempList.push(tempItem);
    };

    this._todoItemsList = tempList;
  }

  addTodoItem(event) {
    this.getTodoList("add", "", event.target.value, 0);
    event.target.value = "";
    this._checkedAll = false;
  }

  toggleTodoItem(item: any) {
    item.ItemChecked = !item.ItemChecked;
    var itemId = item.Id;
    this._checkedAll = false;

    var completed = item.ItemChecked ? 1 : 0;
    var delTagStart = item.ItemChecked ? "<del>" : "";
    var delTagEnd = item.ItemChecked ? "</del>" : "";
    item.TodoHtml = delTagStart + item.Todo + delTagEnd;

    var url = "http://command.com/todolistcontroller/toggleactive?id=" + itemId + "&completed=" + completed.toString();
    console.log(url);
    this._chromelyService.openExternalUrl(url);
  }

  toggleAllTodoItems() {
    var newCheckedAll = this._checkedAll ? 0 : 1;
    this.getTodoList("toggleall", "", "", newCheckedAll);
  }

  deleteTodoItem(itemId: string) {
    this.getTodoList("delete",  "" + itemId, "", 0);
  }
}
