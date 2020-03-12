import React from 'react'
import '../../styles/tailwind.css';

type Props = {
    /** standard children prop: accepts any valid React Node */
    children: React.ReactNode;
    /** callback function passed to the onClick handler*/
    onClick: ()  => void;
}

export const Button: React.FC<Props> = ({ children, onClick }) => {
    return <button className="redbtn text-lg sm:text-2xl sm:h-auto sm:w-auto md:text-xl md:h-auto lg:text-4xl lg:h-auto lg:py-2 lg:px-3 lg:mt-10" onClick={onClick}>{children}</button>
}
