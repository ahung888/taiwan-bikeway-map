import React, {useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {
  selectDevice,
  selectSearch,
  setSearchType,
  SEARCH_TYPE,
  SEARCH_INFO,
  emptyBikeway,
  emptyStation
} from '../store'
import CitySelector from './CitySelector'
import {FiMenu} from 'react-icons/fi'
import {BsSearch} from 'react-icons/bs'
import {VscLoading} from 'react-icons/vsc'
import {FaRoute} from 'react-icons/fa'
import {MdDirectionsBike, MdOutlineArrowDropDown} from 'react-icons/md'

const Header = ({onMenuClick}) => {
  const dispatch = useDispatch()
  const [showSearchInput, setShowSearchInput] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const refInput = useRef(null)
  const isMobile = useSelector(selectDevice('isMobile'))
  const searchType = useSelector(selectSearch('type'))

  const onInputChange = event => {
    setSearchText(event.target.value)
  }
  const onInputKeyDown = ({key}) => {
    if (key === "Enter") {
      doSearch(searchText)
    }
  }
  const onButtonClick = () => {
    if (showSearchInput) {
      doSearch(searchText)
    } else {
      setShowSearchInput(true)
      setTimeout(() => refInput.current.focus(), 10)
    }
  }

  const doSearch = (text) => {
    setSearchText('')
    setShowSearchInput(false)
    setShowLoading(true)

    setTimeout(() => {
      setShowLoading(false)
    }, 2000)
  }

  const onSearchTypeSelected = (type) => {
    dispatch(setSearchType(type))
    dispatch(emptyBikeway())
    dispatch(emptyStation())
  }

  const renderedQuickButtons = SEARCH_INFO.map((btn, i) => (
    <div
      key={i}
      className={`btn btn-bullet ${searchType === btn.type ? 'active' : ''}`}
      onClick={() => onSearchTypeSelected(btn.type)}
    >
      {btn.type === SEARCH_TYPE.BIKEWAY ? <FaRoute /> : <MdDirectionsBike />}
      {isMobile ? '' : btn.name}
    </div>
  ))

  const inputClass = `search-input ${showSearchInput ? 'active' : ''}`

  return (
    <div className="header">
      <div className="btn btn-bullet menu" onClick={onMenuClick}><FiMenu /></div>
      <div className="quick-btns">
        {renderedQuickButtons}
        <CitySelector />
      </div>
      {/* <div className="search-panel">
        <input
          type="text"
          className={inputClass}
          value={searchText}
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
          ref={refInput}
        />
        {showLoading ? <div className="icon-loading"><VscLoading className="icon-spin" /></div> : ''}
        <div className="btn btn-bullet" onClick={onButtonClick}><BsSearch /></div>
      </div> */}
    </div>
  )
}

export default Header