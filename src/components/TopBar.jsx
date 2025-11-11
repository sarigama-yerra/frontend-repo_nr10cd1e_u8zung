import { Search } from 'lucide-react'
import { useState } from 'react'

export default function TopBar({ onSearch }) {
  const [term, setTerm] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch(term)
  }

  return (
    <div className="px-4 pb-3 pt-6 bg-gradient-to-b from-emerald-600 to-emerald-500 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mystical Team</h1>
          <p className="text-emerald-100 text-sm">Articles from history, mythology, and ancient science</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center font-semibold">
          MT
        </div>
      </div>

      <form onSubmit={submit} className="mt-4 flex items-center gap-2">
        <div className="flex-1 flex items-center bg-white rounded-2xl px-3 py-2 shadow-sm">
          <Search className="w-5 h-5 text-emerald-500" />
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search titles..."
            className="ml-2 flex-1 outline-none text-gray-800 placeholder:text-gray-400"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-white text-emerald-700 font-semibold shadow"
        >
          Search
        </button>
      </form>
    </div>
  )
}
