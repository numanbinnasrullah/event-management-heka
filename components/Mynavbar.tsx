import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import styles from '@/styles/Signup.module.css'

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import Link from 'next/link'
import {fetchUsers} from '../redux/features/userSlice'

import { db, storage,auth, onAuthStateChanged,signOut, } from '../Config/Firebase';
import {collection, getDocs,getDoc, addDoc, deleteDoc, doc, updateDoc, setDoc} from "firebase/firestore";
import { setUseProxies } from 'immer';

const MyNavbar = () => {

  const {currentUser} = useSelector( state => state.user )
  const router = useRouter()
  const dispatch = useDispatch();

console.log("currentUser", currentUser)

  const [user, setUser]= useState(null)

  useEffect( ()=>{
          
          let uid = sessionStorage.getItem('UID')
          if(uid){
            onAuthStateChanged(auth, (user) => {
              if(user){
                dispatch(fetchUsers(uid))
                setUser(user)
              }else {
                setUser(null)
                sessionStorage.removeItem('UID');
              }
            });
            // router.push('/EventCreate')
          }else{
            setUser(null)
          }
          
      
        },[currentUser] )

 
        const UserLogout = ()=> {
          signOut(auth)
          sessionStorage.removeItem('UID');
          console.log("LOgout clicked")
          setUser(false)
        }

if(user){
  return (
    <>
      {[ 'md' ].map((expand) => (
        <Navbar key={expand} bg="dark" variant="dark" expand={expand} className="mb-0">
          <Container fluid>
            <Navbar.Brand href="#">Numan Eventro</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                  
                  <Nav.Link >
                  <Link href="/Signup" className={`${styles.signup}`}>{currentUser}</Link>
                  </Nav.Link>

                  <Nav.Link >
                  <Link href="#" className={`${styles.signup}`} onClick={UserLogout}>Logout</Link>
                  </Nav.Link>
                  
                </Nav>
                {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
} else {
  return (
    <>
      {[ 'md' ].map((expand) => (
        <Navbar key={expand} bg="dark" variant="dark" expand={expand} className="mb-0">
          <Container fluid>
            <Navbar.Brand href="#">Numan Eventro</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                  
                  <Nav.Link >
                  <Link href="/Signup" className={`${styles.signup}`}>Signup</Link>
                  </Nav.Link>

                  <Nav.Link >
                  <Link href="/Login" className={`${styles.signup}`}>Login</Link>
                  </Nav.Link>
                  
                </Nav>
                {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

}

export default MyNavbar;