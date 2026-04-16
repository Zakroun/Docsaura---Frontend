import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiCheckCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Input, { Textarea, Select } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { sanitize } from '../../utils';

const Apiurl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const contactInfo = [
  { icon: FiMapPin, label: 'Address', value: '123 Avenue Mohammed V, Rabat 10000, Morocco' },
  { icon: FiPhone, label: 'Phone', value: '+212 537 00 11 22', href: 'tel:+212537001122' },
  { icon: FiMail, label: 'Email', value: 'hello@docsaura.ma', href: 'mailto:hello@docsaura.ma' },
  { icon: FiClock, label: 'Hours', value: 'Mon–Fri 08:00–20:00 | Sat 09:00–16:00' },
];

export default function Contact() {
  const { t, i18n } = useTranslation();
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

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${Apiurl}/sendMail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: sanitize(form.name),
          email: sanitize(form.email),
          subject: sanitize(form.subject),
          message: sanitize(form.message),
          lang: i18n.language,
        }),
      });

      const data = await res.json();

      if (res.ok && data.message === "Emails sent successfully") {
        setSubmitted(true);
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.error || 'Something went wrong');
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-teal-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>{t('contact_form.title')}</h1>
          <p className="text-slate-300 max-w-lg mx-auto text-lg">{t('contact_form.subtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left — info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{t('contact_form.left_title')}</h2>
              <p className="text-slate-500 text-sm leading-relaxed">{t('contact_form.left_subtitle')}</p>
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
              {t('contact_form.whatsapp')}
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
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{t('contact_sent')}</h3>
                  <p className="text-slate-500 text-sm max-w-xs">{t('contact_submitted')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{t('contact_form.right_title')}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input label={t('contact_form.fullname')} name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder={t('contact_form.fullname_placeholder')} required />
                    <Input label={t('contact_form.email')} name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder={t('contact_form.email_placeholder')} required />
                  </div>
                  <Select label={t('contact_form.subject')} name="subject" value={form.subject} onChange={handleChange}>
                    <option value="">{t('contact_form.select_subject')}</option>
                    <option value="general">{t('contact_form.options.subject_1')}</option>
                    <option value="booking">{t('contact_form.options.subject_2')}</option>
                    <option value="partnership">{t('contact_form.options.subject_3')}</option>
                    <option value="doctor">{t('contact_form.options.subject_4')}</option>
                    <option value="clinic">{t('contact_form.options.subject_5')}</option>
                    <option value="feedback">{t('contact_form.options.subject_6')}</option>
                  </Select>
                  <Textarea label={t('contact_form.message')} name="message" value={form.message} onChange={handleChange} error={errors.message} placeholder={t('contact_form.message_placeholder')} required rows={5} />
                  <Button type="submit" className="w-full" size="lg" loading={loading}>
                    <FiSend size={16} />
                    {t('contact_form.submit')}
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
