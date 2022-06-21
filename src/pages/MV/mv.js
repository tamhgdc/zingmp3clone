import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '~/context/context';
import { URL } from '~/url';
import Content from './component/content';
import Control from './component/control';
import Tab from './component/tab';

import './mv.scss';

function MV() {
    const [activeTab, setActiveTab] = useState(
        window.location.pathname.split('/')[3] === 'IWZ9Z08I'
            ? 0
            : window.location.pathname.split('/')[3] === 'IWZ9Z08O'
            ? 1
            : window.location.pathname.split('/')[3] === 'IWZ9Z08W'
            ? 2
            : 3,
    );

    const navigation = useNavigate();
    const context = useContext(Context);

    const tabItem = useRef();
    const lineTab = useRef();

    useEffect(() => {
        lineTab.current.style.left = tabItem.current.offsetLeft + 'px';
        lineTab.current.style.width = tabItem.current.offsetWidth + 'px';
    }, [tabItem, lineTab, activeTab]);

    const [code, setCode] = useState(window.location.pathname.split('/')[3]);

    const [dataMV, setDataMV] = useState([]);

    const [indexPage, setIndexPage] = useState(1);

    useEffect(() => {
        axios
            .get(`${URL}listMV/${code}/${indexPage}/30`)
            .then(({ data }) => {
                setDataMV(data.data.items);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [code, indexPage]);

    const audio = document.querySelector('audio');

    return (
        <div className="MV">
            <Tab
                activeTab={activeTab}
                tabItem={tabItem}
                lineTab={lineTab}
                setActiveTab={setActiveTab}
                setCode={setCode}
                setIndexPage={setIndexPage}
                navigation={navigation}
            />

            <Content dataMV={dataMV} context={context} audio={audio} />

            <Control indexPage={indexPage} setIndexPage={setIndexPage} />
        </div>
    );
}

export default MV;
