import { useState } from 'react'
import { useQuery } from 'react-query'
import PageTitle from '../components/PageTitle'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

export default function Contact() {
  const [formData, setFormData] = useState({
    subject: 'Commande',
    name: '',
    email: '',
    phone: '',
    message: '',
    files: null
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle form submission
  }

  const handleChange = (e) => {
    const { name, value, type } = e.target
    if (type === 'file') {
      setFormData(prev => ({ ...prev, files: e.target.files }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  return (
    <div className="container mx-auto px-4 lg:pl-[103px]">
      <PageTitle>Contact</PageTitle>
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <label className="text-dark">Sujet <span className="text-primary text-lg">*</span></label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="subject"
                value="Commande"
                checked={formData.subject === 'Commande'}
                onChange={handleChange}
                className="mr-2 accent-primary"
                required
              />
              Commande
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="subject"
                value="Collaboration"
                checked={formData.subject === 'Collaboration'}
                onChange={handleChange}
                className="mr-2 accent-primary"
              />
              Collaboration
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="subject"
                value="Autre"
                checked={formData.subject === 'Autre'}
                onChange={handleChange}
                className="mr-2 accent-primary"
              />
              Autre
            </label>
          </div>
        </div>

        <div>
          <label className="block text-dark mb-2">
            Nom <span className="text-primary text-lg">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border-b border-dark focus:border-primary focus:outline-none py-2 text-dark bg-transparent appearance-none"
          />
        </div>

        <div>
          <label className="block text-dark mb-2">
            Email <span className="text-primary text-lg">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border-b border-dark focus:border-primary focus:outline-none py-2 text-dark bg-transparent appearance-none"
          />
        </div>

        <div>
          <label className="block text-dark mb-2">
            Téléphone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border-b border-dark focus:border-primary focus:outline-none py-2 text-dark bg-transparent appearance-none"
          />
        </div>

        <div>
          <label className="block text-dark mb-2">
            Message <span className="text-primary text-lg">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full border border-dark rounded-sm p-2 focus:border-primary focus:outline-none resize-none text-dark bg-transparent"
          />
        </div>

        <div className="flex items-center gap-8">
          <label className="text-dark whitespace-nowrap">Fichiers</label>
          <div className="flex-1 border border-dark rounded-sm p-2">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => document.getElementById('file-input').click()}
                className="px-4 py-2 bg-primary text-light rounded-sm"
              >
                Choisir un fichier
              </button>
              <span className="text-dark">
                {formData.files?.[0]?.name || 'Aucun fichier sélectionné'}
              </span>
            </div>
            <input
              id="file-input"
              type="file"
              name="files"
              onChange={handleChange}
              className="hidden"
              accept=".jpg,.jpeg,.png,.pdf"
            />
          </div>
        </div>

        <div>
          <p className="text-dark text-sm text-right mb-4">* Champs obligatoires</p>
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-2 bg-light border-2 border-primary text-primary rounded-sm hover:bg-primary hover:text-light transition-colors"
            >
              Envoyer
            </button>
          </div>
        </div>
      </form>

      <div className="max-w-2xl mx-auto">
        <FAQ />
      </div>
      <Footer />
    </div>
  )
}