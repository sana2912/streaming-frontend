import axios from "axios";
const url = import.meta.env.VITE_ENDPOINT;

const search_field_api = async (set_field_data, field) => {
    try {
        const response = await axios.get(`${url}/api/user/search/field`, {
            params: {
                field: field
            }
        });
        if (response.status === 200) {
            set_field_data(response.data.datas);
        }
        else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error(error);
    }
}


const search_display_api = async (set_data, field) => {
    try {
        const response = await axios.get(`${url}/api/user/search/display`, {
            params: {
                key: field
            }
        });
        if (response.status === 200) {
            set_data(response.data.datas);
        }
        else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error(error);
    }
}

export {
    search_display_api,
    search_field_api
}