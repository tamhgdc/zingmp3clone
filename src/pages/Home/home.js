/* eslint-disable array-callback-return */
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

    const [dataHome, setDataHome] = useState([]);

    const needData = [
        {
            name: 'Mới phát hành',
        },
        {
            name: 'Lựa chọn hôm nay',
        },
        {
            name: 'Top 100',
        },
        {
            name: "XONE's CORNER",
        },
    ];

    useEffect(() => {
        const dataSet = [];
        dataPage !== undefined &&
            dataPage.map((item) => {
                needData.map((data) => {
                    if (item.title === data.name) {
                        dataSet.push(item);
                    }
                });
            });
        setDataHome(dataSet);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataPage]);

    const render = () => {
        return (
            <>
                <RenderHome dataRender={dataHome} navigate={navigate} context={context} />
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
