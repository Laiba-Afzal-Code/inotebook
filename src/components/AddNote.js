import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNotes } = context;
  const [note, setNotes] = useState({ title: "", description: "", tag: "" });
  const handleOnclick = (e) => {
    e.preventDefault();
    addNotes(note.title, note.description, note.tag);
    setNotes({ title: "", description: "", tag: "" });
  };
  const onChange = (e) => {
   setNotes({...note, [e.target.name]: e.target.value })
  };
  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-bold">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onChange}
            aria-describedby="emailHelp"
            value={note.title}
          />
        
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-bold">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label fw-bold">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}
          />
        </div>
       
        <button
          type="submit"
          className="btn btn-dark px-3"
          onClick={handleOnclick}
          disabled={note.title.length<5 || note.description.length<5}
        >
        Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
