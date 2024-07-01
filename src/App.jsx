import { useState } from 'react'
import './App.css'
import Game from './components/Game'

function App() {
 

  return (
    <>
    <div className='text-center m1'> <h1 className='flex text-3xl font-bold my-10 '>Helloo, It's Tic Tac Toe</h1>
    </div>
      <Game></Game>
    </>
  )
}

export default App
