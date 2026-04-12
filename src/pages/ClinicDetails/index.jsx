import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft, FiMapPin, FiPhone, FiMail, FiClock, FiCheckCircle } from 'react-icons/fi';
import { clinics } from '../../data/clinics';
import StarRating from '../../components/ui/StarRating';
import Badge from '../../components/ui/Badge';
import BookingForm from '../../components/common/BookingForm';

export default function ClinicDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const clinic = clinics.find(c => c.id === Number(id));
  const [activeTab, setActiveTab] = useState('overview');

  if (!clinic) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold text-slate-900">Clinic not found</h2>
      <Link to="/clinics" className="text-teal-700 flex items-center gap-2 hover:underline">
        <FiArrowLeft size={16} /> Back to Clinics
      </Link>
    </div>
  );

  const tabs = ['overview', 'doctors', 'booking'];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Cover */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={clinic.cover} alt={clinic.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <Link to="/clinics" className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4">
            <FiArrowLeft size={16} /> {t('common.back')}
          </Link>
          <h1 className="text-3xl font-extrabold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{clinic.name}</h1>
          <div className="flex items-center gap-3 mt-2">
            <StarRating rating={clinic.rating} reviewCount={clinic.reviewCount} size={13} />
            <Badge variant="teal">{clinic.specialty}</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-slate-100 rounded-xl p-1 mb-8 w-fit">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'bg-teal-700 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-3">About</h2>
                  <p className="text-slate-600 text-sm leading-relaxed">{clinic.description}</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-4">Services</h2>
                  <div className="flex flex-wrap gap-2">
                    {clinic.services.map(s => <Badge key={s} variant="teal">{s}</Badge>)}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {clinic.amenities.map(a => (
                      <div key={a} className="flex items-center gap-2 text-sm text-slate-600">
                        <FiCheckCircle size={14} className="text-teal-500 shrink-0" /> {a}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-4">Insurance Accepted</h2>
                  <div className="flex flex-wrap gap-2">
                    {clinic.insurances.map(ins => <Badge key={ins} variant="green">{ins}</Badge>)}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'doctors' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {clinic.doctors.map(doc => (
                  <Link key={doc.id} to={`/doctors/${doc.id}`}
                    className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 card-hover"
                  >
                    <img src={doc.avatar} alt={doc.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{doc.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{doc.specialty}</p>
                      <Badge variant="teal" className="mt-2">View Profile</Badge>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {activeTab === 'booking' && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <BookingForm
                  consultationTypes={clinic.services.slice(0, 4)}
                  availableSlots={['09:00','10:00','11:00','14:00','15:00','16:00']}
                />
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
                  <span>{clinic.address}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <FiPhone size={15} className="text-teal-600 shrink-0" />
                  <a href={`tel:${clinic.phone}`} className="hover:text-teal-700">{clinic.phone}</a>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <FiMail size={15} className="text-teal-600 shrink-0" />
                  <a href={`mailto:${clinic.email}`} className="hover:text-teal-700 truncate">{clinic.email}</a>
                </div>
                <div className="flex items-start gap-3 text-slate-600">
                  <FiClock size={15} className="text-teal-600 shrink-0 mt-0.5" />
                  <span>{clinic.openHours}</span>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 text-center">
              <p className="text-sm font-semibold text-teal-800 mb-1">Need urgent care?</p>
              <p className="text-xs text-teal-600 mb-3">Call us directly for emergency appointments</p>
              <a href={`tel:${clinic.phone}`}
                className="block w-full py-2.5 bg-teal-700 text-white text-sm font-semibold rounded-xl hover:bg-teal-800 transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
