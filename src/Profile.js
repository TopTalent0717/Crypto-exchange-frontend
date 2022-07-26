import Footer from "./Footer";
import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import Payment from './Payment';
import Header from "./Header";
import User from "./User";

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Profile(){

    const [value, setValue] = React.useState(0);
    const [txData, setTxData] = useState([]);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [public_name, setPublic_name] = useState('');
    const [merchant, setMerchant] = useState('');
    const [users, setUsers] = useState([]);
    
    const getUser = async() => {
      try{
      const response = await fetch('https://test.loobr.com/getUser', {mode : 'cors'});
      const data =  await response.json();
      setUsers(data);
      }catch(e){
        console.log(e);
      }

    }

    const getInfo = async (email, status) => {

          const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' }
          };
          let response;
          let result;
          if(status == true)
              result = "true"
          else
            result = "false"
          console.log(result);
          try {
              response = await fetch(`https://test.loobr.com/updateUser/${email}/${result}`, requestOptions);  
              const data = await response.json();  
              
          } catch (error) {
              console.log(error)
          }
    
  }

    const getBasicInfo = async () => {
        try{
            const response = await fetch('https://test.loobr.com/getInfo', {mode : 'cors'});
            const data = await response.json();
            setEmail(data.email);
            setUsername(data.username);
            setPublic_name(data.public_name);
            setMerchant(data.merchant_id);
            }catch(e){
            console.log(e);
        }
    }

    const getTxList = async() => {
        try{
            const response = await fetch('https://test.loobr.com/getTx', {mode : 'cors'});
            const data = await response.json();
            setTxData(data);

        }catch(e){
            console.log(e)
        }
    }

     useEffect(() => {
       
        getUser();
        getBasicInfo();
        getTxList();
        localStorage.removeItem('deposit');
        localStorage.removeItem('login');
        localStorage.removeItem('main');
        localStorage.removeItem('exchange');
        if (!localStorage.getItem('profile') )
        {
          window.location.reload();
          localStorage.setItem('profile', true);
        }
    }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    return(
        <div>
            <Header name="profile" />
            <div className="fontAdd">
                <div className="container-7a">
                     <Box sx={{ width: '100%' }}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                          <Tab label="Profile" {...a11yProps(0)} />
                          <Tab label="Transactions" {...a11yProps(1)} />
                          <Tab label="Admin" {...a11yProps(2)} />
                        </Tabs>
                      </Box>
                      <TabPanel value={value} index={0}>
                       <Grid container spacing={2}>
                        <Grid item xs={3}>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                     <TextField id="outlined-basic" label="FirstName" variant="standard" disabled />
                                </Grid>
                                <Grid item xs={3}>
                                     <TextField id="outlined-basic" label="Walter" variant="standard" disabled />
                                </Grid>
                                <Grid item xs={3}>
                                     <TextField id="outlined-basic" label="LastName" variant="standard" disabled />
                                </Grid>
                                <Grid item xs={3}>
                                     <TextField id="outlined-basic" label="VHoldings" variant="standard" disabled />
                                </Grid>
                                  <Grid item xs={3}>
                                     <TextField id="outlined-basic" label="Email" variant="standard" disabled />
                                </Grid>
                                <Grid item xs={3}>
                                     <TextField id="outlined-basic" label={email} variant="standard" disabled />
                                </Grid>
                                <Grid item xs={3}>
                                     <TextField id="outlined-basic" label="UserName" variant="standard" disabled />
                                </Grid>
                                <Grid item xs={3}>
                                     <TextField id="outlined-basic" label={username} variant="standard" disabled />
                                </Grid>

                                  <Grid item xs={3}>
                                     <TextField id="outlined-basic" label="Merchant" variant="standard" disabled />
                                </Grid>
                                <Grid item xs={3}>
                                     <TextField id="outlined-basic" label={merchant} variant="standard" disabled />
                                </Grid>
                                <Grid item xs={3}>
                                     <TextField id="outlined-basic" label="Password" variant="standard" disabled />
                                </Grid>
                                <Grid item xs={3}>
                                     <TextField id="outlined-basic" label="************" variant="standard" disabled />
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                       {/* <Button variant="outlined" size="medium">
                                          Edit Profile
                                        </Button> */}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                        </Grid>
                     </Grid>
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                         <table className="table table-sm">    
                    <thead className="bg-light">
                        <tr>
                        <th>No</th>
                        <th>TX_ID</th>
                        <th>Coin_Name</th>
                        <th>Amount</th>
                        <th>To_Address</th>
                        <th>Sender_IP</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {txData.slice(0, 10).map((pay, index) => {
                            return <Payment key={index} coin={pay.coin} txid={pay.txid} amount={pay.amountf} address={pay.payment_address} status={pay.status_text} ip={pay.sender_ip} index={index}/>
                        })} */}
                    </tbody>
                    </table>
                      </TabPanel>
                      <TabPanel value={value} index={2}>
                        <table className="table table-sm">    
                    <thead className="bg-light">
                        <tr>
                        <th>No</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Email</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    {users.map((user, index) => {
                          return <User firstname={user.firstname} lastname={user.lastname} email={user.email} status={user.status} index={index} key={index} getInfo={getInfo}/>
                    })}
                   
                    </tbody>
                    </table>
                      </TabPanel>
                    </Box>
                </div>
            </div>
          <Footer />
        </div>
        )
}

export default Profile;