import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

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
        <motion.p
          key="hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-gray-400"
        >
          {hint}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields, isSubmitted },
  } = useForm({ mode: 'onTouched' });

  const emailValue = watch('email', '');
  const passwordValue = watch('password', '');

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError('');
    try {
      await login(data);
      toast.success('Welcome back!', { icon: '👋' });
      navigate('/dashboard');
    } catch (error) {
      const attempts = loginAttempts + 1;
      setLoginAttempts(attempts);

      const msg = error.response?.data?.message;
      const status = error.response?.status;

      if (status === 429) {
        setServerError('Too many login attempts. Please wait 15 minutes before trying again.');
      } else if (status === 401) {
        setServerError(
          attempts >= 3
            ? 'Incorrect credentials. If you forgot your password, use the reset link below.'
            : 'Incorrect email or password. Please try again.'
        );
      } else if (!error.response) {
        setServerError('Unable to connect. Please check your internet connection.');
      } else {
        setServerError(msg || 'Something went wrong. Please try again.');
      }

      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const isEmailValid = emailValue && !errors.email && (touchedFields.email || isSubmitted);
  const isPasswordValid = passwordValue && !errors.password && (touchedFields.password || isSubmitted);

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
              <LogIn className="w-7 h-7 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-1 text-sm text-gray-500">Sign in to your portfolio account</p>
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
              label="Email address"
              icon={Mail}
              error={errors.email?.message}
              success={isEmailValid}
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
                className={`w-full pl-9 pr-9 py-2.5 text-sm border rounded-xl outline-none transition-all duration-150
                  ${errors.email
                    ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-400'
                    : isEmailValid
                    ? 'border-green-300 bg-green-50 focus:ring-2 focus:ring-green-200 focus:border-green-400'
                    : 'border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:bg-white'
                  }`}
                placeholder="john@example.com"
              />
            </InputField>

            <InputField
              label="Password"
              icon={Lock}
              error={errors.password?.message}
              success={isPasswordValid}
            >
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                className={`w-full pl-9 pr-16 py-2.5 text-sm border rounded-xl outline-none transition-all duration-150
                  ${errors.password
                    ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-400'
                    : isPasswordValid
                    ? 'border-green-300 bg-green-50 focus:ring-2 focus:ring-green-200 focus:border-green-400'
                    : 'border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:bg-white'
                  }`}
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

            <div className="flex justify-end -mt-2">
              <Link
                to="/forgot-password"
                className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block"
                  />
                  Signing in…
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign in
                </>
              )}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;