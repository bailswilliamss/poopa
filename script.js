
const projects = window.PROJECTS || [];
const lightbox = document.getElementById('lightbox');
const img = document.getElementById('gallery-image');
const title = document.getElementById('gallery-title');
const subtitle = document.getElementById('gallery-subtitle');
const count = document.getElementById('count');
const thumbs = document.getElementById('thumb-row');
let active = null, index = 0;
function render(){
  if(!active) return;
  img.src = active.images[index];
  title.textContent = active.title;
  subtitle.textContent = active.subtitle;
  count.textContent = `${index+1} / ${active.images.length}`;
  thumbs.innerHTML = '';
  active.images.forEach((src,i)=>{
    const t=document.createElement('img');
    t.src=src;
    if(i===index)t.className='active';
    t.onclick=()=>{index=i;render()};
    thumbs.appendChild(t);
  });
}
function openGallery(slug){
  active = projects.find(p=>p.slug===slug);
  index = 0;
  render();
  lightbox.classList.add('open');
}
function closeGallery(){lightbox.classList.remove('open')}
function step(n){if(active){index=(index+n+active.images.length)%active.images.length;render()}}
document.querySelectorAll('.project-card').forEach(c=>c.onclick=()=>openGallery(c.dataset.project));
document.getElementById('close').onclick=closeGallery;
document.getElementById('prev').onclick=()=>step(-1);
document.getElementById('next').onclick=()=>step(1);
lightbox.onclick=e=>{if(e.target===lightbox)closeGallery()};
document.onkeydown=e=>{if(e.key==='Escape')closeGallery(); if(e.key==='ArrowRight')step(1); if(e.key==='ArrowLeft')step(-1)};
