import React, { Component } from 'react';
import { messageRouterGet } from '../services/Chromely.Service.js';

const imageStyle = {
  height: '100%',
  width: '100%',
  'object-fit': 'contain'
};

class BoundObjectGetRows extends React.Component {
  render() {
    return (
      <div className='col-sm-6 col-lg-3 mb-3'>
      <div className='card h-100'>
        <div className='row no-gutters'>
          <div className='col-md-12 text-center'>
            <img src={'https://image.tmdb.org/t/p/original' + this.props.item.poster_path} alt='...' title={this.props.item.overview} style={imageStyle} />
            </div>
              <div className='col-md-12'>
                <div className='card-body'>
                  <h4 className='card-title text-info'>{this.props.item.original_title}</h4>
                  <h6 className='card-subtitle text-muted'>{this.props.item.release_date}</h6>
                  <p className='card-text mt-4'><b>Popularity</b>: {this.props.item.popularity}<br /><b>Vote Count</b>:  {this.props.item.vote_count} <br /><b>Vote Average</b>:  {this.props.item.vote_average}
                  <br /><br /><a href={'http://command.com/tmdbmoviescontroller/homepage?movieid=' + this.props.item.id}>Homepage</a></p>
                </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

class TmdbMovies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      moviesList: []
    };

      
    this.searchMovies = this.searchMovies.bind(this);
    this.getLatestMovies = this.getLatestMovies.bind(this);
    this.getPopularMovies = this.getPopularMovies.bind(this);
    this.getTopratedMovies = this.getTopratedMovies.bind(this);
    this.getNowplayingMovies = this.getNowplayingMovies.bind(this);
    this.getUpcomingMovies = this.getUpcomingMovies.bind(this);
    this.searchTextChange = this.searchTextChange.bind(this);
  }

  componentDidMount() {
    this.getMovies('popular', '');
  }

  searchMovies(event) {
    event.preventDefault()

    const { searchText } = this.state;
    this.getMovies('search', searchText);
  }
  
  getLatestMovies(event) {
    event.preventDefault()
    this.getMovies('latest', '');
  }

  getPopularMovies(event) {
    event.preventDefault()
    this.getMovies('popular', '');
  }

  getTopratedMovies(event) {
    event.preventDefault()
    this.getMovies('toprated', '');
  }

  getNowplayingMovies(event) {
    event.preventDefault()
    this.getMovies('nowplaying', '');
  }

  getUpcomingMovies(event) {
    event.preventDefault()
    this.getMovies('upcoming', '');
  }
 
  getMovies(reqType, queryValue) {
    var parameters = {};
    parameters["name"] = reqType;
    parameters["query"] = queryValue;
    console.log(parameters);
    messageRouterGet('/tmdbmoviescontroller/movies', parameters, this.onGetMoviesCallback, this);
 }

 onGetMoviesCallback(data, _self) {
     console.log(data);
     if (!data || data == null) {
      data = [];
     }
    _self.setState({
      moviesList: data
    });
  }

  searchTextChange(event) {
    event.preventDefault();

    this.setState({searchText: event.target.value});
 }

  render() {

    const { searchText } = this.state;
    const { moviesList } = this.state;

    return (
      <div className="container justify-content-center">

        <div className="container">
              <div className="row">
                <div className="col">
                  <div className="btn-group" role="group">
                          <button type="button" className="btn btn-secondary btn-sm" onClick={this.getLatestMovies}>latest</button>
                          <button type="button" className="btn btn-secondary btn-sm" onClick={this.getPopularMovies}>popular</button>
                          <button type="button" className="btn btn-secondary btn-sm" onClick={this.getTopratedMovies}>top rated</button>
                          <button type="button" className="btn btn-secondary btn-sm" onClick={this.getNowplayingMovies}>now playing</button>
                          <button type="button" className="btn btn-secondary btn-sm" onClick={this.getUpcomingMovies}>upcoming</button>
                        </div>
                </div>
                <div className="col">
                    
                  <div className="form-group row justify-content-end col-12">
                        <div>
                          <input  value={searchText} onChange={this.searchTextChange} type="text" className="form-control" placeholder="Search Movies" style={{width: 'auto'}} />
                      </div>
                      <button type="submit" className="btn btn-primary btn-sm" onClick={this.searchMovies}>Search</button>
                  </div>
                </div>
              </div>
        </div>

        {/* Movies List ---------- */} 
        <div className="container">
          <div className="row">
            {moviesList.map((value, index) => {
               return <BoundObjectGetRows item={value}/>;
             })}
          </div>
        </div>

        {/* End Movies List ---------- */} 

    </div>
    );
  }
}

export default TmdbMovies;