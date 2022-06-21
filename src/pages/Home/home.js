import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import renderSinger from '~/component/FCRenderSinger';
import routes from '~/config/routes';
import Context from '~/context/context';
import { GetHomePage1, GetHomePage2, GetHomePage3 } from '~/services';
import Banner from './Banner/banner';
import DataPageOne from './component/data1';
import DataPageTwo from './component/data2';
import DataPageThree from './component/data3';
import Loading from './component/loading';

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

    document.title = 'Zing MP3 | Nghe tải nhạc chất lượng cao trên desktop, mobile và TV';

    const handleLike = (encodeId, thumbnail, title, sortDescription, index) => {
        context.setIndexLike((prev) => {
            let newLike;
            for (let i = 0; i < prev.length; i++) {
                if (prev[i].encodeId === encodeId) {
                    newLike = prev.filter((item) => item.encodeId !== encodeId);
                    return newLike;
                }
            }
            newLike = [
                ...prev,
                {
                    encodeId,
                    thumbnail,
                    title,
                    sortDescription,
                    index,
                },
            ];
            const JsonLike = JSON.stringify(newLike);
            localStorage.setItem('like', JsonLike);

            return newLike;
        });
    };

    const render = () => {
        return (
            <>
                <DataPageOne
                    dataPage1Items={dataPage1Items}
                    navigate={navigate}
                    context={context}
                    handleLike={handleLike}
                />
                <DataPageTwo
                    dataPage2Items={dataPage2Items}
                    navigate={navigate}
                    context={context}
                    handleLike={handleLike}
                />
                <DataPageThree
                    dataPage3Items={dataPage3Items}
                    navigate={navigate}
                    context={context}
                    handleLike={handleLike}
                />
            </>
        );
    };

    return (
        <>
            <div className="grid wide">
                <Banner />
                {/* {loading()} */}
                {dataPage1Items.length > 0 ? render() : <Loading />}
            </div>
        </>
    );
}
export default Home;
