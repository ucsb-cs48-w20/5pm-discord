import React from 'react'
import '../../styles/tailwind.css';

type Props = {
    /** standard children prop: accepts any valid React Node */
    children: React.ReactNode;
    /** callback function passed to the onClick handler*/
    onClick: ()  => void;
}

export const Button: React.FC<Props> = ({ children, onClick }) => {
    return <button className="outline-none bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" onClick={onClick}>{children}</button>
}
