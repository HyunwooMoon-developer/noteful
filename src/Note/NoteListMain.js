import React, { Component } from 'react';
import EachNote from './EachNote';
import MyContext from '../Context/MyContext'
import {Link} from 'react-router-dom'


class NoteListMain extends Component {
    static contextType= MyContext;

    render() {
    const {notes} = this.context;
    const noteList = notes.map(note =>{
        return (
            <EachNote 
                key={note.id}
                id={note.id}
                folderId={note.folderId}
                content={note.content}
                name={note.name}
                modified={note.modified}
            />
        )
    });

    return (
            <div>
                {noteList}
                <Link to={'/'}>
                    <button>add note</button>
                </Link>
            </div>
        );
    }
}

export default NoteListMain;