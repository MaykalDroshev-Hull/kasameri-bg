// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Store to track idempotency keys (in production, use Redis/DB)
const processedOrders = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Extract idempotency key
    const { idempotencyKey } = body;
    
    // Check if already processed
    if (idempotencyKey && processedOrders.has(idempotencyKey)) {
      return NextResponse.json(
        { error: 'Order already processed', orderId: `OR-2025-${idempotencyKey.slice(0, 6)}` },
        { status: 409 }
      );
    }
    
    // Simulate processing latency (800-1200ms)
    const delay = 800 + Math.random() * 400;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Validate required fields
    if (!body.customer?.fullName || !body.customer?.phone) {
      return NextResponse.json(
        { error: 'Missing required customer information' },
        { status: 400 }
      );
    }
    
    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Order must contain at least one item' },
        { status: 400 }
      );
    }
    
    // Generate order ID
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const orderId = `OR-2025-${timestamp}${random}`;
    
    // Mark as processed
    if (idempotencyKey) {
      processedOrders.add(idempotencyKey);
    }
    
    // In production, save to database here
    console.log('Order received:', {
      orderId,
      customer: body.customer,
      items: body.items,
      total: body.total,
      delivery: body.delivery
    });
    
    // Return success response
    return NextResponse.json(
      {
        success: true,
        orderId,
        message: 'Order received successfully'
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Order API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS (if needed)
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
