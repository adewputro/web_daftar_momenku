import React, {useState, useEffect,Component} from 'react';
import firebase, {storage} from '../../Config/firebase';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
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
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';
import { v4 as uuidv4 } from "uuid";

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

  function Biodata(){
    const [upfoto, setUpfoto] = useState('');
    const [biodata, setBiodata] = useState([]);
    const [loading, setLoading] = useState([false]);
    const [tgl_lahir, setTgllahir] = useState('');
    const [jk, setJk] = useState('');
    const [alamat, setAlamat] = useState('');
    const [nama, setNama] = useState('');
    const [kota, setKota] = useState('');
    const [uidauth, setUidauth] = useState('');
    const [image, setImage] = useState(null);
    


    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          setUidauth(user.uid);
      }
    });

    
      
     
    
    const ref = firebase.firestore().collection("Biodata_fotografer");
   
      function getBiodata(){
          setLoading(true);
          ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
              items.push(doc.data());

            });
            setBiodata(items);
            setLoading(false);
          });
      }

      useEffect(() => {
        getBiodata();

      }, []);

      const upload = e => {
          if (e.target.files[0]){
            setImage(e.target.files[0]);
          }
      };

      console.log("image:", image)

      function addBiodata(newBiodata){          
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {
            console.log(error);

          },
          () => {
            storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
                
                setUpfoto(url);
            })
          }
        )
        ref
            .doc(newBiodata.id)
            .set(newBiodata)
            .catch((err) => {
              console.error(err);

            });
          
      }

      // function editSchool(updatedSchool){
      //   setLoading();
      //   ref
      //       .doc(updatedSchool.id)
      //       .set(updatedSchool)
      //       .catch((err) => {
      //         console.error(err);

      //       });

      // }

      // if (loading){
      //   return <h1>Loading .... </h1>;
      // }

      return(
        <Container component ="main" maxWidth="xs" >
          
          <CssBaseline/>
            <div style={MyPaper}>
              <MyAvatar>
                <PartyMode/>
              </MyAvatar>

            <Typography component="h1" variant="h5">
              Bio Detail
            </Typography>
          <div style={MyForm}>
          <Grid container spacing={2}>
          <Grid item xs={12} >
            <TextField 
                    variant="outlined"
                    required
                    fullWidth
                    id="nama"
                    label="Nama Lengkap"
                    name="nama"
                    onChange = {(e) => setNama(e.target.value)}
                    
            />
            </Grid>
          <Grid item xs={12} >
            <TextField 
                    id="date"
                    type = "date"
                    variant="outlined"
                    required
                    fullWidth
                    label="Tanggal Lahir"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange = {(e) => setTgllahir(e.target.value)}
                    
            />
            </Grid>
            <Grid item xs={12} >
            <TextField variant="outlined" onChange = {(e) => setJk(e.target.value)} id="select" fullWidth label="Jenis Kelamin (Wajib)" select>
              <MenuItem value="Laki - Laki">Laki - Laki</MenuItem>
              <MenuItem value="Perempuan">Perempuan</MenuItem>
            </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
                <TextField 
                           
                            type = "text"
                            variant="outlined"
                            label="Foto :"
                           
                            fullWidth
                            disabled
                          
                            
                    />
            </Grid>
            <Grid item xs={12} sm={9}>
         
           
                <TextField 
                        id="file"
                        type = "file"
                        variant="outlined"
                        placeholder="Placeholder"
                        required
                        fullWidth
                        onChange = {upload}
                        
                />
           
            </Grid>
            
            <Grid item xs={12} >
            <TextField variant="outlined" onChange = {(e) => setKota(e.target.value)} id="select" fullWidth label="Kota" select>
              <MenuItem value="Sidoarjo">Sidoarjo</MenuItem>
              <MenuItem value="Surabaya">Surabaya</MenuItem>
              <MenuItem value="Bali">Bali</MenuItem>
              <MenuItem value="Yogyakarta">Yogyakarta</MenuItem>
              <MenuItem value="Solo">Solo</MenuItem>
              <MenuItem value="Semarang">Semarang</MenuItem>
              <MenuItem value="Malang">Malang</MenuItem>
              <MenuItem value="Mojokerto">Mojokerto</MenuItem>
              <MenuItem value="Gersik">Gersik</MenuItem>
            </TextField>
            </Grid>
            <Grid item xs={12} >
            <TextField 
                    variant="outlined"
                    required
                    fullWidth
                    id="alamat"
                    label="Alamat"
                    name="alamat"
                    onChange = {(e) => setAlamat(e.target.value)}
                    
            />
            </Grid>
            <MyButton onClick = {() => addBiodata({ tgl_lahir, kota, nama, jk , upfoto, alamat ,uidauth , id : uuidv4()})} >Simpan</MyButton>
          </Grid>
          </div>
          <hr />
          {/* {upfoto}
          {uidauth} */}
          {/* {biodata.map((bio)=>(
            <h1>{bio.jk}</h1>
          ))} */}
           
          </div>
        </Container>
      );

  }
  export default Biodata;