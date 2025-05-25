export async function POST(request) {
  const { username, role } = await request.json();
  
  // Create response
  const response = new Response(JSON.stringify({ 
    success: true, 
    message: 'Login successful' 
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
  
  // Set cookies (basic approach)
  response.headers.set('Set-Cookie', [
    `username=${username}; Path=/; Max-Age=86400; HttpOnly`,
    `userRole=${role}; Path=/; Max-Age=86400; HttpOnly`,
    `loginTime=${new Date().toISOString()}; Path=/; Max-Age=86400; HttpOnly`
  ].join(', '));
  
  return response;
}