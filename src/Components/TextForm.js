import React, {useState} from 'react'


export default function TextForm(props) {

    const handleOnClick = () => {
        console.log("Submit was clicked.");
    }

    
    const handleOnChange = (event) => {
        console.log("OnChange.");
        setText(event.target.value);    //jo bhi change ho rha hai text area mei, that is handled by this function and this line helps update
                                        //ki whatever the user is making change should be updated, in this case, text is set to what is was 
                                        //before + what is being done. If this line is not entered, then we will not be able to add stuff.
    }

    // 'Enter text here' is the default text in the variable we just declared named text.
    // Whatever updates we will make to text variable will be through setText function.
    //we cannot just update text like text=".." in React. We will have to use a function.
    //Here that func is setText and we use it like setText("adawdaw")
    const [text, setText] = useState('Enter text here.')    //useState is a React Hook that allows us to work with states and other React features

    return (
    <div>
        <br/>
        <h2>
            Hello! It's always nice to recap your learnings!
        </h2>
        <br/>
        <div className="mb-3">
            <label htmlFor="text-box" className="form-label">{props.heading}</label>
            <textarea className="form-control" value={text} onChange={handleOnChange} id="text-box" rows="12"></textarea>
        </div>
        <button className="btn btn-primary" onClick={handleOnClick}>Submit</button>
    </div>
  )
}
