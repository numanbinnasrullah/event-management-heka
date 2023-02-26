import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

import { useSelector, useDispatch } from 'react-redux';
import {addEvent} from '../redux/features/eventSlice'

import { useRouter } from 'next/router'
import styles from '@/styles/Signup.module.css'


import Link from 'next/link'
import { db, storage,auth, onAuthStateChanged,signOut, } from '../Config/Firebase';
import {collection, getDocs,getDoc, addDoc, deleteDoc, doc, updateDoc, setDoc} from "firebase/firestore";

const initialState = {
    title: '',
    description: '',
    date: '',
    time: '',
    location:"",
    status:""
  };
const CreateEvent = () => {
    const [state, setState] = useState(initialState);
    const { title, description,  date, time,location, status} = state;
    
    const[userId, setUserId] = useState("")
    const dispatch = useDispatch();
    const router = useRouter()
  useEffect( ()=> {
    let uid = sessionStorage.getItem('UID')
    if(uid){
        setUserId(uid)
    }
  },[] )

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async(event:any) => {
    event.preventDefault();
    // code to handle form submission
    console.log(title, description,  date, time,location )
    if (!title || !description || !date || !time || !location || !status) {
        alert("Please Fill All the Required Fields")
    } else {
        try{
          
            await addDoc(collection(db, "events"), {title, description, date, time, location, creator: userId, status})
            dispatch(addEvent({title, description, date, time, location, creator: userId, status}));
            setTimeout( ()=> router.push('/EventList'), 100 )
        }catch(error){
            console.log(error)
        }
    }

  };

  return (
    <div style={{ 
      width: '70%', 
      margin: 'auto', 
      boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.3)',
      padding: '20px',
      borderRadius: '5px'
    }} className="mt-5">
      <Form onSubmit={handleSubmit} >
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={handleInputChange}
            name="title"
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter description"
            value={description}
            name="description"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter date"
            value={date}
            name="date"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formTime">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            placeholder="Enter time"
            value={time}
            name="time"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter location"
            value={location}
            name="location"
            onChange={handleInputChange}
          />
        </Form.Group>

        <div style={{ margin: '20px 0' , width: '80%' }}>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={handleInputChange}
            style={{ background: '#f2f2f2', color: '#333', padding: '10px', margin: '10px 0', width: '100%', borderRadius: '5px', boxSizing: 'border-box' }}
            >
              <option value="" disabled>Select Status</option>
              <option value="All" selected>All</option>
              <option value="MyEvents" >My Events</option>
            </select>
          </div>

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
        <Button variant="primary" type="submit" className="mt-3">
        <Link href="/EventList" className={`${styles.gotoeventbtn}`}>Go to Events</Link> 
        </Button>
      </Form>
    </div>
  );
};

export default CreateEvent;
