import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  MessageSquare, Github, MapPin, Briefcase, Clock, Send,
  CheckCircle2, AlertCircle, ArrowUpRight, Copy, Check, Mail, Sparkles
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { SectionHeading } from './About';
import { SectionDivider } from './illustrations';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [dispatchDetails, setDispatchDetails] = useState(null);
  const [copied, setCopied] = useState(false);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  // Email validation regex
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Full Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email address is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        return '';
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 3) return 'Subject must be at least 3 characters';
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);

    const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

    // Build prefilled WhatsApp message
    const waText = `Hi Intikhab! 👋\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Subject:* ${formData.subject}\n\n*Message:*\n${formData.message}`;
    const waUrl = `https://wa.me/923299599805?text=${encodeURIComponent(waText)}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${formData.subject}`
    )}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
    )}`;

    if (formspreeEndpoint) {
      try {
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmitSuccess(true);
          setDispatchDetails({ type: 'api', waUrl, mailtoUrl });
          setFormData({ name: '', email: '', subject: '', message: '' });
          setTouched({});
        } else {
          throw new Error('API submission failed');
        }
      } catch (err) {
        // Fallback to direct client dispatch
        setSubmitSuccess(true);
        setDispatchDetails({ type: 'direct', waUrl, mailtoUrl });
      } finally {
        setSubmitting(false);
      }
    } else {
      // Direct honest dispatch workflow: validate, show instant dispatch options
      setTimeout(() => {
        setSubmitting(false);
        setSubmitSuccess(true);
        setDispatchDetails({ type: 'direct', waUrl, mailtoUrl });
      }, 600);
    }
  };

  const handleCopyMessage = () => {
    const fullText = `From: ${formData.name || 'Visitor'}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\n${formData.message}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      id="contact"
      className="relative z-10 py-24 md:py-32 px-5 sm:px-8 md:px-12 lg:px-16"
      aria-label="Contact Intikhab Alam"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 bottom-10 -translate-x-1/2 w-[650px] h-[350px] opacity-20"
        style={{
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.15) 50%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's Work"
          highlight="Together"
          subtitle="Have a project in mind, an internship opportunity, or just want to say hi? Send me a message below."
        />

        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
        >
          {/* ═══ LEFT COLUMN: Contact Information Cards ═══ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* Header Identity Card */}
            <div className="glass-card rounded-2xl p-6 border border-white/[0.08] relative overflow-hidden">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/30 to-blue-600/30 border border-purple-500/30 flex items-center justify-center font-heading font-bold text-lg text-white shadow-glow-purple">
                  IA
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">Intikhab Alam</h3>
                  <p className="text-xs font-mono text-purple-300">Web &amp; MERN Stack Developer</p>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Currently in the 2nd year of my Diploma in Information Technology (DIT) in Pakistan, actively building real-world web apps and open to internships.
              </p>
            </div>

            {/* WhatsApp Direct Card */}
            <a
              href="https://wa.me/923299599805"
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card glass-card-hover rounded-xl p-4 border border-white/[0.08] hover:border-emerald-500/40 flex items-center justify-between transition-all"
              data-cursor="pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    WhatsApp (Fastest Response)
                  </span>
                  <span className="text-sm font-mono font-medium text-white group-hover:text-emerald-300 transition-colors">
                    03299599805
                  </span>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com/intikhab-alam-12"
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card glass-card-hover rounded-xl p-4 border border-white/[0.08] hover:border-purple-500/40 flex items-center justify-between transition-all"
              data-cursor="pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
                  <Github size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    GitHub Profile
                  </span>
                  <span className="text-sm font-mono font-medium text-white group-hover:text-purple-300 transition-colors">
                    @intikhab-alam-12
                  </span>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-slate-500 group-hover:text-purple-400 transition-colors" />
            </a>

            {/* Location & Availability Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-card rounded-xl p-3.5 border border-white/[0.06]">
                <div className="flex items-center gap-2 text-blue-400 mb-1">
                  <MapPin size={14} />
                  <span className="text-[10px] font-mono uppercase text-slate-500">Location</span>
                </div>
                <div className="text-xs font-semibold text-slate-200">Pakistan</div>
                <div className="text-[10px] font-mono text-slate-500 mt-0.5">UTC+5 (PKT)</div>
              </div>

              <div className="glass-card rounded-xl p-3.5 border border-white/[0.06]">
                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                  <Briefcase size={14} />
                  <span className="text-[10px] font-mono uppercase text-slate-500">Status</span>
                </div>
                <div className="text-xs font-semibold text-emerald-300">Open to Internships</div>
                <div className="text-[10px] font-mono text-slate-500 mt-0.5">Junior Roles</div>
              </div>
            </div>

            {/* Target Response Time Card */}
            <div className="glass-card rounded-xl p-4 border border-white/[0.06] flex items-center gap-3 text-xs text-slate-400">
              <Clock size={16} className="text-amber-400 flex-shrink-0" />
              <div>
                <span className="text-slate-300 font-medium">Response Time: </span>
                Within 24 hours (target)
              </div>
            </div>
          </motion.div>

          {/* ═══ RIGHT COLUMN: Animated Contact Form ═══ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] shadow-glass relative">
              {submitSuccess ? (
                /* Honest Success / Direct Dispatch View */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-glow-purple">
                    <CheckCircle2 size={32} />
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white mb-2">
                    Message Ready for Intikhab!
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md mx-auto mb-6">
                    To guarantee your message reaches Intikhab immediately without server delays, click below to send via WhatsApp or open your email client:
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                    <a
                      href={dispatchDetails?.waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 shadow-glow-purple transition-all"
                      data-cursor="pointer"
                    >
                      <MessageSquare size={15} />
                      <span>Send via WhatsApp (Instant)</span>
                      <ArrowUpRight size={14} />
                    </a>

                    <a
                      href={dispatchDetails?.mailtoUrl}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] transition-colors"
                      data-cursor="pointer"
                    >
                      <Mail size={15} />
                      <span>Open in Email App</span>
                    </a>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-center gap-4">
                    <button
                      onClick={handleCopyMessage}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                    >
                      {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                      <span>{copied ? 'Copied to Clipboard!' : 'Copy Form Content'}</span>
                    </button>
                    <span className="text-slate-700">·</span>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="text-xs font-mono text-purple-400 hover:underline"
                    >
                      Write Another Message
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Active Contact Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06]">
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                      <Sparkles size={13} className="text-purple-400" />
                      <span>Direct Message Pipeline</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Validated
                    </span>
                  </div>

                  {/* Row 1: Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono text-slate-300 mb-1.5">
                        Full Name <span className="text-purple-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. Alex Morgan"
                        className={`
                          w-full px-4 py-2.5 rounded-xl text-xs font-sans text-white bg-white/[0.03]
                          border transition-all duration-200 outline-none
                          ${errors.name
                            ? 'border-red-500/50 focus:border-red-500'
                            : 'border-white/[0.08] focus:border-purple-500 focus:shadow-[0_0_15px_rgba(139,92,246,0.3)]'}
                        `}
                      />
                      {errors.name && (
                        <p className="mt-1 text-[11px] font-mono text-red-400 flex items-center gap-1">
                          <AlertCircle size={11} /> {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-mono text-slate-300 mb-1.5">
                        Email Address <span className="text-purple-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="alex@company.com"
                        className={`
                          w-full px-4 py-2.5 rounded-xl text-xs font-sans text-white bg-white/[0.03]
                          border transition-all duration-200 outline-none
                          ${errors.email
                            ? 'border-red-500/50 focus:border-red-500'
                            : 'border-white/[0.08] focus:border-purple-500 focus:shadow-[0_0_15px_rgba(139,92,246,0.3)]'}
                        `}
                      />
                      {errors.email && (
                        <p className="mt-1 text-[11px] font-mono text-red-400 flex items-center gap-1">
                          <AlertCircle size={11} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-xs font-mono text-slate-300 mb-1.5">
                      Subject <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Internship opportunity / Web Development Project"
                      className={`
                        w-full px-4 py-2.5 rounded-xl text-xs font-sans text-white bg-white/[0.03]
                        border transition-all duration-200 outline-none
                        ${errors.subject
                          ? 'border-red-500/50 focus:border-red-500'
                          : 'border-white/[0.08] focus:border-purple-500 focus:shadow-[0_0_15px_rgba(139,92,246,0.3)]'}
                      `}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-[11px] font-mono text-red-400 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono text-slate-300 mb-1.5">
                      Message <span className="text-purple-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Hi Intikhab, I came across your portfolio and would love to discuss..."
                      className={`
                        w-full px-4 py-2.5 rounded-xl text-xs font-sans text-white bg-white/[0.03]
                        border transition-all duration-200 outline-none resize-none
                        ${errors.message
                          ? 'border-red-500/50 focus:border-red-500'
                          : 'border-white/[0.08] focus:border-purple-500 focus:shadow-[0_0_15px_rgba(139,92,246,0.3)]'}
                      `}
                    />
                    {errors.message && (
                      <p className="mt-1 text-[11px] font-mono text-red-400 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="
                      w-full py-3.5 rounded-xl text-xs font-semibold text-white
                      bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600
                      hover:from-purple-500 hover:to-blue-500
                      shadow-glow-purple disabled:opacity-60 transition-all duration-200
                      flex items-center justify-center gap-2 cursor-pointer
                    "
                    data-cursor="pointer"
                  >
                    {submitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Validating Message...</span>
                      </span>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Section Divider */}
        <SectionDivider variant="wave" className="mt-14 opacity-70" />
      </div>
    </section>
  );
}

