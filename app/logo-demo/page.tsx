"use client"

import { useState } from "react"
import SageBaseLogo from "@/components/sagebase-logo"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export default function LogoDemo() {
  const [size, setSize] = useState(60)
  const [variant, setVariant] = useState<"full" | "icon" | "text">("full")

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">SageBase Logo</h1>

        <div className="flex flex-col items-center justify-center mb-8 p-8 bg-white border border-gray-200 rounded-lg">
          <SageBaseLogo size={size} variant={variant} />
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-medium text-gray-700 mb-2">Size</h2>
            <div className="flex items-center gap-4">
              <Slider
                value={[size]}
                onValueChange={(value) => setSize(value[0])}
                min={20}
                max={200}
                step={1}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-12 text-right">{size}px</span>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-700 mb-2">Variant</h2>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={variant === "full" ? "default" : "outline"}
                onClick={() => setVariant("full")}
                className={variant === "full" ? "bg-emerald-600" : ""}
              >
                Full Logo
              </Button>
              <Button
                variant={variant === "icon" ? "default" : "outline"}
                onClick={() => setVariant("icon")}
                className={variant === "icon" ? "bg-emerald-600" : ""}
              >
                Icon Only
              </Button>
              <Button
                variant={variant === "text" ? "default" : "outline"}
                onClick={() => setVariant("text")}
                className={variant === "text" ? "bg-emerald-600" : ""}
              >
                Text Only
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-white p-4 flex items-center justify-center rounded-lg border border-gray-200">
              <SageBaseLogo size={40} variant="full" />
            </div>
            <div className="bg-gray-800 p-4 flex items-center justify-center rounded-lg">
              <SageBaseLogo size={40} variant="full" className="text-white" />
            </div>
            <div className="bg-emerald-600 p-4 flex items-center justify-center rounded-lg">
              <SageBaseLogo size={40} variant="full" className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
