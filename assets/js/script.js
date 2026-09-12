// =========================================================
// BRUNO DECORAÇÕES — script.js
// =========================================================

const WHATSAPP_NUMBER = "351938186097";

// =========================
// NAVBAR NO SCROLL
// =========================
const navbar = document.querySelector(".navbar");
function handleNavbarScroll(){
  if(!navbar) return;
  if(window.scrollY > 40){
    navbar.classList.add("scrolled");
  }else{
    navbar.classList.remove("scrolled");
  }
}
window.addEventListener("scroll", handleNavbarScroll);
handleNavbarScroll();

// =========================
// MENU MOBILE
// =========================
const menuButton = document.querySelector(".menu-mobile");
const menuList = document.querySelector(".navbar nav ul");

if(menuButton && menuList){
  menuButton.addEventListener("click", () => {
    menuList.classList.toggle("active");
    const icon = menuButton.querySelector("i");
    const isOpen = menuList.classList.contains("active");
    icon.classList.toggle("bi-list", !isOpen);
    icon.classList.toggle("bi-x-lg", isOpen);
  });

  document.querySelectorAll(".navbar nav ul a").forEach(link => {
    link.addEventListener("click", () => {
      menuList.classList.remove("active");
      const icon = menuButton.querySelector("i");
      icon.classList.remove("bi-x-lg");
      icon.classList.add("bi-list");
    });
  });
}

// =========================
// REVEAL ON SCROLL
// =========================
const revealEls = document.querySelectorAll(".reveal");
if(revealEls.length){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));
}

// =========================
// AMOSTRAS DE COR NOS QUADRADOS (grelha de categoria)
// =========================
document.querySelectorAll(".color-swatches").forEach(group => {
  const wrap = group.closest(".product-img-wrap");
  const img = wrap?.querySelector(".product-img img");
  if(!img) return;

  group.querySelectorAll(".swatch").forEach(swatch => {
    swatch.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      group.querySelectorAll(".swatch").forEach(s => s.classList.remove("active"));
      swatch.classList.add("active");
      img.src = swatch.dataset.img;
    });
  });
});

// =========================
// PÁGINA DE PRODUTO (galeria + opções + pedido WhatsApp)
// =========================
const galleryMain = document.getElementById("galleryMain");
const galleryThumbs = document.querySelectorAll(".gallery-thumb");

if(galleryMain && galleryThumbs.length){
  galleryThumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      galleryThumbs.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      galleryMain.querySelector("img").src = thumb.querySelector("img").src;
    });
  });
}

document.querySelectorAll(".option-buttons").forEach(group => {
  const buttons = group.querySelectorAll(".option-btn");
  const isColorGroup = group.dataset.optionName === "Cor";
  const customField = isColorGroup ? document.getElementById("customColorField") : null;
  const customInput = isColorGroup ? document.getElementById("customColorInput") : null;

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // se o botão de cor tiver uma foto associada, atualiza a galeria
      if(btn.dataset.img && galleryMain){
        galleryMain.querySelector("img").src = btn.dataset.img;
        galleryThumbs.forEach(t => {
          t.classList.toggle("active", t.querySelector("img").src === btn.dataset.img);
        });
      }

      // mostra/esconde o campo de cor personalizada
      if(customField){
        if(btn.dataset.value === "Personalizado"){
          customField.classList.add("visible");
          customInput?.focus();
        }else{
          customField.classList.remove("visible");
        }
      }
    });
  });
});

const productAskBtn = document.getElementById("productAskBtn");
if(productAskBtn){
  productAskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const nomeProduto = productAskBtn.dataset.product;

    let texto = `Olá! Tenho interesse em: ${nomeProduto}.`;

    document.querySelectorAll(".option-group").forEach(group => {
      const label = group.querySelector(".option-label")?.textContent;
      const activeBtn = group.querySelector(".option-btn.active");
      if(!label || !activeBtn) return;

      if(activeBtn.dataset.value === "Personalizado"){
        const customValor = document.getElementById("customColorInput")?.value.trim();
        texto += customValor
          ? `\n${label}: Personalizada — ${customValor}`
          : `\n${label}: Personalizada (a combinar)`;
      }else{
        texto += `\n${label}: ${activeBtn.dataset.value}`;
      }
    });

    texto += `\nPodem confirmar disponibilidade e enviar mais informações?`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank", "noopener");
  });
}

// =========================
// FILTRO DE PRODUTOS POR ACABAMENTO
// =========================
document.querySelectorAll(".filter-bar").forEach(bar => {
  const grid = bar.parentElement.querySelector(".product-grid");
  if(!grid) return;

  const buttons = bar.querySelectorAll(".filter-btn");
  const products = grid.querySelectorAll(".product");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      button.classList.add("active");

      const filtro = button.dataset.filter;

      products.forEach(product => {
        if(filtro === "all" || product.dataset.filter === filtro){
          product.classList.remove("hide");
        }else{
          product.classList.add("hide");
        }
      });
    });
  });
});

// =========================
// PORTEFÓLIO (Móveis / Cozinhas / Estofos)
// =========================================================
//
// COMO ADICIONAR MAIS FOTOS NO FUTURO:
// 1) Coloca a foto dentro da pasta  assets/images/portfolio/
// 2) Acrescenta o caminho da foto na lista "images" da categoria certa,
//    aqui em baixo. Não é preciso mexer em mais nada — o site adapta-se
//    automaticamente ao número de fotos que existirem.
//
// COMO ADICIONAR UMA NOVA CATEGORIA (ex: "Roupeiros"):
// 1) Acrescenta uma nova linha ao objeto portfolioData, seguindo o
//    mesmo formato das outras (chave, label e lista de imagens).
// 2) O separador (botão) da categoria é criado sozinho pelo script.
//
const portfolioData = {
  moveis: {
    label: "Móveis",
    images: [
      "assets/images/portfolio/moveis-1.jpg",
      "assets/images/portfolio/moveis-2.jpg",
      "assets/images/portfolio/moveis-3.jpg",
    ],
  },
  cozinhas: {
    label: "Cozinhas",
    images: [
      "assets/images/portfolio/cozinhas-1.jpg",
      "assets/images/portfolio/cozinhas-2.jpg",
    ],
  },
  estofos: {
    label: "Estofos",
    images: [
      "assets/images/portfolio/estofos-1.jpg",
      "assets/images/portfolio/estofos-2.jpg",
      "assets/images/portfolio/estofos-3.jpg",
      "assets/images/portfolio/estofos-4.jpg",
      "assets/images/portfolio/estofos-5.jpg",
    ],
  },
};

const portfolioTabsEl = document.getElementById("portfolioTabs");
const portfolioImageEl = document.getElementById("portfolioImage");
const portfolioDotsEl = document.getElementById("portfolioDots");
const portfolioCounterEl = document.getElementById("portfolioCounter");
const portfolioPrevBtn = document.getElementById("portfolioPrev");
const portfolioNextBtn = document.getElementById("portfolioNext");

if(portfolioTabsEl && portfolioImageEl){

  const categoryKeys = Object.keys(portfolioData);
  let currentCategory = categoryKeys[0];
  let currentImage = 0;

  // cria os separadores (tabs) automaticamente a partir de portfolioData
  categoryKeys.forEach((key, index) => {
    const btn = document.createElement("button");
    btn.className = "portfolio-tab" + (index === 0 ? " active" : "");
    btn.textContent = portfolioData[key].label;
    btn.dataset.category = key;
    btn.addEventListener("click", () => {
      currentCategory = key;
      currentImage = 0;
      renderPortfolio();
    });
    portfolioTabsEl.appendChild(btn);
  });

  function renderPortfolio(){
    const data = portfolioData[currentCategory];
    if(!data || !data.images.length) return;

    if(currentImage >= data.images.length) currentImage = 0;
    if(currentImage < 0) currentImage = data.images.length - 1;

    portfolioImageEl.style.opacity = "0";
    setTimeout(() => {
      portfolioImageEl.src = data.images[currentImage];
      portfolioImageEl.alt = `${data.label} — foto ${currentImage + 1}`;
      portfolioImageEl.style.opacity = "1";
    }, 180);

    // tabs ativos
    portfolioTabsEl.querySelectorAll(".portfolio-tab").forEach(tab => {
      tab.classList.toggle("active", tab.dataset.category === currentCategory);
    });

    // dots
    portfolioDotsEl.innerHTML = "";
    data.images.forEach((_, index) => {
      const dot = document.createElement("span");
      if(index === currentImage) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentImage = index;
        renderPortfolio();
      });
      portfolioDotsEl.appendChild(dot);
    });

    // contador
    portfolioCounterEl.textContent = `${currentImage + 1} / ${data.images.length}`;
  }

  portfolioPrevBtn?.addEventListener("click", () => {
    currentImage--;
    renderPortfolio();
  });
  portfolioNextBtn?.addEventListener("click", () => {
    currentImage++;
    renderPortfolio();
  });

  // swipe no telemóvel
  let touchStartX = 0;
  portfolioImageEl.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  portfolioImageEl.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if(Math.abs(diff) < 50) return;
    if(diff > 0) currentImage++; else currentImage--;
    renderPortfolio();
  });

  renderPortfolio();
}

// =========================
// FORMULÁRIO DE CONTACTO -> WHATSAPP
// =========================
const contactForm = document.getElementById("contactForm");

if(contactForm){
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("cf-nome")?.value.trim() || "";
    const contacto = document.getElementById("cf-contacto")?.value.trim() || "";
    const categoria = document.getElementById("cf-categoria")?.value || "";
    const mensagem = document.getElementById("cf-mensagem")?.value.trim() || "";

    if(!nome || !contacto || !mensagem){
      alert("Por favor preencha nome, contacto e mensagem antes de enviar.");
      return;
    }

    let texto = `Olá! Chamo-me ${nome} e gostaria de saber mais informações.`;
    if(categoria){
      texto += `\nInteresse: ${categoria}`;
    }
    texto += `\nContacto: ${contacto}`;
    texto += `\nMensagem: ${mensagem}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank", "noopener");
  });
}

// =========================
// PEDIR INFO SOBRE UM PRODUTO -> WHATSAPP
// =========================
document.querySelectorAll("[data-ask-product]").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const produto = link.dataset.askProduct;
    const texto = `Olá! Tenho interesse em saber mais sobre: ${produto}. Podem enviar-me informações e disponibilidade?`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank", "noopener");
  });
});
