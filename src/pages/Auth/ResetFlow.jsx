import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMail, FiArrowLeft, FiSend } from 'react-icons/fi';
import AuthLayout from './AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

export function ForgotPassword() {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { setError('Email is required.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Invalid email address.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    addToast('Verification code sent to your email!', 'info');
    navigate('/verify-code', { state: { email } });
  };

  return (
    <AuthLayout title="Forgot Password" subtitle="Enter your email and we'll send you a reset code">
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <Input
          label={t('auth.email')} name="email" type="email"
          value={email} onChange={e => { setEmail(e.target.value); setError(''); }}
          error={error} placeholder="your@email.com" required icon={FiMail}
        />
        <Button type="submit" className="w-full" size="lg" loading={loading}>
          <FiSend size={16} /> Send Reset Code
        </Button>
      </form>
      <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-teal-700 mt-6 transition-colors">
        <FiArrowLeft size={15} /> Back to Login
      </Link>
    </AuthLayout>
  );
}

export function VerifyCode() {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDigit = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...code];
    next[i] = val;
    setCode(next);
    setError('');
    if (val && i < 5) {
      document.getElementById(`digit-${i + 1}`)?.focus();
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) {
      document.getElementById(`digit-${i - 1}`)?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const full = code.join('');
    if (full.length < 6) { setError('Please enter the full 6-digit code.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    addToast('Code verified successfully!', 'success');
    navigate('/update-password');
  };

  return (
    <AuthLayout title={t('auth.verify_title')} subtitle={`${t('auth.verify_desc')} your email`}>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="flex justify-center gap-3">
          {code.map((d, i) => (
            <input
              key={i}
              id={`digit-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={e => handleDigit(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              className={`w-11 h-14 text-center text-xl font-bold border rounded-xl outline-none transition-all
                ${d ? 'border-teal-500 bg-teal-50 text-teal-800' : 'border-slate-200 bg-white text-slate-900'}
                focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10
                ${error ? 'border-red-400' : ''}
              `}
            />
          ))}
        </div>
        {error && <p className="text-center text-xs text-red-500">{error}</p>}

        <Button type="submit" className="w-full" size="lg" loading={loading}>
          Verify Code
        </Button>
      </form>
      <p className="text-center text-sm text-slate-500 mt-6">
        Didn't receive the code?{' '}
        <button className="text-teal-700 font-semibold hover:text-teal-800">Resend</button>
      </p>
    </AuthLayout>
  );
}

export function UpdatePassword() {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.password) errs.password = 'Password is required.';
    else if (form.password.length < 8) errs.password = 'Minimum 8 characters.';
    if (form.confirm !== form.password) errs.confirm = 'Passwords do not match.';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    addToast('Password updated successfully!', 'success');
    navigate('/login');
  };

  return (
    <AuthLayout title={t('auth.reset_title')} subtitle="Create a new secure password for your account">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label={t('auth.new_password')} name="password" type="password"
          value={form.password} onChange={handleChange} error={errors.password}
          placeholder="Min. 8 characters" required
        />
        <Input
          label={t('auth.confirm_new')} name="confirm" type="password"
          value={form.confirm} onChange={handleChange} error={errors.confirm}
          placeholder="Repeat new password" required
        />
        <Button type="submit" className="w-full mt-2" size="lg" loading={loading}>
          {t('auth.reset_btn')}
        </Button>
      </form>
    </AuthLayout>
  );
}
