<template>
    <div class="container justify-content-center">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-secondary btn-sm" @click="getMovies('popular', '')">popular</button>
                        <button type="button" class="btn btn-secondary btn-sm" @click="getMovies('toprated', '')">top rated</button>
                        <button type="button" class="btn btn-secondary btn-sm" @click="getMovies('nowplaying', '')">now playing</button>
                        <button type="button" class="btn btn-secondary btn-sm" @click="getMovies('upcoming', '')">upcoming</button>
                    </div>
                </div>
                <div class="col">

                    <div class="form-group row justify-content-end col-12">
                        <div>
                            <input v-model="searchText" type="text" class="form-control" placeholder="Search Movies" style="width:auto;" />
                        </div>
                        <button type="submit" class="btn btn-primary btn-sm" @click="searchMovies">Search</button>
                    </div>
                </div>
            </div>
        </div>


        <div class="moviesCointainer container-fluid">
            <div class="card-columns">
                <div v-for="item in movieListResult" :key="item.Id">

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
                                    <p class="card-text mt-4">
                                        <b>Popularity</b>: {{ item.Popularity }}<br /><b>Vote Count</b>:  {{ item.VoteCount }} <br /><b>Vote Average</b>:  {{ item.VoteAverage }}
                                        <br /><br /><a v-bind:href="item.HomePage">Homepage</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import { ref, onMounted, computed } from 'vue'
    var chromelyService = require('../services/ChromelyService');

    export default {

        setup() {

            const searchText = ref('');
            const movieListResultMap = ref([]);

            onMounted(() => {
                getMovies('popular', '');
            })

            const movieListResult = computed(() => {
                return movieListResultMap.value;
            })

            const searchMovies = () => {
                getMovies('search', searchText.value);
            }

            const getMovies = (reqType, queryValue) => {
                const parameters = {};
                parameters["name"] = reqType;
                parameters["query"] = queryValue;
                chromelyService.messageRouterGetJson('/tmdbmoviescontroller/movies', parameters, onGetMoviesCallback);
            }

            const onGetMoviesCallback = (res) => {
                movieListResultMap.value = parseArrayResult(res);
            }

            const parseArrayResult = (data) => {
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
                        HomePage: "http://command.com/tmdbmoviescontroller/homepage?movieId=" + data[i].id
                    };
                    dataArray.push(tempItem);
                }
                return dataArray;
            }

            return {
                searchText,
                movieListResult,
                searchMovies,
                getMovies
            }
        }
      }
</script>