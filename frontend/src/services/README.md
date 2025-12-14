# `src/services`

Folder ini berisi layer akses data (API client) ke backend.

Tujuan:
- Memusatkan request HTTP di satu tempat
- Halaman (`src/pages`) tinggal memanggil fungsi service

Catatan:
- Semua request ke backend menggunakan prefix `/api/...` (diprxy oleh Vite ke `http://localhost:8081`).
