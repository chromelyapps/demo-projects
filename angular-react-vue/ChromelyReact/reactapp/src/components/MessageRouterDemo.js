import { useState } from 'react';
import { messageRouterGet, messageRouterPost } from '../services/Chromely.Service.js';

function BoundObjectGetRows({ item }) {
    return (
        <tr>
            <td>{item.Id}</td>
            <td>{item.Title}</td>
            <td>{item.Year}</td>
            <td>{item.Votes}</td>
            <td>{item.Rating}</td>
            <td>{item.Date}</td>
            <td>{item.RestfulAssembly}</td>
        </tr>
    );
}

export default function MessageRouterDemo() {
    const [messageRouterGetResult, setMessageRouterGetResult] = useState([]);
    const [messageRouterPostResult, setMessageRouterPostResult] = useState('');

    const messageRouterGetRun = (event) => {
        event.preventDefault()
        messageRouterGet('/democontroller/movies/get', null, onGetCallback);
    };

    const messageRouterPostRun = (event) => {
        event.preventDefault()

        var moviesJson = [
            { Id: 1, Title: "The Shawshank Redemption", Year: 1994, Votes: 678790, Rating: 9.2 },
            { Id: 2, Title: "The Godfather", Year: 1972, votes: 511495, Rating: 9.2 },
            { Id: 3, Title: "The Godfather: Part II", Year: 1974, Votes: 319352, Rating: 9.0 },
            { Id: 4, Title: "The Good, the Bad and the Ugly", Year: 1966, Votes: 213030, Rating: 8.9 },
            { Id: 5, Title: "My Fair Lady", Year: 1964, Votes: 533848, Rating: 8.9 },
            { Id: 6, Title: "12 Angry Men", Year: 1957, Votes: 164558, Rating: 8.9 }
        ];

        var reqMovies = { "movies": moviesJson };

        messageRouterPost('/democontroller/movies/post', null, reqMovies, onPostCallback);
    };

    const onGetCallback = (data) => {
        const dataArray = parseArrayResult(data);
        setMessageRouterGetResult(dataArray);
    };

    const onPostCallback = (data) => {
        console.log(data);
        setMessageRouterPostResult(data);
    };

    const parseArrayResult = (data) => {
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
    };

   return (
    <div>
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
                                       Route Path:&ensp;/democontroller/movies/get &ensp; <button type="button" className="btn btn-primary btn-sm" onClick={messageRouterGetRun}>Run</button>
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
                                              {messageRouterGetResult.map((item) => {
                                                  return <BoundObjectGetRows item={item} />;
                                              })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="sectionB" className="container tab-pane fade">
                            <br />
                            <div className="row">
                                <div className="col-12">
                                       Route Path:&ensp;/democontroller/movies/post&ensp;<button type="button" className="btn btn-primary btn-sm" onClick={messageRouterPostRun}>Run</button>
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

         </div></div></div></div></div>
    </div>
  );
}
