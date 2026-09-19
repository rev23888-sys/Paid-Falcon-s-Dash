import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE='xeno_dashboard_session';
function secret(){ return process.env.DASHBOARD_SESSION_SECRET || process.env.DASHBOARD_SHARED_SECRET || ''; }
export type Session={id:string,username:string,global_name?:string|null,avatar?:string|null};
export function sign(s:Session){
 const body=Buffer.from(JSON.stringify(s)).toString('base64url');
 const sig=crypto.createHmac('sha256',secret()).update(body).digest('base64url');
 return `${body}.${sig}`;
}
export function verify(value:string|undefined):Session|null{
 if(!value||!secret()) return null;
 const [body,sig]=value.split('.'); if(!body||!sig) return null;
 const expected=crypto.createHmac('sha256',secret()).update(body).digest('base64url');
 if(!crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(expected))) return null;
 try{return JSON.parse(Buffer.from(body,'base64url').toString()) as Session}catch{return null}
}
export async function getSession(){ return verify((await cookies()).get(COOKIE)?.value); }
export function cookieName(){return COOKIE}
export function oauthRedirect(){
 const client=process.env.DISCORD_CLIENT_ID!;
 const redirect=process.env.DISCORD_REDIRECT_URI!;
 const p=new URLSearchParams({client_id:client,response_type:'code',redirect_uri:redirect,scope:'identify guilds'});
 return `https://discord.com/oauth2/authorize?${p}`;
}
