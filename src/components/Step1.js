import React, { useState } from 'react';

const Step1 = ({ formData, handleChange, nextStep }) => {
  const [errors, setErrors] = useState({});

  // Validate form inputs
  const validate = () => {
    let tempErrors = {};

    // Check if name is empty
    if (!formData.name) tempErrors.name = 'Name is required';

    // Check if email is empty or invalid
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) tempErrors.email = 'Email is required';
    else if (!emailPattern.test(formData.email)) tempErrors.email = 'Invalid email format';

    // Check if phone number is empty or not 10 digits
    const phonePattern = /^[0-9]{10}$/;
    if (!formData.phone) tempErrors.phone = 'Phone number is required';
    else if (!phonePattern.test(formData.phone)) tempErrors.phone = 'Phone number must be 10 digits';

    setErrors(tempErrors);

    // Return true if no errors
    return Object.keys(tempErrors).length === 0;
  };

  // This function will clear specific error when the user starts typing correct input
  const handleInputChange = (input) => (e) => {
    const value = e.target.value;
    handleChange(input)(e);

    // Clear error for the input field once it is valid
    if (input === 'name' && value) {
      setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
    } else if (input === 'email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    } else if (input === 'phone' && /^[0-9]{10}$/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validate()) {
      nextStep(); // Proceed to the next step if validation passes
    }
  };

  return (
    <div>
      <h2>Step 1: Personal Information</h2>
      <form>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={handleInputChange('name')}
            className={errors.name ? 'error-input' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            className={errors.email ? 'error-input' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            value={formData.phone}
            onChange={handleInputChange('phone')}
            className={errors.phone ? 'error-input' : ''}
            maxLength="10"
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <button onClick={handleNext}>Next</button>
      </form>
    </div>
  );
};

export default Step1;
