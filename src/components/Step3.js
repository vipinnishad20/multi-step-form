import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap'; // Import GSAP

const Step3 = ({ formData, prevStep, handleSubmit }) => {
  const formRef = useRef(null); // Ref for the form fields

  // Animate input fields on load
  useEffect(() => {
    gsap.fromTo(
      formRef.current.querySelectorAll('div'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.5 }
    );
  }, []);

  return (
    <div ref={formRef}>
      <h2>Step 3: Confirmation</h2>
      <div className="form-group">
        <label>Name: </label>
        <span>{formData.name}</span>
      </div>
      <div className="form-group">
        <label>Email: </label>
        <span>{formData.email}</span>
      </div>
      <div className="form-group">
        <label>Phone: </label>
        <span>{formData.phone}</span>
      </div>
      <div className="form-group">
        <label>Address Line 1: </label>
        <span>{formData.addressLine1}</span>
      </div>
      <div className="form-group">
        <label>Address Line 2: </label>
        <span>{formData.addressLine2}</span>
      </div>
      <div className="form-group">
        <label>City: </label>
        <span>{formData.city}</span>
      </div>
      <div className="form-group">
        <label>State: </label>
        <span>{formData.state}</span>
      </div>
      <div className="form-group">
        <label>Zip Code: </label>
        <span>{formData.zip}</span>
      </div>

      <button type="button" onClick={prevStep}>Back</button>
      <button type="button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Step3;
