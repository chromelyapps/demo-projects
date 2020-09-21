<template>
    <div class="container justify-content-center">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-secondary btn-sm" @click="getLatestMovies" >latest</button>
                        <button type="button" class="btn btn-secondary btn-sm" @click="getPopularMovies" >popular</button>
                        <button type="button" class="btn btn-secondary btn-sm" @click="getTopratedMovies" >top rated</button>
                        <button type="button" class="btn btn-secondary btn-sm" @click="getNowplayingMovies" >now playing</button>
                        <button type="button" class="btn btn-secondary btn-sm" @click="getUpcomingMovies" >upcoming</button>
                    </div>
                </div>
                <div class="col">
            
                    <div class="form-group row justify-content-end col-12">
                        <div>
                            <input  v-model="searchText" type="text" class="form-control" placeholder="Search Movies" style="width:auto;"/>
                        </div>
                        <button type="submit" class="btn btn-primary btn-sm" @click="searchMovies" >Search</button>
                    </div>
                </div>
            </div>
        </div>


       <div class="moviesCointainer container-fluid">
            <div class="card-columns">
               <div  v-for="item in movieListResult"  v-bind:key="item.Id">

                    <!-- Card -->
                    <div class="card">
                            <div class="row no-gutters">
                            <div class="col-md-12 text-center">
                                <img v-bind:src="item.PosterUrl" alt="..." title="{{ item.Title }}" style="width: 100%;" />
                                </div>
                                <div class="col-md-12">
                                    <div class="card-body">
                                    <h4 class="card-title text-info">{{ item.Title }}</h4>
                                    <h6 class="card-subtitle text-muted">{{ item.ReleaseDate }}</h6>
                                    <p class="card-text mt-4"><b>Popularity</b>: {{ item.Popularity }}<br /><b>Vote Count</b>:  {{ item.VoteCount }} <br /><b>Vote Average</b>:  {{ item.VoteAverage }}
                                    <br /><br /><a v-bind:href="item.HomePage">Homepage</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                </div>
            </div>
       </div>


    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
var chromelyService = require('../services/ChromelyService');

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

type Dict = { [key: string]: string };


@Component
export default class TmdbMovies extends Vue {

    searchText = '';
    movieListResult = new Array<MovieItem>();

    mounted() {
        this.getPopularMovies();
    }

    searchMovies() {
        this.getMovies('search', this.searchText);
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
    
    getMovies(reqType: string, queryValue: string) {
        const parameters: Dict = {};
        parameters["name"] = reqType;
        parameters["query"] = queryValue;
        chromelyService.messageRouterGetJson('/tmdbmoviescontroller/movies', parameters, this.onGetMoviesCallback);
    }

    onGetMoviesCallback(res: any) {
        var dataArray = this.parseArrayResult(res);
        this.movieListResult = dataArray
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
</script>

<style>
.moviesCointainer {
  padding-top: 1em;
  }
</style>
