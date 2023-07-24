import React, { useState } from 'react';

function Popup(props) {
  const [showInput, setShowInput] = useState(false);
  const [email, setEmail] = useState('');

  const handleButtonClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Do something with the 'email' variable, for example, submit it to a server.

    try {
      // Send the email data to the backend using a POST request
      const response = await fetch('http://localhost:8020/sendData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:email, text: props.content }), // Send the email and text data to the backend
      });

      if (response.ok) {
        // Reset the email and hide the input field after successful submission.
        setEmail('');
        setShowInput(false);
      } else {
        console.error('Failed to send email.');
        // Handle the error case here if needed.
      }
    } catch (error) {
      console.error('Error sending email:', error);
      // Handle the error case here if needed.
    }
    
    // Reset the email and hide the input field after submission.
    setEmail('');
    setShowInput(false);
  };

  return (
    <>
      <div className="popup">
        {!showInput?
        ( <button disabled={props.charCount===0} className="btn btn-primary mx-2 my-2" onClick={handleButtonClick}>Send To Email</button>) 
        : (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
            <button type="submit">Send to this email</button>
          </form>
        )}

        <button disabled={props.charCount===0} className="btn btn-primary mx-2 my-2" >Link to Evernote</button>
      
      </div>

    </>
  )
}

export default Popup;