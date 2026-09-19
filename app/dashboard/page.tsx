'use client';
import {useEffect,useState} from 'react';
export default function Dashboard(){
 const [servers,setServers]=useState<any[]>([]),[selected,setSelected]=useState(''),[prefix,setPrefix]=useState('.'),[msg,setMsg]=useState('Loading…');
 useEffect(()=>{fetch('/api/servers').then(async r=>{if(r.status===401){location.href='/';return null}return r.json()}).then(x=>{if(x){setServers(x);setMsg(x.length?'':'No servers found where the bot is installed.')}}).catch(()=>setMsg('Could not connect to bot API.'))},[]);
 async function choose(id:string){setSelected(id);if(!id)return;const r=await fetch(`/api/servers/${id}/config`);if(r.ok){const x=await r.json();setPrefix(x.prefix||'.')}}
 async function save(){if(!selected)return;const r=await fetch(`/api/servers/${selected}/config/prefix`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({prefix})});setMsg(r.ok?'Prefix saved ✓':'Failed to save prefix');}
 return <main><nav><strong>Xeno Bot</strong><form action="/api/auth/logout" method="post"><button>Log out</button></form></nav><section className="panel"><h1>Dashboard</h1><p>Manage the Discord servers available to your bot.</p><label>Server</label><select value={selected} onChange={e=>choose(e.target.value)}><option value="">Choose a server</option>{servers.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select>{selected&&<><label>Server prefix</label><input maxLength={3} value={prefix} onChange={e=>setPrefix(e.target.value)}/><button onClick={save}>Save Prefix</button></>}<p>{msg}</p><div className="grid">{['Overview','Messages','Voice','Invites','Economy','Moderation','AutoMod','Welcome','Tickets','Embeds','Custom Commands'].map(x=><div key={x}>{x}<span>Coming next</span></div>)}</div></section></main>
}
