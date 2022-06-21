import tabMV from '~/component/DataTitleMV';

function Tab({ activeTab, tabItem, lineTab, setActiveTab, setCode, setIndexPage, navigation }) {
    const handleClickTab = (index, code, link) => {
        setActiveTab(index);
        setCode(code);
        setIndexPage(1);
        navigation(`/mv/${link}/${code}`);
    };

    return (
        <div className="MV-tab">
            {tabMV.map((item, index) => {
                return (
                    <div
                        key={index}
                        ref={activeTab === index ? tabItem : null}
                        onClick={() => handleClickTab(index, item.code, item.link)}
                        className={
                            window.location.pathname.split('/')[3] === item.code ? 'tab-MV-item active' : 'tab-MV-item'
                        }
                    >
                        {item.title}
                    </div>
                );
            })}
            <div ref={lineTab} className="line-tab"></div>
        </div>
    );
}

export default Tab;
