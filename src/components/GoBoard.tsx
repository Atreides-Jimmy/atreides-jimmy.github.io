import { useRef, useEffect, useState, useCallback } from 'react'

interface Move {
  color: 'B' | 'W'
  x: number
  y: number
}

interface SGFMeta {
  black: string
  white: string
  date: string
  komi: string
}

export function parseSGF(sgf: string): { moves: Move[]; meta: SGFMeta } {
  const moves: Move[] = []
  const meta: SGFMeta = { black: '', white: '', date: '', komi: '' }

  const pbMatch = sgf.match(/PB\[([^\]]*)\]/)
  const pwMatch = sgf.match(/PW\[([^\]]*)\]/)
  const dtMatch = sgf.match(/DT\[([^\]]*)\]/)
  const kmMatch = sgf.match(/KM\[([^\]]*)\]/)
  if (pbMatch) meta.black = pbMatch[1]
  if (pwMatch) meta.white = pwMatch[1]
  if (dtMatch) meta.date = dtMatch[1]
  if (kmMatch) meta.komi = kmMatch[1]

  const regex = /;(B|W)\[([a-s])([a-s])\]/gi
  let match
  while ((match = regex.exec(sgf)) !== null) {
    moves.push({
      color: match[1].toUpperCase() as 'B' | 'W',
      x: match[2].charCodeAt(0) - 97,
      y: match[3].charCodeAt(0) - 97,
    })
  }
  return { moves, meta }
}

const BOARD_SIZE = 19
const STAR_POINTS = [
  [3, 3], [3, 9], [3, 15],
  [9, 3], [9, 9], [9, 15],
  [15, 3], [15, 9], [15, 15],
]

const DIRS = [[0, 1], [0, -1], [1, 0], [-1, 0]]

function getGroup(
  board: (0 | 1 | 2)[][],
  x: number,
  y: number
): { stones: [number, number][]; liberties: number } {
  const color = board[y][x]
  if (color === 0) return { stones: [], liberties: 0 }

  const visited = new Set<string>()
  const stones: [number, number][] = []
  let liberties = 0
  const queue: [number, number][] = [[x, y]]

  while (queue.length > 0) {
    const [cx, cy] = queue.pop()!
    const key = `${cx},${cy}`
    if (visited.has(key)) continue
    visited.add(key)

    if (board[cy][cx] === 0) {
      liberties++
      continue
    }
    if (board[cy][cx] !== color) continue

    stones.push([cx, cy])
    for (const [dx, dy] of DIRS) {
      const nx = cx + dx
      const ny = cy + dy
      if (nx >= 0 && nx < BOARD_SIZE && ny >= 0 && ny < BOARD_SIZE && !visited.has(`${nx},${ny}`)) {
        queue.push([nx, ny])
      }
    }
  }

  return { stones, liberties }
}

function buildBoard(moves: Move[], upTo: number): (0 | 1 | 2)[][] {
  const board: (0 | 1 | 2)[][] = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0))

  for (let i = 0; i < upTo; i++) {
    const m = moves[i]
    if (!m) continue

    const stoneVal: 1 | 2 = m.color === 'B' ? 1 : 2
    const opponentVal: 1 | 2 = m.color === 'B' ? 2 : 1
    board[m.y][m.x] = stoneVal

    for (const [dx, dy] of DIRS) {
      const nx = m.x + dx
      const ny = m.y + dy
      if (nx >= 0 && nx < BOARD_SIZE && ny >= 0 && ny < BOARD_SIZE && board[ny][nx] === opponentVal) {
        const group = getGroup(board, nx, ny)
        if (group.liberties === 0) {
          for (const [sx, sy] of group.stones) {
            board[sy][sx] = 0
          }
        }
      }
    }

    const selfGroup = getGroup(board, m.x, m.y)
    if (selfGroup.liberties === 0) {
      for (const [sx, sy] of selfGroup.stones) {
        board[sy][sx] = 0
      }
    }
  }

  return board
}

function drawBoard(
  ctx: CanvasRenderingContext2D,
  size: number,
  boardState: (0 | 1 | 2)[][],
  moves: Move[],
  highlightMove: number
) {
  const padding = size * 0.04
  const cellSize = (size - padding * 2) / (BOARD_SIZE - 1)

  ctx.fillStyle = '#DCB35C'
  ctx.fillRect(0, 0, size, size)

  ctx.fillStyle = '#C9A96E'
  for (let i = 0; i < size; i += 4) {
    ctx.fillRect(0, i, size, 1)
  }

  ctx.strokeStyle = '#1A1A1A'
  ctx.lineWidth = 1
  for (let i = 0; i < BOARD_SIZE; i++) {
    const pos = padding + i * cellSize
    ctx.beginPath()
    ctx.moveTo(padding, pos)
    ctx.lineTo(size - padding, pos)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(pos, padding)
    ctx.lineTo(pos, size - padding)
    ctx.stroke()
  }

  ctx.fillStyle = '#1A1A1A'
  for (const [sx, sy] of STAR_POINTS) {
    ctx.beginPath()
    ctx.arc(padding + sx * cellSize, padding + sy * cellSize, cellSize * 0.15, 0, Math.PI * 2)
    ctx.fill()
  }

  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const stone = boardState[y][x]
      if (stone === 0) continue

      const cx = padding + x * cellSize
      const cy = padding + y * cellSize
      const r = cellSize * 0.44

      const grad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.1, cx, cy, r)
      if (stone === 1) {
        grad.addColorStop(0, '#555')
        grad.addColorStop(1, '#111')
      } else {
        grad.addColorStop(0, '#fff')
        grad.addColorStop(1, '#ccc')
      }

      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()

      if (stone === 2) {
        ctx.strokeStyle = '#aaa'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }
  }

  if (highlightMove > 0 && highlightMove <= moves.length) {
    const move = moves[highlightMove - 1]
    if (move) {
      const cx = padding + move.x * cellSize
      const cy = padding + move.y * cellSize
      const r = cellSize * 0.15
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fillStyle = move.color === 'B' ? '#F0EDE6' : '#1A1A1A'
      ctx.fill()
    }
  }
}

interface GoBoardProps {
  sgf: string
  showMeta?: boolean
  canvasSize?: number
}

export default function GoBoard({ sgf, showMeta = true, canvasSize }: GoBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const parsed = parseSGF(sgf)
  const { moves, meta } = parsed
  const [currentMove, setCurrentMove] = useState(moves.length)

  const getSize = useCallback(() => {
    if (canvasSize) return canvasSize
    return Math.min(480, typeof window !== 'undefined' ? window.innerWidth - 80 : 480)
  }, [canvasSize])

  const redraw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = getSize()
    canvas.width = size
    canvas.height = size

    const boardState = buildBoard(moves, currentMove)
    drawBoard(ctx, size, boardState, moves, currentMove)
  }, [getSize, moves, currentMove])

  useEffect(() => {
    redraw()
  }, [redraw])

  useEffect(() => {
    window.addEventListener('resize', redraw)
    return () => window.removeEventListener('resize', redraw)
  }, [redraw])

  const goTo = (move: number) => setCurrentMove(Math.max(0, Math.min(moves.length, move)))

  return (
    <div className="flex flex-col items-center gap-4">
      {showMeta && (meta.black || meta.white) && (
        <div className="flex items-center gap-4 font-body text-sm text-sand-50/60">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-dune-800 border border-sand-300/30" />
            {meta.black}
          </span>
          <span className="text-sand-300/30">vs</span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-sand-50 border border-sand-300/30" />
            {meta.white}
          </span>
          {meta.date && <span className="text-sand-300/30 ml-2">{meta.date}</span>}
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="rounded-sm shadow-lg max-w-full"
      />
      <div className="flex items-center gap-3">
        <button onClick={() => goTo(0)} className="px-3 py-1.5 text-sand-50/50 hover:text-sand-300 transition-colors font-body text-sm disabled:opacity-30" disabled={currentMove === 0}>⏮</button>
        <button onClick={() => goTo(currentMove - 1)} className="px-3 py-1.5 text-sand-50/50 hover:text-sand-300 transition-colors font-body text-sm disabled:opacity-30" disabled={currentMove === 0}>◀</button>
        <span className="font-body text-xs text-sand-300/50 min-w-[70px] text-center">
          {currentMove} / {moves.length}
        </span>
        <button onClick={() => goTo(currentMove + 1)} className="px-3 py-1.5 text-sand-50/50 hover:text-sand-300 transition-colors font-body text-sm disabled:opacity-30" disabled={currentMove === moves.length}>▶</button>
        <button onClick={() => goTo(moves.length)} className="px-3 py-1.5 text-sand-50/50 hover:text-sand-300 transition-colors font-body text-sm disabled:opacity-30" disabled={currentMove === moves.length}>⏭</button>
      </div>
    </div>
  )
}

export function GoBoardThumbnail({ sgf }: { sgf: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { moves } = parseSGF(sgf)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = 120
    canvas.width = size
    canvas.height = size

    const boardState = buildBoard(moves, moves.length)
    drawBoard(ctx, size, boardState, moves, 0)
  }, [moves])

  return <canvas ref={canvasRef} className="rounded-sm" />
}
