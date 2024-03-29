import { Component } from '@angular/core';
import axios from 'axios';

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
  selector: 'app-ajaxxhr',
  templateUrl: './ajaxxhr.component.html',
  styleUrls: ['./ajaxxhr.component.css']
})
export class AjaxXhrComponent {

  _httpGetResult: Array<MovieItem>;
  _httpPostResult: string;

  constructor() {
    this._httpGetResult = new Array<MovieItem>();
    this._httpPostResult = 'Post request not ran or no result recieved.'
  }

  httpGetRun()  {
    axios.get('http://chromely.com/democontroller/movies/get')
    .then(response => {
        this._httpGetResult = this.parseArrayResult(response.data);
    })
    .catch(error => {
        console.log(error);
    });
  }

  httpPostRun()  {

      var moviesJson = [
          { Id: 1, Title: "The Shawshank Redemption", Year: 1994, Votes: 678790, Rating: 9.2 },
          { Id: 2, Title: "The Godfather", Year: 1972, votes: 511495, Rating: 9.2 },
          { Id: 3, Title: "The Godfather: Part II", Year: 1974, Votes: 319352, Rating: 9.0 },
          { Id: 4, Title: "The Good, the Bad and the Ugly", Year: 1966, Votes: 213030, Rating: 8.9 },
          { Id: 5, Title: "My Fair Lady", Year: 1964, Votes: 533848, Rating: 8.9 },
          { Id: 6, Title: "12 Angry Men", Year: 1957, Votes: 164558, Rating: 8.9 }
          ];

      var params = { "movies": moviesJson };

      axios.post('http://chromely.com/democontroller/movies/post', JSON.stringify(params))
        .then(response => {
          this._httpPostResult = response.data;
      })
      .catch(error => {
          console.log(error);
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
