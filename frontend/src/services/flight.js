import { apiFetch } from './api'

export function getAllFlights({ token }) {
  return apiFetch('/api/flight', { token })
}

export function createFlight({ token, origin, destination, departureTime, aircraftId }) {
  return apiFetch('/api/flight', {
    token,
    method: 'POST',
    body: JSON.stringify({ origin, destination, departureTime, aircraftId }),
  })
}

export function deleteFlight({ token, flightId }) {
  return apiFetch(`/api/flight/${flightId}`, {
    token,
    method: 'DELETE',
  })
}
