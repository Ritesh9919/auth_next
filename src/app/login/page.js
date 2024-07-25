"use client"


import axios from "axios";
import {useRouter} from 'next/navigation'
import { useState } from "react";




export default function() {
    const router = useRouter();
    const [user, setUser] = useState({email:"", password:""});
    const [loading, setLoading] = useState(false);
    

    const handleLogin = async(e)=> {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log(response.data);
            // router.push('/profile');
        } catch (error) {
            console.error(error);
        }finally{
            setLoading(false);
        }
    }
    

    return (
        <div className="w-[400px] h-[370px] p-5 rounded-lg bg-gray-400 mx-auto mt-10">
        <h1 className="text-center font-mono text-lg font-bold">{loading?"Proccessing":"Login"}</h1>

         <div className="flex flex-col justify-center gap-10 mt-5">
            <input type="email" placeholder="Enter Your Email" className="py-2 pl-2 rounded-md" value={user.email} onChange={(e)=> setUser({...user,email:e.target.value})}/>
            <input type="password" placeholder="Enter Your Password" className="py-2 pl-2 rounded-md" value={user.password} onChange={(e)=> setUser({...user, password:e.target.value})}/>
            <button type="submit" className="py-2 px-5 bg-green-400 font-bold rounded-md font-serif" onClick={handleLogin}>Login</button>
         </div>
    </div>

    )
}


