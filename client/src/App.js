import React from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {posts: []};
  }
  handleClick(e){
    e.preventDefault();
    fetch('/api/hot')
    .then(res => res.json()).then(res => {
      this.setState({posts: res.json});
    })
  }
  render(){
    return (
    <div className='App'>
      <Button variant="contained">Default</Button>
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
      <Button variant="contained" disabled>
        Disabled
      </Button>
      <Button variant="contained" color="primary" href="#contained-buttons">
        Link
      </Button>
      {/* <button onClick={this.handleClick.bind(this)}>What up bitch</button>
      <ul>
        {this.state.posts.map(item => <li>{item.title}</li>)}
      </ul> */}
    </div>
    );
  }
}

export default App;
