import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { addCheckin, getStreak } from '../api'

export default function HabitCard({ habit, onDeleted, onUpdated, updateDone }) {
  const [done, setDone] = useState(habit.done || false)
  const [streak, setStreak] = useState(0)
  const [deleting, setDeleting] = useState(false)
  console.log(habit)

  useEffect(() => {
    getStreak(habit._id)
      .then(res => setStreak(res.data.streak))
      .catch(() => {})
  }, [habit._id])

  const handleCheck = async () => {
    try {
      console.debug('[HabitCard] handleCheck start', habit._id)
      const res = await addCheckin({ habitId: habit._id })
      console.debug('[HabitCard] addCheckin response', res && res.data)

      const r = await getStreak(habit._id)
      console.debug('[HabitCard] getStreak response', r && r.data)
      setStreak(r.data.streak)
      updateDone(habit._id)


      // mark done after successful request
      setDone(true)
    

      if (onUpdated) onUpdated()
    } catch (err) {
      // better error details for debugging
      console.error('[HabitCard] handleCheck error', err)
      const msg = err?.response?.data?.message || err?.message || 'Unknown error'
      alert('Could not mark as done: ' + msg)
    }
  }

  const handleDelete = async () => {
    if (!onDeleted) return
    if (!confirm(`Delete this "${habit.name}" habit? `)) return

    try {
      setDeleting(true)
      await onDeleted(habit._id)
    } catch (err) {
      console.error(err)
      alert('Could not delete habit. Check your network or server.')
    } finally {
      setDeleting(false)
    }
  }

  const created = dayjs(habit.startDate).format("MMM D")

  return (
    <div className="card flex items-center justify-between gap-4 p-4 rounded-xl shadow bg-white">
      <div>
        <h3 className="text-lg font-semibold text-slate-800">{habit.name}</h3>
        <p className="text-sm text-slate-500">
          {habit.category || "General"} • started {created}
        </p>

        <div className="mt-2 flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="inline-block w-3 h-3 rounded-full bg-green-200"></span>
            <span>Priority: {habit.priority}</span>
          </div>
          <div className="ml-4 text-sm text-slate-600">
            Streak: <span className="font-medium">{streak}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <button
          onClick={handleCheck}
          disabled={done}
          className={`px-4 py-2 rounded-lg font-semibold shadow-sm transition active:scale-95 ${done ? 'bg-slate-200 text-slate-500 cursor-default' : 'bg-sky-300'}`}
        >
          {done ? 'Done ✓' : '✓ Done'}
        </button>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className={`text-sm ${deleting ? 'text-slate-400' : 'text-slate-500 hover:text-red-500'}`}
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}
