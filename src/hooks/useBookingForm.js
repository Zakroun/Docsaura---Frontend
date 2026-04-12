import { useState, useCallback } from 'react';
import { sanitize } from '../utils';

export function useBookingForm(consultationTypes = []) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', type: consultationTypes[0] || '', description: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  }, [errors]);

  const validate = useCallback(() => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'This field is required.';
    if (!form.email.trim()) errs.email = 'This field is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address.';
    if (!form.phone.trim()) errs.phone = 'This field is required.';
    else if (!/^[+]?[\d\s\-().]{8,15}$/.test(form.phone)) errs.phone = 'Invalid phone number.';
    if (!form.date) errs.date = 'This field is required.';
    if (!form.time) errs.time = 'This field is required.';
    if (!form.type) errs.type = 'This field is required.';
    return errs;
  }, [form]);

  const submit = useCallback(async (onSuccess) => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    // Sanitize all inputs before storing
    const sanitized = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, sanitize(v)])
    );
    await new Promise(r => setTimeout(r, 1200)); // simulate API call
    setSubmitted(true);
    setLoading(false);
    onSuccess?.(sanitized);
  }, [form, validate]);

  const reset = useCallback(() => {
    setForm({ name: '', email: '', phone: '', date: '', time: '', type: consultationTypes[0] || '', description: '' });
    setErrors({});
    setSubmitted(false);
  }, [consultationTypes]);

  return { form, errors, submitted, loading, handleChange, submit, reset };
}
