import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  
  const username = cookieStore.get('username')?.value;
  const userRole = cookieStore.get('userRole')?.value;
  const loginTime = cookieStore.get('loginTime')?.value;
  
  if (!username) {
    return Response.json({ 
      loggedIn: false, 
      message: 'No user logged in' 
    });
  }
  
  return Response.json({
    loggedIn: true,
    username: username,
    role: userRole,
    loginTime: loginTime
  });
}