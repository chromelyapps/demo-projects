import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, CardHeader, CardBody, CardText, Button, Label, Media } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Table } from 'reactstrap';
import classnames from 'classnames';

import { messageRouterGet, messageRouterPost } from './services/MessageRouter.Service.js'; 

const chromelylogo = require('./assets/img/chromely.png');
const reactlogo = require('./assets/img/logo.svg');

class BoundObjectGetRows extends React.Component {
  render() {
    console.log(this.props.key)
    return (
      <tr>
        <td>{this.props.item.Id}</td>
        <td>{this.props.item.Title}</td>
        <td>{this.props.item.Year}</td>
        <td>{this.props.item.Votes}</td>
        <td>{this.props.item.Rating}</td>
        <td>{this.props.item.Date}</td>
        <td>{this.props.item.RestfulAssembly}</td>
      </tr>
    )
  }
}

class Demo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      info: { objective: 'Chromely Main Objectives', platform: 'Platforms', version: 'Version' },
      get1Result: [],
      get2Result: [],
      postResult: 'Post request not ran or no result received.',
      modal: false,
      activeTab: 'get'
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.get1Click = this.get1Click.bind(this);
    this.get2Click = this.get2Click.bind(this);
    this.postClick = this.postClick.bind(this);
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  setTabActive(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  /* Start - .NET Javascript Integration Methods */
  parseArrayResult(data) {
    var dataArray = [];

    for (var i = 0; i < data.length; i++) {
        var tempItem = {
          Id: data[i].Id,
          Title: data[i].Title,
          Votes: data[i].Votes,
          Year: data[i].Year,
          Rating: data[i].Rating,
          Date: data[i].Date,
          RestfulAssembly: data[i].RestfulAssembly
       };
       dataArray.push(tempItem);
    }
    return dataArray;
  }

  onGetCallback1(data, _self) {
    var dataArray = _self.parseArrayResult(data);
    _self.setState({
      get1Result: dataArray
    });
  }
  
  onGetCallback2(data, _self) {
    var dataArray = _self.parseArrayResult(data);
    _self.setState({
      get2Result: dataArray
    });
  }

  onPostCallback(data, _self) {
    _self.setState({
      postResult: data
    });
  }
  /* End - .NET Javascript Integration Methods */

  /* Start - Click Events */
  get1Click(event) {
    event.preventDefault()
    messageRouterGet('/democontroller/movies', null, this.onGetCallback1, this);
  }

  get2Click(event) {
    event.preventDefault()
    messageRouterGet('/externalcontroller/movies', null, this.onGetCallback2, this);
  }

  postClick(event) {
    event.preventDefault()

    var moviesJson = [
      { Id: 1, Title: "The Shawshank Redemption", Year: 1994, Votes: 678790, Rating: 9.2 },
      { Id: 2, Title: "The Godfather", Year: 1972, votes: 511495, Rating: 9.2 },
      { Id: 3, Title: "The Godfather: Part II", Year: 1974, Votes: 319352, Rating: 9.0 },
      { Id: 4, Title: "The Good, the Bad and the Ugly", Year: 1966, Votes: 213030, Rating: 8.9 },
      { Id: 5, Title: "My Fair Lady", Year: 1964, Votes: 533848, Rating: 8.9 },
      { Id: 6, Title: "12 Angry Men", Year: 1957, Votes: 164558, Rating: 8.9 }
    ];

    messageRouterPost('/democontroller/movies', null, moviesJson, this.onPostCallback, this);
  }
  /* End - Click Events */

  render() {
    const { info } = this.state;
    const { get1Result } = this.state;
    const { get2Result } = this.state;
    const { postResult } = this.state;

    return (
      <Container>
          <div className="centerBlock">
          <Row>
            <Col xs="3">
            </Col>
            <Col xs="3">
            <Media object src={chromelylogo} className="img-rounded" alt="Chromely Logo" width="140" height="140">
            </Media>
            </Col>
            <Col xs="3">
                <Media  object src={reactlogo} className="react-logo" alt="react logo" width="180" height="180" >
              </Media>
            </Col>
            <Col xs="3">
              </Col>
          </Row>

            <Row className="centerBlock">
              <span className="text-primary text-center"><h2>demo panel</h2></span>
            </Row>

            <br />

            <Row>
              <Link to="/"><button className="btn btn-primary" style={{margin: "#5px"}}>Back</button></Link>
            </Row>

            <br />

            <Row className="centerBlock">
              <Button type="button" className="btn btn-light" onClick={this.toggleModal} style={{margin: "#5px"}}>RegisterAsyncJsObject Demo</Button>
              <a href="https://github.com/mattkol/Chromely" className="btn btn-default" role="button" style={{margin: "#5px"}}>more info</a>
            </Row>

            <Row className="centerBlock">
              <Card>
                <CardHeader className="card-header card bg-primary text-white">Chromely Main objective</CardHeader>
                <CardBody>
                  <CardText>{ info.objective }</CardText>
                </CardBody>
              </Card>

              <Card>
                <CardHeader className="card-header card bg-primary text-white">Platforms</CardHeader>
                <CardBody>
                  <CardText>{ info.platform }</CardText>
                </CardBody>
              </Card>

              <Card>
                <CardHeader className="card-header card bg-primary text-white">Current CefSharp/Chromium Version</CardHeader>
                <CardBody>
                  <CardText>{ info.version }</CardText>
                </CardBody>
              </Card>

            </Row>
      </div>

      <div>
        <Modal className="modal-lg" isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader>.NET/JavaScript Integration (RegisterAsyncJsObject) Demo</ModalHeader>
          <ModalBody>
            <div>
            <Nav pills>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === 'get1' })}
                 onClick={() => { this.setTabActive('get1'); }}>Get1</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === 'get2' })}
                  onClick={() => { this.setTabActive('get2'); }}>Get2</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === 'post' })}
                  onClick={() => { this.setTabActive('post'); }}>Post</NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="get1">
              <div>
                    <Row style={{margin: "#5px"}}>
                       &ensp;&ensp;&ensp;Route Path:&ensp;/democontroller/movies &ensp; (Restful Service in Local Assembly)&ensp;<button type="button" className="btn btn-primary btn-sm" onClick={this.get1Click}>Run</button>
                    </Row>
                    <br/><br/>
                    <Row>
                      <Table>
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
                        <tbody>
                        {get1Result.map(function(item, key) {
                             return <BoundObjectGetRows key={key} item={item}/>;
                        })}
                        </tbody>
                      </Table>
                    </Row>
                </div>
              </TabPane>
              <TabPane tabId="get2">
                 <Row style={{margin: "#5px"}}>
                    &ensp;&ensp;&ensp;Route Path:&ensp;/externalcontroller/movies &ensp; (Restful Service in Local Assembly)&ensp;<button type="button" className="btn btn-primary btn-sm" onClick={this.get2Click}>Run</button>
                    </Row>
                    <br/><br/>
                    <Row>
                      <Table>
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
                        <tbody>
                        {get2Result.map(function(item, key) {
                             return <BoundObjectGetRows key={key} item={item}/>;
                        })}
                        </tbody>
                      </Table>
                    </Row>
              </TabPane>
              <TabPane tabId="post">
                 <Row>
                  &ensp;&ensp;&ensp;Route Path:&ensp;/democontroller/savemovies&ensp;(Restful Service in Local Assembly)&ensp;<button type="button" className="btn btn-primary btn-sm" onClick={this.postClick}>Run</button>
                </Row>
                <br/><br/>
                <Row>
                  <div>&ensp;&ensp;&ensp;{postResult}</div>
                </Row>
              </TabPane>
            </TabContent>

          </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleModal}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>

    </Container>
    )
  }

}

export default Demo
