const modal = document.getElementById('recipeModal');
const modalBody = modal.querySelector('.modal-body');
const modalTitle = document.getElementById('modal-title');
const closeBtn = modal.querySelector('.close');
const openButtons = document.querySelectorAll('.img-btn');
let lastFocusedElement = null;

function openModal(targetId){
  const content = document.getElementById(targetId);
  if(!content) return;
  modalBody.innerHTML = content.innerHTML;
  const h2 = content.querySelector('h2');
  modalTitle.textContent = h2 ? h2.textContent : 'Recept';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  lastFocusedElement = document.activeElement;
  closeBtn.focus();
  document.addEventListener('keydown', onKeydown);
}

function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modalBody.innerHTML = '';
  document.removeEventListener('keydown', onKeydown);
  if(lastFocusedElement) lastFocusedElement.focus();
}

function onKeydown(e){
  if(e.key === 'Escape') closeModal();
}

openButtons.forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.target));
});

modal.addEventListener('click', (e) => {
  if(e.target === modal) closeModal();
});
closeBtn.addEventListener('click', closeModal);
