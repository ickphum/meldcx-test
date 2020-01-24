import React from 'react';
export default ({icon, placeholder, onChange, type="text"}) => {
  return <div className="icon-textfield">
    <img alt={icon} src={"./images/" + icon + ".svg"} />
    <input type={type} placeholder={placeholder} onChange={onChange}/>
  </div>
}
