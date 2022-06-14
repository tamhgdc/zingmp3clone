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
        name: 'Radio',
        link: config.routes.radio,
        icon: 'icon ic-24-RadioTab',
        index: 4,
    },
    {
        name: 'Theo Dõi',
        link: config.routes.follow,
        icon: 'icon ic-24-FeedTab',
        index: 5,
    },
];

export default navTop;
