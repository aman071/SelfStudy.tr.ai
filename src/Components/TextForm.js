import React, {useState} from 'react'


export default function TextForm(props) {

    const handleOnClick = () => {
        console.log("Submit was clicked.");
    }

    const handleCopy = () => {  //copies text written in the textArea
        var text=document.getElementById("text-box");   //id of text area was set to be text-box
        text.select();
        navigator.clipboard.writeText(text.value);
    }

    const handleExtraSpaces = () => {  //trims excess spaces between words
        var newText=text.split(/[ ]+/); //1 or more than 1 space if found, split.
        setText(newText.join(" "));
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
    const [text, setText] = useState('')    //useState is a React Hook that allows us to work with states and other React features

    return (
    <>
        <div className="container">
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
            <button className="btn btn-primary mx-2" onClick={handleCopy}>Copy Text</button>
            <button className="btn btn-primary mx-2" onClick={handleExtraSpaces}>Trim Spaces</button>
            
        </div>
        <div className="container my-3">
            <h3>Your text summary</h3>
            <p>{text.split(" ").length} words and {text.length} characters</p>  {/*text.split will return an array*/}
            
            {/*For a slow reader, 125 words are read in 1 minute. So 1 word is read in 1/125 min = 0.008 min*/}
            <p>Your entry can be read in {Math.round(((0.008 * text.split(" ").length) + Number.EPSILON) * 100) / 100} minutes</p>

            <h3>Preview</h3>
            <p>{text}</p>
        </div>
    </>
  )
}
