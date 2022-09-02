//menangkap isi dari element dari form
let absensi_form = document.getElementById('absensi_form');
let root = document.getElementById('root');

//membuat array untuk menampung data absensi
let absensi_data = [];

// tambahkan event listener submit ke element absensi_form
absensi_form.addEventListener('submit', (event) => {
  //mencegah form dari reload page
  event.preventDefault();

  let fullname = event.target.fullname.value;

  //mini validasi
  if (fullname == '') {
    alert('Silahkan masukan nama bang...');
    return;
  }

  //push data ke dalam array absensi_data
  absensi_data.push({
    nama_lengkap: fullname, //mengambil value dari input
    waktu: new Date().toLocaleTimeString(), //function javascript untuk waktu
    tanggal: new Date().toLocaleDateString(), //function javascript untuk tanggal
  });

  //reset input field
  event.target.fullname.value = ''; //mengakses input menggunakan event

  //panngil function render HTML
  renderToHtml();
});

//render semua data ke dalam tampilan HTML
function renderToHtml() {
  //reset element div root
  root.innerHTML = '';

  //mapping array to html element
  absensi_data.forEach((e, i) => {
    root.innerHTML += `
        <div class="card" draggable="true" ondragend="handleDelete(${i})" >
        <span>${i + 1} . &nbsp; ${e.nama_lengkap}</span>  
        <span> ${e.waktu} ${e.tanggal}</span>
        </div>
        `;
    // //i+1 adalah untuk mencegah agar index tidak ditampilkan dari 0
  });
}

//delete function
function handleDelete(i) {
  //alert untuk confirmasi delete
  let confirmDelete = confirm('yakin delete?');

  if (!confirmDelete) {
    return;
  }

  //delete 1 data dari array
  absensi_data.splice(i, 1);

  //render kembali element nya
  renderToHtml();
}
