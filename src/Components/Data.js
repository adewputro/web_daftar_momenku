import React from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import PersonPinIcon from '@material-ui/icons/PersonPin';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PaymentIcon from '@material-ui/icons/Payment';
import NoteIcon from '@material-ui/icons/Note';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';
import DescriptionIcon from '@material-ui/icons/Description';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Biodata from './Bio/Biodata';
import Ktp from './ktp/Ktp';
import Sim from './sim/Sim';
import Skck from './skck/Skck';
import Rekening from './rekening/Rekening';
import Kontak_dar from './kontak_dar/Kontak_dar';
import Surat from './surat_sehat/Surat';
import Npwp from './Npwp/Npwp';
import Alat from './Alat/Alat';
import Clear from './Clear/Clear';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    app : {
        background : 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },  
    tabss : {
        color:'white'
    },

    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }));
  
  export default function Data() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <AppBar className={classes.app} position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            className={classes.tabss}
            aria-label="scrollable force tabs example"
          >
            <Tab label="Bio Detail" icon={<DescriptionIcon />} {...a11yProps(0)} />
            <Tab label="KTP" icon={<ContactMailIcon />} {...a11yProps(1)} />
            <Tab label="SIM" icon={<PersonPinIcon />} {...a11yProps(2)} />
            <Tab label="SKCK" icon={<NoteIcon />} {...a11yProps(3)} />
            <Tab label="Informasi Rekening" icon={<PaymentIcon />} {...a11yProps(4)} />
            <Tab label="Kontak Darurat" icon={<PhoneEnabledIcon />} {...a11yProps(5)} />
            <Tab label="Surat Ket Sehat" icon={<LocalHospitalIcon />} {...a11yProps(6)} />
            <Tab label="NPWP" icon={<DescriptionIcon />} {...a11yProps(7)} />
            <Tab label="Alat" icon={<CameraAltIcon />} {...a11yProps(8)} />
            <Tab label="Selesai" icon={<CheckCircleIcon />} {...a11yProps(9)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <Biodata/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Ktp/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Sim/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Skck/>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Rekening/>
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Kontak_dar/>
        </TabPanel>
        <TabPanel value={value} index={6}>
          <Surat/>
        </TabPanel>
        <TabPanel value={value} index={7}>
          <Npwp/>
        </TabPanel>
        <TabPanel value={value} index={8}>
          <Alat/>
        </TabPanel>
        <TabPanel value={value} index={9}>
          <Clear/>
        </TabPanel>
      </div>
    );
  }