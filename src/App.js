import { useEffect, useState, createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './App.css';
import Main from './Main';
import Sidebar from './Sidebar';

export const ThemeContext = createContext(null);

function App() {

  const [theme, setTheme] = useState("night");
  const [notes, setNotes] = useState(localStorage.notes ? JSON.parse(localStorage.notes) : []);
  const [activeNoteId, setActiveNoteId] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes]);

  const toggleTheme = () =>  {
    setTheme((currTheme) => (currTheme === "day" ? "night" : "day"));
  }

  const addNote = () => {
    const newNote = {
      id: uuidv4(),
      title: "Untitled Note",
      body: "",
      createdAt: Date.now(),
      lastModified: Date.now()
    };
    setActiveNoteId(newNote.id);
    setNotes([newNote,...notes]);
  }

  const deleteNote = (idToDelete) => {
    setNotes(notes.filter(note => note.id !== idToDelete));
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNoteId);
  }

  const onEditNote = (updatedNote) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === activeNoteId) {
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotes);
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <div className="App" id={theme}>
        <Sidebar 
          notes={notes} 
          onAddNote={addNote} 
          onDeleteNote={deleteNote} 
          activeNoteId={activeNoteId}
          setActiveNoteId={setActiveNoteId}
        />
        <Main 
          activeNote={getActiveNote()} 
          onEditNote={onEditNote}
        />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
