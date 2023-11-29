import React, { useState } from 'react';
// import './PredefinedHostForm.css';
import './CustomHostForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import themeone from "../images/wedding-theme.jpg";
import themetwo from "../images/Halloween-theme.jpg";
import themethree from "../images/birthday-theme.jpg";
import themefour from "../images/christmas-theme.jpg";
import themefive from "../images/roses-theme.jpg";
import themesix from "../images/seminar-theme.jpg";
import themeseven from "../images/travel-theme.jpg";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PredefinedHostForm = () => {
    const {eventType} = useParams();
    const [formData, setFormData] = useState({
        eventType: eventType,
        eventTitle: '',
        eventVenue: '',
        dateTime: '',
        customMessage: '',


            question1: false,
            question2: false,
            question3: false,
            question4: false,
            question5: false,

        customQuestion: '',
        eventDetails: '',
        invitationImageUrl: '',
    });

  

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8080/api/events/upload-image', uploadFormData);
            setFormData({ ...formData, invitationImageId: response.data });
        } catch (error) {
            console.error('Error uploading image', error);
        }
    };

// Logic to handle image selection  
    const handleImageSelection = (themeUrl,index) => {
        setFormData({ ...formData, invitationImageUrl: themeUrl });
        setSelectedTile((prevSelectedTile) => (prevSelectedTile === index ? null : index));
        //console.log(themeUrl);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        console.log('Form Data:', formData);
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const uploadFormData = new FormData();
        uploadFormData.append('event', new Blob([JSON.stringify(formData)], { type: 'application/json' }));
        if (selectedFile) {
            uploadFormData.append('file', selectedFile);
        }

        try {
            const response = await axios.post('http://localhost:8080/api/events/create-event', uploadFormData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const createdEventId = response.data.id;
            //console.log(response.data)// Assuming the API response includes the event ID
            navigate(`/events/${createdEventId}`); // Adjust the route as needed
        } catch (error) {
            console.error('Error submitting the form', error);
        }
    };

    const [selectedTile, setSelectedTile] = useState(null);

    const changeBorderColor = (index) => {
      setSelectedTile((prevSelectedTile) => (prevSelectedTile === index ? null : index));
    };
  
    const getBorderColor = (index) => (selectedTile === index ? 'black' : '#ddd');


    return (
        <div className="PredefinedHostFormContainer">
            <form className="hostForm" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Event Type:</label>
                        <p className="event-type-display">{formData.eventType}</p>
                    </div>
                    <div className="form-group">
                        <label>Event Title:</label>
                        <input type="text" name="eventTitle" value={formData.eventTitle} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Event Venue:</label>
                        <input type="text" name="eventVenue" value={formData.eventVenue} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Date & Time:</label>
                        <input type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Custom Message:</label>
                        <input type="text" name="customMessage" value={formData.customMessage} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Custom Question:</label>
                        <input type="text" name="customQuestion" value={formData.customQuestion} onChange={handleInputChange} />
                    </div>
                </div>
                <div>
                    <label>Invitation Theme:</label>
                    <div className="inv-theme-tiles">
                        <div className="image-tile" style={{ border: `2px solid ${getBorderColor(0)}` }} onClick={() => handleImageSelection("wedding", 0)}>
                            <img src={themeone} alt="theme1" />
                            <hr />
                            <p name="wedding" className="form-tile-name">wedding</p>
                        </div>
                        <div className="image-tile" name="theme2" style={{ border: `2px solid ${getBorderColor(1)}` }} onClick={() => handleImageSelection("halloween", 1)}>
                            <img src={themetwo} alt="theme2" />
                            <hr />
                            <p name="halloween" className="form-tile-name">halloween</p>
                        </div>
                        <div className="image-tile" name="theme3" style={{ border: `2px solid ${getBorderColor(2)}` }} onClick={() => handleImageSelection("birthday", 2)}>
                            <img src={themethree} alt="theme3" />
                            <hr />
                            <p name="birthday" className="form-tile-name">birthday</p>
                        </div>
                        <div className="image-tile" name="theme4" style={{ border: `2px solid ${getBorderColor(3)}` }} onClick={() => handleImageSelection("christmas", 3)}>
                            <img src={themefour} alt="theme4" />
                            <hr />
                            <p name="christmas" className="form-tile-name">christmas</p>
                        </div>
                        <div className="image-tile" name="theme5" style={{ border: `2px solid ${getBorderColor(4)}` }} onClick={() => handleImageSelection("roses", 4)}>
                            <img src={themefive} alt="theme5" />
                            <hr />
                            <p name="roses" className="form-tile-name">roses</p>
                        </div>
                        <div className="image-tile" name="theme6" style={{ border: `2px solid ${getBorderColor(5)}` }} onClick={() => handleImageSelection("seminar", 5)}>
                            <img src={themesix} alt="theme6" />
                            <hr />
                            <p name="seminar" className="form-tile-name">seminar</p>
                        </div>
                        <div className="image-tile" name="theme7" style={{ border: `2px solid ${getBorderColor(6)}` }} onClick={() => handleImageSelection("travel", 6)}>
                            <img src={themeseven} alt="theme7" />
                            <hr />
                            <p name="travel" className="form-tile-name">travel</p>
                        </div>
                        <div className="image-tile" name="cust_theme">
                            <label htmlFor="fileInput" className="file-input-label">
                                <FontAwesomeIcon icon={faCirclePlus} className="faiconplus" />
                                <input type="file" id="fileInput" className="file-input" accept="image/*" onChange={handleFileChange} />
                            </label>
                        </div>

                    </div>

                    {/* custom imge upload tile */}
                </div>

                {/* Questions */}
                <div id="questions-div">
                    <h6>Questions:</h6>
                    <div className="question-div">
                    <input className="checkbox-question" type="checkbox" id="question1" name="question1" checked={formData.question1} onChange={handleInputChange} />
                    <label className="checkbox-label" htmlFor="question1">Do you have any dietary restrictions or food allergies we should be aware of?</label>
                    {/* checked={formData.questions.includes('question1')}  onChange={() => handleCheckboxChange('question1')}  */}
                    </div><br />
                    <div className="question-div"><input className="checkbox-question" type="checkbox" id="question2" name="question2" checked={formData.question2} onChange={handleInputChange} />
                    <label className="checkbox-label" htmlFor="question2">Will you be bringing a plus-one or any additional guests?</label></div>
                    {/*  checked={formData.questions.includes('question2')} onChange={() => handleCheckboxChange('question2')}  */}
                    <br /> <div className="question-div">
                   <input  className="checkbox-question" type="checkbox" id="question3" name="question3" checked={formData.question3} onChange={handleInputChange} />
                    <label className="checkbox-label" htmlFor="question3">Is there anything specific you would like to request or bring to the event?</label></div>
                    {/*  checked={formData.questions.includes('question3')} onChange={() => handleCheckboxChange('question3')}  */}
                    <br /><div className="question-div">
                    <input className="checkbox-question" type="checkbox" id="question4" name="question4" checked={formData.question4} onChange={handleInputChange} />
                    <label className="checkbox-label" htmlFor="question4">Are there specific activities or components of the event that you are particularly interested in or would like to participate in?</label></div>
                    {/* checked={formData.questions.includes('question4')}  onChange={() => handleCheckboxChange('question4')}  */}
                   <br /> <div className="question-div">
                    <input className="checkbox-question" type="checkbox" id="question5" name="question5" checked={formData.question5} onChange={handleInputChange} />
                    <label className="checkbox-label" htmlFor="question5">Are you comfortable with photographs being taken during the event? If not, is there a specific area or time you would prefer not to be photographed?</label>
                  </div>  {/*  checked={formData.questions.includes('question5')} onChange={() => handleCheckboxChange('question5')}  */}


                </div>

                <br />
                <label>
                    Event Details:<br />
                    {/*  onChange={handleInputChange}  */}
                    <input type="text" name="eventDetails" value={formData.eventDetails} onChange={handleInputChange} />
                </label>
                <br />
                <button type="submit" id="create-inv-btn">Create Invitation</button>
            </form>
        </div>
    );
}

export default PredefinedHostForm;