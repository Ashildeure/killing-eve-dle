"use client"
import { useRouter, usePathname } from "next/navigation"

export default function LocaleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  function switchLocale(locale: string) {
    // Remplace le premier segment de l'URL par la nouvelle locale
    const segments = pathname.split("/")
    segments[1] = locale
    router.push(segments.join("/"))
  }

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginBottom: "1rem" }}>
      <button className="lang-btn" onClick={() => switchLocale("en")}>🇬🇧 EN</button>
      <button className="lang-btn" onClick={() => switchLocale("fr")}>🇫🇷 FR</button>
    </div>
  )
}