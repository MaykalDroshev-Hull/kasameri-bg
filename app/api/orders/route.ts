// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { OrderRequest } from '@/store/checkoutStore';

// Mock order counter for generating order IDs
let orderCounter = 1234;

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderRequest = await request.json();
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 400 + 800));
    
    // Validate required fields
    if (!orderData.customer.fullName || !orderData.customer.phone) {
      return NextResponse.json(
        { error: 'Missing required customer information' },
        { status: 400 }
      );
    }
    
    // Validate phone number format (should be normalized to +359...)
    if (!orderData.customer.phone.startsWith('+359') || orderData.customer.phone.length !== 13) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }
    
    // Validate delivery address if delivery method is selected
    if (orderData.delivery.method === 'delivery') {
      if (!orderData.delivery.address?.street || !orderData.delivery.address?.city || !orderData.delivery.address?.postcode) {
        return NextResponse.json(
          { error: 'Missing delivery address information' },
          { status: 400 }
        );
      }
      
      // Validate Bulgarian postcode (4 digits)
      if (!/^\d{4}$/.test(orderData.delivery.address.postcode)) {
        return NextResponse.json(
          { error: 'Invalid postcode format' },
          { status: 400 }
        );
      }
    }
    
    // Validate items
    if (!orderData.items || orderData.items.length === 0) {
      return NextResponse.json(
        { error: 'No items in order' },
        { status: 400 }
      );
    }
    
    // Check for duplicate idempotency key (simplified check)
    // In a real app, you'd check against a database
    if (orderData.idempotencyKey.includes('duplicate')) {
      return NextResponse.json(
        { error: 'Duplicate order detected' },
        { status: 409 }
      );
    }
    
    // Generate order ID
    const orderId = `OR-2025-${String(orderCounter++).padStart(6, '0')}`;
    
    // Calculate ETA (1-3 days for delivery, same day for pickup)
    const etaDays = orderData.delivery.method === 'pickup' ? 0 : Math.floor(Math.random() * 3) + 1;
    
    // Log order (in real app, save to database)
    console.log('Order received:', {
      orderId,
      customer: orderData.customer.fullName,
      phone: orderData.customer.phone,
      total: orderData.total,
      items: orderData.items.length,
      deliveryMethod: orderData.delivery.method,
      etaDays
    });
    
    // Return success response
    return NextResponse.json({
      orderId,
      etaDays,
      status: 'confirmed',
      message: 'Order successfully placed'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Order processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
