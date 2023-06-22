import React, {useState} from 'react'


export default function TextForm(props) {
    // 'Enter text here' is the default text in the variable we just declared named text.
    // Whatever updates we will make to text variable will be through setText function.
    //we cannot just update text like text=".." in React. We will have to use a function.
    //Here that func is setText and we use it like setText("adawdaw")
    const [text, setText] = useState('Enter text here.')

    return (
    <div>
        <br/>
        <h2>
            Hello! It's always nice to recap your learnings!
        </h2>
        <br/>
        <div className="mb-3">
            <label for="text-box" className="form-label">{props.heading}</label>
            <textarea className="form-control" value={text} id="text-box" rows="12"></textarea>
        </div>
        <button className="btn btn-primary">Submit</button>
    </div>
  )
}
