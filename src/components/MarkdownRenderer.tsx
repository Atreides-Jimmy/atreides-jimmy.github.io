import { useMemo } from 'react'

interface MarkdownRendererProps {
  content: string
  basePath?: string
}

function resolveUrl(src: string, basePath?: string): string {
  if (!basePath || src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')) {
    return src
  }
  return `${basePath}/${src}`
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function parseInline(text: string, basePath?: string): string {
  // Images: ![alt](src)
  let result = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
    const url = resolveUrl(src, basePath)
    return `<img src="${url}" alt="${escapeHtml(alt)}" class="max-w-full rounded-sm my-2" />`
  })
  // Links: [text](url)
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, linkText, url) => {
    const resolved = resolveUrl(url, basePath)
    return `<a href="${resolved}" target="_blank" rel="noopener noreferrer" class="text-sand-300 underline hover:text-sand-100 transition-colors">${linkText}</a>`
  })
  // Bold: **text**
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  // Italic: *text*
  result = result.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
  // Inline code: `text`
  result = result.replace(/`([^`]+)`/g, '<code class="bg-dune-800 px-1.5 py-0.5 rounded text-sm text-sand-300/80">$1</code>')
  return result
}

export default function MarkdownRenderer({ content, basePath }: MarkdownRendererProps) {
  const html = useMemo(() => {
    if (!content.trim()) return ''

    const lines = content.split('\n')
    const blocks: string[] = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]

      // Empty line
      if (line.trim() === '') {
        i++
        continue
      }

      // Headings
      const headingMatch = line.match(/^(#{1,6})\s+(.+)/)
      if (headingMatch) {
        const level = headingMatch[1].length
        const text = parseInline(headingMatch[2], basePath)
        const sizes: Record<number, string> = {
          1: 'text-2xl', 2: 'text-xl', 3: 'text-lg',
          4: 'text-base', 5: 'text-sm', 6: 'text-xs',
        }
        blocks.push(`<h${level} class="font-display ${sizes[level] || 'text-base'} text-sand-50/90 tracking-wide mt-6 mb-3">${text}</h${level}>`)
        i++
        continue
      }

      // Horizontal rule
      if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line.trim())) {
        blocks.push('<hr class="border-sand-300/10 my-6" />')
        i++
        continue
      }

      // Unordered list
      if (/^[-*+]\s/.test(line.trim())) {
        const items: string[] = []
        while (i < lines.length && /^[-*+]\s/.test(lines[i].trim())) {
          const itemText = lines[i].trim().replace(/^[-*+]\s+/, '')
          items.push(`<li class="ml-4 list-disc text-sand-50/70 leading-relaxed">${parseInline(itemText, basePath)}</li>`)
          i++
        }
        blocks.push(`<ul class="my-3">${items.join('')}</ul>`)
        continue
      }

      // Ordered list
      if (/^\d+\.\s/.test(line.trim())) {
        const items: string[] = []
        while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
          const itemText = lines[i].trim().replace(/^\d+\.\s+/, '')
          items.push(`<li class="ml-4 list-decimal text-sand-50/70 leading-relaxed">${parseInline(itemText, basePath)}</li>`)
          i++
        }
        blocks.push(`<ol class="my-3">${items.join('')}</ol>`)
        continue
      }

      // Paragraph (collect consecutive non-empty, non-special lines)
      const paraLines: string[] = []
      while (i < lines.length && lines[i].trim() !== '' && !/^#{1,6}\s/.test(lines[i]) && !/^[-*+]\s/.test(lines[i].trim()) && !/^\d+\.\s/.test(lines[i].trim()) && !/^(-{3,}|\*{3,}|_{3,})\s*$/.test(lines[i].trim())) {
        paraLines.push(lines[i])
        i++
      }
      const paraText = parseInline(paraLines.join(' '), basePath)
      blocks.push(`<p class="text-sand-50/70 leading-relaxed my-3">${paraText}</p>`)
    }

    return blocks.join('')
  }, [content, basePath])

  if (!html) return null

  return (
    <div
      className="font-body markdown-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
