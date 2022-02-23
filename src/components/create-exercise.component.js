import React, { Component } from 'react';
import axios from '../axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    id: null,
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
    users: []
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    if(id !== undefined){
      axios.get(`exercises/${id}`)
      .then(response => {
        this.setState({
          id: id,
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    axios.get('users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: (this.state.username ? this.state.username : response.data[0].username)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onChangeDate = (date) => {
    this.setState({
      date: date
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    
    const id = this.state.id;

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    const url = (id === null ? 'exercises/add' : `exercises/update/${id}`);

    axios.post(url, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    const userOptions = this.state.users.map((user) => {
      return <option 
        key={user}
        value={user}>{user}
        </option>;
    });

    return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select
              required
              className="form-control"
              value={this.state.username}
              name="username"
              onChange={this.onChange}>
              {userOptions}
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              name="description"
              onChange={this.onChange}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              name="duration"
              onChange={this.onChange}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}