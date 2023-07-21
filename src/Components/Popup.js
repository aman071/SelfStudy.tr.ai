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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the 'email' variable, for example, submit it to a server.
    console.log('Submitted email:', email);
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