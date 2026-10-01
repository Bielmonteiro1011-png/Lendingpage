(() => {
  'use strict';
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const prefersReduced = () => Boolean(reducedMotion?.matches);

  // Navegação por âncoras, com respeito à preferência de movimento reduzido.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button > 0) return;
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target || target.hidden) return;
    event.preventDefault();
    target.scrollIntoView({behavior:prefersReduced()?'instant':'smooth',block:'start'});
    if (window.location.hash !== '#'+id) history.pushState(null,'','#'+id);
  });

  // Conteúdo permanece visível quando IntersectionObserver não está disponível.
  if ('IntersectionObserver' in window && !prefersReduced()) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {entry.target.classList.add('reveal-visible');observer.unobserve(entry.target);}
      });
    }, {threshold:0.08});
    document.querySelectorAll('section:not(.hero), .service-card, .steps li').forEach(element => {
      element.classList.add('reveal-pending');observer.observe(element);
    });
    reducedMotion?.addEventListener('change', event => {
      if (event.matches) {observer.disconnect();document.querySelectorAll('.reveal-pending').forEach(el=>el.classList.add('reveal-visible'));}
    });
  }

  const gallery = [...document.querySelectorAll('[data-gallery]')];
  const modal = document.querySelector('#image-lightbox');
  const image = document.querySelector('#lightbox-image');
  const caption = document.querySelector('#lightbox-caption');
  const position = document.querySelector('#lightbox-position');
  let imageIndex=0, opener=null;
  function displayImage(index) {
    imageIndex=(index+gallery.length)%gallery.length;
    const item=gallery[imageIndex];
    image.src=item.href;image.alt=item.querySelector('img').alt;
    caption.textContent=item.dataset.caption || image.alt;
    position.textContent=`Imagem ${imageIndex+1} de ${gallery.length}`;
  }
  function closeLightbox() { if(modal.open)modal.close(); }
  gallery.forEach((item,index)=>item.addEventListener('click',event=>{
    if(event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)return;
    if(typeof modal.showModal!=='function')return; // Link normal permite abrir a imagem sem suporte a dialog.
    event.preventDefault();opener=item;displayImage(index);modal.showModal();document.body.classList.add('lightbox-open');document.querySelector('#lightbox-close').focus();
  }));
  document.querySelector('#lightbox-close').addEventListener('click',closeLightbox);
  document.querySelector('#lightbox-prev').addEventListener('click',()=>displayImage(imageIndex-1));
  document.querySelector('#lightbox-next').addEventListener('click',()=>displayImage(imageIndex+1));
  modal.addEventListener('click',event=>{if(event.target===modal)closeLightbox();});
  modal.addEventListener('keydown',event=>{
    if(event.key==='ArrowRight'){event.preventDefault();displayImage(imageIndex+1);}
    if(event.key==='ArrowLeft'){event.preventDefault();displayImage(imageIndex-1);}
    if(event.key==='Escape'){event.preventDefault();closeLightbox();}
  });
  modal.addEventListener('close',()=>{document.body.classList.remove('lightbox-open');opener?.focus();});
  let touchStart=null;
  image.addEventListener('touchstart',event=>{touchStart=event.touches.length===1?event.touches[0].clientX:null;},{passive:true});
  image.addEventListener('touchend',event=>{
    if(touchStart!==null && event.changedTouches.length===1){const distance=event.changedTouches[0].clientX-touchStart;if(Math.abs(distance)>60)displayImage(imageIndex+(distance<0?1:-1));}touchStart=null;
  },{passive:true});

  // Nenhum depoimento é inventado: a seção só aparece com relatos configurados.
  const reviews = Array.isArray(window.LARZELO_TESTIMONIALS) ? window.LARZELO_TESTIMONIALS.filter(review => review && typeof review.name==='string' && review.name.trim() && typeof review.text==='string' && review.text.trim()) : [];
  const section=document.querySelector('#depoimentos');
  if(!reviews.length)return;
  section.hidden=false;
  const carousel=document.querySelector('#testimonial-carousel');
  const slides=document.querySelector('#testimonial-slides');
  const dots=document.querySelector('#testimonial-dots');
  const pause=document.querySelector('#testimonial-pause');
  const status=document.querySelector('#testimonial-status');
  const prev=document.querySelector('#testimonial-prev'),next=document.querySelector('#testimonial-next');
  let active=0,timer=null,paused=prefersReduced(),hover=false;
  reviews.forEach((review,index)=>{
    const slide=document.createElement('article');slide.className='testimonial-slide';slide.setAttribute('role','group');slide.setAttribute('aria-roledescription','slide');slide.setAttribute('aria-label',`${index+1} de ${reviews.length}`);
    const quote=document.createElement('blockquote');quote.textContent=review.text;
    const name=document.createElement('strong');name.textContent=review.name;slide.append(quote,name);
    if(typeof review.service==='string' && review.service.trim()){const service=document.createElement('p');service.textContent=review.service;slide.append(service);}
    slides.append(slide);
    const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label',`Ver depoimento ${index+1}`);dot.addEventListener('click',()=>showReview(index,true));dots.append(dot);
  });
  function refreshTimer(){
    if(timer!==null){clearInterval(timer);timer=null;}
    pause.textContent=paused?'Retomar rotação':'Pausar rotação';
    if(reviews.length>1 && !paused && !hover && !document.hidden && !carousel.contains(document.activeElement))timer=setInterval(()=>showReview(active+1,false),5000);
  }
  function showReview(index,manual=false){
    active=(index+reviews.length)%reviews.length;
    [...slides.children].forEach((slide,i)=>slide.hidden=i!==active);
    [...dots.children].forEach((dot,i)=>dot.setAttribute('aria-current',String(i===active)));
    if(manual)status.textContent=`Depoimento ${active+1} de ${reviews.length}`;
    refreshTimer();
  }
  prev.addEventListener('click',()=>showReview(active-1,true));next.addEventListener('click',()=>showReview(active+1,true));
  pause.addEventListener('click',()=>{paused=!paused;refreshTimer();});
  carousel.addEventListener('mouseenter',()=>{hover=true;refreshTimer();});carousel.addEventListener('mouseleave',()=>{hover=false;refreshTimer();});
  carousel.addEventListener('focusin',refreshTimer);carousel.addEventListener('focusout',()=>setTimeout(refreshTimer,0));
  document.addEventListener('visibilitychange',refreshTimer);
  reducedMotion?.addEventListener('change',event=>{paused=event.matches;refreshTimer();});
  if(reviews.length===1){prev.hidden=true;next.hidden=true;pause.hidden=true;dots.hidden=true;}
  showReview(0);
})();
