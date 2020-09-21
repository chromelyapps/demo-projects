import React, { Component } from 'react';
import { messageRouterPost } from '../services/Chromely.Service.js';

class BoundObjectGetRows extends React.Component {
    render() {
      return (
        <tr>
          <td>Execute</td>
          <td>{this.props.item}</td>
        </tr>
      )
    }
  }

class JavasSriptDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            scriptValue: "alert('Chromely : Build .NET/.NET Core HTML5 desktop apps using cross-platform native GUI API.');",
            results: []
          };

        this.executeRun = this.executeRun.bind(this);
        this.scriptChange = this.scriptChange.bind(this);
    }

    scriptChange(event) {
        event.preventDefault();

        this.setState({scriptValue: event.target.value});
    }
    

    executeRun(event) {
        event.preventDefault();

        const { scriptValue } = this.state;
        if (!scriptValue || scriptValue.length == 0) {
            this.onError("Script must not be empty.");
        }
        else if (scriptValue.length < 6) {
            this.onError("Not valid script: " + scriptValue + ". Script must be greater than 5 characters.");
        }
        else {
            var postData = { "framename": "", "script": scriptValue };
            messageRouterPost('/executejavascript/execute', null, postData, this.onExecuteCallback, this);
        }
    }

    onExecuteCallback(data, _self) {
        const { results } = _self.state;
        var dataArray = results;
        dataArray.push(data);

        _self.setState({
            results: dataArray
        });
    }

    onError(msg) {
        const { results } = this.state;
        var dataArray = results;
        dataArray.push(msg);

        this.setState({
            results: dataArray
        });
    }

  render() {

    const { scriptValue } = this.state;
    const { results } = this.state;

    return (
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
                                                    <textarea  className="form-control" value={scriptValue} rows="5" cols="100" onChange={this.scriptChange} ></textarea>
                                                </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row col-8">
                                    <button id="execute" type="button" className="btn btn-primary btn-sm" onClick={this.executeRun} style={{margin: '5px'}} >Execute</button>
                                </div>
                            <div className="row col-8">
                                <table id="resulttable" className="table table-striped"  style={{margintop: '10px'}}>
                                    <thead>
                                    <tr>
                                        <th scope="col" style={{width: '100px'}} >Type</th>
                                        <th scope="col">Output</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {results.map((value, index) => {
                                        return <BoundObjectGetRows item={value}/>;
                                    })}
                                    </tbody>
                                </table>
                                </div>
                        </div>
                    </div>


              </div>
          </div>
      </div>
  ` </div>
    );
  }
}

export default JavasSriptDemo;

