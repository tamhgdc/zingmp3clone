import Context from './context/context';
import './App.css';
import './icon.css';
import './grid.css';
import './responsive.scss';

import Nav from './layouts/Nav/nav';
import Header from './layouts/Header/header';
import Main from './pages';
import Footer from './layouts/Footer/footer';
import { useContext, useEffect } from 'react';
import NavMobile from './layouts/NavMobile/navMobile';
import ModalTheme from './layouts/ModalTheme/modalTheme';
import ChangeTheme from './component/FCChangeTheme';

function App() {
    const context = useContext(Context);
    const data = context.songList[0].length;

    useEffect(() => {
        switch (JSON.parse(localStorage.getItem('theme'))) {
            case 'dark':
                ChangeTheme('#292929', '#1e1e1e', '#1e1e1e', '#2D2F32', '#282828', '#404040', '#7200a1');
                break;
            case 'purple':
                ChangeTheme('#231b2e', '#170f23', '#120c1c', '#432275', '#2f2739', '#120822', '#7200a1');
                break;
            case 'blue':
                ChangeTheme('#1C2A49', '#101F3F', '#0D1932', '#192F60', '#283653', '#223C75', '#3460F5');
                break;
            case 'blue-light':
                ChangeTheme('#294162', '#1D375A', '#172C48', '#274A78', '#344B6B', '#0B274C', '#3460F5');
                break;
            case 'green':
                ChangeTheme('#1E4E3E', '#124534', '#0E372A', '#126E54', '#2A5849', '#0C523A', '#309785');
                break;
            case 'brown':
                ChangeTheme('#604A45', '#57403B', '#46332F', '#6F514C', '#68534F', '#63423C', '#986D5C');
                break;
            case 'pink':
                ChangeTheme('#860D6C', '#800064', '#660050', '#A22687', '#8D1A74', '#800064', '#D820B0');
                break;
            case 'red':
                ChangeTheme('#7A2323', '#711717', '#5C1212', '#883236', '#812F2F', '#561111', '#AA1C1C');
                break;
            default:
                break;
        }
    }, [JSON.parse(localStorage.getItem('theme'))]);
    return (
        <div className="App">
            <Nav />
            <Header />
            <Main />
            {data > 0 ? <Footer /> : null}
            <NavMobile />

            {context.showModalTheme ? <ModalTheme /> : null}
        </div>
    );
}

export default App;
