import {useState} from 'react';
import Footer from '../components/footer';
import Header from '../components/header';
import { redirect } from 'react-router-dom';
import './logins.css';


function Login() {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")
  let [status, setStatus] = useState(false)

  function handleSubmit(event) {
    event.preventDefault();

    console.log(password, email)

    const login = 
    {
      "email": email,
      "password": password
    }

    fetch('http://172.16.50.58:5000/api/v1/login', {

      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
    },
      body: JSON.stringify(login) // body data type must match "Content-Type" header

    }).then (function (response) {
      console.log(response)
      if (response.ok == true){
        window.location.assign("/")
        console.log(login, "status", status)
      } else {
       setStatus(true)
       console.log(status)
      }
    }).catch (function (error) {
      setStatus(true)
      console.log(error, login, "status", status)
    })
  }


  return (
    <div>
      <Header/>
      <main>
        <h1>Login:</h1>
        <form onSubmit={handleSubmit} >

        <label htmlFor="">Email</label>
              <input 
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
          <label htmlFor="">Password</label>
              <input 
              type="text" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            
              <button>Submit</button>
              <p class={status ? "wrong" : ""}>{status ? "Wrong password or email" : ""}</p>
            </form>
      </main>
      <Footer/>
    </div>
  );
}

export default Login;
