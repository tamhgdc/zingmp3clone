const { default: config } = require('~/config');

const navTop = [
    {
        name: 'Cá Nhân',
        link: config.routes.mymusic,
        icon: 'icon ic-24-LibraryTab',
        index: 1,
    },
    {
        name: 'Khám Phá',
        link: config.routes.home,
        icon: 'icon ic-24-HomeTab',
        index: 2,
    },
    {
        name: '#zingchart',
        link: config.routes.zingchart,
        icon: 'icon ic-24-ChartTab',
        index: 3,
    },
    {
        name: 'Top 100',
        link: '/top100',
        icon: 'icon  ic-24-Top100Tab',
    },
    {
        name: 'Nhạc Mới',
        link: config.routes.newmusic,
        icon: 'icon  ic-24-NewReleaseTab',
    },
];

export default navTop;
