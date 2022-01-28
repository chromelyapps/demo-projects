<template>
    <div class="container justify-content-center">
        <div class="container-fluid">

            <div class="row col-12 justify-content-center">
                <div class="col-8">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <div class="custom-control custom-switch">
                                    <input type="checkbox" class="custom-control-input" id="checkboxSelectAllTodoItems" v-model="checkedAll" @click="toggleAllTodoItems" />
                                    <label class="custom-control-label" for="checkboxSelectAllTodoItems"></label>
                                </div>
                            </span>
                        </div>
                        <input type="text" class="form-control" v-model="todoText" v-on:keyup.enter="todoAddItem" placeholder="What needs to be done?" style="font-size: 24px; text-align: center;" />
                    </div>
                </div>
            </div>

            <!-- TODO Items List ---------- -->
            <div class="row col-12 justify-content-center">
                <div class="col-8">
                    <ul v-for="item in todoItemsList" :key="item.Id" class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" v-bind:id="item.CheckboxId" v-bind:checked="item.ItemChecked" @click="() => { toggleTodoItem(item.Id) }" />
                                <label class="custom-control-label" v-bind:for="item.CheckboxId" v-html="item.TodoHtml"></label>
                            </div>
                            <span class="badge badge-secondary badge-pill"><a href='javascript:void(0);' @click="() => { deleteTodoItem(item.Id) }">X</a></span>
                        </li>
                </ul>
            </div>
        </div>
        <!-- End TODO Items List ---------- -->

        <div class="row col-12 justify-content-center">
            <div class="col-8">
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <label>Chromely TODO List</label>
                        <button type="button" class="btn btn-link" @click="getTodoList('all', '', '', 0)">All</button>
                        <button type="button" class="btn btn-link" @click="getTodoList('allactive', '', '', 0)">Active</button>
                        <button type="button" class="btn btn-link" @click="getTodoList('allcompleted', '', '', 0)">Completed</button>
                        <button type="button" class="btn btn-link" @click="getTodoList('clearcompleted', '', '', 0)">Clear completed</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
   </div>
</template>


<script>
    import { ref, computed } from 'vue'
    var chromelyService = require('../services/ChromelyService');

  export default {
    setup() {

        const todoItemsMap = ref([]);
        const todoText = ref('');
        const checkedAll = ref(false);

        const todoAddItem = () => {
            getTodoList("add", "", todoText.value, 0);
            todoText.value = "";
            checkedAll.value = false;
        }

        const toggleTodoItem = (itemId) => {
              
            var tempMap = [];
            todoItemsMap.value.forEach((item) => {
                  if (item.id == itemId) {
                      item.data.Completed = item.data.Completed == 1 ? 0 : 1;
                      var delTagStart = item.data.Completed == 1 ? "<del>" : "";
                      var delTagEnd = item.data.Completed == 1 ? "</del>" : "";
                      item.data.TodoHtml = delTagStart + item.data.Todo + delTagEnd;

                      var url = "http://command.com/todolistcontroller/toggleactive?id=" + itemId + "&completed=" + item.data.Completed.toString();
                      chromelyService.openExternalUrl(url);
                  }

                  tempMap.push(item)
             })

            todoItemsMap.value = tempMap;
          }

          const toggleAllTodoItems = () => {
              var newCheckedAll = checkedAll.value ? false : true;
              checkedAll.value = newCheckedAll;
              getTodoList("toggleall", "", "", newCheckedAll ? 1 : 0);
          }

          const deleteTodoItem = (itemId) => {
              getTodoList("delete", itemId, "", 0);
          }

          const getTodoList = (reqType, id, todo, completed) => {
              const keys = {};
              keys["name"] = reqType;
              keys["id"] = id;
              keys["todo"] = todo;
              keys["completed"] = completed.toString();

              var parameters = {
                  'keys': keys
              };

              chromelyService.messageRouterGetJson('/todolistcontroller/items', parameters, onGetListsCallback);
          }

        const onGetListsCallback = (res) => {
            const tempArr = [];
            for (var i = 0; i < res.length; i++) {

                var todoItem = res[i];

                var itemChecked = todoItem.Completed == 1 ? true : false;
                var delTagStart = todoItem.Completed == 1 ? "<del>" : "";
                var delTagEnd = todoItem.Completed == 1 ? "</del>" : "";

                var data = {
                    Key: todoItem.Id,
                    Id: todoItem.Id + "",
                    Todo: todoItem.Todo,
                    TodoHtml: delTagStart + todoItem.Todo + delTagEnd,
                    Completed: todoItem.Completed,
                    ItemChecked: itemChecked,
                    CheckboxId: "CheckboxTodoItem" + res[i].Id
                };

                const tempItem = {
                    id: todoItem.Id,
                    data: data,
                };

                tempArr.push(tempItem);
            }

            todoItemsMap.value = tempArr;
        }

        const todoItemsList = computed(() => {

            var tempArr = [];
            todoItemsMap.value.forEach((item) => {
                tempArr.push(item.data);
            })

            return tempArr;
        })

        return {
            todoItemsList,
            todoText,
            checkedAll,
            todoAddItem,
            toggleTodoItem,
            toggleAllTodoItems,
            deleteTodoItem,
            getTodoList
        }
    }
  }
</script>