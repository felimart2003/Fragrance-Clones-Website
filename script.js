import {fragrances,filterFragrances} from './catalog.js';
const key='scent-library:saved:v1';let saved=new Set();
try{const value=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(value))saved=new Set(value.filter(id=>fragrances.some(i=>i.id===id)));}catch{}
const form=document.querySelector('#filters'),list=document.querySelector('#catalog'),params=new URLSearchParams(location.search);
for(const key of ['q','family','sort'])if(params.has(key))form.elements.namedItem(key).value=params.get(key);
form.elements.saved.checked=params.get('saved')==='1';
function el(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e;}
function render(){
 const filters={q:form.elements.q.value,family:form.elements.family.value,sort:form.elements.sort.value,savedOnly:form.elements.saved.checked,saved};
 const items=filterFragrances(fragrances,filters),url=new URL(location.href);url.search='';
 for(const key of ['q','family','sort'])if(filters[key]&&filters[key]!=='name')url.searchParams.set(key,filters[key]);
 if(filters.savedOnly)url.searchParams.set('saved','1');history.replaceState(null,'',url);
 document.querySelector('#result-count').textContent=`${items.length} of ${fragrances.length} fragrances`;
 document.querySelector('#saved-count').textContent=saved.size;list.replaceChildren();
 for(const item of items){
  const card=el('article',`fragrance tone-${item.family.toLowerCase()}`),art=el('div','bottle-stage'),bottle=el('div','bottle');art.setAttribute('aria-hidden','true');
  bottle.append(el('span','bottle-label',item.brand),el('strong','',item.name));art.append(bottle);
  const content=el('div','card-content');content.append(el('span','eyebrow',item.family),el('h3','',item.name),el('p','brand',item.brand));
  const comparison=el('p','comparison');comparison.append(el('span','','Explore alongside'),el('strong','',item.reference));
  const notes=el('div','notes');for(const note of item.notes)notes.append(el('span','',note));
  const actions=el('div','card-actions'),button=el('button','save',saved.has(item.id)?'♥ Saved':'♡ Save');button.type='button';button.dataset.id=item.id;button.setAttribute('aria-label',`${saved.has(item.id)?'Unsave':'Save'} ${item.name}`);button.setAttribute('aria-pressed',String(saved.has(item.id)));
  button.addEventListener('click',()=>{saved.has(item.id)?saved.delete(item.id):saved.add(item.id);try{localStorage.setItem(key,JSON.stringify([...saved]));}catch{document.querySelector('#storage-message').textContent='Your browser blocked storage. Saves last for this visit only.';}render();document.querySelector(`[data-id="${item.id}"]`)?.focus();});
  const source=el('a','','Read source ↗');source.href=item.source;source.target='_blank';source.rel='noopener noreferrer';actions.append(button,source);content.append(comparison,notes,actions);card.append(art,content);list.append(card);
 }document.querySelector('#empty').hidden=items.length>0;
}
form.addEventListener('input',render);form.addEventListener('submit',e=>e.preventDefault());document.querySelector('#reset').addEventListener('click',()=>{form.reset();render();form.elements.q.focus();});render();
