<template>
    <div class="container justify-content-center">
            <!-- -->
            <div class="form-group row justify-content-center col-12">
                <div class="row col-12">
                    <h1>Message Router Demo</h1>
                </div>
    
                    <!-- Nav pills -->
                <div class="row col-12">
                        <ul class="nav nav-pills" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" data-toggle="pill" href="#sectionA">Get 1</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="pill" href="#sectionB">Get 2</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="pill" href="#sectionC">Post</a>
                                </li>
                        </ul>
                </div>


                <div class="row col-12">
                    <div class="row" style="height:25px;"></div>
                        
                <!-- Tab panes -->
                <div class="tab-content">
                        <div id="sectionA" class="container tab-pane active">
                            <br>
                            <div class="row">
                                <div class="col-12">
                                    Route Path:&ensp;/democontroller/movies &ensp; (Restful Service in Local Assembly)&ensp;<button type="button" class="btn btn-primary btn-sm" @click="messageRouterGet1Run">Run</button>
                                </div>
                                <div style="height:100px;"></div>
                                <div class="col-12">
                                    <div class='table-responsive'>
                                        <table class='table'>
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
                                             <tbody tr v-for="item in messageRouterGetResult1" :key="item.Id">
                                                <tr>
                                                    <th>{{ item.Id }}</th>
                                                    <th>{{ item.Title }}</th>
                                                    <th>{{ item.Year }}</th>
                                                    <th>{{ item.Votes }}</th>
                                                    <th>{{ item.Rating }}</th>
                                                    <th>{{ item.Date }}</th>
                                                    <th>{{ item.RestfulAssembly }}</th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="sectionB" class="container tab-pane fade">
                            <br>
                            <div class="row">
                                <div class="col-12">
                                    Route Path:&ensp;/externalcontroller/movies &ensp;(Restful Service in External Assembly)&ensp;<button  type="button" class="btn btn-primary btn-sm" @click="messageRouterGet2Run">Run</button>
                                </div>
                                <div style="height:100px;"></div>
                                <div class="col-12">
                                    <div class='table-responsive'>
                                        <table class='table'>
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
                                            <tbody tr v-for="item in messageRouterGetResult2" :key="item.Id">
                                                <tr>
                                                    <th>{{ item.Id }}</th>
                                                    <th>{{ item.Title }}</th>
                                                    <th>{{ item.Year }}</th>
                                                    <th>{{ item.Votes }}</th>
                                                    <th>{{ item.Rating }}</th>
                                                    <th>{{ item.Date }}</th>
                                                    <th>{{ item.RestfulAssembly }}</th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="sectionC" class="container tab-pane fade">
                            <br>
                            <div class="row">
                                <div class="col-12">
                                    Route Path:&ensp;/democontroller/movies&ensp;(Restful Service in Local Assembly)&ensp;<button type="button" class="btn btn-primary btn-sm" @click="messageRouterPostRun">Run</button>
                                </div>
                                <div style="height:100px;"></div>
                                <div class="col-12">
                                     <div>{{ messageRouterPostResult }}</div>
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
    Votes: string;
    Year: string;
    Rating: string;
    Date: string;
    RestfulAssembly: string;
}

@Component({
  props: {
  }
})
export default class MessageRouterDemo extends Vue {

    messageRouterGetResult1 = new Array<MovieItem>();
    messageRouterGetResult2 = new Array<MovieItem>();
    messageRouterPostResult = 'Post request not ran or no result recieved.'

    messageRouterGet1Run() {
         chromelyService.messageRouterGetJson('/democontroller/movies', null, this.messageRouterGet1Callback);
    }

    messageRouterGet2Run() {
          chromelyService.messageRouterGetJson('/externalcontroller/movies', null, this.messageRouterGet2Callback);
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

         chromelyService.messageRouterPostJson('/democontroller/movies', null, moviesJson, this.messageRouterPostCallback);
    }

    messageRouterGet1Callback (res: any) {
            var dataArray = this.parseArrayResult(res);
            this.messageRouterGetResult1 = dataArray
    }

    messageRouterGet2Callback(res: any) {
        var dataArray = this.parseArrayResult(res)
        this.messageRouterGetResult2 = dataArray
    }

    messageRouterPostCallback(res: string) {
        this.messageRouterPostResult = res
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
</script>

