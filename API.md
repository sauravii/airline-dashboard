# Airline Dashboard Backend API

Dokumentasi ini untuk kebutuhan integrasi frontend ke backend (Spring Boot) untuk project **Airline Dashboard**.

## Base URL

Sesuaikan dengan port yang dipakai backend (lihat `application.yml`). Contoh:

- `http://localhost:8081`

Semua endpoint di bawah diasumsikan menggunakan base URL tersebut.

## Authentication (JWT)

### Login

- **Method**: `POST`
- **Path**: `/api/auth/login`
- **Auth**: Tidak perlu token
- **Content-Type**: `application/json`

Request body:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Response (200 OK):

```json
{
  "token": "<JWT>",
  "tokenType": "Bearer",
  "expiresInMs": 86400000
}
```

### Mengirim Token ke Endpoint Protected

Semua endpoint selain `/api/auth/**` **wajib** pakai header:

- `Authorization: Bearer <JWT>`

Jika token tidak ada / invalid / expired, response:

- `401 Unauthorized`

---

## Aircraft API

Base path: `/api/aircraft`

### 1) Get All Aircraft

- **Method**: `GET`
- **Path**: `/api/aircraft`
- **Auth**: Bearer Token

Response (200 OK):

```json
[
  {
    "aircraftId": 1,
    "model": "Boeing 737",
    "totalSeats": 180,
    "status": "ACTIVE"
  }
]
```

### 2) Get Aircraft By ID

- **Method**: `GET`
- **Path**: `/api/aircraft/{id}`
- **Auth**: Bearer Token

Response (200 OK):

```json
{
  "aircraftId": 1,
  "model": "Boeing 737",
  "totalSeats": 180,
  "status": "ACTIVE"
}
```

Jika ID tidak ditemukan:

- `404 Not Found`

### 3) Create Aircraft

- **Method**: `POST`
- **Path**: `/api/aircraft`
- **Auth**: Bearer Token
- **Content-Type**: `application/json`

Request body:

```json
{
  "model": "Boeing 737",
  "totalSeats": 180,
  "status": "ACTIVE"
}
```

Response (201 Created):

```json
{
  "aircraftId": 1,
  "model": "Boeing 737",
  "totalSeats": 180,
  "status": "ACTIVE"
}
```

Validasi:

- `totalSeats` minimal `1`

Jika request tidak valid:

- `400 Bad Request`

### 4) Update Aircraft

- **Method**: `PUT`
- **Path**: `/api/aircraft/{id}`
- **Auth**: Bearer Token
- **Content-Type**: `application/json`

Request body:

```json
{
  "model": "Boeing 737 MAX",
  "totalSeats": 190,
  "status": "MAINTENANCE"
}
```

Response (200 OK):

```json
{
  "aircraftId": 1,
  "model": "Boeing 737 MAX",
  "totalSeats": 190,
  "status": "MAINTENANCE"
}
```

Jika ID tidak ditemukan:

- `404 Not Found`

### 5) Delete Aircraft

- **Method**: `DELETE`
- **Path**: `/api/aircraft/{id}`
- **Auth**: Bearer Token

Response:

- `204 No Content`

Jika ID tidak ditemukan:

- `404 Not Found`

Jika aircraft masih direferensikan oleh flight (FK constraint):

- `409 Conflict`
- Message: `Aircraft is referenced by existing flights`

---

## Flight API

Base path: `/api/flight`

Field penting:

- `departureTime` format: `yyyy-MM-dd'T'HH:mm:ss` (contoh: `2025-12-15T10:30:00`)
- `aircraftId` harus mengarah ke aircraft yang ada.

### 1) Get All Flights

- **Method**: `GET`
- **Path**: `/api/flight`
- **Auth**: Bearer Token

Response (200 OK):

```json
[
  {
    "flightId": 1,
    "origin": "CGK",
    "destination": "DPS",
    "departureTime": "2025-12-15T10:30:00",
    "aircraftId": 1
  }
]
```

### 2) Get Flight By ID

- **Method**: `GET`
- **Path**: `/api/flight/{id}`
- **Auth**: Bearer Token

Response (200 OK):

```json
{
  "flightId": 1,
  "origin": "CGK",
  "destination": "DPS",
  "departureTime": "2025-12-15T10:30:00",
  "aircraftId": 1
}
```

Jika ID tidak ditemukan:

- `404 Not Found`

### 3) Create Flight

- **Method**: `POST`
- **Path**: `/api/flight`
- **Auth**: Bearer Token
- **Content-Type**: `application/json`

Request body:

```json
{
  "origin": "CGK",
  "destination": "DPS",
  "departureTime": "2025-12-15T10:30:00",
  "aircraftId": 1
}
```

Response (201 Created):

```json
{
  "flightId": 1,
  "origin": "CGK",
  "destination": "DPS",
  "departureTime": "2025-12-15T10:30:00",
  "aircraftId": 1
}
```

Jika `aircraftId` tidak ditemukan:

- `400 Bad Request`
- Message: `Aircraft not found`

Jika request tidak valid / format waktu salah:

- `400 Bad Request`

### 4) Update Flight

- **Method**: `PUT`
- **Path**: `/api/flight/{id}`
- **Auth**: Bearer Token
- **Content-Type**: `application/json`

Request body:

```json
{
  "origin": "CGK",
  "destination": "SUB",
  "departureTime": "2025-12-16T08:00:00",
  "aircraftId": 1
}
```

Response (200 OK):

```json
{
  "flightId": 1,
  "origin": "CGK",
  "destination": "SUB",
  "departureTime": "2025-12-16T08:00:00",
  "aircraftId": 1
}
```

Jika `flightId` tidak ditemukan:

- `404 Not Found`

Jika `aircraftId` tidak ditemukan:

- `400 Bad Request`

### 5) Delete Flight

- **Method**: `DELETE`
- **Path**: `/api/flight/{id}`
- **Auth**: Bearer Token

Response:

- `204 No Content`

Jika ID tidak ditemukan:

- `404 Not Found`

---

## Price API

Base path: `/api/price`

### 1) Get Price by Flight ID

- **Method**: `GET`
- **Path**: `/api/price/{flightId}`
- **Auth**: Bearer Token

Response (200 OK):

```json
{
  "priceId": 1,
  "flightId": 1,
  "price": 250000.00
}
```

Jika price belum dibuat:

- `404 Not Found`

### 2) Upsert Price by Flight ID

- **Method**: `PUT`
- **Path**: `/api/price/{flightId}`
- **Auth**: Bearer Token
- **Content-Type**: `application/json`

Request body:

```json
{
  "price": 250000.00
}
```

Response (200 OK):

```json
{
  "priceId": 1,
  "flightId": 1,
  "price": 250000.00
}
```

Jika flight tidak ditemukan:

- `400 Bad Request`
- Message: `Flight not found`

---

## Reservations API

Base path: `/api/reservations`

### 1) Get All Reservations

- **Method**: `GET`
- **Path**: `/api/reservations`
- **Auth**: Bearer Token

Response (200 OK):

```json
[
  {
    "reservationId": 1,
    "flightId": 1,
    "totalSeat": 2,
    "totalAmount": 500000.00,
    "status": "BOOKED",
    "createdAt": "2025-12-29T12:40:00",
    "passengers": [
      {
        "passengerId": 1,
        "name": "Budi",
        "idNumber": "3276xxxxxxxxxxxx",
        "gender": "MALE",
        "dob": "2002-01-01",
        "nationality": "ID"
      }
    ]
  }
]
```

### 2) Get Reservation by ID

- **Method**: `GET`
- **Path**: `/api/reservations/{id}`
- **Auth**: Bearer Token

Jika ID tidak ditemukan:

- `404 Not Found`

### 3) Create Reservation (Booking)

- **Method**: `POST`
- **Path**: `/api/reservations`
- **Auth**: Bearer Token
- **Content-Type**: `application/json`

Request body:

```json
{
  "flightId": 1,
  "passengers": [
    {
      "name": "Budi",
      "idNumber": "3276xxxxxxxxxxxx",
      "gender": "MALE",
      "dob": "2002-01-01",
      "nationality": "ID"
    },
    {
      "name": "Siti",
      "idNumber": "A12345678",
      "gender": "FEMALE",
      "dob": "2001-05-20",
      "nationality": "ID"
    }
  ]
}
```

Response (201 Created):

```json
{
  "reservationId": 1,
  "flightId": 1,
  "totalSeat": 2,
  "totalAmount": 500000.00,
  "status": "BOOKED",
  "createdAt": "2025-12-29T12:40:00",
  "passengers": [
    {
      "passengerId": 1,
      "name": "Budi",
      "idNumber": "3276xxxxxxxxxxxx",
      "gender": "MALE",
      "dob": "2002-01-01",
      "nationality": "ID"
    }
  ]
}
```

Jika flight tidak ditemukan:

- `400 Bad Request`
- Message: `Flight not found`

Jika price untuk flight belum dibuat:

- `400 Bad Request`
- Message: `Price not found for this flight`

Jika kursi tidak cukup:

- `409 Conflict`
- Message: `Not enough seats available`

### 4) Cancel Reservation

- **Method**: `PUT`
- **Path**: `/api/reservations/{id}/cancel`
- **Auth**: Bearer Token

Response (200 OK):

```json
{
  "reservationId": 1,
  "flightId": 1,
  "totalSeat": 2,
  "totalAmount": 500000.00,
  "status": "CANCELLED",
  "createdAt": "2025-12-29T12:40:00",
  "passengers": []
}
```

Jika ID tidak ditemukan:

- `404 Not Found`

---

## Catatan Integrasi

- Pastikan frontend selalu mengirim header `Authorization: Bearer <token>` untuk endpoint `aircraft` dan `flight`.
- Jika backend port berubah, update base URL di frontend.
