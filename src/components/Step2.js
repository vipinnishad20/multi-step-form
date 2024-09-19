import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap'; // Import GSAP

const Step2 = ({ formData, handleChange, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({});
  const formRef = useRef(null); // Ref for the form fields

  // Animate input fields on load
  useEffect(() => {
    gsap.fromTo(
      formRef.current.querySelectorAll('input'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.5 }
    );
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate address line 1, city, state, and zip code
    if (!formData.addressLine1) newErrors.addressLine1 = 'Address Line 1 is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';

    if (!formData.zip) {
      newErrors.zip = 'Zip Code is required';
    } else if (!/^\d+$/.test(formData.zip)) {
      newErrors.zip = 'Zip Code must be a valid integer';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      nextStep();
    }
  };

  return (
    <form ref={formRef} onSubmit={handleNext}>
      <h2>Step 2: Address Information</h2>
      <div className="form-group">
        <label>Address Line 1</label>
        <input type="text" value={formData.addressLine1} onChange={handleChange('addressLine1')} />
        {errors.addressLine1 && <span className="error">{errors.addressLine1}</span>}
      </div>
      <div className="form-group">
        <label>Address Line 2</label>
        <input type="text" value={formData.addressLine2} onChange={handleChange('addressLine2')} />
      </div>
      <div className="form-group">
        <label>City</label>
        <input type="text" value={formData.city} onChange={handleChange('city')} />
        {errors.city && <span className="error">{errors.city}</span>}
      </div>
      <div className="form-group">
        <label>State</label>
        <input type="text" value={formData.state} onChange={handleChange('state')} />
        {errors.state && <span className="error">{errors.state}</span>}
      </div>
      <div className="form-group">
        <label>Zip Code</label>
        <input type="number" value={formData.zip} onChange={handleChange('zip')} />
        {errors.zip && <span className="error">{errors.zip}</span>}
      </div>
      <button type="button" onClick={prevStep}>Back</button>
      <button type="submit">Next</button>
    </form>
  );
};

export default Step2;
