import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import './App.css'; // Use CSS file to style the form and background

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: ''
  });

  const formContainerRef = useRef(null);

  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    // Save data to localStorage
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    // Animate only the form container, not the input fields
    gsap.fromTo(
      formContainerRef.current, 
      { x: 100, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.5 }
    );
  }, [step]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('submittedFormData', JSON.stringify(formData));
    alert('Form Submitted! Data has been saved to localStorage.');
    console.log('Form Submitted', formData);
  };

  return (
    <div className="app-container">
      <div className="background-image"></div> {/* Background image with blur */}
      <div className="app-overlay"></div> {/* Overlay for readability */}
      <div ref={formContainerRef} className="form-container">
        {step === 1 && <Step1 formData={formData} handleChange={handleChange} nextStep={nextStep} />}
        {step === 2 && <Step2 formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && <Step3 formData={formData} prevStep={prevStep} handleSubmit={handleSubmit} />}
      </div>
    </div>
  );
};

export default App;
