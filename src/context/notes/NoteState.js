
import { json } from 'react-router-dom';
import NoteContext from './NoteContext';
import React, { useState } from "react";

const NoteState = (props)=>{
  const host = "http://localhost:5000"
    const notesInitiail = [];
          const [notes, setNotes] = useState(notesInitiail);
          // get Notes
          const getNotes = async ()=>{
            // Api call
           const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
             'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3NGMyNjczYzU1M2U0ZmU2YjhkZTY0In0sImlhdCI6MTcwMjE1ODI0NX0.TFpHcecUcmHKzpHmgL3iNEyTMROl-e2KpXM1j7efJsY'
            },
           });
           const json = await response.json()
            console.log(json);
            setNotes(json)
          };
          // Add Notes
          const addNotes = async (title, description, tag)=>{
            // Api call
           const response = await fetch(`${host}/api/notes/addnotes`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3NGMyNjczYzU1M2U0ZmU2YjhkZTY0In0sImlhdCI6MTcwMjE1ODI0NX0.TFpHcecUcmHKzpHmgL3iNEyTMROl-e2KpXM1j7efJsY"
            },
            body: JSON.stringify({title, description, tag}),
           });
            console.log("add new notes")
            const note =   {
              "_id": "65750d134acdc13dbfb248f5b4",
              "user": "6574c2673c553e4fe6b8de64",
              "title":title,
              "description": description,
              "tag": tag,
              "date": "2023-12-10T00:57:55.540Z",
              "__v": 0
            };
           setNotes(notes.concat(note))
 
          };
          // Edit Notes
          const editNotes = async(id, title, description, tag)=>{
          // Api call
           const response =await fetch(`${host}/api/notes/updatenotes${id}`,{
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
               "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3NGMyNjczYzU1M2U0ZmU2YjhkZTY0In0sImlhdCI6MTcwMjE1ODI0NX0.TFpHcecUcmHKzpHmgL3iNEyTMROl-e2KpXM1j7efJsY"
             },
             body: JSON.stringify({title, description, tag}),
            });
            const json = response.json();
          
            // logic to Edit Notes in clients site!
            for (let index = 0; index < notes.length; index++) {
              const element = notes[index];
              if(element._id === id){
                element.title = title;
                element.description = description;
                element.tag = tag;
              }
            }
          };

          // Delete Notes
            const deleteNotes = async(id)=>{
               // Api call
           const response = await fetch(`${host}/api/notes/deletenotes/${id}`,{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3NGMyNjczYzU1M2U0ZmU2YjhkZTY0In0sImlhdCI6MTcwMjE1ODI0NX0.TFpHcecUcmHKzpHmgL3iNEyTMROl-e2KpXM1j7efJsY"
            },
           });
           const json = await response.json();
           console.log(json)
            console.log("deleteing the notes" + id);
            const newNotes = notes.filter((note)=>{return note._id!==id});
            setNotes(newNotes);
          };
          return(
            <NoteContext.Provider value={{notes, addNotes, editNotes, deleteNotes, getNotes}}>
            {props.children}
             </NoteContext.Provider>
    )
};
export default NoteState;