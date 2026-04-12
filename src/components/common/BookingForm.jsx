import { useTranslation } from 'react-i18next';
import { FiUser, FiMail, FiPhone, FiCalendar, FiCheckCircle, FiClock } from 'react-icons/fi';
import Input, { Textarea, Select } from '../ui/Input';
import Button from '../ui/Button';
import { useBookingForm } from '../../hooks/useBookingForm';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useToast } from '../../context/ToastContext';

const today = new Date().toISOString().split('T')[0];

export default function BookingForm({ consultationTypes = [], availableSlots = [], onSuccess, doctorName = '' }) {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [bookings, setBookings] = useLocalStorage('docsaura_bookings', []);
  const { form, errors, submitted, loading, handleChange, submit } = useBookingForm(consultationTypes);

  const handleSubmit = (e) => {
    e.preventDefault();
    submit((sanitized) => {
      // Persist booking
      const newBooking = {
        id: Date.now(),
        ...sanitized,
        doctorName,
        createdAt: new Date().toISOString(),
      };
      setBookings(prev => [newBooking, ...prev]);
      addToast(t('booking.success'), 'success');
      onSuccess?.(newBooking);
    });
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mb-5">
          <FiCheckCircle size={28} className="text-emerald-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">{t('booking.success')}</h3>
        <p className="text-sm text-slate-500 max-w-xs mb-5">
          A confirmation will be sent to <strong className="text-slate-700">{form.email}</strong>
        </p>
        <div className="w-full bg-slate-50 rounded-xl p-4 text-sm text-left space-y-2 max-w-xs">
          <div className="flex justify-between">
            <span className="text-slate-400 flex items-center gap-1.5"><FiCalendar size={13} />Date</span>
            <span className="font-semibold text-slate-800">{form.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 flex items-center gap-1.5"><FiClock size={13} />Time</span>
            <span className="font-semibold text-slate-800">{form.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Type</span>
            <span className="font-semibold text-slate-800">{form.type}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <h3 className="text-lg font-bold text-slate-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
        {t('booking.title')}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={t('booking.name')} name="name" value={form.name}
          onChange={handleChange} error={errors.name} placeholder="Aicha Bennani"
          required icon={FiUser}
        />
        <Input
          label={t('booking.email')} name="email" type="email" value={form.email}
          onChange={handleChange} error={errors.email} placeholder="aicha@example.com"
          required icon={FiMail}
        />
      </div>

      <Input
        label={t('booking.phone')} name="phone" value={form.phone}
        onChange={handleChange} error={errors.phone} placeholder="+212 6XX XXX XXX"
        required icon={FiPhone}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={t('booking.date')} name="date" type="date" value={form.date}
          onChange={handleChange} error={errors.date} required icon={FiCalendar}
          min={today}
        />
        <Select
          label={t('booking.time')} name="time" value={form.time}
          onChange={handleChange} error={errors.time} required
        >
          <option value="">Select time</option>
          {availableSlots.map(slot => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </Select>
      </div>

      {consultationTypes.length > 0 && (
        <Select
          label={t('booking.type')} name="type" value={form.type}
          onChange={handleChange} error={errors.type} required
        >
          <option value="">Select type</option>
          {consultationTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </Select>
      )}

      <Textarea
        label={t('booking.description')} name="description" value={form.description}
        onChange={handleChange}
        placeholder="Describe your symptoms or reason for visit..."
        rows={3}
      />

      <Button type="submit" className="w-full" size="lg" loading={loading}>
        {t('booking.submit')}
      </Button>
    </form>
  );
}
