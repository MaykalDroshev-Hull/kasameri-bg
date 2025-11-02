// utils/viber.ts
import { OrderRequest } from '@/store/checkoutStore';

/**
 * Formats phone number to E.164 format for Bulgarian numbers
 */
export function formatPhoneToE164BG(input: string): string {
  let s = input.replace(/[^\d+]/g, '');
  if (s.startsWith('00')) s = '+' + s.slice(2);
  if (s.startsWith('0')) s = '+359' + s.slice(1);
  if (!s.startsWith('+')) s = '+359' + s;
  return s;
}

/**
 * Builds formatted order text in Bulgarian
 */
export function buildOrderTextBG(payload: OrderRequest, orderId: string): string {
  const lines = [];
  
  // Customer info - compact format
  lines.push(`Клиент - ${payload.customer.fullName}`);
  lines.push(`Тел - ${payload.customer.phone}`);
  lines.push(`Имейл - ${payload.customer.email || '—'}`);
  
  // Delivery method label
  const deliveryLabels: Record<string, string> = {
    econt_cod: 'Наложен платеж с Еконт',
    our_transport: 'Доставка с наш транспорт',
    pickup: 'Лично вземане от място'
  };
  
  // Delivery - compact single line with address
  let deliveryLine = `Доставка - ${deliveryLabels[payload.delivery.method]}`;
  if (payload.delivery.method !== 'pickup' && payload.delivery.address) {
    const addr = payload.delivery.address;
    deliveryLine += `, ${addr.street}, ${addr.city} ${addr.postcode}`;
    if (addr.extra) deliveryLine += ` (${addr.extra})`;
  } else if (payload.delivery.method === 'pickup') {
    deliveryLine += ', с. Александрово 5572, Ловеч';
  }
  lines.push(deliveryLine);
  
  // Preferred time (if set)
  if (payload.delivery.preferred?.dateISO) {
    lines.push(`Предпочитан час - ${payload.delivery.preferred.dateISO} ${payload.delivery.preferred.slot || ''}`);
  }
  
  lines.push('');
  
  // Products - compact single line format
  payload.items.forEach(item => {
    const varTxt = item.variety ? ` - ${item.variety}` : '';
    
    // Determine quality indicator for apples based on price
    let qualityIndicator = '';
    if (item.productId === 'apples') {
      // First quality: 3.50, Second quality: 2.50
      if (item.pricePerUnit === 3.50) {
        qualityIndicator = ' 1К';
      } else if (item.pricePerUnit === 2.50) {
        qualityIndicator = ' 2К';
      }
    }
    
    // Use proper translation for unit
    const unitLabel = item.unit === 'pack' ? 'кутии' : item.unit;
    const qtyText = item.unit === 'pack' ? `${item.qty} ${unitLabel}` : `${item.qty} ${unitLabel}`;
    
    lines.push(`${item.name}${varTxt}${qualityIndicator} - ${qtyText} - ${item.lineTotal.toFixed(2)} лв`);
  });
  
  lines.push('');
  lines.push(`Общо: ${payload.total.toFixed(2)} лв`);
  
  if (payload.notes) {
    lines.push('');
    lines.push(`Бележки: ${payload.notes}`);
  }
  
  lines.push('');
  lines.push(`Дата: ${new Date(payload.createdAtISO).toLocaleString('bg-BG')}`);
  
  return lines.join('\n');
}

/**
 * Builds formatted order text in English
 */
export function buildOrderTextEN(payload: OrderRequest, orderId: string): string {
  const lines = [];
  
  // Customer info - compact format
  lines.push(`Customer - ${payload.customer.fullName}`);
  lines.push(`Phone - ${payload.customer.phone}`);
  lines.push(`Email - ${payload.customer.email || '—'}`);
  
  // Delivery method label
  const deliveryLabels: Record<string, string> = {
    econt_cod: 'Econt cash on delivery',
    our_transport: 'Delivery with our transport',
    pickup: 'Pickup'
  };
  
  // Delivery - compact single line with address
  let deliveryLine = `Delivery - ${deliveryLabels[payload.delivery.method]}`;
  if (payload.delivery.method !== 'pickup' && payload.delivery.address) {
    const addr = payload.delivery.address;
    deliveryLine += `, ${addr.street}, ${addr.city} ${addr.postcode}`;
    if (addr.extra) deliveryLine += ` (${addr.extra})`;
  } else if (payload.delivery.method === 'pickup') {
    deliveryLine += ', Aleksandrovo 5572, Lovech';
  }
  lines.push(deliveryLine);
  
  // Preferred time (if set)
  if (payload.delivery.preferred?.dateISO) {
    lines.push(`Preferred time - ${payload.delivery.preferred.dateISO} ${payload.delivery.preferred.slot || ''}`);
  }
  
  lines.push('');
  
  // Products - compact single line format
  payload.items.forEach(item => {
    const varTxt = item.variety ? ` - ${item.variety}` : '';
    
    // Determine quality indicator for apples based on price
    let qualityIndicator = '';
    if (item.productId === 'apples') {
      // First quality: 3.50, Second quality: 2.50
      if (item.pricePerUnit === 3.50) {
        qualityIndicator = ' 1Q';
      } else if (item.pricePerUnit === 2.50) {
        qualityIndicator = ' 2Q';
      }
    }
    
    // Use proper translation for unit
    const unitLabel = item.unit === 'pack' ? 'boxes' : item.unit;
    const qtyText = item.unit === 'pack' ? `${item.qty} ${unitLabel}` : `${item.qty} ${unitLabel}`;
    
    lines.push(`${item.name}${varTxt}${qualityIndicator} - ${qtyText} - ${item.lineTotal.toFixed(2)} BGN`);
  });
  
  lines.push('');
  lines.push(`Total: ${payload.total.toFixed(2)} BGN`);
  
  if (payload.notes) {
    lines.push('');
    lines.push(`Notes: ${payload.notes}`);
  }
  
  lines.push('');
  lines.push(`Date: ${new Date(payload.createdAtISO).toLocaleString('en-US')}`);
  
  return lines.join('\n');
}

/**
 * Sends order via Viber
 * - Copies text to clipboard
 * - Attempts to open Viber deep link
 * - Returns promise that resolves when clipboard copy succeeds
 */
export async function sendViaViber(
  orderText: string, 
  phone: string = '+359876522974'
): Promise<boolean> {
  try {
    // Copy to clipboard
    await navigator.clipboard.writeText(orderText);
    
    // Normalize phone for deep link
    const normalized = phone.replace(/\+/g, '%2B');
    const uri = `viber://chat?number=${normalized}`;
    
    // Try to open Viber
    // Note: This may not work in all browsers/platforms
    window.location.href = uri;
    
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard or open Viber:', error);
    return false;
  }
}

/**
 * Sends order via Facebook Messenger
 * - Copies text to clipboard
 * - Attempts to open Messenger deep link
 * - Returns promise that resolves when clipboard copy succeeds
 */
export async function sendViaMessenger(
  orderText: string,
  facebookUsername: string = '61581801093204'
): Promise<boolean> {
  try {
    // Copy to clipboard
    await navigator.clipboard.writeText(orderText);
    
    // Encode message for URL
    const encodedText = encodeURIComponent(orderText);
    
    // Try Messenger deep link with text (works on some platforms)
    const messengerUri = `https://m.me/${facebookUsername}?text=${encodedText}`;
    
    // Open in new window/tab
    window.open(messengerUri, '_blank');
    
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard or open Messenger:', error);
    return false;
  }
}

/**
 * Copy text to clipboard with fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      console.error('Failed to copy text:', err);
      return false;
    }
  }
}

