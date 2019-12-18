<template>
    <div class="container justify-content-center">
    <div class="form-group row justify-content-center col-12">
            <div class="row col-8">
                    <h1>Execute JavaScript Demo</h1>
                </div>
                <div class="row col-8">
                    <div class="card">
                        <div class="card-header">Script:</div>
                        <div class="card-body">
                                <div class="col-8">
                                        <textarea  class="form-control" rows="5" cols="100%"  v-model="scriptValue" placeholder="Enter JavaScript method here .." ></textarea>
                                    </div>
                        </div>
                    </div>
                </div>
                <div class="row col-8">
                        <button id="execute" type="button" class="btn btn-primary btn-sm" @click="executeRun" style="margin: 5px;">Execute</button>
                    </div>
                <div class="row col-8">
                    <table class="table table-striped"  style="margin-top: 10px;">
                        <thead>
                        <tr>
                            <th scope="col" style="width: 100px;">Type</th>
                            <th scope="col">Output</th>
                        </tr>
                        </thead>
                        <tbody tr v-for="item in results" :key="item">
                            <tr>
                                <th>Execute</th>
                                <th>{{ item }}</th>
                            </tr>
                        </tbody>
                    </table>
                    </div>
            </div>
        </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
var chromelyService = require('../services/ChromelyService');

@Component
export default class JavasSriptDemo extends Vue {

    scriptValue =  "alert('Chromely : Build .NET/.NET Core HTML5 desktop apps using cross-platform native GUI API.');";
    results = new Array<any>();

    executeRun() {
        if (!this.scriptValue || this.scriptValue.length == 0) {
            this.onError("Script must not be empty.");
        }
        else if (this.scriptValue.length < 6) {
            this.onError("Not valid script: " + this.scriptValue + ". Script must be greater than 5 characters.");
        }
        else {
            var postData = { "framename": "", "script": this.scriptValue };
            chromelyService.messageRouterPostJson('/executejavascript/execute', null, postData, this.onExecuteCallback, this);
        }
    }

    onExecuteCallback(res: any) {
        var dataArray = this.results;
        dataArray.push(res);
        this.results = dataArray;
    }

    onError(msg: any) {
        var dataArray = this.results;
        dataArray.push(msg);
        this.results = dataArray;
    }
}
</script>

