import React from 'react';

export default function(props) {
  return (
    <button  
         className="btn btn-info btn-xs" 
         onClick={(e) => props.func(props.text)}>
         {props.children}
    </button>
  )
}
