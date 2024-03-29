import { Outlet, Link } from 'react-router-dom';
import {useState} from 'react';
import './AppStyle.css';
import Footer from '../components/footer';
import Header from '../components/header';

function Index() {

  const [theme, setTheme] = useState("");
  const [brand, setBrand] = useState("");
  const [images, setImages] = useState('');
  const [loading, setLoading] = useState('');

  async function handleSubmit(event) {

    event.preventDefault();
    
    const info =
    {
      "theme": theme,
      "brand": brand
    }

    console.log(info)


    await fetch('http://172.16.50.58:5000/api/v1/new', {

      method: 'POST',
      headers: {
        'Authorization': 'Bearer 7cf704db5e0e4c9bad9857d7e02142ad',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info) // body info type must match "Content-Type" header
    }).then(function (response, body) {
      console.log(response, body)
      details()
    }).catch(function (error) {
        console.log(error)
    })

   
  }
 async function details(event) {
      await fetch('http://172.16.50.58:5000/api/v1/list', {
        method: 'GET',
      headers: {
        'Authorization': 'Bearer 7cf704db5e0e4c9bad9857d7e02142ad',
        'Content-Type': 'application/json'
      },
    }).then((response) => response.json()).then(
      (data)=> {console.log("data", data)
      if (data[data.length-1].generating == true) {
        setTimeout(() => {
          details()
          setLoading("Dirbtinis intelektas piešia")
        }, 2000);
      } else {
        setLoading("")
      }
      setImages(data)
    }
      )
    .catch(function (error) {
        console.log(error)
    })
    }

    async function details2(event) {
      event.preventDefault();


      await fetch('http://172.16.50.58:5000/api/v1/list', {
        method: 'GET',
      headers: {
        'Authorization': 'Bearer 7cf704db5e0e4c9bad9857d7e02142ad',
        'Content-Type': 'application/json'
      },
    }).then((response) => response.json()).then(
      (data)=> {console.log("data", data[data.length-1].generating)
      setImages(data)
    }
      )
    .catch(function (error) {
        console.log(error)
    })
    }

    async function addToFavourites(event){
      event.preventDefault();
      console.log(event.currentTarget.value)
      await fetch('http://172.16.50.58:5000/api/v1/'+ event.currentTarget.value +'/add', {
        method: 'PUT',
      headers: {
        'Authorization': 'Bearer 7cf704db5e0e4c9bad9857d7e02142ad',
      },
    }).then((response) => response.json()).then(
      (data)=> {console.log("data", data)
    }
      )
    .catch(function (error) {
        console.log(error)
    })
    }

  return (
    <>
    <Header/>
        <main>
          <h1>Create a prompt for your logo:</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="">Logo Theme</label>
              <input
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
              <label htmlFor="">Brand Name</label>
              <input 
              type="text" 
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              />
              <button>Submit</button>
            </div>
          </form><p class={loading ? "loading" : ""}>{loading}</p>
          <div class="images">
            
          {images ? images.slice(images.length - 4).map((images) => (
            <div>
                    <img src={"http://172.16.50.58:5000/" + images.link} alt="" />
                    <button value={images.id} onClick={addToFavourites}>To Favourites</button>
                    </div>
                )) : ""}
              </div>
          
        </main>
      <Footer />
    </>
  )
};

export default Index;
