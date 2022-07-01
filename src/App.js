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
import Change from './component/FCChangeTheme';
import ModalMV from './layouts/ModalMV/modalMV';

function App() {
    const context = useContext(Context);
    const data = context.songList[0].length;

    useEffect(() => {
        alert('Nguyên nhân do server nên hiện tại chỉ load được những bài hát Việt Nam');
    }, []);

    Change();

    return (
        <div className="App">
            <Nav />
            <Header />
            <Main />
            {data > 0 ? <Footer /> : null}
            <NavMobile />

            {context.showModalTheme ? <ModalTheme /> : null}
            <ModalMV />
        </div>
    );
}

export default App;
