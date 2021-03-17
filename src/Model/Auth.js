import React, {useState,Component} from 'react';


import firebase from '../Config/firebase';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PartyMode from '@material-ui/icons/PartyMode';
import Typography from '@material-ui/core/Typography';
import { makeStyles,styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import moment from "moment";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Paper from '@material-ui/core/Paper';





const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  marginTop: 10,
  color: 'white',
  height: 48,
  width:'100%',
  padding: '0 30px',
  alignContent:'center',
});

const MyAvatar = styled(Avatar)({
  margin: 1,
  background : 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
});

const MyPaper = {
      marginTop: 40,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
};

const Root = {
  width: '100%', // Fix IE 11 issue.
  marginTop: 30,
};

const MyForm = {
  width: '100%', // Fix IE 11 issue.
  marginTop: 30,
 
};

const MyLink = {
  color: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  outline: 'none',
  
  
};

const root = {
 
    flexGrow: 1,
    maxWidth: 500,
 
};










export default class Auth extends Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
    
    this.state = {
      firstName : "",
      lastName : "",
      email: "",
      code : "+62",
      no_hp : "",
      kota : "",
      kode_ref : "",
      value :1
     
    }
  }
  
  handleClick1 = (e, event, newValue) => {
    
    this.setState({
      [e.target.name] : e.target.value
    })
    
  };
  handleChange(e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  setUpRecaptcha = () => { 
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'normal',
      callback: function(response) {
        console.log('captcha resolved');
        this.handleClick();
      },
      'expired-callback': function() {
      }
    });
  }

 

  handleClick =(e) =>{
    e.preventDefault();
    this.setUpRecaptcha();
    // const tgl = moment().format("DD-MM-YYYY HH:mm:ss")
    // firebase.firestore().collection('formulir').add({firstNama:this.state.firstName,lastNama:this.state.lastName,email_f:this.state.email}).then(()=>{
        
    // })
    var codec = this.state.code;
    var hp = this.state.no_hp;
    var grup = codec.concat(hp);
   
    console.log(grup);
    var appVerifier = window.recaptchaVerifier;
    
    firebase
        .auth()
        .signInWithPhoneNumber(grup, appVerifier)
        .then(function (confirmationResult) {
       
          window.confirmationResult = confirmationResult;
          var code = window.prompt('Enter OTP');
          confirmationResult.confirm(code).then(function (result) {
            var user = result.user;
            console.log('sig in');
         
           
          }).catch(function (error) {
          });
        }).catch(function (error) {
          
        });
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
             
              var uid = user.uid
              console.log(uid)
              const tgl = moment().format("DD-MM-YYYY HH:mm:ss")
              firebase.firestore().collection('formulir').add({uid:uid}).then(()=>{
        
                })
          } else {
            // No user is signed in.
          }
        });
        
        
        

        
       


  }
  
 
  render(){
   

    return(
    
      <Container component ="main" maxWidth="xs" >
        
        <CssBaseline/>
        <div style={MyPaper}>
           <MyAvatar>
               <PartyMode/>
           </MyAvatar>
         
        
        <Typography component="h1" variant="h5">
          Daftar Sekarang & Login
        </Typography>
        <form onSubmit={this.handleClick} style={MyForm}  noValidate>
            <Grid container spacing={2}>
             
        
         
                <Grid item xs={12} sm={3}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="code"
                    name="code"
                 
                    value ={this.state.code}
                    onChange ={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={9}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="no_hp"
                    label="Nomor Handphone"
                    name="no_hp"
                    value ={this.state.no_hp}
                    onChange ={this.handleChange}
                    
                  />
                </Grid>
              
              
          
              
              
            </Grid>
            <div style={Root} id="recaptcha-container"></div>
            <MyButton   type="submit">DAFTAR SEKARANG</MyButton>
        </form>
        </div>
      </Container>
     
    )
  }
}


