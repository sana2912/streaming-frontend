import axios from "axios";
const url = import.meta.env.VITE_ENDPOINT;
console.log(url);

//POST: axios.post(url, data, config)
//GET: axios.get(url, config)


const am_i_login = async (set_profile_image, set_login) => {
    try {
        const response = await axios.get(`${url}/api/is_login`, { withCredentials: true });
        if (response.status === 200) {
            set_profile_image(response.data.profile);
            set_login(true);
        }
        else {
            set_profile_image(null);
            set_login(false);
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.log("we getting some error from server");
    }
}

const email_login_api = async (email, password, set_error, set_profile_image, set_login) => {
    try {
        const response = await axios.post(`${url}/api/user/auth/email_login`, {
            email: email,
            password: password
        }, { withCredentials: true });
        if (response.status === 200) {
            set_profile_image(response.data.profile);
            set_login(true);
            set_error(null);
        }
        else if (response.status === 202) {
            set_error(response.data.message);
        }
        else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.log(error.message);
    }
}

const email_register_api = async (form_data, set_error, set_profile_image, set_login) => {
    try {
        const response = await axios.post(`${url}/api/user/auth/email_register`,
            form_data, { withCredentials: true });
        if (response.status === 200) {
            set_profile_image(response.data.profile);
            set_login(true);
            set_error(null);
        }
        else if (response.status === 202) {
            set_error(response.data.message);
        }
        else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.log(error);
    }
}

const logout = async () => {
    try {
        const response = await axios.get(`${url}/api/user/auth/logout`, { withCredentials: true });
        if (response.status === 200) {
            console.log(response.data.message);
            return true;
        }
        else if (response.status === 202) {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.log(error);
    }
}

export {
    logout,
    email_login_api,
    email_register_api,
    am_i_login,
}