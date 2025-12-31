import { apiFetch } from './api'

// GET ALL
export function getAllAircraft() {
  return apiFetch('/api/aircraft')
}

//GetId
export function getAircraftById(id) {
  return apiFetch(`/api/aircraft/${id}`)
}

//Update
export function updateAircraft(id, { model, totalSeats, status }) {
  return apiFetch(`/api/aircraft/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ model, totalSeats, status }),
  })
}

// CREATE
export function createAircraft({ model, totalSeats }) {
  return apiFetch('/api/aircraft', {
    method: 'POST',
    body: JSON.stringify({ model, totalSeats }),
  })
}

// DELETE
export function deleteAircraft(aircraftId) {
  return apiFetch(`/api/aircraft/${aircraftId}`, {
    method: 'DELETE',
  })
}
