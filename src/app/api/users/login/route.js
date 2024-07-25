import {connectDB} from '@/db/index.js';
import {User} from '@/models/user.model.js'
import {NextRequest, NextResponse} from 'next/server';


connectDB();



export async function POST(request) {
    try {
        const reqBody = await request.json();
        console.log(reqBody);
        const {email, password} = reqBody;
        if(!email || !password) {
            return NextResponse.json({error:"Both fields are required"},{status:400});
        }
    
        const user = await User.findOne({email});
        if(!user) {
            return NextResponse.json({error:"User does not exist"},{status:404});
        }
    
        const isPasswordCurrect = await user.comparePassword(password);
        console.log(isPasswordCurrect);
        if(!isPasswordCurrect) {
            return NextResponse.json({error:"Password is incurrect"},{status:401});
        }
        const token = await user.token();
        const loginUser = await User.findById(user._id).select('-password');
        const response =  NextResponse.json({message:"Login successfull", success:true,loginUser,token});
        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        return response;
      } catch (error) {
        return NextResponse.json({error:error.message, status:500});
      }
}