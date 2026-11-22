# EPrT® Interactive Learning & Simulation Suite

Aplikasi simulasi interaktif **English Proficiency Test (EPrT®)** berbasis **React + TypeScript + Tailwind CSS**, dilengkapi fitur **Multi-Voice Text-to-Speech** dan **CRUD Bank Soal** berbasis `localStorage` + JSON Export/Import.

## Fitur Utama

1. **Listening Comprehension (Multi-Voice Web Speech API)**
   - **Part A: Short Dialogue** (pembedaan suara `Man`, `Woman`, dan `Narrator`, pengatur kecepatan bicara, mode Latihan Bebas vs Simulasi Ujian `1x` putar + timer jawab 15 detik).
   - **Part B: Long Dialogue** (percakapan panjang dengan pemutar soal individual dan transkrip).
   - **Part C: Lecture** (monolog kuliah akademik dan soal pemahaman).
2. **Structure and Written Expression**
   - **Part A: Sentence Completion** (soal tata bahasa beserta analisis kalimat).
   - **Part B: Error Recognition** (segmen bergaris bawah `A`, `B`, `C`, `D` yang dapat diklik langsung pada kalimat).
3. **Reading Comprehension**
   - Tampilan *Split-Screen* dengan penomoran paragraf, pengatur ukuran huruf, serta pembahasan tiap soal.
4. **Manajemen Bank Soal (CRUD)**
   - Tambah, edit, hapus, cari soal, ekspor/impor file `.json`, dan reset ke bank soal bawaan.
5. **Estimator Skor EPrT® (Skala 310 – 677)**
   - Kalkulasi konversi otomatis per bagian (`31–68`) dan proyeksi skor akhir.

## Cara Menjalankan di Lokal

```bash
npm install
npm run dev
```
