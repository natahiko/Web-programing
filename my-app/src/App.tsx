import React,{useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import Book from './components/book';
import {number} from "prop-types";

function App() {
    let [books, setBooks] = useState([] as Array<any>);
    useEffect(()=>{
        fetch("http://localhost:7777/getbooks")
            .then((res)=>res.json())
            .then((books)=>setBooks(books));
    },[]);
    return (
        <div className="bookcontainer">
            {books.map(({author, name, description, id})=>(
                <Book name={name} author={author} description={description} key={id}/>
            ))}
        </div>
    );
}


export default App;
