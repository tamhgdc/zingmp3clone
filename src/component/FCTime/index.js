function secondsToHms(d) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);

    const hours = h < 10 ? '0' + h : h;
    const min = m < 10 ? '0' + m : m;
    const sec = s < 10 ? '0' + s : s;
    return hours > 0 ? hours + ':' + min + ':' + sec : min + ':' + sec;
}

export default secondsToHms;
