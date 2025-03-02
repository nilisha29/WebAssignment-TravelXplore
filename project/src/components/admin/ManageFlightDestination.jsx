import React, { useState, useEffect, useRef } from 'react';
import AdminPanel from './AdminPanel';
import '../styles/ManageFlightDestination.css';
import { toast } from 'react-toastify';

const ManageFlightDestination = () => {
    const [showOptions, setShowOptions] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formAction, setFormAction] = useState('');
    const [selectedDestination, setSelectedDestination] = useState('');
    const [destinationDetails, setDestinationDetails] = useState({
        name: '',
        shortDescription: '',
        basePrice: '',
        detailedDescription: ['', '', ''],
        flightInformation: {
            price: '',
            booking: 'Available for booking online.',
            baggageAllowance: '15 kg for checked baggage and 5 kg for carry-on.',
            totalFlights: 'Multiple flights daily.',
            airlines: ''
        }
    });
    const [imageFiles, setImageFiles] = useState({
        mainImage: null,
        detailImage1: null,
        detailImage2: null
    });
    const [destinations, setDestinations] = useState([]);
    const formRef = useRef(null);

    useEffect(() => {
        fetchDestinations();
    }, []);

    useEffect(() => {
        if (formAction === 'Update Destination' && selectedDestination) {
            fetchDestinationDetails(selectedDestination);
        }
    }, [formAction, selectedDestination]);

    const fetchDestinations = async () => {
        try {
            const response = await fetch('http://localhost:5000/destinations');
            const data = await response.json();
            setDestinations(data);
        } catch (error) {
            console.error('Error fetching destinations:', error);
            toast.error('Failed to fetch destinations');
        }
    };

    const fetchDestinationDetails = async (slug) => {
        try {
            const response = await fetch(`http://localhost:5000/destinations/${slug}`);
            if (!response.ok) throw new Error('Destination not found');
            
            const data = await response.json();
            setDestinationDetails({
                name: data.name,
                shortDescription: data.shortDescription,
                basePrice: data.basePrice,
                detailedDescription: data.detailedDescription,
                flightInformation: data.flightInformation
            });
        } catch (error) {
            console.error('Error fetching destination details:', error);
            toast.error('Failed to fetch destination details');
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setDestinationDetails(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleFlightInfoChange = (field, value) => {
        setDestinationDetails(prev => ({
            ...prev,
            flightInformation: {
                ...prev.flightInformation,
                [field]: value
            }
        }));
    };

    const handleImageUpload = (e, imageType) => {
        const file = e.target.files[0];
        if (file) {
            setImageFiles(prev => ({
                ...prev,
                [imageType]: file
            }));
        }
    };

    const handleDescriptionChange = (index, value) => {
        const updatedDescriptions = [...destinationDetails.detailedDescription];
        updatedDescriptions[index] = value;
        setDestinationDetails(prev => ({
            ...prev,
            detailedDescription: updatedDescriptions
        }));
    };

    const handleSaveDestination = async () => {
        try {
            const formData = new FormData();
            
            // Add basic information
            formData.append('name', destinationDetails.name);
            formData.append('shortDescription', destinationDetails.shortDescription);
            formData.append('basePrice', destinationDetails.basePrice);
            formData.append('detailedDescription', JSON.stringify(destinationDetails.detailedDescription));
            formData.append('flightInformation', JSON.stringify(destinationDetails.flightInformation));

            // Add images
            if (imageFiles.mainImage) {
                formData.append('mainImage', imageFiles.mainImage);
            }
            if (imageFiles.detailImage1) {
                formData.append('detailImage1', imageFiles.detailImage1);
            }
            if (imageFiles.detailImage2) {
                formData.append('detailImage2', imageFiles.detailImage2);
            }

            let response;
            if (formAction === 'Create Destination') {
                response = await fetch('http://localhost:5000/destinations', {
                    method: 'POST',
                    body: formData
                });
            } else {
                response = await fetch(`http://localhost:5000/destinations/${selectedDestination}`, {
                    method: 'PUT',
                    body: formData
                });
            }

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            const result = await response.json();
            toast.success(result.message);
            setShowForm(false);
            setShowOptions(true);
            fetchDestinations();
        } catch (error) {
            console.error('Error saving destination:', error);
            toast.error(error.message || 'Error saving destination');
        }
    };

    const handleDeleteDestination = async () => {
        if (!window.confirm('Are you sure you want to delete this destination?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/destinations/${selectedDestination}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            toast.success('Destination deleted successfully');
            setShowForm(false);
            setShowOptions(true);
            fetchDestinations();
        } catch (error) {
            console.error('Error deleting destination:', error);
            toast.error(error.message || 'Error deleting destination');
        }
    };

    return (
        <div className="manage-flight-destination-container">
            <AdminPanel />
            <div className="manage-flight-destination-main-content">
                <h1>Manage Flight Destinations</h1>

                {showOptions && (
                    <div className="options-container">
                        <div className="option-card">
                            <button onClick={() => {
                                setShowOptions(false);
                                setShowForm(true);
                                setFormAction('Create Destination');
                                setDestinationDetails({
                                    name: '',
                                    shortDescription: '',
                                    basePrice: '',
                                    detailedDescription: ['', '', ''],
                                    flightInformation: {
                                        price: '',
                                        booking: 'Available for booking online.',
                                        baggageAllowance: '15 kg for checked baggage and 5 kg for carry-on.',
                                        totalFlights: 'Multiple flights daily.',
                                        airlines: ''
                                    }
                                });
                                setImageFiles({
                                    mainImage: null,
                                    detailImage1: null,
                                    detailImage2: null
                                });
                            }}>
                                Create New Destination
                            </button>
                        </div>
                        <div className="option-card">
                            <button onClick={() => {
                                setShowOptions(false);
                                setShowForm(true);
                                setFormAction('Update Destination');
                            }}>
                                Update Existing Destination
                            </button>
                        </div>
                        <div className="option-card">
                            <button onClick={() => {
                                setShowOptions(false);
                                setShowForm(true);
                                setFormAction('Delete Destination');
                            }}>
                                Delete Existing Destination
                            </button>
                        </div>
                    </div>
                )}

                {showForm && (
                    <div className="managedestination-form-container" ref={formRef}>
                        {(formAction === 'Update Destination' || formAction === 'Delete Destination') && (
                            <select
                                value={selectedDestination}
                                onChange={(e) => setSelectedDestination(e.target.value)}
                                className="destination-select"
                            >
                                <option value="">Select a Destination</option>
                                {destinations.map((dest) => (
                                    <option key={dest.urlSlug} value={dest.urlSlug}>
                                        {dest.name}
                                    </option>
                                ))}
                            </select>
                        )}

                        {formAction === 'Delete Destination' ? (
                            <div className="delete-confirmation">
                                <p>Are you sure you want to delete this destination?</p>
                                <div className="delete-buttons">
                                    <button onClick={handleDeleteDestination} className="delete-btn">Yes, Delete</button>
                                    <button onClick={() => setShowForm(false)} className="cancel-btn">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="managedestination-form">
                                <div className="form-group">
                                    <label htmlFor="name">Destination Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={destinationDetails.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="manageform-group">
                                    <label htmlFor="shortDescription">Short Description</label>
                                    <input
                                        type="text"
                                        id="shortDescription"
                                        value={destinationDetails.shortDescription}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="manageform-group">
                                    <label htmlFor="basePrice">Base Price</label>
                                    <input
                                        type="number"
                                        id="basePrice"
                                        value={destinationDetails.basePrice}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="manageform-group">
                                    <label>Images</label>
                                    <div className="image-uploads">
                                        <div>
                                            <label>Main Image</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, 'mainImage')}
                                                required={formAction === 'Create Destination'}
                                            />
                                        </div>
                                        <div>
                                            <label>Detail Image 1</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, 'detailImage1')}
                                                required={formAction === 'Create Destination'}
                                            />
                                        </div>
                                        <div>
                                            <label>Detail Image 2</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, 'detailImage2')}
                                                required={formAction === 'Create Destination'}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="manageform-group">
                                    <label>Detailed Description</label>
                                    {destinationDetails.detailedDescription.map((desc, index) => (
                                        <textarea
                                            key={index}
                                            value={desc}
                                            placeholder={`Paragraph ${index + 1}`}
                                            onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                            required
                                        />
                                    ))}
                                </div>

                                <div className="manageform-group">
                                    <label>Flight Information</label>
                                    <div className="flight-info">
                                        <input
                                            type="text"
                                            placeholder="Price"
                                            value={destinationDetails.flightInformation.price}
                                            onChange={(e) => handleFlightInfoChange('price', e.target.value)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Booking Status"
                                            value={destinationDetails.flightInformation.booking}
                                            onChange={(e) => handleFlightInfoChange('booking', e.target.value)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Baggage Allowance"
                                            value={destinationDetails.flightInformation.baggageAllowance}
                                            onChange={(e) => handleFlightInfoChange('baggageAllowance', e.target.value)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Total Flights"
                                            value={destinationDetails.flightInformation.totalFlights}
                                            onChange={(e) => handleFlightInfoChange('totalFlights', e.target.value)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Airlines"
                                            value={destinationDetails.flightInformation.airlines}
                                            onChange={(e) => handleFlightInfoChange('airlines', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="manageform-actions">
                                    <button onClick={handleSaveDestination} className="save-btn">
                                        {formAction}
                                    </button>
                                    <button onClick={() => setShowForm(false)} className="cancel-btn">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageFlightDestination;