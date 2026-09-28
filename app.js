const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware untuk membaca JSON request
app.use(express.json());

// Data awal Unit Kegiatan Mahasiswa
let studentOrganizations = [
  {
    id: 1,
    nama: "UKM Paduan Suara",
    jenis: "seni",
    ketua: "Maria Anggraini",
    tahunBerdiri: 2008,
    jumlahAnggota: 65
  },
  {
    id: 2,
    nama: "UKM Basket",
    jenis: "olahraga",
    ketua: "Andi Pratama",
    tahunBerdiri: 2010,
    jumlahAnggota: 45
  },
  {
    id: 3,
    nama: "UKM Robotika",
    jenis: "akademik",
    ketua: "Budi Santoso",
    tahunBerdiri: 2015,
    jumlahAnggota: 35
  }
];

// ID berikutnya
let nextId = 4;

// Informasi API
// GET /
app.get("/", (req, res) => {
  res.status(200).json({
    namaMahasiswa: "NAMA MAHASISWA",
    nim: "NIM MAHASISWA",
    nomorTopik: 38,
    endpoints: [
      "GET /",
      "GET /student-organizations",
      "GET /student-organizations/:id",
      "GET /student-organizations?jenis=seni",
      "POST /student-organizations",
      "PUT /student-organizations/:id",
      "DELETE /student-organizations/:id"
    ]
  });
});

