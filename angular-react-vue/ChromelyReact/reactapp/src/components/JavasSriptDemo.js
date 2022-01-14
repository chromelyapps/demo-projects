import { useState } from 'react';
import { messageRouterPost } from '../services/Chromely.Service.js';

function BoundObjectGetRows({ item }) {
    return (
        <tr>
            <td>Execute</td>
            <td>{item}</td>
        </tr>
    );
}

export default function JavasSriptDemo() {
    const [scriptValue, setScriptValue] = useState("alert('Chromely : Build.NET /.NET Core HTML5 desktop apps using cross - platform native GUI API.');");
    const [results, setResults] = useState([]);

    const scriptChange = (event) => {
        event.preventDefault();
        setScriptValue(event.target.value);
    };

    const executeRun = (event) => {
        event.preventDefault();

        if (!scriptValue || scriptValue.length == 0) {
            onError("Script must not be empty.");
        }
        else if (scriptValue.length < 6) {
            onError("Not valid script: " + scriptValue + ". Script must be greater than 5 characters.");
        }
        else {
            var postData = { "framename": "", "script": scriptValue };
            messageRouterPost('/executejavascript/execute', null, postData, onExecuteCallback);
        }
    };

    const onExecuteCallback = (data) => {
        var dataArray = results;
        dataArray.push(data);

        const temp = [...dataArray];
        setResults(temp);
    };

    const onError = (msg) => {
        var dataArray = results;
        dataArray.push(msg);

        const temp = [...dataArray];
        setResults(temp);
    };

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0">
                        <div className="text-center m-0  d-flex flex-column justify-content-center">

                            <div className="container justify-content-center">
                                <div className="form-group row justify-content-center col-12">
                                    <div className="row col-8">
                                        <h1>Execute JavaScript Demo</h1>
                                    </div>
                                    <div className="row col-8">
                                        <div className="card">
                                            <div className="card-header">Script:</div>
                                            <div className="card-body">
                                                <div className="col-8">
                                                    <textarea className="form-control" value={scriptValue} rows="5" cols="100" onChange={scriptChange} ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row col-8">
                                        <button id="execute" type="button" className="btn btn-primary btn-sm" onClick={executeRun} style={{ margin: '5px' }} >Execute</button>
                                    </div>
                                    <div className="row col-8">
                                        <table id="resulttable" className="table table-striped" style={{ margintop: '10px' }}>
                                            <thead>
                                                <tr>
                                                    <th scope="col" style={{ width: '100px' }} >Type</th>
                                                    <th scope="col">Output</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {results.map((value) => {
                                                    return <BoundObjectGetRows item={value} />;
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}