export function initializePageState() {
    const hasOpener = window.opener ? true : false;
    const hasQueryString = window.location.search ? true : false;

    return { hasOpener, hasQueryString };
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

        const finalUrl = `${targetURL}?${queryParams.toString()}`;
        window.open(finalUrl, 'baseName', popupOptions);
    }
}