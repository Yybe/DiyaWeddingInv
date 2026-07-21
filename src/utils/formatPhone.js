/** Formats a 10-digit Indian mobile number for display, e.g. 8527936725 -> 85279 36725 */
export function formatPhoneDisplay(phone) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length !== 10) return phone;
  return `${digits.slice(0, 5)} ${digits.slice(5)}`;
}

/** Builds a tel: href, assuming Indian numbers (+91) when 10 digits are given. */
export function toTelHref(phone) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `tel:+91${digits}` : `tel:${digits}`;
}
