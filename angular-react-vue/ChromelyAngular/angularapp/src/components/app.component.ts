import { Component } from '@angular/core';
import { ChromelyService } from './../services/chromely.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _chromelyService: ChromelyService) {
  }

  showDevTools(): void {
    this._chromelyService.openExternalUrl("http://command.com/democontroller/showdevtools");
  }
}


