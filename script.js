//Bagian Untuk Pop up Awal WELCOME

// document.addEventListener("DOMContentLoaded", function() {
//      alert("Website dalam pengembangan!");
// });

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("welcomeModal");
    const closeBtn = document.querySelector(".close-btn");
    const closeModal = document.getElementById("closeModal");

    // Cek apakah pop-up sudah pernah ditampilkan sebelumnya
    if (!localStorage.getItem("popupShown")) {
        modal.style.display = "flex";
        setTimeout(() => {
            modal.classList.add("show");
        }, 100);

        // Set status bahwa pop-up sudah muncul
        localStorage.setItem("popupShown", "true");
    }

    // Tutup modal saat tombol atau close (×) diklik
    function closePopup() {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }

    closeBtn.addEventListener("click", closePopup);
    closeModal.addEventListener("click", closePopup);

    // Tutup modal jika klik di luar modal
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            closePopup();
        }
    });
});



//Bagian Untuk Pop up <!-- Lisensi & Sertifikasi -->

// Menambahkan event listener pada tombol buka modal
const openModalButtons = document.querySelectorAll('.btn-open-modal');
const closeButtons = document.querySelectorAll('.close-btn');
const modals = document.querySelectorAll('.modal');

// Buka modal saat tombol diklik
openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';
    });
});

// Menutup modal saat tombol close diklik
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.modal').style.display = 'none';
    });
});

// Menutup modal saat klik di luar modal
window.addEventListener('click', (event) => {
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});



//bagian project
document.addEventListener("DOMContentLoaded", function () {
    const openButtons = document.querySelectorAll(".btn-show-more");
    const closeButtons = document.querySelectorAll(".close-btn");
    const modals = document.querySelectorAll(".modal");

    openButtons.forEach(button => {
        button.addEventListener("click", function () {
            const modalId = this.getAttribute("data-modal");
            document.getElementById(modalId).style.display = "flex";
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            this.closest(".modal").style.display = "none";
        });
    });

    window.addEventListener("click", function (e) {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    });
});

// ========================== SLIDER UTAMA (Tiap Proyek) ========================== //
let currentIndexes = {}; // Simpan indeks slide untuk setiap proyek
let slideIntervals = {}; // Simpan interval auto-slide untuk setiap proyek

function changeSlide(projectId, index) {
    let slides = document.querySelectorAll(`#${projectId} .slide`);
    let dots = document.querySelectorAll(`#${projectId} .dot`);

    slides[currentIndexes[projectId]].classList.remove("active");
    dots[currentIndexes[projectId]].classList.remove("active");

    currentIndexes[projectId] = index;

    slides[currentIndexes[projectId]].classList.add("active");
    dots[currentIndexes[projectId]].classList.add("active");
}

function startAutoSlide(projectId) {
    stopAutoSlide(projectId); // Pastikan tidak ada interval yang berjalan sebelumnya
    slideIntervals[projectId] = setInterval(() => {
        let slides = document.querySelectorAll(`#${projectId} .slide`);
        let nextIndex = (currentIndexes[projectId] + 1) % slides.length;
        changeSlide(projectId, nextIndex);
    }, 3000);
}

function stopAutoSlide(projectId) {
    clearInterval(slideIntervals[projectId]);
}

// Aktifkan auto-slide untuk setiap proyek
document.querySelectorAll(".portfolio-item").forEach((project) => {
    let projectId = project.getAttribute("id");
    currentIndexes[projectId] = 0;
    startAutoSlide(projectId);
});

// Event listener untuk tombol navigasi (dot)
document.querySelectorAll(".portfolio-item").forEach((project) => {
    let projectId = project.getAttribute("id");

    project.querySelectorAll(".dot").forEach((dot, index) => {
        dot.addEventListener("click", () => {
            stopAutoSlide(projectId);
            changeSlide(projectId, index);
            startAutoSlide(projectId);
        });
    });
});





//bagian dalam project
let currentModalSlides = {}; // Objek untuk menyimpan indeks per modal
let modalIntervals = {}; // Objek untuk menyimpan interval per modal

// Fungsi untuk mengubah slide modal tertentu
function changeModalSlide(modalId, index) {
    const modal = document.getElementById(modalId);
    const slidesModal = modal.querySelectorAll('.slide-modal');
    const dotsModal = modal.querySelectorAll('.dot-modal');

    // Hapus class 'active' dari slide dan dot sebelumnya
    slidesModal[currentModalSlides[modalId]].classList.remove('active');
    dotsModal[currentModalSlides[modalId]].classList.remove('active');

    // Update indeks
    currentModalSlides[modalId] = index;

    // Tambahkan class 'active' ke slide dan dot baru
    slidesModal[currentModalSlides[modalId]].classList.add('active');
    dotsModal[currentModalSlides[modalId]].classList.add('active');
}

// Fungsi untuk auto-slide modal tertentu
function startModalAutoSlide(modalId) {
    stopModalAutoSlide(modalId); // Hentikan auto-slide sebelumnya jika ada

    modalIntervals[modalId] = setInterval(() => {
        const modal = document.getElementById(modalId);
        const slidesModal = modal.querySelectorAll('.slide-modal');

        let nextSlide = (currentModalSlides[modalId] + 1) % slidesModal.length;
        changeModalSlide(modalId, nextSlide);
    }, 2000); // Ganti gambar setiap 2 detik
}

// Fungsi untuk menghentikan auto-slide modal tertentu
function stopModalAutoSlide(modalId) {
    clearInterval(modalIntervals[modalId]);
}

// Event listener untuk membuka modal dan mulai auto-slide
document.querySelectorAll('.btn-show-more').forEach((button) => {
    button.addEventListener('click', function () {
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        
        if (!modal) {
            console.error(`Modal dengan ID ${modalId} tidak ditemukan!`);
            return;
        }

        modal.style.display = 'flex';

        // Pastikan modal memiliki indeks awal
        currentModalSlides[modalId] = 0;

        // Mulai auto-slide untuk modal yang dibuka
        startModalAutoSlide(modalId);
    });
});

// Event listener untuk menutup modal dan menghentikan auto-slide
document.querySelectorAll('.close-btn').forEach((button) => {
    button.addEventListener('click', function () {
        const modal = this.closest('.modal');
        
        if (!modal) {
            console.error("Modal tidak ditemukan saat mencoba menutup.");
            return;
        }

        modal.style.display = 'none';
        stopModalAutoSlide(modal.id);
    });
});

    
    