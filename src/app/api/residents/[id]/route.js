import { supabase } from '../../../../utils/supabase';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { unit_number, owner_name, email, phone, status } = await request.json();
    
    const { data, error } = await supabase
      .from('units')
      .update({
        unit_number: unit_number,
        owner_name: owner_name,
        email: email,
        phone: phone,
        status: status
      })
      .eq('id', id)
      .select();
    
    if (error) {
      throw error;
    }
    
    return Response.json({ 
      success: true, 
      data: data[0],
      message: 'Resident updated successfully' 
    });
    
  } catch (error) {
    console.error('Error updating resident:', error);
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    const { error } = await supabase
      .from('units')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    return Response.json({ 
      success: true, 
      message: 'Resident deleted successfully' 
    });
    
  } catch (error) {
    console.error('Error deleting resident:', error);
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}