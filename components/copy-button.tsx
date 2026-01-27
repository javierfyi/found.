"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useSoundContext } from "@/contexts/sound-context"

interface CopyButtonProps {
  value: string
}

export function CopyButton({ value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const { playCopy } = useSoundContext()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    playCopy()
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8"
      onClick={handleCopy}
    >
      {copied ? (
        <Check className="h-4 w-4 text-primary" />
      ) : (
        <Copy className="h-4 w-4 text-muted-foreground" />
      )}
      <span className="sr-only">Copy to clipboard</span>
    </Button>
  )
}
