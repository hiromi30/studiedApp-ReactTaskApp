import React, { useState, useEffect } from 'react'
import { NoteObject } from './models/note';

import Header from "./components/Header";
import CreateNote from "./components/CreateNote";
import Notes from './components/Notes'
import { Box } from '@mui/material'


function App() {

  const [notes, setNotes] = useState<NoteObject[]>([]); 

  useEffect(()=> {
    if (sessionStorage.getItem('notes')){
      setNotes(JSON.parse(sessionStorage.getItem('notes') as string))
    }
  }, [])

  const addNotes = (note: NoteObject) => {
    setNotes([ note, ...notes]);
    console.log(sessionStorage)
    sessionStorage.setItem('notes', JSON.stringify({ note, ...notes}));
  }

  const deleteNote = (id: number) => {
    const updateNotes = notes.filter(note => note.id !== id);
    setNotes(updateNotes);
    sessionStorage.setItem('notes', JSON.stringify(updateNotes));
  }

  return (
    <>
      <Header />
      <Box style={{ padding: 20 }}>
      <CreateNote addNotes={addNotes}/>
      <Notes notes={notes} deleteNote={deleteNote}/>
      </Box>
    </>
  );
}

export default App;
