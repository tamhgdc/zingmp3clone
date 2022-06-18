import { useContext } from 'react';
import { data } from '~/component/DataTheme';
import Context from '~/context/context';
import './modalTheme.scss';

function ModalTheme() {
    const context = useContext(Context);

    const handleChangeTheme = (theme) => {
        const JSONTheme = JSON.stringify(theme);
        localStorage.setItem('theme', JSONTheme);
        context.setShowModalTheme(false);
    };
    return (
        <div className="modal-theme">
            <div className="box">
                <div className="box-header">
                    <span>Giao Diện</span>
                    <div className="box-icon" onClick={() => context.setShowModalTheme(false)}>
                        <i className="icon icon-close ic-close"></i>
                    </div>
                </div>
                <div className="box-container">
                    {data.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className="box-title">{item.title}</div>

                                <div className="row box-content">
                                    {item.items.map((x, i) => {
                                        return (
                                            <div key={i} className="col sm_gutter l_2 m_3 c_4 box-content-item">
                                                <div className="box-color">
                                                    <div className="box-color-img">
                                                        <img src={x.bg} alt="" />

                                                        <div className="box-color-hover">
                                                            <div
                                                                className="btn-color-action"
                                                                onClick={() => handleChangeTheme(x.code)}
                                                            >
                                                                Áp dụng
                                                            </div>
                                                            <div className="btn-color-preview">Xem trước</div>
                                                        </div>
                                                    </div>
                                                    <span className="box-color-title">{x.title}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ModalTheme;
