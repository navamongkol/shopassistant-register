import logo from './logo.svg';
import './App.css';
import liff from '@line/liff';
import { useEffect, useState } from 'react';

function App() {
  const axios = require('axios');
  const [pictureUrl, setPictureUrl] = useState(logo);
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [shopeeId, setShopeeId] = useState("");
  
  
  const logout = () => {
    liff.logout();
    window.location.reload();
  }

  const register = () => {
    const body = {
      userIdToken : 'John Doe',
      userDisplayName: 'Content Writer',
      userId : '0xbbbbb',
      shopeeId : '2424242342423'
    };
  axios.post('https://asia-southeast1-shopassistant-369117.cloudfunctions.net/insert-user', 
      body)
    .then((res) => {
        console.log(`Status: ${res.data}`);
    }).catch((err) => {
        console.error(err);
    });
  
    console.log("ShoppeId", shopeeId)
    
  }

  const initLine = () => {
    liff.init({ liffId: '1657665769-GyvV85jy' }, () => {
      if (liff.isLoggedIn()) {
        runApp();
      } else {
        liff.login();
      }
    }, err => console.error(err));
  }

  const runApp = () => {
    const idToken = liff.getIDToken();
    setIdToken(idToken);
    liff.getProfile().then(profile => {
      console.log(profile);
      setDisplayName(profile.displayName);
      setPictureUrl(profile.pictureUrl);
      setStatusMessage(profile.statusMessage);
      setUserId(profile.userId);
    }).catch(err => console.error(err));
  }

  useEffect(() => {
    initLine();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <div style={{ textAlign: "center" }}>
        <h1>Shop Assistant Register</h1>
        <hr/>
        <img src={pictureUrl} width="300px" height="300px"/>
        <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>id token: </b> {idToken}</p>
        <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>display name: </b> {displayName}</p>
        <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>status message: </b> {statusMessage}</p>
        <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>user id: </b> {userId}</p>
        <form style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}>
          <label><b>Enter ShopeeId</b>
            <input 
              type="text" 
              value={shopeeId}
              onChange={(e) => setShopeeId(e.target.value)}
            />
          </label>
        </form>
        

        <button onClick={() => register()} style={{ width: "100%", height: 30 }}>Register</button>
        <button onClick={() => logout()} style={{ width: "100%", height: 30 }}>Logout</button>
      </div>
      </header>
    </div>
  );
}

export default App;