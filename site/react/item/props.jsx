import React from 'react';


function ItemProps(props) {
  return (
    <dl className="dl-horizontal">
      <dt>Example:</dt>
      <dd>{props.example}</dd>
      <dt>Mandatory:</dt>
      <dd>{props.mandatory ? "Yes" : "No"}</dd>
      <dt>Multiples:</dt>
      <dd>{props.multiples ? "Yes" : "No"}</dd>
      <dt>{props.lod_type ? "Associated AAC ID:" : ""}</dt>
      <dd><a href={props.lod_type} target="_blank">{props.lod_type}</a></dd>
    </dl>
  );
}

export default ItemProps;