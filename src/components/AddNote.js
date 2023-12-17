import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNotes } = context;
  const [note, setNotes] = useState({ title: "", description: "", tag: "default" });
  const handleOnclick = (e) => {
    e.preventDefault();
    addNotes(note.title, note.description, note.tag)
  };
  const onChange = (e) => {
   setNotes({...note, [e.target.name]: e.target.value })
  };
  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="description"
            onChange={onChange}
          />
        </div>
       
        <button
          type="submit"
          className="btn btn-dark"
          onClick={handleOnclick}
        >
        Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
