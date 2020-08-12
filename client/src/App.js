import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {posts: []};
  }
  handleClick(e){
    e.preventDefault();
    fetch('/api/reddit/hot')
    .then(res => res.json()).then(res => {
      this.setState({posts: res});
    })
  }
  render(){
    return (
    <div className="App">
      <button onClick={this.handleClick.bind(this)}>What up bitch</button>
      <ul>
        {this.state.posts.map(item => <li>{item.title}</li>)}
      </ul>
    </div>
    );
  }
}

export default App;
