const getResource = async (url) => {
    const req = await fetch(url);

    if (!req.ok) {
        throw new Error(`Couldn't fetch ${url}, status ${req.status}`);
    }

    return await req.json();
};

const postData = async (url, data) => {
    const req = await fetch(url, {
        method: 'POST',
        body: data
    });

    return await req.text();
};

export {getResource, postData};