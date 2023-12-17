import React, {useContext} from 'react';
import noteContext from '../context/notes/NoteContext'

const About = () => {
  const a = useContext(noteContext);
  return (
    <div>
      This is About page/ {a.name} she is in class{a.class}
    </div>
  );
}

export default About
