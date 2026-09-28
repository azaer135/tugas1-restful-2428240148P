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
    namaMahasiswa: "M.Dzaky Aburrahman",
    nim: "2428240148P",
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

// GET /student-organizations
// Body: -
app.get("/student-organizations", (req, res) => {
  const { jenis } = req.query;

  // Jika menggunakan filter jenis
  if (jenis !== undefined) {
    const filteredData = studentOrganizations.filter(
      (organization) => organization.jenis === jenis
    );

    return res.status(200).json(filteredData);
  }

  // Mengembalikan seluruh data
  res.status(200).json(studentOrganizations);
});

// GET /student-organizations/:id
// Body: -
app.get("/student-organizations/:id", (req, res) => {
  const id = Number(req.params.id);

  const organization = studentOrganizations.find(
    (item) => item.id === id
  );

  if (!organization) {
    return res.status(404).json({
      status: "error",
      message: `Data organisasi mahasiswa dengan id ${id} tidak ditemukan`,
      data: null
    });
  }

  res.status(200).json(organization);
});


