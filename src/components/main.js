import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from './landingpage';

import Reserve from './reserve';

import Home from './home';

import Contact from './contact';

import Reservationlist from './reservationlist';


const Main = () => (
  <Switch>
    <Route exact path="/landingpage" component={LandingPage} />
    
    <Route path="/reserve" component={Reserve} />
   
    <Route path="/home" component={Home} />

    <Route path="/contact" component={Contact} />

    <Route path="/reservationlist" component= {Reservationlist} />
  </Switch>
)

export default Main;
