import './App.css';
import React, {useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';
import {Login} from "./Login";
import {SzallasList} from "./SzallasList";
import {Logout} from "./Logout";
import {SzallasSingle} from "./SzallasSingle";
import {SzallasCreate} from "./SzallasCreate";
import { SzallasMod } from './SzallasMod';
import { SzallasDel } from './SzallasDel';

export const App = () => {
  return (
    <Router>
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark' style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1 }}>
        <div className='container-fluid'>
          <div className='navbar-brand'>SzallasJWT</div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <NavLink to={"/"} className={({isActive}) => "nav-link" + (isActive? "active" : "")}>
                Bejelentkezés</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to={"/SzallasList"} className={({isActive}) => "nav-link" + (isActive? "active" : "")}>
                Szállás lista</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to={"/Create-szallas"} className={({isActive}) => "nav-link" + (isActive? "active" : "")}>
                Új szállás felvétele</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to={"/Logout"} className={({isActive}) => "nav-link" + (isActive? "active" : "")}>
                Kijelentkezés</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/SzallasList' element={<SzallasList />} />
        <Route path="/Szallasok/:szallasId" element={<SzallasSingle />} />
        <Route path="/Create-szallas" element={<SzallasCreate />} />
        <Route path='/Mod-szallas/:szallasId' element={<SzallasMod/>} />
        <Route path='/Del-szallas/:szallasId' element={<SzallasDel/>} />
        <Route path='/Logout' element={<Logout />} />
        <Route path='*' element={<Login />} />
      </Routes>
    </Router>
  );
}
