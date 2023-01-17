const request = (url: RequestInfo | URL, options: RequestInit | undefined) => {
    const abortController = new AbortController();

    const promise = new Promise((resolve, reject) => {
        fetch(url, {
            ...options,
            credentials: "include",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                Accept: "application/json",
                ...(options?.headers ?? {}),
            },
            signal: abortController.signal,
        })
            .then((response) => {
                if (response.status !== 200) {
                    reject(response.statusText);
                    return;
                }
                try {
                    resolve(response.json());
                } catch (e) {
                    resolve(response.text());
                }
            })
            .catch((e) => {
                console.error("Network error: ", e);
                reject("Network error");
            });
    });

    (promise as any).abort = () => abortController.abort();
    return promise;
};

export const get = (url: RequestInfo | URL) => request(url, {method: "GET"});
export const post = (url: RequestInfo | URL, body: string) =>
    request(url, {
        method: "POST",
        body,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
