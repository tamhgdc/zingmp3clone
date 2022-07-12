import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '~/context/context';
import { GetHomePage } from '~/services';
import Banner from './Banner/banner';
import RenderHome from './component/renderHome';
import Loading from '../../component/LoadingListAlbum/loading';

import './home.css';

function Home() {
    const context = useContext(Context);
    const navigate = useNavigate();

    const [dataPage] = GetHomePage();

    useLayoutEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        context.setInputSearch('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    document.title = 'Zing MP3 | Nghe tải nhạc chất lượng cao trên desktop, mobile và TV';

    const dataBaner = dataPage !== undefined && dataPage[0].items;
    const dataRender = dataPage !== undefined && [dataPage[3], dataPage[4], dataPage[5], dataPage[9], dataPage[12]];

    const render = () => {
        return (
            <>
                <RenderHome dataRender={dataRender} navigate={navigate} context={context} />
            </>
        );
    };

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (dataPage !== undefined) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [dataPage]);

    return (
        <>
            <div className="grid wide">
                <Banner loading={loading} dataBaner={dataPage !== undefined && dataBaner} />

                {loading ? render() : <Loading />}
            </div>
        </>
    );
}
export default Home;
