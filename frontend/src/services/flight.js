import { apiFetch } from './api'

export function getAllFlights() {
  return apiFetch('/api/flight')
}

export function getFlightById(flightId) {
  return apiFetch(`/api/flight/${flightId}`)
}

export function searchFlights({ origin, destination, departureDate }) {
  const params = new URLSearchParams({
    origin,
    destination,
    departureDate,
  })

  return apiFetch(`/api/flight/search?${params.toString()}`)
}


export function createFlight({ origin, destination, departureTime, aircraftId }) {
  return apiFetch('/api/flight', {
    method: 'POST',
    body: JSON.stringify({
      origin,
      destination,
      departureTime,
      aircraftId,
    }),
  })
}

export function updateFlight(flightId, { origin, destination, departureTime, aircraftId }) {
  return apiFetch(`/api/flight/${flightId}`, {
    method: 'PUT',
    body: JSON.stringify({
      origin,
      destination,
      departureTime,
      aircraftId,
    }),
  })
}

export function deleteFlight(flightId) {
  return apiFetch(`/api/flight/${flightId}`, {
    method: 'DELETE',
  })
}
