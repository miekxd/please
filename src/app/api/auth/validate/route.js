import { supabase } from '../../../utils/supabase';

export const runtime = 'edge';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    
    // Query database for user credentials
    const { data: user, error } = await supabase
      .from('users')
      .select('username, password, role')
      .eq('username', username)
      .single();
    
    if (error || !user) {
      // User not found in database
      return Response.json({ 
        authorized: false,
        role: 'guest',
        timestamp: new Date().toISOString(),
        message: 'User not found'
      });
    }
    
    // Check if password matches (in real app, you'd use hashed passwords)
    const isValid = user.password === password;
    
    if (isValid) {
      return Response.json({ 
        authorized: true,
        role: user.role,
        timestamp: new Date().toISOString(),
        username: user.username
      });
    } else {
      return Response.json({ 
        authorized: false,
        role: 'guest',
        timestamp: new Date().toISOString(),
        message: 'Invalid password'
      });
    }
    
  } catch (error) {
    console.error('Validation error:', error);
    return Response.json({ 
      authorized: false,
      role: 'guest',
      timestamp: new Date().toISOString(),
      message: 'Server error'
    }, { status: 500 });
  }
}