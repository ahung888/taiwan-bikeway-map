import {useSelector, useDispatch} from 'react-redux'
import {selectBikeStation, setShowAvailableRent} from '../store/bikeStationReducer'
import {STATION_STATUS} from '../store'
import styles from '../styles/station-status-switcher.module.css'
import {AiOutlineDownload, AiOutlineUpload} from 'react-icons/ai'

const StationStatusSwitcher = () => {
  const dispatch = useDispatch()
  const stationsCount = useSelector(selectBikeStation('stationsCount'))
  const showAvailableRent = useSelector(selectBikeStation('showAvailableRent'))
  
  const handleClick = () => {
    dispatch(setShowAvailableRent(!showAvailableRent))
  }

  const classname = `station-status-switcher ${stationsCount > 0 ? 'active' : ''}`

  return (
    <div className={classname} onClick={handleClick}>
      <div className={styles.bg}>
        <div className={styles.w}>
          <div className={`${styles.pinBall} ${showAvailableRent ? '' : styles.right}`}>
            {showAvailableRent
              ? <div className={styles.btnSwitch}><AiOutlineUpload/>{STATION_STATUS.AvailableRent}</div>
              : <div className={styles.btnSwitch}><AiOutlineDownload/>{STATION_STATUS.AvailableReturn}</div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default StationStatusSwitcher