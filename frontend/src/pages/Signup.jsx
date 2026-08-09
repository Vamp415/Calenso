import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, ArrowRight, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Section } from '../components/ui/Section';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export function Signup() {
  const navigate = useNavigate();
  const { signup, verifyOTP, resendOTP } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    username: '',
    otp: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signup(formData.email, formData.password, formData.name, formData.username);

    if (result.success) {
      setSuccess('Account created! Please check your email for the OTP.');
      setStep(2);
      startResendTimer();
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await verifyOTP(formData.email, formData.otp);

    if (result.success) {
      setSuccess('Email verified successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setError('');
    setResendLoading(true);

    const result = await resendOTP(formData.email);

    if (result.success) {
      setSuccess('New OTP sent to your email');
      startResendTimer();
    } else {
      setError(result.error);
    }

    setResendLoading(false);
  };

  const startResendTimer = () => {
    setResendTimer(60);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <Section spacing="lg" minHeight="default">
      <div className="container-custom">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h1 className="heading-hero text-4xl mb-3">Create account</h1>
              <p className="text-muted-foreground">
                {step === 1 ? 'Sign up to get started with Calenso' : 'Verify your email address'}
              </p>
            </div>

            <Card variant="elevated">
              <CardContent className="p-8">
                {step === 1 ? (
                  <form onSubmit={handleSignup} className="space-y-6">
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm"
                      >
                        <AlertCircle size={16} />
                        <span>{error}</span>
                      </motion.div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <div className="relative">
                        <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          id="username"
                          name="username"
                          type="text"
                          placeholder="johndoe"
                          value={formData.username}
                          onChange={handleChange}
                          className="pl-10"
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Only letters, numbers, underscores and hyphens allowed
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-10"
                          required
                          autoComplete="username"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleChange}
                          className="pl-10"
                          required
                          autoComplete="new-password"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Minimum 8 characters</p>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      variant="gradient"
                      className="w-full gap-2"
                      disabled={loading}
                    >
                      {loading ? 'Creating account...' : 'Create account'}
                      {!loading && <ArrowRight size={20} />}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOTP} className="space-y-6">
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 text-primary text-sm"
                      >
                        <CheckCircle2 size={16} />
                        <span>{success}</span>
                      </motion.div>
                    )}

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm"
                      >
                        <AlertCircle size={16} />
                        <span>{error}</span>
                      </motion.div>
                    )}

                    <div className="text-center py-4">
                      <p className="text-muted-foreground mb-2">
                        Enter the 6-digit OTP sent to
                      </p>
                      <p className="font-medium">{formData.email}</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="otp">OTP Code</Label>
                      <Input
                        id="otp"
                        name="otp"
                        type="text"
                        placeholder="123456"
                        value={formData.otp}
                        onChange={handleChange}
                        maxLength={6}
                        className="text-center text-2xl tracking-widest"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      variant="gradient"
                      className="w-full gap-2"
                      disabled={loading}
                    >
                      {loading ? 'Verifying...' : 'Verify email'}
                      {!loading && <CheckCircle2 size={20} />}
                    </Button>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={resendLoading || resendTimer > 0}
                        className="text-sm text-primary hover:underline disabled:text-muted-foreground disabled:no-underline flex items-center gap-2 mx-auto"
                      >
                        {resendLoading ? (
                          <>
                            <RefreshCw size={14} className="animate-spin" />
                            Sending...
                          </>
                        ) : resendTimer > 0 ? (
                          `Resend OTP in ${resendTimer}s`
                        ) : (
                          'Resend OTP'
                        )}
                      </button>
                    </div>
                  </form>
                )}

                <div className="mt-6 text-center">
                  <p className="text-muted-foreground text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
