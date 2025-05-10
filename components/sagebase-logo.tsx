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

  return (
    <div className={`flex items-center ${className}`}>
      {!textOnly && (
        <div
          className="relative"
          style={{
            width: size,
            height: size,
          }}
        >
          {/* Base shape - hexagon */}
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z"
              fill="#10b981"
              className="transition-colors duration-300"
            />
            <path d="M50 15L81.65 33.75V71.25L50 90L18.35 71.25V33.75L50 15Z" fill="#ecfdf5" />

            {/* Stylized "S" for Sage */}
            <path
              d="M40 35C40 32.2386 42.2386 30 45 30H55C57.7614 30 60 32.2386 60 35C60 37.7614 57.7614 40 55 40H50V45C50 47.7614 52.2386 50 55 50C57.7614 50 60 52.2386 60 55C60 57.7614 57.7614 60 55 60H45C42.2386 60 40 57.7614 40 55"
              stroke="#10b981"
              strokeWidth="6"
              strokeLinecap="round"
              className="transition-colors duration-300"
            />

            {/* Stylized "B" for Base */}
            <path
              d="M40 65C40 62.2386 42.2386 60 45 60H55C57.7614 60 60 62.2386 60 65C60 67.7614 57.7614 70 55 70H45M40 65V70M40 65V60"
              stroke="#10b981"
              strokeWidth="6"
              strokeLinecap="round"
              className="transition-colors duration-300"
            />
          </svg>
        </div>
      )}

      {!iconOnly && (
        <div className="ml-2 flex flex-col">
          <div className="font-bold text-emerald-600 flex items-center">
            <span style={{ fontSize: size * 0.5 }}>Sage</span>
            <span style={{ fontSize: size * 0.5 }} className="text-gray-700">
              Base
            </span>
          </div>
          {showTagline && (
            <span className="font-medium text-gray-600" style={{ fontSize: size * 0.3 }}>
              your smart knowledge Base
            </span>
          )}
        </div>
      )}
    </div>
  )
}
