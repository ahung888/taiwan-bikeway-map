import {useState} from 'react';
import {MdOutlineArrowDropDown} from 'react-icons/md'

const DropdownGroup = ({name, showPanel, onClick, children}) => {

  return (
    <div className="dropdown-group">
      <div className="btn btn-bullet" onClick={onClick}>
        {name} <MdOutlineArrowDropDown />
      </div>
      <div className="dropdown-panel">{showPanel ? children : ''}</div>
    </div>
  )
}

export default DropdownGroup