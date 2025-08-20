import axios from "axios";
const url = import.meta.env.VITE_ENDPOINT;

const get_like_data = async (setData, set_like_track) => {
    try {
        const response = await axios.get(`${url}/api/user/like/display`, { withCredentials: true });
        if (response.status === 200) {
            setData(response.data.likes);
            set_like_track(response.data.likes);
        }
        else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error(error);
    }
}
const update_like_state = async (track_id, state) => {
    try {
        const response = await axios.post(`${url}/api/user/like/${state}`, {
            track_id,
        }, { withCredentials: true });
        if (response.status === 500) {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error(error);
    }
}

const get_like_state = async (track_id, set_like_state) => {
    try {
        console.log(`${url}/api/user/like/like_state`);
        const response = await axios.get(`${url}/api/user/like/like_state`, {
            params: {
                track_id
            },
            withCredentials: true
        });
        if (response.status === 200) {
            set_like_state(response.data.state);
        }
        else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error(error);
    }
}
export {
    get_like_data,
    get_like_state,
    update_like_state,
}