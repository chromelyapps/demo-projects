import React, { Component } from 'react';
import { messageRouterGet, messageRouterPost } from '../services/Chromely.Service.js';

class BoundObjectGetRows extends React.Component {
    render() {
      return (
        <tr>
          <td>{this.props.item.Id}</td>
          <td>{this.props.item.Title}</td>
          <td>{this.props.item.Year}</td>
          <td>{this.props.item.Votes}</td>
          <td>{this.props.item.Rating}</td>
          <td>{this.props.item.Date}</td>
          <td>{this.props.item.RestfulAssembly}</td>
        </tr>
      )
    }
  }

class MessageRouterDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messageRouterGetResult: [],
            messageRouterPostResult: ''
          };

        this.messageRouterGetRun = this.messageRouterGetRun.bind(this);
        this.messageRouterPostRun = this.messageRouterPostRun.bind(this);
    }

    messageRouterGetRun(event) {
        event.preventDefault()
        messageRouterGet('/democontroller/movies/get', null, this.onGetCallback, this);
    }

    messageRouterPostRun(event) {
        event.preventDefault()

        var moviesJson = [
        { Id: 1, Title: "The Shawshank Redemption", Year: 1994, Votes: 678790, Rating: 9.2 },
        { Id: 2, Title: "The Godfather", Year: 1972, votes: 511495, Rating: 9.2 },
        { Id: 3, Title: "The Godfather: Part II", Year: 1974, Votes: 319352, Rating: 9.0 },
        { Id: 4, Title: "The Good, the Bad and the Ugly", Year: 1966, Votes: 213030, Rating: 8.9 },
        { Id: 5, Title: "My Fair Lady", Year: 1964, Votes: 533848, Rating: 8.9 },
        { Id: 6, Title: "12 Angry Men", Year: 1957, Votes: 164558, Rating: 8.9 }
        ];

        messageRouterPost('/democontroller/movies/post', null, moviesJson, this.onPostCallback, this);
    }

    onGetCallback(data, _self) {
        var dataArray = _self.parseArrayResult(data);
        _self.setState({
            messageRouterGetResult: dataArray
        });
    }
    
    onPostCallback(data, _self) {
        _self.setState({
            messageRouterPostResult: data
        });
    }

    parseArrayResult(data) {
        var dataArray = [];

        for (var i = 0; i < data.length; i++) {
            var tempItem = {
            Id: data[i].Id,
            Title: data[i].Title,
            Votes: data[i].Votes,
            Year: data[i].Year,
            Rating: data[i].Rating,
            Date: data[i].Date,
            RestfulAssembly: data[i].RestfulAssembly
        };
        dataArray.push(tempItem);
        }
        return dataArray;
    }

   render() {

    const { messageRouterGetResult } = this.state;
    const { messageRouterPostResult } = this.state;

    return (
        <div className="container-fluid"><div className="row"><div className="col-12 p-0"><div className="text-center m-0  d-flex flex-column justify-content-center"> <div className="form-group row justify-content-center col-12">
                       
        {/* Header ---------- */} 
        <div className="row col-12">
            <h1>Message Router Demo</h1>
        </div>

        {/* Nav ---------- */} 
        <div className="row col-12">
                <ul className="nav nav-pills" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="pill" href="#sectionA">Get</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="pill" href="#sectionB">Post</a>
                        </li>
                </ul>
        </div>


    {/* Content ---------- */} 
    <div className="row col-12">
        <div className="row spacer25">

            <div className="tab-content">
            <div id="sectionA" className="container tab-pane active">
                    <div className="row">
                        <div className="col-12">
                            Route Path:&ensp;/democontroller/movies/get &ensp; <button type="button" className="btn btn-primary btn-sm" onClick={this.messageRouterGetRun}>Run</button>
                        </div>
                        <div className="col-12 spacer25">
                            <div className='table-responsive'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Title</th>
                                            <th>Year</th>
                                            <th>Votes</th>
                                            <th>Rating</th>
                                            <th>Date</th>
                                            <th>RestfulAssembly</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { messageRouterGetResult.map(function(item, key) {
                                        return <BoundObjectGetRows key={key} item={item}/>;
                                    }) }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            <div id="sectionB" className="container tab-pane fade">
                <br/>
                <div className="row">
                    <div className="col-12">
                        Route Path:&ensp;/democontroller/movies/post&ensp;<button type="button" className="btn btn-primary btn-sm" onClick={this.messageRouterPostRun}>Run</button>
                    </div>
                    <div className="col-12 spacer25">
                    <div>&ensp;&ensp;&ensp;{messageRouterPostResult}</div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>


   {/* Content ---------- */} 


    ` </div></div></div></div></div>
    );
  }
}

export default MessageRouterDemo;