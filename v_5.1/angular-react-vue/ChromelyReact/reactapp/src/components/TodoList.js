import { useState, useEffect } from 'react';
import { messageRouterGet, openExternalUrl } from '../services/Chromely.Service.js';

const itemTextStyle = {
    'font-size': '24px',
    'text-align': 'center'
};

function BoundActiveRow({ item, toggleTodoItem, deleteTodoItem }) {
    return (
        <div>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <div className="custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id={item.Id + 'CheckboxTodoItem'} unchecked onClick={() => toggleTodoItem(item.Id)} />
                    <label className="custom-control-label" for={item.Id + 'CheckboxTodoItem'}>{item.Todo}</label>
                </div>
                <span className="badge badge-secondary badge-pill"><a href='javascript:void(0);' onClick={() => deleteTodoItem(item.Id)}>X</a></span>
            </li>
        </div>
    );
}

function BoundCompletedRow({ item, toggleTodoItem, deleteTodoItem }) {
    return (
        <div>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <div className="custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id={item.Id + 'CheckboxTodoItem'} checked onClick={() => toggleTodoItem(item.Id)} />
                    <label className="custom-control-label" for={item.Id + 'CheckboxTodoItem'}><del>{item.Todo}</del></label>
                </div>
                <span className="badge badge-secondary badge-pill"><a href='javascript:void(0);' onClick={() => deleteTodoItem(item.Id)}>X</a></span>
            </li>
        </div>
    );
}

export default function TodoList() {
    const [todoText, setTodoText] = useState('');
    const [todoItemsMap, setTodoItemsMap] = useState([]);
    const [todoItemsList, setTodoItemsList] = useState([]);
    const [checkedAll, setCheckedAll] = useState(false);

    const todoAddItem = (event) => {
        event.preventDefault();

        if (event.key === "Enter") {
            getTodoList("add", "", todoText, 0);
            setTodoText('');
            setCheckedAll(false);
        }
    };

    const toggleTodoItem = (itemId) => {
        var tempMap = [];
        todoItemsMap.map((item) => {
            if (item.id == itemId) {
                item.data.Completed = item.data.Completed == 1 ? 0 : 1;

                var url = "http://command.com/todolistcontroller/toggleactive?id=" + itemId + "&completed=" + item.data.Completed.toString();
                openExternalUrl(url);
            }

            tempMap.push(item)
        });

        const temp = [...tempMap];
        setTodoItemsMap(temp);
    };

    const toggleAllTodoItems = (event) => {
        event.preventDefault();
        var newCheckedAll = checkedAll ? false : true;
        setCheckedAll(newCheckedAll);
        getTodoList("toggleall", "", "", newCheckedAll ? 1 : 0);
    };

    const deleteTodoItem = (itemId) => {
        getTodoList("delete", "" + itemId, "", "");
    };

    const getTodoList = (reqType, id, todo, completed) => {
        var parameters = {};
        parameters["name"] = reqType;
        parameters["id"] = id;
        parameters["todo"] = todo;
        parameters["completed"] = completed.toString();

        messageRouterGet('/todolistcontroller/items', parameters, onGetListsCallback);
    };

    const onGetListsCallback = (data) => {
        var tempArr = [];
        data.map((todoItem) => {
            const data = {
                Id: todoItem.Id,
                Todo: todoItem.Todo,
                Completed: todoItem.Completed
            };

            const tempItem = {
                id: todoItem.Id,
                data: data,
            };

            tempArr.push(tempItem);
        });

        const temp = [...tempArr];
        setTodoItemsMap(temp);
    };

    // Only run if todoItemsMap changes
    useEffect(() => {
        var tempArr = [];
        todoItemsMap.map((item) => {
            tempArr.push(item.data);
        });

        const temp = [...tempArr];
        setTodoItemsList(temp);

    }, [todoItemsMap]); 

    return (
        <div>
            <div className="container-fluid">

                <div className="row col-12 justify-content-center">
                    <div className="col-8">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <div className="custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input" id="checkboxSelectAllTodoItems" checked={checkedAll} onClick={toggleAllTodoItems} />
                                        <label className="custom-control-label" for="checkboxSelectAllTodoItems"></label>
                                    </div>
                                </span>
                            </div>
                            <input type="text" className="form-control" value={todoText} onChange={e => setTodoText(e.target.value)} onKeyUp={todoAddItem} placeholder="What needs to be done?" style={itemTextStyle} />
                        </div>
                    </div>
                </div>

                <div className="row col-12 justify-content-center">
                    <div className="col-8">
                        <ul className="list-group">
                            {todoItemsList.map((value) => {
                                if (value.Completed == 1) {
                                    return <BoundCompletedRow item={value} toggleTodoItem={toggleTodoItem} deleteTodoItem={deleteTodoItem} />;
                                }
                                else {
                                    return <BoundActiveRow item={value} toggleTodoItem={toggleTodoItem} deleteTodoItem={deleteTodoItem} />;
                                }
                            })}
                        </ul>
                    </div>
                </div>


                <div className="row col-12 justify-content-center">
                    <div className="col-8">
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <label>Chromely TODO List</label>
                                <button type="button" className="btn btn-link" onClick={() => getTodoList('all', '', '', '')} >All</button>
                                <button type="button" className="btn btn-link" onClick={() => getTodoList('allactive', '', '', '')} >Active</button>
                                <button type="button" className="btn btn-link" onClick={() => getTodoList('allcompleted', '', '', '')}  >Completed</button>
                                <button type="button" className="btn btn-link" onClick={() => getTodoList('clearcompleted', '', '', '')}  >Clear completed</button>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
}