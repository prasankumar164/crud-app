import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import './Coin.css'
import axios from 'axios'
import Coin from './Coin';


function App() {
  const [error, setError] = useState('')
  const [loading, setloading] = useState(true)
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
     axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
     .then(response => {
       console.log(response);
       
      setError('')
      setloading(false)
      setCoins(response.data)
     })
     .catch(error => {
      console.warn(error);
      setError('something went wrong')
      setloading(false)
      setCoins([])
     })

  },[])


  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
    )


    //fous input browser loads using useref
    const inputRef = useRef(null)
  
    useEffect(() => {
      inputRef.current.focus()
    },[])


  return (
    <div className="coin-app container-fluid">
      <div className="coin-search">
        <h1 className="coin-text">
          Search A Corrency
        </h1>
        <form>
          <input 
          ref={inputRef}
          type="text" 
          placeholder="search" 
          className="coin-input"
          onChange={handleChange}
          />
        </form>
      </div>
      {loading ? 'loading' :  filteredCoins.map(coin => (
                <Coin 
                key={coin.id} 
                name={coin.id}
                image={coin.image}
                symbol={coin.symbol}
                marketcap={coin.market_cap}
                price={coin.current_price}
                priceChange={coin.price_change_percentage_24h}
                volume={coin.total_volume}
                
                />
            ))}
            {
                error ? error : null
            }
            
     
    </div>
  );
}

export default App;




