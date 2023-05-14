import React from 'react'

import { Header, Hello, Devices, About, Recent, Footer } from '../widgets'

import './App.sass'

const App = () => {
  return (
    <>
      <Header />
      <Hello />
      <Devices />
      <About />
      <Recent />
      <Footer />
    </>
  )
}

export default App
