
import { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import styles from '@/styles/Signup.module.css'

import Link from 'next/link'
import {fetchEvents, setFilter} from '../redux/features/eventSlice'
import { useSelector, useDispatch } from 'react-redux';

const EveEventList = () => {
  const {events, loading, filter, stateTriger} = useSelector( state => state.event )
  const dispatch = useDispatch();
  const [myevents, setMyEvents] = useState([]);

  useEffect(() => {
    if(stateTriger == true){
      dispatch(fetchEvents())
    }
  }, []);

  return (
    <>
    <div className={`${styles.addEventbtnDiv}`}>
    <Link href="/Create" className={`${styles.addEventbtn}`}>Add Event</Link>
    </div>
    
    <Container>
      <Row xs={1} md={2} lg={4} className="g-4">
        {events.filter((item)=>{
            if(filter === "All"){
              return item;
            }else{
              return item.status === filter
            }
          }).map((event) => (
          <Col key={event.id}>
            <Card>
              <Card.Img variant="top" src={event.image} />
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text>{event.description}</Card.Text>
                <Card.Text>{event.location}</Card.Text>
                <Card.Text>{event.time}</Card.Text>
                <Card.Text>{event.date}</Card.Text>
                <Button variant="primary">
                <Link href={`/userDetail/${event.id}`} className={`${styles.signup}`}>View Details</Link>
                  </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    <Button variant="primary" onClick={ ()=> dispatch(setFilter("All")) }>All</Button>
    <Button variant="primary" onClick={ ()=> dispatch(setFilter("MyEvents")) }>My Events</Button>
    </>
  );
};

export default EveEventList;