import axios from 'axios'

// Configuration commune pour l'authentification
const authConfig = {
  auth: {
    username: 'ck_153d0faed3b3a860c006664cd9f387c0dd61f73f',
    password: 'cs_0d0c10512e751b5f7f437b91077b1dd07f68ad24'
  }
}

const api = axios.create({
  baseURL: 'https://groupe2.triptyk.eu/wp-json/wc/v3',
  ...authConfig,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

const wpApi = axios.create({
  baseURL: 'https://groupe2.triptyk.eu/wp-json/wp/v2',
  ...authConfig,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// Fonction utilitaire pour extraire l'année et le mois de la date
const getYearMonth = (date) => {
  const d = new Date(date)
  return {
    year: d.getFullYear(),
    month: String(d.getMonth() + 1).padStart(2, '0')
  }
}

export const getProducts = async (categoryId = null) => {
  try {
    const params = categoryId ? { category: categoryId } : {}
    const { data } = await api.get('/products', { params })
    return data.map(product => ({
      id: product.id,
      title: product.name,
      image: product.images[0]?.src || '',
      description: product.description,
      price: product.price,
      categories: product.categories
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des produits')
  }
}

export const getProduct = async (id) => {
  try {
    const { data } = await api.get(`/products/${id}`)
    return {
      id: data.id,
      title: data.name,
      image: data.images[0]?.src || '',
      description: data.description,
      price: data.price,
      categories: data.categories
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    throw new Error(error.response?.data?.message || 'Erreur lors de la récupération du produit')
  }
}

export const getCategories = async () => {
  try {
    const { data } = await api.get('/products/categories')
    return data
      .filter(category => category.slug !== 'uncategorized')
      .map(category => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        count: category.count
      }))
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des catégories')
  }
}

const getMediaUrl = async (mediaId) => {
  if (!mediaId) return null
  try {
    const { data } = await wpApi.get(`/media/${mediaId}`)
    return data.source_url || null
  } catch (error) {
    // Si l'erreur est liée au CORS, on utilise une approche alternative
    if (error.message === 'Network Error' || error.response?.status === 0) {
      try {
        // Récupérer les détails du média sans l'URL complète
        const { data } = await wpApi.get(`/media/${mediaId}`, {
          params: {
            _fields: ['date', 'media_details']
          }
        })
        
        if (data.media_details?.file) {
          return `https://groupe2.triptyk.eu/wp-content/uploads/${data.media_details.file}`
        }
        
        // Fallback avec la date
        const { year, month } = getYearMonth(data.date)
        return `https://groupe2.triptyk.eu/wp-content/uploads/${year}/${month}/${mediaId}`
      } catch (innerError) {
        console.error('Error fetching media details:', innerError)
        return null
      }
    }
    console.error('Error fetching media:', { mediaId, message: error.message, status: error.response?.status })
    return null
  }
}

export const getStories = async () => {
  try {
    const { data } = await wpApi.get('/stories', {
      params: {
        per_page: 100,
        _fields: ['id', 'acf', 'date'],
        orderby: 'date',
        order: 'desc',
        timestamp: new Date().getTime()
      }
    })

    const validStories = data.filter(story => 
      story && 
      story.acf && 
      story.acf.image_section && 
      story.acf.titre
    )

    const storiesWithMedia = await Promise.all(
      validStories.map(async story => {
        const imageUrl = await getMediaUrl(story.acf.image_section)
        if (!imageUrl) return null

        return {
          id: story.id,
          title: {
            fr: story.acf.titre || '',
            en: story.acf.titre_en || ''
          },
          description: {
            fr: story.acf.description_section || '',
            en: story.acf.description_en || ''
          },
          image: imageUrl,
          imagePosition: story.acf.de_quelle_cote_doit_etre_limage || 'image à gauche'
        }
      })
    )

    return storiesWithMedia.filter(Boolean)
  } catch (error) {
    console.error('Error in getStories:', error.response?.data || error)
    throw new Error('Erreur lors de la récupération des stories')
  }
}

export const getFAQs = async () => {
  try {
    const { data } = await wpApi.get('/faq', {
      params: {
        per_page: 100,
        _fields: ['id', 'acf', 'date'],
        orderby: 'date',
        order: 'desc',
        timestamp: new Date().getTime()
      }
    })
    
    if (!Array.isArray(data)) {
      throw new Error('Format de réponse invalide')
    }
    
    return data
      .filter(item => item.acf?.question_faq && item.acf?.reponse_faq)
      .map(item => ({
        id: item.id,
        question: item.acf.question_faq,
        answer: item.acf.reponse_faq
      }))
  } catch (error) {
    console.error('FAQ API Error:', error)
    throw new Error('Impossible de charger les questions fréquentes')
  }
}