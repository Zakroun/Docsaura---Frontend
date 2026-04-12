import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft, FiMapPin, FiPhone, FiMail, FiClock, FiCheckCircle } from 'react-icons/fi';
import { GiMicroscope } from 'react-icons/gi';
import { laboratories } from '../../data/laboratories';
import StarRating from '../../components/ui/StarRating';
import Badge from '../../components/ui/Badge';
import { useBookingForm } from '../../hooks/useBookingForm';
import Input, { Select } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { FiUser, FiMail as FiMailIcon, FiPhone as FiPhoneIcon, FiCalendar, FiCheckCircle as FiCheck } from 'react-icons/fi';

const today = new Date().toISOString().split('T')[0];

function LabBookingForm({ tests = [] }) {
  const { t } = useTranslation();
  const [selectedTest, setSelectedTest] = useState('');
  const { form, errors, submitted, loading, handleChange, submit } = useBookingForm([]);
  const [localErrors, setLocalErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTest) { setLocalErrors({ test: 'Please select a test.' }); return; }
    setLocalErrors({});
    submit();
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mb-5">
          <FiCheck size={28} className="text-emerald-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Test Booked!</h3>
        <p className="text-sm text-slate-500 max-w-xs">Your lab test has been scheduled. Results will be sent digitally.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <h3 className="text-lg font-bold text-slate-900 mb-5" style={{ fontFamily: 'Outfit, sans-serif' }}>Book a Test</h3>
      <div>
        <label className="text-sm font-medium text-slate-700 block mb-1.5">Select Test <span className="text-red-500">*</span></label>
        <select
          value={selectedTest}
          onChange={e => { setSelectedTest(e.target.value); setLocalErrors({}); }}
          className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm text-slate-800 outline-none transition-all appearance-none ${localErrors.test ? 'border-red-400 ring-2 ring-red-400/10' : 'border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10'}`}
        >
          <option value="">Choose a test...</option>
          {tests.map(test => (
            <option key={test.id} value={test.name}>{test.name} — {test.price} MAD</option>
          ))}
        </select>
        {localErrors.test && <p className="text-xs text-red-500 mt-1">{localErrors.test}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Your name" required icon={FiUser} />
        <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="+212 6XX" required icon={FiPhoneIcon} />
      </div>
      <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="email@example.com" required icon={FiMailIcon} />
      <Input label="Preferred Date" name="date" type="date" value={form.date} onChange={handleChange} error={errors.date} required icon={FiCalendar} min={today} />

      {selectedTest && (
        <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 text-sm">
          <p className="font-semibold text-teal-800 mb-1">Selected Test</p>
          <p className="text-teal-700">{selectedTest}</p>
          <p className="text-teal-600 text-xs mt-1">{tests.find(t => t.name === selectedTest)?.turnaround} turnaround</p>
        </div>
      )}

      <Button type="submit" className="w-full" size="lg" loading={loading}>Confirm Booking</Button>
    </form>
  );
}

export default function LaboratoryDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const lab = laboratories.find(l => l.id === Number(id));
  const [activeTab, setActiveTab] = useState('tests');
  const [categoryFilter, setCategoryFilter] = useState('All');

  if (!lab) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold text-slate-900">Laboratory not found</h2>
      <Link to="/labs" className="text-teal-700 flex items-center gap-2 hover:underline">
        <FiArrowLeft size={16} /> Back to Laboratories
      </Link>
    </div>
  );

  const categories = ['All', ...new Set(lab.tests.map(t => t.category))];
  const filteredTests = categoryFilter === 'All' ? lab.tests : lab.tests.filter(t => t.category === categoryFilter);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative h-64 md:h-72 overflow-hidden">
        <img src={lab.cover} alt={lab.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <Link to="/labs" className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-3">
            <FiArrowLeft size={16} /> {t('common.back')}
          </Link>
          <h1 className="text-3xl font-extrabold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{lab.name}</h1>
          <div className="flex items-center gap-3 mt-2">
            <StarRating rating={lab.rating} reviewCount={lab.reviewCount} size={13} />
            <Badge variant="blue"><GiMicroscope size={11} />{lab.specialty}</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-1 bg-white border border-slate-100 rounded-xl p-1 mb-8 w-fit">
          {['tests', 'about', 'booking'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'bg-teal-700 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >{tab}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'tests' && (
              <div className="space-y-5">
                {/* Category filters */}
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button key={cat} onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${categoryFilter === cat ? 'bg-teal-700 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-300'}`}
                    >{cat}</button>
                  ))}
                </div>
                <div className="space-y-3">
                  {filteredTests.map(test => (
                    <div key={test.id} className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-between gap-4 card-hover">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="blue">{test.category}</Badge>
                        </div>
                        <p className="font-semibold text-slate-900 text-sm">{test.name}</p>
                        <p className="text-xs text-slate-400 mt-1">Turnaround: {test.turnaround}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xl font-bold text-teal-700">{test.price}</p>
                        <p className="text-xs text-slate-400">MAD</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-3">About</h2>
                  <p className="text-slate-600 text-sm leading-relaxed">{lab.description}</p>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-4">Certifications</h2>
                  <div className="flex flex-col gap-2">
                    {lab.certifications.map(c => (
                      <div key={c} className="flex items-center gap-2 text-sm text-emerald-700">
                        <FiCheckCircle size={15} />{c}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-4">Services</h2>
                  <div className="flex flex-wrap gap-2">{lab.services.map(s => <Badge key={s} variant="teal">{s}</Badge>)}</div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {lab.amenities.map(a => (
                      <div key={a} className="flex items-center gap-2 text-sm text-slate-600">
                        <FiCheckCircle size={13} className="text-teal-500 shrink-0" />{a}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'booking' && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <LabBookingForm tests={lab.tests} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-bold text-slate-900 text-base mb-4">Contact Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 text-slate-600">
                  <FiMapPin size={15} className="text-teal-600 shrink-0 mt-0.5" />
                  <span>{lab.address}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <FiPhone size={15} className="text-teal-600 shrink-0" />
                  <a href={`tel:${lab.phone}`} className="hover:text-teal-700">{lab.phone}</a>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <FiMail size={15} className="text-teal-600 shrink-0" />
                  <a href={`mailto:${lab.email}`} className="hover:text-teal-700 truncate">{lab.email}</a>
                </div>
                <div className="flex items-start gap-3 text-slate-600">
                  <FiClock size={15} className="text-teal-600 shrink-0 mt-0.5" />
                  <span>{lab.openHours}</span>
                </div>
              </div>
            </div>
            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 text-center">
              <p className="text-sm font-semibold text-teal-800 mb-1">Home Collection Available</p>
              <p className="text-xs text-teal-600 mb-3">We come to you — book a home visit</p>
              <button onClick={() => setActiveTab('booking')}
                className="block w-full py-2.5 bg-teal-700 text-white text-sm font-semibold rounded-xl hover:bg-teal-800 transition-colors"
              >Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
