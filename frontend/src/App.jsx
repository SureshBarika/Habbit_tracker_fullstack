import React, { useEffect, useState } from 'react'
import { fetchHabits, createHabit, deleteHabit } from './api'
import HabitCard from './components/HabitCard'
import dayjs from 'dayjs'

export default function App() {
  const [habits, setHabits] = useState([])
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [priority, setPriority] = useState(2)
  const [loading, setLoading] = useState(false)

  // temporary fixed userId
  const userId = "000000000000000000000000"

  const load = async () => {
    try {
      setLoading(true)
      const res = await fetchHabits(userId)
      setHabits(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    const payload = {
      userId,
      name,
      category,
      priority,
      startDate: dayjs().toDate()
    }

    await createHabit(payload)
    setName("")
    setCategory("")
    setPriority(2)
    load()
  }

  const handleDelete = async (id) => {
    await deleteHabit(id)
    load()
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Habit Tracker</h1>

      {/* Add Habit Form */}
      <form
        onSubmit={handleAdd}
        className="p-4 bg-white shadow rounded-xl flex flex-col gap-3 mb-6"
      >
        <input
          type="text"
          placeholder="Habit name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Category (optional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 rounded"
        >
          <option value={1}>Priority 1</option>
          <option value={2}>Priority 2</option>
          <option value={3}>Priority 3</option>
        </select>

        <button
          type="submit"
          className="bg-sky-500 text-white px-4 py-2 rounded"
        >
          Add Habit
        </button>
      </form>

      {/* Habits List */}
      {loading ? (
        <p className="text-center text-slate-500">Loading...</p>
      ) : habits.length === 0 ? (
        <p className="text-center text-slate-400">No habits yet. Add one!</p>
      ) : (
        <div className="flex flex-col gap-4">
          {habits.map((h) => (
            <HabitCard
              key={h._id}
              habit={h}
              onDeleted={handleDelete}
              onUpdated={load}
            />
          ))}
        </div>
      )}
    </div>
  )
}

