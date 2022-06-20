import { useEffect } from 'react';

function Change() {
    function ChangeTheme(nav, body, footer, search, more, listsong, secondary) {
        document.documentElement.style.setProperty('--default-bgcolor-nav', nav);
        document.documentElement.style.setProperty('--default-bgcolor-body', body);
        document.documentElement.style.setProperty('--default-bgcolor-footer', footer);
        document.documentElement.style.setProperty('--bgcolor-show-listsong', listsong);
        document.documentElement.style.setProperty('--bgcolor-search', search);
        document.documentElement.style.setProperty('--bgcolor-more', more);
        document.documentElement.style.setProperty('--color-default-secondary', secondary);
    }
    useEffect(() => {
        switch (JSON.parse(localStorage.getItem('theme'))) {
            case 'dark':
                ChangeTheme('#292929', '#1e1e1e', '#1e1e1e', '#2D2F32', '#282828', '#404040', '#7200a1');
                break;
            case 'purple':
                ChangeTheme('#231b2e', '#170f23', '#120c1c', '#432275', '#2f2739', '#120822', '#7200a1');
                break;
            case 'blue':
                ChangeTheme('#1C2A49', '#101F3F', '#0D1932', '#192F60', '#283653', '#223C75', '#3460F5');
                break;
            case 'blue-light':
                ChangeTheme('#294162', '#1D375A', '#172C48', '#274A78', '#344B6B', '#0B274C', '#3460F5');
                break;
            case 'green':
                ChangeTheme('#1E4E3E', '#124534', '#0E372A', '#126E54', '#2A5849', '#0C523A', '#309785');
                break;
            case 'brown':
                ChangeTheme('#604A45', '#57403B', '#46332F', '#6F514C', '#68534F', '#63423C', '#986D5C');
                break;
            case 'pink':
                ChangeTheme('#860D6C', '#800064', '#660050', '#A22687', '#8D1A74', '#800064', '#D820B0');
                break;
            case 'red':
                ChangeTheme('#7A2323', '#711717', '#5C1212', '#883236', '#812F2F', '#561111', '#AA1C1C');
                break;
            default:
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.parse(localStorage.getItem('theme'))]);
}

export default Change;
