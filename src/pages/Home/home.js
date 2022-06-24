import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '~/context/context';
import { GetHomePage1, GetHomePage2, GetHomePage3 } from '~/services';
import Banner from './Banner/banner';
import DataPageOne from './component/data1';
import DataPageTwo from './component/data2';
import DataPageThree from './component/data3';
import Loading from '../../component/LoadingListAlbum/loading';

import './home.css';

function Home() {
    const context = useContext(Context);
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [banner, home, recent, ...dataPage1Items] = GetHomePage1();
    // eslint-disable-next-line no-unused-vars
    const [radio, ...dataPage2Items] = GetHomePage2();
    // eslint-disable-next-line no-unused-vars
    const [chart, week, slide, ...dataPage3Items] = GetHomePage3();

    useLayoutEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        context.setInputSearch('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    document.title = 'Zing MP3 | Nghe tải nhạc chất lượng cao trên desktop, mobile và TV';

    const render = () => {
        return (
            <>
                <DataPageOne dataPage1Items={dataPage1Items} navigate={navigate} context={context} />
                <DataPageTwo dataPage2Items={dataPage2Items} navigate={navigate} context={context} />
                <DataPageThree dataPage3Items={dataPage3Items} navigate={navigate} context={context} />
            </>
        );
    };

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (dataPage1Items.length !== 0) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [dataPage1Items]);

    return (
        <>
            <div className="grid wide">
                <Banner loading={loading} />

                {loading ? render() : <Loading />}
            </div>
        </>
    );
}
export default Home;
