import { useState } from "react";
import { assets } from "../../script_asset/assets";
import { email_login_api } from "../../script_asset/authenticate_api";
import { Track_context } from "../context/track_context";
import { useContext } from "react";
const url = import.meta.env.VITE_GOOGLEENPOINT;

const Login = ({ set_state }) => {
    const [email, set_email] = useState('');
    const [password, set_password] = useState('');
    const [error, set_error] = useState(null);
    const [onLoading, set_onLoading] = useState(false);
    const { set_profile_image, set_login } = useContext(Track_context);

    const onSubmit_func = async (e) => {
        e.preventDefault();
        set_onLoading(true);
        await email_login_api(email, password, set_error, set_profile_image, set_login);
        set_onLoading(false);
    }
    const onGoogle_login = () => {
        window.location.href = url;
    }
    return (
        <div className="h-fit p-4 w-full flex flex-col relative">
            <div className="flex flex-col gap-4">
                <div className="flex gap-2 justify-center items-center">
                    <img className="h-6 bg-white rounded-full" src={assets.spotify_logo} />
                    <p className="text-white text-xl">streming</p>
                </div>
                <div onClick={onGoogle_login} className="h-8 flex justify-center items-center bg-neutral-600 cursor-pointer hover:bg-neutral-700">
                    <img className="h-7" src={assets.google} />
                </div>
            </div>
            <form onSubmit={(e) => onSubmit_func(e)} className="mt-4 flex flex-col gap-4">
                <input onChange={(e) => set_email(e.target.value)} className="border-2 border-neutral-200 text-sm text-white px-4 py-1 focus:outline-none" type="text" name="user_name" id="user_name" placeholder="ยูสเซอร์เนม" />
                <input onChange={(e) => set_password(e.target.value)} className="border-2 border-neutral-200 text-sm text-white px-4 py-1 focus:outline-none" type="password" name="password" id="user_name" placeholder="รหัสผ่าน" />
                <button className=" py-1 bg-neutral-600 text-sm text-white hover:bg-neutral-800" type="submit">เข้าสู่ระบบ</button>
            </form>
            <p onClick={() => set_state(false)} className="mt-2 text-sm text-white">หากคุณยังไม่มีบัญชี <span className="underline decoration-white cursor-pointer">ลงทะเบียน</span></p>
            {error ? <p className="mt-6 text-red-500">{error}</p> : <></>}
            {onLoading
                ? <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-2">
                    <div className="w-14 h-14 border-4 border-white border-l-neutral-700 rounded-full animate-spin z-3"></div>
                    <div className="absolute w-[100%] h-[100%] bg-neutral-700 opacity-60"></div>
                </div>
                : <></>
            }
        </div>
    )
}

export default Login;