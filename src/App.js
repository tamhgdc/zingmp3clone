import Context from './context/context';
import './App.css';
import './icon.css';
import './grid.css';
import './responsive.scss';

import Nav from './layouts/Nav/nav';
import Header from './layouts/Header/header';
import Main from './pages';
import Footer from './layouts/Footer/footer';
import { useContext } from 'react';
import NavMobile from './layouts/NavMobile/navMobile';

function App() {
    const context = useContext(Context);
    const data = context.songList[0].length;
    return (
        <div className="App">
            <Nav />
            <Header />
            <Main />
            {data > 0 ? <Footer /> : null}
            <NavMobile />
        </div>
    );
}

export default App;
