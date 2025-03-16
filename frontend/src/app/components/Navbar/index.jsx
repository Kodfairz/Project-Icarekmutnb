"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false)
    const [user, setUser] = useState()
    const router = useRouter()

    useEffect(() => {
        const checkLogin = () => {
            const token = Cookies.get('token');
            const userData = Cookies.get('user');
    
            if (token && userData) {
                setIsLogin(true);
                setUser(JSON.parse(userData));
            } else {
                setIsLogin(false);
                setUser(null);
            }
        };
    
        checkLogin();
    
        // ฟัง custom event
        window.addEventListener('loginStatusChanged', checkLogin);
    
        return () => {
            window.removeEventListener('loginStatusChanged', checkLogin);
        };
    }, []);

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('user');
        router.push('/')
        toast.success('ออกจากระบบสำเร็จ!');
        window.dispatchEvent(new Event('loginStatusChanged'));
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white py-4 px-12 shadow-md">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <Link href="/" className="text-2xl font-bold">iCare@KMUTNB</Link>
                <button className="block lg:hidden text-2xl" onClick={toggleMenu}>
                    ☰
                </button>
                <nav
                    className={`flex items-center gap-4 ${menuOpen ? "absolute right-0 top-16 bg-blue-600 flex-col items-end w-full p-4" : "hidden"} lg:flex lg:justify-end lg:w-auto lg:static`}
                >
                    <Link href="/" className="text-white hover:text-yellow-400 transition-colors py-2 px-4">
                        หน้าแรก
                    </Link>
                    <Link href="/about" className="text-white hover:text-yellow-400 transition-colors py-2 px-4">
                        เกี่ยวกับเรา
                    </Link>

                    {isLogin ? (
                        <div className="flex items-center gap-4">
                            <Link href="/admin/dashboard" className="text-white hover:text-yellow-400 transition-colors py-2 px-4">
                                แดชบอร์ด
                            </Link>
                            <span className="text-white">{user.username}</span>
                            <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">
                                ออกจากระบบ
                            </button>
                        </div>
                    ) : (
                        <Link href="/admin/login" className="flex items-center">
                           <button className="bg-white text-black font-bold p-2 cursor-pointer rounded-xl hover:bg-blue-500 hover:text-white duration-200">เข้าสู่ระบบ</button>
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
