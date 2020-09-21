import { Component, NgZone } from '@angular/core';
import { ChromelyService } from './../../services/chromely.service';

type  MovieItem = {
  Id: string;
  Title: string;
  Votes: string;
  Year: string;
  Rating: string;
  Date: string;
  RestfulAssembly: string;
}

@Component({
  selector: 'app-messagerouter',
  templateUrl: './messagerouter.component.html',
  styleUrls: ['./messagerouter.component.css']
})
export class MessageRouterComponent {

  _messageRouterGetResult1: Array<MovieItem>;
  _messageRouterGetResult2: Array<MovieItem>;
  _messageRouterPostResult: string;

  constructor(private _chromelyService: ChromelyService, private _zone: NgZone) {
    this._messageRouterGetResult1 = new Array<MovieItem>();
    this._messageRouterGetResult2 = new Array<MovieItem>();
    this._messageRouterPostResult = 'Post request not ran or no result recieved.'
  }

  messageRouterGet1Run() {
    this._chromelyService.cefQueryGetRequest('/democontroller/movies', null, data => {
      this._zone.run(
          () => {
            this._messageRouterGetResult1 = this.parseArrayResult(data);
          })
    });
  }

  messageRouterGet2Run() {
    this._chromelyService.cefQueryGetRequest('/externalcontroller/movies', null, data => {
      this._zone.run(
          () => {
            this._messageRouterGetResult2 = this.parseArrayResult(data);
          })
    });
  }

  messageRouterPostRun() {
        var moviesJson = [
            { Id: 1, Title: "The Shawshank Redemption", Year: 1994, Votes: 678790, Rating: 9.2 },
            { Id: 2, Title: "The Godfather", Year: 1972, votes: 511495, Rating: 9.2 },
            { Id: 3, Title: "The Godfather: Part II", Year: 1974, Votes: 319352, Rating: 9.0 },
            { Id: 4, Title: "The Good, the Bad and the Ugly", Year: 1966, Votes: 213030, Rating: 8.9 },
            { Id: 5, Title: "My Fair Lady", Year: 1964, Votes: 533848, Rating: 8.9 },
            { Id: 6, Title: "12 Angry Men", Year: 1957, Votes: 164558, Rating: 8.9 }
        ];

        this._chromelyService.cefQueryPostRequest('/democontroller/movies', null, moviesJson, data => {
          this._zone.run(
              () => {
                this._messageRouterPostResult = data;
              })
        });
   }

  parseArrayResult(data: any) {
        var dataArray = [];
        for (var i = 0; i < data.length; i++) {
            var tempItem = {
                Id: data[i].Id,
                Title: data[i].Title,
                Year: data[i].Year,
                Votes: data[i].Votes,
                Rating: data[i].Rating,
                Date: data[i].Date,
                RestfulAssembly: data[i].RestfulAssembly
            };
            dataArray.push(tempItem);
        }
        return dataArray;
    }
}
