import { apiFetch } from './api'

export function getAllAircraft({ token }) {
  return apiFetch('/api/aircraft', { token })
}

export function createAircraft({ token, model, totalSeats }) {
  return apiFetch('/api/aircraft', {
    token,
    method: 'POST',
    body: JSON.stringify({ model, totalSeats }),
  })
}

export function deleteAircraft({ token, aircraftId }) {
  return apiFetch(`/api/aircraft/${aircraftId}`, {
    token,
    method: 'DELETE',
  })
}
