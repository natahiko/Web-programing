import React,{useState} from 'react';

type BookProps = {
    author: string,
    name: string,
    description: string
}
export default function Book({author, name, description}: BookProps) {
    let [isShown, setIsShown] = useState(false);
    return (
        <div className="bookdiv">
            <p><span>Автор:</span> {author}</p>
            <p><span>Назва:</span> {name}</p>
            <a hrefLang="#" onClick={()=>setIsShown(!isShown)}> Детальніше...</a>
            <div>{
                isShown?description:null
            }</div>
        </div>
    );
}
