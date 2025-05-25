export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const unitSize = Number(searchParams.get('unitSize') || 0);
  const entitlementFactor = Number(searchParams.get('factor') || 1);
  
  // Calculate quarterly levy (simplified formula)
  const baseRate = 800; // Base quarterly rate
  const levy = baseRate * (unitSize / 100) * entitlementFactor;
  
  return Response.json({
    quarterlyLevy: levy.toFixed(2),
    annualLevy: (levy * 4).toFixed(2),
    calculatedAt: new Date().toISOString()
  });
}