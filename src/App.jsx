import { useEffect, useMemo, useState } from 'react'
import TopBar from './components/TopBar'
import ArticleCard from './components/ArticleCard'
import ArticleModal from './components/ArticleModal'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'history', label: 'History' },
  { key: 'mythology', label: 'Mythology' },
  { key: 'science', label: 'Ancient Science' },
]

export default function App() {
  const [active, setActive] = useState('all')
  const [query, setQuery] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(null)

  useEffect(() => {
    fetchData()
  }, [active, query])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError('')
      const params = new URLSearchParams()
      if (active !== 'all') params.set('category', active)
      if (query) params.set('q', query)
      const res = await fetch(`${BACKEND_URL}/api/articles?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to load')
      const data = await res.json()
      setItems(data)
    } catch (e) {
      setError('Could not load content. Try again later.')
    } finally {
      setLoading(false)
    }
  }

  const openItem = (item) => {
    setCurrent(item)
    setOpen(true)
  }

  const filteredTabs = useMemo(() => tabs, [])

  return (
    <div className="min-h-screen bg-emerald-50">
      <TopBar onSearch={setQuery} />

      <div className="px-4 pt-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {filteredTabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                active === t.key
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-white text-emerald-700 border border-emerald-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4">
        {loading && (
          <div className="text-center text-emerald-700">Loading content...</div>
        )}
        {error && (
          <div className="text-center text-red-600">{error}</div>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <ArticleCard key={item.id} item={item} onOpen={openItem} />)
            )}
          </div>
        )}
      </div>

      <ArticleModal open={open} item={current} onClose={() => setOpen(false)} />

      <footer className="px-4 py-6 text-center text-xs text-emerald-700/70">
        Mystical Team • Explore the wonders of the past
      </footer>
    </div>
  )
}
