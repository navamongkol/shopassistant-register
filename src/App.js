import logo from './logo.svg';
import './App.css';
import liff from '@line/liff';
import { useState, useEffect } from 'react';

function App() {

  const [pictureUrl, setPictureUrl] = useState(logo);
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");

  const logout = () => {
    liff.logout();
    window.location.reload();
  }

  const initLine = () => {
    liff.init({ liffId: '1657665769-GyvV85jy' }, () => {
      if (liff.isLoggedIn()) {
        this.runApp();
      } else {
        liff.login();
      }
    }, err => console.error(err));
  }

  const runApp = () => {
    const idToken = liff.getIDToken();
    this.idToken = idToken;
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
      <div style="text-align; center;">
        <h1>React with LINE login</h1>
        <img src={pictureUrl} width="300px" height="300px"/>
        <p style={{textAlign: "left", marginLeft: "20%"}}>id token : {idToken}</p>
        <p style={{textAlign: "left", marginLeft: "20%"}}>display name : {displayName}</p>
        <p style={{textAlign: "left", marginLeft: "20%"}}>status message : {statusMessage}</p>
        <p style={{textAlign: "left", marginLeft: "20%"}}>user id : { userId }</p>

        <button onClick={() => logout()} style={{width:"100%", height:30}}>Logout</button>
      </div>
      </header>
    </div>
  );
}

export default App;