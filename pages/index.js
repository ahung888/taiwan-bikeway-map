import {useState} from 'react'
import Header from '../components/Header'
import Map from '../components/Map'
import Homepage from '../components/Homepage'
import Nav from '../components/Nav'
import ItemList from '../components/ItemList'
import StationStatusSwitcher from '../components/StationStatusSwitcher'

export default function Home() {
  const [showHomepage, setShowHomepage] = useState(false)
  const [showNav, setShowNav] = useState(false)

  return (
    <>
      {showHomepage
        ? <Homepage onClick={() => setShowHomepage(false)} />
        : (<>
            <Header onMenuClick={() => setShowNav(true)} />
            <Nav show={showNav} onNavClose={() => setShowNav(false)} />
            <ItemList />
            <StationStatusSwitcher />
            <Map />
        </>)
      }
    </>
  )
}
