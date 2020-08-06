import React from 'react'
import { Card, Button } from 'react-bootstrap';

const HandleCart = props => (
    <Card style={{ width: '18rem' }} className="mt-3">
     
  
      <Card.Img variant="top" src={props.thumbnail} />
      <Card.Body>
  
        <Card.Title>{props.handle.title}</Card.Title>
        <Card.Subtitle>{props.handle.price}</Card.Subtitle>
        <Card.Text>
  
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
        <Card.Link href="/">Card Link</Card.Link>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer>
    </Card>
  
  )

export default HandleCart
