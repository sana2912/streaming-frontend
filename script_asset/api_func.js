import axios from "axios";
const url = import.meta.env.VITE_ENDPOINT;

const track_fetching = async (set_track_data, set_track) => {
    try {
        const response = await axios.get(`${url}/api/track/list`);
        if (response.status === 200) {
            set_track_data(response.data.track_data);
            set_track(response.data.track_data[0]);
        }
        else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error(error);
    }
}
const al_fetching = async (set_album_data) => {
    try {
        const response = await axios.get(`${url}/api/album/list`);
        if (response.status === 200) {
            set_album_data(response.data.album_datas);
        }
        else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error(error);
    }
}

export {
    al_fetching,
    track_fetching,
}