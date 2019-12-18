import { Component, NgZone } from '@angular/core';
import { ChromelyService } from './../../services/chromely.service';

type  TodoItem = {
  Id: string;
  Todo: string;
  Completed: number;
  ItemChecked: string;
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

  _checkedAll: number;
  _todoItemsList: Array<TodoItem>;
  _localTodoItemsList: Dict2 = {};

  constructor(private _chromelyService: ChromelyService, private _zone: NgZone) {
    this._checkedAll = 0;
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
        
        var itemChecked = todoItem.Completed == 1 ? "checked" : "unchecked";
        var delTagStart = todoItem.Completed == 1 ? "<del>" : "";
        var delTagEnd = todoItem.Completed == 1 ? "</del>" : "";

        var tempItem = {
          Id: todoItem.Id,
          Todo: delTagStart + todoItem.Todo + delTagEnd,
          Completed:todoItem.Completed,
          ItemChecked: itemChecked,
          CheckboxId: todoItem.Id + "CheckboxTodoItem"
        };

        dictList[todoItem.Id] = tempItem;
        tempList.push(tempItem);
    };

    this._localTodoItemsList = dictList;
    this._todoItemsList = tempList;
  }

  addTodoItem(event) {
    this.getTodoList("add", "", event.target.value, 0);
    event.target.value = "";
  }

  toggleTodoItem(itemId: string) {
    var todoItem = this._localTodoItemsList[itemId];
    var completed = todoItem.Completed == 1 ? 0 : 1;
    this._localTodoItemsList[itemId].Completed = completed;

    var url = "http://command.com/todolistcontroller/toggleactive?id=" + itemId + "&completed=" + completed.toString();
    console.log(url);
    this._chromelyService.openExternalUrl(url);

    const tempList = new Array<TodoItem>();
    for (let key in this._localTodoItemsList) {
        let value = this._localTodoItemsList[key];
        tempList.push(value);
    }

    this._todoItemsList = tempList;
  }

  toggleAllTodoItems() {
    var newCheckedAll = this._checkedAll == 1 ? 0 : 1;
    this.getTodoList("toggleall", "", "", newCheckedAll);
    this._checkedAll = newCheckedAll;
  }

  deleteTodoItem(itemId: string) {
    this.getTodoList("delete",  "" + itemId, "", 0);
  }
}
