
export default function BiodataDiri() {
  return (
    <div className="container">
      <h1>Biodata saya</h1>
      <Foto />
      <Nama />
      <Nim />
      <Jurusan />
      <Hobi />
      <Alamat />
    </div>
  );
}

function Alamat() {
  return <p>Alamat: Jl.Alam Indah,Pekanbaru</p>;
}

function Foto() {
  return <img src="public\img\foto.jpg" alt="foto" />;
}

function Hobi() {
  return <p>Hobi: Play Volly Ball</p>;
}

function Jurusan() {
  return <p>Jurusan: Sistem Informasi</p>;
}

function Nama() {
  return <p>Nama: Alya Deka Danisha</p>;
}

function Nim() {
  return <p>NIM: 2457301011</p>;
}
