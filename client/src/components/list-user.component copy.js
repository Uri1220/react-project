import React, { Component } from 'react';
import axios from 'axios';
import { Card,Button } from 'react-bootstrap';

const Exercise = props => (
  <tr>
    <td>{props.exercise.title}</td>
    <td>{props.exercise.des}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
  </tr>
)

export default class ListUser extends Component {
  constructor(props) {
    super(props);

    this.state = { exercises: [] };


  }
  componentDidMount() {
    axios.get('http://localhost:5000/pens/list')
      .then(response => {
        this.setState({ exercises: response.data })
        console.log(response.data)
        console.log(this.state);

      })
      .catch((error) => {
        console.log(error);
      })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} key={currentexercise._id} />;
    })
  }


  render() {
    return (
      <div>
        <div>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
        <div>
          <h3>Logged Exercises</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {this.exerciseList()}
            </tbody>
          </table>
        </div>

      </div>
    )
  }
}