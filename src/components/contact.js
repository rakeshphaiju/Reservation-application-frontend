import React, { Component } from 'react';
import { Grid, Cell, List, ListItem, ListItemContent } from 'react-mdl';



class Contact extends Component {
  render() {
    return(
      <div className="contact-body">
      <Grid className="contact-grid">
          <Cell col={6}>
            <h2>Ruposhi Kotiruoka</h2>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfL_Yh1tag7SUoS1kuoU4ypFwbR1GN2Y5Sb6K6iZLkh1EWY79K5Q"
              alt="avatar"
              style={{height: '250px'}}
               />
             <p style={{ width: '75%', margin: 'auto', paddingTop: '1em'}}>Feel free to contact us if you have any query</p>

          </Cell>

          
        <Cell col={6}>
          <h2>Contact Us</h2>
          <hr/>

          <div className="contact-list">
            <List>
              <ListItem>
                <ListItemContent style={{fontSize: '30px', fontFamily: 'Anton'}}>
                  <i className="fa fa-phone-square" aria-hidden="true"/>
                  (+358)401234
                </ListItemContent>
              </ListItem>

              <ListItem>
                <ListItemContent style={{fontSize: '25px', fontFamily: 'Anton'}}>
                  <i className="fa fa-envelope" aria-hidden="true"/>
                  ruposhikotiruoka@gmail.com
                </ListItemContent>
              </ListItem>

              <ListItem>
                <ListItemContent style={{fontSize: '30px', fontFamily: 'Anton'}}>
                  <i className="fa fa-whatsapp" aria-hidden="true"/>
                  ruposhikotiruoka
                </ListItemContent>
              </ListItem>

              <ListItem>
                  <ListItemContent style={{fontSize: '30px', fontFamily: 'Anton'}}>
                    <i className="fa fa-skype" aria-hidden="true"/>
                    MySkypeID
                  </ListItemContent>
                </ListItem>

            </List>
          </div>
        </Cell>
      </Grid>
    </div>
    )
  }
}

export default Contact;
