import React, { useContext } from 'react';
import './App.css'
import { AppContext, AppProvider } from './AppProvider';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import FormSection from './components/FormSection';
import EventPage from './pages/EventPage';
import MyTicket from './pages/MyTicket';
import AboutProject from './pages/AboutProject';

function InnerApp() {
  //i created this inner app only because i might to use the app context in the root app, normally it isn't needed, just in scenarios like this ::PS:: it's a usual practice for me
  const {  } = useContext(AppContext);

  return (
    <>
     <div className="container">
      <Header />
      <section className="body">
        <Routes>
          <Route path='/' element={<EventPage />} />
          <Route path='/Tickets' element={<MyTicket />} />
          <Route path='/About' element={<AboutProject />} />
        </Routes>
      </section>
     </div>
    </>
  )
}

function App() {

  return (
    <>
      <AppProvider>
        <InnerApp />
      </AppProvider>
    </>
  )
}

export default App
