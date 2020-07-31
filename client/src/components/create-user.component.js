import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsertitle = this.onChangeUsertitle.bind(this);
    this.onChangeUserdes = this.onChangeUserdes.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      des: ''
    }
  }

  onChangeUsertitle(e) {
    this.setState({
      title: e.target.value
    })
  }
  onChangeUserdes(e) {
    this.setState({
      des: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      title: this.state.title,
      des: this.state.des
    }

    console.log(user);

    axios.post('http://localhost:5000/pens/', user)
      .then(res => console.log(res.data));

    this.setState({
        title: '',
        des: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Title: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.title}
                onChange={this.onChangeUsertitle}
                />
          </div>
          <div className="form-group"> 
            <label>Des: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.des}
                onChange={this.onChangeUserdes}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}