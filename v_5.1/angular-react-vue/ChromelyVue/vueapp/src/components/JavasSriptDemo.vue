<template>
    <div class="container-fluid justify-content-center">
        <div class="form-group row justify-content-center col-12">
            <div class="row col-8">
                <h1>Execute JavaScript Demo</h1>
            </div>
            <div class="row col-8">
                <div class="card">
                    <div class="card-header">Script:</div>
                    <div class="card-body">
                        <div class="form-group">
                            <textarea class="form-control" rows="3" v-model="scriptValue" placeholder="Enter JavaScript method here .."></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row col-8">
                <button id="execute" type="button" class="btn btn-primary btn-sm" @click="executeRun" style="margin: 5px;">Execute</button>
            </div>
            <div class="row col-8">
                <table class="table table-striped" style="margin-top: 10px;">
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


<script>
    import { ref, computed } from 'vue'
    var chromelyService = require('../services/ChromelyService');

    export default {
        setup() {

            const resultsMap = ref([]);
            const scriptValue = ref("alert('Chromely : Build .NET/.NET Core HTML5 desktop apps using cross-platform native GUI API.');");

            const results = computed(() => {
                return resultsMap.value;
            })

            const executeRun = () => {
                if (!scriptValue.value || scriptValue.value.length == 0) {
                    addItem("Script must not be empty.");
                }
                else if (scriptValue.value.length < 6) {
                    addItem("Not valid script: " + scriptValue.value + ". Script must be greater than 5 characters.");
                }
                else {
                    var postData = { "framename": "", "script": scriptValue.value };
                    chromelyService.messageRouterPostJson('/executejavascript/execute', null, postData, addItem, this);
                }
            }

            const addItem = (msg) => {
                resultsMap.value.push(msg);
            }

            return {
                results,
                scriptValue,
                executeRun
            }
        }
    }
</script>


<style>
    .card, card-header, card-body {
        width: 700px;
    }
</style>
