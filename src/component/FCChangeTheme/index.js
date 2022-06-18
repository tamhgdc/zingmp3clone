function ChangeTheme(nav, body, footer, search, more, listsong, secondary) {
    document.documentElement.style.setProperty('--default-bgcolor-nav', nav);
    document.documentElement.style.setProperty('--default-bgcolor-body', body);
    document.documentElement.style.setProperty('--default-bgcolor-footer', footer);
    document.documentElement.style.setProperty('--bgcolor-show-listsong', listsong);
    document.documentElement.style.setProperty('--bgcolor-search', search);
    document.documentElement.style.setProperty('--bgcolor-more', more);
    document.documentElement.style.setProperty('--color-default-secondary', secondary);
}

export default ChangeTheme;
