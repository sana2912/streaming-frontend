import { assets } from "../../script_asset/assets"
import { useNavigate } from "react-router-dom";
import Search_field from "./search_field";
import Signing from "./sign";
import { useEffect, useState } from "react";
import { Track_context } from "../context/track_context";
import { useContext } from "react";
import { toast } from "react-toastify";
import { logout } from "../../script_asset/authenticate_api";

const Nav = () => {
    const navigator = useNavigate();// for this function we will give it ars 1, and -1 : -1= previouse page 1=page before -1 page 
    const [form_popup, set_form_popup] = useState(false);
    const [all_btn, set_all_btn] = useState(true);
    const [like_btn, set_like_btn] = useState(false);
    const [list_btn, set_list_btn] = useState(false);
    const { profile_image, login, set_profile_image, set_login } = useContext(Track_context);
    const on_all = () => {
        navigator('/');
        set_all_btn(true);
        set_like_btn(false);
        set_list_btn(false);
    }
    const on_like = () => {
        if (login) {
            navigator('/display/1235/liked');
            set_like_btn(true);
            set_all_btn(false);
            set_list_btn(false);
        }
        else {
            toast.info("กรุณาเข้าสู่ระบบก่อนใช้งานฟังชันนี้ !!");
        }
    };
    const on_list = () => {
        if (login) {
            navigator('/playlist/1235');
            set_list_btn(true);
            set_like_btn(false);
            set_all_btn(false);
        }
        else {
            toast.info("กรุณาเข้าสู่ระบบก่อนใช้งานฟังชันนี้ !!");
        }
    };
    useEffect(() => {
        if (login) {
            set_form_popup(false);
        }
    }, [login])
    return (
        <div className="relative">
            <div className="flex justify-between py-2 px-4">
                <div className="flex justify-between  w-30">
                    <img onClick={() => navigator('/')} className="w-8 h-8 self-center cursor-pointer bg-amber-50 rounded-full" src={assets.spotify_logo} />
                    <img onClick={() => navigator(-1)} className="w-8 h-8 bg-black rounded-full p-2 cursor-pointer " src={assets.arrow_left} />
                    <img onClick={() => navigator(1)} className="w-8 h-8  bg-black rounded-full p-2 cursor-pointer" src={assets.arrow_right} />
                </div>
                <div className="flex gap-4">
                    <Search_field />
                    {!profile_image ?
                        <p onClick={() => set_form_popup(prev => !prev)} className="ml-2 h-8 w-8 bg-sky-400 text-white p-2 rounded-full flex items-center justify-center cursor-pointer">A</p>
                        : <img onClick={() => set_form_popup(prev => !prev)} className="ml-2 h-8 w-8 rounded-full cursor-pointer object-cover" src={profile_image} />
                    }
                    {login ?
                        <img onClick={() => logout(set_profile_image, set_login)} className="ml-2 h-8 w-8 cursor-pointer" src={assets.logout} />
                        : <></>
                    }
                </div>
            </div>
            <div className="flex gap-2 px-4 pb-2">
                {
                    all_btn ?
                        <p onClick={on_all} className="p-2 h-8 bg-white rounded-full text-ml flex justify center items-center cursor-pointer">ทั้งหมด</p>
                        : <p onClick={on_all} className="p-2 h-8 bg-black text-white rounded-full text-ml flex justify center items-center cursor-pointer">ทั้งหมด</p>
                }
                {
                    like_btn ?
                        <p onClick={on_like} className="p-2 h-8 bg-white rounded-full text-ml flex justify center items-center cursor-pointer">เพลงโปรด</p>
                        : <p onClick={on_like} className="p-2 h-8 text-white bg-black rounded-full text-ml flex justify center items-center cursor-pointer">เพลงโปรด</p>
                }
                {
                    list_btn ?
                        <p onClick={on_list} className="p-2 h-8 bg-white rounded-full text-ml flex justify center items-center cursor-pointer">เพลย์ลิสต์</p>
                        : <p onClick={on_list} className="p-2 h-8 text-white bg-black rounded-full text-ml flex justify center items-center cursor-pointer">เพลย์ลิสต์</p>
                }
            </div>
            {form_popup ?
                <div className="absolute left-[37.5%] top-20 h-110 w-[25%] z-1">
                    <Signing />
                </div>
                : <></>
            }
        </div>
    )
}

export default Nav;