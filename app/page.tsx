import {getSession} from '@/lib/auth';
import Link from 'next/link';
export default async function Home(){
 const s=await getSession();
 if(s) return <main><div className="card"><h1>Welcome back, {s.global_name||s.username}</h1><p>Your Discord account is authorized for the dashboard.</p><Link className="button" href="/dashboard">Open Dashboard</Link></div></main>;
 return <main><div className="card"><div className="badge">DISCORD BOT DASHBOARD</div><h1>Control your server.<br/><span>Securely.</span></h1><p>Sign in with Discord to access your bot dashboard. Your bot token never leaves the bot host.</p><Link className="button" href="/api/auth/discord">Authorize with Discord</Link><small>Uses Discord OAuth2 • No Discord password is collected</small></div></main>;
}
