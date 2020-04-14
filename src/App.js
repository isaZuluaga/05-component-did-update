import React, { Component } from 'react';
import './App.css';

const url = 'https://jsonplaceholder.typicode.com/users'

class UserInfo extends Component {
  state = {
    user: {}
  }

  async componentDidMount() {
    const { userId } = this.props
    await this.fetchData(userId)
  }

  async componentDidUpdate(prevProps) {
    const { userId } = this.props
    // console.log('prevProps: ', prevProps);
    // console.log('currentProps: ', this.props);
    if (userId !== prevProps.userId) await this.fetchData(userId);
  }

  fetchData = async (userId) => {
    try {
      const response = await fetch(`${url}/${userId}`);
      const user = await response.json();
      this.setState({ user });
    } catch (err) {
      console.log(err.message)
    }
  }

  render() {
    const { user } = this.state
    return (
      <>
        <p>{user.name || ''}</p>
        <p>{user.username || ''}</p>
        <p>{user.email || ''}</p>
      </>
    )
  }
}

class Users extends Component {
  state = {
    users: [],
    userId: 1
  }

  async componentDidMount() {
    try {
      const response = await fetch(url);
      const users = await response.json()
      this.setState({ users })
    } catch (err) {
      console.log(err.message)
    }
  }

  handleClick = (userId) => (e) => {
    e.preventDefault()
    this.setState({ userId })
  }

  render() {
    const { users, userId } = this.state
    return (
      <>
       {users.length > 0 && <ul>
          {users.map(user => <li
            key={user.id.toString()}
            onClick={this.handleClick(user.id)}>
            {user.name}
          </li>)}
        </ul>}
        <UserInfo userId={userId} />
      </>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="title">componentDidUpdate</h1>
        <Users />
      </div>
    );
  }
}

export default App;
