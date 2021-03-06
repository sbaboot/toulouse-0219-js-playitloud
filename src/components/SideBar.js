/* eslint-disable react/button-has-type */
/* eslint-disable quotes */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Button } from 'reactstrap';
import { NavLink as NavRouter } from 'react-router-dom';

class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      profile: ''
    };
  }

  componentDidMount() {
    this.getUserProfil();
  }

  getUserProfil() {
    fetch('https://api.spotify.com/v1/me', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          profile: data,
        });
      });
  }

  toggle() {
    this.setState({
      // eslint-disable-next-line react/destructuring-assignment
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar className="sidebar" light>
          <NavbarToggler className="togglerButton" onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <div className="pictureName">
              {this.state.profile
                && (
                  <img
                    style={{ borderRadius: '100%', maxWidth: '15vh' }}
                    className="profilePicture"
                    src={this.state.profile.images[0].url}
                    alt={this.state.profile.display_name}
                  />
                )}
            </div>
            <NavbarBrand style={{ color: 'rgb(229,9,20)' }} tag={NavRouter} className="playItLoud" to="/">Play it Loud</NavbarBrand>
            <Nav className="linksidebar" navbar>
              <NavItem>
                <NavLink tag={NavRouter} className="asidebar" to="/" onClick={() => { localStorage.setItem('lastLink', '/'); }}>Accueil</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={NavRouter} className="asidebar" to="/profil" onClick={() => { localStorage.setItem('lastLink', '/profile'); }}>Profil</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={NavRouter} className="asidebar" to="/favoris" onClick={() => { localStorage.setItem('lastLink', '/favoris'); }}>Favoris</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={NavRouter} className="asidebar" to="/playlists" onClick={() => { localStorage.setItem('lastLink', '/playlists'); }}>Playlists</NavLink>
              </NavItem>
              <NavItem>
                <Button color='danger' className="decoButton" onClick={this.props.deco}>Déconnexion</Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

      </div>
    );
  }
}


export default SideBar;
