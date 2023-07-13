import React, { Component} from 'react';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import SearchBox from '../components/SearchBox';
import ErrorBoundry from '../components/ErrorBoundry';


class App extends  Component{

  constructor() {
    super()
    this.state = {
     robots: [],
     searchfield: ''
   }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
    .then(users=> this.setState({robots: users}));
    
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value})  
  }


  render() {
    const {robots, searchfield} = this.state;
    const filteredRobots = this.state.robots.filter (robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !robots.length ?
      <h1>Loading</h1> :
     (
      <div className="tc">
         <h1>Robofriends</h1>
         <SearchBox onSearchChange={this.onSearchChange}/>
         <scroll>
          <ErrorBoundry>
           <CardList robots={filteredRobots}/>
           </ErrorBoundry>
         </scroll>
      </div>
    );
 }
}

 
export default App;
