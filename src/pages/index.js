import { Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './Home/home';
import Album from './Album/album';
import ZingChart from './Zingchart/zingchart';
import Search from './Search/search';
import PageNotFound from './PageNotFound/pageNotFound';
import Radio from './Radio/radio';
import Follow from './Follow/follow';
import NewMusic from './NewMusic/newMusic';
import MyMusic from './MyMusic/myMusic';
import Top100 from './Top100/top100';
import SearchAll from './SearchAll/searchAll';
import MV from './MV/mv';
import Hub from './Hub/hub';

import config from '~/config';

function Main() {
    return (
        <div className="main">
            <Routes>
                <Route path={config.routes.home} exact element={<Home />} />
                <Route path={config.routes.album} element={<Album />} />
                <Route path={config.routes.zingchart} element={<ZingChart />} />
                <Route path={config.routes.search} element={<Search />} />
                <Route path={config.routes.pageNotFound} element={<PageNotFound />} />
                <Route path={config.routes.radio} element={<Radio />} />
                <Route path={config.routes.follow} element={<Follow />} />
                <Route path={config.routes.newmusic} element={<NewMusic />} />
                <Route path={config.routes.mymusic} element={<MyMusic />} />
                <Route path={config.routes.top100} element={<Top100 />} />
                <Route path={config.routes.searchAll} element={<SearchAll />} />
                <Route path={config.routes.mv} element={<MV />} />
                <Route path={config.routes.hub} element={<Hub />} />
            </Routes>
        </div>
    );
}
export default Main;
