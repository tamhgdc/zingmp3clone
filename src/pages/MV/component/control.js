function Control({ indexPage, setIndexPage }) {
    return (
        <div className="MV-control">
            <div
                className="MV-btn"
                onClick={() => {
                    if (indexPage > 1) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setIndexPage(indexPage - 1);
                    }
                }}
            >
                <i className="icon ic-go-left"></i>
            </div>
            <div
                className="MV-btn"
                onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setIndexPage(indexPage + 1);
                }}
            >
                <i className="icon ic-go-right"></i>
            </div>
        </div>
    );
}

export default Control;
