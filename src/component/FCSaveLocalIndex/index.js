function FCSaveLocalIndex(data) {
    const JSONIndex = JSON.stringify(data);
    localStorage.setItem('currentIndex', JSONIndex);
}

export default FCSaveLocalIndex;
