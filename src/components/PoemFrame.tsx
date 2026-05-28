import { useLangStore } from '@/store/langStore'

const poemLines = [
  'Do you wrestle with dreams?',
  'Do you contend with shadows?',
  'Do you move in a kind of sleep?',
  'Time has slipped away.',
  'Your life is stolen.',
  '',
  'You tarried with trifles,',
  'Victim of your folly.',
]

export default function PoemFrame() {
  const { t } = useLangStore()

  return (
    <div className="poem-frame max-w-xl mx-auto opacity-0 animate-fade-in-delay-2">
      <div className="poem-frame-inner relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sand-300/20 to-transparent" />
        <div className="py-4">
          {poemLines.map((line, i) => (
            <p
              key={i}
              className={`font-display text-lg sm:text-xl leading-relaxed text-sand-50/80 italic tracking-wide
                ${line === '' ? 'h-4' : ''}
                ${i === poemLines.length - 1 ? 'text-sand-300/70' : ''}`}
            >
              {line}
            </p>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sand-300/20 to-transparent" />
      </div>
      <p className="mt-4 text-right font-display text-sm text-sand-300/40 tracking-wider">
        {t('poem.author')}
      </p>
    </div>
  )
}
