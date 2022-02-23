import React, { Component } from 'react';
import axios from '../axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    username: '',
    loading: false,
  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  onSubmit = (e) => {
    this.setState({ loading: true });

    e.preventDefault();

    const user = {
      username: this.state.username
    }

    axios.post('users/add', user)
      .then(res => {
        this.setState({username: '' }, () => {
          alert(res.data);
        });
      });
  }

  render() {
    if(this.state.loading) return '<div>Loading...</div>';
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
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