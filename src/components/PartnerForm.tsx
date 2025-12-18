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
      <div className="card-base p-8 shadow-2xl text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">Application Received!</h3>
        <p className="text-gray-600 mb-6">
          Thanks for applying to the LocaleFlow Partner Program. We'll review your application and get back to you within 48 hours.
        </p>
        <p className="text-sm text-gray-500">
          Questions? Email us at <a href="mailto:hi@localeflowapp.com" className="text-primary-600 hover:underline">hi@localeflowapp.com</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-base p-8 shadow-2xl">
      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          <p className="font-medium">Something went wrong</p>
          <p className="text-sm mt-1">{errorMessage || 'Please try again or email us at hi@localeflowapp.com'}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full name *</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            disabled={status === 'submitting'}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="John Smith"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={status === 'submitting'}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="john@agency.com"
          />
        </div>

        <div>
          <label htmlFor="agency" className="block text-sm font-medium text-gray-700 mb-2">Agency name *</label>
          <input
            type="text"
            id="agency"
            name="agency"
            required
            value={formData.agency}
            onChange={handleChange}
            disabled={status === 'submitting'}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="Awesome Agency"
          />
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">Agency website *</label>
          <input
            type="url"
            id="website"
            name="website"
            required
            value={formData.website}
            onChange={handleChange}
            disabled={status === 'submitting'}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="https://agency.com"
          />
        </div>

        <div>
          <label htmlFor="shopify_partner" className="block text-sm font-medium text-gray-700 mb-2">Shopify Partner?</label>
          <select
            id="shopify_partner"
            name="shopify_partner"
            value={formData.shopify_partner}
            onChange={handleChange}
            disabled={status === 'submitting'}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
          >
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="plus">Shopify Plus Partner</option>
          </select>
        </div>

        <div>
          <label htmlFor="clients" className="block text-sm font-medium text-gray-700 mb-2">Shopify clients</label>
          <select
            id="clients"
            name="clients"
            value={formData.clients}
            onChange={handleChange}
            disabled={status === 'submitting'}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
          >
            <option value="">Select...</option>
            <option value="1-5">1-5 clients</option>
            <option value="6-20">6-20 clients</option>
            <option value="21-50">21-50 clients</option>
            <option value="50+">50+ clients</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="markets" className="block text-sm font-medium text-gray-700 mb-2">Primary markets served</label>
        <input
          type="text"
          id="markets"
          name="markets"
          value={formData.markets}
          onChange={handleChange}
          disabled={status === 'submitting'}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
          placeholder="e.g., EU, US, APAC"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full mt-8 btn-primary text-lg py-4 justify-center disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </>
        ) : (
          <>
            Apply to Partner Program
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>

      <p className="text-center text-gray-500 text-sm mt-4">
        We'll review your application and get back to you within 48 hours.
      </p>
    </form>
  );
}
