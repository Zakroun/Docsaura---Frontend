import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import AuthLayout from './AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function Register() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address.';
    if (!form.password) errs.password = 'Password is required.';
    else if (form.password.length < 8) errs.password = 'Password must be at least 8 characters.';
    if (form.confirm !== form.password) errs.confirm = 'Passwords do not match.';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    login({ id: 1, name: form.name, email: form.email });
    addToast('Account created! Welcome to DocsAura.', 'success');
    setLoading(false);
    navigate('/');
  };

  const strength = form.password.length === 0 ? 0
    : form.password.length < 6 ? 1
    : form.password.length < 10 ? 2 : 3;
  const strengthLabels = ['', 'Weak', 'Fair', 'Strong'];
  const strengthColors = ['', 'bg-red-400', 'bg-amber-400', 'bg-emerald-500'];

  return (
    <AuthLayout title={t('auth.register_title')} subtitle="Join thousands of patients on DocsAura">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label={t('auth.name')} name="name"
          value={form.name} onChange={handleChange} error={errors.name}
          placeholder="Aicha Bennani" required icon={FiUser}
        />
        <Input
          label={t('auth.email')} name="email" type="email"
          value={form.email} onChange={handleChange} error={errors.email}
          placeholder="your@email.com" required icon={FiMail}
        />
        <div>
          <div className="relative">
            <Input
              label={t('auth.password')} name="password"
              type={showPass ? 'text' : 'password'}
              value={form.password} onChange={handleChange} error={errors.password}
              placeholder="Min. 8 characters" required icon={FiLock}
            />
            <button type="button" onClick={() => setShowPass(p => !p)}
              className="absolute right-3 top-8 text-slate-400 hover:text-slate-600"
            >
              {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
          {form.password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex gap-1 flex-1">
                {[1,2,3].map(i => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${strength >= i ? strengthColors[strength] : 'bg-slate-200'}`} />
                ))}
              </div>
              <span className="text-xs text-slate-500">{strengthLabels[strength]}</span>
            </div>
          )}
        </div>
        <div className="relative">
          <Input
            label={t('auth.confirm_password')} name="confirm"
            type={showPass ? 'text' : 'password'}
            value={form.confirm} onChange={handleChange} error={errors.confirm}
            placeholder="Repeat your password" required icon={FiLock}
          />
        </div>

        <div className="flex items-start gap-2 pt-1">
          <input type="checkbox" required id="terms" className="mt-0.5 rounded border-slate-300 text-teal-600" />
          <label htmlFor="terms" className="text-xs text-slate-500 cursor-pointer">
            I agree to the{' '}
            <a href="#" className="text-teal-700 font-medium hover:underline">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-teal-700 font-medium hover:underline">Privacy Policy</a>
          </label>
        </div>

        <Button type="submit" className="w-full mt-2" size="lg" loading={loading}>
          {t('auth.register_btn')}
        </Button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        {t('auth.have_account')}{' '}
        <Link to="/login" className="text-teal-700 font-semibold hover:text-teal-800">
          {t('auth.login_btn')}
        </Link>
      </p>
    </AuthLayout>
  );
}
