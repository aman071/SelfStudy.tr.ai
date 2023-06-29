import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {
  FaBold,   FaHeading,          FaHighlighter,
  FaItalic, FaListOl,
  FaListUl, FaQuoteLeft,
  FaRedo,   FaStrikethrough,    FaUnderline,    FaUndo,
} from "react-icons/fa";
import '../TextEditor.css';

const MenuBar = ({ editor }, props) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="menuBar" >
      <div>
          <button 
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is_active" : ""}
          >
          <FaBold />
          </button>
          <button 
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is_active" : ""}
          >
          <FaItalic />
          </button>
          <button 
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is_active" : ""}
          >
          <FaUnderline />
          </button>
          <button 
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is_active" : ""}
          >
          <FaStrikethrough />
          </button>
          <button 
          onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
              editor.isActive("heading", { level: 2 }) ? "is_active" : ""
          }
          >
          <FaHeading />
          </button>
          <button 
          onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
              editor.isActive("heading", { level: 3 }) ? "is_active" : ""
          }
          >
          <FaHeading className="heading3" />
          </button>
          <button 
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is_active" : ""}
          >
          <FaListUl />
          </button>
          <button 
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is_active" : ""}
          >
          <FaListOl />
          </button>
          <button 
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is_active" : ""}
          >
          <FaQuoteLeft />
          </button>
          {/* Highlighter not working */}
          {/* <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={editor.isActive("highlight") ? "is_active" : ""}
          >
          <FaHighlighter />
          </button> */}
      </div>

      <div>
          <button onClick={() => editor.chain().focus().undo().run()}>
          <FaUndo />
          </button>
          <button onClick={() => editor.chain().focus().redo().run()}>
          <FaRedo />
          </button>
      </div>
      </div>
    </>
  );
};

const TextEditor = ({setEditorContent, mode} ) => {

  const [text, setText] = useState(""); // State to store the text content

  const handleOnClick = () => {
    console.log("Submit was clicked.");
  }

  const handleRemoveSpaces = () => {
    const trimmedText = text.replace(/\s+/g, " "); // Remove extra spaces
    editor.commands.setContent(trimmedText); // Update the editor conte
    setEditorContent(trimmedText); // Update the editor content (optional)
    // setText(trimmedText); // Update the text content
  };

  const handleCopy = () => {  //copies text written in the textArea
    //these 3 lines below ka kaam is done by the last line by the navigator object
    // var text=document.getElementById("text-box");   //id of text area was set to be text-box
    // text.select();
    // document.getSelection().removeAllRanges();  //deselect selected text
    navigator.clipboard.writeText(editor.getText());
  };

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: text, // Use the text content as the initial editor content
    autofocus: true,
    onUpdate({ editor }) {
      const htmlContent = editor.getHTML();
      setEditorContent(htmlContent); // Update the editor content
      setText(htmlContent); // Update the text content
    },
  });

  // const handleOnChange = (event) => {
  //   console.log("OnChange.");
  //   props.setText(event.target.value);    //jo bhi change ho rha hai text area mei, that is handled by this function and this line helps update
  //                                   //ki whatever the user is making change should be updated, in this case, text is set to what is was 
  //                                   //before + what is being done. If this line is not entered, then we will not be able to add stuff.
  // }

  return (
    <>
      <div className="textEditor">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>

      <div className="buttons">
        <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleOnClick}>Submit</button>
        <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleRemoveSpaces}>Trim Spaces</button>
        <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleCopy}>Copy Text</button>
      </div>

      <div className={`container my-3 text-${mode==='light'?'dark':'light'}`}>
        {/* {console.log(mode)} */}
        <h3>Your text summary</h3>
        {/* text.split gives array. filter takes an element and applies the condition. Here, that ele will be in array only if its length!=0 */}
        {/* eslint-disable-next-line */} {/* This line only to remove Unnecessary escape character: \s warning */}
        <p>{text.split("/\s+/").filter((element)=> {return element.length!==0}).length} words and {text.length} characters</p>  {/*text.split will return an array*/}
        
        {/*For a slow reader, 125 words are read in 1 minute. So 1 word is read in 1/125 min = 0.008 min*/}
        {/* eslint-disable-next-line */}
        <p>Your entry can be read in {Math.round(((0.008 * text.split("/\s+/").filter((element)=> {return element.length!==0}).length) + Number.EPSILON) * 100) / 100} minutes</p>

        <h3>Preview</h3>
        <p>{text.length>0?text:"Nothing to preview"}</p>
        </div>
    </>
  );
};

export default TextEditor;