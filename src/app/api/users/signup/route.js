import {connectDB} from '../../../../db/index.js';
import {NextRequest, NextResponse} from 'next/server';
import {User} from '../../../../models/user.model.js';



connectDB();


export async function POST(request) {
    try {
        const reqBody = await request.json();
        const {name, email, password} = reqBody;
        if(!name || !email || !password) {
            return NextResponse.json({error:"All fields are required"},{status:400});
        }

        const user = await User.findOne({email});
        if(user) {
            return NextResponse.json({error:"user already exist"},{status:400});
        }
         
        const registerUser = await User.create({name, email, password});
        return NextResponse.json({user:registerUser, success:true, message:"User registered"});

    } catch (error) {
        return NextResponse.json({error:error.message, status:500});
    }
  
}
