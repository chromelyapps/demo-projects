import React, { Component } from 'react';
import { messageRouterGet, openExternalUrl } from '../services/Chromely.Service.js';

const itemTextStyle = {
  'font-size': '24px',
  'text-align': 'center'
};

class BoundActiveRow extends React.Component {
  render() {
    const itemId = this.props.item.Id;
    return (
    <li className="list-group-item d-flex justify-content-between align-items-center"> 
      <div className="custom-control custom-switch">
        <input type="checkbox" className="custom-control-input"  id={this.props.item.Id + 'CheckboxTodoItem'} unchecked onClick={() => this.props.toggleTodoItem(itemId)}/>
        <label className="custom-control-label" for={this.props.item.Id + 'CheckboxTodoItem'}>{this.props.item.Todo}</label>
        </div>
        <span className="badge badge-secondary badge-pill"><a href='javascript:void(0);' onClick={() => this.props.deleteTodoItem(itemId)}>X</a></span>
    </li>
    )
  }
}

class BoundCompletedRow extends React.Component {
  render() {
    const itemId = this.props.item.Id;
    return (
    <li className="list-group-item d-flex justify-content-between align-items-center"> 
      <div className="custom-control custom-switch">
        <input type="checkbox" className="custom-control-input"  id={this.props.item.Id + 'CheckboxTodoItem'} checked onClick={() => this.props.toggleTodoItem(itemId)}/>
        <label className="custom-control-label" for={this.props.item.Id + 'CheckboxTodoItem'}><del>{this.props.item.Todo}</del></label>
        </div>
        <span className="badge badge-secondary badge-pill"><a href='javascript:void(0);' onClick={() => this.props.deleteTodoItem(itemId)}>X</a></span>
    </li>
    )
  }
}

class TodoList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todoText: '',
      todoItemsList: [],
      checkedAll: false
    };

    this.todoTextChange = this.todoTextChange.bind(this);
    this.todoAddItem = this.todoAddItem.bind(this);
    this.toggleTodoItem = this.toggleTodoItem.bind(this);
    this.toggleAllTodoItems = this.toggleAllTodoItems.bind(this);
    this.deleteTodoItem = this.deleteTodoItem.bind(this);
  }

  getTodoList(reqType, id, todo, completed) {
    var parameters = {};
    parameters["name"] = reqType;
    parameters["id"] = id;
    parameters["todo"] = todo;
    parameters["completed"] = completed.toString();

    messageRouterGet('/todolistcontroller/items', parameters, this.onGetListsCallback, this);
  }

  onGetListsCallback(data, _self) {
    var dictList = [];
    for (var i = 0; i < data.length; i++) {

        var todoItem = data[i];
        
        var tempItem = {
          Id: todoItem.Id,
          Todo: todoItem.Todo,
          Completed:todoItem.Completed
        };

        dictList[todoItem.Id] = tempItem;
     };

     _self.setState({
        todoItemsList: dictList
    });
  }

  todoTextChange(event) {
    event.preventDefault();

    this.setState({todoText: event.target.value});
  }

  todoAddItem(event) {
    event.preventDefault();

    if (event.key === "Enter") {
      const { todoText } = this.state;
      this.getTodoList("add", "", todoText, 0);
      this.setState({todoText: ''});

      this.setState({checkedAll: false});
    }
  }

  toggleTodoItem(itemId) {
    const { todoItemsList } = this.state;
    var dictList = todoItemsList;
    var todoItem = dictList[itemId];
    var completed = todoItem.Completed == 1 ? 0 : 1;
    dictList[itemId].Completed = completed;

    var url = "http://command.com/todolistcontroller/toggleactive?id=" + itemId + "&completed=" + completed.toString();
    console.log(url);
    openExternalUrl(url);

    this.setState({todoItemsList: dictList});
  }

  toggleAllTodoItems(event) {
    event.preventDefault();

    const { checkedAll } = this.state;
    var newCheckedAll = checkedAll ? 0 : 1;
    this.setState({checkedAll: newCheckedAll});
    this.getTodoList("toggleall", "", "", newCheckedAll);
  }

  deleteTodoItem(itemId) {
    this.getTodoList("delete", "" + itemId, "", "");
  }

  render() {

    const { todoText } = this.state;
    const { todoItemsList } = this.state;

    return (
      <div className="container-fluid">
          
          <div className="row col-12 justify-content-center">
                  <div className="col-8">
                          <div className="input-group">
                              <div className="input-group-prepend">
                                  <span className="input-group-text">
                                      <div className="custom-control custom-switch">
                                          <input type="checkbox" className="custom-control-input" id="checkboxSelectAllTodoItems" checked={this.state.checkedAll} onClick={this.toggleAllTodoItems} />
                                          <label className="custom-control-label" for="checkboxSelectAllTodoItems"></label>
                                        </div>
                                  </span>
                          </div>
                          <input type="text" className="form-control" value={todoText} onChange={this.todoTextChange} onKeyUp={this.todoAddItem}  placeholder="What needs to be done?" style={itemTextStyle} />
                      </div>
                  </div>
          </div>

        {/* TODO Items List ---------- */} 
            <div className="row col-12 justify-content-center">
              <div className="col-8">
                <ul className="list-group">
                {todoItemsList.map((value, index) => {
                  if (value.Completed == 1) {
                  return <BoundCompletedRow toggleTodoItem={this.toggleTodoItem} deleteTodoItem={this.deleteTodoItem}  item={value}/>;
                  }
                  else {
                    return <BoundActiveRow toggleTodoItem={this.toggleTodoItem} deleteTodoItem={this.deleteTodoItem} item={value}/>;
                  }
                })}
                </ul>
              </div>
            </div>
        {/* End TODO Items List ---------- */} 

          <div className="row col-12 justify-content-center">
                  <div className="col-8">
                          <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                            <label>Chromely TODO List</label>
                              <button type="button" className="btn btn-link" onClick={() => this.getTodoList('all', '', '', '')} >All</button>
                              <button type="button" className="btn btn-link" onClick={() => this.getTodoList('allactive', '', '', '')} >Active</button>
                              <button type="button" className="btn btn-link" onClick={() => this.getTodoList('allcompleted', '', '', '')}  >Completed</button>
                              <button type="button" className="btn btn-link" onClick={() => this.getTodoList('clearcompleted', '', '', '')}  >Clear completed</button>
                            </li>
                          </ul>
                  </div>
          </div>
          
      </div>   
    );
  }
}

export default TodoList;