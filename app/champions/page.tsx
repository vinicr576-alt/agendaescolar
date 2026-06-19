'use client'

import { useState, useCallback, useEffect } from 'react'
import { CL_EDITIONS, CLClub, CLPlayer, CLEdition, Position } from './data'

// ─── Formations ────────────────────────────────────────────────────────────────

interface Slot { id: number; role: Position; label: string; x: number; y: number }
interface FormationDef { name: string; slots: Slot[] }

const FORMATIONS: FormationDef[] = [
  {
    name: '4-3-3',
    slots: [
      { id: 0, role: 'GK',  label: 'GR',  x: 50, y: 88 },
      { id: 1, role: 'DEF', label: 'LD',  x: 14, y: 68 },
      { id: 2, role: 'DEF', label: 'ZE',  x: 36, y: 68 },
      { id: 3, role: 'DEF', label: 'ZD',  x: 64, y: 68 },
      { id: 4, role: 'DEF', label: 'LE',  x: 86, y: 68 },
      { id: 5, role: 'MID', label: 'MC',  x: 25, y: 46 },
      { id: 6, role: 'MID', label: 'MC',  x: 50, y: 42 },
      { id: 7, role: 'MID', label: 'MC',  x: 75, y: 46 },
      { id: 8, role: 'ATK', label: 'PE',  x: 18, y: 20 },
      { id: 9, role: 'ATK', label: 'CA',  x: 50, y: 15 },
      { id: 10, role: 'ATK', label: 'PD', x: 82, y: 20 },
    ]
  },
  {
    name: '4-4-2',
    slots: [
      { id: 0, role: 'GK',  label: 'GR',  x: 50, y: 88 },
      { id: 1, role: 'DEF', label: 'LD',  x: 14, y: 68 },
      { id: 2, role: 'DEF', label: 'ZE',  x: 36, y: 68 },
      { id: 3, role: 'DEF', label: 'ZD',  x: 64, y: 68 },
      { id: 4, role: 'DEF', label: 'LE',  x: 86, y: 68 },
      { id: 5, role: 'MID', label: 'LE',  x: 14, y: 44 },
      { id: 6, role: 'MID', label: 'MC',  x: 38, y: 44 },
      { id: 7, role: 'MID', label: 'MC',  x: 62, y: 44 },
      { id: 8, role: 'MID', label: 'LD',  x: 86, y: 44 },
      { id: 9, role: 'ATK', label: 'CA',  x: 35, y: 18 },
      { id: 10, role: 'ATK', label: 'CA', x: 65, y: 18 },
    ]
  },
  {
    name: '4-2-3-1',
    slots: [
      { id: 0, role: 'GK',  label: 'GR',  x: 50, y: 88 },
      { id: 1, role: 'DEF', label: 'LD',  x: 14, y: 68 },
      { id: 2, role: 'DEF', label: 'ZE',  x: 36, y: 68 },
      { id: 3, role: 'DEF', label: 'ZD',  x: 64, y: 68 },
      { id: 4, role: 'DEF', label: 'LE',  x: 86, y: 68 },
      { id: 5, role: 'MID', label: 'V',   x: 33, y: 50 },
      { id: 6, role: 'MID', label: 'V',   x: 67, y: 50 },
      { id: 7, role: 'MID', label: 'ME',  x: 18, y: 30 },
      { id: 8, role: 'MID', label: 'MC',  x: 50, y: 28 },
      { id: 9, role: 'MID', label: 'MD',  x: 82, y: 30 },
      { id: 10, role: 'ATK', label: 'CA', x: 50, y: 12 },
    ]
  },
  {
    name: '3-5-2',
    slots: [
      { id: 0, role: 'GK',  label: 'GR',  x: 50, y: 88 },
      { id: 1, role: 'DEF', label: 'ZE',  x: 25, y: 68 },
      { id: 2, role: 'DEF', label: 'ZC',  x: 50, y: 68 },
      { id: 3, role: 'DEF', label: 'ZD',  x: 75, y: 68 },
      { id: 4, role: 'MID', label: 'AE',  x: 10, y: 50 },
      { id: 5, role: 'MID', label: 'MC',  x: 30, y: 46 },
      { id: 6, role: 'MID', label: 'MC',  x: 50, y: 44 },
      { id: 7, role: 'MID', label: 'MC',  x: 70, y: 46 },
      { id: 8, role: 'MID', label: 'AD',  x: 90, y: 50 },
      { id: 9, role: 'ATK', label: 'CA',  x: 33, y: 18 },
      { id: 10, role: 'ATK', label: 'CA', x: 67, y: 18 },
    ]
  },
]

// ─── Types ──────────────────────────────────────────────────────────────────────

type GamePhase = 'setup' | 'drafting' | 'reviewing' | 'simulating' | 'results'
type GameMode = 'classic' | 'memory'

interface MatchResult {
  round: string
  opponent: string
  opponentFlag: string
  homeGoals: number
  awayGoals: number
  result: 'win' | 'draw' | 'loss' | 'win_pens' | 'loss_pens'
  userGoals: number
  userResult: 'win' | 'draw' | 'loss' | 'win_pens' | 'loss_pens'
}

interface GameState {
  phase: GamePhase
  mode: GameMode
  formation: FormationDef
  drawnClub: CLClub | null
  drawnEdition: CLEdition | null
  wildcards: number
  players: (CLPlayer | null)[]
  matchResults: MatchResult[]
  revealedMatches: number
  isChampion: boolean
  advancedGroup: boolean
}

// ─── Helpers ────────────────────────────────────────────────────────────────────

const avg = (nums: number[]) =>
  nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 70

function calcTeamScore(players: (CLPlayer | null)[]): number {
  const valid = players.filter(Boolean) as CLPlayer[]
  if (!valid.length) return 60
  const gk   = valid.find(p => p.position === 'GK')
  const defs = valid.filter(p => p.position === 'DEF')
  const mids = valid.filter(p => p.position === 'MID')
  const atks = valid.filter(p => p.position === 'ATK')

  const gkScore  = gk   ? gk.stats.def * 0.7 + gk.stats.pac * 0.15 + gk.stats.pas * 0.15 : 70
  const defScore = avg(defs.map(d => d.stats.def * 0.55 + d.stats.pac * 0.25 + d.stats.pas * 0.2))
  const midScore = avg(mids.map(m => m.stats.pas * 0.4 + m.stats.def * 0.3 + m.stats.sho * 0.15 + m.stats.pac * 0.15))
  const atkScore = avg(atks.map(a => a.stats.sho * 0.55 + a.stats.pac * 0.3 + a.stats.pas * 0.15))

  const legendBonus = valid.filter(p => p.isLegend).length * 1.5
  return gkScore * 0.2 + defScore * 0.3 + midScore * 0.25 + atkScore * 0.25 + legendBonus
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function simulateMatch(
  myScore: number,
  oppScore: number,
  isKnockout: boolean
): { homeGoals: number; awayGoals: number; result: 'win' | 'draw' | 'loss' | 'win_pens' | 'loss_pens' } {
  const me  = myScore  + (Math.random() * 28 - 10)
  const opp = oppScore + (Math.random() * 28 - 10)
  const diff = me - opp

  let h: number, a: number
  if      (diff > 20) { h = randInt(3,5); a = randInt(0,1) }
  else if (diff > 12) { h = randInt(2,4); a = randInt(0,2) }
  else if (diff >  5) { h = randInt(1,3); a = randInt(0,2) }
  else if (diff > -5) { const g = randInt(0,3); h = g; a = g === 0 ? randInt(0,2) : randInt(Math.max(0,g-1), g+1) }
  else if (diff >-12) { h = randInt(0,2); a = randInt(1,3) }
  else                { h = randInt(0,2); a = randInt(2,5) }

  if (h > a) return { homeGoals: h, awayGoals: a, result: 'win' }
  if (h < a) return { homeGoals: h, awayGoals: a, result: 'loss' }
  if (!isKnockout) return { homeGoals: h, awayGoals: a, result: 'draw' }
  return Math.random() > 0.5
    ? { homeGoals: h, awayGoals: a, result: 'win_pens' }
    : { homeGoals: h, awayGoals: a, result: 'loss_pens' }
}

const ALL_CLUBS = CL_EDITIONS.flatMap(e =>
  e.clubs.map(c => ({ club: c, edition: e }))
)

function rollClub(usedIds: string[]): { club: CLClub; edition: CLEdition } {
  const available = ALL_CLUBS.filter(x => !usedIds.includes(x.club.id))
  const pool = available.length ? available : ALL_CLUBS
  return pool[Math.floor(Math.random() * pool.length)]
}

function posLabel(pos: Position) {
  return pos === 'GK' ? 'Goleiro' : pos === 'DEF' ? 'Defensor' : pos === 'MID' ? 'Meio-campo' : 'Atacante'
}

// ─── Stat Bar ───────────────────────────────────────────────────────────────────

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-400 w-8">{label}</span>
      <div className="flex-1 bg-gray-700 rounded-full h-1.5">
        <div className="h-1.5 rounded-full transition-all" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs text-gray-300 w-6 text-right">{value}</span>
    </div>
  )
}

// ─── Player Card ────────────────────────────────────────────────────────────────

function PlayerCard({
  player, mode, onPick, disabled
}: {
  player: CLPlayer
  mode: GameMode
  onPick?: () => void
  disabled?: boolean
}) {
  const posColor = player.position === 'GK' ? '#FACC15'
    : player.position === 'DEF' ? '#34D399'
    : player.position === 'MID' ? '#60A5FA'
    : '#F87171'

  const posLabel2 = player.position === 'GK' ? 'GR' : player.position

  return (
    <div
      onClick={disabled ? undefined : onPick}
      className={`relative rounded-xl border transition-all duration-200 overflow-hidden
        ${disabled ? 'opacity-40 cursor-not-allowed' : onPick ? 'cursor-pointer border-gray-700 hover:border-gray-500 hover:scale-102 hover:shadow-lg' : 'cursor-default border-gray-700'}
        bg-gradient-to-b from-gray-800 to-gray-900`}
    >
      {player.isLegend && (
        <div className="absolute top-1.5 right-1.5">
          <span className="text-yellow-400 text-xs font-bold bg-yellow-400/10 border border-yellow-400/30 rounded px-1">⭐ LENDA</span>
        </div>
      )}
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{player.flag}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{player.name}</p>
            <p className="text-xs text-gray-400">{player.nationality}</p>
          </div>
          <span
            className="text-xs font-bold px-1.5 py-0.5 rounded"
            style={{ backgroundColor: posColor + '30', color: posColor, border: `1px solid ${posColor}50` }}
          >{posLabel2}</span>
        </div>
        {mode === 'classic' ? (
          <div className="space-y-1">
            <StatBar label="VEL" value={player.stats.pac} color="#60A5FA" />
            <StatBar label="CHU" value={player.stats.sho} color="#F87171" />
            <StatBar label="PAS" value={player.stats.pas} color="#34D399" />
            <StatBar label="DEF" value={player.stats.def} color="#FACC15" />
          </div>
        ) : (
          <div className="text-center py-2">
            <p className="text-xs text-gray-500 italic">Modo Memória</p>
            <p className="text-xs text-gray-600">Stats ocultos</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Formation Board ────────────────────────────────────────────────────────────

function FormationBoard({
  formation, players
}: {
  formation: FormationDef
  players: (CLPlayer | null)[]
}) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: '140%' }}>
      {/* Pitch */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900 to-emerald-800">
        {/* Lines */}
        <div className="absolute inset-x-4 top-1/2 h-px bg-white/20" />
        <div className="absolute left-1/2 top-4 bottom-4 w-px bg-white/20 -translate-x-1/2" />
        <div className="absolute left-1/2 top-1/2 w-16 h-16 border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute inset-x-12 top-4 bottom-[55%] border border-white/20 rounded-sm" />
        <div className="absolute inset-x-12 bottom-4 top-[55%] border border-white/20 rounded-sm" />
      </div>
      {/* Players */}
      {formation.slots.map((slot, i) => {
        const player = players[i]
        const isEmpty = !player
        const posColor = slot.role === 'GK' ? '#FACC15'
          : slot.role === 'DEF' ? '#34D399'
          : slot.role === 'MID' ? '#60A5FA'
          : '#F87171'

        return (
          <div
            key={slot.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
          >
            <div
              className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all
                ${isEmpty ? 'animate-pulse' : ''}
                ${player ? 'text-white' : 'text-gray-400'}`}
              style={{
                borderColor: player ? posColor : '#6B7280',
                backgroundColor: player ? posColor + '40' : '#1F293780',
              }}
            >
              {player ? player.name.split(' ').pop()?.slice(0, 3).toUpperCase() : slot.label}
            </div>
            {player && (
              <span className="text-white/80 text-[9px] mt-0.5 max-w-[52px] text-center leading-tight truncate">
                {player.name.split(' ').slice(-1)[0]}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Match Result Row ───────────────────────────────────────────────────────────

function MatchRow({ match }: { match: MatchResult }) {
  const win = match.userResult === 'win' || match.userResult === 'win_pens'
  const draw = match.userResult === 'draw'
  const pens = match.userResult === 'win_pens' || match.userResult === 'loss_pens'

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border
      ${win ? 'bg-emerald-900/30 border-emerald-700' : draw ? 'bg-yellow-900/30 border-yellow-700' : 'bg-red-900/30 border-red-700'}`}>
      <span className={`text-sm font-bold w-6 ${win ? 'text-emerald-400' : draw ? 'text-yellow-400' : 'text-red-400'}`}>
        {win ? 'V' : draw ? 'E' : 'D'}
      </span>
      <span className="text-xs text-gray-400 w-20 shrink-0">{match.round}</span>
      <span className="text-sm text-white flex-1">
        vs {match.opponentFlag} {match.opponent}
      </span>
      <span className="text-sm font-mono font-bold text-white">
        {match.homeGoals}–{match.awayGoals}
        {pens && <span className="text-xs text-gray-400 ml-1">(pen)</span>}
      </span>
    </div>
  )
}

// ─── Main Game ───────────────────────────────────────────────────────────────────

const initialState = (formation: FormationDef, mode: GameMode): GameState => ({
  phase: 'drafting',
  mode,
  formation,
  drawnClub: null,
  drawnEdition: null,
  wildcards: 3,
  players: new Array(formation.slots.length).fill(null),
  matchResults: [],
  revealedMatches: 0,
  isChampion: false,
  advancedGroup: false,
})

export default function ChampionsDraft() {
  const [setupMode, setSetupMode] = useState<GameMode>('classic')
  const [setupFormation, setSetupFormation] = useState<FormationDef>(FORMATIONS[0])
  const [game, setGame] = useState<GameState | null>(null)
  const [usedClubIds, setUsedClubIds] = useState<string[]>([])
  const [showCurrentResult, setShowCurrentResult] = useState(false)

  const startGame = useCallback(() => {
    setGame(initialState(setupFormation, setupMode))
    setUsedClubIds([])
    setShowCurrentResult(false)
  }, [setupFormation, setupMode])

  const rollDice = useCallback(() => {
    if (!game) return
    const { club, edition } = rollClub(usedClubIds)
    setUsedClubIds(prev => [...prev, club.id])
    setGame(prev => prev ? { ...prev, drawnClub: club, drawnEdition: edition } : prev)
  }, [game, usedClubIds])

  const useWildcard = useCallback(() => {
    if (!game || game.wildcards <= 0) return
    setGame(prev => {
      if (!prev) return prev
      const { club, edition } = rollClub(usedClubIds)
      setUsedClubIds(ids => [...ids, club.id])
      return { ...prev, drawnClub: club, drawnEdition: edition, wildcards: prev.wildcards - 1 }
    })
  }, [game, usedClubIds])

  const pickPlayer = useCallback((player: CLPlayer) => {
    if (!game) return
    setGame(prev => {
      if (!prev) return prev
      const slotIndex = prev.formation.slots.findIndex(
        (slot, i) => slot.role === player.position && !prev.players[i]
      )
      if (slotIndex === -1) return prev
      const newPlayers = [...prev.players]
      newPlayers[slotIndex] = player
      const done = newPlayers.every(Boolean)
      return {
        ...prev,
        players: newPlayers,
        drawnClub: null,
        drawnEdition: null,
        phase: done ? 'reviewing' : 'drafting',
      }
    })
  }, [game])

  const runSimulation = useCallback(() => {
    if (!game) return
    const myScore = calcTeamScore(game.players)
    const results: MatchResult[] = []

    const oppClubs = [...ALL_CLUBS].sort(() => Math.random() - 0.5).slice(0, 7)
    const rounds = ['Fase de Grupos', 'Fase de Grupos', 'Fase de Grupos', 'Oitavas', 'Quartas', 'Semifinal', 'Final']

    let groupPoints = 0
    let eliminated = false

    for (let i = 0; i < rounds.length; i++) {
      if (i > 2 && eliminated) break
      if (i === 3 && groupPoints < 4) { eliminated = true; break }

      const opp = oppClubs[i]
      const oppScore = calcTeamScore(opp.club.players) + (i - 2) * 2

      const isKO = i > 2
      const match = simulateMatch(myScore, oppScore, isKO)

      const userWon = match.result === 'win' || match.result === 'win_pens'
      const userDraw = match.result === 'draw'

      if (i <= 2) {
        if (userWon) groupPoints += 3
        else if (userDraw) groupPoints += 1
      } else {
        if (!userWon) { eliminated = true }
      }

      results.push({
        round: rounds[i],
        opponent: `${opp.club.name} (${opp.club.season})`,
        opponentFlag: opp.club.flag,
        homeGoals: match.homeGoals,
        awayGoals: match.awayGoals,
        result: match.result,
        userGoals: match.homeGoals,
        userResult: match.result,
      })

      if (isKO && !userWon) break
    }

    const isChampion = results.length === 7 && (results[6].userResult === 'win' || results[6].userResult === 'win_pens')
    const advancedGroup = groupPoints >= 4

    setShowCurrentResult(false)
    setGame(prev => prev ? {
      ...prev,
      phase: 'simulating',
      matchResults: results,
      revealedMatches: 0,
      isChampion,
      advancedGroup,
    } : prev)
  }, [game])

  // Animated simulation — reveal one match every ~3.3s
  useEffect(() => {
    if (!game || game.phase !== 'simulating') return
    const revealed = game.revealedMatches
    const total = game.matchResults.length

    if (revealed >= total) {
      const t = setTimeout(() => {
        setGame(prev => prev ? { ...prev, phase: 'results' } : prev)
      }, 2000)
      return () => clearTimeout(t)
    }

    setShowCurrentResult(false)
    let advanceT: ReturnType<typeof setTimeout>
    const revealT = setTimeout(() => {
      setShowCurrentResult(true)
      advanceT = setTimeout(() => {
        setGame(prev =>
          prev && prev.phase === 'simulating'
            ? { ...prev, revealedMatches: prev.revealedMatches + 1 }
            : prev
        )
      }, 1500)
    }, 1800)

    return () => {
      clearTimeout(revealT)
      clearTimeout(advanceT!)
    }
  }, [game?.phase, game?.revealedMatches])

  // ─ Render Setup ──────────────────────────────────────────────────────────────

  if (!game) {
    return (
      <div className="min-h-screen text-white flex flex-col" style={{ background: 'linear-gradient(135deg, #050510 0%, #0a0a2e 50%, #050510 100%)' }}>
        {/* Stars */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() > 0.8 ? 2 : 1,
                height: Math.random() > 0.8 ? 2 : 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.1 + Math.random() * 0.5,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="text-7xl mb-4">🏆</div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #FFD700, #FFF, #FFD700)' }}>
              Champions Draft
            </h1>
            <p className="mt-3 text-gray-400 text-lg">
              Monte seu time dos sonhos com lendas da Champions League
            </p>
            <div className="mt-2 flex items-center justify-center gap-4 text-xs text-gray-600">
              <span>⭐ {CL_EDITIONS.length} edições</span>
              <span>🏟️ {ALL_CLUBS.length} clubes</span>
              <span>👟 {ALL_CLUBS.reduce((n, x) => n + x.club.players.length, 0)} jogadores</span>
            </div>
          </div>

          <div className="w-full max-w-md space-y-6">
            {/* Mode */}
            <div>
              <p className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Modo de jogo</p>
              <div className="grid grid-cols-2 gap-3">
                {(['classic', 'memory'] as const).map(m => (
                  <button
                    key={m}
                    onClick={() => setSetupMode(m)}
                    className={`p-4 rounded-xl border text-left transition-all
                      ${setupMode === m ? 'border-yellow-400 bg-yellow-400/10' : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'}`}
                  >
                    <div className="text-xl mb-1">{m === 'classic' ? '👁️' : '🧠'}</div>
                    <div className="font-bold text-white">{m === 'classic' ? 'Clássico' : 'Memória'}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {m === 'classic' ? 'Stats visíveis — escolha com dados' : 'Stats ocultos — confie na memória'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Formation */}
            <div>
              <p className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Formação</p>
              <div className="grid grid-cols-2 gap-2">
                {FORMATIONS.map(f => (
                  <button
                    key={f.name}
                    onClick={() => setSetupFormation(f)}
                    className={`p-3 rounded-xl border text-center font-bold transition-all
                      ${setupFormation.name === f.name ? 'border-blue-400 bg-blue-400/10 text-blue-300' : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600'}`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={startGame}
              className="w-full py-4 rounded-xl font-black text-lg text-black transition-all hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}
            >
              🎲 Começar Draft
            </button>

            <p className="text-center text-xs text-gray-600">
              Inspirado no jogo <span className="text-gray-500">Sete a Zero (7a0)</span>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ─ Simulating Screen ──────────────────────────────────────────────────────────

  if (game.phase === 'simulating') {
    const currentIdx = game.revealedMatches
    const total = game.matchResults.length
    const currentMatch = currentIdx < total ? game.matchResults[currentIdx] : null
    const done = currentIdx >= total

    const getMatchColors = (m: MatchResult) => {
      const win = m.userResult === 'win' || m.userResult === 'win_pens'
      const draw = m.userResult === 'draw'
      return win
        ? { border: 'border-emerald-700', bg: 'bg-emerald-900/30', label: 'V', labelColor: 'text-emerald-400' }
        : draw
        ? { border: 'border-yellow-700', bg: 'bg-yellow-900/30', label: 'E', labelColor: 'text-yellow-400' }
        : { border: 'border-red-700', bg: 'bg-red-900/30', label: 'D', labelColor: 'text-red-400' }
    }

    return (
      <div className="min-h-screen text-white" style={{ background: 'linear-gradient(135deg, #050510 0%, #0a0a2e 50%, #050510 100%)' }}>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">⚽</div>
            <h2 className="text-2xl font-black text-white">Champions League</h2>
            <p className="text-gray-400 text-sm mt-1">Simulando partidas...</p>
          </div>

          {/* Already revealed matches */}
          <div className="space-y-2 mb-3">
            {game.matchResults.slice(0, currentIdx).map((m, i) => (
              <MatchRow key={i} match={m} />
            ))}
          </div>

          {/* Currently playing match */}
          {currentMatch && (
            <div className={`rounded-xl border p-4 transition-all duration-300
              ${showCurrentResult
                ? getMatchColors(currentMatch).border + ' ' + getMatchColors(currentMatch).bg
                : 'border-blue-600 bg-blue-900/20'
              }`}
            >
              {!showCurrentResult ? (
                <div className="flex items-center gap-3">
                  <span className="text-red-400 text-xs font-bold animate-pulse shrink-0">🔴 AO VIVO</span>
                  <span className="text-xs text-gray-400 w-24 shrink-0">{currentMatch.round}</span>
                  <span className="text-sm text-white flex-1">
                    vs {currentMatch.opponentFlag} {currentMatch.opponent}
                  </span>
                  <span className="text-lg font-mono font-black text-white animate-pulse">? — ?</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-bold w-6 shrink-0 ${getMatchColors(currentMatch).labelColor}`}>
                    {getMatchColors(currentMatch).label}
                  </span>
                  <span className="text-xs text-gray-400 w-24 shrink-0">{currentMatch.round}</span>
                  <span className="text-sm text-white flex-1">
                    vs {currentMatch.opponentFlag} {currentMatch.opponent}
                  </span>
                  <span className="text-sm font-mono font-bold text-white">
                    {currentMatch.homeGoals}–{currentMatch.awayGoals}
                    {(currentMatch.userResult === 'win_pens' || currentMatch.userResult === 'loss_pens') && (
                      <span className="text-xs text-gray-400 ml-1">(pen)</span>
                    )}
                  </span>
                </div>
              )}
            </div>
          )}

          {done && (
            <div className="text-center mt-8 animate-pulse text-gray-400 text-sm">
              Preparando resultados...
            </div>
          )}
        </div>
      </div>
    )
  }

  // ─ Results Screen ─────────────────────────────────────────────────────────────

  if (game.phase === 'results') {
    const filledPlayers = game.players.filter(Boolean) as CLPlayer[]
    const myScore = Math.round(calcTeamScore(game.players))
    const legends = filledPlayers.filter(p => p.isLegend).length

    return (
      <div className="min-h-screen text-white" style={{ background: 'linear-gradient(135deg, #050510 0%, #0a0a2e 50%, #050510 100%)' }}>
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Result Banner */}
          <div className={`rounded-2xl border p-6 text-center mb-6
            ${game.isChampion ? 'border-yellow-400 bg-yellow-400/10' : game.advancedGroup ? 'border-blue-500 bg-blue-500/10' : 'border-red-700 bg-red-900/20'}`}>
            <div className="text-6xl mb-3">
              {game.isChampion ? '🏆' : game.advancedGroup ? '⚔️' : '😔'}
            </div>
            <h2 className="text-2xl font-black text-white">
              {game.isChampion ? 'Campeão da Champions League!' : game.advancedGroup ? 'Eliminado...' : 'Caiu na Fase de Grupos'}
            </h2>
            <p className="text-gray-400 mt-2">
              {game.isChampion
                ? 'Seu time conquistou a Orelhuda! Que time sensacional!'
                : game.advancedGroup
                ? 'Chegou longe, mas a Champions League é implacável.'
                : 'Não foi desta vez. Tente novamente!'}
            </p>
            <div className="mt-4 flex justify-center gap-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-black text-yellow-400">{myScore}</div>
                <div className="text-gray-500 text-xs">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-yellow-400">{legends}</div>
                <div className="text-gray-500 text-xs">Lendas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-yellow-400">{game.matchResults.length}</div>
                <div className="text-gray-500 text-xs">Jogos</div>
              </div>
            </div>
          </div>

          {/* Match Results */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-300 mb-3">📋 Resultados</h3>
            <div className="space-y-2">
              {game.matchResults.map((m, i) => <MatchRow key={i} match={m} />)}
            </div>
          </div>

          {/* Team */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-300 mb-3">👥 Seu Time</h3>
            <div className="grid grid-cols-2 gap-2">
              {game.formation.slots.map((slot, i) => {
                const player = game.players[i]
                if (!player) return null
                return <PlayerCard key={i} player={player} mode={game.mode} />
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setGame(null)}
              className="flex-1 py-4 rounded-xl font-bold text-white border border-gray-700 hover:border-gray-500 transition-all"
            >
              ← Menu Principal
            </button>
            <button
              onClick={startGame}
              className="flex-1 py-4 rounded-xl font-black text-black transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}
            >
              🎲 Jogar Novamente
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─ Reviewing Screen ───────────────────────────────────────────────────────────

  if (game.phase === 'reviewing') {
    const myScore = Math.round(calcTeamScore(game.players))
    const legends = game.players.filter(p => p?.isLegend).length
    return (
      <div className="min-h-screen text-white" style={{ background: 'linear-gradient(135deg, #050510 0%, #0a0a2e 50%, #050510 100%)' }}>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-white">⚽ Seu Time está Pronto!</h2>
            <p className="text-gray-400 mt-1">Revise e simule a Champions League</p>
          </div>

          <div className="flex gap-4 mb-6 justify-center">
            <div className="text-center bg-gray-800/60 rounded-xl px-5 py-3 border border-gray-700">
              <div className="text-3xl font-black text-yellow-400">{myScore}</div>
              <div className="text-xs text-gray-400">Rating Geral</div>
            </div>
            <div className="text-center bg-gray-800/60 rounded-xl px-5 py-3 border border-gray-700">
              <div className="text-3xl font-black text-yellow-400">⭐ {legends}</div>
              <div className="text-xs text-gray-400">Lendas no elenco</div>
            </div>
            <div className="text-center bg-gray-800/60 rounded-xl px-5 py-3 border border-gray-700">
              <div className="text-3xl font-black text-blue-400">{game.formation.name}</div>
              <div className="text-xs text-gray-400">Formação</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-6">
            {game.formation.slots.map((slot, i) => {
              const player = game.players[i]
              if (!player) return null
              return <PlayerCard key={i} player={player} mode={game.mode} />
            })}
          </div>

          <button
            onClick={runSimulation}
            className="w-full py-4 rounded-xl font-black text-lg text-black transition-all hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}
          >
            🏆 Simular Champions League
          </button>
        </div>
      </div>
    )
  }

  // ─ Draft Screen ───────────────────────────────────────────────────────────────

  const filledCount = game.players.filter(Boolean).length
  const totalSlots = game.formation.slots.length
  const progress = filledCount / totalSlots

  // Which positions still have open slots
  const openSlots = game.formation.slots.reduce((acc, slot, i) => {
    if (!game.players[i]) acc[slot.role] = (acc[slot.role] || 0) + 1
    return acc
  }, {} as Partial<Record<Position, number>>)

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(135deg, #050510 0%, #0a0a2e 50%, #050510 100%)' }}>
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setGame(null)} className="text-gray-500 hover:text-gray-300 transition-colors text-sm">
            ← Sair
          </button>
          <div className="text-center">
            <h1 className="text-xl font-black text-white">Champions Draft</h1>
            <p className="text-xs text-gray-500">{game.mode === 'classic' ? '👁️ Modo Clássico' : '🧠 Modo Memória'}</p>
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full border text-xs flex items-center justify-center
                  ${i < game.wildcards ? 'border-blue-400 bg-blue-400/20 text-blue-400' : 'border-gray-700 bg-gray-800 text-gray-600'}`}
              >★</div>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{filledCount}/{totalSlots} jogadores escolhidos</span>
            <span className="text-gray-400 font-semibold">
              {Object.entries(openSlots).map(([pos, n]) => `${n} ${posLabel(pos as Position)}`).join(' · ')}
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress * 100}%`, background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Left: Formation */}
          <div>
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Seu Time ({game.formation.name})</p>
            <FormationBoard
              formation={game.formation}
              players={game.players}
            />
          </div>

          {/* Right: Draft */}
          <div className="flex flex-col">
            {!game.drawnClub ? (
              // Roll State
              <div className="flex-1 flex flex-col items-center justify-center gap-6 py-12">
                <div className="text-center">
                  <div className="text-5xl mb-3">🎲</div>
                  <h2 className="text-xl font-bold text-white">Sortear Clube</h2>
                  <p className="text-gray-400 text-sm mt-1">Sorteie um clube e escolha qualquer jogador disponível</p>
                </div>
                <button
                  onClick={rollDice}
                  className="px-8 py-4 rounded-xl font-black text-black text-lg transition-all hover:scale-105 active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}
                >
                  🎰 Sortear Clube
                </button>
              </div>
            ) : (
              // Club drawn — show all players grouped by position
              <div>
                {/* Club Header */}
                <div
                  className="rounded-xl p-4 mb-4 border"
                  style={{
                    background: `linear-gradient(135deg, ${game.drawnClub.primaryColor}20, ${game.drawnClub.secondaryColor}15)`,
                    borderColor: game.drawnClub.primaryColor + '40',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{game.drawnClub.flag}</span>
                    <div>
                      <h3 className="text-xl font-black text-white">{game.drawnClub.name}</h3>
                      <p className="text-sm text-gray-400">
                        {game.drawnEdition?.season} — {game.drawnClub.country}
                        {game.drawnEdition?.winner === game.drawnClub.name && (
                          <span className="ml-2 text-yellow-400 font-bold">🏆 Campeão</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-400 mb-4">
                  Escolha qualquer jogador — ele vai para a posição correspondente aberta no seu time:
                </p>

                {/* Players grouped by position */}
                <div className="space-y-5 mb-4">
                  {(['GK', 'DEF', 'MID', 'ATK'] as Position[]).map(pos => {
                    const posPlayers = game.drawnClub!.players.filter(p => p.position === pos)
                    if (!posPlayers.length) return null
                    const slotsOpen = openSlots[pos] || 0
                    const canPick = slotsOpen > 0
                    return (
                      <div key={pos} className={canPick ? '' : 'opacity-40'}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase
                            ${pos === 'GK' ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                              : pos === 'DEF' ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/30'
                              : pos === 'MID' ? 'bg-blue-400/20 text-blue-400 border border-blue-400/30'
                              : 'bg-red-400/20 text-red-400 border border-red-400/30'}`}
                          >
                            {posLabel(pos)}
                          </span>
                          {canPick
                            ? <span className="text-xs text-gray-500">{slotsOpen} vaga{slotsOpen > 1 ? 's' : ''} disponível</span>
                            : <span className="text-xs text-gray-600">✓ Posição preenchida</span>
                          }
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                          {posPlayers.map(player => (
                            <PlayerCard
                              key={player.id}
                              player={player}
                              mode={game.mode}
                              onPick={canPick ? () => pickPlayer(player) : undefined}
                              disabled={!canPick}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={rollDice}
                    className="flex-1 py-3 rounded-xl border border-gray-700 text-gray-300 hover:border-gray-500 transition-all font-semibold text-sm"
                  >
                    🎲 Sortear Outro
                  </button>
                  <button
                    onClick={useWildcard}
                    disabled={game.wildcards <= 0}
                    className={`flex-1 py-3 rounded-xl border font-semibold text-sm transition-all
                      ${game.wildcards > 0 ? 'border-blue-500 text-blue-400 hover:bg-blue-500/10' : 'border-gray-800 text-gray-600 cursor-not-allowed'}`}
                  >
                    ★ Curinga ({game.wildcards})
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
