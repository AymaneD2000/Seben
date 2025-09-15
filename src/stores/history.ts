import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface HistoryItem {
  id: string
  type: 'search' | 'conversation' | 'document'
  page: 'dictionary' | 'assistant' | 'editor'
  action: string
  details?: string
  timestamp: Date
  icon: string
  // Données spécifiques selon le type
  searchQuery?: string
  searchCategory?: string
  conversationId?: string
  conversationTitle?: string
  documentId?: string
  documentTitle?: string
  documentContent?: string
}

export const useHistoryStore = defineStore('history', () => {
  const history = ref<HistoryItem[]>([])

  // Computed pour grouper l'historique par page
  const historyByPage = computed(() => {
    const grouped: Record<string, HistoryItem[]> = {
      dictionary: [],
      assistant: [],
      editor: []
    }

    history.value.forEach(item => {
      if (grouped[item.page]) {
        grouped[item.page].push(item)
      }
    })

    // Trier par timestamp (plus récent en premier)
    Object.keys(grouped).forEach(page => {
      grouped[page].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    })

    return grouped
  })

  // Computed pour l'historique récent (toutes pages confondues)
  const recentHistory = computed(() => {
    return [...history.value]
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 10) // Limiter à 10 éléments récents
  })

  // Ajouter un élément à l'historique
  const addHistoryItem = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    }

    history.value.unshift(newItem)

    // Limiter l'historique à 50 éléments maximum
    if (history.value.length > 50) {
      history.value = history.value.slice(0, 50)
    }

    // Sauvegarder dans localStorage
    saveToStorage()
  }

  // Supprimer un élément de l'historique
  const removeHistoryItem = (id: string, confirm: boolean = false) => {
    if (!confirm) {
      // Demander confirmation
      const item = history.value.find(item => item.id === id)
      if (item) {
        const confirmed = window.confirm(`Êtes-vous sûr de vouloir supprimer "${item.action}" de l'historique ?`)
        if (!confirmed) return
      }
    }
    
    const index = history.value.findIndex(item => item.id === id)
    if (index > -1) {
      history.value.splice(index, 1)
      saveToStorage()
    }
  }

  // Vider l'historique d'une page spécifique
  const clearPageHistory = (page: string, confirm: boolean = false) => {
    if (!confirm) {
      const pageNames: Record<string, string> = {
        dictionary: 'Dictionnaire',
        assistant: 'Assistant',
        editor: 'Éditeur'
      }
      const pageName = pageNames[page] || page
      const confirmed = window.confirm(`Êtes-vous sûr de vouloir supprimer tout l'historique de ${pageName} ?`)
      if (!confirmed) return
    }
    
    history.value = history.value.filter(item => item.page !== page)
    saveToStorage()
  }

  // Vider tout l'historique
  const clearAllHistory = (confirm: boolean = false) => {
    if (!confirm) {
      const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer tout l\'historique ? Cette action est irréversible.')
      if (!confirmed) return
    }
    
    history.value = []
    saveToStorage()
  }

  // Sauvegarder dans localStorage
  const saveToStorage = () => {
    try {
      localStorage.setItem('seben-history', JSON.stringify(history.value))
    } catch (error) {
      console.warn('Impossible de sauvegarder l\'historique:', error)
    }
  }

  // Charger depuis localStorage
  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem('seben-history')
      if (stored) {
        const parsed = JSON.parse(stored)
        // Convertir les timestamps en objets Date
        history.value = parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }))
      }
    } catch (error) {
      console.warn('Impossible de charger l\'historique:', error)
    }
  }

  // Initialiser le store
  loadFromStorage()
  
  // Nettoyer l'historique existant pour supprimer les anciens enregistrements d'actions
  // et le remplacer par les nouveaux éléments de test
  history.value = []
  
  // Ajouter quelques éléments d'historique de test
  {
    const testItems = [
      {
        type: 'search' as const,
        page: 'dictionary' as const,
        action: 'sogoma',
        details: 'Recherche dans le dictionnaire',
        icon: 'search',
        searchQuery: 'sogoma',
        searchCategory: 'tous'
      },
      {
        type: 'search' as const,
        page: 'dictionary' as const,
        action: 'ni ce',
        details: 'Recherche dans le dictionnaire',
        icon: 'search',
        searchQuery: 'ni ce',
        searchCategory: 'expressions'
      },
      {
        type: 'conversation' as const,
        page: 'assistant' as const,
        action: 'Comment dit-on bonjour?',
        details: 'Conversation avec l\'assistant',
        icon: 'chat',
        conversationId: 'conv_1',
        conversationTitle: 'Comment dit-on bonjour?'
      },
      {
        type: 'conversation' as const,
        page: 'assistant' as const,
        action: 'Grammaire bambara',
        details: 'Conversation avec l\'assistant',
        icon: 'chat',
        conversationId: 'conv_2',
        conversationTitle: 'Grammaire bambara'
      },
      {
        type: 'document' as const,
        page: 'editor' as const,
        action: 'Mon premier texte',
        details: 'Document créé dans l\'éditeur',
        icon: 'description',
        documentId: 'doc_1',
        documentTitle: 'Mon premier texte',
        documentContent: 'I ni sogoma ! N b\'a fɔ ko...'
      },
      {
        type: 'document' as const,
        page: 'editor' as const,
        action: 'Lettre à un ami',
        details: 'Document créé dans l\'éditeur',
        icon: 'description',
        documentId: 'doc_2',
        documentTitle: 'Lettre à un ami',
        documentContent: 'I ni sogoma, n ka teri...'
      }
    ]
    
    testItems.forEach(item => {
      const newItem: HistoryItem = {
        ...item,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        timestamp: new Date(Date.now() - Math.random() * 86400000) // Dans les dernières 24h
      }
      history.value.push(newItem)
    })
    
    saveToStorage()
  }

  return {
    history,
    historyByPage,
    recentHistory,
    addHistoryItem,
    removeHistoryItem,
    clearPageHistory,
    clearAllHistory
  }
})
