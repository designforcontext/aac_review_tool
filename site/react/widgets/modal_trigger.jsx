import React from 'react';

export default function(props) {
  return (
    <button  
         className="btn btn-info btn-xs hidden-print" 
         onClick={(e) => props.func(props.text, props.title)}>
         {props.children}
    </button>
  )
}
