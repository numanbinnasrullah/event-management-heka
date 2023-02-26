import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Card, Button } from "react-bootstrap";

import { useSelector, useDispatch } from 'react-redux';


const EventDetailPage = () => {
  const {events} = useSelector( state => state.event )
  const router = useRouter();
  const id = router.query.Detail;
  const [event, setEvent] = useState(null);

  useEffect(() => {
 
  }, []);

  // if (!event) {
  //   return <div>Loading...</div>;
  // }

const AttendiesHandler = ()=> {
  
}

  return (
    <Container>
      {events.map( (item)=> {
        console.log("DEtal usesr is", item.id)
        return item.id === id && <Card>
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>{item.description} </Card.Text>
          <Card.Text>{item.location} </Card.Text>
          <Card.Text>{item.time} </Card.Text>
          <Card.Text>{item.date} </Card.Text>
          
          <Button variant="primary" onClick={AttendiesHandler}>Attend Event</Button>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            Location: {item.location}, Date: {item.date}, Time: {item.time}
          </small>
        </Card.Footer>
      </Card>
      } )
        
      }
     
    </Container>
  );
};

export default EventDetailPage;
