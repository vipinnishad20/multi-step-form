import React, { useState, useEffect } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) setFormData(JSON.parse(savedData));
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const nextStep = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setCurrentStep(currentStep + 1);
    } else {
      setErrors(newErrors);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const validateForm = () => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
      if (!formData.phone) newErrors.phone = "Phone number is required";
    }
    if (currentStep === 2) {
      if (!formData.addressLine1) newErrors.addressLine1 = "Address Line 1 is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.zip) newErrors.zip = "Zip Code is required";
    }
    return newErrors;
  };

  const handleSubmit = () => {
    console.log("Form Submitted", formData);
    localStorage.clear();
    // Simulate API call
    alert("Form Submitted Successfully!");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full max-w-lg bg-white p-6 shadow-md rounded-md">
      {currentStep === 1 && (
        <Step1 formData={formData} errors={errors} onChange={handleInputChange} />
      )}
      {currentStep === 2 && (
        <Step2 formData={formData} errors={errors} onChange={handleInputChange} />
      )}
      {currentStep === 3 && <Step3 formData={formData} />}
      
      <div className="flex justify-between mt-4">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-4 py-2 ${currentStep === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'} rounded`}
        >
          Back
        </button>
        {currentStep < 3 && (
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        )}
        {currentStep === 3 && (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
