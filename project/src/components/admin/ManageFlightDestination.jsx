import React, { useState, useEffect, useRef } from 'react';
import AdminPanel from './AdminPanel';
import '../styles/ManageFlightDestination.css';

const ManageFlightDestination = () => {
  const [showOptions, setShowOptions] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formAction, setFormAction] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [DestinationDetails, setDestinationDetails] = useState({
    name: '',
    headdescription: '',
    description: '',
    duration: '',
    price: '',
    imageUrl: [], 
    inclusions: [],
    places: []
  });
  const [DestinationImageFile, setDestinationImageFile] = useState([]);
  const [DestinationOptions, setDestinationOptions] = useState([]);

  const formRef = useRef(null);

  useEffect(() => {
  
    const fetchDestinationOptions = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No auth token found');
        alert('You are not authorized to perform this action.');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/destination', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const result = await response.json();
    const data = result.data || [];  // Accessing the data field
    const options = data.map(DestinationDetails => DestinationDetails.name);
    setDestinationOptions(options);  // Assuming the package name is in the 'name' field
    console.log(options);
  } catch (error) {
    console.error("Error fetching destination options:", error);
  }

      //   if (!response.ok) {
      //     console.error('Failed to fetch package options:', response.status, response.statusText);
      //     alert('Failed to fetch package options');
      //     return;
      //   }

      //   const data = await response.json();
      //   setPackageOptions(data.map(packageDetails => packageDetails.name)); // Assuming the package name is in the 'name' field
      // } catch (error) {
      //   console.error('Error fetching package options:', error);
      // }
    };

    fetchDestinationOptions();
  }, []);

  useEffect(() => {
    if (formAction === 'Update Destination' && selectedDestination) {
      // Fetch the package details based on the selected package
      fetchDestinationDetails(selectedDestination);
    }
  }, [formAction, selectedDestination]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
        setShowOptions(true);
      }
    };

    if (showForm) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showForm]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDestinationDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value
    }));
    console.log(`Input Change - ${id}: ${value}`);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (DestinationDetails.imageUrl.length + files.length > 6) {
        alert('You can only upload a maximum of 6 images.');
        return;
    }
    setDestinationImageFile(files); // Store the files for upload
    setDestinationDetails((prevDetails) => ({
        ...prevDetails,
        imageUrl: [...prevDetails.imageUrl, ...files.map(file => `uploads/${DestinationDetails.name.replace(/\s+/g, '-')}/${file.name}`)] // Store file paths directly
    }));
    console.log('Image Upload:', files);
  };

  const handleAddPlace = () => {
    setDestinationDetails((prevDetails) => ({
      ...prevDetails,
      places: [...prevDetails.places, { name: '', description: '' }]
    }));
  };

  const handlePlaceChange = (index, field, value) => {
    const updatedPlaces = DestinationDetails.places.map((place, i) => 
      i === index ? { ...place, [field]: value } : place
    );
    setDestinationDetails((prevDetails) => ({
      ...prevDetails,
      places: updatedPlaces
    }));
  };

  const handleAddInclusion = () => {
    setDestinationDetails((prevDetails) => ({
      ...prevDetails,
      inclusions: [...prevDetails.inclusions, '']
    }));
  };

  const handleInclusionChange = (index, value) => {
    const updatedInclusions = DEstinationDetails.inclusions.map((inclusion, i) => 
      i === index ? value : inclusion
    );
    setDestinationDetails((prevDetails) => ({
      ...prevDetails,
      inclusions: updatedInclusions
    }));
  };

  const handleSaveDestination = async () => {
    if (packageImageFile.length !== 6) {
        alert('Please upload exactly 6 images.');
        return;
    }

    console.log('Saving Destination:', DestinationDetails);

    try {
        const formData = new FormData();
        formData.append('name', DestinationDetails.name);
        formData.append('headdescription', DestinationDetails.headdescription);
        formData.append('description', DestinationDetails.description);
        formData.append('duration', DestinationDetails.duration);
        formData.append('price', DestinationDetails.price);
        DestinationDetails.inclusions.forEach((inclusion, index) => {
            formData.append(`inclusions[${index}]`, inclusion);
        });
        DestinationDetails.places.forEach((place, index) => {
            formData.append(`places[${index}][name]`, place.name);
            formData.append(`places[${index}][description]`, place.description);
        });
        DestinationImageFile.forEach((file, index) => {
            formData.append(`images`, file);
        });

        const response = formAction === 'Create Destination'
            ? await createDestination(formData)
            : await updateDestination(selectedDestination, formData);
            
        console.log('Response:', response); // Log the response

        alert('Destination saved successfully');
        setShowForm(false);
        setShowOptions(true);
    } catch (error) {
        console.error('Error saving Destination:', error);
        alert('An error occurred while saving the destination.');
    }
  };

  const fetchDestinationDetails = async (DestinationName) => {
    try {
      const response = await fetch(`http://localhost:5000/Destination?name=${DestinationName}`);
      const data = await response.json();
      setDestinationDetails(data);
    } catch (error) {
      console.error('Error fetching package details:', error);
    }
  };

  const createDestination = async (formData) => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No auth token found');
        alert('You are not authorized to perform this action.');
        return;
    }

    console.log('Creating package with details:', formData);

    const response = await fetch('http://localhost:5000/Destination', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to create package:', response.status, response.statusText, errorText);
        alert(`Failed to create package: ${response.statusText}`);
        return;
    }

    return response.json();
  };

  const updateDestination = async (destinationId, formData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No auth token found');
      alert('You are not authorized to perform this action.');
      return;
    }

    const response = await fetch(`http://localhost:5000/packages/${destinationId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      console.error('Failed to update package:', response.status, response.statusText);
      alert('Failed to update package');
      return;
    }

    return response.json();
  };

  const deleteDestination = async (destinationId) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (!token) {
      console.error('No auth token found');
      alert('You are not authorized to perform this action.');
      return;
    }

    const response = await fetch(`http://localhost:5000/packages/${destinationId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      console.error('Failed to delete package:', response.status, response.statusText);
      alert('Failed to delete package');
      return;
    }

    return response.json();
  };

  return (

    <div className="manage-flight-destination-container">
      <AdminPanel />
      <div className="manage-flight-destination-main-content">
        <h1>Admin Dashboard</h1>

        <div className="options-container">
          <div className="option-card">
            <button
              onClick={() => {
                setShowOptions(false);
                setShowForm(true);
                setFormAction('Create Destination');
                setDestinationDetails({ name: '', headdescription: '', description: '', duration: '', price: '', imageUrl: [], inclusions: [], places: [] });
              }}
            >
              Create New Destination
            </button>
          </div>
          <div className="option-card">
            <button
              onClick={() => {
                setShowOptions(false);
                setShowForm(true);
                setFormAction('Update Destination');
                setDestinationDetails({ name: '', headdescription: '', description: '', duration: '', price: '', imageUrl: [], inclusions: [], places: [] });
              }}
            >
              Update Existing Destination
            </button>
          </div>
          <div className="option-card">
            <button
              onClick={() => {
                setShowOptions(false);
                setShowForm(true);
                setFormAction('Delete Destination');
                setSelectedDestination('');
              }}
            >
              Delete Existing Destination
            </button>
          </div>
        </div>

        {showForm && (
          <div className="flightform-container" ref={formRef}>
            {formAction === 'Update Destination' && (
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
              >
                <option value="">Select a Destination</option>
                {DestinationOptions.map((DestinationName, index) => (
                  <option key={index} value={DestinationName}>{DestinationName}</option>
                ))}
              </select>
            )}
            {formAction === 'Delete Destination' && (
              <>
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                >
                  <option value="">Select a destination</option>
                  {DestinationOptions.map((DestinationDetails, index) => (
                    <option key={index} value={DestinationDetails}>{DestinationDetails}</option>
                  ))}
                </select>
                <p>Are you sure you want to delete?</p>
                <div className="delete-confirmation">
                  <button onClick={handleDeleteDestination}>Yes</button>
                  <button onClick={() => setShowForm(false)}>No</button>
                </div>
              </>
            )}
            {formAction !== 'Delete Destination' && (
              <>
                <input
                  type="text"
                  id="name"
                  placeholder="Destination Name"
                  value={DestinationDetails.name}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  id="headdescription"
                  placeholder="Head Description"
                  value={DestinationDetails.headdescription}
                  onChange={handleInputChange}
                />
                <textarea
                  id="description"
                  placeholder="Description"
                  value={DestinationDetails.description}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  id="duration"
                  placeholder="Duration"
                  value={DestinationDetails.duration}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  id="price"
                  placeholder="Price"
                  value={DestinationDetails.price}
                  onChange={handleInputChange}
                />
                <div className="inclusions-section">
                  <h3>Inclusions</h3>
                  {packageDetails.inclusions.map((inclusion, index) => (
                    <div key={index} className="inclusion-input">
                      <input
                        type="text"
                        placeholder="Inclusion"
                        value={inclusion}
                        onChange={(e) => handleInclusionChange(index, e.target.value)}
                      />
                    </div>
                  ))}
                  <button onClick={handleAddInclusion}>Add Inclusion</button>
                </div>
                <input
                  type="file"
                  id="images"
                  multiple
                  onChange={handleImageUpload}
                />
                <div className="image-preview">
                  {DestinationDetails.imageUrl.map((image, index) => (
                    <img key={index} src={image} alt={`Preview ${index + 1}`} />
                  ))}
                </div>
                <div className="places-section">
                  <h3>Places</h3>
                  {DestinationDetails.places.map((place, index) => (
                    <div key={index} className="place-inputs">
                      <input
                        type="text"
                        placeholder="Place Name"
                        value={place.name}
                        onChange={(e) => handlePlaceChange(index, 'name', e.target.value)}
                      />
                      <textarea
                        placeholder="Place Description"
                        value={place.description}
                        onChange={(e) => handlePlaceChange(index, 'description', e.target.value)}
                      />
                    </div>
                  ))}
                  <button onClick={handleAddPlace}>Add Place</button>
                </div>
                <button onClick={handleSaveDestination}>{formAction}</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
    
  );
};

export default ManageFlightDestination;