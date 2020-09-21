import React, { Component } from 'react';
import { messageRouterGet } from '../services/Chromely.Service.js';

const chromelylogo = require('./../assets/img/chromely_gray.png');
const reactlogo = require('./../assets/img/logo.svg');

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
        chromelyOjective: '',
        chromelyPlatform: '',
        chromelyVersion: ''
      };
  }

  componentDidMount() {
    messageRouterGet('/info', null, this.getInfoCallback, this);
  }
  
  getInfoCallback(data, _self) {
    _self.setState({
      chromelyOjective: data.divObjective,
      chromelyPlatform: data.divPlatform,
      chromelyVersion: data.divVersion
    });
  }

  render() {

    const { chromelyOjective } = this.state;
    const { chromelyPlatform } = this.state;
    const { chromelyVersion } = this.state;

    return (
      <div className="container-fluid">
          <div className="row ">
              <div className="col-12">
                  <div className="text-center m-0  d-flex flex-column justify-content-center">
                      <div>
                          <div class="row justify-content-center">
                            <div class="justify-content-right">
                              <img src={chromelylogo} className="img-rounded spacer25" alt="Cinque Terre" width="160" height="160" />
                            </div>
                            <div class="justify-content-left">
                              <img src={reactlogo} className="img-rounded" alt="Cinque Terre" width="240" height="240" />
                            </div>
                          </div>

                          <div>
                              <span className="text-primary text-center"><h2>chromely react</h2></span>
                          </div>
                          <div>
                              <p className="text-muted text-center">Build .NET/.NET CORE HTML5 Desktop Apps</p>
                          </div>
                          <div>
                              <p></p>
                          </div>
                          <div className="container col-8 justify-content-center">
                              <ul className="list-group">
                                  <li className="list-group-item d-flex justify-content-between align-items-center">
                                      <p><b>Chromely Main Objective</b>: {chromelyOjective}</p>
                                  </li>
                                  <li className="list-group-item d-flex justify-content-between align-items-center">
                                      <p><b>Platforms</b>:  {chromelyPlatform}</p>
                                  </li>
                                  <li className="list-group-item d-flex justify-content-between align-items-center">
                                      <p><b>Chromium - CefGlue Version</b>: {chromelyVersion}</p>
                                  </li>
                              </ul>
                          </div>
                          <div>
                              <p></p>
                          </div>
                          <div>
                              <p></p>
                          </div>
                          <div>
                              <a href="https://github.com/chromelyapps/Chromely" className="btn btn-default" role="button" style={{margin: '5px'}} >more info</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>   
    );
  }
}

export default Home;