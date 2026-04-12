// Input sanitization - prevent XSS
export function sanitize(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
    .slice(0, 1000); // limit length
}

// Validation helpers
export const validators = {
  required: (v) => !v?.trim() ? 'This field is required.' : null,
  email: (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Invalid email address.' : null,
  phone: (v) => !/^[+]?[\d\s\-().]{8,15}$/.test(v) ? 'Invalid phone number.' : null,
  minLength: (min) => (v) => v?.length < min ? `Minimum ${min} characters.` : null,
  maxLength: (max) => (v) => v?.length > max ? `Maximum ${max} characters.` : null,
  password: (v) => v?.length < 8 ? 'Password must be at least 8 characters.' : null,
  match: (other, label = 'Passwords') => (v) => v !== other ? `${label} do not match.` : null,
};

export function validate(fields) {
  const errors = {};
  for (const [key, rules] of Object.entries(fields)) {
    for (const rule of rules) {
      const err = rule[1](rule[0]);
      if (err) { errors[key] = err; break; }
    }
  }
  return errors;
}

// Rate limiter simulation
const messageTimestamps = [];
export function checkRateLimit() {
  const now = Date.now();
  const recentMessages = messageTimestamps.filter(t => now - t < 60000);
  if (recentMessages.length >= 10) return false;
  messageTimestamps.push(now);
  return true;
}
