import React, {useState} from 'react'


export default function TextForm(props) {

    const handleOnClick = () => {
        console.log("Submit was clicked.");
    }

    const handleCopy = () => {  //copies text written in the textArea
        //these 3 lines below ka kaam is done by the last line by the navigator object
        // var text=document.getElementById("text-box");   //id of text area was set to be text-box
        // text.select();
        // document.getSelection().removeAllRanges();  //deselect selected text
        navigator.clipboard.writeText(text);
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

    //these buttons and toggleStyle were setting dark mode for this textForm area only. But I wanted the entire page, so i moved that functionality
    //to App.js and use state variable to handle it. The state variable is called mode, which is received as props in TextForm and handled
    //here accordingly
    // const [btnText, setBtnText] = useState('Enable Dark Mode');       //dark mode button text toggling

    // const toggleStyle = () => {
    //     if(myStyle.color === 'white'){
    //         setMyStyle({
    //             color:'black',
    //             backgroundColor:'white'
    //         });
    //         setBtnText('Enable Dark Mode');
    //     }
    //     else{
    //         setMyStyle({
    //             color:'white',
    //             backgroundColor:'black'
    //         });
    //         setBtnText('Enable Light Mode');
    //     }
    // };

    return (
    <>
        <div className={`container text-${props.mode==='light'?'dark':'light'}`} >
            <br/>
            <h2> Hello! It's always nice to recap your learnings!</h2>
            <div className="mb-2">
                <label htmlFor="text-box" className="form-label">{props.heading}</label>
                <textarea   className="form-control" value={text} onChange={handleOnChange} 
                            style={{backgroundColor:props.mode==='light'?'white':'#2a2e34', 
                                    color:props.mode==='light'?'black':'white'}} id="text-box" rows="12">
                </textarea>
            </div>
            <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleOnClick}>Submit</button>
            <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleCopy}>Copy Text</button>
            <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleExtraSpaces}>Trim Spaces</button>
            {/* <button className="btn btn-primary mx-2 my-2" onClick={toggleStyle}>{btnText} TextArea</button> */}
            
        </div>
        <div className={`container my-3 text-${props.mode==='light'?'dark':'light'}`}>
            <h3>Your text summary</h3>
            {/* text.split gives array. filter takes an element and applies the condition. Here, that ele will be in array only if its length!=0 */}
            <p>{text.split("/\s+/").filter((element)=> {return element.length!==0}).length} words and {text.length} characters</p>  {/*text.split will return an array*/}
            
            {/*For a slow reader, 125 words are read in 1 minute. So 1 word is read in 1/125 min = 0.008 min*/}
            <p>Your entry can be read in {Math.round(((0.008 * text.split("/\s+/").filter((element)=> {return element.length!==0}).length) + Number.EPSILON) * 100) / 100} minutes</p>

            <h3>Preview</h3>
            <p>{text.length>0?text:"Nothing to preview"}</p>
        </div>
    </>
  )
}
