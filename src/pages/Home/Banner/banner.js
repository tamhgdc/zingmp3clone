import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '~/url';

import './banner.css';

function Banner({ loading }) {
    const navigate = useNavigate();

    const [dataPage1, setDataPage1] = useState([]);

    useEffect(() => {
        axios.get(`${URL}home/1`).then(({ data }) => {
            setDataPage1(data.data.items[0].items);
        });
    }, []);

    const [imgLeft, setImgLeft] = useState(1);
    const [imgSelected, setImgSelected] = useState(2);
    const [imgRight, setImgRight] = useState(3);

    const handleNextBanner = () => {
        setImgLeft(imgLeft + 1);
        setImgSelected(imgSelected + 1);
        setImgRight(imgRight + 1);
        if (imgLeft + 1 === dataPage1.length) {
            setImgLeft(0);
        }
        if (imgSelected + 1 === dataPage1.length) {
            setImgSelected(0);
        }
        if (imgRight + 1 === dataPage1.length) {
            setImgRight(0);
        }
    };

    const handlePrevBanner = () => {
        setImgLeft(imgLeft - 1);
        setImgSelected(imgSelected - 1);
        setImgRight(imgRight - 1);
        if (imgLeft - 1 === 0) {
            setImgLeft(dataPage1.length - 1);
        }
        if (imgSelected - 1 === 0) {
            setImgSelected(dataPage1.length - 1);
        }
        if (imgRight - 1 === 0) {
            setImgRight(dataPage1.length - 1);
        }
    };

    useEffect(() => {
        let left, right, selected;
        setInterval(() => {
            setImgLeft((prev) => {
                left = prev + 1;
                if (left >= 6) {
                    return (left = 0);
                } else {
                    return left;
                }
            });
            setImgSelected((prev) => {
                selected = prev + 1;
                if (selected >= 6) {
                    return (selected = 0);
                } else {
                    return selected;
                }
            });
            setImgRight((prev) => {
                right = prev + 1;
                if (right >= 6) {
                    return (right = 0);
                } else {
                    return right;
                }
            });
        }, 15000000);
    }, []);

    const loadding = () => {
        return (
            <div className="row sm_gutter banner">
                <div className="col l_4 m_4 c_6 btnImgBanner imgLeft loading"></div>
                <div className="col l_4 m_4 c_6 btnImgBanner imgSelected loading"></div>
                <div className="col l_4 m_4 c_6 btnImgBanner imgRight loading"></div>
            </div>
        );
    };

    const handleclick = (encodeId, type) => {
        if (type === 4) {
            navigate(`/detail/album/${encodeId}`);
        } else {
            alert('Đây không phải album. Chức năng đang được phát triển');
        }
    };

    const renderBanner = () => {
        return (
            <>
                <div onClick={handlePrevBanner} className="btnBanner prevBtnBanner ">
                    <i className="icon ic-go-left"></i>
                </div>
                <div onClick={handleNextBanner} className="btnBanner nextBtnBanner ">
                    <i className="icon ic-go-right"></i>
                </div>
                {dataPage1.map((item, index) => {
                    return (
                        <div
                            onClick={() => handleclick(item.encodeId, item.type)}
                            key={index}
                            className={
                                index === imgLeft
                                    ? 'col l_4 m_4 c_6 btnImgBanner imgLeft'
                                    : index === imgSelected
                                    ? 'col l_4 m_4 c_6 btnImgBanner imgSelected'
                                    : index === imgRight
                                    ? 'col l_4 m_4 c_6 btnImgBanner imgRight'
                                    : 'col l_4 m_4 c_6 btnImgBanner'
                            }
                        >
                            <img className="imgBanner " src={item.banner} alt="" />
                        </div>
                    );
                })}
            </>
        );
    };

    return <div className="row sm_gutter banner">{loading ? renderBanner() : loadding()}</div>;
}

export default Banner;
