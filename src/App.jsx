import { useEffect } from 'react'
import './App.css'

const URL = `https://dinoapi.brunosouzadev.com/api/dinosaurs`

function App() {

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL)
    result.json().then(json => {
      console.log(json);
    })
    }
    fetchData();
  }, []);

  return (
    <>

    </>
  )
}

export default App
