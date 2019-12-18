import { Component, OnInit, Input  } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-html5tests',
  template: '<iframe [src]="_urlSafe" width="100%" height="800"  frameborder="0" allowFullscreen></iframe>'
})
export class GoogleShakaTestsComponent implements OnInit {
  _url: string = "https://shaka-player-demo.appspot.com/demo/#asset=https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd;lang=en-US;build=uncompiled";
  _urlSafe: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this._urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this._url);
  }
}
