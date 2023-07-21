import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from '@tiptap/extension-highlight'
import CharacterCount from '@tiptap/extension-character-count'
import parser from "html-react-parser";
import {
  FaBold,   FaHeading,          FaHighlighter,
  FaItalic, FaListOl,
  FaListUl, FaQuoteLeft,
  FaRedo,   FaStrikethrough,    FaUnderline,    FaUndo,
} from "react-icons/fa";
import '../TextEditor.css';
import Popup from './Popup';

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
          
          <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={editor.isActive("highlight") ? "is_active" : ""}
          >
          <FaHighlighter />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()}
            className={editor.isActive('highlight', { color: '#ffc078' }) ? 'is-active' : ''}
          >
            <h6>Orange Highlight</h6>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight({ color: '#8ce99a' }).run()}
            className={editor.isActive('highlight', { color: '#8ce99a' }) ? 'is-active' : ''}
          >
            <h6>Green Highlight</h6>
          </button>
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOnSubmit = (e) => {
    // console.log("Submit was clicked.");
    setIsPopupOpen(!isPopupOpen);
    e.preventDefault();
  };

  const handleRemoveSpaces = () => {
    const trimmedText = text.replace(/\s+/g, " "); // Remove extra spaces
    editor.commands.setContent(trimmedText); // Update the editor conte
    setEditorContent(trimmedText); // Update the editor content (optional)
    setText(trimmedText); // Update the text content
  };

  const handleCopy = () => {  //copies text written in the textArea
    //these 3 lines below ka kaam is done by the last line by the navigator object
    // var text=document.getElementById("text-box");   //id of text area was set to be text-box
    // text.select();
    // document.getSelection().removeAllRanges();  //deselect selected text
    navigator.clipboard.writeText(editor.getText());
  };

  const editor = useEditor({
    extensions: [StarterKit, Underline, Highlight.configure({ multicolor: true }), CharacterCount.configure()],
    content: text, // Use the text content as the initial editor content
    onUpdate({ editor }) {
      const htmlContent = editor.getHTML();
      setEditorContent(htmlContent); // Update the editor content
      setText(htmlContent); // Update the text content
    },
  });

  

  if (!editor) {return null;}

  const editorTextCharCount=editor?editor.storage.characterCount.characters():0;
  const editorTextWordCount=editor?editor.storage.characterCount.words():0;

  const DisplayText = ({ text }) => {
    return <div className='ProseMirror'>{parser(text)}</div>;
  };

  function parsedText(text) {
    if(text.length!==0) return parser(text).props.children;
    else return '';
  }

  return (
    <>
      <div className="container text-dark" >
          <h2> Hello! It's always nice to recap your learnings!</h2>
          <h5> What did you learn today?</h5>
      </div>

      <div className="textEditor">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>

      <div className="buttons">
        <button disabled={editorTextCharCount===0} className="btn btn-primary mx-2 my-2" onClick={handleRemoveSpaces}>Trim Spaces</button>
        <button disabled={editorTextCharCount===0} className="btn btn-primary mx-2 my-2" onClick={handleCopy}>Copy Text</button>
      </div>

      <div className="buttons">
        <button disabled={editorTextCharCount===0} className="btn btn-primary mx-2 my-2" onClick={handleOnSubmit}>Submit</button>
        {editorTextCharCount!==0 && isPopupOpen && <Popup charCount={editorTextCharCount} content={parsedText(text)}/>}
        {/* {parsedText(text)} */}
      </div>

      <div className={`container my-3 text-${mode==='light'?'dark':'light'}`}>
        <h3>Your text summary</h3>
        {/* eslint-disable-next-line */} {/* This line only to remove Unnecessary escape character: \s warning */}
        <p>{editorTextWordCount} words and {editorTextCharCount} characters</p>
        
        {/*For a slow reader, 125 words are read in 1 minute. So 1 word is read in 1/125 min = 0.008 min*/}
        {/* eslint-disable-next-line */}
        <p>Your entry can be read in {Math.round(((0.008 * editorTextWordCount) + Number.EPSILON) * 100) / 100} minutes</p>

        <h3>Preview</h3>
        <DisplayText text={text} />
        {/* <p>{text.length>0?text:"Nothing to preview"}</p> */}
        </div>
    </>
  );
};

export default TextEditor;