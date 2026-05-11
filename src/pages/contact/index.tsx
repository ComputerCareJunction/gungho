import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import en from '../../locales/en.json';
import Seo from '../../components/Seo';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(en.contactPage.formSubmittedLog, formData);
    alert(en.contactPage.formSubmittedAlert);
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: en.contactPage.contactInfo.emailUs,
      details: en.contactPage.contactInfo.emailDetails,
      color: "orange"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: en.contactPage.contactInfo.callUs,
      details: en.contactPage.contactInfo.phoneDetails,
      color: "orange"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: en.contactPage.contactInfo.visitUs,
      details: en.contactPage.contactInfo.visitDetails,
      color: "orange"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: en.contactPage.contactInfo.businessHours,
      details: en.contactPage.contactInfo.businessHoursDetails,
      color: "orange"
    }
  ];

  return (
    <>
      <Seo
        title={en.seo.contactTitle}
        description={en.seo.contactDescription}
        path="/contact"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/90 py-16">
        <div className="page-content-inset text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {en.contactPage.title}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {en.contactPage.subtitle}
          </p>
        </div>
      </div>

      <div className="page-content-inset py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
              <h2 className="text-3xl font-bold text-white mb-6">{en.contactPage.sendMessageTitle}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/70 mb-2">{en.contactPage.fields.fullName}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-primary focus:outline-none transition-colors"
                      placeholder={en.contactPage.placeholders.name}
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-2">{en.contactPage.fields.email}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-primary focus:outline-none transition-colors"
                      placeholder={en.contactPage.placeholders.email}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/70 mb-2">{en.contactPage.fields.phone}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-primary focus:outline-none transition-colors"
                      placeholder={en.contactPage.placeholders.phone}
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-2">{en.contactPage.fields.serviceInterested}</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="">{en.contactPage.placeholders.service}</option>
                      <option value="event-management">{en.contactPage.serviceOptions.eventManagement}</option>
                      <option value="marketing-services">{en.contactPage.serviceOptions.marketingServices}</option>
                      <option value="both">{en.contactPage.serviceOptions.bothServices}</option>
                      <option value="other">{en.contactPage.serviceOptions.other}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 mb-2">{en.contactPage.fields.message}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-primary focus:outline-none transition-colors resize-none"
                    placeholder={en.contactPage.placeholders.message}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {en.contactPage.sendMessageButton}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-white/70 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Width Google Map */}
        <div className="mt-8 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="h-96 md:h-96 overflow-hidden rounded-lg border border-slate-700">
            <iframe
              title={en.contactPage.contactInfo.mapPlaceholder}
              src={en.contactPage.contactInfo.mapEmbedUrl}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-900/50 py-16">
        <div className="page-content-inset text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {en.contactPage.ctaTitle}
          </h2>
          <p className="text-white/70 mb-8">
            {en.contactPage.ctaSubtitle}
          </p>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold transition-colors">
            {en.contactPage.ctaButton}
          </button>
        </div>
      </div>
      </div>
    </>
  );
}
