import config from '~/config';

function HeaerLeft({ navigate }) {
    return (
        <>
            <div className="logo-m" onClick={() => navigate(config.routes.home)}>
                <img
                    className="logoImg-m"
                    src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg"
                    alt="Zing"
                />
            </div>
            <button onClick={() => navigate(-1)} className="btnHeader prevPage active">
                <i className="icon ic-back"></i>
            </button>
            <button onClick={() => navigate(1)} className="btnHeader nextPage">
                <i className="icon ic-forward"></i>
            </button>
        </>
    );
}

export default HeaerLeft;
