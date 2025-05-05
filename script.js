let questions = [
  {
    question: "1. Bentuk negara Indonesia adalah...",
    options: [" Monarki", "Republik", "Federasi", "Konfenderasi"],
    answer: 1
  },
  {
    question: "2. Pancasila ditetapkan sebagai dasar negara pada tanggal...",
    options: ["1 Juni 1945", "17 Agustus 1945", "18 Agustus 1945", "29 Mei 1945"],
    answer: 2
  },
  {
    question: "3. Lembaga yang berwenang memeriksa keuangan negara adalah...",
    options: ["KPK", "BPK", "MA", "KPU"],
    answer: 1
  },
  {
    question: "4. UUD 1945 merupakan sumber hukum...",
    options: ["Tinggi", "Tambahan", "Cadangan", "Pengganti"],
    answer: 0
  },
  {
    question: "5. Jika X + Y = 20 dan X - Y = 4, maka nilai X = ?",
    options: ["8", "10", "12", "14"],
    answer: 2
  },
  {
    question: "6. Jika sebuah buku dijual dengan diskon 25% dan harga diskon adalah Rp45.000, maka harga sebelum diskon adalah...",
    options: ["Rp60.000", "Rp55.000", "Rp50.000", "Rp48.000"],
    answer: 0
  },
  {
    question: "7. Deret angka berikutnya dari 2, 4, 8, 16, ... adalah",
    options: ["24", "30", "32", "36"],
    answer: 2
  },
  {
    question: "8. Saat dihadapkan pada pilihan sulit, saya...",
    options: ["Menghindarinya", "Mengambil keputusan berdasarkan emosi", "Berkonsultasi lalu mengambil keputusan logis", "Menyerahkan keputusan pada orang lain"],
    answer: 2
  },
  {
    question: "9. Jika saya selesai lebih cepat dari rekan lain, saya akan...",
    options: ["Istirahat", "Menunggu instruksi baru", "Membantu rekan lain", "Pulang cepat"],
    answer: 2
  },
  {
    question: "10. Saya diminta kerja lembur oleh atasan di akhir pekan, saya akan...",
    options: ["Menolaknya langsung", "Mencari alasan", "Mempertimbangkan dan bersedia jika memang penting", "Mengabaikannya"],
    answer: 2
  }

];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let timer;
let timeLeft = 30; // 30 menit 600 10 menit
let userName = "";

function startQuiz() {
  userName = document.getElementById("nameInput").value.trim();
  if (userName === "") {
    alert("Masukkan namamu dulu, BRO!");
    return;
  }

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";
document.getElementById("submit-btn").style.display = "none";
document.getElementById("submit-btn").style.display = "block";

  showQuestion();
  startTimer();
}

function showQuestion() {
  let q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;

  let optionsHTML = "";
  q.options.forEach((opt, i) => {
    let checked = userAnswers[currentQuestion] === i ? "checked" : "";
    optionsHTML += `
      <label class="option">
        <input type="radio" name="option" value="${i}" ${checked} />
        ${opt}
      </label>
    `;
  });
  document.getElementById("options").innerHTML = optionsHTML;
}

function nextQuestion() {
  saveAnswer();
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  }
}

function prevQuestion() {
  saveAnswer();
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

function saveAnswer() {
  let options = document.getElementsByName("option");
  options.forEach(opt => {
    if (opt.checked) {
      userAnswers[currentQuestion] = parseInt(opt.value);
    }
  });
}

function submitQuiz() {
  saveAnswer();
  clearInterval(timer);

  userAnswers.forEach((ans, i) => {
    if (ans === questions[i].answer) {
      score++;
    }
  });

  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";
  document.getElementById("final-name").innerText = `Nama: ${userName}`;
  document.getElementById("final-score").innerText = `Skormu: ${score} dari ${questions.length}`;
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Waktu habis!");
      submitQuiz();
    }
  }, 1000);
}


function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  // Ganti ikon
  const btn = document.getElementById("toggle-dark");
  if (document.body.classList.contains("dark-mode")) {
    btn.innerText = "☀️";
  } else {
    btn.innerText = "🌙";
  }
}
