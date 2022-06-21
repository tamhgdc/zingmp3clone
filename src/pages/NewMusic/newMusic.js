import React, { useContext } from 'react';

import Context from '~/context/context';
import { GetNewMusic } from '~/services';
import './newMusic.css';
import FCSaveLocalList from '~/component/FCSaveLocalList';
import FCSaveLocalIndex from '~/component/FCSaveLocalIndex';
import Render from './component/render';

function NewMusic() {
    const context = useContext(Context);
    let data = GetNewMusic();

    const handlePlayAll = () => {
        context.setCheckPlaySong(true);
        context.addSongList(data.items);
        context.playSong();
        context.currentSong(0);

        FCSaveLocalList(data.items);
        FCSaveLocalIndex(0);
    };

    return (
        <div className="new-music">
            {data.length !== 0 && (
                <>
                    <div className="new-music-bg"></div>
                    <div className="bg-alpha"></div>
                    <div className="bg-alpha-1"></div>
                </>
            )}
            <div className="new-music__header">
                <h2 className="new-music__title">Mới Phát Hành</h2>
                <i onClick={handlePlayAll} className="icon new-music__header-icon ic-play"></i>
            </div>

            <Render data={data} context={context} />
        </div>
    );
}

export default NewMusic;
