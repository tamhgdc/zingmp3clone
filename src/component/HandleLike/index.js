function HandleLike(encodeId, thumbnail, title, sortDescription, index, context) {
    context.setIndexLike((prev) => {
        let newLike;
        for (let i = 0; i < prev.length; i++) {
            if (prev[i].encodeId === encodeId) {
                newLike = prev.filter((item) => item.encodeId !== encodeId);
                return newLike;
            }
        }
        newLike = [
            ...prev,
            {
                encodeId,
                thumbnail,
                title,
                sortDescription,
                index,
            },
        ];
        const JsonLike = JSON.stringify(newLike);
        localStorage.setItem('like', JsonLike);

        return newLike;
    });
}

export default HandleLike;
