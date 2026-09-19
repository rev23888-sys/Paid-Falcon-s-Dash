import {NextResponse} from 'next/server';
import {cookieName} from '@/lib/auth';
export async function POST(req:Request){const u=new URL(req.url);const r=NextResponse.redirect(new URL('/',u));r.cookies.set(cookieName(),'',{httpOnly:true,secure:true,sameSite:'lax',path:'/',maxAge:0});return r;}
