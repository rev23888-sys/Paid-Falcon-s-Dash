import {NextResponse} from 'next/server';
import {oauthRedirect} from '@/lib/auth';
export async function GET(){return NextResponse.redirect(oauthRedirect());}
