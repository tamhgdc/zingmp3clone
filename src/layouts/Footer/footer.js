import { useContext, useRef, useState } from 'react';

import Context from '~/context/context';
import './footer.css';
import LeftFooter from './component/left';
import Control from './component/control';
import RightFooter from './component/right';
import Api from './component/api';

function Footer() {
    const context = useContext(Context);

    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(false);

    const audio = useRef();
    const currenttime = useRef();
    const rangeInputSong = useRef();
    const footerImg = useRef();
    const footerInfoTitle = useRef();
    const footerInfoSinger = useRef();
    const totalTime = useRef();
    const btnPrev = useRef();
    const btnNext = useRef();

    Api(context, audio, setValue, rangeInputSong, footerImg, footerInfoTitle, footerInfoSinger, totalTime, setLoading);

    return (
        <footer className="footer">
            <LeftFooter
                context={context}
                footerImg={footerImg}
                footerInfoTitle={footerInfoTitle}
                footerInfoSinger={footerInfoSinger}
            />

            <Control
                context={context}
                audio={audio}
                setValue={setValue}
                value={value}
                currenttime={currenttime}
                rangeInputSong={rangeInputSong}
                btnPrev={btnPrev}
                btnNext={btnNext}
                totalTime={totalTime}
                loading={loading}
            />

            <RightFooter context={context} audio={audio} />
        </footer>
    );
}

export default Footer;
