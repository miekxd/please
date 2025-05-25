export async function POST(req) {
  try {
    // Process the form data from the request body
    const formData = await req.formData();
    const description = formData.get('description');
    const amount = formData.get('amount');
    const date = formData.get('date');
    const fund = formData.get('fund');
    const type = formData.get('type');
    
    // Log the received data (for demonstration purposes)
    console.log('Transaction data received:', {
      description,
      amount,
      date,
      fund,
      type
    });
    
    // In a real application, you would save this data to a database
    // For this demo, we'll just simulate a successful operation
    
    // Redirect after successful creation - Status 303 (See Other)
    return Response.redirect(new URL('/financial?success=true&status=201', req.url), 303);
  } catch (error) {
    // Handle errors
    console.error('Error processing transaction:', error);
    
    // Redirect to the financial page with error parameters
    return Response.redirect(new URL('/financial?success=false&status=500', req.url), 303);
  }
}

export async function GET(req) {
  // Get search parameters from the URL
  const { searchParams } = new URL(req.url);
  const fund = searchParams.get('fund');
  const type = searchParams.get('type');
  
  // Log the received parameters (for demonstration purposes)
  console.log('GET request parameters:', { fund, type });
  
  // For this demo, we'll redirect back to the financial page with success parameters
  // In a real application, you might display search results directly
  return Response.redirect(new URL(`/financial?success=true&status=200&fund=${fund || ''}&type=${type || ''}`, req.url), 303);
}

