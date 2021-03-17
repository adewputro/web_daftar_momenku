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
import { makeStyles,styled,withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { v4 as uuidv4 } from "uuid";
import Modal from '@material-ui/core/Modal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      
      color: 'black',
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

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
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
   
  
    return {
        
        position: 'absolute',
        top: '10%',
        left: '35%',
        
       
       
    
        
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    table: {
        minWidth: 700,
      },
  }));

  function Alat(){
   
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
   
    const [upfoto, setUpfoto] = useState('');
    const [alat, setAlat] = useState('');
    const [loading, setLoading] = useState([false]);
    const [merk, setMerk] = useState('');
    const [type, setType] = useState('');
    const [kategori, setKategori] = useState('');
    const [no_seri, setNo_Seri] = useState('');
    const [uidauth, setUidauth] = useState('');
    const [uid, setUid] = useState('');
    const [image, setImage] = useState(null);
    const [qr, setQr] = useState([]);
    
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            setUidauth(user.uid);
            // console.log(user.uid)
        }
      });


 

    
      
     
    
    const ref = firebase.firestore().collection("Alat_fotografer");
   
      function getAlat(){
        setLoading(true);
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                setUid(user.uid);
                var auth = user.uid;
               
           

        ref
          .where('uidauth', '==', auth)
          //.where('title', '==', 'School1') // does not need index
          //.where('score', '<=', 10)    // needs index
          //.orderBy('owner', 'asc')
          //.limit(3)
          .onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
              items.push(doc.data());
            });
            setQr(items);
            setLoading(false);
          });
            }
        });
        }

      useEffect(() => {
        getAlat();

      }, []);

      const upload = e => {
          if (e.target.files[0]){
            setImage(e.target.files[0]);
          }
      };

      console.log("image:", image)

      function addAlat(newBiodata){          
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
            handleClose();
          
      }


      const body = (
        <div style={modalStyle} className={classes.paper}>
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
              <TextField variant="outlined" onChange = {(e) => setKategori(e.target.value)} id="select" fullWidth label="Kategori Alat" select>
                <MenuItem value="Camera">Camera</MenuItem>
                <MenuItem value="Lensa">Lensa</MenuItem>
              </TextField>
              </Grid>
              <Grid item xs={12} >
              <TextField 
                      id="file"
                      type = "file"
                      variant="outlined"
                      required
                      fullWidth
                      onChange = {upload}
                      
              />
              </Grid>
              <Grid item xs={12} >
              <TextField 
                      variant="outlined"
                      required
                      fullWidth
                      id="no_seri"
                      label="Nomer Seri"
                      name="no_seri"
                      onChange = {(e) => setNo_Seri(e.target.value)}
                      
              />
              </Grid>
              <Grid item xs={12} >
              <TextField variant="outlined" onChange = {(e) => setMerk(e.target.value)} id="select" fullWidth label="Merk" select>
                <MenuItem value="Cannon">Cannon</MenuItem>
                <MenuItem value="Nikon">Nikon</MenuItem>
              </TextField>
              </Grid>
              <Grid item xs={12} >
              <TextField 
                      variant="outlined"
                      required
                      fullWidth
                      id="type"
                      label="Type Kamera"
                      name="type"
                      onChange = {(e) => setType(e.target.value)}
                      
              />
              </Grid>
              <MyButton onClick = {() => addAlat({ kategori , upfoto, no_seri, merk, type ,uidauth , id : uuidv4()})} >Simpan</MyButton>
            </Grid>
  
            </div>
            <hr />
          
            {/* {upfoto}
           
            {/* {biodata.map((bio)=>(
              <h1>{bio.jk}</h1>
            ))} */}
             
            </div>
          
        </div>
      );
  
      return(
        <Container component ="main" >
             <Container component ="main" maxWidth="xs" >
                    <MyButton type="button" onClick={handleOpen}>
                        Tambah Data
                        </MyButton>
                        <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        >
                        {body}
                        </Modal>
            </Container>
            <br/>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Kategori</StyledTableCell>
                    <StyledTableCell align="right">Foto</StyledTableCell>
                    <StyledTableCell align="right">No Seri</StyledTableCell>
                    <StyledTableCell align="right">Merk</StyledTableCell>
                    <StyledTableCell align="right">Type</StyledTableCell>
                </TableRow>
                </TableHead>

                <TableBody>
                {qr.map((ls) => (
                            <StyledTableRow key={ls.id}>
                            <StyledTableCell component="th" scope="row">
                              {ls.kategori}
                            </StyledTableCell>
                            <StyledTableCell align="right">{ls.upfoto}</StyledTableCell>
                            <StyledTableCell align="right">{ls.no_seri}</StyledTableCell>
                            <StyledTableCell align="right">{ls.merk}</StyledTableCell>
                            <StyledTableCell align="right">{ls.type}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                </TableBody>
            </Table>
            </TableContainer>
         
        </Container>
        
      );

  }
  export default Alat;