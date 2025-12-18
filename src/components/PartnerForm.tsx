import { useState } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  agency: string;
  website: string;
  shopify_partner: string;
  clients: string;
  markets: string;
}

export function PartnerForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    agency: '',
    website: '',
    shopify_partner: '',
    clients: '',
    markets: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/partner-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit application');
      }

      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl p-10 shadow-xl shadow-black/5 text-center">
        <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Application received</h3>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
          Thanks for applying. We'll review your application and get back to you within 48 hours.
        </p>
        <p className="text-sm text-gray-400">
          Questions? <a href="mailto:hi@localeflowapp.com" className="text-primary-500 hover:text-primary-600 transition-colors">hi@localeflowapp.com</a>
        </p>
      </div>
    );
  }

  const inputClasses = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-200 outline-none disabled:bg-gray-100 disabled:text-gray-400";
  const labelClasses = "block text-sm font-medium text-gray-600 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 md:p-10 shadow-xl shadow-black/5">
      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg">
          <p className="text-sm font-medium text-red-600">Something went wrong</p>
          <p className="text-sm text-red-500 mt-0.5">{errorMessage || 'Please try again or email hi@localeflowapp.com'}</p>
        </div>
      )}

      <div className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className={labelClasses}>Full name <span className="text-red-400">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={status === 'submitting'}
              className={inputClasses}
              placeholder="John Smith"
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClasses}>Email <span className="text-red-400">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={status === 'submitting'}
              className={inputClasses}
              placeholder="john@agency.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="agency" className={labelClasses}>Agency name <span className="text-red-400">*</span></label>
            <input
              type="text"
              id="agency"
              name="agency"
              required
              value={formData.agency}
              onChange={handleChange}
              disabled={status === 'submitting'}
              className={inputClasses}
              placeholder="Awesome Agency"
            />
          </div>

          <div>
            <label htmlFor="website" className={labelClasses}>Website <span className="text-red-400">*</span></label>
            <input
              type="url"
              id="website"
              name="website"
              required
              value={formData.website}
              onChange={handleChange}
              disabled={status === 'submitting'}
              className={inputClasses}
              placeholder="https://agency.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="shopify_partner" className={labelClasses}>Shopify Partner?</label>
            <select
              id="shopify_partner"
              name="shopify_partner"
              value={formData.shopify_partner}
              onChange={handleChange}
              disabled={status === 'submitting'}
              className={inputClasses}
            >
              <option value="">Select...</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="plus">Shopify Plus Partner</option>
            </select>
          </div>

          <div>
            <label htmlFor="clients" className={labelClasses}>Shopify clients</label>
            <select
              id="clients"
              name="clients"
              value={formData.clients}
              onChange={handleChange}
              disabled={status === 'submitting'}
              className={inputClasses}
            >
              <option value="">Select...</option>
              <option value="1-5">1-5 clients</option>
              <option value="6-20">6-20 clients</option>
              <option value="21-50">21-50 clients</option>
              <option value="50+">50+ clients</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="markets" className={labelClasses}>Primary markets served</label>
          <input
            type="text"
            id="markets"
            name="markets"
            value={formData.markets}
            onChange={handleChange}
            disabled={status === 'submitting'}
            className={inputClasses}
            placeholder="e.g., EU, US, APAC"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full mt-8 bg-primary-500 hover:bg-primary-600 text-white font-medium py-3.5 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </>
        ) : (
          <>
            Apply to Partner Program
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>

      <p className="text-center text-gray-400 text-sm mt-4">
        We'll review your application within 48 hours
      </p>
    </form>
  );
}
