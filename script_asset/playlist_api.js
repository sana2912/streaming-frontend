import axios from "axios";
const url = import.meta.env.VITE_ENDPOINT;

const get_playlist_data = async (setData) => {
    try {
        const response = await axios.get(`${url}/api/user/playlist/list_item`, { withCredentials: true });
        if (response.status === 200) {
            setData(response.data.list_data);
        }
        else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error(error);
    }
}

const playlist_data_serving = async (data, track_id) => {
    if (data.length > 0) {
        try {
            const response = await axios.post(`${url}/api/user/playlist/update`, {
                list_data: data,
                track_id: track_id
            }, { withCredentials: true });
            if (response.status !== 200) {
                throw new Error(response.data.message);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
}

const playlist_data_fetching = async (track_id, set_list_data) => {
    console.log('getting data');
    try {
        const response = await axios.get(`${url}/api/user/playlist/display`, {
            params: {
                track_id
            }
            , withCredentials: true
        });
        if (response.status === 200) {
            const datas = response.data.playlists;
            set_list_data(datas.map((item) => item));
        }
        else {
            throw new Error(response.data.message);

        }
    }
    catch (error) {
        console.error(error);
    }
}

const list_tracks = async (list_id, setData, set_list_track) => {
    console.log('getting data');
    try {
        const response = await axios.get(`${url}/api/user/playlist/list_tracks`, {
            params: {
                list_id: list_id
            }
            , withCredentials: true
        });
        if (response.status === 200) {
            const list_data = response.data.list_data;
            setData(list_data);
            set_list_track(list_data);
        }
        else {
            throw new Error(response.data.message);
        }
    }
    catch (error) {
        console.error(error);
    }
}

const playlist_remove_api = async (list_id) => {
    console.log('getting data');
    try {
        const response = await axios.post(`${url}/api/user/playlist/remove_list`, {
            list_id: list_id
        }, { withCredentials: true });
        if (response.status !== 200) {
            throw new Error(response.data.message);
        }
    }
    catch (error) {
        console.error(error);
    }
}

export {
    get_playlist_data,
    playlist_data_fetching,
    playlist_data_serving,
    list_tracks,
    playlist_remove_api
}