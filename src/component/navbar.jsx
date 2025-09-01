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
    const [all_btn, set_all_btn] = useState(true);
    const [like_btn, set_like_btn] = useState(false);
    const [list_btn, set_list_btn] = useState(false);
    const { profile_image, login, set_profile_image, set_login, set_form_popup, form_popup } = useContext(Track_context);
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
    const logout_func = async () => {
        const is_logout = await logout();
        if (is_logout) {
            set_profile_image(null);
            set_login(false);
        }
    }
    useEffect(() => {
        if (login) {
            set_form_popup(false);
        }
    }, [login])
    return (
        <div className="relative h-full pt-1">
            <div className="flex justify-center md:justify-between px-4 h-1/2">
                <div className="hidden md:flex items-center gap-2 w-fit h-full">
                    <img onClick={() => navigator('/')} className="size-8/10 bg-white self-center cursor-pointer rounded-full" src={assets.spotify_logo} />
                    <img onClick={() => navigator(-1)} className="size-7/10 p-[0.2rem] bg-black rounded-full cursor-pointer " src={assets.arrow_left} />
                    <img onClick={() => navigator(1)} className="size-7/10 p-[0.2rem]  bg-black rounded-full cursor-pointer" src={assets.arrow_right} />
                </div>
                <div className="h-full w-[100%] md:w-[50%] flex gap-1 justify-between md:justify-end">
                    <div className="flex h-full items-center w-[70%] md:w-[60%]">
                        <Search_field />
                    </div>
                    <div className="h-full w-fit flex items-center">
                        {!profile_image ?
                            <img onClick={() => set_form_popup(prev => !prev)} className="max-h-full ml-1 size-8/10 cursor-pointer rounded-full object-cover" src={assets.user_profile} />
                            : <img onClick={() => set_form_popup(prev => !prev)} className="max-h-full ml-1 size-8/10 cursor-pointer rounded-full object-cover" src={profile_image} />
                        }
                        {login ?
                            <img onClick={logout_func} className="ml-1 size-9/10 cursor-pointer" src={assets.logout} />
                            : <></>
                        }
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 px-4 h-1/2">
                {
                    all_btn ?
                        <p onClick={on_all} className="h-8/10 text-sm px-1 bg-white rounded-full flex justify center items-center cursor-pointer">ทั้งหมด</p>
                        : <p onClick={on_all} className="h-8/10 text-sm px-1 bg-black text-white rounded-full flex justify center items-center cursor-pointer">ทั้งหมด</p>
                }
                {
                    like_btn ?
                        <p onClick={on_like} className="h-8/10 text-sm px-1 bg-white rounded-full flex justify center items-center cursor-pointer">เพลงโปรด</p>
                        : <p onClick={on_like} className="h-8/10 text-sm px-1 text-white bg-black rounded-full flex justify center items-center cursor-pointer">เพลงโปรด</p>
                }
                {
                    list_btn ?
                        <p onClick={on_list} className="h-8/10 text-sm px-1 bg-white rounded-full flex justify center items-center cursor-pointer">เพลย์ลิสต์</p>
                        : <p onClick={on_list} className="h-8/10 text-sm px-1 text-white bg-black rounded-full flex justify center items-center cursor-pointer">เพลย์ลิสต์</p>
                }
            </div>
            {form_popup && !login ?
                <div className="absolute w-[80%] left-[10%] md:w-[50%] md:left-[25%]  lg:w-[30%] lg:left-[35%] top-20 z-2">
                    <Signing />
                </div>
                : <></>
            }
        </div>
    )
}

export default Nav;
