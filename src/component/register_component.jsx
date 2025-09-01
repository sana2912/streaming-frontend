import { assets } from "../../script_asset/assets";
import { useState } from "react";
import { email_val, password1_val, password2_val, user_name_val } from "../../script_asset/register_validatiob_func";
import { email_register_api } from "../../script_asset/authenticate_api";
import { Track_context } from "../context/track_context";
import { useContext } from "react";
const url = import.meta.env.VITE_GOOGLEENPOINT;

const Register = ({ set_state }) => {
    const { set_profile_image, set_login } = useContext(Track_context);
    const [profile, set_profile] = useState(null);
    const [username, set_username] = useState('');
    const [username_err, set_username_err] = useState(null);
    const [email, set_email] = useState('');
    const [email_err, set_email_err] = useState(null);
    const [password1, set_password1] = useState('');
    const [password1_err, set_password1_err] = useState(null);
    const [password2, set_password2] = useState('');
    const [password2_err, set_password2_err] = useState(null);
    const [error, set_error] = useState(null);
    const [onloading, setOnloading] = useState(false);

    const profile_set = (event) => {
        const val = event.target.files[0];
        set_profile(val);

    }
    const username_set = (event) => {
        const val = event.target.value;
        user_name_val(val, set_username, set_username_err);
    }
    const email_set = (event) => {
        const val = event.target.value;
        email_val(val, set_email, set_email_err);
    }
    const password1_set = (event) => {
        const val = event.target.value;
        password1_val(val, set_password1, set_password1_err);
    }
    const password2_set = (event) => {
        const val = event.target.value;
        password2_val(val, password1, set_password2, set_password2_err);
    }

    const form_subbmit_handle = async (e) => {
        e.preventDefault();
        const accept = (!username_err && !email_err) && (!password1_err && !password1_err);
        if (accept) {
            setOnloading(true);
            const form_data = new FormData();
            form_data.append('profile', profile);
            form_data.append('username', username);
            form_data.append('email', email);
            form_data.append('password1', password1);
            form_data.append('password2', password2);
            await email_register_api(form_data, set_error, set_profile_image, set_login);
            setOnloading(false);
        }
        else {
            set_email('ข้อมูลที่คุณกรอกไม่ถูกต้องกรุณากรอกข้อมูลใหม่');
        }
    }
    const onGoogle_login = () => {
        window.location.href = url;
    }
    return (
        <div className="h-fit p-4 w-full flex flex-col relative">
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 justify-center items-center">
                    <img className="h-6 bg-white rounded-full" src={assets.spotify_logo} />
                    <p className="text-white text-xl">streming</p>
                </div>
                <div onClick={onGoogle_login} className="h-8 flex justify-center items-center bg-neutral-600 cursor-pointer hover:bg-neutral-700">
                    <img className="h-7" src={assets.google} />
                </div>
            </div>
            <div className=" h-7/10">
                <form onSubmit={(e) => { form_subbmit_handle(e) }} className="h-full flex flex-col gap-2">
                    <div className="flex h-14 items-center">
                        {!profile ?
                            <label htmlFor="profile" className="flex items-center"><img className="h-12 cursor-pointer" src={assets.user_profile} /></label>
                            :
                            <label htmlFor="profile"><img className="h-12 w-12 rounded-full cursor-pointer object-cover" src={URL.createObjectURL(profile)} /></label>
                        }
                        <input onChange={(event) => profile_set(event)} className="hidden" type="file" name="profile" id="profile" accept="image/*" />
                    </div>
                    <div className="flex flex-col">
                        <input onChange={(event) => username_set(event)} className="border-2 border-neutral-200 text-white text-sm px-2 py-1 focus:outline-none" type="text" name="user_name" id="user_name" placeholder="ยูสเซอร์เนม" />
                        {username_err ? <span className="text-[10px] text-red-400">{username_err}</span> : <></>}
                    </div>
                    <div className="flex flex-col">
                        <input onChange={(event) => email_set(event)} className="border-2 border-neutral-200 text-white text-sm px-2 py-1 focus:outline-none" type="email" name="email" id="email" placeholder="อีเมล" />
                        {email_err ? <span className="text-[10px] text-red-400">{email_err}</span> : <></>}
                    </div>
                    <div className="flex flex-col">
                        <input onChange={(event) => password1_set(event)} className="border-2 border-neutral-200 text-white text-sm px-2 py-1 focus:outline-none" type="password" name="password1" id="password1" placeholder="รหัสผ่าน" />
                        {password1_err ? <span className="text-[10px] text-red-400">{password1_err}</span> : <></>}
                    </div>
                    <div className="flex flex-col">
                        <input onChange={(event) => password2_set(event)} className="border-2 border-neutral-200 text-white text-sm px-2 py-1 focus:outline-none" type="password" name="password2" id="password2" placeholder="รหัสผ่าน" />
                        {password2_err ? <span className="text-[10px] text-red-400">{password2_err}</span> : <></>}
                    </div>
                    <button className=" text-sm px-2 py-1 bg-neutral-600 text-white hover:bg-neutral-800" type="submit">สร้างบัญชี</button>
                </form>
                <div className=" h-1/10">
                    <p onClick={() => set_state(true)} className="mt-2 text-sm text-white">หากคุณมีบัญชีแล้ว <span className="underline decoration-white cursor-pointer">เข้าสู่ระบบ</span></p>
                    {error ? <p className=" text-red-500 mt-6">{error}</p> : <></>}
                    {onloading
                        ? <div className="absolute w-[100%] h-[100%] top-0 left-0 flex justify-center items-center z-2">
                            <div className="w-14 h-14 border-4 border-white border-l-neutral-700 rounded-full animate-spin z-3"></div>
                            <div className="absolute w-[100%] h-[100%] bg-neutral-700 opacity-60"></div>
                        </div>
                        : <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default Register;