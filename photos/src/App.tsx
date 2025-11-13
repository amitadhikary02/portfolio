import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App min-h-screen bg-bg-primary">
      <Navbar />
      
      {/* Main Content */}
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
              My Photography
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-12">
              Welcome to my photography portfolio. This is where I share my passion for capturing moments.
            </p>
            
            {/* Placeholder for future photo gallery */}
            <div className="bg-bg-card border border-border-color rounded-2xl p-12 text-center">
              <p className="text-text-secondary text-lg">
                Photo gallery coming soon...
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
