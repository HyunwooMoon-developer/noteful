import React, { Component } from 'react';
import ErrorBoundary from '../Context/ErrorBoundary';
import MyContext from '../Context/MyContext';
import EachNote from './EachNote';


class NoteNote extends Component {
    static contextType=MyContext;
    render() {
        const {notes} = this.context;
      const Note = notes.find(note=>{
            return note.id === notes.note_id
        }) ||{note_id: ''}
       
        return (
            <div>
                <ErrorBoundary>
                <EachNote
                    key={Note.note_id}
                    id={Note.note_id}
                    name={Note.note_name}
                    modified={Note.modified}
                    folder_id={Note.folder_id}
                    
                />
                <p>{Note.content}</p>
                </ErrorBoundary>
            </div>
        );
    }
}

export default NoteNote;