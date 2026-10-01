(() => {
  'use strict';
  const form = document.querySelector('#quote-form');
  const status = document.querySelector('#form-status');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  const items = document.querySelector('#quote-items');
  const addButton = document.querySelector('#add-item');
  const itemsStatus = document.querySelector('#items-status');
  const number = String(window.LARZELO_CONFIG?.whatsappNumber || '').trim();
  const configured = /^55[1-9]\d{9,10}$/.test(number);
  const services = ['Sofá','Colchão','Poltronas e cadeiras','Tapetes','Estofados automotivos','Couro','Cortinas e persianas','Cadeirinha de bebê','Mesa de sinuca'];
  const urlFor = message => `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  const closeMenu = () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded','false'); };
  menu.addEventListener('click', () => menu.setAttribute('aria-expanded',String(nav.classList.toggle('open'))));
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if(event.key==='Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
  document.addEventListener('click', event => { if(!event.target.closest('.header')) closeMenu(); });
  document.querySelector('#year').textContent = new Date().getFullYear();
  document.querySelectorAll('[data-whatsapp]').forEach(link => {
    if(configured) {link.href=urlFor('Olá, Larzelo! Gostaria de um orçamento para higienização em Caruaru.');link.target='_blank';link.rel='noopener noreferrer';}
  });
  let sequence=0;
  function refreshItems(){
    [...items.children].forEach((piece,index)=>{
      piece.querySelector('legend').textContent=`Peça ${index+1}`;
      piece.querySelector('.remove-item').hidden=items.children.length===1;
      piece.querySelector('.remove-item').setAttribute('aria-label',`Remover peça ${index+1}`);
    });
    addButton.disabled=items.children.length>=10;
  }
  function addPiece(service=''){
    if(items.children.length>=10)return;
    const id=++sequence;
    const piece=document.createElement('fieldset');piece.className='piece';
    piece.innerHTML=`<legend>Peça</legend><div class="piece-fields"><div class="field wide"><label for="service-${id}">Tipo de peça</label><select id="service-${id}" class="piece-service" required><option value="">Selecione</option>${services.map(s=>`<option>${s}</option>`).join('')}</select></div><div class="field"><label for="quantity-${id}">Quantidade</label><input id="quantity-${id}" class="piece-quantity" type="number" min="1" max="100" step="1" value="1" required></div><div class="field piece-size" hidden><label for="size-${id}">Tamanho</label><select id="size-${id}" class="size-select" disabled></select></div><div class="field wide piece-model" hidden><label for="model-${id}">Modelo do sofá</label><select id="model-${id}" disabled><option value="">Selecione</option><option>Fixo</option><option>Retrátil / reclinável</option><option>De canto / com chaise</option><option>Não sei informar</option></select></div></div><button class="remove-item" type="button">Remover peça</button>`;
    const select=piece.querySelector('.piece-service');
    function updateDetails(){
      const sofa=select.value==='Sofá',bed=select.value==='Colchão';
      const size=piece.querySelector('.size-select');
      piece.querySelector('.piece-size').hidden=!(sofa||bed);size.disabled=!(sofa||bed);size.required=sofa||bed;
      const sizes=sofa?['2 lugares','3 lugares','4 lugares','5 ou mais lugares','Não sei informar']:['Solteiro','Casal','Queen','King','Infantil','Não sei informar'];
      size.replaceChildren(...['Selecione',...sizes].map((text,index)=>new Option(text,index?text:'')));
      const model=piece.querySelector('.piece-model select');piece.querySelector('.piece-model').hidden=!sofa;model.disabled=!sofa;model.required=sofa;
      if(!sofa)model.value='';
    }
    select.addEventListener('change',updateDetails);select.value=service;updateDetails();
    piece.querySelector('.remove-item').addEventListener('click',()=>{if(items.children.length>1){piece.remove();refreshItems();itemsStatus.textContent='Peça removida.';addButton.focus();}});
    items.append(piece);refreshItems();return piece;
  }
  addPiece();
  addButton.addEventListener('click',()=>{const piece=addPiece();if(piece){piece.querySelector('select').focus();itemsStatus.textContent=`${items.children.length} peças no pedido. Limite de 10 tipos de peças.`;}});
  document.querySelectorAll('[data-service]').forEach(link=>link.addEventListener('click',()=>{
    let piece=[...items.children].find(p=>!p.querySelector('.piece-service').value);
    if(!piece)piece=addPiece(link.dataset.service);
    else{piece.querySelector('.piece-service').value=link.dataset.service;piece.querySelector('.piece-service').dispatchEvent(new Event('change'));}
    if(!piece)itemsStatus.textContent='Seu pedido já tem 10 tipos de peças. Edite ou remova uma delas.';
  }));
  form.addEventListener('submit',event=>{
    event.preventDefault();if(!form.reportValidity())return;
    const district=form.elements.district.value.trim();
    if(!district){status.textContent='Informe o bairro em Caruaru.';form.elements.district.focus();return;}
    if(!configured){status.textContent='O contato pelo WhatsApp ainda está em configuração. Nenhuma informação foi enviada.';return;}
    const name=form.elements.name.value.trim(),notes=form.elements.notes.value.trim();
    const pieces=[...items.children].map((p,index)=>{
      const fields=[p.querySelector('.piece-service').value,`Quantidade: ${p.querySelector('.piece-quantity').value}`];
      for(const s of p.querySelectorAll('select:not(.piece-service)'))if(!s.disabled&&s.value)fields.push(s.value);
      return `${index+1}. ${fields.join(' · ')}`;
    });
    const message=['Olá, Larzelo! Gostaria de um orçamento.',name?`Nome: ${name}`:'',...pieces,`Bairro: ${district} — Caruaru/PE`,notes?`Detalhes: ${notes}`:'','Vou enviar fotos das peças para avaliação.'].filter(Boolean).join('\n');
    const url=urlFor(message);status.replaceChildren();const fallback=document.createElement('a');fallback.href=url;fallback.target='_blank';fallback.rel='noopener noreferrer';fallback.textContent='Mensagem preparada. Se o WhatsApp não abrir, toque aqui.';status.append(fallback);window.open(url,'_blank','noopener,noreferrer');
  });
})();
