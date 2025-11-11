export default function ArticleCard({ item, onOpen }) {
  return (
    <button
      onClick={() => onOpen(item)}
      className="text-left bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {item.image_url && (
        <div className="relative h-40 w-full overflow-hidden">
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <span className="inline-block text-xs uppercase tracking-wide text-emerald-600 font-semibold">
          {item.category}
        </span>
        <h3 className="mt-1 font-bold text-gray-900 line-clamp-2">{item.title}</h3>
        {item.summary && (
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{item.summary}</p>
        )}
      </div>
    </button>
  )
}
