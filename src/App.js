import React, { Component } from 'react';
import './App.css';

import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import Main from './components/main';
import { Link } from 'react-router-dom';

class App extends Component {
  onDayClick = (e, day) => {
    alert(day);
  }
  render() {
    return (
      <div className="demo-big-content">
            <Layout>
                  <Header className="header-color" title={<Link style={{textDecoration: 'none', color: 'white'}} to="/">My Reservation Page</Link>} scroll>
                      
                      <Navigation>
                          <Link to="/home">Home</Link>
                          <Link to="/reserve">Reserve</Link>
                          <Link to="/contact">Contact</Link>
                          <Link to="/reservationlist">ReservationList</Link>
                      </Navigation>
                      
                  </Header>
                  
                      <Drawer title={<Link style={{textDecoration: 'none', color: 'black'}} to="/">Reservation</Link>}>
                  
                      <Navigation>
                         <Link to="/home">Home</Link>
                        <Link to="/reserve">Reserve</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/reservationlist">Reservationlist</Link>
                      </Navigation>
                      </Drawer>
                      
                  <Content>
                      <div className="page-content" />
                      
                      <Main/>
                  </Content>
              </Layout>
        </div>

       

    );
  }
}

export default App;
