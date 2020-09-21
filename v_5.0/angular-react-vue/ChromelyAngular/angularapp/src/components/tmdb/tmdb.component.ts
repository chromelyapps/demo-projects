import { Component, OnInit, NgZone } from '@angular/core';
import { ChromelyService } from './../../services/chromely.service';

type  MovieItem = {
  Id: string;
  Title: string;
  PosterUrl: string;
  Overview: string;
  ReleaseDate: string;
  Popularity: string;
  VoteCount: string;
  VoteAverage: string;
  HomePage: string;
};

@Component({
  selector: 'app-tmdb',
  templateUrl: './tmdb.component.html',
  styleUrls: ['./tmdb.component.css']
})
export class TmdbComponent implements OnInit {

  _searchText: string;
  _moviesList: Array<MovieItem>;

   constructor(private _chromelyService: ChromelyService, private _zone: NgZone) {
      this._searchText = "";
      this._moviesList = new Array<MovieItem>();
   }

    ngOnInit() {
       this.getMovies('popular', '');
    }  

    searchMovies(event) {
      this.getMovies('search', this._searchText);
    }
    
    getLatestMovies() {
      this.getMovies('latest', '');
    }

    getPopularMovies() {
      this.getMovies('popular', '');
    }

    getTopratedMovies() {
      this.getMovies('toprated', '');
    }

    getNowplayingMovies() {
      this.getMovies('nowplaying', '');
    }

    getUpcomingMovies() {
      this.getMovies('upcoming', '');
    }
  
    getMovies(reqType, queryValue) {
      var parameters = {};
      parameters["name"] = reqType;
      parameters["query"] = queryValue;
      console.log(parameters);

      this._chromelyService.cefQueryGetRequest('/tmdbmoviescontroller/movies', parameters, data => {
        this._zone.run(
            () => {
              this._moviesList = this.parseArrayResult(data);
            })
      });
    }

    parseArrayResult(data: any) {
      var dataArray = [];
      for (var i = 0; i < data.length; i++) {
          var tempItem = {
              Id: data[i].id,
              Title: data[i].original_title,
              PosterUrl: "https://image.tmdb.org/t/p/original" + data[i].poster_path,
              Overview: data[i].overview,
              ReleaseDate: data[i].release_date,
              Popularity: data[i].popularity,
              VoteCount: data[i].vote_count,
              VoteAverage: data[i].vote_average,
              HomePage: "http://command.com/tmdbmoviescontroller/homepage?movieid=" + data[i].id
          };
          dataArray.push(tempItem);
      }
      return dataArray;
  }
}
