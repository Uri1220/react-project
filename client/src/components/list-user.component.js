import React, { Component } from 'react';
import axios from 'axios';

const Exercise = props => (
  <tr>
    <td>{props.exercise.title}</td>
    <td>{props.exercise.des}</td>
    <td>{props.exercise.date.substring(0,10)}</td>    
  </tr>
)

export default class ListUser extends Component {
  constructor(props) {
    super(props);

    this.state = {exercises: []};
   
   
  }
  componentDidMount() {
    axios.get('http://localhost:5000/pens/list')
      .then(response => {
         this.setState({ exercises: response.data })
        console.log( response.data)
        console.log(this.state);

      })
      .catch((error) => {
        console.log(error);
      })
  }
  
  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise}  key={currentexercise._id}/>;
    })
  }


  render() {
    return (
      <div>
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
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
       
      </div>
    )
  }
}