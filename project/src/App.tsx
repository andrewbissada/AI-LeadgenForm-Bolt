import React from 'react';
import { Building } from 'lucide-react';
import LeadForm from './components/LeadForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="w-full bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center">
          <div className="flex items-center text-blue-600">
            <Building className="w-8 h-8 mr-2" />
            <span className="font-bold text-xl">LeadPro</span>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Get a Personalized Business Solution
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tell us about your business needs and receive an AI-generated personalized 
              response tailored to your specific requirements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                    <span className="text-sm font-medium">✓</span>
                  </div>
                  <p className="text-gray-600">Personalized business solutions tailored to your needs</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                    <span className="text-sm font-medium">✓</span>
                  </div>
                  <p className="text-gray-600">Expert team with years of industry experience</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                    <span className="text-sm font-medium">✓</span>
                  </div>
                  <p className="text-gray-600">Proven track record of successful client partnerships</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                    <span className="text-sm font-medium">✓</span>
                  </div>
                  <p className="text-gray-600">Innovative solutions powered by cutting-edge technology</p>
                </li>
              </ul>
            </div>
            
            <LeadForm />
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <Building className="w-6 h-6 mr-2" />
                <span className="font-bold text-lg">LeadPro</span>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} LeadPro. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;