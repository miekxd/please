export const runtime = 'edge';

export async function POST(request) {
  const { username, password } = await request.json();
  
  // Simple validation (in real app, this would check against a database)
  const isValid = username === 'admin' && password === 'password123';
  
  return Response.json({ 
    authorized: isValid,
    role: isValid ? 'committee' : 'guest',
    timestamp: new Date().toISOString()
  });
}

