import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
export async function GET(){
 if(!await getSession()) return NextResponse.json({error:'Unauthorized'},{status:401});
 const api=process.env.BOT_API_URL, secret=process.env.DASHBOARD_SHARED_SECRET;
 if(!api||!secret) return NextResponse.json({error:'Dashboard is not configured'},{status:500});
 const r=await fetch(api.replace(/\/$/,'')+'/api/servers',{headers:{'x-dashboard-secret':secret},cache:'no-store'});
 return new NextResponse(await r.text(),{status:r.status,headers:{'content-type':'application/json'}});
}
