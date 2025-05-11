interface SageBaseLogoProps {
  className?: string
  size?: number
  variant?: "full" | "icon" | "text"
  showTagline?: boolean
}

export default function SageBaseLogo({
  className = "",
  size = 40,
  variant = "full",
  showTagline = false,
}: SageBaseLogoProps) {
  const iconOnly = variant === "icon"
  const textOnly = variant === "text"
  const scale = size / 40
  const iconWidth = 80 * scale
  const iconHeight = 80 * scale
  const fontSize = size * 0.95
  const taglineSize = size * 0.35

  return (
    <div className={`flex items-center ${className}`}>
      {!textOnly && (
        <div
          className="relative"
          style={{
            width: iconWidth,
            height: iconHeight,
          }}
        >
          {/* Blue document icon */}
          <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Blue document background */}
            <rect x="0" y="0" width="80" height="80" rx="10" fill="#4169E1" />

            {/* Document icon in white */}
            <path d="M30 20 L50 20 L60 30 L60 60 L30 60 Z" fill="white" />
            <path d="M50 20 L50 30 L60 30" fill="none" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      )}

      {!iconOnly && (
        <div className={`ml-${textOnly ? "0" : "3"} flex flex-col`}>
          <div className="font-bold text-gray-800 flex items-center">
            <span style={{ fontSize: fontSize }}>SageBase</span>
          </div>
          {showTagline && (
            <span className="font-medium text-gray-600" style={{ fontSize: taglineSize, marginTop: "2px" }}>
              your living knowledge Base
            </span>
          )}
        </div>
      )}
    </div>
  )
}
