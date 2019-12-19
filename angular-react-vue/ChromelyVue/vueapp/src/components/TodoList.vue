<template>
      <div class="container justify-content-center">
	  <div class="container-fluid">
          
          <div class="row col-12 justify-content-center">
                  <div class="col-8">
                          <div class="input-group">
                              <div class="input-group-prepend">
                                  <span class="input-group-text">
                                      <div class="custom-control custom-switch">
                                          <input type="checkbox" class="custom-control-input" id="checkboxSelectAllTodoItems" @click="toggleAllTodoItems" />
                                          <label class="custom-control-label" for="checkboxSelectAllTodoItems"></label>
                                        </div>
                                  </span>
                          </div>
                          <input type="text" class="form-control" v-model="todoText" v-on:keyup.enter="todoAddItem"   placeholder="What needs to be done?" style="font-size: 24px; text-align: center;" />
                      </div>
                  </div>
          </div>

        <!-- TODO Items List ---------- --> 
            <div class="row col-12 justify-content-center">
              <div class="col-8">
                <ul class="list-group">
		
                  <div  v-for="item in todoItemsList" :key="item.Id">
                    <li class="list-group-item d-flex justify-content-between align-items-center"> 
                      <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input"  id="{{item.CheckboxId}}" item.ItemChecked  @click="() => { toggleTodoItem(item.Id) }"/>
                        <label class="custom-control-label" for="{{item.CheckboxId}}">item.TodoStartTage {{ item.Todo }} item.TodoEndTage</label>
                        </div>
                        <span class="badge badge-secondary badge-pill"><a href='javascript:void(0);' @click="{{item.ItemDeleteFunction}}">X</a></span>
                    </li>
                  </div>

                </ul>
              </div>
            </div>
        <!-- End TODO Items List ---------- --> 

          <div class="row col-12 justify-content-center">
                  <div class="col-8">
                          <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                            <label>Chromely TODO List</label>
                              <button type="button" class="btn btn-link" @click="getTodoList('all', '', '', '')" >All</button>
                              <button type="button" class="btn btn-link"  @click="getTodoList('allactive', '', '', '')" >Active</button>
                              <button type="button" class="btn btn-link" @click="getTodoList('allcompleted', '', '', '')"  >Completed</button>
                              <button type="button" class="btn btn-link" @click="getTodoList('clearcompleted', '', '', '')" >Clear completed</button>
                            </li>
                          </ul>
                  </div>
          </div>
          
      </div>   
	</div>   
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
var chromelyService = require('../services/ChromelyService');

type  TodoItem = {
    Id: string;
    Todo: string;
    Completed: number;
    ItemChecked: string,
    TodoStartTage: string,
    TodoEndTage: string,
    CheckboxId: string,
    ItemToggeFunction: string,
    ItemDeleteFunction: string
};

type Dict1 = { [key: string]: string };
type Dict2 = { [key: string]: TodoItem };

@Component
export default class TodoList extends Vue {

    todoText = '';
    checkedAll = 0;
    todoItemsList: Dict2 = {};

  getTodoList(reqType:string, id:string, todo:string, completed: number) {
    const parameters: Dict1 = {};
    parameters["name"] = reqType;
    parameters["id"] = id;
    parameters["todo"] = todo;
    parameters["completed"] = completed.toString();

    chromelyService.messageRouterGetJson('/todolistcontroller/items', parameters, this.onGetListsCallback, this);
  }

  onGetListsCallback(res: any) {
    const dictList: Dict2 = {};
    for (var i = 0; i < res.length; i++) {

        var todoItem = res[i];
        
        var itemChecked = todoItem.Completed == 1 ? "checked" : "unchecked";
        var delTagStart = todoItem.Completed == 1 ? "<del>" : "";
        var delTagEnd = todoItem.Completed == 1 ? "</del>" : "";

        var tempItem = {
          Id: todoItem.Id,
          Todo: todoItem.Todo,
          Completed:todoItem.Completed,
          ItemChecked: itemChecked,
          TodoStartTage:delTagStart,
          TodoEndTage:delTagEnd,
          CheckboxId: todoItem.Id + "CheckboxTodoItem",
          ItemToggeFunction: "toggleTodoItem('" + todoItem.Id + ": string')",
          ItemDeleteFunction: "deleteTodoItem('" + todoItem.Id + ": string')"
        };

        dictList[todoItem.Id] = tempItem;
           console.log("todoItem.Id:" + todoItem.Id);
     };

    this.todoItemsList = dictList;
           console.log("todoItemsList:" + this.todoItemsList);
  }

  todoAddItem() {
    this.getTodoList("add", "", this.todoText, 0);
    this.todoText = "";
  }

  toggleTodoItem(itemId: string) {
        console.log("itemId:" + itemId);

    var dictList = this.todoItemsList;
    var todoItem = dictList[itemId];
    var completed = todoItem.Completed == 1 ? 0 : 1;
    dictList[itemId].Completed = completed;

    var url = "http://command.com/todolistcontroller/toggleactive?id=" + itemId + "&completed=" + completed.toString();
    console.log(url);
    chromelyService.openExternalUrl(url);

    this.todoItemsList = dictList;
  }

  toggleAllTodoItems() {
    var newCheckedAll = this.checkedAll == 1 ? 0 : 1;
    this.getTodoList("toggleall", "", "", newCheckedAll);
    this.checkedAll = newCheckedAll;
  }

  deleteTodoItem(itemId: string) {
    this.getTodoList("delete", itemId, "", 0);
  }


}
</script>

