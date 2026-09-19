import {NextResponse} from 'next/server';
import {sign,cookieName} from '@/lib/auth';
export async function GET(req:Request){
 const u=new URL(req.url); const code=u.searchParams.get('code'); const err=u.searchParams.get('error');
 if(err||!code) return NextResponse.redirect(new URL('/?error=discord_auth_cancelled',u));
 const body=new URLSearchParams({client_id:process.env.DISCORD_CLIENT_ID!,client_secret:process.env.DISCORD_CLIENT_SECRET!,grant_type:'authorization_code',code,redirect_uri:process.env.DISCORD_REDIRECT_URI!});
 const token=await fetch('https://discord.com/api/oauth2/token',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body,cache:'no-store'});
 if(!token.ok) return NextResponse.redirect(new URL('/?error=oauth_token_failed',u));
 const td=await token.json();
 const me=await fetch('https://discord.com/api/users/@me',{headers:{Authorization:`Bearer ${td.access_token}`},cache:'no-store'});
 if(!me.ok) return NextResponse.redirect(new URL('/?error=discord_user_failed',u));
 const user=await me.json();
 const res=NextResponse.redirect(new URL('/dashboard',u));
 res.cookies.set(cookieName(),sign({id:user.id,username:user.username,global_name:user.global_name,avatar:user.avatar}),{httpOnly:true,secure:true,sameSite:'lax',path:'/',maxAge:60*60*24*7});
 return res;
}
