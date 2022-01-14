import React from "react";
import { useState, useEffect } from 'react';
import { messageRouterGet } from '../services/Chromely.Service.js';

const imageStyle = {
    height: '100%',
    width: '100%',
    'object-fit': 'contain'
};

const BoundObjectGetRows = (props) => (
    <div className='col-sm-6 col-lg-3 mb-3'>
        <div className='card h-100'>
            <div className='row no-gutters'>
                <div className='col-md-12 text-center'>
                    <img src={'https://image.tmdb.org/t/p/original' + props.item.poster_path} alt='...' title={props.item.overview} style={imageStyle} />
                </div>
                <div className='col-md-12'>
                    <div className='card-body'>
                        <h4 className='card-title text-info'>{props.item.original_title}</h4>
                        <h6 className='card-subtitle text-muted'>{props.item.release_date}</h6>
                        <p className='card-text mt-4'><b>Popularity</b>: {props.item.popularity}<br /><b>Vote Count</b>:  {props.item.vote_count} <br /><b>Vote Average</b>:  {props.item.vote_average}
                            <br /><br /><a href={'http://command.com/tmdbmoviescontroller/homepage?movieid=' + props.item.id}>Homepage</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default function TmdbMovies() {

    const [searchText, setSearchText] = useState('');
    const [moviesList, setMoviesList] = useState([]);

    const searchMovies = (event) => {
        event.preventDefault();
        getMovies('search', searchText);
    };

    const getPopularMovies = (event) => {
        event.preventDefault();
        getMovies('popular', '');
    };

    const getTopratedMovies = (event) => {
        event.preventDefault();
        getMovies('toprated', '');
    };

    const getNowplayingMovies = (event) => {
        event.preventDefault();
        getMovies('nowplaying', '');
    };

    const getUpcomingMovies = (event) => {
        event.preventDefault();
        getMovies('upcoming', '');
    };

    const searchTextChange = (event) => {
        event.preventDefault();
        setSearchText(event.target.value);
    };

    const getMovies = (reqType, queryValue) => {
        var parameters = {};
        parameters["name"] = reqType;
        parameters["query"] = queryValue;
        messageRouterGet('/tmdbmoviescontroller/movies', parameters, onGetMoviesCallback);
    };

    const onGetMoviesCallback = (data) => {
        if (!data || data == null) {
            data = [];
        }

        setMoviesList(data);
    };

    useEffect(() => {
        getMovies('popular', '');
    }, []);

    return (
        <div>
            <div className="container justify-content-center">

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-secondary btn-sm" onClick={getPopularMovies}>popular</button>
                                <button type="button" className="btn btn-secondary btn-sm" onClick={getTopratedMovies}>top rated</button>
                                <button type="button" className="btn btn-secondary btn-sm" onClick={getNowplayingMovies}>now playing</button>
                                <button type="button" className="btn btn-secondary btn-sm" onClick={getUpcomingMovies}>upcoming</button>
                            </div>
                        </div>
                        <div className="col">

                            <div className="form-group row justify-content-end col-12">
                                <div>
                                    <input type="text" onChange={searchTextChange} className="form-control" placeholder="Search Movies" style={{ width: 'auto' }} />
                                </div>
                                <button type="submit" className="btn btn-primary btn-sm" onClick={searchMovies}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        {moviesList.map((value) => {
                            return <BoundObjectGetRows item={value} />;
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}
