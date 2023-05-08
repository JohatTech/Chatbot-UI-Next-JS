import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'


export default function Home() {



//bot message var
const [messages, setMessages] = useState([]);



//fetching the API bot 
const handleSend= async (message) =>{


  setMessages([...messages, { text: message, sender: 'user' }, { text:'escribiendo...', sender: 'bot' }]);
  const response = await fetch("http://127.0.0.1:5000/respond", {
    method:'POST',
    body: JSON.stringify
	  (
      {
        'message': message,
      }
    ),
    headers:{
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json();
  setMessages([...messages, { text: message, sender: 'user' }, { text: data.prediction, sender: 'bot' }]);
  
}

  return (
    <>
      <Head>
        <title>ChatBot</title>
      </Head> 	
      <main className={styles.main}>
        <div className='justify-center text-center'>
          <h1 className="mb-10 text-3xl font-extrabold text-gray-900 dark:text-black md:text-5xl lg:text-33xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"> Real Time ChatBot</span></h1>
	  </div>
	  <div className = 'flex flex-row flex-wrap'>
        <div  className="h-96 w-80 bg-blue-100 rounded-lg overflow-y-auto scroll-smooth">
            <div className="user-info-header px-5 py-3">
            {messages.map((message, i) => (
              <div key={i} className={` mt-5 px-2 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${message.sender === 'user' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'} py-2 px-4 max-w-xs break-all rounded-lg text-sm scroll-smooth`}>
                  <span>{message.text}</span>
                </div>
              </div>
            ))}
            </div>
        </div>
      </div>
	  <div>
        <form onSubmit={(e) => {
                  e.preventDefault();
                  const message = e.target.message.value;
                  setMessages([...messages, { text: message, sender: 'user' }]);
                  handleSend(message);
                  e.target.reset();
                }}>

                  <div className="mt-4 flex">
                    <input type="text" name="message" placeholder="Type your message..." className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"/>
                    <button type="submit" className="ml-2 bg-blue-500 text-white rounded-lg px-4 py-2 text-sm">Send</button>
                  </div>
          </form>
      </div>
    </main>
    </>
  )
}
