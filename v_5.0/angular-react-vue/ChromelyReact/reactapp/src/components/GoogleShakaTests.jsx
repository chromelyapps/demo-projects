import React, { Component } from 'react';

const frameStyle = {
   width: '100%', 
   height: '800px',  
   frameborder: '0'
 };

class GoogleShakaTests extends Component {
  render() {
    return (
      <div className="container-fluid">
      <div className="row">
          <div className="col-12 p-0">
              <div className="text-center m-0  d-flex flex-column justify-content-center">
                  <iframe id="demoframe" name="alldemoframe" src="https://shaka-player-demo.appspot.com/demo/#asset=https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd;lang=en-US;build=uncompiled" style={frameStyle} allowFullScreen/>
              </div>
          </div>
      </div>
  ` </div>
    );
  }
}

export default GoogleShakaTests;