export const runtime = 'edge';

export async function POST() {
  const response = new Response(JSON.stringify({ 
    success: true, 
    message: 'Logged out successfully' 
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
  
  // Clear cookies by setting them to expire
  response.headers.set('Set-Cookie', [
    'username=; Path=/; Max-Age=0',
    'userRole=; Path=/; Max-Age=0', 
    'loginTime=; Path=/; Max-Age=0'
  ].join(', '));
  
  return response;
}
