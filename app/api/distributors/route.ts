// app/api/distributors/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend (use empty string as fallback for build time)
const primaryResend = new Resend(process.env.RESEND_API_KEY || '');
const hmResend =
  process.env.RESEND_API_KEY_HM && process.env.RESEND_API_KEY_HM.trim().length > 0
    ? new Resend(process.env.RESEND_API_KEY_HM)
    : primaryResend;

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Log received data for debugging
    console.log('Distributor API - Received body:', JSON.stringify(body, null, 2));
    
    // Validate required fields
    if (!body.company || !body.phone) {
      console.error('Missing distributor info:', { company: body.company, phone: body.phone });
      return NextResponse.json(
        { 
          error: 'Missing required information',
          details: {
            company: !body.company ? 'required' : 'ok',
            phone: !body.phone ? 'required' : 'ok'
          }
        },
        { status: 400 }
      );
    }
    
    // Generate inquiry ID
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const inquiryId = `DIST-2025-${timestamp}${random}`;
    
    // Build email content
    let emailBody = `НОВО ЗАПИТВАНЕ ЗА ДИСТРИБУЦИЯ\n\n`;
    emailBody += `═══════════════════════════════════════\n\n`;
    emailBody += `📋 НОМЕР НА ЗАПИТВАНЕ: ${inquiryId}\n\n`;
    
    // Company information
    emailBody += `🏢 ФИРМА:\n`;
    emailBody += `   Име на фирма: ${body.company}\n`;
    emailBody += `   Телефон: ${body.phone}\n`;
    emailBody += `   Регион на дейност: ${body.region || 'Не е посочен'}\n`;
    emailBody += `\n`;
    
    // Message
    if (body.message && body.message.trim()) {
      emailBody += `💬 СЪОБЩЕНИЕ:\n`;
      emailBody += `   ${body.message}\n`;
      emailBody += `\n`;
    }
    
    emailBody += `═══════════════════════════════════════\n`;
    emailBody += `Дата и час: ${new Date().toLocaleString('bg-BG')}\n`;
    
    const sendResults = await Promise.allSettled([
      primaryResend.emails.send({
        from: 'Kasameri Distributors <onboarding@resend.dev>',
        to: 'aphtex@gmail.com',
        subject: `Запитване за дистрибуция от ${body.company}`,
        text: emailBody
      }),
      hmResend.emails.send({
        from: 'Kasameri Distributors <onboarding@resend.dev>',
        to: 'hm.websiteprovisioning@gmail.com',
        subject: `Запитване за дистрибуция от ${body.company}`,
        text: emailBody
      })
    ]);

    const recipients = ['aphtex@gmail.com', 'hm.websiteprovisioning@gmail.com'];
    sendResults.forEach((result, index) => {
      const recipient = recipients[index];
      if (result.status === 'fulfilled') {
        console.log(`✅ Distributor email sent to ${recipient}`);
      } else {
        console.error(`❌ Failed to send distributor email to ${recipient}:`, result.reason);
      }
    });
    
    // Return success response
    return NextResponse.json(
      {
        success: true,
        inquiryId,
        message: 'Inquiry received successfully'
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Distributor API error:', error);
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

