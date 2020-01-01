import { Component, NgZone } from '@angular/core';
import { ChromelyService } from './../../services/chromely.service';

@Component({
  selector: 'app-javascriptdemo',
  templateUrl: './javascriptdemo.component.html',
  styleUrls: ['./javascriptdemo.component.css']
})
export class JavaScriptDemoComponent {

  _scriptValue: string;
  _results: Array<any>;

  constructor(private _chromelyService: ChromelyService, private _zone: NgZone) {
    this._scriptValue =  "alert('Chromely : Build .NET/.NET Core HTML5 desktop apps using cross-platform native GUI API.');";
    this._results = new Array<any>();
  }

   executeRun() {
        if (!this._scriptValue || this._scriptValue.length == 0) {
            this.onError("Script must not be empty.");
        }
        else if (this._scriptValue.length < 6) {
            this.onError("Not valid script: " + this._scriptValue + ". Script must be greater than 5 characters.");
        }
        else {
            var postData = { "framename": "", "script": this._scriptValue };
            this._chromelyService.cefQueryPostRequest('/executejavascript/execute', null, postData, data => {
              this._zone.run(
                  () => {
                    var dataArray = this._results;
                    dataArray.push(data);
                    this._results = dataArray;
                  })
            });
        }
    }

    onError(msg: any) {
        var dataArray = this._results;
        dataArray.push(msg);
        this._results = dataArray;
    }

}
