(() => {
  'use strict';
  const form = document.querySelector('#quote-form');
  const status = document.querySelector('#form-status');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  const number = String(window.LARZELO_CONFIG?.whatsappNumber || '').trim();
  const configured = /^55[1-9]\d{9,10}$/.test(number);
  const defaultMessage = 'Olá, Larzelo! Gostaria de um orçamento para higienização em Caruaru.';
  const whatsappURL = message => `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  const closeMenu = () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); };
  menu.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(isOpen));
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.header')) closeMenu();
  });
  document.querySelectorAll('[data-service]').forEach(link => {
    link.addEventListener('click', () => { form.elements.service.value = link.dataset.service; });
  });
  document.querySelector('#year').textContent = new Date().getFullYear();
  document.querySelectorAll('[data-whatsapp]').forEach(link => {
    if (configured) {
      link.href = whatsappURL(defaultMessage);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const district = String(values.get('district')).trim();
    if (!district) {
      status.textContent = 'Informe o bairro para continuar.';
      form.elements.district.focus();
      return;
    }
    if (!configured) {
      status.textContent = 'O contato pelo WhatsApp ainda está em configuração. Nenhuma informação foi enviada.';
      return;
    }
    const name = String(values.get('name')).trim();
    const notes = String(values.get('notes')).trim();
    const message = [
      'Olá, Larzelo! Gostaria de um orçamento.',
      name ? `Nome: ${name}` : '',
      `Serviço: ${values.get('service')}`,
      `Quantidade de peças: ${values.get('quantity')}`,
      `Bairro: ${district} — Caruaru/PE`,
      notes ? `Detalhes: ${notes}` : '',
      'Vou enviar fotos da peça para avaliação.'
    ].filter(Boolean).join('\n');
    const url = whatsappURL(message);
    status.replaceChildren();
    const fallback = document.createElement('a');
    fallback.href = url;
    fallback.target = '_blank';
    fallback.rel = 'noopener noreferrer';
    fallback.textContent = 'Mensagem preparada. Se o WhatsApp não abrir, toque aqui.';
    status.append(fallback);
    window.open(url, '_blank', 'noopener,noreferrer');
  });
})();
