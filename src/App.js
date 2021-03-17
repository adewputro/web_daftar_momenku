import React, {Component} from 'react';
import Auth from './Model/Auth';
import Data from './Components/Data';
import firebase from './Config/firebase';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user : {},
    }
  }
  componentDidMount(){
    this.authListener();
  }
  authListener () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user){
          this.setState({user});

      }else {
        this.setState({user : null});
      }
    });
  }
  render () {
    return(
      <div>
          {this.state.user ? (<Data/>) : (<Auth/>)}
      </div>
    )
  }

}

export default App;