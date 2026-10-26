interface StarRatingProps {
  rating?: number
  size?: number
  color?: string
  idPrefix?: string
}

export function StarRating({
  rating = 4.5,
  size = 15,
  color = '#B48A45',
  idPrefix = 'star',
}: StarRatingProps) {
  const gradId = `${idPrefix}-half-grad`
  const stars = [1, 2, 3, 4, 5]

  return (
    <div
      className="inline-flex items-center gap-[3px]"
      aria-label={`${rating} out of 5 stars`}
    >
      <svg width="0" height="0" className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <linearGradient id={gradId} x1="0" x2="100%" y1="0" y2="0">
            <stop offset="50%" stopColor={color} />
            <stop offset="50%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      {stars.map(starNumber => {
        let fill = 'none'
        if (rating >= starNumber) {
          fill = color
        } else if (rating >= starNumber - 0.5) {
          fill = `url(#${gradId})`
        }

        return (
          <svg
            key={starNumber}
            viewBox="0 0 24 24"
            width={size}
            height={size}
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-shrink-0"
            aria-hidden="true"
          >
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              fill={fill}
            />
          </svg>
        )
      })}
    </div>
  )
}
