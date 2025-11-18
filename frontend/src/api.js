import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const API = axios.create({
	baseURL,
	timeout: 5000,
})

// simple logging to help debug network issues in development
API.interceptors.request.use((config) => {
	// eslint-disable-next-line no-console
	console.debug('[api] request', config.method, config.url)
	return config
})

API.interceptors.response.use(
	(res) => res,
	(err) => {
		// eslint-disable-next-line no-console
		console.error('[api] response error', err.message)
		return Promise.reject(err)
	}
)

export const fetchHabits = (userId) => API.get(`/habits/${userId}`)
export const createHabit = (payload) => API.post('/habits', payload)
export const deleteHabit = (id) => API.delete(`/habits/${id}`)
export const addCheckin = (payload) => API.post('/checkins', payload)
export const getStreak = (habitId) => API.get(`/checkins/streak/${habitId}`)

export default API