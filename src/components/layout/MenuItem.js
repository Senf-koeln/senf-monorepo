import React from 'react';

export function MenuItem({index, order, isSelectedIcon, isNotSelectedIcon, text, name, handleClick}){
    return (<div className="profile" data-cy={name} onClick={() => handleClick(index)}>
          <img
            src={order === index ? isSelectedIcon : isNotSelectedIcon}
            width="35"
            alt={text}
            style={{ paddingRight: "10px" }}
          />
          {text}
        </div>)
}