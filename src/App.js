/* eslint-disable import/first */
/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import {Route, Link, Switch} from 'react-router-dom';
import Store from './Store';;
import SidebarMain from './Sidebar/SidebarMain';
import SidebarFolder from './Sidebar/SidebarFolder';
import SidebarNote from './Sidebar/SidebarNote';
import MyContext from './Context/MyContext';
import NoteListMain from './Note/NoteListMain';
import NoteFolder from './Note/NoteFolder';
import NoteNote from './Note/NoteNote';
import config from './config';
import AddFolder from './AddItem/AddFolder';
import AddNote from './AddItem/AddNote';

class App extends React.Component{
  static contextType=MyContext;
state ={
  folders : [],
  notes : []
}

FolderData(){
  fetch(`${config.FOLDER_ENDPOINT}`,{
    method: 'GET',
    headers: {
      'content-type': 'application/json'
     }
  })
  .then(res=>{
    if(!res.ok){
      res.json().then(error=>{
        throw error
      })
    }
    return res.json()
  })
  .then(data=>{
    this.setState({
      folders: data
    })
  })
    .catch(e =>{
    console.log(e)
 
  })
}

NoteData(){
  fetch(`${config.NOTE_ENDPOINT}`,{
    method: 'GET',
    headers: {
      'content-type': 'application/json'
     }
    })
  .then(res=>{
    if(!res.ok){
      return res.json().then(error=>
        {throw error})
    }
  return res.json();
  })
  .then(data=>{
    this.setState({
      notes: data
    })
  })
  .catch(e=>{
    console.log(e);
  })
}

handleDeleteItem= noteId =>{
  this.setState({
    notes :this.state.notes.filter(note=> note.id !== noteId)
  })
}

handleAddFolder = folder =>{
  //console.log('in handleadd folder')
  console.log(folder)
  this.setState({
    folders : [...this.state.folders, folder],
  })
}

handleAddNote = note => {
  console.log(note);
  this.setState({
    notes : [...this.state.notes, note],
  })
}

  componentDidMount(){
   //setTimeout(()=>this.setState(Store), 100);
   this.FolderData();
   this.NoteData();
 }

  render(){
    const value={
      folders : this.state.folders,
      notes: this.state.notes,
      deleteItem : this.handleDeleteItem,
      addFolder : this.handleAddFolder,
      addNote : this.handleAddNote,
    }

    return(
      <div className="app">
        <MyContext.Provider value={value}>
        <header className="app-header">
         <h1><Link to="/">Noteful</Link></h1>
        </header>
        <nav className="app-nav">
          <Route exact path='/' component={SidebarMain} />
          <Route path='/folders/:folderId' component={SidebarFolder} />
          <Route path='/notes/:noteId' component={SidebarNote} />
          
        </nav>
        <main className="app-main"> 
        <Switch>
          <Route exact path='/' component={NoteListMain} />
          <Route path="/folders/:folderId" component={NoteFolder} />
          <Route path='/notes/:noteId' component={NoteNote} />
          <Route path='/add-note' component={AddNote} />
          <Route path='/add-folder' component={AddFolder} />
        </Switch>
        </main>
        <footer className="app-footer">
            <h3>present by Moon</h3>
        </footer>
        </MyContext.Provider>
      </div>
    )
  }
}
export default App;
