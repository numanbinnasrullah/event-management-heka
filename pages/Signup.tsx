import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

import styles from '@/styles/Signup.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {db, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, storage, sendSignInLinkToEmail} from '../Config/Firebase'
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    setDoc
  } from "firebase/firestore";

const Signup = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter()

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(displayName, email, password)
    try{
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        sessionStorage.setItem('UID', userCredentials.user.uid)

        const docRef = doc(db, "users", userCredentials.user.uid);
        const userData = {
            displayName: displayName,
            email: email,
            password: password
          }
        setDoc(docRef, userData)
        router.push('/Login')
        console.log("UserCredentials", userCredentials)
    }catch(error){
        console.log(error)
    }
    
    
  };

  return (
    <Container className="mt-5">
      <div style={{ boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)", padding: "20px" }}>
        <h1 className="text-center mb-4">Sign up</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="displayName">
            <Form.Label>Display name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your display name"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Label>All Ready Have An Account Login </Form.Label>  <Link href="/Login" className={`${styles.loginfromsignup}`}>Here</Link>
          <br />
          <Button variant="primary" type="submit" className="mt-4">
            Sign up
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Signup;
