import { Component, OnInit, NgZone } from '@angular/core';
import { ChromelyService } from './../../services/chromely.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  _chromelyOjective: string;
  _chromelyPlatform: string;
  _chromelyVersion: string;

  constructor(private _chromelyService: ChromelyService,
    private _zone: NgZone) {
      this._chromelyOjective = "";
      this._chromelyPlatform = "";
      this._chromelyVersion = "";
  }

  ngOnInit() {
    this._chromelyService.cefQueryGetRequest('/info', null, (data: { objective: string; platform: string; version: string; }) => {
      this._zone.run(
          () => {
            this._chromelyOjective = data.objective;
            this._chromelyPlatform = data.platform;
            this._chromelyVersion = data.version;
          })
    });
  }  

}
