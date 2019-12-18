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
  }

  ngOnInit() {
    this._chromelyService.cefQueryGetRequest('/info', null, data => {
      this._zone.run(
          () => {
            this._chromelyOjective = data.divObjective;
            this._chromelyPlatform = data.divPlatform;
            this._chromelyVersion = data.divVersion;
          })
    });
  }  

}
