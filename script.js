// Mobile nav toggle
function initNav(){
  const navEl = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  if (!navEl || !navToggle) return;
  navToggle.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const open = navEl.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open);
  };
  navEl.querySelectorAll('.nav__links a').forEach(a => {
    a.addEventListener('click', () => navEl.classList.remove('is-open'));
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNav);
} else {
  initNav();
}

// Nav scroll state
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Hero video play/pause
const vctrl = document.getElementById('vctrl');
const video = document.querySelector('.hero__video');
let playing = true;
vctrl?.addEventListener('click', () => {
  if (playing) { video.pause(); vctrl.classList.add('is-paused'); vctrl.setAttribute('aria-label','Play video'); }
  else { video.play(); vctrl.classList.remove('is-paused'); vctrl.setAttribute('aria-label','Pause video'); }
  playing = !playing;
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.15 });
document.querySelectorAll('.card, .stat, .display, .lede, blockquote').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1)';
  io.observe(el);
});
const style = document.createElement('style');
style.textContent = `.in{opacity:1!important;transform:none!important}`;
document.head.appendChild(style);

// Trigger hover-like state on .svc cards as they enter the viewport
const svcIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('svc--active');
      setTimeout(() => e.target.classList.remove('svc--active'), 900);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.svc').forEach(el => svcIO.observe(el));
