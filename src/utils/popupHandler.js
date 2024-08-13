import * as config from "../config/config.js";

export function initializePageState() {
    const hasOpener = window.opener ? true : false;
    const hasQueryString = window.location.search ? true : false;

    return { hasOpener, hasQueryString };
}

export function toMainPage() {
    window.location.href = config.URL.INDEX;
}

export function openPopup(targetURL, paramsDTO) {
    const name = targetURL.replace('.html','');
    const popupOptions = 'width=600,height=400';
    
    if (!paramsDTO) {
        window.open(targetURL, name, popupOptions);
    }
    else {
        const queryParams = new URLSearchParams();

        for (const [key, value] of Object.entries(paramsDTO)) {
            if (value !== undefined && value !== null) {
                queryParams.append(key, value);
            }
        }

        const finalUrl = `${targetURL}?${queryParams.toString()}`;
        window.open(finalUrl, name, popupOptions);
    }
}

export function closePopup() {
    window.close();
    window.opener.location.reload();
}