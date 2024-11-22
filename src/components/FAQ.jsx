import { useState } from 'react'
import { useQuery } from 'react-query'
import { getFAQs } from '../services/wordpress'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const { data: faqs, isLoading, error } = useQuery('faqs', getFAQs, {
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000)
  })

  if (isLoading) {
    return (
      <div className="mt-32">
        <div className="text-slate animate-pulse flex flex-col gap-4">
          <div className="h-12 bg-slate/10 rounded-sm"></div>
          <div className="h-12 bg-slate/10 rounded-sm"></div>
          <div className="h-12 bg-slate/10 rounded-sm"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-32">
        <div className="text-primary bg-primary/5 p-4 rounded-sm flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>{error.message}</span>
        </div>
      </div>
    )
  }

  if (!faqs?.length) {
    return (
      <div className="mt-32">
        <div className="text-slate italic">Aucune question fréquente n'est disponible pour le moment.</div>
      </div>
    )
  }

  return (
    <div className="mt-32">
      <div className="space-y-4">
        {faqs.map((item, index) => (
          <div key={item.id} className="border-b border-slate/20">
            <button
              className="w-full text-left py-4 flex justify-between items-center hover:text-primary transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-medium pr-4">{item.question}</span>
              <svg 
                className={`w-6 h-6 text-primary transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="pb-4 text-slate">
                <p className="whitespace-pre-line">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}