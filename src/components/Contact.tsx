import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Eye } from 'lucide-react';


interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  delay: number;
  isPrivate?: boolean;
}

const ContactInfoCard: React.FC<ContactInfoProps> = ({ icon, title, value, href, delay, isPrivate = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = (e: React.MouseEvent) => {
    if (isPrivate && !isRevealed) {
      e.preventDefault();
      setIsRevealed(true);
    }
  };

  const displayValue = isPrivate && !isRevealed ? "Click to reveal" : value;
  const showEyeIcon = isPrivate && !isRevealed;

  const CardContent = () => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group w-full"
      onClick={handleReveal}
    >
      <div className={`bg-gradient-to-br from-bg-card/60 to-bg-card/40 backdrop-blur-lg border border-border-color rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 relative overflow-hidden h-full ${isPrivate && !isRevealed ? 'cursor-pointer' : 'cursor-default'}`}>
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
        
        <div className="relative z-10 text-center">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300"
          >
            {icon}
          </motion.div>
          
          <h4 className="font-bold text-text-primary mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h4>
          
          <div className="flex items-center justify-center space-x-2">
            <p className={`text-text-secondary group-hover:text-text-primary transition-colors duration-300 break-words ${isPrivate && !isRevealed ? 'text-primary/70 font-medium' : ''}`}>
              {displayValue}
            </p>
            {showEyeIcon && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-primary/70"
              >
                <Eye size={16} />
              </motion.div>
            )}
          </div>
          
          {isPrivate && !isRevealed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-text-secondary/60 mt-1"
            >
              Tap to view {title.toLowerCase()}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );

  // Only make it a link if revealed or not private
  return (href && (isRevealed || !isPrivate)) ? (
    <a href={href} target={href.startsWith('mailto:') ? '_self' : '_blank'} rel="noopener noreferrer" className="block w-full">
      <CardContent />
    </a>
  ) : (
    <CardContent />
  );
};

const Contact: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Google Sheets integration
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwT06_AM7sRbUc1bNB-ThLhX_47XzbRi2VEadJphk1Z7Pa32vZW_aN72RBkBazWYS0v/exec';

    // Prepare URL-encoded form data for Google Sheets
    const formDataToSend = new URLSearchParams();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('message', formData.message);
    formDataToSend.append('timestamp', new Date().toISOString());

    try {
      // Send data to Google Sheets using no-cors for faster submission
      // Note: We can't read the response with no-cors, but it's much faster
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // This makes it fire-and-forget, much faster!
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataToSend.toString(),
      }).catch(error => {
        // Log any network errors, but don't show them to user
        console.log('Network error (expected with no-cors):', error);
      });

      // Show success immediately (optimistic UI)
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        
        // Reset status after 4 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 4000);
      }, 300); // Small delay to show loading state

    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      setSubmitStatus('error');
      
      // Reset status after 4 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 4000);
    }
  };

  const contactInfo = [];

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-24 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
            x: [0, 30, 0]
          }}
          transition={{ 
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 15, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-10 right-10 w-48 h-48 lg:w-72 lg:h-72 bg-gradient-to-br from-primary/4 to-secondary/4 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            y: [0, -30, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ 
            rotate: { duration: 35, repeat: Infinity, ease: "linear" },
            y: { duration: 18, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-10 left-10 w-64 h-64 lg:w-96 lg:h-96 bg-gradient-to-tr from-secondary/4 to-primary/4 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-4 border border-secondary/20"
          >
            Let's work together
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
          >
            Get In <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Touch</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed"
          >
            Have a project in mind? Let's discuss how we can bring your ideas to life. 
            I'm always excited to work on new challenges and create amazing solutions together.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Contact Information - Left Side - Redesigned */}
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-5 order-2 lg:order-1 w-full flex flex-col"
          >
            <div className="space-y-4 flex flex-col h-full justify-between">
              {/* Enhanced CTA Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-text-primary mb-4">
                    Ready to Connect?
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-6">
                    I'm always excited to collaborate on new projects and explore innovative solutions. 
                    Share your ideas through the form, and let's create something extraordinary together!
                  </p>
                  <div className="flex items-center space-x-2 text-primary font-semibold">
                    <Send size={18} />
                    <span>Quick Response Guaranteed</span>
                  </div>
                </div>
              </motion.div>

              {/* Features/Benefits */}
              <div className="space-y-4">
                {[
                  { icon: "💡", title: "Creative Ideas", desc: "Fresh perspectives on your projects" }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="bg-gradient-to-br from-bg-card/50 to-bg-card/30 backdrop-blur-sm border border-border-color rounded-xl p-4 flex items-start space-x-4 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="text-2xl mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold text-text-primary">{item.title}</h4>
                      <p className="text-sm text-text-secondary">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social/Connect Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="bg-gradient-to-br from-bg-card/40 to-bg-card/20 backdrop-blur-sm border border-border-color rounded-xl p-6 text-center"
              >
                <p className="text-text-secondary mb-4">
                  Looking for a different way to connect?
                </p>
                <p className="text-sm text-text-secondary/70">
                  Visit my social profiles or use the contact form for the fastest response
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-7 order-1 lg:order-2 w-full"
          >
            <div className="bg-gradient-to-br from-bg-card/40 to-bg-card/20 backdrop-blur-lg border border-border-color rounded-2xl p-6 lg:p-8 h-full flex flex-col justify-center">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name, Email, and Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <label htmlFor="name" className="block text-sm font-semibold text-text-primary mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 bg-bg-card/60 backdrop-blur-sm border border-border-color rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      placeholder="Enter your name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 bg-bg-card/60 backdrop-blur-sm border border-border-color rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </motion.div>
                </div>

                {/* Phone Number */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <label htmlFor="phone" className="block text-sm font-semibold text-text-primary mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 bg-bg-card/60 backdrop-blur-sm border border-border-color rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <label htmlFor="message" className="block text-sm font-semibold text-text-primary mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2.5 bg-bg-card/60 backdrop-blur-sm border border-border-color rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>

                {/* Success/Error Messages */}
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center space-x-2 p-4 rounded-xl ${
                      submitStatus === 'success' 
                        ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                        : 'bg-red-500/10 border border-red-500/20 text-red-400'
                    }`}
                  >
                    {submitStatus === 'success' ? (
                      <>
                        <CheckCircle size={20} />
                        <span>Message sent successfully! I'll get back to you soon.</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={20} />
                        <span>There was an error sending your message. Please try again.</span>
                      </>
                    )}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 