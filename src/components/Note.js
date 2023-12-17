import React, { useContext, useEffect, useRef, useState} from "react";
import NoteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from './AddNote'

const Note = () => {
  const context = useContext(NoteContext);
  const  {notes, getNotes} = context;
  useEffect(()=>{
    getNotes()
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null)
  const [note, setNotes] = useState({ etitle: "", edescription: "", etag: "default" });

  const updateNote = (currentNote)=>{
  ref.current.click()
  setNotes({etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  }
  const handleOnclick = (e) => {
    console.log("update notes", note)
    e.preventDefault();
  };
  const onChange = (e) => {
   setNotes({...note, [e.target.name]: e.target.value })
  };
  return (
    <>
    <AddNote/>
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Eidt notes
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Notes</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            name="etitle"
            onChange={onChange}
            aria-describedby="emailHelp" value={note.etitle}
          />
        
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="edescription"
            name="edescription"
            onChange={onChange} value={note.edescription}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="etag"
            name="etag"
            onChange={onChange} value={note.etag}
          />
        </div>
      </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleOnclick}>Update Notes</button>
      </div>
    </div>
  </div>
</div>
    <div className="row my-4">
      <h1>Your Notes</h1>
      {notes?.map((note)=> {
        return <Noteitem key={note._id} updateNote={updateNote} note={note}/>
      })}
    </div>
    </>
);
};
export default Note;
