import React from 'react';
import {Link} from 'react-router-dom';
import {AiFillHome} from 'react-icons/ai';
import {MdTimeline} from 'react-icons/md'
import {HiChartSquareBar} from 'react-icons/hi'
import {FaPen} from 'react-icons/fa'
import {CgAlbum} from 'react-icons/cg';
import './Nav.css';

const NavBar = () => {
    return (
        <nav className="navbar" >
          <ul className="navcontainer">
            <li className="nav-item">
              <Link to="/dashboard">
                  <AiFillHome className="icon-button" />         
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/timeline">
                  <MdTimeline  className="icon-button"/> 
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/analysis" >
                  <HiChartSquareBar className="icon-button"/>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/form" >
                  <FaPen className="icon-button"/>

              </Link>
            </li>
            <li className="nav-item">
              <Link to="/writeon" >
                  <CgAlbum className="icon-button"/>
                </Link>
            </li>
          </ul>
        </nav>
    )
}

const NavItem= () => {
    return (
        <li className="nav-item">
            <a href="#" className="icon-button">
                {props.icon}
            </a>
        </li>
    )

}
export default NavBar;

