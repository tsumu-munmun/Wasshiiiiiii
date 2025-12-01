// ページ読み込み完了でローディング画面を消す
window.addEventListener("load", () => {
  const loading = document.getElementById("loading-screen");
  loading.style.transition = "opacity 0.5s";
  loading.style.opacity = 0;
  setTimeout(() => loading.remove(), 500); // 完全に削除
});



// =====================================
// falling.js（リスト順＋5パターン＋大きめサイズ）
// =====================================

// 落下画像リスト（順番に降る）
const images = [
  "images/niwatori.png",
  "images/washi.png",
  "images/ozi.png",
  "images/Hiyoko.png",
  "images/Azarasshy.png",
  "images/kani.png",
  "images/kuma-kanban.png",
  "images/hato.png"
];

const area = document.querySelector(".falling-area");

// 出現位置パターン
const positions = ["center", "rightEdge", "leftEdge", "rightCenter", "leftCenter"];
let positionIndex = 0; // どの位置か
let imageIndex = 0; // どの画像か

function createFallingImage() {
  const img = document.createElement("img");
  img.src = images[imageIndex]; // リスト順に
  img.classList.add("falling-item");

  // サイズ調整（少し大きめ）
  let size;
  if (window.innerWidth > 1024) {
    size = Math.random() * 150 + 250; // PC
  } else if (window.innerWidth > 768) {
    size = Math.random() * 100 + 180; // タブレット
  } else {
    size = Math.random() * 60 + 120; // スマホ
  }
  img.style.width = `${size}px`;

  // 位置設定（5パターン）
  const pattern = positions[positionIndex];
  let left;
  const offset = Math.random() * 5 - 2.5; // ±2.5%微調整
  switch (pattern) {
    case "center": left = 45 + offset; break;
    case "rightEdge": left = 90 + offset; break;
    case "leftEdge": left = 0 + offset; break;
    case "rightCenter": left = 65 + offset; break;
    case "leftCenter": left = 25 + offset; break;
  }
  img.style.left = `${left}%`;

  // 次のパターン＆画像へ
  positionIndex = (positionIndex + 1) % positions.length;
  imageIndex = (imageIndex + 1) % images.length;

  // 落下スピード（ゆっくりランダム）
  const duration = Math.random() * 6 + 9; // 9〜15秒
  img.style.animationDuration = `${duration}s`;

  // 追加＆削除
  area.appendChild(img);
  img.addEventListener("animationend", () => img.remove());
}

// 出現頻度（1秒ごとに1枚）
setInterval(createFallingImage, 1500);



// =====================================
// ハンバーガーメニュー）
const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("side-menu");

hamburger.addEventListener("click", () => {
  sideMenu.classList.toggle("open");
  hamburger.classList.toggle("open"); // ×マークに切替
});


// =====================================
// スクロールアニメーション
// Intersection Observer を使ってふわっと出す
const faders = document.querySelectorAll('.fade-up');

const options = {
  threshold: 0.2 // 20%見えたら発火
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target); // 一度表示したら監視解除
    }
  });
}, options);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});





// =====================================
// スライドショー（profile-slideshow用）
// =====================================

// slides の要素を正しく取得
const slides = document.querySelectorAll(".profile-slideshow .slides img");
let currentSlide = 0;

// 指定したスライドを表示
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.opacity = i === index ? "1" : "0";
    slide.style.transition = "opacity 1s";
    slide.style.position = "absolute";
    slide.style.top = 0;
    slide.style.left = 0;
    slide.style.width = "100%";
    slide.style.height = "100%";
    slide.style.objectFit = "contain"; // はみ出さず収まる
  });
}



// 次のスライドへ
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// 初回表示
showSlide(currentSlide);

// 3秒ごとに切り替え
setInterval(nextSlide, 3000);


const dots = document.querySelectorAll(".profile-slideshow .dot");

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index; // クリックしたドットの番号をスライド番号に
    showSlide(currentSlide);

    // ドットのアクティブ状態も更新
    dots.forEach(d => d.classList.remove("active"));
    dot.classList.add("active");
  });
});





// =====================================
// ニワトリの画像、右下に表示させるためのJS
// ボタン表示
const profileSection = document.getElementById("profile");
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > profileSection.offsetTop) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

// クリックでTOPへ
document.querySelector(".circle-btn").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});



