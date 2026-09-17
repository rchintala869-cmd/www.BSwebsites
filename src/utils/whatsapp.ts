export const WHATSAPP_PHONE = '919703281549';
export const DISPLAY_PHONE = '+91 9703281549';

/**
 * Generates WhatsApp URL for Order Website button
 * Exact Prompt Requirement:
 * "Hi BS Websites! I want to order a website. Name: [Name], Phone: [Phone], Website Type: [Type], Pricing Preference: [Fixed / Bargain]."
 */
export function createOrderWebsiteWhatsAppUrl(
  name: string,
  phone: string,
  websiteType: string,
  pricingPreference: string,
  logoStatus?: string
): string {
  const cleanName = name.trim() || 'Valued Customer';
  const cleanPhone = phone.trim() || 'Not specified';
  const cleanType = websiteType.trim() || 'Custom Dynamic Site';
  const cleanPref = pricingPreference.trim() || 'Fixed Price (₹10,000 - ₹18,000)';
  const logoInfo = logoStatus ? ` Logo: [${logoStatus}].` : '';

  const message = `Hi BS Websites! I want to order a website. Name: ${cleanName}, Phone: ${cleanPhone}, Website Type: ${cleanType}, Pricing Preference: ${cleanPref}.${logoInfo}`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates WhatsApp URL for Buy Now action
 * Prompt requirement:
 * "Hi BS Websites! Customer Name: [Name], Phone: [Phone]. I want to BUY the [Website Plan Name] priced at [Cost]. Details: [User Notes]."
 */
export function createBuyNowWhatsAppUrl(
  customerName: string,
  phone: string,
  planTitle: string,
  cost: string,
  userNotes: string
): string {
  const cleanName = customerName.trim() || 'Valued Customer';
  const cleanPhone = phone.trim() || 'Not specified';
  const cleanNotes = userNotes.trim() || 'None provided';

  const message = `Hi BS Websites! Customer Name: ${cleanName}, Phone: ${cleanPhone}. I want to BUY the ${planTitle} priced at ${cost}. Details: ${cleanNotes}.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates WhatsApp URL for Appointment action
 * Prompt requirement:
 * "Hi BS Websites! Customer Name: [Name], Phone: [Phone]. I want to BOOK AN APPOINTMENT to discuss [Website Type/Query] on [Date/Time]."
 */
export function createAppointmentWhatsAppUrl(
  customerName: string,
  phone: string,
  websiteTypeOrQuery: string,
  dateTime: string
): string {
  const cleanName = customerName.trim() || 'Valued Customer';
  const cleanPhone = phone.trim() || 'Not specified';
  const cleanQuery = websiteTypeOrQuery.trim() || 'Custom Website Development';
  const cleanDateTime = dateTime.trim() || 'Soon as possible';

  const message = `Hi BS Websites! Customer Name: ${cleanName}, Phone: ${cleanPhone}. I want to BOOK AN APPOINTMENT to discuss ${cleanQuery} on ${cleanDateTime}.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/**
 * Quick consultation message for floating action button
 */
export function createQuickChatWhatsAppUrl(customerName?: string): string {
  const greeting = customerName ? `Hi BS Websites! I'm ${customerName}.` : 'Hi BS Websites!';
  const message = `${greeting} I would like to get a quote and discuss creating a modern custom website for my business.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/**
 * Open WhatsApp in new tab safely
 */
export function openWhatsAppLink(url: string): void {
  try {
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win) {
      window.location.href = url;
    }
  } catch (err) {
    console.error('Failed to open WhatsApp window, falling back to location href', err);
    window.location.href = url;
  }
}
