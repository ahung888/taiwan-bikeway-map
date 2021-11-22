import React from 'react';
import {useDispatch} from 'react-redux';
import { setSearchType, SEARCH_TYPE } from '../store'
import {FaRoute} from 'react-icons/fa'
import {MdDirectionsBike} from 'react-icons/md'

const Homepage = ({onClick}) => {
  const dispatch = useDispatch()

  const onTypeClick = (type) => {
    dispatch(setSearchType(type))
    onClick()
  }

  return (
    <div className="homepage">
      <div className="wrapper">
        <div className="title">
          自行車道地圖資訊
        </div>
        <div className="nav-btns">
          <div className="btn btn-jumbo" onClick={() => onTypeClick(SEARCH_TYPE.BIKEWAY)}>
            <FaRoute />
            <div className="desc">自行車道</div>
          </div>
          <div className="btn btn-jumbo" onClick={() => onTypeClick(SEARCH_TYPE.STATION)}>
            <MdDirectionsBike />
            <div className="desc">自行車站</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage