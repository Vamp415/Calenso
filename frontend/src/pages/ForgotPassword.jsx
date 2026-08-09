import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Section } from '../components/ui/Section';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const result = await forgotPassword(email);

    if (result.success) {
      setSuccess('If an account exists with this email, a password reset link has been sent.');
      setSubmitted(true);
    } else {
      setError(result.error);
    }

    setLoading(false);
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
              <h1 className="heading-hero text-4xl mb-3">Forgot password?</h1>
              <p className="text-muted-foreground">
                {submitted
                  ? 'Check your email for the reset link'
                  : 'Enter your email to receive a password reset link'}
              </p>
            </div>

            <Card variant="elevated">
              <CardContent className="p-8">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
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
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                          autoComplete="username"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      variant="gradient"
                      className="w-full gap-2"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send reset link'}
                      {!loading && <ArrowRight size={20} />}
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center py-8"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <CheckCircle2 size={32} className="text-primary" />
                      </div>
                      <p className="text-center text-muted-foreground">{success}</p>
                    </motion.div>

                    <Button
                      onClick={() => {
                        setSubmitted(false);
                        setEmail('');
                        setSuccess('');
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Try another email
                    </Button>
                  </div>
                )}

                <div className="mt-6 text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ArrowLeft size={16} />
                    Back to login
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
