import { X } from 'lucide-react'

export default function ArticleModal({ open, item, onClose }) {
  if (!open || !item) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <span className="text-xs uppercase tracking-wide text-emerald-600 font-semibold">
              {item.category}
            </span>
            <h3 className="text-xl font-bold text-gray-900 mt-1">{item.title}</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          {item.image_url && (
            <img src={item.image_url} alt={item.title} className="w-full rounded-xl mb-4 object-cover" />
          )}
          {item.published_at && (
            <p className="text-xs text-gray-500 mb-2">Published: {new Date(item.published_at).toLocaleDateString()}</p>
          )}
          <p className="text-gray-800 leading-relaxed whitespace-pre-line">{item.content}</p>
        </div>
      </div>
    </div>
  )
}
