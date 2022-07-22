import Footer from "./Footer";
import Header from './Header';
import React, {useEffect, useState} from 'react'
import Coin from "./Coin";

function Main(){
    const [coinData, setCoinData] = useState([])
    const getData = async () => {
        try{
            const response = await fetch('http://localhost:8080/getCoins', {mode : 'cors'});
            const data  = await response.json();
            setCoinData(data.data);
        }catch(e){
            console.log(e);
        }
    }   

    useEffect(() => {
        getData();
        localStorage.removeItem('deposit');
        localStorage.removeItem('login');
        localStorage.removeItem('profile');
        localStorage.removeItem('exchange');
        if (!localStorage.getItem('main') )
        {
          window.location.reload();
          localStorage.setItem('main', true);
        }
    }, [])

    return(
        <div>
            <Header name="main" />
            <div className="fontAdd">
                <div className="container-7a">
                    <table className="table table-sm">
                    <thead className="bg-light">
                        <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>24h%</th>
                        <th>7d%</th>
                        <th>Market Cap</th>
                        <th>Volume(24h)</th>
                        <th>Circulating Supply</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coinData.slice(0, 30).map((coin, index) => {
                            return <Coin name={coin.name} symbol={coin.symbol} id={coin.id} price={coin.quote.USD.price} index={index} percent_change_24h={coin.quote.USD.percent_change_24h} percent_change_7d={coin.quote.USD.percent_change_7d} market_cap={coin.quote.USD.market_cap} volume_24h={coin.quote.USD.volume_24h} circulating_supply={coin.circulating_supply}/>
                        })}
                    </tbody>
                    </table>
                </div>
            </div>
          <Footer />
        </div>
        )
}

export default Main;