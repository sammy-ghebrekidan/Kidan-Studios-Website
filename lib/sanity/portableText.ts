import type { PortableTextBlock } from '@portabletext/types'

/**
 * Convert PortableText blocks to plain text paragraphs
 * Used for simple text rendering without rich formatting
 */
export function portableTextToPlainText(blocks: PortableTextBlock[]): string[] {
  if (!blocks) return []
  
  return blocks
    .filter((block: any) => block._type === 'block')
    .map((block: any) => {
      return block.children
        ?.map((child: any) => child.text)
        .join('') || ''
    })
    .filter(text => text.trim() !== '')
}
