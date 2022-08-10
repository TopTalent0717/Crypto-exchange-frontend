import Footer from "./Footer";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import RadioGroup from  '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import AcceptedCoin from "./AcceptedCoin"; 
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Header from "./Header";

function Deposit(){

    const [show, setShow] = useState(true);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [orderId, setOrderId] = useState(false);
    const [showTab, setShowTab] = useState(true);
    const [acceptedCoins, setAcceptedCoins] = useState([]);
    const [amount, setAmount] = useState('');
    const [acceptedCoinsNames, setAcceptedCoinsNames] = useState([]);
    const [qrImage, setQrImage] = useState('');
    const [result, setResult] = useState('');
    const [address, setAddress] = useState('');
    const [payment, setPayment] = useState('');


    const getAcceptedCoins = async () => {
        try{
            const response = await fetch('https://test.loobr.com/getRates', {mode : 'cors'});
            const data = await response.json();
            setAcceptedCoins(Object.values(data));
            setAcceptedCoinsNames(Object.keys(data));
        }catch(e){
            console.log(e);
        }
    }


     useEffect(() => {
        getAcceptedCoins();
        localStorage.removeItem('main');
        localStorage.removeItem('login');
        localStorage.removeItem('profile');
        localStorage.removeItem('exchange');
        if (!localStorage.getItem('deposit') )
        {
          window.location.reload();
          localStorage.setItem('deposit', true);
        }
    }, [])

    const createOrder = (data, actions) => {
       
        return actions.order.create({
            purchase_units : [
                {
                    description : 'Deposit',
                    amount : {
                        currency_code : 'USD',
                        value : parseInt(amount)
                    }
                }
            ],
            application_context : {
                shipping_preference : 'NO_SHIPPING'
            }
        })
        .then((orderId) => {
            setOrderId(orderId);
            return orderId;
        })
    }

    const getInfo = async (name) => {
        if (parseInt(amount) > 0) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            };
            let response;
            try {
                response = await fetch(`https://test.loobr.com/createTx/${name}/${amount}`, requestOptions);  
                const data = await response.json();  
                setQrImage(data.qrcode_url);
                setResult(data.amount);
                setAddress(data.address);
                setPayment(data.txn_id);
            } catch (error) {
                console.log(error)
            }
        }
    }

    const onApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
            const {payer} = details;
            setSuccess(true);
        })
    }

    const onError = (data, actions) => {
        setErrorMessage("An error occured with your payment");
    }

    return(
        <div>
             <Header name="deposit" />

            <div className="fontAdd">
                <div className="container-7b">
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">Deposit Type:</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="paypal"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel value="paypal" control={<Radio />} label="Paypal" onClick={() => setShowTab(true)}/>
                        <FormControlLabel value="coins" control={<Radio />} label="Coins" onClick={() => setShowTab(false)}/>
                      </RadioGroup>
                    </FormControl><br/>
                     <TextField id="standard-basic" value={amount} placeholder={'100'} label="Amount" onChange={(e) => {
                        setAmount(e.target.value);
                     }} variant="standard" />                       
                      </Grid>
                      <Grid item xs={9}>
                        {showTab ? (
                                <PayPalScriptProvider options={{
                                                        'client-id' : 'AV5J0CGE3POOyyLnYQpc3KDHipQcWPTBVjQG0TgSNnuHqyj1CtkS1f2qjmcGtg5N90ZzLkmgBorPHXNF'
                                                    }}>
                                                    {show ? (
                                                        <PayPalButtons style={{layout : 'vertical', color : 'blue'}} createOrder={createOrder} forceReRender={[amount, 'USD']} onApprove={onApprove} onError={onError}/>
                                                    ) : null }
                                                    {success ?(
                                                        <h3>Your Payment has been done successfully please check email!</h3>
                                                    ) : <h2></h2>}
                                </PayPalScriptProvider>                            
                            ) : (
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                     <List
                                      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                      component="nav">
                                      {
                                        acceptedCoins.map((coin, index) => (
                                            <AcceptedCoin key={index} name={acceptedCoinsNames[index]} displayName={coin.name} img={coin.image} check={coin.is_fiat} getInfo={getInfo}/>
                                        ))
                                      }
                                    </List>
                                    </Grid>
                                    <Grid item xs={6}>
                                         <Card sx={{ minWidth: 275 }}>
                                          <CardContent>
                                            <Typography variant="h5" component="div">
                                             <img src={qrImage} alt=""/><br />
                                            </Typography>
                                            <Typography variant="h5" component="div">
                                             Amount : {result}
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            <br />
                                              PaymentID : {payment}
                                            </Typography>
                                            <Typography variant="body2">
                                              <br />
                                              To Address : {address}
                                            </Typography>
                                          </CardContent>
                                          <CardActions>
                                            <Button size="small">Learn More</Button>
                                          </CardActions>
                                        </Card>
                                    </Grid>
                                </Grid>
                            ) }  
                        
                      </Grid>
                    </Grid>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Deposit;