import React, {useState, useEffect,Component} from 'react';
// import firebase from '';
import firebase, {storage} from '../../Config/firebase';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
// import NativeSelect from '@material-ui/core/NativeSelect';
import MenuItem from '@material-ui/core/MenuItem';

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PartyMode from '@material-ui/icons/PartyMode';
import Typography from '@material-ui/core/Typography';
import { makeStyles,styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { v4 as uuidv4 } from "uuid";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { auth } from 'firebase';

const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    marginTop: 20,
    color: 'white',
    height: 48,
    width:'100%',
    padding: '0 30px',
    alignContent:'center',
  });
  const MyLabel = styled(InputLabel)({
    marginBottom:10,
    fontSize:13,
   
  });
  const MyAvatar = styled(Avatar)({
    margin: 1,
    background : 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  });
  
  const MyPaper = {
        marginTop: 30,
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

  function Clear(){
  
    const [clear, setClear] = useState([]);
    const [loading, setLoading] = useState([false]);
    const [qr, setQr] = useState([]);
    const [uidauth, setUidauth] = useState('');
    const [setuju, setSetuju] = useState('Setuju');
    const [status, setStatus] = useState('0');
    
    


    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          setUidauth(user.uid);
      }
    });

    
      
     
    
    const ref = firebase.firestore().collection("Clear");
    const ref2 = firebase.firestore().collection("Biodata_fotografer");
    const ref3 = firebase.firestore().collection("fotografer");
    
   
      function getClear(){
          setLoading(true);
          ref2.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
              items.push(doc.data());

            });
            setClear(items);
            
          });
      }

      function getCek(){
        setLoading(true);
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
              
              var auth = user.uid;
              console.log(auth);
              ref.where('uidauth', '==', auth).onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                  items.push(doc.data());

                });
                setQr(items);
                
              });
          }
        });
      }

      useEffect(() => {
        getClear();
        getCek();
      }, []);
      const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,
      });
    
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
    
      const { gilad, jason, antoine } = state;
      const error = [gilad, jason, antoine].filter((v) => v).length !== 2;
          
            function addClear(clear,fot){    
                ref3
                .doc(fot.id)
                .set(fot)
                .catch((err) => {
                  console.error(err);
    
                });

                ref
                    .doc(clear.id)
                    .set(clear)
                    .catch((err) => {
                      console.error(err);
                     
                    }); 
                    firebase.auth().signOut().then(function() {
                        // Sign-out successful.
                      }).catch(function(error) {
                        // An error happened.
                      });
            }

            function auth() {
              qr.map((ls) => {
                console.log(ls.setuju)
              })
              
            }

      return(
        <Container component ="main" maxWidth="xs" >
          
                <CssBaseline/>
                    <div style={MyPaper}>
                        <MyAvatar>
                            <PartyMode/>
                        </MyAvatar>

                        <Typography component="h1" variant="h5">
                        SELESAI
                        </Typography>
                        <div style={MyForm}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <FormControlLabel
                                        control={<Checkbox checked={jason}  onChange={handleChange} name="jason" />}
                                        label="Dengan melanjutkan, saya setuju bahwa Momenku dapat mengumpulkan, menggunakan, dan mengungkapkan informasi yang diberikan oleh saya sesuai dengan Kebijakan Privasi dan saya sepenuhnya mematuhi Persyaratan & Ketentuan yang telah saya baca dan pahami."
                                    />
                                </Grid>
                                {qr.map((ls) => (
                                    <MyButton onClick = {() => addClear({ setuju, uidauth , id : uuidv4()},{status, id:uidauth})} >Simpan</MyButton> 
                                ))}
                                 
                            </Grid>
                        </div>
                
                    
                    </div>
         
        </Container>
      );

  }
  export default Clear;