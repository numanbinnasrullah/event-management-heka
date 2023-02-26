import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

import Link from 'next/link'
import { useRouter } from 'next/router'
import {db, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, storage, sendSignInLinkToEmail} from '../Config/Firebase'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter()

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    try{
       const userCredentials =  await signInWithEmailAndPassword(auth, email, password);
       sessionStorage.setItem('UID', userCredentials.user.uid)

       router.push('/EventList')
    }catch(error){
        console.log(error)
    }
    
  };

  return (
    <Container className="mt-5">
      <div style={{ boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)", padding: "20px" }}>
        <h1 className="text-center mb-4">Login</h1>
        <Form onSubmit={handleSubmit}>
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

          <Button variant="primary" type="submit" className="mt-4">
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
