import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from  './components/Footer';
import Homepage from './pages/Homepage';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import About from './pages/About';
import Guides from './pages/Guides';
import Contacts from './pages/Contacts';
import Services from './pages/Services';
import DocumentsPage from './pages/Documents';

function App() {
  return (
    <div className="App">
       <Router>
        <div className="flex min-h-screen flex-col bg-background">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/o-nas" element={<About />} />
              <Route path="/pruvodci" element={<Guides />} />
              <Route path="/kontakty" element={<Contacts />} />
              <Route path="/zajezdy" element={<Destinations/>} />
              <Route path="/zajezdy/:id" element={<DestinationDetail/>} />
              <Route path='/sluzby' element={<Services/>} />
              <Route path='/dokumenty' element={<DocumentsPage/>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
