import React, { useEffect, useState } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { AiOutlineTwitter } from 'react-icons/ai';
import { FaTumblr } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

function Wrapper () {
  //const { code } = useParams();
  const [quote, setQuote] = useState({ quote: '', author: '' });
  const [backgroundColor, setBackgroundColor] = useState("#ff5733");

   // Manejador de evento para el botón
   const handleButtonClick = () => {
    BackgroundColorChanger() //Funcion para cambiar de color
    fetchNewQuote(); // Llamar a la función para cargar una nueva cita cuando se presiona el botón
    };

  // Función para cargar una nueva cita
  const fetchNewQuote = () => {
    fetch(`https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`)
      .then(response => response.json())
      .then(data => {
        const randomIndex = Math.floor(Math.random() * data.quotes.length);
        const randomQuote = data.quotes[randomIndex];        
        setQuote(randomQuote);
      })
      .catch(error => {
        console.error("Error:", error);
      });
    };
    
  
  

  function BackgroundColorChanger(){
  
    const colors = ["#ff5733","#33ff57","#5733ff","#33ffff","#ff3399","#99ff33","#3366ff","#ff6633","#33ff99",
                    "#9966ff","#33ccff","#ffcc33","#33ffcc","#cc33ff","#33ff33","#ff33ff","#6633ff","#ff3366",
                    "#ff9966","#66ff33","#66ccff","#ffcc66","#ff66cc","#3399ff","#ff3399","#99ff66","#99ccff",
                    "#ffcc99","#ff99cc","#66ff99","#cc99ff","#99ff99","#ff9999","#9999ff","#ff6666","#6699ff",
                    "#ff6699","#9966ff","#ff9966","#33cc99","#99cc33","#9933cc","#33cc33","#cc3399","#99cc99",
                    "#cc9999","#9999cc","#cc66ff","#ff66ff","#ccff66","#ffccff","#cc33cc","#66ccff","#66ff66",
                    "#ff33cc","#ffcc33"];
    

    const changeBackgroundColor = () => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setBackgroundColor(randomColor); // Actualizas el color
       // Detengo el temporizador
      clearInterval(intervalId);
    };
      // Cambiar el color de fondo cada 3 segundos (ajusta el intervalo según tus preferencias)
    const intervalId = setInterval(changeBackgroundColor, 200);
  }

  // Llama a la función al inicio
  useEffect(() => {
    fetchNewQuote();
  }, []);

  return (
    <div className='wrapper' id="wrapper" 
      style={{
      backgroundColor: backgroundColor,
      width: "100vw",
      height: "100vh",
      transition: "background-color 2s ease",
      display: "flex",
      flexDirection: 'column'
    }}>
      <div id="quote-box">
        <div className="quote-text">
          <FaQuoteLeft className='FaQuoteLeft' style={{color: backgroundColor, transition: "color 2s ease"}}/>
          <span id='text' style={{color: backgroundColor, transition: "color 2s ease"}}>{quote.quote}</span>
        </div>
        <div className="quote-author">
          <p className='author-script'>-</p>
          <span id='author' style={{color: backgroundColor, transition: "color 2s ease"}}>{quote.author}</span>
        </div>
        <div className="buttons">
          <div>
            <a
              className="button"
              style={{background: backgroundColor, transition: "background-color 2s ease"}}
              id="tweet-quote"
              title="Tweet this quote!"
              target="_top"
              href={`https://twitter.com/intent/tweet?hashtags=quotes&amp;related=freecodecamp&amp;text="${quote.quote}" ${quote.author}`}
            >
              <AiOutlineTwitter style={{fontSize: 20}}/>
            </a>
            <a
              className="button"
              style={{background: backgroundColor, transition: "background-color 2s ease"}}
              id="tumblr-quote"
              title="Post this quote on tumblr!"
              target="_blank"
              href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&amp;tags=quotes,freecodecamp&amp;caption=${quote.author}&amp;content=${quote.quote}&amp;canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&amp;shareSource=tumblr_share_button`}
            >
              <FaTumblr style={{fontSize: 20}} />
            </a>
          </div>
          <button className="button" id="new-quote" style={{background: backgroundColor, transition: "background-color 2s ease"}} onClick={handleButtonClick}>New quote</button>
        </div>
      </div>
      <div className="footer">by<a style={{marginLeft: 5}} href="https://codepen.io/hezag/">hezag</a></div>
    </div>
  );
};

export { Wrapper };

