import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import AuthLayout from './AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function Login() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
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
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address.';
    if (!form.password) errs.password = 'Password is required.';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    // Simulate successful login
    login({ id: 1, name: 'Demo User', email: form.email });
    addToast(t('auth.login_success'), 'success');
    setLoading(false);
    navigate('/');
  };

  return (
    <AuthLayout title={t('auth.login_title')} subtitle={t('auth.login_subtitle')}>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label={t('auth.email')} name="email" type="email"
          value={form.email} onChange={handleChange} error={errors.email}
          placeholder={t('auth.email_placeholder')} required icon={FiMail}
        />
        <div className="relative">
          <Input
            label={t('auth.password')} name="password"
            type={showPass ? 'text' : 'password'}
            value={form.password} onChange={handleChange} error={errors.password}
            placeholder={t('auth.password_placeholder')} required icon={FiLock}
          />
          <button
            type="button"
            onClick={() => setShowPass(p => !p)}
            className="absolute right-3 top-8 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
            <input type="checkbox" className="rounded border-slate-300 text-teal-600" />
            {t('auth.remember')}
          </label>
          <Link to="/forgot-password" className="text-sm text-teal-700 hover:text-teal-800 font-medium">
            {t('auth.forgot')}
          </Link>
        </div>

        <Button type="submit" className="w-full mt-2" size="lg" loading={loading}>
          {t('auth.login_btn')}
        </Button>

        {/* Demo hint */}
        {/* <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
          <p className="text-xs text-slate-500">Demo: use any valid email + 6+ char password</p>
        </div> */}
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        {t('auth.no_account')}{' '}
        <Link to="/register" className="text-teal-700 font-semibold hover:text-teal-800">
          {t('auth.register_btn')}
        </Link>
      </p>
    </AuthLayout>
  );
}
