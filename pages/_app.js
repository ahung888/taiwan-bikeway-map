import { wrapper } from '../store';
import Layout from '../components/Layout'
import { createApi, ApiContext } from '../store/api'
import '../styles/globals.css'
import '../styles/home.css'
import '../styles/nav.css'
import '../styles/card.css'
import '../styles/intropage.css'

const api = createApi()

function MyApp({ Component, pageProps }) {
  return (
    <ApiContext.Provider value={api}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApiContext.Provider>
  )
}

export default wrapper.withRedux(MyApp);
