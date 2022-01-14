import React from "react";
import { Routes, Link, Route } from "react-router-dom";
import Home from "./components/Home";
import TmdbMovies from './components/TmdbMovies';
import TodoList from './components/TodoList';
import MessageRouterDemo from './components/MessageRouterDemo';
import AjaxXhrDemo from './components/AjaxXhrDemo';
import Html5Tests from './components/Html5Tests';
import Html6Tests from './components/Html6Tests';
import GoogleShakaTests from './components/GoogleShakaTests';
import JavasSriptDemo from './components/JavasSriptDemo';
import './App.css';

export default function App() {
    return (
      <div>

        <nav className="navbar navbar-expand-sm navbar-light bg-faded">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <a className="navbar-brand text-muted" href="#">Demos</a>

            <div className="collapse navbar-collapse justify-content-end">
                <ul className="nav nav-pills">
                    <li className="nav-item"><Link to={'/'} className="nav-link"> home </Link></li>
                    <li className="nav-item"><Link to={'/tmdbmovies'} className="nav-link"> tmdb movies </Link></li>
                    <li className="nav-item"><Link to={'/todolist'} className="nav-link"> todo list </Link></li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" aria-haspopup="true" aria-expanded="false">basics</a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <div className="dropdown-item"><Link to={'/msgrouter'} className="nav-link"> Message Router Demo </Link></div>
                            <div className="dropdown-item"><Link to={'/ajax'} className="nav-link"> Ajax Demo </Link></div>
                            <div className="dropdown-item"><Link to={'/javascriptdemo'} className="nav-link"> Execute JavaScript Demo </Link></div>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-item"><Link to={'/html5tests'} className="nav-link"> HTML5 Tests </Link></div>
                            <div className="dropdown-item"><Link to={'/html6tests'} className="nav-link"> HTML6 Tests </Link></div>
                            <div className="dropdown-item"><Link to={'/shakatests'} className="nav-link"> Google Shaka Support Tests </Link></div>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-item"><a href="http://command.com/democontroller/showdevtools" className="btn btn-link btn-sm" role="button" style={{ margin: '5px' }}>Show DevTools</a></div>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>

            <Routes>
                <Route exact path='/' element={< Home />} />
                <Route path='/tmdbmovies' element={< TmdbMovies /> } />
                <Route path='/todolist' element={< TodoList /> } />
                <Route path='/msgrouter' element={< MessageRouterDemo /> } />
                <Route path='/ajax' element={< AjaxXhrDemo /> } />
                <Route path='/javascriptdemo' element={< JavasSriptDemo /> } />
                <Route path='/html5tests' element={< Html5Tests /> } />
                <Route path='/html6tests' element={< Html6Tests /> } />
                <Route path='/shakatests' element={< GoogleShakaTests />} />
                <Route path="*" element={< Home />} />
        </Routes>
    </div>
  );
}