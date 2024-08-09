export function parseURLParams(urlInfos) {
    const params = new URLSearchParams(urlInfos);
    const result = {};

    params.forEach((value, key) => {
        result[key] = value;
    });

    return result;
}

export function openPopupWindow(targetURL, queryStringDTO) {
    const baseName = 'popup';
    const popupOptions = 'width=600,height=400';

    if (!queryStringDTO) {
        window.open(targetURL, baseName, popupOptions);
    }
    else {
        const queryParams = new URLSearchParams();

        for (const [key, value] of Object.entries(queryStringDTO)) {
            console.log(key, value);
            if (value !== undefined && value !== null) {
                queryParams.append(key, value);
            }
        }

        // 최종 URL 생성
        const finalUrl = `${targetURL}?${queryParams.toString()}`;
        window.open(finalUrl, 'baseName', popupOptions);
    }
}