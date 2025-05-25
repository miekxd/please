import { supabase } from '../../../utils/supabase';

export async function POST(request) {
  try {
    const { unit_number, owner_name, email, phone, status } = await request.json();
    
    const { data, error } = await supabase
      .from('units')
      .insert([
        {
          unit_number: unit_number,
          owner_name: owner_name,
          email: email,
          phone: phone,
          status: status || 'Occupied'
        }
      ])
      .select();
    
    if (error) {
      throw error;
    }
    
    return Response.json({ 
      success: true, 
      data: data[0],
      message: 'Resident added successfully' 
    });
    
  } catch (error) {
    console.error('Error adding resident:', error);
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('units')
      .select('*')
      .order('unit_number');
    
    if (error) {
      throw error;
    }
    
    return Response.json({ 
      success: true, 
      data: data 
    });
    
  } catch (error) {
    console.error('Error fetching residents:', error);
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}