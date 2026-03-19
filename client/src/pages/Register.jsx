import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle2, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

const PASSWORD_RULES = [
  { id: 'length',  label: 'At least 8 characters',         test: (v) => v.length >= 8 },
  { id: 'upper',   label: 'One uppercase letter',           test: (v) => /[A-Z]/.test(v) },
  { id: 'number',  label: 'One number',                     test: (v) => /\d/.test(v) },
  { id: 'special', label: 'One special character (!@#…)',   test: (v) => /[^A-Za-z0-9]/.test(v) },
];

const getStrength = (value) => {
  if (!value) return { score: 0, label: '', color: '' };
  const passed = PASSWORD_RULES.filter((r) => r.test(value)).length;
  if (passed <= 1) return { score: 1, label: 'Weak',   color: 'bg-red-400'    };
  if (passed === 2) return { score: 2, label: 'Fair',   color: 'bg-amber-400'  };
  if (passed === 3) return { score: 3, label: 'Good',   color: 'bg-blue-400'   };
  return               { score: 4, label: 'Strong', color: 'bg-green-500'  };
};

const InputField = ({ label, icon: Icon, error, success, children, hint }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Icon
          className={`w-4 h-4 transition-colors ${
            error ? 'text-red-400' : success ? 'text-green-500' : 'text-gray-400'
          }`}
        />
      </div>
      {children}
      <AnimatePresence>
        {(error || success) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            {error
              ? <AlertCircle className="w-4 h-4 text-red-400" />
              : <CheckCircle2 className="w-4 h-4 text-green-500" />
            }
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    <AnimatePresence mode="wait">
      {error && (
        <motion.p
          key="error"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="flex items-center gap-1.5 text-xs text-red-600"
        >
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </motion.p>
      )}
      {hint && !error && (
        <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-gray-400">
          {hint}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const PasswordStrengthMeter = ({ value }) => {
  const strength = getStrength(value);
  if (!value) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-2 overflow-hidden"
    >
      <div className="flex items-center gap-2">
        <div className="flex-1 flex gap-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-1 flex-1 rounded-full bg-gray-100 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${i <= strength.score ? strength.color : 'bg-transparent'}`}
                initial={{ width: 0 }}
                animate={{ width: i <= strength.score ? '100%' : '0%' }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
              />
            </div>
          ))}
        </div>
        <span className={`text-xs font-medium w-12 text-right
          ${strength.score === 1 ? 'text-red-500' :
            strength.score === 2 ? 'text-amber-500' :
            strength.score === 3 ? 'text-blue-500' : 'text-green-600'}`}>
          {strength.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-1">
        {PASSWORD_RULES.map((rule) => {
          const passed = rule.test(value);
          return (
            <div key={rule.id} className={`flex items-center gap-1.5 text-xs transition-colors ${passed ? 'text-green-600' : 'text-gray-400'}`}>
              {passed
                ? <Check className="w-3 h-3 flex-shrink-0" />
                : <X className="w-3 h-3 flex-shrink-0" />
              }
              {rule.label}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields, isSubmitted },
  } = useForm({ mode: 'onTouched' });

  const passwordValue = watch('password', '');
  const nameValue     = watch('name', '');
  const emailValue    = watch('email', '');
  const confirmValue  = watch('confirmPassword', '');

  const isValid = (field, value) =>
    value && !errors[field] && (touchedFields[field] || isSubmitted);

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError('');
    try {
      await registerUser(data);
      toast.success('Account created! Welcome 🎉');
      navigate('/dashboard');
    } catch (error) {
      const msg    = error.response?.data?.message;
      const status = error.response?.status;

      if (status === 409 || msg?.toLowerCase().includes('already exists')) {
        setServerError('An account with this email already exists. Try signing in instead.');
      } else if (status === 422 || status === 400) {
        setServerError(msg || 'Please check your details and try again.');
      } else if (!error.response) {
        setServerError('Unable to connect. Please check your internet connection.');
      } else {
        setServerError(msg || 'Something went wrong. Please try again.');
      }

      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field, extraRight = false) =>
    `w-full pl-9 ${extraRight ? 'pr-16' : 'pr-9'} py-2.5 text-sm border rounded-xl outline-none transition-all duration-150 ${
      errors[field]
        ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-400'
        : isValid(field, watch(field))
        ? 'border-green-300 bg-green-50 focus:ring-2 focus:ring-green-200 focus:border-green-400'
        : 'border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:bg-white'
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl mb-4"
            >
              <UserPlus className="w-7 h-7 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900">Create account</h2>
            <p className="mt-1 text-sm text-gray-500">Build and share your portfolio</p>
          </div>

          <AnimatePresence>
            {serverError && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-start gap-3 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{serverError}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

            <InputField
              label="Full name"
              icon={User}
              error={errors.name?.message}
              success={isValid('name', nameValue)}
            >
              <input
                type="text"
                autoComplete="name"
                {...register('name', {
                  required: 'Full name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' },
                  maxLength: { value: 60, message: 'Name is too long' },
                  pattern: {
                    value: /^[a-zA-Z\s'-]+$/,
                    message: 'Name can only contain letters, spaces, hyphens or apostrophes',
                  },
                })}
                className={inputClass('name')}
                placeholder="John Doe"
              />
            </InputField>

            <InputField
              label="Email address"
              icon={Mail}
              error={errors.email?.message}
              success={isValid('email', emailValue)}
            >
              <input
                type="email"
                autoComplete="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Enter a valid email address',
                  },
                })}
                className={inputClass('email')}
                placeholder="john@example.com"
              />
            </InputField>

            <div className="space-y-2">
              <InputField
                label="Password"
                icon={Lock}
                error={errors.password?.message}
                success={isValid('password', passwordValue) && getStrength(passwordValue).score >= 3}
              >
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' },
                  })}
                  className={inputClass('password', true)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-0.5"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </InputField>

              <AnimatePresence>
                {passwordValue && (
                  <PasswordStrengthMeter value={passwordValue} />
                )}
              </AnimatePresence>
            </div>

            <InputField
              label="Confirm password"
              icon={Lock}
              error={errors.confirmPassword?.message}
              success={isValid('confirmPassword', confirmValue) && confirmValue === passwordValue}
            >
              <input
                type={showConfirm ? 'text' : 'password'}
                autoComplete="new-password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === passwordValue || 'Passwords do not match',
                })}
                className={inputClass('confirmPassword', true)}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-0.5"
                tabIndex={-1}
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </InputField>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-1"
            >
              {loading ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block"
                  />
                  Creating account…
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Create account
                </>
              )}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;