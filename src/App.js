import logo from './logo.svg';
import './App.css';
import liff from '@line/liff';
import { useEffect, useState } from 'react';
import done_logo from './done-icon.png'

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
    const jsonData = {
          "userIdToken" : idToken,
          "userDisplayName": displayName,
          "userId" : userId,
          "shopeeId" : shopeeId,
    }
    var body = new FormData();
    body.append('userIdToken', idToken);
    body.append('userDisplayName', displayName);
    body.append('userId', userId);
    body.append('shopeeId', shopeeId);
    fetch('https://asia-southeast1-shopassistant-369117.cloudfunctions.net/insert-user',{
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type':'application/json'},
      body: body
    }).then((response) => {
      if (response.status === 0) {
        // console.log("Done");
        window.close();
      }
    });
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
        <img src={done_logo} style={{marginLeft:"auto", marginRight:"auto", width:"50%"}} hidden></img>
        <img src={pictureUrl} width="300px" height="300px"/>
        <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>display name: </b> {displayName}</p>
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