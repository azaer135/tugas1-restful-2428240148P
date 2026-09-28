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
    nim: "2428240148p",
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

// POST /student-organizations
// Body: {
//   "nama": "UKM Paduan Suara",
//   "jenis": "seni",
//   "ketua": "Maria Anggraini",
//   "tahunBerdiri": 2008,
//   "jumlahAnggota": 65
// }
app.post("/student-organizations", (req, res) => {
  const {
    nama,
    jenis,
    ketua,
    tahunBerdiri,
    jumlahAnggota
  } = req.body;

  // Validasi field wajib
  if (
    typeof nama !== "string" ||
    nama.trim() === "" ||
    typeof jenis !== "string" ||
    jenis.trim() === "" ||
    typeof ketua !== "string" ||
    ketua.trim() === "" ||
    jumlahAnggota === undefined ||
    jumlahAnggota === null
  ) {
    return res.status(400).json({
      status: "error",
      message: "Field wajib: nama, jenis, ketua, dan jumlahAnggota harus diisi",
      data: null
    });
  }

  // Validasi jenis
  const jenisValid = [
    "akademik",
    "olahraga",
    "seni",
    "sosial"
  ];

  if (!jenisValid.includes(jenis)) {
    return res.status(400).json({
      status: "error",
      message: "Jenis harus berupa akademik, olahraga, seni, atau sosial",
      data: null
    });
  }

  // Validasi tipe jumlahAnggota
  if (
    typeof jumlahAnggota !== "number" ||
    !Number.isFinite(jumlahAnggota) ||
    jumlahAnggota < 0
  ) {
    return res.status(400).json({
      status: "error",
      message: "jumlahAnggota harus berupa angka dan tidak boleh negatif",
      data: null
    });
  }

  // Validasi tahunBerdiri jika diisi
  if (
    tahunBerdiri !== undefined &&
    (
      typeof tahunBerdiri !== "number" ||
      !Number.isFinite(tahunBerdiri)
    )
  ) {
    return res.status(400).json({
      status: "error",
      message: "tahunBerdiri harus berupa angka",
      data: null
    });
  }

  const newOrganization = {
    id: nextId++,
    nama: nama.trim(),
    jenis,
    ketua: ketua.trim(),
    tahunBerdiri:
      tahunBerdiri !== undefined ? tahunBerdiri : null,
    jumlahAnggota
  };

  studentOrganizations.push(newOrganization);

  res.status(201).json({
    status: "success",
    message: "Data organisasi mahasiswa berhasil ditambahkan",
    data: newOrganization
  });
});

// PUT /student-organizations/:id
// Body: {
//   "nama": "UKM Paduan Suara",
//   "jenis": "seni",
//   "ketua": "Maria Anggraini",
//   "tahunBerdiri": 2008,
//   "jumlahAnggota": 65
// }
app.put("/student-organizations/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = studentOrganizations.findIndex(
    (item) => item.id === id
  );

  // Jika data tidak ditemukan
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: `Data organisasi mahasiswa dengan id ${id} tidak ditemukan`,
      data: null
    });
  }

  const {
    nama,
    jenis,
    ketua,
    tahunBerdiri,
    jumlahAnggota
  } = req.body;

  // Validasi field wajib
  if (
    typeof nama !== "string" ||
    nama.trim() === "" ||
    typeof jenis !== "string" ||
    jenis.trim() === "" ||
    typeof ketua !== "string" ||
    ketua.trim() === "" ||
    jumlahAnggota === undefined ||
    jumlahAnggota === null
  ) {
    return res.status(400).json({
      status: "error",
      message: "Field wajib: nama, jenis, ketua, dan jumlahAnggota harus diisi",
      data: null
    });
  }

  // Validasi jenis
  const jenisValid = [
    "akademik",
    "olahraga",
    "seni",
    "sosial"
  ];

  if (!jenisValid.includes(jenis)) {
    return res.status(400).json({
      status: "error",
      message: "Jenis harus berupa akademik, olahraga, seni, atau sosial",
      data: null
    });
  }

  // Validasi jumlahAnggota
  if (
    typeof jumlahAnggota !== "number" ||
    !Number.isFinite(jumlahAnggota) ||
    jumlahAnggota < 0
  ) {
    return res.status(400).json({
      status: "error",
      message: "jumlahAnggota harus berupa angka dan tidak boleh negatif",
      data: null
    });
  }

  // Validasi tahunBerdiri
  if (
    tahunBerdiri !== undefined &&
    (
      typeof tahunBerdiri !== "number" ||
      !Number.isFinite(tahunBerdiri)
    )
  ) {
    return res.status(400).json({
      status: "error",
      message: "tahunBerdiri harus berupa angka",
      data: null
    });
  }

  // Mengganti seluruh data
  const updatedOrganization = {
    id,
    nama: nama.trim(),
    jenis,
    ketua: ketua.trim(),
    tahunBerdiri:
      tahunBerdiri !== undefined ? tahunBerdiri : null,
    jumlahAnggota
  };

  studentOrganizations[index] = updatedOrganization;

  res.status(200).json({
    status: "success",
    message: `Data organisasi mahasiswa dengan id ${id} berhasil diperbarui`,
    data: updatedOrganization
  });
});

// DELETE /student-organizations/:id
// Body: -
app.delete("/student-organizations/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = studentOrganizations.findIndex(
    (item) => item.id === id
  );

  // Jika data tidak ditemukan
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: `Data organisasi mahasiswa dengan id ${id} tidak ditemukan`,
      data: null
    });
  }

  studentOrganizations.splice(index, 1);

  res.status(200).json({
    status: "success",
    message: `Data organisasi mahasiswa dengan id ${id} berhasil dihapus`,
    data: null
  });
});

// Catch-all 404
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint tidak ditemukan",
    data: null
  });
});

// Menjalankan server hanya ketika bukan production
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;