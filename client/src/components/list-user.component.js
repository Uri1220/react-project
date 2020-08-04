import React, { Component } from 'react';
import axios from 'axios';
import { Card, Button, Carousel } from 'react-bootstrap';

const Exercise = props => (
  <Card style={{ width: '18rem' }} className="mt-3">
    {/* <Carousel style={{ width: '18rem' }}>
      <Carousel.Item >
        <img
        className="d-block w-10"
         src={props.original}
        />
       
      </Carousel.Item>
      <Carousel.Item >
        <img
        className="d-block w-10"
         src={props.medium}
        />
       
      </Carousel.Item>

    </Carousel> */}
    
    <Card.Img variant="top" src={props.thumbnail} />
    <Card.Body>
      
      <Card.Title>{props.exercise.title}</Card.Title>
      <Card.Subtitle>{props.exercise.price}</Card.Subtitle>
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
// const Exercise = props => (
//   <tr>
//     <td>{props.exercise.title}</td>
//     <td>{props.exercise.des}</td>
//     <td>{props.exercise.date.substring(0, 10)}</td>
//   </tr>
// )

export default class ListUser extends Component {
  constructor(props) {
    super(props);

    this.state = { exercises: [] };


  }
  componentDidMount() {
    axios.get('http://localhost:5000/pens/list')
      .then(response => {
        this.setState({ exercises: response.data })
        // console.log(response.data[1].pictures[0].medium)
        //  console.log(this.state);

      })
      .catch((error) => {
        console.log(error);
      })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      //  console.log({...currentexercise.pictures[0]}.medium)
      const medium = { ...currentexercise.pictures[0] }.medium
      const thumbnail = { ...currentexercise.pictures[0] }.thumbnail
      const original = { ...currentexercise.pictures[0] }.original

      return <Exercise exercise={currentexercise}
        medium={medium}
        thumbnail={thumbnail}
        original={original}
        key={currentexercise._id} />;
    })
  }


  render() {
    return (
      <>
        <h3>Logged Exercises</h3>
        {/* <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody> */}
        {this.exerciseList()}
        {/* </tbody>
          </table>
         */}

      </>
    )
  }
}