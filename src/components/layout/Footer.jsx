import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RiHeartPulseLine } from 'react-icons/ri';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-teal-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
                <RiHeartPulseLine size={18} color="white" />
              </div>
              <span className="font-bold text-xl text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Docs<span className="text-teal-400">Aura</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-5">
              Morocco's leading healthcare platform connecting patients with the best doctors, clinics, and labs.
            </p>
            <div className="flex gap-3">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center hover:bg-teal-700 hover:text-white text-white transition-colors">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: '/doctors', label: t('nav.doctors') },
                { to: '/clinics', label: t('nav.clinics') },
                { to: '/labs', label: t('nav.labs') },
                { to: '/about', label: t('nav.about') },
                { to: '/contact', label: t('nav.contact') },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-teal-400 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm">
              {['Online Booking', 'Video Consultations', 'Lab Tests', 'Emergency Care', 'Home Visits', 'Health Packages'].map(s => (
                <li key={s}><span className="hover:text-teal-400 transition-colors cursor-default">{s}</span></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <FiMapPin size={15} className="mt-0.5 shrink-0 text-teal-500" />
                <span>123 Avenue Mohammed V, Rabat, Morocco</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone size={15} className="shrink-0 text-teal-500" />
                <a href="tel:+212537001122" className="hover:text-teal-400 transition-colors">+212 537 00 11 22</a>
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail size={15} className="shrink-0 text-teal-500" />
                <a href="mailto:hello@docsaura.ma" className="hover:text-teal-400 transition-colors">hello@docsaura.ma</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2025 DocsAura. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
