const hostname = window.location.hostname;

export const BASEURL = `http://${hostname}:8000/api/users`;
export const BASEURLDrivers = `http://${hostname}:8000/api/drivers`;


export const postRequest = async (url, body) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body
    })

    console.log(body);


    const data = await response.json();

    if (!response.ok) {
        let message;

        if (data?.message) message = data.message
        else message = data


        return {
            error: true,
            message
        }
    }
    return data

}


export const updateRequest = async (url, body) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body
    })
    console.log(body);
    const data = await response.json();

    if (!response.ok) {
        let message;

        if (data?.message) message = data.message
        else message = data


        return {
            error: true,
            message
        }
    }
    return data

}

export const getRequest = async (url, body) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body
    })

    console.log(body);


    const data = await response.json();

    if (!response.ok) {
        let message;

        if (data?.message) message = data.message
        else message = data


        return {
            error: true,
            message
        }
    }
    return data

}