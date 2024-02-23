const Main = ({activeNote, onEditNote}) => {

  const onEditField = (type, value) => {
    const updatedNote = {
      ...activeNote,
      [type]: value,
      lastModified: Date.now()
    };

    onEditNote(updatedNote);
  }

  if (!activeNote) return <div className="no-active-note">No note selected</div>

  return (
    <div className="app-main">
        <div className="app-main-note-edit">
            <input 
              type="text" 
              id="title" 
              value={activeNote.title} 
              onChange={(e) => onEditField("title", e.target.value)}
              autoFocus
            />
            <textarea 
              id="body" 
              value={activeNote.body} 
              onChange={(e) => onEditField("body", e.target.value)}
              placeholder="What's on your mind?" 
            />
        </div>
    </div>
  )
}

export default Main