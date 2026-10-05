const USUARIO = "Mollusc1njection";               
const REPOSITORIO = "Phantom-Gladiators";   
const ARCHIVO = "PhantomGladiators.zip"; 
const ARCHIVO_DLC = "PhantomGladiators-DLC.exe"; 

const urlDescarga = `https://github.com/${USUARIO}/${REPOSITORIO}/releases/latest/download/${ARCHIVO}`;

const urlDLC = `https://github.com/${USUARIO}/${REPOSITORIO}/releases/latest/download/${ARCHIVO_DLC}`;

document.querySelectorAll("[data-dlc]").forEach((boton) => { boton.href = urlDLC; });

document.querySelectorAll("[data-download]").forEach((boton) => {
  if (boton.classList.contains("btn-big")) boton.href = urlDescarga;
});

(function () {
  const canvas = document.getElementById("spirits");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ctx = canvas.getContext("2d");
  let w, h, motas;

  function medir() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cantidad = Math.round(Math.min(70, w / 18));
    motas = Array.from({ length: cantidad }, nueva);
  }

  function nueva() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.8 + Math.random() * 2.2,
      vy: 0.15 + Math.random() * 0.45,
      deriva: Math.random() * Math.PI * 2,
      calida: Math.random() < 0.3, 
    };
  }

  function dibujar() {
    ctx.clearRect(0, 0, w, h);
    for (const m of motas) {
      m.y -= m.vy;
      m.deriva += 0.012;
      m.x += Math.sin(m.deriva) * 0.35;
      if (m.y < -10) { m.y = h + 10; m.x = Math.random() * w; }
      const alfa = Math.min(1, (h - m.y) / (h * 0.5)) * 0.8;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      ctx.fillStyle = m.calida ? `rgba(212,64,91,${alfa})` : `rgba(143,227,242,${alfa})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = m.calida ? "#d4405b" : "#8fe3f2";
      ctx.fill();
    }
    requestAnimationFrame(dibujar);
  }

  medir();
  window.addEventListener("resize", medir);
  dibujar();
})();
