// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend (use empty string as fallback for build time)
const primaryResend = new Resend(process.env.RESEND_API_KEY || '');
const hmResend =
  process.env.RESEND_API_KEY_HM && process.env.RESEND_API_KEY_HM.trim().length > 0
    ? new Resend(process.env.RESEND_API_KEY_HM)
    : primaryResend;

// Store to track idempotency keys (in production, use Redis/DB)
const processedOrders = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Log received data for debugging
    console.log('Order API - Received body:', JSON.stringify(body, null, 2));
    
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
      console.error('Missing customer info:', { fullName: body.customer?.fullName, phone: body.customer?.phone });
      return NextResponse.json(
        { 
          error: 'Missing required customer information',
          details: {
            fullName: !body.customer?.fullName ? 'required' : 'ok',
            phone: !body.customer?.phone ? 'required' : 'ok'
          }
        },
        { status: 400 }
      );
    }
    
    if (!body.items || body.items.length === 0) {
      console.error('Missing items:', body.items);
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
    
    // Send email notification to aphtex@gmail.com
    try {
      // Build email content
      const deliveryMethodText = 
        body.delivery.method === 'pickup' ? 'Лично вземане' : 
        body.delivery.method === 'econt_cod' ? 'Econt (наложен платеж)' : 
        'Наша доставка';
      
      let emailBody = `НОВА ПОРЪЧКА ОТ УЕБСАЙТА\n\n`;
      emailBody += `═══════════════════════════════════════\n\n`;
      emailBody += `📋 НОМЕР НА ПОРЪЧКА: ${orderId}\n\n`;
      
      // Customer information
      emailBody += `👤 КЛИЕНТ:\n`;
      emailBody += `   Име: ${body.customer.fullName}\n`;
      emailBody += `   Телефон: ${body.customer.phone}\n`;
      if (body.customer.email) {
        emailBody += `   Email: ${body.customer.email}\n`;
      }
      emailBody += `\n`;
      
      // Delivery information
      emailBody += `🚚 ДОСТАВКА:\n`;
      emailBody += `   Метод: ${deliveryMethodText}\n`;
      if (body.delivery.preferred?.date) {
        emailBody += `   Предпочитана дата: ${body.delivery.preferred.date}\n`;
      }
      if (body.delivery.preferred?.time) {
        emailBody += `   Предпочитано време: ${body.delivery.preferred.time}\n`;
      }
      emailBody += `\n`;
      
      // Order items
      emailBody += `🛒 ПОРЪЧАНИ ПРОДУКТИ:\n`;
      body.items.forEach((item: any, index: number) => {
        emailBody += `   ${index + 1}. ${item.name}`;
        if (item.variety) {
          emailBody += ` (${item.variety})`;
        }
        
        // Add quality indicator for apples
        if (item.productId === 'apples') {
          if (item.pricePerUnit === 3.50) {
            emailBody += ` - Първо качество`;
          } else if (item.pricePerUnit === 2.50) {
            emailBody += ` - Второ качество`;
          }
        }
        
        emailBody += `\n`;
        
        // Use proper Bulgarian unit names
        let unitDisplay = item.unit;
        if (item.unit === 'pack') {
          unitDisplay = item.qty === 1 ? 'кутия' : 'кутии';
        }
        
        emailBody += `      Количество: ${item.qty} ${unitDisplay}\n`;
        emailBody += `      Цена: ${item.pricePerUnit.toFixed(2)} лв/${item.unit === 'pack' ? 'кутия' : item.unit}\n`;
        emailBody += `      Общо: ${item.lineTotal.toFixed(2)} лв\n`;
        if (index < body.items.length - 1) emailBody += `\n`;
      });
      emailBody += `\n`;
      
      // Totals
      emailBody += `═══════════════════════════════════════\n`;
      emailBody += `💰 ФИНАНСОВА ИНФОРМАЦИЯ:\n`;
      emailBody += `   Междинна сума: ${body.subtotal.toFixed(2)} лв\n`;
      if (body.discount && body.discount > 0) {
        emailBody += `   Отстъпка: -${body.discount.toFixed(2)} лв\n`;
      }
      if (body.delivery.fee && body.delivery.fee > 0) {
        emailBody += `   Доставка: ${body.delivery.fee.toFixed(2)} лв\n`;
      }
      emailBody += `   ОБЩО: ${body.total.toFixed(2)} лв\n`;
      emailBody += `═══════════════════════════════════════\n\n`;
      
      // Payment method
      if (body.payment?.method) {
        const paymentMethodText = 
          body.payment.method === 'cash' ? 'В брой' : 
          body.payment.method === 'card' ? 'С карта' : 
          'Наложен платеж';
        emailBody += `💳 Метод на плащане: ${paymentMethodText}\n\n`;
      }
      
      emailBody += `Дата и час: ${new Date(body.createdAtISO).toLocaleString('bg-BG')}\n`;
      
      const sendResults = await Promise.allSettled([
        primaryResend.emails.send({
          from: 'Kasameri Orders <onboarding@resend.dev>',
          to: 'aphtex@gmail.com',
          subject: `Нова поръчка #${orderId} от ${body.customer.fullName}`,
          text: emailBody,
        }),
        hmResend.emails.send({
          from: 'Kasameri Orders <onboarding@resend.dev>',
          to: 'hm.websiteprovisioning@gmail.com',
          subject: `Нова поръчка #${orderId} от ${body.customer.fullName}`,
          text: emailBody,
        }),
      ]);

      const recipients = ['aphtex@gmail.com', 'hm.websiteprovisioning@gmail.com'];
      sendResults.forEach((result, index) => {
        const recipient = recipients[index];
        if (result.status === 'fulfilled') {
          console.log(`✅ Order email sent to ${recipient}`);
        } else {
          console.error(`❌ Failed to send order email to ${recipient}:`, result.reason);
        }
      });
    } catch (emailError) {
      // Log email error but don't fail the order
      console.error('❌ Failed to send email notification:', emailError);
      // Order still succeeds even if email fails
    }
    
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
