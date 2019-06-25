import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';




class Home extends Component {
  render() {
    return(
      <div>
        <Grid className="landing-grid">
        <Cell col={4}>
            <h2>Ruposhi Kotiruoka</h2>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Q3iSoG2kz25a74XBXRD6goJhvnPXP-lo1QVBCoxaVgNFT8wWew"
              alt="avatar"
              style={{height: '225px'}}
               />
             <h5 style={{ width: '75%', margin: 'auto', paddingTop: '1em',}}>We deliver to your home free</h5>

          </Cell>


          <Cell col={8}>
            <h2>Ketä me olemme?</h2>
            
             <p style={{ width: '75%', margin: 'auto', paddingTop: '1em'}}>Olemme pieni pito-palveluyritys, 
             joka on aloittanut toimintansa Oulussa vuonna 2018. Omistaja / kokki on Bangladeshilainen ja 
             asunnut Suomessa jo kymmeniä vuosia nauttien paikallisia suomalaisia herkkuja. Ruposhi kotiruoka 
             tarjoilee itä-länsimaisen makujen yhdistelmän. Täältä voit löytää Bangladeshilaista ruokaa suomalaisella
              maulla ja joitain suomalaisia reseptejä Bangladeshin maun mukaan. Tilaa ruokaa meiltä ja nauti ainutlaatuisesta 
              yhdistelmästä. Voit maksaa tilauksen toimituksen jälkeen käteisellä tai kortilla Toimitukset myös arkipäivisin, 
              kun tilaus tehdään vähintään päivää ennen</p>

          </Cell>

        </Grid>
      </div>
    )
  }
}

export default Home;
