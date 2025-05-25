export const runtime = 'edge';

export async function POST(request) {
  try {
    const { issue, location } = await request.json();
    
    // Critical issues that require immediate attention
    const criticalIssues = ['water leak', 'electrical', 'fire', 'gas', 'structural'];
    const criticalLocations = ['common area', 'elevator', 'roof', 'entrance'];
    
    // Check if urgent
    const isUrgentIssue = criticalIssues.some(item => 
      issue.toLowerCase().includes(item)
    );
    
    const isUrgentLocation = criticalLocations.some(item => 
      location.toLowerCase().includes(item)
    );
    
    const isUrgent = isUrgentIssue || isUrgentLocation;
    
    return Response.json({
      isUrgent,
      recommendedResponse: isUrgent ? 'immediate' : 'standard',
      responseTime: isUrgent ? '24 hours' : '7 days'
    });
  } catch (error) {
    return Response.json(
      { error: 'Failed to analyze maintenance urgency' },
      { status: 500 }
    );
  }
}