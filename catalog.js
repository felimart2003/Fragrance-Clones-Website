export const fragrances = [
{id:'club',name:'Club de Nuit Intense Man',brand:'Armaf',reference:'Creed · Aventus',family:'Woody',notes:['Citrus','Birch','Musk'],source:'https://basenotes.com/fragrances/club-de-nuit-intense-for-men-by-armaf.26148985'},
{id:'asad',name:'Asad',brand:'Lattafa',reference:'Dior · Sauvage Elixir',family:'Spicy',notes:['Spice','Amber','Vanilla'],source:'https://www.fragrantica.com/perfume/Lattafa-Perfumes/Asad-72821.html'},
{id:'9pm',name:'9 PM',brand:'Afnan',reference:'Jean Paul Gaultier · Ultra Male',family:'Sweet',notes:['Fruit','Vanilla','Warmth'],source:'https://www.fragrantica.com/board/viewtopic.php?id=327736'},
{id:'khamrah',name:'Khamrah',brand:'Lattafa',reference:'Kilian · Angels’ Share',family:'Sweet',notes:['Cinnamon','Nutmeg','Vanilla'],source:'https://qamareperfumes.com/blogs/qamare-blog/lattafa-khamrah-review'}
];
export function filterFragrances(items,{q='',family='',sort='name',savedOnly=false,saved=new Set()}={}) {
 const query=q.trim().toLowerCase();
 return items.filter(i=>(!family||i.family===family)&&(!savedOnly||saved.has(i.id))&&[i.name,i.brand,i.reference,i.family,...i.notes].join(' ').toLowerCase().includes(query)).sort((a,b)=>(sort==='brand'?a.brand.localeCompare(b.brand):0)||a.name.localeCompare(b.name));
}
