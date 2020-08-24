import React, { Component } from 'react';
import axios from 'axios';
import HandleCart from '../components/HandleCart'






export default class ListHandle extends Component {
  constructor(props) {
    super(props);

    this.state = { handles: [] };


  }
  componentDidMount() {
    axios.get('http://localhost:5000/pens/list')
      .then(response => {
        this.setState({ handles: response.data })
        // console.log(response.data[1].pictures[0].medium)
        //  console.log(this.state);

      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleList() {
    return this.state.handles.map(currenthandle => {
      //  console.log({...currenthandle.pictures[0]}.medium)
      const medium = { ...currenthandle.pictures[0] }.medium
      const thumbnail = { ...currenthandle.pictures[0] }.thumbnail
      const original = { ...currenthandle.pictures[0] }.original

      return <li key={currenthandle._id}>
         <HandleCart 
         handle={currenthandle}
         medium={medium}
         thumbnail={thumbnail}
         original={original}
        />
      </li>
    })
  }


  render() {
    return (
      <>
        <h3>Logged handles</h3>
        <ul className="list-unstyled ulstyle"  style={styles.ul} >

          {this.handleList()}

        </ul>
      </>
    )
  }
}

const styles ={ 
  ul:{
    display: 'flex',
  flexWrap:'wrap',
  justifyContent:' space-around',
  alignItems: 'center' }

}