import React,{useContext}from "react";
import NoteContext from "../context/notes/NoteContext";

const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const {deleteNotes} = context;
  const { note, updateNote } = props;
  return (
      <div className="col-md-4">
        <div className="card my-3 px-2 bg-light">
          <div className="card-body">
            <div className="d-flex flex-wrap align-items-center">
            <h5 className="card-title">{note.title}</h5>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNotes(note._id)}}></i>
          <i className="fa-solid fa-file-pen mx-2" onClick={()=>{updateNote(note)}}></i>
          </div>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {note.tag}
            </h6>
            <p className="card-text">{note.description}</p>
          </div>
        </div>
      </div>
  );
};
export default Noteitem;
