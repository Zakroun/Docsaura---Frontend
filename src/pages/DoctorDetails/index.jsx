import { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FiArrowLeft, FiMapPin, FiClock, FiGlobe, FiPhone,
  FiMessageSquare, FiStar, FiCheck
} from 'react-icons/fi';
import { RiGraduationCapLine, RiStethoscopeLine, RiUserHeartLine } from 'react-icons/ri';
import { FaStar } from 'react-icons/fa';
import { doctors } from '../../data/doctors';
import StarRating from '../../components/ui/StarRating';
import Badge from '../../components/ui/Badge';
import BookingForm from '../../components/common/BookingForm';
import Button from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';
import { sanitize } from '../../utils';

function ReviewForm({ onSubmit }) {
  const {t} = useTranslation();
  const { addToast } = useToast();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) { setError('Please select a rating.'); return; }
    if (!name.trim()) { setError('Please enter your name.'); return; }
    if (text.trim().length < 10) { setError('Review must be at least 10 characters.'); return; }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    onSubmit({ author: sanitize(name), text: sanitize(text), rating, date: new Date().toISOString().split('T')[0] });
    addToast(t('review_submitted'), 'success');
    setRating(0); setText(''); setName('');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-50 rounded-2xl border border-slate-100 p-5 space-y-4">
      <h3 className="font-semibold text-slate-900 text-sm">{t('doctors.write_review')}</h3>
      {/* Star selector */}
      <div>
        <p className="text-xs text-slate-500 mb-2">{t('doctors.your_rating')}</p>
        <div className="flex gap-1">
          {[1,2,3,4,5].map(s => (
            <button key={s} type="button"
              onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)}
              onClick={() => setRating(s)}
              className="transition-transform hover:scale-110"
            >
              <FaStar size={22} className={s <= (hover || rating) ? 'text-amber-400' : 'text-slate-300'} />
            </button>
          ))}
        </div>
      </div>
      <input
        value={name} onChange={e => setName(e.target.value)}
        placeholder={t('doctors.your_name')}
        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
      />
      <textarea
        value={text} onChange={e => setText(e.target.value.slice(0, 500))}
        placeholder={t('doctors.your_review_desc')}
        rows={3}
        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all resize-none"
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      <Button type="submit" size="sm" loading={loading}>
        <FiMessageSquare size={13} /> {t('doctors.submit_review')}
      </Button>
    </form>
  );
}

export default function DoctorDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('about');

  const doctorData = doctors.find(d => d.id === Number(id));
  const [localComments, setLocalComments] = useState(doctorData?.comments || []);

  const handleAddReview = useCallback((review) => {
    setLocalComments(prev => [{
      id: Date.now(),
      author: review.author,
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 90)}.jpg`,
      rating: review.rating,
      date: review.date,
      text: review.text
    }, ...prev]);
  }, []);

  if (!doctorData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-6xl">👨‍⚕️</div>
        <h2 className="text-2xl font-bold text-slate-900">{t('doctors.not_found_title')}</h2>
        <Link to="/doctors" className="flex items-center gap-2 text-teal-700 hover:underline">
          <FiArrowLeft size={16} /> {t('doctors.back')}
        </Link>
      </div>
    );
  }
  const consultTypes = t('consultation_types', { returnObjects: true }) || {};
  const doctor = { ...doctorData, comments: localComments };
  const avgRating = (doctor.comments.reduce((a, c) => a + c.rating, 0) / doctor.comments.length).toFixed(1);
  const tabs = [
    { key: 'about', label: t('tabs.about') },
    { key: 'schedule', label: t('tabs.schedule') },
    { key: 'reviews', label: `${t('tabs.reviews')} (${doctor.comments.length})` },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Cover */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img src={doctor.cover} alt={doctor.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute top-5 left-6">
          <Link to="/doctors" className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-lg backdrop-blur-sm transition-all">
            <FiArrowLeft size={14} /> {t('common.back')}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-20 relative z-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── Main ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Profile header */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <div className="flex flex-col sm:flex-row gap-5">
                <img src={doctor.avatar} alt={doctor.name}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg shrink-0" />
                <div className="flex-1">
                  <Badge variant="teal" className="mb-2">
                    <RiStethoscopeLine size={11} />{doctor.specialty}
                  </Badge>
                  <h1 className="text-2xl font-extrabold text-slate-900 mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {doctor.name}
                  </h1>
                  <StarRating rating={Number(avgRating)} reviewCount={doctor.comments.length} />

                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <FiMapPin size={13} className="text-teal-600" />
                      {doctor.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FiClock size={13} className="text-teal-600" />
                      {doctor.experience} {t('common.experience')}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FiGlobe size={13} className="text-teal-600" />
                      {doctor.languages.join(', ')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-extrabold text-teal-700" style={{ fontFamily: 'Outfit' }}>{doctor.experience}+</p>
                  <p className="text-xs text-slate-500 mt-0.5">{t('Dashboard.stats.experience')}</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-teal-700" style={{ fontFamily: 'Outfit' }}>{doctor.reviewCount}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{t('Dashboard.stats.reviews')}</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-teal-700" style={{ fontFamily: 'Outfit' }}>{avgRating}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{t('Dashboard.stats.rating')}</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-white border border-slate-100 rounded-xl p-1 w-fit">
              {tabs.map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.key ? 'bg-teal-700 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* About tab */}
            {activeTab === 'about' && (
              <div className="space-y-5">
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-3" style={{ fontFamily: 'Outfit' }}>{t('tabs.about')}</h2>
                  <p className="text-slate-600 text-sm leading-relaxed">{doctor.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {doctor.tags.map(tag => <Badge key={tag} variant="teal">{tag}</Badge>)}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2" style={{ fontFamily: 'Outfit' }}>
                    <RiGraduationCapLine size={20} className="text-teal-600" /> {t('tabs.education')}
                  </h2>
                  <div className="space-y-4">
                    {doctor.education.map((edu, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-teal-500 shrink-0" />
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{edu.degree}</p>
                          <p className="text-slate-500 text-xs mt-0.5">{edu.institution} · {edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-4" style={{ fontFamily: 'Outfit' }}>{t('tabs.consultationTypes')}</h2>
                  <div className="flex flex-wrap gap-3">
                    {doctor.consultationTypes.map(ct => (
                      <div key={ct} className="flex items-center gap-2 px-4 py-2.5 bg-teal-50 border border-teal-100 rounded-xl text-sm text-teal-700 font-medium">
                        <FiCheck size={14} /> {t(`consultTypes.${ct}`)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Schedule tab */}
            {activeTab === 'schedule' && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <h2 className="font-bold text-slate-900 text-lg mb-5" style={{ fontFamily: 'Outfit' }}>{t('tabs.working_hours')}</h2>
                <div className="space-y-2">
                  {doctor.workingHours.map(wh => (
                    <div key={wh.day} className={`flex justify-between items-center py-3 px-4 rounded-xl text-sm ${wh.hours === 'Closed' ? 'bg-slate-50' : 'bg-teal-50/60 border border-teal-100/60'}`}>
                      <span className="font-medium text-slate-700 w-24">{t('days.' + wh.day.toLocaleLowerCase())}</span>
                      <span className={`font-semibold ${wh.hours === 'Closed' ? 'text-slate-400' : 'text-teal-700'}`}>{wh.hours === 'Closed' ? t('actions.closed') : wh.hours}</span>
                      {wh.hours !== 'Closed' && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">{t('tabs.available_slots')}</p>
                  <div className="flex flex-wrap gap-2">
                    {doctor.availableSlots.map(slot => (
                      <span key={slot} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 font-medium">
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Reviews tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-5">
                {/* Rating summary */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-5xl font-extrabold text-slate-900" style={{ fontFamily: 'Outfit' }}>{avgRating}</p>
                    <StarRating rating={Number(avgRating)} showCount={false} size={14} />
                    <p className="text-xs text-slate-500 mt-1">{doctor.comments.length} </p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5,4,3,2,1].map(star => {
                      const count = doctor.comments.filter(c => c.rating === star).length;
                      const pct = doctor.comments.length ? (count / doctor.comments.length) * 100 : 0;
                      return (
                        <div key={star} className="flex items-center gap-2 text-xs">
                          <span className="text-slate-500 w-4">{star}</span>
                          <FaStar size={11} className="text-amber-400 shrink-0" />
                          <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                            <div className="bg-amber-400 h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-slate-400 w-4">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <ReviewForm onSubmit={handleAddReview} />

                <div className="space-y-4">
                  {doctor.comments.map(c => (
                    <div key={c.id} className="bg-white rounded-2xl border border-slate-100 p-5 flex gap-4">
                      <img src={c.avatar} alt={c.author} className="w-10 h-10 rounded-full object-cover shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <p className="font-semibold text-slate-900 text-sm">{c.author}</p>
                            <div className="flex gap-0.5 mt-0.5">
                              {Array.from({ length: c.rating }).map((_, i) => <FaStar key={i} size={11} className="text-amber-400" />)}
                            </div>
                          </div>
                          <span className="text-xs text-slate-400 shrink-0">{c.date}</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="lg:sticky lg:top-20 space-y-5">
            {/* Fee card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div>
                  <p className="text-xs text-slate-400">Consultation fee</p>
                  <p className="text-3xl font-extrabold text-slate-900 leading-none mt-1" style={{ fontFamily: 'Outfit' }}>
                    {doctor.consultationFee}
                    <span className="text-base m-2 font-normal text-slate-500 ml-1">{t('price')}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Clinic</p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">{doctor.clinic}</p>
                </div>
              </div>
              <BookingForm
                consultationTypes={doctor.consultationTypes}
                availableSlots={doctor.availableSlots}
                onSuccess={() => {}}
              />
            </div>

            {/* Doctor info chips */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{t('quick_info')}</p>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <RiUserHeartLine size={15} className="text-teal-600 shrink-0" />
                <span>{doctor.reviewCount} patients treated</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <FiGlobe size={15} className="text-teal-600 shrink-0" />
                <span>Speaks: {doctor.languages.join(', ')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <FiMapPin size={15} className="text-teal-600 shrink-0" />
                <span>{doctor.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
