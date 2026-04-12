import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiCheckCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Input, { Textarea, Select } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { sanitize } from '../../utils';

const contactInfo = [
  { icon: FiMapPin, label: 'Address', value: '123 Avenue Mohammed V, Rabat 10000, Morocco' },
  { icon: FiPhone, label: 'Phone', value: '+212 537 00 11 22', href: 'tel:+212537001122' },
  { icon: FiMail, label: 'Email', value: 'hello@docsaura.ma', href: 'mailto:hello@docsaura.ma' },
  { icon: FiClock, label: 'Hours', value: 'Mon–Fri 08:00–20:00 | Sat 09:00–16:00' },
];

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Required.';
    if (!form.email.trim()) errs.email = 'Required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email.';
    if (!form.message.trim()) errs.message = 'Required.';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-teal-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Contact Us</h1>
          <p className="text-slate-300 max-w-lg mx-auto text-lg">Have a question or want to partner with us? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left — info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>We're here to help</h2>
              <p className="text-slate-500 text-sm leading-relaxed">Whether you're a patient, doctor, or clinic — reach out and our team will get back to you within 24 hours.</p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                    <item.icon size={17} className="text-teal-700" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{item.label}</p>
                    {item.href
                      ? <a href={item.href} className="text-sm text-slate-800 hover:text-teal-700 transition-colors">{item.value}</a>
                      : <p className="text-sm text-slate-700">{item.value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/212537001122"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors text-sm w-fit"
            >
              <FaWhatsapp size={20} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-slate-100 rounded-2xl p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mb-5">
                    <FiCheckCircle size={28} className="text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500 text-sm max-w-xs">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Send us a message</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Your name" required />
                    <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="your@email.com" required />
                  </div>
                  <Select label="Subject" name="subject" value={form.subject} onChange={handleChange}>
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="booking">Booking Issue</option>
                    <option value="partnership">Partnership</option>
                    <option value="doctor">Join as a Doctor</option>
                    <option value="clinic">Register a Clinic</option>
                    <option value="feedback">Feedback</option>
                  </Select>
                  <Textarea label="Message" name="message" value={form.message} onChange={handleChange} error={errors.message} placeholder="Tell us how we can help..." required rows={5} />
                  <Button type="submit" className="w-full" size="lg" loading={loading}>
                    <FiSend size={16} />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
