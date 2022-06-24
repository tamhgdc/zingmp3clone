import { useContext, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '~/context/context';
import Album from './component/album';

import './myMusic.scss';

function MyMusic() {
    const context = useContext(Context);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        context.setInputSearch('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="myMusic">
            {context.indexLike !== undefined && context.indexLike.length !== 0 ? (
                <h2 className="pageTitle">Album đã thích</h2>
            ) : (
                <h2 className="pageTitle">Chưa có mục ưa thích nào</h2>
            )}

            <Album context={context} navigate={navigate} />
        </div>
    );
}

export default MyMusic;
