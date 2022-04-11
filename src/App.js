import React, { useState, useEffect } from 'react';
import { Button, FormControl, Input } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';


import firebase from "firebase/compat/app"
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';



// import firebase from 'firebase';

function App() {

  const [input, setInput] = useState('');

  const [messages, setMessages] = useState([]);



  const [username, setUsername] = useState('');


  // useEffect Hook Allows us to run a piece of code once when the component loads. 
  // useState : like variable but short term memory. every time you reload the page the state disappears.
  //state er value change korle page reload na hoye sathe sathe screen e seta reflect korbe (variable in React)

  useEffect(() => { 
    //run once when the app component loads

    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
      })


  }, [])


  useEffect(() => {

    //run code here 
    // if it's blank inside [], this code runs ONCE when the app component loads

    setUsername(prompt("Please enter your name "));

  }, [])


  const sendMessage = (event) => {
    //all the logic to send a message goes here

    event.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })



    // setMessages([...messages, {username : username, message : input}]);
    setInput('');

  }




  return (
    <div className="app">
      <img src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202010/Screenshot_2020-10-14_at_1.42._1200x768.png?UShl3_oE5u3ZKwzCwy2pjKiFeeQoMrFV&size=770:433" alt="" style={{ width: '200px', height: '100px', objectFit: 'contain' }} />

      <h1>Hello Clever Programmers 🚀 !</h1>
      <h2>Welcome {username}</h2>


      <form className="app__form">

        <FormControl className="app__formControl">

          {/* <InputLabel >Enter a message...</InputLabel> */}
          <Input className="app__input" placeholder="Enter a message..." value={input} onChange={event => setInput(event.target.value)} />

          <IconButton
            className="app__iconButton"
            disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}
          >
            <SendIcon />

          </IconButton>



          {/* <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>Send Message</Button> */}

        </FormControl>

      </form>




      {/* messages themselves */}

      {
        messages.map(({ id, message }) => (

          <Message key={id} username={username} message={message} />

        ))
      }



    </div>
  );
}

export default App;
