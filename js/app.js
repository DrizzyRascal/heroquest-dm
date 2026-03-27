function renderGoldPot(){var el=document.getElementById('goldPotAmount');if(el)el.textContent=Number(S.groupGold||0).toLocaleString();var hg=document.getElementById('home-gold-big');if(hg)hg.textContent=Number(S.groupGold||0).toLocaleString();}
function gpOpen(e){e.stopPropagation();var p=document.getElementById('goldPotPanel');if(!p)return;var was=p.classList.contains('open');p.classList.toggle('open');if(!was){var i=document.getElementById('goldPotInput');if(i){i.value='';setTimeout(function(){i.focus();},60);}}}
function gpAdjust(dir){var i=document.getElementById('goldPotInput');var a=parseInt((i&&i.value)||0)||0;if(a<=0){notify('Enter an amount first');return;}if(dir===-1&&a>(S.groupGold||0)){notify('Not enough gold!');return;}S.groupGold=(S.groupGold||0)+(dir*a);if(i)i.value='';document.getElementById('goldPotPanel').classList.remove('open');var w=document.getElementById('goldPotWidget');if(w){w.classList.remove('gold-pulse');void w.offsetWidth;w.classList.add('gold-pulse');}renderGoldPot();saveLocal();HQAudio.coins();
  notify((dir===1?'+':'-')+a+' gold — Pot: '+(S.groupGold||0));}
function gpClose(e){var w=document.getElementById('goldPotWidget');if(w&&!w.contains(e.target)){var p=document.getElementById('goldPotPanel');if(p)p.classList.remove('open');}}
window.addEventListener('load',function(){
  var w=document.getElementById('goldPotWidget');if(w)w.addEventListener('click',gpOpen);
  var ab=document.getElementById('goldAddBtn');if(ab)ab.addEventListener('click',function(e){e.stopPropagation();gpAdjust(1);});
  var sb=document.getElementById('goldSpendBtn');if(sb)sb.addEventListener('click',function(e){e.stopPropagation();gpAdjust(-1);});
  var gi=document.getElementById('goldPotInput');if(gi){gi.addEventListener('click',function(e){e.stopPropagation();});gi.addEventListener('keydown',function(e){if(e.key==='Enter'){e.stopPropagation();gpAdjust(1);}});}
  document.addEventListener('click',gpClose);
});


var HEROES=[
  {id:'dwarf',name:'Brondak Ironhelm',cls:'Dwarf',player:'Chris',portrait:'⛏',
   atk:2,def:3,bodyMax:7,body:7,mind:3,mindMax:3,baseAtk:2,baseDef:3,baseBody:7,baseMind:3,
   gold:0,level:1,xp:0,equipment:[],skills:[],jailed:false,active:true,
   who:'Tavern · Throne · Training Hall · Steel & Stone · Shoot & Score · Superfly Active'},
  {id:'elf',name:'Lysara Dawnwhisper',cls:'Elf',player:'Chloe',portrait:'🧝',
   atk:2,def:2,bodyMax:6,body:6,mind:4,mindMax:4,baseAtk:2,baseDef:2,baseBody:6,baseMind:4,
   gold:0,level:1,xp:0,equipment:[],skills:[],jailed:false,active:true,
   who:'Tavern · Throne · Superfly Active · Cloaks of Shame · Shoot & Score'},
  {id:'wizard',name:'Seraphel the Grey',cls:'Wizard',player:'Taylor',portrait:'🧙',
   atk:1,def:2,bodyMax:4,body:4,mind:6,mindMax:6,baseAtk:1,baseDef:2,baseBody:4,baseMind:6,
   gold:0,level:1,xp:0,equipment:[],skills:[],jailed:false,active:true,
   who:"Tavern · Throne · Wizard's Den · Superfly Active · Ferb's Herbs"},
  {id:'druid',name:'Elowen Ashgrove',cls:'Druid',player:'—',portrait:'🌿',
   atk:2,def:2,bodyMax:6,body:6,mind:5,mindMax:5,baseAtk:2,baseDef:2,baseBody:6,baseMind:5,
   gold:0,equipment:['Ashwood Staff','Potion of Healing'],skills:["Nature's Ward","Thorn Snare"],jailed:false,active:false,
   who:"Tavern · Throne · Training Hall · Ferb's Herbs · Superfly Active · Cloaks of Shame"},
  {id:'barb',name:'Ragnar Ashblade',cls:'Barbarian',player:'—',portrait:'🪓',
   atk:3,def:2,bodyMax:8,body:8,mind:2,mindMax:2,baseAtk:3,baseDef:2,baseBody:8,baseMind:2,
   gold:0,level:1,xp:0,equipment:[],skills:[],jailed:false,active:false,
   who:'Tavern · Throne · Training Hall · Steel & Stone · Shoot & Score'},
];

var AREAS=[
  {id:'tavern',name:'The Rusty Flagon',icon:'🍺',span:2,desc:'Central tavern. Heroes start in their quarters upstairs.',who:'All heroes',restricted:false,guarded:false,
   detail:'Heroes begin each rest scene here. Roll 2 red dice each turn to move through the village. Interact with drunks to trigger the d20 table.',training:null},
  {id:'throne',name:"King's Throne Room",icon:'👑',span:1,desc:'Guarded. Heroes may visit if not flagged by guards.',who:'All heroes (if not flagged)',restricted:true,guarded:true,
   detail:'Royal guards flank the doors. Heroes not jailed this session may enter respectfully. The Advisor is inside and can relay information.',training:null},
  {id:'training',name:'Training Hall',icon:'🏋',span:1,desc:'Strengthen body and sharpen defence.',who:'Dwarf · Barbarian · Druid',restricted:false,guarded:false,
   detail:'Stone-floored hall with weapon dummies and a sparring ring. Trainer Gorvain charges 30 gold per session — grants +1 to Attack, Defence, or Body Max.',training:'30 gold → +1 Attack, Defence, or Body Max'},
  {id:'wizden',name:"Wizard's Den",icon:'🔮',span:1,desc:'Arcane study and training. Wizard only.',who:'Wizard only',restricted:true,guarded:false,
   detail:'A candlelit room above the apothecary. Resident mage Aldris trains Wizards for 35 gold — grants +1 Attack (spell power) or +1 Mind Max.',training:'35 gold → +1 Attack or +1 Mind Max (Wizard only)'},
  {id:'ferbs',name:"Ferb's Herbs",icon:'🌿',span:1,desc:'Potions, alchemy, reagents.',who:'All heroes',restricted:false,guarded:false,
   detail:"Halfling Ferb sells healing potions, smoke bombs, alchemist's fire, elixirs and reagents. Stock refreshes each rest scene.",training:null},
  {id:'steel',name:'Steel & Stone',icon:'⚔',span:1,desc:'Weapons and armour forged from steel or stone.',who:'All heroes (Dwarf 10% off)',restricted:false,guarded:false,
   detail:'Half-orc smith Durra sells swords, axes, shields, stone mauls, chain mail and plate. Dwarves receive 10% discount. Wizards cannot equip most items.',training:null},
  {id:'shoot',name:'Shoot & Score',icon:'🏹',span:1,desc:'Bows, crossbows, throwing weapons, and the Olden Pistol.',who:'All heroes (Olden Pistol: Dwarf only)',restricted:false,guarded:false,
   detail:'The twins sell crossbows, longbows, throwing axes, and the legendary Olden Pistol — 2 red dice ranged damage, unlimited range, 1 shot per quest. Dwarf only.',training:null},
  {id:'superfly',name:'Superfly Active',icon:'🧥',span:1,desc:'Robes, gauntlets, boots, rings — all heroes welcome.',who:'All heroes',restricted:false,guarded:false,
   detail:'Wizard Robes (+1 Def), Swift Boots (+1 Move), Ring of Healing (+1 Body at rest), Ring of Fortune (reroll one die per quest). Open to everyone.',training:null},
  {id:'cloaks',name:'Cloaks of Shame',icon:'🪄',span:1,desc:'The hooded elven figures from the opening.',who:'Elf (Chloe) · Druid (Elowen)',restricted:true,guarded:false,
   detail:'Hidden in the alley beside the tavern. Elf may train assassination (+1 Attack, unlocks Backstab). Druid may deepen nature magic (+1 Mind Max, unlocks Entangle). 40 gold per session.',training:'40 gold → Elf: +1 Attack or Backstab · Druid: +1 Mind Max or Entangle'},
  {id:'outpost',name:'Guard Outpost',icon:'👮',span:1,desc:'4 outposts patrol Millhaven.',who:'All (avoid when breaking rules)',restricted:false,guarded:false,
   detail:'If a hero is seen in a restricted area without permission, the nearest outpost is alerted and a chase begins. Three failed escape rolls = jailed.',training:null},
];

var D20=[
  {range:'1-2',  type:'brawl',   label:'Brawl!',        text:'The drunk throws the first punch — no warning. Fists only, no weapons or magic. Brawler: Atk 2, Def 2, Body 2. Win: bartender hands over 20 gold. Lose: hero starts next quest at -1 Body Point.'},
  {range:'3-4',  type:'brawl',   label:'Bar Fight!',     text:'Two drunks decide the hero looks like someone they have a problem with. Two Brawlers: Atk 2, Def 1, Body 2 each. Win: crowd passes a hat — 30 gold collected. Lose: hero starts next quest at -1 Body Point and loses their next tavern turn nursing the bruise.'},
  {range:'5-6',  type:'brawl',   label:'Ambush!',        text:'The drunk was a plant. Three figures emerge from the shadows — someone sent them. Thugs: Atk 2, Def 2, Body 3. Win: search them for a note with a partial cipher — hand to the DM. Lose: hero loses 15 gold and starts next quest at -1 Body Point.'},
  {range:'7',    type:'merc',    label:'Mercenary Card!', text:'The stranger across the table is not drunk at all. They are available. Roll 1d6 to determine which mercenary joins for the next combat only — consult the Mercenary table on the Mercenaries page.'},
  {range:'8-10', type:'info',    label:'Rumour',         text:'A genuine rumour. Choose from your notes or invent one relevant to the current quest — a safe path, a name, something about the roads or ruins ahead.'},
  {range:'11-13',type:'info',    label:'Useful Info',    text:'The drunk knows something specific: a trap location, a patrol schedule, or the name of someone connected to Drevak. Keep it vague but actionable.'},
  {range:'14-16',type:'bonus',   label:'Free Drink',     text:'Rounds on the house. Hero recovers 1 Body Point — stacks with the full end-of-scene heal.'},
  {range:'17-19',type:'quest',   label:'Side Quest!',    text:'Not drunk. An agent. They slide a folded note across the table — a new side quest hook of your choosing.'},
  {range:'20',   type:'bonus',   label:'Jackpot!',       text:"The drunk passes out, coin purse falls open. Hero finds 2d6 gold (roll privately). Nobody saw anything."},
];

var CHECKLIST=[
  'All heroes healed to full Body Points',
  'Quest gold awarded to each hero',
  'Skills distributed',
  'Encounter log updated',
  'Hero swaps processed (50 gold each)',
  'Tavern d20 rolls resolved',
  'Shop purchases recorded on character sheets',
  'Training upgrades applied',
  'Turn tracker reset',
  'Story notes updated',
];

var PCOLORS={Chris:'#d4a820',Chloe:'#2a8070',Taylor:'#7a3ab0'};

// ═══════════════════════════════════════════════════════
// CLOUDFLARE WORKER CONFIG
// Replace WORKER_URL after deploying your worker
// ═══════════════════════════════════════════════════════

function cfSave(data, onDone){
  // Delegates to cloudSave in state.js
  if(typeof cloudSave==='function' && typeof campaignId!=='undefined' && campaignId){
    cloudSave(campaignId, true);
  }
  try{ localStorage.setItem('hq_mv2',JSON.stringify(data)); }catch(e){}
  if(onDone) onDone(true);
}

function cfLoad(campaign, onDone){
  // Delegates to cloudLoad in state.js
  if(typeof cloudLoad==='function'){
    cloudLoad(campaign);
  }
  if(onDone) onDone(null);
}

var S={
  heroes:JSON.parse(JSON.stringify(HEROES)),
  groupGold:0,
  turns:{},
  outposts:[false,false,false,false],
  encLog:[],
  chase:{heroId:null,rolls:[],done:false},
  checklist:{},
  sqStatus:{},
  mercStats:{},
  enemyStats:{},
  shopData:{},
  itemData:{},
  dungeonMaps:{},
  editMode:false,
};

function initTurns(){
  S.heroes.forEach(function(h){ if(!S.turns[h.id]) S.turns[h.id]=Array(10).fill(false); });
}

function gatherEditable(){
  var out={};
  document.querySelectorAll('[contenteditable]').forEach(function(el){ if(el.id) out[el.id]=el.innerHTML; });
  return out;
}
function restoreEditable(data){
  if(!data) return;
  Object.keys(data).forEach(function(id){ var el=document.getElementById(id); if(el) el.innerHTML=data[id]; });
}

function saveLocal(){
  console.log('[HQ] saveLocal called, campaignId:', typeof campaignId !== 'undefined' ? campaignId : 'UNDEFINED');
  if(typeof _saveTimer !== 'undefined') clearTimeout(_saveTimer);
  if(typeof campaignId !== 'undefined' && campaignId){
    _saveTimer = setTimeout(function(){ pushToCloud(true); }, 800);
  } else {
    console.log('[HQ] saveLocal: no campaignId, not saving to cloud');
  }
}
function loadLocal(){
  try{
    var raw=localStorage.getItem('hq_mv2');
    if(!raw) return;
    var snap=JSON.parse(raw);
    if(typeof snap.groupGold!=='undefined')S.groupGold=snap.groupGold;
    if(snap.heroes){S.heroes=snap.heroes;S.heroes.forEach(function(h){if(!h.level)h.level=1;if(typeof h.xp==='undefined')h.xp=0;});}
    if(snap.turns) S.turns=snap.turns;
    if(snap.outposts) S.outposts=snap.outposts;
    if(snap.encLog) S.encLog=snap.encLog;
    if(snap.checklist) S.checklist=snap.checklist;
    if(snap.sqStatus) S.sqStatus=snap.sqStatus;
    if(snap.mercStats) S.mercStats=snap.mercStats;
    if(snap.enemyStats) S.enemyStats=snap.enemyStats;
    if(snap.shopData) S.shopData=snap.shopData;
    if(snap.itemData) S.itemData=snap.itemData;
    if(snap.dungeonMaps) S.dungeonMaps=snap.dungeonMaps;
    if(snap.notes) document.getElementById('storyNotes').value=snap.notes;
    if(snap.editable) setTimeout(function(){ restoreEditable(snap.editable); },100);
    notify('✓ Session loaded');
  }catch(e){ console.error(e); }
}
function dlHTML(){
  // Flush dungeon map state into S before packaging
  if(typeof dmState !== 'undefined'){
    S.dungeonMaps={};
    Object.keys(dmState.quests).forEach(function(k){ S.dungeonMaps[k]=dmState.quests[k]; });
    S.dmBaseMap=(dmState.baseMap !== null && dmState.baseMap !== undefined) ? dmState.baseMap : null;
  }
  saveLocal();
  var d={
    heroes:S.heroes,groupGold:S.groupGold||0,turns:S.turns,outposts:S.outposts,
    encLog:S.encLog,checklist:S.checklist,
    sqStatus:S.sqStatus||{},
    mercStats:S.mercStats||{},
    enemyStats:S.enemyStats||{},
    shopData:S.shopData||{},
    itemData:S.itemData||{},
    dungeonMaps:S.dungeonMaps||{},
    dmBaseMap:S.dmBaseMap||null,
    notes:document.getElementById('storyNotes').value,
    editable:gatherEditable()
  };
  var inject='window.__SS__='+JSON.stringify(d)+';';
  var h=document.documentElement.outerHTML;
  // Replace existing __SS__ state (marker is already gone after first load)
  h=h.replace(/window\.__SS__=\{[\s\S]*?\};/, inject);
  // Fallback: if marker somehow still present
  h=h.replace('\x2f\x2a__SS__\x2a\x2f', inject);
  var a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([h],{type:'text/html'}));
  a.download='heroquest-shattered-crown.html';
  a.click();
  notify('Downloaded');
}

// ════════════════════════════════════════════
// MERCENARIES RENDER
// ════════════════════════════════════════════

function renderMercs(){
  initMercEnemyData();
  initShopData();
  initItemData();
  renderGoldPot();

  // Roll table
  var tbl=document.getElementById('mercRollTable');
  if(tbl){
    tbl.innerHTML='';
    MERC_TYPES.forEach(function(m){
      var s=S.mercStats[m.id]||{atk:0,def:0,body:0,mind:0,notes:''};
      var hasStats=s.atk||s.def||s.body;
      var row=document.createElement('div');
      row.style.cssText='display:flex;align-items:center;gap:.8rem;padding:.55rem .8rem;border-bottom:1px solid rgba(58,42,18,.4);';
      row.innerHTML=
        '<div style="font-family:Cinzel,serif;font-size:.85rem;color:var(--gold-hi);min-width:24px;text-align:center">'+m.roll+'</div>'+
        '<div style="font-size:1.5rem">'+m.portrait+'</div>'+
        '<div style="flex:1"><div style="font-family:Cinzel,serif;font-size:.8rem;color:var(--parch)">'+m.name+'</div>'+
        '<div style="font-family:Cinzel,serif;font-size:.55rem;letter-spacing:.15em;color:var(--text-dim)">'+m.type.toUpperCase()+'</div></div>'+
        (hasStats?
          '<div style="display:flex;gap:.8rem">'+
          statPill('ATK',s.atk,'var(--blood-hi)')+
          statPill('DEF',s.def,'var(--teal-hi)')+
          statPill('BP',s.body,'var(--gold-hi)')+
          '</div>':
          '<div style="font-family:Cinzel,serif;font-size:.6rem;color:var(--text-dim);font-style:italic">Stats not set — click card to edit</div>'
        )+
        '<button class="btn btn-gold btn-sm merc-tb" data-mid="'+m.id+'" style="margin-left:.5rem">&#9998;</button>';
      tbl.appendChild(row);
      row.querySelector('.merc-tb').addEventListener('click',(function(mid){return function(){openMercEdit(mid);};})(m.id));
    });
  }

  // Full cards
  var c=document.getElementById('mercCards');
  if(!c) return;
  c.innerHTML='';
  MERC_TYPES.forEach(function(m){
    var s=S.mercStats[m.id]||{atk:0,def:0,body:0,mind:0,notes:''};
    var card=document.createElement('div');
    card.style.cssText='background:linear-gradient(160deg,var(--dark),var(--bg));border:1px solid var(--border);border-radius:2px;padding:1rem;cursor:pointer;transition:border-color .2s;position:relative;';
    card.onmouseover=function(){this.style.borderColor='var(--gold-dim)';};
    card.onmouseout=function(){this.style.borderColor='var(--border)';};
    (function(mid){ card.onclick=function(){openMercEdit(mid);}; })(m.id);
    card.innerHTML=
      '<div style="position:absolute;top:.5rem;right:.6rem;font-family:Cinzel,serif;font-size:.6rem;color:var(--gold);background:rgba(184,134,11,.15);border:1px solid var(--gold-dim);padding:.1rem .4rem;border-radius:2px;">d6: '+m.roll+'</div>'+
      '<div style="font-size:2.2rem;text-align:center;margin-bottom:.35rem">'+m.portrait+'</div>'+
      '<div style="font-family:Cinzel,serif;font-size:.9rem;color:var(--gold-hi);text-align:center;margin-bottom:.12rem">'+m.name+'</div>'+
      '<div style="font-family:Cinzel,serif;font-size:.55rem;letter-spacing:.18em;color:var(--text-dim);text-align:center;margin-bottom:.75rem">'+m.type.toUpperCase()+' MERCENARY</div>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:.3rem;margin-bottom:.6rem">'+
        statBox2('Attack','⚔',s.atk)+statBox2('Defence','🛡',s.def)+
        statBox2('Body','❤',s.body)+statBox2('Mind','✦',s.mind)+
      '</div>'+
      (s.notes?'<div style="font-style:italic;font-size:.8rem;color:var(--parch-dim);border-top:1px solid var(--border);padding-top:.5rem;margin-top:.3rem;line-height:1.6">'+s.notes+'</div>':''+
      '<div style="font-style:italic;font-size:.78rem;color:var(--text-dim);text-align:center;border-top:1px solid var(--border);padding-top:.5rem">Click to add stats &amp; notes</div>');
    c.appendChild(card);
  });
}

function statPill(lbl,val,col){
  return '<div style="text-align:center"><div style="font-family:Cinzel,serif;font-size:.48rem;letter-spacing:.1em;color:var(--text-dim)">'+lbl+'</div>'+
    '<div style="font-family:Cinzel,serif;font-size:.85rem;font-weight:700;color:'+col+'">'+val+'</div></div>';
}

function statBox2(lbl,icon,val){
  return '<div style="background:rgba(0,0,0,.35);border:1px solid var(--border);border-radius:2px;padding:.28rem;text-align:center">'+
    '<div style="font-family:Cinzel,serif;font-size:.46rem;letter-spacing:.13em;text-transform:uppercase;color:var(--text-dim);margin-bottom:.1rem">'+lbl+'</div>'+
    '<div style="font-family:Cinzel,serif;font-size:.92rem;font-weight:700;color:var(--parch)">'+icon+' '+(val||'—')+'</div></div>';
}

function openMercEdit(id){
  var m=MERC_TYPES.find(function(x){return x.id===id;});
  var s=S.mercStats[id]||{atk:0,def:0,body:0,mind:0,notes:''};
  openModal(m.portrait+' '+m.name+' — Edit Stats',buildStatEditForm(id,s,'merc'));
}

function buildStatEditForm(id,s,type){
  return '<div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:.8rem">'+
    numField('⚔ Attack',  id+'-atk', s.atk)+
    numField('🛡 Defence', id+'-def', s.def)+
    numField('❤ Body',    id+'-body',s.body)+
    numField('✦ Mind',    id+'-mind',s.mind)+
    '</div>'+
    '<div style="margin-bottom:.8rem">'+
    '<div style="font-family:Cinzel,serif;font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;color:var(--text-dim);margin-bottom:.35rem">Special Rules / Notes</div>'+
    '<textarea class="inp" id="'+id+'-notes" style="width:100%;height:90px;resize:vertical;font-size:.88rem;line-height:1.6" placeholder="Special abilities, movement, rules…">'+s.notes+'</textarea>'+
    '</div>'+
    '<div class="brow"><button class="btn btn-gold btn-save-stat">&#10003; Save</button>'+
    '<button class="btn btn-grey btn-sm" onclick="closeModal()">Cancel</button></div>';
  setTimeout(function(){
    var sb=document.querySelector('.btn-save-stat');
    if(sb)(function(i,t){sb.onclick=function(){saveStatForm(i,t);};})(id,type);
  },50);
}

function numField(lbl,id,val){
  return '<div style="background:rgba(0,0,0,.3);border:1px solid var(--border-hi);border-radius:2px;padding:.5rem;text-align:center">'+
    '<div style="font-family:Cinzel,serif;font-size:.55rem;letter-spacing:.13em;color:var(--text-dim);margin-bottom:.3rem">'+lbl+'</div>'+
    '<div style="display:flex;align-items:center;justify-content:center;gap:.4rem">'+
    '<button class="sebtn" data-tgt="'+id+'" data-dir="-1">&minus;</button>'+
    '<input class="inp" id="'+id+'" type="number" min="0" max="20" value="'+(val||0)+'" style="width:55px;text-align:center;font-family:Cinzel,serif;font-size:1rem">'+
    '<button class="sebtn" data-tgt="'+id+'" data-dir="1">+</button>'+
    '</div></div>';
}

function adjNum(id,dir){
  var el=document.getElementById(id);
  if(!el) return;
  var v=parseInt(el.value)||0;
  el.value=Math.max(0,v+(dir?1:-1));
}

function saveStatForm(id,type){
  var get=function(suffix){ return parseInt(document.getElementById(id+'-'+suffix).value)||0; };
  var notes=document.getElementById(id+'-notes').value.trim();
  var data={atk:get('atk'),def:get('def'),body:get('body'),mind:get('mind'),notes:notes};
  if(type==='merc') S.mercStats[id]=data;
  else S.enemyStats[id]=data;
  closeModal();
  saveLocal();
  if(type==='merc') renderMercs();
  else renderEnemies();
  notify('✓ Stats saved');
}

// ════════════════════════════════════════════
// ENEMIES RENDER
// ════════════════════════════════════════════

function renderEnemies(){
  initMercEnemyData();
  initShopData();
  initItemData();
  renderGoldPot();
  var c=document.getElementById('enemyCards');
  if(!c) return;
  c.innerHTML='';
  ENEMY_TYPES.forEach(function(e){
    var s=S.enemyStats[e.id]||{atk:0,def:0,body:0,mind:0,notes:''};
    var typeColor=e.type==='Undead'?'var(--purple-hi)':e.type==='Dragon'?'var(--blood-hi)':'var(--teal-hi)';
    var card=document.createElement('div');
    card.style.cssText='background:linear-gradient(160deg,var(--dark),var(--bg));border:1px solid var(--border);border-radius:2px;padding:1rem;cursor:pointer;transition:border-color .2s;';
    card.onmouseover=function(){this.style.borderColor='var(--border-hi)';};
    card.onmouseout=function(){this.style.borderColor='var(--border)';};
    (function(eid){ card.onclick=function(){openEnemyEdit(eid);}; })(e.id);
    card.innerHTML=
      '<div style="font-size:2.2rem;text-align:center;margin-bottom:.35rem">'+e.portrait+'</div>'+
      '<div style="font-family:Cinzel,serif;font-size:.9rem;color:var(--parch);text-align:center;margin-bottom:.12rem">'+e.name+'</div>'+
      '<div style="font-family:Cinzel,serif;font-size:.55rem;letter-spacing:.18em;color:'+typeColor+';text-align:center;margin-bottom:.75rem">'+e.type.toUpperCase()+'</div>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:.3rem;margin-bottom:.6rem">'+
        statBox2('Attack','⚔',s.atk)+statBox2('Defence','🛡',s.def)+
        statBox2('Body','❤',s.body)+statBox2('Mind','✦',s.mind)+
      '</div>'+
      (s.notes?
        '<div style="font-style:italic;font-size:.8rem;color:var(--parch-dim);border-top:1px solid var(--border);padding-top:.5rem;line-height:1.6">'+s.notes+'</div>':
        '<div style="font-style:italic;font-size:.78rem;color:var(--text-dim);text-align:center;border-top:1px solid var(--border);padding-top:.5rem">Click to add stats</div>');
    c.appendChild(card);
  });
}

function openEnemyEdit(id){
  var e=ENEMY_TYPES.find(function(x){return x.id===id;});
  var s=S.enemyStats[id]||{atk:0,def:0,body:0,mind:0,notes:''};
  openModal(e.portrait+' '+e.name+' — Edit Stats',buildStatEditForm(id,s,'enemy'));
}

function loadAct(actId){
  currentActId = actId;
  var act = ACTS.find(function(a){ return a.id===actId; });
  if(!act) return;
  document.getElementById('actPanelTitle').textContent = 'Act '+act.num+' — '+act.title;
  var c = document.getElementById('actContent');
  c.innerHTML = '';

  // Previous / Next nav
  var idx = ACTS.findIndex(function(a){ return a.id===actId; });
  var navRow = document.createElement('div');
  navRow.style.cssText = 'display:flex;justify-content:space-between;margin-bottom:.9rem;';
  navRow.innerHTML =
    (idx>0?'<button class="btn btn-grey btn-sm" onclick="loadAct(\''+ACTS[idx-1].id+'\')">← '+ACTS[idx-1].num+'</button>':'<span></span>')+
    (idx<ACTS.length-1?'<button class="btn btn-gold btn-sm" onclick="loadAct(\''+ACTS[idx+1].id+'\')">'+ACTS[idx+1].num+' →</button>':'<span></span>');
  c.appendChild(navRow);

  act.scenes.forEach(function(scene){
    var block = document.createElement('div');
    block.style.cssText = 'margin-bottom:1rem;';

    if(scene.type==='read'){
      block.innerHTML = '<div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.45rem">'+
        '<span style="font-family:Cinzel,serif;font-size:.55rem;letter-spacing:.2em;color:var(--blood-hi);text-transform:uppercase;background:rgba(122,16,16,.15);border:1px solid var(--blood);padding:.1rem .4rem;border-radius:2px">📖 Read Aloud</span>'+
        (scene.voice?'<span style="font-style:italic;font-size:.72rem;color:var(--text-dim)">'+scene.voice+'</span>':'')+
        '</div>'+
        '<div style="background:rgba(0,0,0,.3);border-left:3px solid var(--blood);padding:.9rem 1rem;border-radius:0 2px 2px 0">'+
        '<p style="font-style:italic;color:var(--text);line-height:1.9;font-size:.92rem;white-space:pre-line">'+scene.text+'</p></div>'+
        (scene.label?'<div style="font-family:Cinzel,serif;font-size:.58rem;letter-spacing:.15em;color:var(--text-dim);margin-top:.3rem">'+scene.label+'</div>':'');
    } else if(scene.type==='voice'){
      block.innerHTML = '<div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.45rem">'+
        '<span style="font-family:Cinzel,serif;font-size:.55rem;letter-spacing:.2em;color:var(--gold);text-transform:uppercase;background:rgba(184,134,11,.12);border:1px solid var(--gold-dim);padding:.1rem .4rem;border-radius:2px">🗣 Voice</span>'+
        (scene.voice?'<span style="font-style:italic;font-size:.72rem;color:var(--text-dim)">'+scene.voice+'</span>':'')+
        '</div>'+
        (scene.label?'<div style="font-family:Cinzel,serif;font-size:.7rem;color:var(--gold-hi);margin-bottom:.35rem">'+scene.label+'</div>':'')+
        '<div style="background:rgba(212,168,32,.04);border:1px solid rgba(212,168,32,.2);border-radius:2px;padding:.9rem 1rem">'+
        '<p style="font-style:italic;color:var(--parch);line-height:1.9;font-size:.9rem;white-space:pre-line">'+scene.text+'</p></div>';
    } else if(scene.type==='dm'){
      block.innerHTML = '<div style="background:linear-gradient(135deg,var(--dark),var(--bg));border:1px solid var(--border-hi);border-left:3px solid var(--gold);border-radius:0 2px 2px 0;padding:.85rem 1rem;">'+
        '<div style="font-family:Cinzel,serif;font-size:.55rem;letter-spacing:.2em;color:var(--gold);text-transform:uppercase;margin-bottom:.4rem;border-bottom:1px solid var(--border);padding-bottom:.3rem">⚔ Zargon\'s Eye — DM Only'+(scene.label?' · '+scene.label:'')+'</div>'+
        '<p style="font-style:italic;color:var(--parch-dim);line-height:1.75;font-size:.86rem;white-space:pre-line">'+scene.text+'</p></div>';
    } else if(scene.type==='combat'){
      block.innerHTML = '<div style="background:rgba(122,16,16,.07);border:1px solid var(--blood);border-radius:2px;padding:.85rem 1rem;">'+
        '<div style="font-family:Cinzel,serif;font-size:.55rem;letter-spacing:.2em;color:var(--blood-hi);text-transform:uppercase;margin-bottom:.4rem;border-bottom:1px solid rgba(122,16,16,.3);padding-bottom:.3rem">⚔ Combat Notes'+(scene.label?' — '+scene.label:'')+'</div>'+
        '<p style="color:var(--parch-dim);line-height:1.75;font-size:.86rem;white-space:pre-line">'+scene.text+'</p></div>';
    }

    c.appendChild(block);
  });

  // Bottom nav too
  var navRow2 = document.createElement('div');
  navRow2.style.cssText = 'display:flex;justify-content:space-between;margin-top:.9rem;border-top:1px solid var(--border);padding-top:.8rem;';
  navRow2.innerHTML =
    (idx>0?'<button class="btn btn-grey btn-sm" onclick="loadAct(\''+ACTS[idx-1].id+'\')">← '+ACTS[idx-1].num+'</button>':'<span></span>')+
    (idx<ACTS.length-1?'<button class="btn btn-gold btn-sm" onclick="loadAct(\''+ACTS[idx+1].id+'\')">'+ACTS[idx+1].num+' →</button>':'<span></span>');
  c.appendChild(navRow2);

  renderActNav();
}

// ════════════════════════════════════════════
// SIDE QUESTS
// ════════════════════════════════════════════

function renderSqList(){
  var c = document.getElementById('sqListView');
  if(!c) return;
  c.style.display='block';
  document.getElementById('sqDetailView').style.display='none';

  var html = '<div class="g3">';
  SIDEQUESTS.forEach(function(sq){
    var status = S.sqStatus && S.sqStatus[sq.id] ? S.sqStatus[sq.id] : 'locked';
    var statusColor = status==='done'?'var(--green-hi)':status==='active'?'var(--gold-hi)':'var(--text-dim)';
    var statusLabel = status==='done'?'✅ COMPLETE':status==='active'?'⚔ ACTIVE':'🔒 NOT STARTED';
    html += '<div style="background:linear-gradient(160deg,var(--dark),var(--bg));border:1px solid '+(status==='active'?'var(--gold)':status==='done'?'var(--green)':'var(--border)')+';border-radius:2px;padding:1rem;cursor:pointer;transition:all .2s" onclick="sqView(\'detail\',\''+sq.id+'\')"  onmouseover="this.style.borderColor=\'var(--gold-dim)\'" onmouseout="this.style.borderColor=\''+(status==='active'?'var(--gold)':status==='done'?'var(--green)':'var(--border)')+'\'">'+
      '<div style="font-size:2rem;text-align:center;margin-bottom:.4rem">'+sq.portrait+'</div>'+
      '<div style="font-family:Cinzel,serif;font-size:.88rem;letter-spacing:.04em;color:var(--gold-hi);text-align:center;margin-bottom:.15rem">'+sq.title+'</div>'+
      '<div style="font-family:Cinzel,serif;font-size:.55rem;letter-spacing:.15em;color:var(--teal-hi);text-align:center;margin-bottom:.5rem">'+sq.hero.toUpperCase()+'</div>'+
      '<div style="font-style:italic;font-size:.78rem;color:var(--parch-dim);text-align:center;margin-bottom:.6rem">'+sq.subtitle+'</div>'+
      '<div style="text-align:center"><span style="font-family:Cinzel,serif;font-size:.55rem;letter-spacing:.12em;color:'+statusColor+'">'+statusLabel+'</span></div>'+
      '</div>';
  });
  html += '</div>';
  c.innerHTML = html;
}

function sqView(view, sqId){
  if(view==='list'){
    renderSqList();
    return;
  }
  // detail view
  var sq = SIDEQUESTS.find(function(x){ return x.id===sqId; });
  if(!sq) return;
  document.getElementById('sqListView').style.display='none';
  var dv = document.getElementById('sqDetailView');
  dv.style.display='block';

  if(!S.sqStatus) S.sqStatus={};
  initMercEnemyData();
  initShopData();
  initItemData();
  renderGoldPot();
  var status = S.sqStatus[sq.id]||'locked';

  var html = '<div class="brow" style="margin-bottom:1rem">'+
    '<button class="btn btn-grey btn-sm" onclick="sqView(\'list\')">← All Side Quests</button>'+
    '<button class="btn btn-gold btn-sm" onclick="sqSetStatus(\''+sq.id+'\',\'active\')" '+(status!=='active'?'':'disabled')+'>⚔ Mark Active</button>'+
    '<button class="btn btn-green btn-sm" onclick="sqSetStatus(\''+sq.id+'\',\'done\')" '+(status!=='done'?'':'disabled')+'>✅ Mark Complete</button>'+
    '<button class="btn btn-grey btn-sm" onclick="sqSetStatus(\''+sq.id+'\',\'locked\')">↺ Reset</button>'+
    '</div>';

  html += '<div class="g2"><div>';
  // Header
  html += '<div class="panel" style="margin-bottom:.9rem">'+
    '<div style="display:flex;align-items:center;gap:.8rem;margin-bottom:.8rem">'+
    '<span style="font-size:2.8rem">'+sq.portrait+'</span>'+
    '<div><div style="font-family:Cinzel,serif;font-size:1rem;color:var(--gold-hi)">'+sq.title+'</div>'+
    '<div style="font-family:Cinzel,serif;font-size:.6rem;letter-spacing:.2em;color:var(--teal-hi)">'+sq.hero.toUpperCase()+' SIDE QUEST</div>'+
    '<div style="font-style:italic;font-size:.82rem;color:var(--parch-dim);margin-top:.2rem">'+sq.subtitle+'</div></div></div>'+
    '<div style="background:rgba(212,168,32,.07);border:1px solid rgba(212,168,32,.2);border-radius:2px;padding:.55rem .8rem;margin-bottom:.6rem">'+
    '<span style="font-family:Cinzel,serif;font-size:.58rem;letter-spacing:.12em;color:var(--gold);text-transform:uppercase">🏆 Reward: </span>'+
    '<span style="font-style:italic;font-size:.85rem;color:var(--parch-dim)">'+sq.reward+'</span></div>'+
    '<div style="font-style:italic;font-size:.8rem;color:var(--text-dim);border-top:1px solid var(--border);padding-top:.5rem">'+
    '<strong style="font-family:Cinzel,serif;font-size:.55rem;color:var(--teal-hi);letter-spacing:.1em">UNLOCK: </strong>'+sq.unlock+'</div>'+
    '</div>';

  // Pet reward if exists
  if(sq.pet){
    html += '<div class="panel" style="margin-bottom:.9rem;background:rgba(26,80,80,.08);border-color:var(--teal)">'+
      '<div class="ptitle">🐾 Pet Companion Unlocked</div>'+
      '<div style="display:flex;align-items:center;gap:.6rem;margin-bottom:.5rem">'+
      '<span style="font-size:2rem">🐺</span>'+
      '<div style="font-family:Cinzel,serif;font-size:.9rem;color:var(--teal-hi)">'+sq.pet.name+'</div></div>'+
      '<p style="font-style:italic;font-size:.84rem;color:var(--parch-dim);line-height:1.7">'+sq.pet.ability+'</p></div>';
  }

  html += '</div><div>';
  // Stages
  sq.stages.forEach(function(stage, i){
    html += '<div style="background:linear-gradient(135deg,var(--dark),var(--bg));border:1px solid var(--border);border-radius:2px;padding:.9rem;margin-bottom:.75rem">'+
      '<div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.55rem">'+
      '<span style="font-family:Cinzel,serif;font-size:.58rem;color:var(--gold);background:rgba(184,134,11,.15);border:1px solid var(--gold-dim);padding:.1rem .4rem;border-radius:2px;letter-spacing:.1em">'+(i+1)+'</span>'+
      '<span style="font-family:Cinzel,serif;font-size:.75rem;color:var(--parch)">'+stage.title+'</span></div>';
    if(stage.text){
      html += '<p style="font-style:italic;font-size:.9rem;color:var(--text);line-height:1.9;white-space:pre-line;font-family:Georgia,serif;margin-bottom:'+(stage.readout?'.6rem':'0')+'">'+stage.text+'</p>';
    }
    if(stage.readout){
      html += '<div style="background:rgba(0,0,0,.3);border-left:3px solid var(--blood);padding:.75rem .9rem;border-radius:0 2px 2px 0;margin-top:.4rem">'+
        '<div style="font-family:Cinzel,serif;font-size:.5rem;letter-spacing:.2em;color:var(--blood-hi);text-transform:uppercase;margin-bottom:.3rem">📖 Read Aloud</div>'+
        '<p style="font-style:italic;color:var(--parch-dim);line-height:1.85;font-size:.86rem;white-space:pre-line">'+stage.readout+'</p></div>';
    }
    html += '</div>';
  });
  html += '</div></div>';

  dv.innerHTML = html;
  document.getElementById('sqActiveLbl').textContent = sq.title+' — '+sq.hero;
}

function sqSetStatus(sqId, status){
  if(!S.sqStatus) S.sqStatus={};
  initMercEnemyData();
  initShopData();
  initItemData();
  renderGoldPot();
  S.sqStatus[sqId]=status;
  saveLocal();
  notify(status==='done'?'✅ Side quest marked complete!':status==='active'?'⚔ Side quest is now active':'↺ Side quest reset');
  sqView('detail', sqId);
}




function toggleBurger(){
  var tl=document.getElementById('tab-list');
  var tb=document.getElementById('tab-burger');
  if(!tl) return;
  var open=tl.classList.toggle('open');
  if(tb) tb.setAttribute('aria-expanded', open ? 'true' : 'false');
}

function goTab(id){
  document.querySelectorAll('.section').forEach(function(s){ s.classList.remove('active'); });
  document.querySelectorAll('.tab').forEach(function(b){ b.classList.remove('active'); });
  document.getElementById('tab-'+id).classList.add('active');
  document.querySelectorAll('.tab').forEach(function(b){ if(b.getAttribute('onclick')==="goTab('"+id+"')") b.classList.add('active'); });
  // Update burger label and close dropdown
  var bl=document.getElementById('burger-label');
  if(bl){ var at=document.querySelector('#tab-list .tab.active'); if(at) bl.textContent=at.textContent.trim(); }
  var tl=document.getElementById('tab-list'); if(tl) tl.classList.remove('open');
  var tb=document.getElementById('tab-burger'); if(tb) tb.setAttribute('aria-expanded','false');
  if(id==='home'){ renderHome(); }
  if(id==='village'){ renderMap(); }
  if(id==='chars'){ renderHeroes(); }
  if(id==='turns'){ renderTurns(); renderOutposts('outpostMain'); }
  if(id==='tavern'){ renderTavern(); }
  if(id==='chase'){ renderChase(); }
  if(id==='shops'){ HQAudio.shop(); renderShops(); }
  if(id==='world'){ renderWorldItems(); }
  if(id==='mercs'){ renderMercs(); }
  if(id==='enemies'){ renderEnemies(); }
  if(id==='story'){ renderActNav(); if(!currentActId && ACTS && ACTS.length) loadAct(ACTS[0].id); }
  if(id==='sq'){ renderSqList(); }
  if(id==='dungeon'){ renderDungeonMap(); }
  if(id==='notes'){ renderChecklist(); }
}

// ═══════════════════════════════════════════
// HOME SCREEN
// ═══════════════════════════════════════════
function renderHome(){
  // Party gold (big display)
  var goldEl = document.getElementById('home-gold-big');
  if(goldEl) goldEl.textContent = Number(S.groupGold||0).toLocaleString();

  // Active hero mini-cards
  var cardsEl = document.getElementById('home-hero-cards');
  if(cardsEl){
    var active = S.heroes.filter(function(h){ return h.active; });
    if(active.length===0){
      cardsEl.innerHTML='<span style="font-size:.82rem;font-style:italic;color:var(--text-dim)">No active heroes.</span>';
    } else {
      cardsEl.innerHTML = active.map(function(h){
        var pct = h.bodyMax>0 ? Math.round((h.body/h.bodyMax)*100) : 0;
        var barColor = pct>50?'var(--green-hi)':pct>25?'var(--gold-hi)':'var(--blood-hi)';
        var statusTag = h.jailed
          ? '<span style="font-family:Cinzel,serif;font-size:.42rem;background:rgba(122,16,16,.3);border:1px solid var(--blood);color:var(--blood-hi);padding:.05rem .3rem;border-radius:2px;">JAILED</span>'
          : '';
        return '<div style="background:linear-gradient(160deg,var(--dark),var(--bg));border:1px solid '+(h.jailed?'var(--blood)':'var(--gold)')+';border-radius:3px;padding:.7rem .85rem;min-width:130px;max-width:170px;flex:1 1 130px;">'
          +'<div style="font-size:1.6rem;text-align:center;margin-bottom:.22rem;">'+h.portrait+'</div>'
          +'<div style="font-family:Cinzel,serif;font-size:.65rem;color:var(--gold-hi);text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+h.name+'</div>'
          +'<div style="font-family:Cinzel,serif;font-size:.48rem;letter-spacing:.12em;color:var(--text-dim);text-align:center;margin-bottom:.28rem;">'+h.cls+(h.player&&h.player!=='—'?' · '+h.player:'')+'</div>'
          +(statusTag?'<div style="text-align:center;margin-bottom:.22rem;">'+statusTag+'</div>':'')
          +'<div style="background:rgba(0,0,0,.45);border-radius:2px;height:6px;overflow:hidden;margin-bottom:.18rem;">'
            +'<div style="height:100%;width:'+pct+'%;background:'+barColor+';border-radius:2px;transition:width .35s;"></div>'
          +'</div>'
          +'<div style="font-family:Cinzel,serif;font-size:.52rem;color:var(--parch-dim);text-align:center;">'+h.body+' / '+h.bodyMax+' ❤</div>'
          +(h.level?'<div style="font-family:Cinzel,serif;font-size:.46rem;color:var(--green-hi);text-align:center;margin-top:.14rem;">Lv '+h.level+(h.xp?' · '+h.xp+' xp':'')+'</div>':'')
          +'</div>';
      }).join('');
    }
  }

  // Quest progress
  var qpEl = document.getElementById('home-quest-progress');
  if(qpEl){
    var quests=[
      {id:'q1',name:'Quest 1 — Temple of Dragliton'},
      {id:'q2',name:'Quest 2 — Siege of the West Gate'},
      {id:'q3',name:'Quest 3 — Sunken Crypts'},
      {id:'q4',name:'Quest 4 — Iron Fortress'},
      {id:'q5',name:'Quest 5 — Plagued Marshes'},
      {id:"q6",name:"Quest 6 — Drevak's Watchtower"},
      {id:'q7',name:'Quest 7 — Citadel of Cassel Mourne'},
    ];
    var sqList=[
      {id:'sq-druid',hero:'Druid',name:'The Lost Wolf'},
      {id:'sq-barb',hero:'Barbarian',name:'The Weapon That Was Taken'},
      {id:'sq-elf',hero:'Elf',name:'The Cloak of the Ashenwarden'},
      {id:'sq-dwarf',hero:'Dwarf',name:'The Ironclad Codex'},
      {id:'sq-wizard',hero:'Wizard',name:'The Unchained Conclave'},
    ];
    var html='<div style="font-family:Cinzel,serif;font-size:.52rem;letter-spacing:.15em;color:var(--text-dim);text-transform:uppercase;margin-bottom:.5rem;">Main Quests</div>';
    html+=quests.map(function(q,i){
      var done=(S.dungeonMaps&&S.dungeonMaps[q.id]&&Object.keys(S.dungeonMaps[q.id].cells||{}).length>0);
      return '<div style="display:flex;align-items:center;gap:.55rem;padding:.32rem .4rem;border-bottom:1px solid rgba(58,42,18,.35);">'
        +'<span style="font-size:.95rem;">'+(done?'✅':'⬜')+'</span>'
        +'<span style="font-family:Cinzel,serif;font-size:.65rem;color:'+(done?'var(--gold-hi)':'var(--parch-dim)')+'">'+q.name+'</span>'
        +'</div>';
    }).join('');
    html+='<div style="font-family:Cinzel,serif;font-size:.52rem;letter-spacing:.15em;color:var(--text-dim);text-transform:uppercase;margin-top:.8rem;margin-bottom:.5rem;">Side Quests</div>';
    html+=sqList.map(function(sq){
      var done=S.sqStatus&&S.sqStatus[sq.id]==='done';
      return '<div style="display:flex;align-items:center;gap:.55rem;padding:.3rem .4rem;border-bottom:1px solid rgba(58,42,18,.25);">'
        +'<span style="font-size:.88rem;">'+(done?'✅':'⬜')+'</span>'
        +'<div><div style="font-family:Cinzel,serif;font-size:.62rem;color:'+(done?'var(--teal-hi)':'var(--parch-dim)')+'">'+sq.name+'</div>'
        +'<div style="font-family:Cinzel,serif;font-size:.46rem;color:var(--text-dim);">'+sq.hero+'</div></div>'
        +'</div>';
    }).join('');
    qpEl.innerHTML=html;
  }
}

function toggleEdit(){
  S.editMode=!S.editMode;
  document.body.classList.toggle('edit-mode',S.editMode);
  document.querySelectorAll('[contenteditable]').forEach(function(el){ el.contentEditable=S.editMode?'true':'false'; });
  document.getElementById('editBtn').textContent=S.editMode?'✓ Done Editing':'✏ Edit Story Text';
  document.getElementById('ebadge').classList.toggle('show',S.editMode);
  if(!S.editMode) saveLocal();
}

function renderMap(){
  var mp=document.getElementById('vmap');
  mp.innerHTML='';
  AREAS.forEach(function(a){
    var d=document.createElement('div');
    d.className='varea'+(a.span===2?' span2':'')+(a.id==='outpost'?' outpost':'')+(a.restricted?' restricted':'');
    if(a.guarded) d.innerHTML='<div class="gbadge">👮 GUARDED</div>';
    d.innerHTML+='<div class="varea-icon">'+a.icon+'</div>'+
      '<div class="varea-name">'+a.name+'</div>'+
      '<div class="varea-desc">'+a.desc+'</div>'+
      '<div class="varea-who">'+a.who+'</div>';
    d.onclick=(function(area){ return function(){ showArea(area); }; })(a);
    mp.appendChild(d);
  });
}

function showArea(a){
  document.getElementById('areaDefault').style.display='none';
  var d=document.getElementById('areaDetail');
  d.style.display='block';
  d.innerHTML='<div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem">'+
    '<span style="font-size:2.2rem">'+a.icon+'</span>'+
    '<div><div style="font-family:Cinzel,serif;font-size:.95rem;color:var(--gold-hi)">'+a.name+'</div>'+
    '<div style="font-family:Cinzel,serif;font-size:.55rem;letter-spacing:.18em;color:var(--teal-hi)">'+a.who+'</div></div></div>'+
    '<p style="font-style:italic;color:var(--parch-dim);line-height:1.75;font-size:.88rem;margin-bottom:.65rem">'+a.detail+'</p>'+
    (a.training?'<div style="background:rgba(26,80,80,.1);border:1px solid var(--teal);border-radius:2px;padding:.45rem .75rem;font-size:.8rem;color:var(--teal-hi);font-style:italic">⚔ '+a.training+'</div>':'');
}

function activeHeroes(){ return S.heroes.filter(function(h){ return h.active; }); }
function pcolor(p){ return PCOLORS[p]||'#6a4a20'; }

function buildHeroCard(h){
  var card=document.createElement('div');
  card.className='hcard'+(h.active?' on':'');
  card.style.position='relative';
  var lv=h.level||1;
  var xp=h.xp||0;
  var eq=h.equipment.length?h.equipment.map(function(e){return '<span class="etag">'+e+'</span>';}).join(''):'<span class="dim" style="font-size:.72rem">None</span>';
  var sk=h.skills.length?h.skills.map(function(s){return '<span class="stag">'+s+'</span>';}).join(''):'<span class="dim" style="font-size:.72rem">None</span>';
  // Level badge top-left
  var lb=document.createElement('div');
  lb.className='hero-level-badge';
  lb.innerHTML='<button class="hero-level-btn" id="lvdn-'+h.id+'">&#8722;</button>'+
    '<div style="text-align:center;padding:0 .15rem"><div class="hero-level-lbl">Lvl</div><div class="hero-level-val" id="lv-'+h.id+'">'+lv+'</div></div>'+
    '<button class="hero-level-btn" id="lvup-'+h.id+'">+</button>';
  card.appendChild(lb);
  // XP badge top-right
  var xb=document.createElement('div');
  xb.className='hero-xp-badge';
  xb.innerHTML='<div class="hero-xp-lbl">XP</div><input class="hero-xp-inp" type="number" min="0" id="xp-'+h.id+'" value="'+xp+'">';
  card.appendChild(xb);
  // Body
  var body=document.createElement('div');
  body.innerHTML=
    '<div class="hportrait" style="margin-top:2rem">'+h.portrait+'</div>'+
    '<input class="hname-inp" id="hname-'+h.id+'" value="'+h.name.replace(/"/g,'&quot;')+'" title="Click to rename">'+
    '<div class="hcls">'+h.cls+'</div>'+
    '<div class="hplayer" style="color:'+pcolor(h.player)+'">'+(h.active?'\u25b8 '+h.player:'\u2014 Unassigned \u2014')+'</div>'+
    '<div class="sgrid">'+
      sbox('Attack','\u2694 '+h.atk,'base '+h.baseAtk)+
      sbox('Defence','&#x1F6E1; '+h.def,'base '+h.baseDef)+
      sbox('Body Max','\u2764 '+h.bodyMax,'base '+h.baseBody)+
      sbox('Mind Max','\u2726 '+h.mindMax,'base '+h.baseMind)+
    '</div>'+
    '<div style="margin-bottom:.48rem"><div class="slbl" style="margin-bottom:.22rem">BODY POINTS</div>'+
    '<div class="pips" id="pip-'+h.id+'"></div>'+
    '<div style="font-family:Cinzel,serif;font-size:.6rem;color:var(--parch-dim);text-align:center" id="piblbl-'+h.id+'">'+h.body+' / '+h.bodyMax+'</div></div>'+
    '<div style="margin-bottom:.45rem"><div class="slbl">EQUIPMENT</div><div>'+eq+'</div></div>'+
    buildEquipBonuses(h)+
    '<div style="margin-bottom:.45rem"><div class="slbl">SKILLS</div><div>'+sk+'</div></div>'+
    '<div class="brow" style="margin-top:.55rem">'+
      '<button class="btn btn-gold btn-sm" id="editbtn-'+h.id+'">Edit</button>'+
      (h.active?'<button class="btn btn-blood btn-sm" id="jailbtn-'+h.id+'">'+(h.jailed?'Unjail':'Jail')+'</button>':'')+
      '<button class="btn btn-grey btn-sm" id="actbtn-'+h.id+'">'+(h.active?'Deactivate':'Activate')+'</button>'+
    '</div>'+
    (h.jailed?'<div class="jail-ov"><div style="font-size:1.8rem;margin-bottom:.25rem">&#128274;</div><div style="font-family:Cinzel,serif;font-size:.62rem;letter-spacing:.18em;color:var(--blood-hi)">IN JAIL</div><div class="dim" style="font-size:.68rem;margin-top:.25rem">Rest scene over</div></div>':'');
  card.appendChild(body);
  (function(hero,el){
    var lu=el.querySelector('#lvup-'+hero.id),ld=el.querySelector('#lvdn-'+hero.id),ld2=el.querySelector('#lv-'+hero.id);
    if(lu) lu.onclick=function(e){e.stopPropagation();hero.level=Math.min(5,(hero.level||1)+1);if(ld2)ld2.textContent=hero.level;saveLocal();notify(hero.name+' \u2014 Level '+hero.level);};
    if(ld) ld.onclick=function(e){e.stopPropagation();hero.level=Math.max(1,(hero.level||1)-1);if(ld2)ld2.textContent=hero.level;saveLocal();};
    var xi=el.querySelector('#xp-'+hero.id);
    if(xi){xi.onclick=function(e){e.stopPropagation();this.select();};xi.onchange=function(){hero.xp=Math.max(0,parseInt(this.value)||0);saveLocal();notify(hero.name+': '+hero.xp+' XP');};}
    var ni=el.querySelector('#hname-'+hero.id);
    if(ni){
      ni.onfocus=function(){this.style.borderBottomColor='var(--gold)';this.style.background='rgba(212,168,32,.06)';};
      ni.onblur=function(){this.style.borderBottomColor='transparent';this.style.background='transparent';var n=this.value.trim();if(n&&n!==hero.name){hero.name=n;saveLocal();notify('Renamed: '+n);}};
      ni.onkeydown=function(e){if(e.key==='Enter')this.blur();};
    }
    var eb=el.querySelector('#editbtn-'+hero.id);if(eb)eb.onclick=function(){openEdit(hero.id);};
    var jb=el.querySelector('#jailbtn-'+hero.id);if(jb)jb.onclick=function(){toggleJail(hero.id);};
    var ab=el.querySelector('#actbtn-'+hero.id);if(ab)ab.onclick=function(){toggleActive(hero.id);};
  })(h,card);
  return card;
}

function renderHeroes(){
  var c=document.getElementById('heroCards');
  c.innerHTML='';
  var active=S.heroes.filter(function(h){return h.active;});
  var inactive=S.heroes.filter(function(h){return !h.active;});

  // Active heroes — equal-width columns in one row, never wrapping to next line
  var ag=document.createElement('div');
  ag.style.cssText='display:grid;grid-template-columns:repeat('+active.length+',1fr);gap:.8rem;margin-bottom:'+(inactive.length?'0':'0')+';';
  active.forEach(function(h){ag.appendChild(buildHeroCard(h));buildPips(h);});
  c.appendChild(ag);

  // Inactive heroes — full-width section below with a clear separator
  if(inactive.length){
    var sec=document.createElement('div');
    sec.style.cssText='margin-top:1.4rem;padding-top:1rem;border-top:1px solid var(--border);';
    var lbl=document.createElement('div');
    lbl.style.cssText='font-family:Cinzel,serif;font-size:.58rem;letter-spacing:.25em;text-transform:uppercase;color:var(--text-dim);margin-bottom:.8rem;';
    lbl.textContent='Inactive Heroes';
    sec.appendChild(lbl);
    var ig=document.createElement('div');
    ig.style.cssText='display:grid;grid-template-columns:repeat('+Math.min(inactive.length,4)+',minmax(0,280px));gap:.8rem;';
    inactive.forEach(function(h){ig.appendChild(buildHeroCard(h));buildPips(h);});
    sec.appendChild(ig);
    c.appendChild(sec);
  }
}

function sbox(lbl,val,base){
  return '<div class="sbox"><span class="slbl">'+lbl+'</span><span class="sval">'+val+'</span><br><span class="sbase">'+base+'</span></div>';
}

function buildPips(h){
  var t=document.getElementById('pip-'+h.id);
  if(!t) return;
  t.innerHTML='';
  for(var i=0;i<h.bodyMax;i++){
    var p=document.createElement('div');
    p.className='pip'+(i>=h.body?' e':'');
    (function(hero,idx){
      p.onclick=function(){
        hero.body=(idx<hero.body)?Math.max(0,idx):Math.min(hero.bodyMax,idx+1);
        buildPips(hero);
        var lbl=document.getElementById('piblbl-'+hero.id);
        if(lbl) lbl.textContent=hero.body+' / '+hero.bodyMax;
      };
    })(h,i);
    t.appendChild(p);
  }
}

function healAll(){
  S.heroes.filter(function(h){ return h.active; }).forEach(function(h){ h.body=h.bodyMax; });
  renderHeroes();
  notify('❤ All heroes healed to full');
}

function toggleJail(id){
  var h=S.heroes.find(function(x){ return x.id===id; });
  h.jailed=!h.jailed;
  if(h.jailed) S.turns[id]=Array(10).fill(true);
  renderHeroes();
  notify(h.jailed?'🔒 '+h.name+' jailed.':'🔓 '+h.name+' released.');
}

function toggleActive(id){
  var h=S.heroes.find(function(x){ return x.id===id; });
  h.active=!h.active;
  if(h.active && !S.turns[id]) S.turns[id]=Array(10).fill(false);
  renderHeroes();
  notify(h.name+(h.active?' activated.':' deactivated.'));
}

function openEdit(id){
  var h=S.heroes.find(function(x){ return x.id===id; });
  openModal('Edit — '+h.name, buildEditForm(h));
}

function buildEditForm(h){
  return '<div class="frow"><span class="flbl">Hero Name</span><input class="inp" style="flex:1" id="ef-name" value="'+h.name+'"></div>'+
    '<div class="frow"><span class="flbl">Player</span><input class="inp" style="flex:1" id="ef-pl" value="'+h.player+'"></div>'+
    '<div class="sedit">'+
    sebox('⚔ Attack','ef-atk',h.atk,h.baseAtk)+
    sebox('🛡 Defence','ef-def',h.def,h.baseDef)+
    sebox('❤ Body Max','ef-bm',h.bodyMax,h.baseBody)+
    sebox('✦ Mind Max','ef-mm',h.mindMax,h.baseMind)+
    '</div><div class="sep"></div>'+
    '<div class="ptitle" style="margin-bottom:.45rem">🎒 Equipment</div>'+
    '<div class="elist" id="ef-equip">'+h.equipment.map(function(e,i){ return eitem(e,i,h.id,'equip'); }).join('')+'</div>'+
    '<div class="adde"><input class="inp" id="ef-neweq" placeholder="Add item…" style="flex:1"><button class="btn btn-teal btn-sm" onclick="addEquip(\''+h.id+'\')">+</button></div>'+
    '<div class="sep"></div>'+
    '<div class="ptitle" style="margin-bottom:.45rem">✦ Skills</div>'+
    '<div class="elist" id="ef-skills">'+h.skills.map(function(s,i){ return eitem(s,i,h.id,'skill'); }).join('')+'</div>'+
    '<div class="adde"><input class="inp" id="ef-newsk" placeholder="Add skill…" style="flex:1"><button class="btn btn-purple btn-sm" onclick="addSkill(\''+h.id+'\')">+</button></div>'+
    '<div class="sep"></div>'+
    '<div class="brow"><button class="btn btn-gold" onclick="saveEdit(\''+h.id+'\')">✓ Save</button><button class="btn btn-blood btn-sm" onclick="closeModal()">Cancel</button></div>';
}

function sebox(lbl,eid,val,base){
  return '<div class="sebox"><span class="selbl">'+lbl+'</span>'+
    '<div class="sectrl">'+
    '<button class="sebtn" onclick="adj(\''+eid+'\',-1)">−</button>'+
    '<span class="senum" id="'+eid+'">'+val+'</span>'+
    '<button class="sebtn" onclick="adj(\''+eid+'\',1)">+</button>'+
    '</div><div class="sebase">base: '+base+'</div></div>';
}

function eitem(val,idx,hid,type){
  return '<div class="eitem"><span>'+val+'</span><button class="erm" onclick="removeItem('+idx+',\''+hid+'\',\''+type+'\')">✕</button></div>';
}

function adj(eid,d){
  var el=document.getElementById(eid);
  if(el) el.textContent=Math.max(1,(parseInt(el.textContent)||1)+d);
}

function removeItem(idx,hid,type){
  var h=S.heroes.find(function(x){ return x.id===hid; });
  var arr=type==='equip'?h.equipment:h.skills;
  if(type==='equip'){
    var removedName=arr[idx];
    arr.splice(idx,1);
    applyItemToHero(hid,removedName,true);
  } else {
    arr.splice(idx,1);
  }
  var cont=document.getElementById(type==='equip'?'ef-equip':'ef-skills');
  if(cont) cont.innerHTML=arr.map(function(v,i){ return eitem(v,i,hid,type); }).join('');
}

function addEquip(hid){
  var inp=document.getElementById('ef-neweq');
  var v=inp.value.trim(); if(!v) return;
  var h=S.heroes.find(function(x){ return x.id===hid; });
  h.equipment.push(v); inp.value='';
  document.getElementById('ef-equip').innerHTML=h.equipment.map(function(e,i){ return eitem(e,i,hid,'equip'); }).join('');
}

function addSkill(hid){
  var inp=document.getElementById('ef-newsk');
  var v=inp.value.trim(); if(!v) return;
  var h=S.heroes.find(function(x){ return x.id===hid; });
  h.skills.push(v); inp.value='';
  document.getElementById('ef-skills').innerHTML=h.skills.map(function(s,i){ return eitem(s,i,hid,'skill'); }).join('');
}

function saveEdit(hid){
  var h=S.heroes.find(function(x){ return x.id===hid; });
  var nn=document.getElementById('ef-name').value.trim();if(nn)h.name=nn;
  h.player=document.getElementById('ef-pl').value.trim()||h.player;
  h.atk=parseInt(document.getElementById('ef-atk').textContent)||h.atk;
  h.def=parseInt(document.getElementById('ef-def').textContent)||h.def;
  var nb=parseInt(document.getElementById('ef-bm').textContent)||h.bodyMax;
  if(nb>h.bodyMax) h.body+=nb-h.bodyMax;
  h.bodyMax=nb; h.body=Math.min(h.body,h.bodyMax);
  h.mindMax=parseInt(document.getElementById('ef-mm').textContent)||h.mindMax;
  // Also grab anything typed in the input fields but not yet added
  var eqInp=document.getElementById('ef-neweq');
  if(eqInp&&eqInp.value.trim()) h.equipment.push(eqInp.value.trim());
  var skInp=document.getElementById('ef-newsk');
  if(skInp&&skInp.value.trim()) h.skills.push(skInp.value.trim());
  closeModal(); renderHeroes(); notify('✓ '+h.name+' updated'); saveLocal();
}

function openActivate(){
  var inactive=S.heroes.filter(function(h){ return !h.active; });
  if(!inactive.length){ openModal('All Heroes Active','<p class="dim">All heroes are currently active.</p>'); return; }
  openModal('Activate Hero',
    inactive.map(function(h){
      return '<div style="display:flex;align-items:center;gap:.65rem;padding:.55rem;border:1px solid var(--border);border-radius:2px;margin-bottom:.4rem">'+
        '<span style="font-size:1.7rem">'+h.portrait+'</span>'+
        '<div style="flex:1"><div style="font-family:Cinzel,serif;font-size:.78rem;color:var(--parch)">'+h.name+'</div>'+
        '<div style="font-family:Cinzel,serif;font-size:.55rem;color:var(--text-dim);letter-spacing:.12em">'+h.cls+'</div></div>'+
        '<button class="btn btn-gold btn-sm" onclick="activateHero(\''+h.id+'\')">Activate</button></div>';
    }).join('')
  );
}

function activateHero(id){
  var h=S.heroes.find(function(x){ return x.id===id; });
  h.active=true;
  if(!S.turns[id]) S.turns[id]=Array(10).fill(false);
  closeModal(); renderHeroes(); notify(h.name+' is now active.');
}

function renderTurns(){
  var c=document.getElementById('turnTracker');
  c.innerHTML='';
  activeHeroes().forEach(function(h){
    if(!S.turns[h.id]) S.turns[h.id]=Array(10).fill(false);
    var used=S.turns[h.id].filter(Boolean).length;
    var row=document.createElement('div');
    row.className='trow';
    row.innerHTML='<div class="tportrait">'+h.portrait+'</div>'+
      '<div class="tname">'+h.name+'<br><span style="font-size:.52rem;color:'+pcolor(h.player)+'">'+h.player+'</span></div>'+
      '<div class="tpips" id="tp-'+h.id+'"></div>'+
      '<div class="tcnt">'+(10-used)+' left</div>'+
      '<button class="btn btn-grey btn-sm" onclick="resetHeroTurns(\''+h.id+'\')">↺</button>';
    c.appendChild(row);
    buildTurnPips(h);
  });
}

function buildTurnPips(h){
  var c=document.getElementById('tp-'+h.id);
  if(!c) return;
  c.innerHTML='';
  S.turns[h.id].forEach(function(used,i){
    var p=document.createElement('div');
    p.className='tpip'+(used?' used':'');
    p.title='Turn '+(i+1);
    (function(idx){
      p.onclick=function(){ S.turns[h.id][idx]=!S.turns[h.id][idx]; renderTurns(); };
    })(i);
    c.appendChild(p);
  });
}

function resetHeroTurns(id){ S.turns[id]=Array(10).fill(false); renderTurns(); }
function resetAllTurns(){ S.heroes.forEach(function(h){ S.turns[h.id]=Array(10).fill(false); }); renderTurns(); notify('↺ All turns reset'); }

function rollMove(){
  var d1=Math.ceil(Math.random()*6);
  var d2=Math.ceil(Math.random()*6);
  var f=['⚀','⚁','⚂','⚃','⚄','⚅'];
  document.getElementById('moveDice').innerHTML='<span style="font-size:3rem">'+f[d1-1]+'</span><span style="font-size:3rem">'+f[d2-1]+'</span>';
  document.getElementById('moveResult').textContent='Move '+(d1+d2)+' squares';
}

var ONAMES=['North Gate','East Market','South Bridge','West Alley'];

function renderOutposts(targetId){
  var c=document.getElementById(targetId);
  if(!c) return;
  c.innerHTML='';
  S.outposts.forEach(function(alerted,i){
    var row=document.createElement('div');
    row.style.cssText='display:flex;align-items:center;gap:.55rem;padding:.42rem .62rem;border-bottom:1px solid rgba(58,42,18,.38)';
    var icon=document.createElement('span');
    icon.textContent=alerted?'🚨':'👮';
    icon.style.fontSize='1rem';
    var name=document.createElement('span');
    name.style.cssText='font-family:Cinzel,serif;font-size:.68rem;flex:1;color:'+(alerted?'#b02020':'#7a6040');
    name.textContent=ONAMES[i];
    var status=document.createElement('span');
    status.style.cssText='font-family:Cinzel,serif;font-size:.56rem;letter-spacing:.1em;color:'+(alerted?'#b02020':'#3a8a30');
    status.textContent=alerted?'ALERTED':'CLEAR';
    var btn=document.createElement('button');
    btn.className='btn btn-sm';
    btn.style.cssText='border-color:'+(alerted?'#7a1010':'#2a5a20')+';color:'+(alerted?'#b02020':'#3a8a30');
    btn.textContent=alerted?'Clear':'Alert';
    (function(idx){ btn.onclick=function(){ toggleOutpost(idx); }; })(i);
    row.appendChild(icon); row.appendChild(name); row.appendChild(status); row.appendChild(btn);
    c.appendChild(row);
  });
}

function toggleOutpost(i){
  S.outposts[i]=!S.outposts[i];
  renderOutposts('outpostMain');
  renderOutposts('outpostChase');
  notify(S.outposts[i]?'🚨 '+ONAMES[i]+' ALERTED':'✓ '+ONAMES[i]+' cleared');
}

function renderTavern(){
  var t=document.getElementById('d20tbl');
  t.innerHTML='';
  D20.forEach(function(row){
    var d=document.createElement('div');
    d.className='d20row';
    d.style.cursor='pointer';
    d.title='Click to log this outcome';
    (function(r){ d.onclick=function(){ promptLogD20(r); }; })(row);
    d.innerHTML='<div class="d20range">'+row.range+'</div>'+
      '<div style="flex:1"><div style="margin-bottom:.2rem"><span class="dbadge t-'+row.type+'">'+row.label+'</span></div>'+
      '<div class="d20text">'+row.text+'</div></div>';
    t.appendChild(d);
  });
  var sel=document.getElementById('encSel');
  sel.innerHTML=activeHeroes().map(function(h){ return '<option value="'+h.id+'">'+h.portrait+' '+h.name+'</option>'; }).join('');
  renderEncLog();
}

function renderEncLog(){
  var c=document.getElementById('encLog');
  if(!S.encLog.length){ c.innerHTML='<p class="dim">No encounters logged yet.</p>'; return; }
  c.innerHTML=S.encLog.map(function(e){
    return '<div style="padding:.38rem .55rem;border-left:2px solid var(--gold-dim);margin-bottom:.38rem;font-size:.8rem">'+
      '<span style="font-family:Cinzel,serif;font-size:.58rem;color:var(--gold)">'+e.hero+'</span><br>'+e.text+'</div>';
  }).join('');
}

function promptLogD20(row){
  var heroOpts=activeHeroes().map(function(h){ return '<option value="'+h.id+'">'+h.portrait+' '+h.name+'</option>'; }).join('');
  var safeLabel=row.label.replace(/'/g,"&#39;");
  var safeType=row.type;
  openModal('Log: '+row.label,
    '<p class="dim" style="margin-bottom:.7rem">Which hero triggered this outcome?</p>'+
    '<div class="frow"><span class="flbl">Hero</span><select class="inp" id="d20hs" style="flex:1">'+heroOpts+'</select></div>'+
    '<div style="background:rgba(0,0,0,.25);border:1px solid var(--border);border-radius:2px;padding:.6rem .8rem;margin:.6rem 0">'+
    '<div style="font-family:Cinzel,serif;font-size:.55rem;letter-spacing:.15em;color:var(--gold);margin-bottom:.3rem">'+row.label+'</div>'+
    '<p style="font-style:italic;font-size:.82rem;color:var(--parch-dim);line-height:1.5">'+row.text+'</p></div>'+
    '<div class="brow">'+
    '<button class="btn btn-gold" id="d20confirm">Log This Outcome</button>'+
    '<button class="btn btn-grey btn-sm" onclick="closeModal()">Cancel</button></div>'
  );
  setTimeout(function(){
    var btn=document.getElementById('d20confirm');
    if(btn) btn.onclick=function(){ confirmLogD20(row.label,row.type); };
  },50);
}
function confirmLogD20(label,type){
  var sel=document.getElementById('d20hs');
  var h=S.heroes.find(function(x){ return x.id===sel.value; });
  var desc=D20.find(function(r){ return r.label===label; });
  S.encLog.push({hero:h?h.name:'Unknown',text:'[d20: '+label+'] '+(desc?desc.text.substring(0,80)+'...':'')});
  closeModal(); renderEncLog();
  notify('+ Logged: '+label+' for '+(h?h.name:'hero'));
  if(type==='quest'){
    setTimeout(function(){
      if(confirm('Side Quest result! Go to Side Quests tab to activate one?')){ goTab('sq'); }
    },400);
  }
}
function logEnc(){
  var sel=document.getElementById('encSel');
  var txt=document.getElementById('encTxt');
  if(!txt.value.trim()) return;
  var h=S.heroes.find(function(x){ return x.id===sel.value; });
  S.encLog.push({hero:h?h.name:'DM',text:txt.value.trim()});
  txt.value='';
  renderEncLog();
  notify('+ Encounter logged');
}

function clearLog(){ S.encLog=[]; renderEncLog(); }

function renderChase(){
  var hb=document.getElementById('chaseHeroBtns');
  hb.innerHTML='';
  activeHeroes().filter(function(h){ return !h.jailed; }).forEach(function(h){
    var b=document.createElement('button');
    b.className='csel'+(S.chase.heroId===h.id?' on':'');
    b.textContent=h.portrait+' '+h.name;
    (function(hid){ b.onclick=function(){ startChase(hid,b); }; })(h.id);
    hb.appendChild(b);
  });
  buildChaseDice();
  renderOutposts('outpostChase');
  renderRestricted();
  document.getElementById('chaseBtn').disabled=!S.chase.heroId||S.chase.done;
}

function startChase(hid,btn){
  S.chase={heroId:hid,rolls:[],done:false};
  document.getElementById('chaseResult').innerHTML='';
  document.querySelectorAll('.csel').forEach(function(b){ b.classList.remove('on'); });
  if(btn) btn.classList.add('on');
  buildChaseDice();
  document.getElementById('chaseBtn').disabled=false;
  notify('🏃 Chase started! 3 rolls to escape.');
}

function buildChaseDice(){
  var c=document.getElementById('chaseDice');
  if(!c) return;
  c.innerHTML='';
  for(var i=0;i<3;i++){
    var d=document.createElement('div');
    var r=S.chase.rolls[i];
    d.className='cdie'+(r==='shield'?' ok':r==='skull'?' fail':'');
    d.textContent=r==='shield'?'🛡':r==='skull'?'💀':'?';
    c.appendChild(d);
  }
}

function doChase(){
  if(!S.chase.heroId||S.chase.done||S.chase.rolls.length>=3) return;
  var result=Math.random()<0.5?'shield':'skull';
  var idx=S.chase.rolls.length;
  S.chase.rolls.push(result);
  var dies=document.querySelectorAll('.cdie');
  if(dies[idx]){
    dies[idx].style.transform='rotate(360deg) scale(1.2)';
    setTimeout(function(){
      dies[idx].style.transform='';
      dies[idx].className='cdie '+(result==='shield'?'ok':'fail');
      dies[idx].textContent=result==='shield'?'🛡':'💀';
      checkChase();
    },380);
  } else { checkChase(); }
}

function checkChase(){
  var rolls=S.chase.rolls;
  var shields=rolls.filter(function(r){ return r==='shield'; }).length;
  var skulls=rolls.filter(function(r){ return r==='skull'; }).length;
  var res=document.getElementById('chaseResult');
  var btn=document.getElementById('chaseBtn');
  if(shields>=1){
    S.chase.done=true; btn.disabled=true;
    var h=S.heroes.find(function(x){ return x.id===S.chase.heroId; });
    res.innerHTML='<div class="cresult cesc">🏃 ESCAPED! '+(h?h.name:'Hero')+' ducks into a side alley and loses the guards. Rest scene continues normally.</div>';
    notify('✓ Escaped!');
  } else if(skulls>=3){
    S.chase.done=true; btn.disabled=true;
    var h=S.heroes.find(function(x){ return x.id===S.chase.heroId; });
    if(h){ h.jailed=true; S.turns[h.id]=Array(10).fill(true); }
    res.innerHTML='<div class="cresult ccaught">🔒 CAUGHT! '+(h?h.name:'Hero')+' is dragged to the jail cell. Their rest scene is over — they begin the next quest at full health but with no turns.</div>';
    notify('🔒 Caught and jailed!');
    renderHeroes();
  }
}

function renderRestricted(){
  var c=document.getElementById('restrictedList');
  if(!c) return;
  c.innerHTML=AREAS.filter(function(a){ return a.restricted; }).map(function(a){
    return '<div style="display:flex;align-items:center;gap:.55rem;padding:.42rem .65rem;border-bottom:1px solid rgba(58,42,18,.3)">'+
      '<span>'+a.icon+'</span>'+
      '<div style="flex:1"><div style="font-family:Cinzel,serif;font-size:.68rem;color:var(--parch)">'+a.name+'</div>'+
      '<div style="font-family:Cinzel,serif;font-size:.52rem;color:var(--teal-hi);letter-spacing:.1em">'+a.who+'</div></div>'+
      '<span style="font-family:Cinzel,serif;font-size:.52rem;letter-spacing:.1em;color:var(--blood-hi)">RESTRICTED</span></div>';
  }).join('');
}

function renderChecklist(){
  var c=document.getElementById('checklist');
  c.innerHTML=CHECKLIST.map(function(item,i){
    var done=S.checklist[i];
    return '<div style="display:flex;align-items:center;gap:.55rem;padding:.38rem .48rem;border-bottom:1px solid rgba(58,42,18,.3);cursor:pointer" onclick="toggleCheck('+i+')">'+
      '<span style="font-size:.95rem">'+(done?'✅':'⬜')+'</span>'+
      '<span style="font-size:.83rem;color:'+(done?'var(--text-dim)':'var(--parch)')+(done?';text-decoration:line-through':'')+'">'+(done?'<s>'+item+'</s>':item)+'</span></div>';
  }).join('');
}

function toggleCheck(i){ S.checklist[i]=!S.checklist[i]; renderChecklist(); }

function newScene(){
  if(!confirm('Start a new rest scene? Turns, encounters and chase state reset. Heroes and stats are kept.')) return;
  Object.keys(S.turns).forEach(function(k){ S.turns[k]=Array(10).fill(false); });
  S.encLog=[]; S.outposts=[false,false,false,false];
  S.chase={heroId:null,rolls:[],done:false};
  S.heroes.forEach(function(h){ h.jailed=false; });
  healAll(); renderTurns(); notify('↺ New rest scene started');
}

function openModal(title,body){
  document.getElementById('mtitle').textContent=title;
  document.getElementById('mbody').innerHTML=body;
  document.getElementById('modal').classList.add('open');
  document.getElementById('mbody').addEventListener('click',function(e){
    var btn=e.target.closest('[data-tgt]');
    if(!btn) return;
    var el=document.getElementById(btn.getAttribute('data-tgt'));
    if(el){ var v=parseInt(el.value)||0; el.value=Math.max(0,v+parseInt(btn.getAttribute('data-dir'))); }
  },{once:true});
}
function closeModal(){ document.getElementById('modal').classList.remove('open'); }

function notify(msg,dur){
  dur=dur||3000;
  var n=document.getElementById('notif');
  n.textContent=msg; n.classList.add('show');
  setTimeout(function(){ n.classList.remove('show'); },dur);
}

var ACTS = [
  {
    "id": "act1",
    "num": "I",
    "title": "The Awakening and The Debt",
    "sub": "How it all began — read before Session 1",
    "scenes": [
      {
        "type": "read",
        "label": "Opening — Read Aloud",
        "voice": "Dim the lights. Read slowly, gravelly voice.",
        "text": "Your heads are pounding. The air is damp, smelling of mildew and rusted iron. As your eyes slowly adjust to the flickering torchlight, you realise you are sitting on the cold stone floor of a dungeon cell. You look at each other, but the memories of how you got here — or what you did last night — are a complete, hazy blank.\n\nBefore you can piece it together, heavy iron boots echo up the stone stairs. A burly guard with a scarred face approaches your cell. He slides a massive iron key into the lock with a loud CLANG and pulls the heavy door open."
      },
      {
        "type": "voice",
        "label": "The Guard",
        "voice": "Gruff, stern. No patience.",
        "text": "'On your feet. By order of His Majesty, the King, you lot are being released. But don't think you're walking free. You owe a debt to the Crown: 200 gold coins for the... mess you made. To pay it off, you will band together and take on the King's bounties. You are to rid this region of the vile creatures spawned by the devil himself — Zargon.'\n\n'For every quest you survive and complete, the King will grant you 25 gold coins each. He doesn't want to keep you locked up forever to rot... but mark my words, if he catches you doing what you did again, you'll never see the sun again. Now. Move.'"
      },
      {
        "type": "dm",
        "label": "DM Note",
        "text": "When they ask what they did to get arrested: have the King or guard refuse to speak of it ('I won't dignify that absolute debauchery by speaking it aloud in this hall!'). It keeps the mystery alive and gives you a fun running joke for the whole campaign."
      },
      {
        "type": "read",
        "label": "The Walk of Shame",
        "voice": "Continue without a break.",
        "text": "The guard ushers you out of the cell, leading you down a spiralling staircase into freezing, pitch-black caverns beneath the city. You walk in silence for what feels like hours until the cavern opens into a dimly lit circular chamber.\n\nThe room is filled with tall, hooded Elven figures. As you walk through the centre, their glowing eyes pierce from beneath their hoods, staring deeply into your souls. Several of them shake their heads and tut in disgust as you pass. The guard doesn't let you linger. He ushers you up a rusted iron ladder and pushes open a heavy manhole cover above."
      },
      {
        "type": "read",
        "label": "The King's Decree",
        "voice": "The King's voice: exhausted, grim, direct.",
        "text": "You climb out of the manhole, blinking against sudden brightness. You find yourselves standing directly in the centre of the grand royal throne room. Sitting before you is the King himself, looking exhausted and grim.\n\nHe leans forward, his voice echoing through the massive hall: 'I care not for your forgotten pasts. I only care about what you can do for me today. The nearby Temple of Dragliton has fallen silent. My scouts report it is entirely overrun with the undead. Worse, a rogue scout I sent to investigate the ruins has been trapped inside. Your first task: enter the Temple of Dragliton, carve through the undead, and rescue my scout. Do not fail me.'"
      }
    ]
  },
  {
    "id": "act1b",
    "num": "I-B",
    "title": "Temple of Dragliton — The Dungeon",
    "sub": "Combat Quest 1 — Map Layout and Encounter Guide",
    "scenes": [
      {
        "type": "dm",
        "label": "Map Setup Instructions",
        "text": "Use 3 rooms before the final chamber.\n\nROOM 1 — The Silent Vestibule: Dusty, cobwebs, smashed pews. When the last hero steps inside, the door slams shut. 3 Skeletons rise from the rubble. (1 Body Point each — let them feel powerful here.)\n\nROOM 2 — Hall of the Blind Watcher: Long narrow corridor. Gargoyle statue with gem eyes at the far end. PIT TRAP in the middle — first hero to step on it (if not searching) takes 1 Body Point damage and loses their next turn. SECRET: If a hero searches the gargoyle statue, they find a hidden pouch — 75 Gold and a Potion of Healing inside its stone jaws.\n\nROOM 3 — The Priest's Quarters: Old bedroom smelling of rot. Large ornate chest at foot of a decayed bed. Guarded by 2 Zombies and 1 Mummy. CHEST TRAP: Poison needle — 1 Body Point if not disarmed. LOOT: Potion of Healing + Iron Key (unlocks the final oak doors).\n\nFINAL ROOM — The Betrayal Chamber: See read-aloud below."
      },
      {
        "type": "read",
        "label": "Final Room — The Betrayal",
        "voice": "Play this up. Sneering, arrogant tone for the Rogue Scout.",
        "text": "You kick open the heavy oak doors, expecting a horde of the undead and a terrified scout. Instead, the room is warmly lit by torches. Huddled around a large stone altar are three green-skinned Goblins, snickering quietly.\n\nStanding at the head of the altar is a man in the King's royal scouting cloak. He isn't captured. He is pointing at a detailed map of your town. You hear him say: '...and the guards change shifts at midnight. If Zargon's forces strike the west gate then, the town will fall before dawn.'\n\nThe heavy doors creak behind you. The scout freezes, slowly turning his head. A wicked, knowing grin spreads across his face.\n\n'Well, well. The King's new debt-collectors. You're a long way from your cells. Kill them. Leave nothing for the undead to find!'"
      },
      {
        "type": "combat",
        "label": "Zargon Combat Notes",
        "text": "SETUP: Place 3-4 Goblins between the Heroes and the Rogue. Rogue at the far back near an unrevealed wall.\n\nTURN 1 (Zargon's): The Rogue does NOT fight. He laughs, smashes a smoke vial and steps backwards through a secret door that locks behind him.\n\nRead aloud: 'The traitorous scout pulls a vial from his belt and smashes it. Thick, choking black smoke fills the back of the room. By the time it clears, the wall is perfectly solid stone. He is gone.'\n\nELITE GOBLINS: Give them 2 Defend Dice instead of the usual 1.\n\nLOOT (after Goblins fall): The Town Map with invasion plans circled in red ink."
      }
    ]
  },
  {
    "id": "act1c",
    "num": "I-C",
    "title": "Return to the King — The First Victory",
    "sub": "After Quest 1 — read when they return with the map",
    "scenes": [
      {
        "type": "read",
        "label": "The King's Reaction",
        "voice": "Rage first, then something almost like respect.",
        "text": "The King unrolls the map across his grand table. As his eyes trace the red ink circling the town's West Gate, his face turns pale, and then flushed with absolute rage. He slams his armoured fist down on the table — the sound echoing like thunder in the silent hall.\n\n'Treason!' he roars. 'That rat has sold us out to Zargon! If you had not found this, we would have been slaughtered in our beds tonight.'\n\nHe looks up at you, his stern expression softening just a fraction.\n\n'You were sent to pay a debt, but you have done this kingdom a great service. The guard will give you each your 25 gold coins. Furthermore, take this extra 50 gold from the royal treasury. Go to the market. Buy whatever weapons and potions you can carry.'\n\nThe King leans forward, his eyes burning with urgency.\n\n'Rest quickly, Heroes. Tonight at midnight, Zargon's forces will strike the West Gate... and you are going to be standing right in their way.'"
      },
      {
        "type": "dm",
        "label": "Town Phase",
        "text": "This transitions straight into Quest 2: The Siege of the West Gate. Give them the rest scene now. They have approximately 40-50 gold each plus the 75g ruby if they found the gargoyle. Let them visit the shops before the midnight siege."
      }
    ]
  },
  {
    "id": "rest1",
    "num": "RS-1",
    "title": "Rest Scene — After the Temple",
    "sub": "The first night of freedom. The town is still nervous.",
    "scenes": [
      {
        "type": "read",
        "label": "The Town Breathes Again",
        "voice": "Read this slowly. Let the relief land before the unease.",
        "text": "The Temple of Dragliton stands dark on the hill, the way it has for a generation — but tonight it feels different. Empty. The undead that poured from it in the weeks before your arrival have simply stopped coming. Nobody in Millhaven knows why. They suspect you had something to do with it. Nobody wants to ask directly, because asking directly would mean acknowledging that they sent three strangers into a death trap on the King's orders, and there is a certain social awkwardness to that.\n\nThe market is open the next morning for the first time in ten days. The baker has made something with raisins in it. He gives one to each of you without charge and does not make eye contact."
      },
      {
        "type": "dm",
        "label": "Village Lore — What the Heroes Notice",
        "text": "RIPPLES FROM THE TEMPLE:\n\nThe church of Aured at the edge of town has its doors open again — a young priest is sweeping the steps for the first time in weeks. If a hero stops to talk, he says quietly that he heard the undead stopped walking last night, all at once, like a candle being snuffed. He doesn't know what it means. He's grateful but frightened — undead don't just stop without a reason, and the reason is usually worse than the undead.\n\nSMALL HUMAN MOMENT:\n\nA girl — seven, maybe eight — is waiting outside the tavern when the heroes emerge in the morning. She has a bunch of wildflowers, the kind that grow in the ditch outside the west road. She holds them out to whoever is nearest, says 'Mum says you went in the haunted church,' and then runs away before anyone can respond.\n\nKING'S DEBT NOTICE:\n\nA royal courier arrives mid-morning with a leather satchel. Inside: a formal document recording that 25 gold pieces have been credited to the heroes' debt with the Crown, signed in the King's seal. The debt now stands at 175 gold. The courier leaves immediately. He does not wait for a reply.\n\nWORLD SHADOW:\n\nThe courier's horse, if anyone notices, is lathered — ridden hard from somewhere much further than the palace. He came from the east road. Nobody sends couriers from the east at this hour unless something on the eastern roads is encouraging haste."
      },
      {
        "type": "read",
        "label": "The Tavern That Night",
        "voice": "Warm. Quieter than expected.",
        "text": "The Rusty Flagon is fuller than it's been in weeks. Not rowdy — the town hasn't quite remembered how to be rowdy yet — but people are in, and drinking, and talking at a normal volume, which feels almost festive by recent standards.\n\nThe barkeep, a broad woman called Marta who has so far communicated almost entirely through eyebrows, puts a jug of something dark and slightly sweet on your table without being asked.\n\n'On the house,' she says. And then, because she is Marta and this is apparently all she is going to give you: 'Don't make a habit of it.'\n\nSomewhere in the corner, someone is playing a stringed instrument badly. It is, somehow, exactly right."
      }
    ]
  },
  {
    "id": "act2",
    "num": "II",
    "title": "The Siege of the West Gate",
    "sub": "Combat Quest 2 — Midnight Defence",
    "scenes": [
      {
        "type": "dm",
        "label": "Board Setup",
        "text": "Use the large centre room as the Town Square — place heroes here. The hallway at the very top is the Breached Gate — Zargon's forces spawn here. Place two barricades (tables, weapon racks) in the corridors. Place a Treasure Chest in the Town Square (militia supplies — 1x Alchemist's Fire + 1x Minor Healing Potion, looted once only)."
      },
      {
        "type": "read",
        "label": "Opening — Midnight",
        "voice": "Urgent. Let each BOOM land. Pause between them.",
        "text": "It is exactly midnight. The heavy rain masks the sound of the approaching horde until it is almost too late. You stand in the mud of the Town Square, weapons drawn, staring down the long cobblestone street toward the massive wooden West Gate.\n\nBOOM. The gate shudders.\nBOOM. Wood splinters.\n\nOn the third strike, the heavy iron hinges snap. The doors crash inward, crushing a pair of town guards. Lightning flashes, revealing a sea of green skin, rusted blades, and wicked red eyes pouring into your town.\n\nThe invasion has begun. Hold the line."
      },
      {
        "type": "combat",
        "label": "Wave System",
        "text": "ROUND 1 — The Vanguard: Spawn 3 Goblins at the Breached Gate.\nROUND 2 — The Brutes: Spawn 2 Orcs.\nROUND 3 — The Swarm: Spawn 4 Goblins. Great moment for area spells / Adrenaline Surge.\nROUND 4 — The Siege Captain: Spawn Captain Gorak + 2 Skeletons.\n\nWIN: Kill Gorak — remaining monsters flee instantly.\nLOSE: Any monster reaches bottom board edge = 1 Hero Point penalty (civilians hurt).\n\nCAPTAIN GORAK: Move 6 - Atk 4 - Def 4 - Body 3\nSPECIAL — Commanding Roar: Once, instead of attacking, Gorak roars — all Goblins/Orcs on board move 3 squares free.\nLOOT: 100 Gold satchel + Iron Bounty Puck (King's seal — examine the inner ring closely later)."
      },
      {
        "type": "read",
        "label": "Victory — Gorak Falls",
        "voice": "Let the cheering land. Then slow down for the bounty puck.",
        "text": "As the massive Siege Captain collapses into the mud, the remaining goblins freeze. Seeing their brutal leader dead, panic sets in. They drop their rusted swords and scatter into the rainy night.\n\nYou hear the cheers of the surviving town guards behind you. The West Gate holds.\n\nSearching the Captain's body, you find a heavy pouch of gold... and a strange, iron puck bearing the King's royal seal. It is a bounty marker — the kind given to royal assassins. The Rogue didn't just sell the town to Zargon. He put a sanctioned hit out on you.\n\nLook more closely at the inner ring of the puck. Very small. Almost too small to read without a light. There are two names engraved in a cipher you almost recognise.\n\nOne of them is yours.\n\nThe other is the King's."
      }
    ]
  },
  {
    "id": "rest2",
    "num": "RS-2",
    "title": "Rest Scene — After the Siege",
    "sub": "The morning after the West Gate holds. Everything has changed.",
    "scenes": [
      {
        "type": "read",
        "label": "Dawn Over the Wreckage",
        "voice": "This is the big one. Read it like something has permanently shifted.",
        "text": "Dawn comes grey and wet over Millhaven. The West Gate is still standing — technically. One hinge has been replaced with a length of chain and what appears to be a barrel hoop, and the left door is being held at a meaningful angle by two guards and someone's cart. But it is standing.\n\nThe bodies of the fallen goblins are gone by first light. The town guard worked through the night. You did not see them do it, but when you step outside, the cobblestones have been swept and someone has placed a single torch in a bracket on the gate wall — not because it's needed in the morning, but because it seemed like the right thing to do.\n\nMillhaven looks the same as it did yesterday. It is not the same as it was yesterday. You can feel the difference in the way people look at you."
      },
      {
        "type": "dm",
        "label": "Village Lore — The Morning After",
        "text": "RIPPLES FROM THE SIEGE — run these across the rest scene as the heroes move through the village:\n\nTHE GUARD SERGEANT WHO NODDED: The sergeant with the split helmet is stationed at the repaired gate. He has not fixed the helmet. If a hero passes, he straightens, deliberately, and gives a single nod. This is, for someone like him, essentially a tearful embrace.\n\nTHE MARKET PRICES: The blacksmith has quietly reduced prices by 10% for the party. He will deny this if asked. 'Just clearing old stock,' he'll say, staring at the ceiling.\n\nTHE WALL OF NAMES: Someone has chalked names on the gate wall — the two guards who were crushed when the doors came in. Flowers are being left. The heroes walk past it. Nobody says anything. If they stop to look, they notice there's a small gap in the names list, a deliberate space, and someone has written in smaller chalk: 'and the strangers who stood here.' They haven't filled in your names yet because they don't know them.\n\nKING'S DEATH — THE TOWN REACTS:\n\nBy mid-morning, the news of the King's passing has filtered through. The reaction is complicated. There's grief, real grief — he was a known quantity, whatever his faults. But there's also a kind of political vertigo: no heir named, the Council convening, and a regent to be selected. The merchants are nervous. When power is unclear, debts are called in and contracts are disputed.\n\nA town councillor approaches the heroes at some point during the rest scene, formally, with two witnesses. She informs them that until the debt to the Crown is formally transferred to a new authority, it is technically in legal abeyance. 'I'm not saying it's forgiven,' she says carefully. 'I'm saying it's... pending.'\n\nELOWEN IN THE VILLAGE:\n\nIf Elowen is with the party, the village notices her. Not hostility — more a careful distance, the kind people give to someone they can't quite categorize. Children stare. An old woman at the market reaches out and very briefly touches Elowen's sleeve, then walks away. Elowen does not comment on this. Pip the fox gets significantly more attention than Elowen does and appears to enjoy it.\n\nWORLD SHADOW:\n\nA messenger bird arrives at the town's dovecote in the afternoon — wrong markings, wrong origin stamp, from a courier relay three towns east. The dovecote keeper, confused, mentions it loudly in the tavern. The message, he says, was in cipher. He gave it to the Advisor. The Advisor left the building immediately afterward and has not returned.\n\nSMALL HUMAN MOMENT:\n\nThe fifteen-year-old boy who bowed to you last night is sweeping the tavern steps when you return. He doesn't bow this time. He just looks up, meets your eyes, and then gets back to sweeping. He is sweeping very carefully. He is doing the best sweeping of his life."
      },
      {
        "type": "read",
        "label": "What Elowen Says Over Breakfast",
        "voice": "She says this like she has been thinking about it for a while.",
        "text": "Elowen is already at the table when you come down. She has been there for a while — the stew bowl in front of her is empty and Pip is asleep under the bench in the specific boneless way that suggests at least an hour of stillness.\n\nShe waits until everyone is seated.\n\n'The signal last night,' she says, without preamble. 'The pale light on the northern horizon, when Gorak fell. That was not coincidence. Someone is watching this town. Watching the gate specifically. They wanted to know whether the horde succeeded.' She pauses. 'Now they know it didn't.'\n\nShe picks up her cup.\n\n'That means we are on a timeline we did not set. I want to leave for the Sunken Crypts within the day.' She looks at each of you. 'Finish your breakfast.'"
      }
    ]
  },
  {
    "id": "act2b",
    "num": "II-B",
    "title": "The Rest Scene — The Quiet After the Storm",
    "sub": "Rest Scene following the Siege",
    "scenes": [
      {
        "type": "read",
        "label": "Into the Rusty Flagon",
        "voice": "Quiet. Let it breathe.",
        "text": "The last goblin vanishes into the rain-soaked dark, and the West Gate — battered, broken at its hinges, leaning against the stone archway like a drunk — holds. Barely.\n\nYou stand in the mud of the cobblestones, breathing hard, rain mixing with the blood on your hands. Around you, the surviving town guards let out a ragged, exhausted cheer. One of them claps you on the back so hard you nearly fall over.\n\nA young lad — can't be more than fifteen — runs up from a doorway, his lantern swinging wildly. He stares at the goblin bodies with wide, terrified eyes, and then at you, and something shifts in his face. He bows, deeply, and runs back inside without a word.\n\nA surviving guard sergeant approaches. His helmet is split down the middle. He nods slowly.\n\n'Rusty Flagon. All of you. Get out of the rain.'"
      },
      {
        "type": "dm",
        "label": "Rest Scene Mechanics",
        "text": "RUN THE FULL REST SCENE NOW:\n- Award 25 gold quest payment each + split the 100 gold Gorak satchel as the party decides.\n- All heroes heal to full Body Points.\n- Award one skill card each (suggested: Second Wind for Dwarf, Arcane Bolt for Wizard, Shadow Step for Elf).\n- Open the village — let them spend at the shops.\n- The Stranger arrives at the end of the rest scene. Do NOT skip this — see Act II-C."
      },
      {
        "type": "read",
        "label": "The Bounty Puck — Later That Evening",
        "voice": "Quieter now. Let the weight of it settle.",
        "text": "The tavern is dry, at least. Someone has left a pot of something dark and lukewarm over a small iron brazier. You eat it anyway. Nobody speaks much.\n\nCaptain Gorak's iron bounty puck sits on the table between you — the King's seal pressed into the metal. The kind of marker given to royal assassins.\n\nThe rogue scout didn't just sell the town to Zargon. He put a price on your heads.\n\nThe irony is not lost on anyone — you started the night in a cell, and now you are the only reason this town still has a gate.\n\nOutside, you can hear the guards beginning to drag the fallen goblins away.\n\nThen someone knocks on the door."
      }
    ]
  },
  {
    "id": "act2c",
    "num": "II-C",
    "title": "The Stranger — Elowen Ashgrove",
    "sub": "The Druid arrives — run at the end of the Rest Scene",
    "scenes": [
      {
        "type": "read",
        "label": "The Knock at the Door",
        "voice": "Three quiet, deliberate raps. Patient.",
        "text": "The knock at the door is not the sound of a guard's armoured fist. It is three quiet, deliberate raps — patient, like someone who has been standing there for a while and is not in any hurry.\n\nWhen you open it, the rain has stopped. Standing in the doorway, lit by the grey pre-dawn light, is a figure in a deep green travelling cloak, the hood still up. At their feet, sitting perfectly still with amber eyes, is a small brown fox.\n\nShe reaches up and pulls back her hood.\n\nShe is older than you might have expected — perhaps fifty, perhaps ageless. Her face is weathered and calm. Her eyes are the colour of deep forest. Around her neck, on a cord of braided bark, hangs a fragment of something — dark, crystalline, no larger than a thumbnail. It catches no light at all.\n\nShe looks at each of you in turn. When she speaks, her voice is low and unhurried."
      },
      {
        "type": "voice",
        "label": "Elowen — First Words",
        "voice": "Calm. Direct. No performance.",
        "text": "'My name is Elowen Ashgrove. I have been watching Drevak move the shards for three years. I know where two of them are, and I know what happens if all five are gathered in the same place at the same time.'\n\nShe glances down at the bounty puck on your table. Then back at you.\n\n'You held the gate last night. That matters. Most people don't, when it comes to it.'\n\nShe steps inside without being invited, sets a small leather satchel on the table, and sits.\n\n'I am not here to ask for your help. I am offering mine. You can say no — but without at least one person who understands what the crown shards actually do, the only thing your bravery at that gate will have bought this town is another few weeks.'\n\nThe fox pads in after her and curls up under the bench. Elowen pours herself a cup of the terrible stew without being asked.\n\n'So. Do you want to know what we are actually dealing with?'"
      },
      {
        "type": "dm",
        "label": "Elowen — Character Notes and Swap Mechanic",
        "text": "STATS: Move 2 - Atk 2 - Def 2 - Body 6 - Mind 5\nNature's Ward: Once per combat, grant one hero or herself +1 Defend Die for that round.\nThorn Snare: Once per quest, one enemy rolls 1 fewer Attack Die on their next turn.\nStarting gear: Ashwood Staff (2 Atk Dice), Potion of Healing, The Fragment.\nCompanion Pip the Fox: Once per quest, Pip scouts an adjacent unexplored room — DM reveals monster count before heroes enter.\n\nSWAP MECHANIC: Any player can take Elowen as their active hero at any rest scene for 50 gold. Gold and skills transfer. Previous hero's equipment stays at the tavern until reclaimed free of charge. The Barbarian works the same way.\n\nThe fragment around her neck: do NOT draw attention to it unless they ask. If they do: 'A reminder of what happens when good people are too late.' Then change the subject."
      }
    ]
  },
  {
    "id": "act2d",
    "num": "II-D",
    "title": "The Empty Throne",
    "sub": "The Throne Room — The Following Morning",
    "scenes": [
      {
        "type": "read",
        "label": "The Throne Room at Dawn",
        "voice": "The hall feels wrong. Smaller. More human.",
        "text": "The guard comes for you at dawn. Not the scarred one who let you out of your cells — this one is younger, and his face is ashen. He says quietly: 'The King requests your presence in the throne room. Immediately.'\n\nYou follow him through the waking streets. The throne room doors are already open when you arrive. The banners hang still. The royal table is overturned. Three of the King's personal guard stand along the far wall.\n\nAnd the throne is empty.\n\nA court advisor — a thin, birdlike woman in grey robes — approaches."
      },
      {
        "type": "voice",
        "label": "The Advisor",
        "voice": "Clipped. Controlled. Hiding grief underneath.",
        "text": "'His Majesty passed in the night. The royal physician believes it was his heart — the stress of the siege, the news of the traitor in his guard. He was found in his chambers at first light, seated at his writing desk. He had been composing a letter.'\n\nShe pauses. Collects herself.\n\n'The letter was addressed to you.'"
      },
      {
        "type": "read",
        "label": "The King's Letter",
        "voice": "Formal but tired. A man writing at the end of something.",
        "text": "'To the Heroes of the West Gate —\n\nI have not always been a just King, and I will not pretend otherwise. But I have tried, in my fashion, to keep this realm from the dark. I suspect I will not live to see whether I have succeeded.\n\nThe Rogue who betrayed us is called Drevak. He is not merely a traitor — he is a collector. For years, before I even knew the name Zargon, men like Drevak have been gathering the shards of the Archking Valduren's crown. Five shards. Each one a key. Together, they do not restore a dead king — they open a door that has been closed since the gods were young.\n\nYour debt to the Crown is forgiven. What I ask of you now, I ask freely.\n\nFind the shards. Find Drevak. Do not let that door open.\n\n— R.'"
      },
      {
        "type": "dm",
        "label": "DM SECRET — THE KING IS ALIVE",
        "text": "The King staged his death. The bounty puck has TWO names on its inner ring — the heroes', and the King's own name. He commissioned the hit on himself to fake the death convincingly and move freely.\n\nHe will reappear at the most dramatically inconvenient moment — ideally mid-Act IV when heroes think they understand the story. He is not a villain. He owes them an apology.\n\nSEED TO PLANT: As they leave, the Advisor says quietly: 'One more thing. When you arrived at the tavern last night, I am told there was already someone waiting. I did not send anyone. The guard did not send anyone. I suggest you ask your new companion exactly who did.'"
      }
    ]
  },
  {
    "id": "act3",
    "num": "III",
    "title": "The Sunken Crypts — Shard One",
    "sub": "Combat Quest 3 — Two days' ride from Millhaven",
    "scenes": [
      {
        "type": "read",
        "label": "The Road to the Cathedral",
        "voice": "Day two. Mist. Something old ahead.",
        "text": "The Cathedral of Aured appears on the second day, rising from the mist on a low hill like the ribcage of something enormous. Its spire is broken at the top. The doors are long gone — just a dark rectangle of shadow where they used to be.\n\nElowen stops her horse at the base of the hill and looks at it for a long moment."
      },
      {
        "type": "voice",
        "label": "Elowen — At the Cathedral Gates",
        "voice": "Quiet. Not quite to anyone.",
        "text": "'Saint Aured spent forty years sealing something beneath this cathedral. He succeeded. Then someone buried him next to it as a thank you. The Church never quite understood what he actually did.'\n\nShe clicks her horse forward.\n\n'The Crypt Lord down there has been the cathedral's guardian for eighty years. He thinks he is still doing his job. He is not wrong — the shard is what is keeping him animate. He is not evil. He is trapped.'\n\nShe glances back.\n\n'Try not to destroy him completely if you can avoid it. But if it comes to it, the shard matters more.'"
      },
      {
        "type": "dm",
        "label": "Map Setup — The Sunken Crypts",
        "text": "ROOM 1 — The Descent: Long staircase. Dry, cold, metallic air. Faint blue light. Slow footsteps echo ahead.\n\nROOM 2 — The Chapel of Bones: Walls of arranged skulls. 3 Skeleton Warriors patrol. Loot: Silver candlesticks (30 gold total).\n\nROOM 3 — The Flooded Antechamber: Knee-deep black water. Movement costs double. 2 Zombies hidden beneath the water surface — invisible until a hero enters.\n\nROOM 4 — The Reliquary Side Chamber (SIDE QUEST): Locked — requires search action. Saint Aured's remains + his handwritten account. Worth 50 gold to the town prior. Unlocks Ghost Cat pet.\n\nFINAL ROOM — The Crypt of Sir Aldric Vane."
      },
      {
        "type": "combat",
        "label": "Sir Aldric Vane — The Crypt Lord",
        "text": "STATS: Move 4 - Atk 3 - Def 2 - Body 5\n\nCrown-Animated: Sir Aldric CANNOT be killed while the shard is in its altar socket. If reduced to 0 Body Points, he rises at 1 BP next round. A hero must reach the altar and use their action to remove the shard first.\n\nROLEPLAY OPTION (Elowen translates his old dialect): If heroes communicate before fighting, Sir Aldric stops attacking. He believes the cathedral is still standing and eighty years have not passed. He will tell them where the shard is. When it is removed, he will quietly fall to pieces.\n\nRead when the shard is removed: 'The blue light fades. Sir Aldric looks at his own crumbling gauntleted hands and something crosses his face that is almost peace. It is done, he says quietly. He does not fall. He simply... stops. The dust settles. The crypts are silent.'\n\nLOOT: First Crown Shard + 25 gold quest payment each."
      },
      {
        "type": "read",
        "label": "Aftermath — The First Shard",
        "voice": "Let the silence hold.",
        "text": "The shard sits in your palm, dark and cold. It does not glow. It does not hum. It simply sits there, refusing to catch the light, as though it is drinking it in.\n\nElowen wraps it carefully in a fold of leather and tucks it away without a word. When she finally speaks, her voice is quieter than usual.\n\n'One. Four more to find. We have perhaps three weeks before Drevak moves on the second location. We should not waste them.'\n\nPip the fox noses gently at the place where Sir Aldric stood and then pads away up the stairs.\n\nBehind you, the crypts are very, very quiet. For the first time in eighty years."
      }
    ]
  },
  {
    "id": "rest3",
    "num": "RS-3",
    "title": "Rest Scene — After the Sunken Crypts",
    "sub": "The first shard is secured. The church is unsettled. The world shifts slightly.",
    "scenes": [
      {
        "type": "read",
        "label": "The Road Back",
        "voice": "Two days of travelling. The shard is in the satchel. Nobody talks about it much.",
        "text": "The road back from the Cathedral of Aured takes two days. The shard does not glow, does not hum, does not do anything dramatic. It sits wrapped in leather in Elowen's satchel and refuses to be interesting, which is somehow more unsettling than if it had been.\n\nThe weather is clear for once. Pip ranges ahead on the road and comes back periodically to report, in fox terms, that there is nothing worth worrying about. The second afternoon, crossing the low hill above Millhaven, you can see that the West Gate has been properly re-hung. Someone has done it quickly and well.\n\nYou can also see, from up here, that the town is smaller than it felt from inside. The roads out of it go three ways and all of them look long."
      },
      {
        "type": "dm",
        "label": "Village Lore — Returning Heroes",
        "text": "RIPPLES — THE CHURCH OF AURED:\n\nThe local church is the most immediately affected. The priest who was sweeping steps when you left is now running something between a vigil and a very anxious academic conference. He has, in your absence, sent letters to the diocesan authority, the regional keeper of sacred sites, and an elderly scholar in the capital who specialises in pre-Valduren ecclesiastical history.\n\nIf a hero visits the church during the rest scene, the priest sits them down and asks, with careful precision, exactly what they found in the reliquary and what condition it was in. He is visibly relieved to hear about the Reliquary of Saint Aured (if they retrieved it). He becomes visibly less relieved when they describe what the crypts looked like. He writes several things in a notebook. He does not share what he writes.\n\n'The Crypt Lord,' he says eventually, very carefully. 'He was... at peace? When it ended?' He needs this to be true. Let him have it.\n\nTHE RELIQUARY REWARD:\n\nIf the heroes deliver the Reliquary of Saint Aured, the priest gives them 50 gold with shaking hands and then immediately starts planning a proper reinterment ceremony. The church bells ring for the first time in three weeks. Several people in the market look up, confused and then, slowly, relieved — bells mean something normal is happening.\n\nSMALL HUMAN MOMENT:\n\nMarta the barkeep has learned your names. She uses them when she sets down your drinks. This is, from Marta, enormous.\n\nWORLD SHADOW:\n\nA travelling merchant passing through Millhaven from the north mentions, over his ale, that three villages on the eastern road to the Cragged Spire have gone very quiet. 'Travellers not coming through,' he says. 'Roads closed, they say, for works. Big works. Lots of stone being moved.' He doesn't know what kind of works. He went around. He's heard there are robed figures overseeing it. He says 'robed figures' the way people say it when they mean something much more specific but don't want to be the one to say it.\n\nELOWEN CONSEQUENCE:\n\nA woman waits outside the tavern for Elowen — middle-aged, farmer's hands, a sixteen-hour journey on foot from the look of her boots. She heard there was a druid in Millhaven. She has a sick animal — a dog, seventeen years old — and she has walked here asking nothing except whether anything can be done.\n\nElowen goes with her for an hour. She comes back alone. She doesn't explain what happened. She sits down, drinks her tea, and after a long pause says: 'Sometimes the kindest thing is the hard thing.' She does not elaborate and will not be asked to.\n\nKING'S DEATH — POLITICAL RIPPLE:\n\nThe Council has announced a Regent. It is Lord Areth, the King's third cousin, a man described by everyone in Millhaven who mentions him as 'competent.' Said with a specific neutrality that communicates, clearly, that he is not inspiring but will probably not set anything on fire. The heroes' debt status is now officially in review by the Regent's office. Nobody knows how long that takes."
      },
      {
        "type": "read",
        "label": "Elowen Adds Something to Her Maps",
        "voice": "She does this quietly, late. The heroes might not notice unless they're paying attention.",
        "text": "Late in the evening, after the tavern has mostly emptied, Elowen spreads her maps across the table and adds something in ink — precise, unhurried marks, the kind made by someone who has been waiting to record something until they were sure.\n\nIf anyone asks what she's adding, she says: 'The shard locations, updated for what we now know. And the Crypt's position relative to the ley markers.' She taps a point on the map. 'The Cathedral of Aured was built here deliberately. Not for its congregation. For what was below it. Someone, eight hundred years ago, knew exactly where these anchors were.'\n\nShe rolls the map up.\n\n'Whoever built the cathedral was trying to help. They just didn't leave instructions clear enough for the people who came after to understand what they were maintaining.' She pauses. 'That is a recurring problem with people who know things. They assume it will be obvious.'\n\nPip shifts under the bench. The fire burns low. Two shards still out there, and Drevak moving between them."
      }
    ]
  },
  {
    "id": "act4",
    "num": "IV",
    "title": "The Iron Fortress — Shard Two",
    "sub": "Combat Quest 4 — Warlord Grexx",
    "scenes": [
      {
        "type": "read",
        "label": "Approaching the Iron Fortress",
        "voice": "Cold. Exposed. The mountain wind has teeth.",
        "text": "The Iron Fortress squats at the mountain pass like a clenched fist — black stone, iron-reinforced gates, four watchtowers that never go dark. Warlord Grexx took it three years ago with forty fighters and hasn't left since.\n\nElowen studies it from the ridge.\n\n'Grexx doesn't know what he has. He found the shard in a collapsed tower room and hung it around his neck as a trophy. He thinks it's lucky. It isn't. It's slowly driving him mad — he just doesn't know what sane feels like anymore so he can't tell the difference.'\n\nShe pauses.\n\n'There is a captured scout inside. A young woman named Mira, taken three weeks ago. She is alive. Getting her out before dawn is the side quest. You'll need to decide whether that comes before the shard or after.'"
      },
      {
        "type": "dm",
        "label": "Map Setup — The Iron Fortress",
        "text": "ROOM 1 — The Gatehouse: 2 Iron Guards. One holds a horn — if he sounds it, Grexx gains +1 Attack for the rest of the quest (he's been waiting). Heroes must prevent the horn from sounding.\n\nROOM 2 — The Barracks: 3 Iron Guards off-duty. Roll 1 Combat Die after the fight. Skull = noise heard, 1 extra guard added to Grexx's room.\n\nROOM 3 — The Cells (SIDE QUEST): Mira is here, alive but at 1 Body Point. If rescued, she provides patrol schedules — monsters in Room 4 get -1 Defence Dice.\n\nROOM 4 — Grexx's Hall: Final confrontation.\n\nIRON GUARD STATS: Move 4 - Atk 2 - Def 3 - Body 4"
      },
      {
        "type": "combat",
        "label": "Warlord Grexx — The Shard-Maddened",
        "text": "STATS: Move 6 - Atk 4 - Def 2 - Body 6\n\nShard Fury: Each round Grexx is not wounded, he gains +1 Attack Die next round (max +2). Deal damage every round or he spirals out of control.\n\nMad Laugh: Once at 3 Body Points, Grexx laughs and heals 1 Body Point. He thinks this is funny.\n\nWhen Grexx falls: 'Grexx crashes to the floor, and the shard — the dark thing he's worn for three years believing it made him strong — rolls free. He stares at it. His face does something complicated. I thought... he starts. He doesn't finish. He's unconscious before the sentence ends.'\n\nNOTE: Grexx does not need to die. If spared, he wakes with no memory of the past six months. The shard is what matters.\n\nLOOT: Second Crown Shard + 40 gold each + access to Grexx's armoury."
      },
      {
        "type": "read",
        "label": "Aftermath — Two Shards. Mira's Warning.",
        "voice": "Elowen is less calm than usual.",
        "text": "Two shards wrapped in leather now sit in Elowen's satchel. You've watched her check the clasp three times since leaving the fortress.\n\nMira walks with you on the road back. As you crest the last hill and the town's lights appear below, she stops.\n\n'I heard things in that cell. Grexx received a messenger three days before you arrived. Hooded. Told Grexx the collection was nearly complete and that the final meeting would be below the old watchtower at the edge of the Plagued Marshes.'\n\nShe meets your eyes.\n\n'Drevak was there. I heard his voice. He sounded pleased.'"
      }
    ]
  },
  {
    "id": "rest4",
    "num": "RS-4",
    "title": "Rest Scene — After the Iron Fortress",
    "sub": "Two shards secured. Mira is home. Something is different in the world.",
    "scenes": [
      {
        "type": "read",
        "label": "The Return with Mira",
        "voice": "Mira is quiet on the road. The heroes might be too.",
        "text": "Mira doesn't say much on the road back. Not from trauma, exactly — she is steady, careful, clearly someone who was a good scout before Grexx's people took her — but from thought. She walks at a pace that suggests someone working through a problem.\n\nBy the time Millhaven's rooftops appear on the horizon, she has apparently reached a conclusion. She stops.\n\n'The messenger,' she says. 'The hooded one who visited Grexx. I described his boots earlier, the ones with the double buckle. I've been trying to remember where I saw that make before.' She looks at each of you. 'The royal courthouse. Three years ago. They're made by a cobbler who supplies the capital's administrative quarter. Scholars. Clerks. That kind of person.' She pauses. 'Whoever Drevak reports to is — or was — a very specific kind of official.'\n\nShe walks on.\n\nYou walk on.\n\nThe road goes down toward the gate."
      },
      {
        "type": "dm",
        "label": "Village Lore — Two Shards In",
        "text": "RIPPLES — MIRA COMES HOME:\n\nMira has family in a village a half-day east of Millhaven. Word travels. By the second morning of the rest scene, her mother has arrived at the Rusty Flagon — a small, fierce woman who shakes each hero's hand with both of hers, one after another, without saying anything. She then buys a round for the table, sits down, watches her daughter eat an enormous breakfast, and appears to consider her life complete.\n\nMira herself, once rested, goes to find the Advisor with the information about the boots. She comes back thoughtful. The Advisor recognised the description. She did not explain further. She gave Mira a piece of paper with a name on it, told her to burn it after reading, and said 'This is above all of us now.'\n\nMira does not tell the heroes what name was on the paper. She burns it as instructed. But she is watching Elowen with a very specific look now — the look of someone who has placed a piece of a puzzle and doesn't know whether it's good news or bad news yet.\n\nWORLD SHADOW — GREXX'S PEOPLE:\n\nGrexx's fortress is now leaderless. Forty fighters with no mission and a significant armoury. Within a day of the heroes' return, three separate messages arrive in Millhaven from villages on the mountain road — not reports of violence, but of confusion. Grexx's forces are, apparently, just... leaving. In small groups. Taking their gear and going. One group is heading west. One group's destination is unknown. And one group — twelve fighters, the best-equipped ones — has reportedly turned east, toward the Cragged Spire.\n\nToward the Citadel.\n\nELOWEN — THE VILLAGE STILL WATCHING:\n\nBy this rest scene, Elowen is a known quantity in Millhaven. Not entirely trusted, not feared, but... noticed. The herbalist at Ferb's has started leaving a small parcel of dried plants on the table each time Elowen visits — things that don't appear on the official stock list, niche things, things that a druid would know how to use. Ferb denies it every time. 'No idea what you're talking about,' he says, gesturing at a package that is clearly from him. 'Must be someone else.'\n\nSMALL HUMAN MOMENT:\n\nThe boy who was sweeping the steps — his name is Aldric, it turns out, same as the Crypt Lord, which Elowen notices and says nothing about — has started hanging around the training hall when the heroes are there. He is not asking to join anything. He is just. Present. Doing useful things nearby. He fixed a broken bench in the Training Hall without being asked. He knows where all the spare torches are kept. Nobody has officially acknowledged this arrangement yet, which means it can continue without anyone having to make a decision about it.\n\nKING'S DEATH — THE REGENT ACTS:\n\nLord Areth, Regent of the Crown, has formally acknowledged the heroes' service in defending the West Gate. Their debt to the Crown is reduced to 100 gold in recognition of the siege defence and the intelligence recovered from the Rogue Scout. The notice is delivered by a very junior official who is very clearly nervous to be anywhere near the Rusty Flagon and leaves as quickly as is professionally acceptable."
      },
      {
        "type": "read",
        "label": "What Changes Between the Second and Third Shard",
        "voice": "This is quieter. It is about the weight of accumulation.",
        "text": "There is a thing that happens when you have done enough difficult things in a place — the place starts to feel different. Not safer, necessarily. But known. The cobblestones have a particular sound at this hour. The market opens in a particular order. Marta has started leaving the good cups out when she hears you coming down the stairs.\n\nThe second shard is wrapped in leather in Elowen's satchel next to the first. They make no noise. They emit no light. But their presence is a weight that you are all aware of, the way you are aware of a word you've been trying to remember, sitting just at the edge of thought.\n\nElowen checks the satchel clasp when she thinks no one is watching. She checks it three times. She always checks it three times now.\n\nTwo down. Three to go. The road east still looks long.\n\nBut Millhaven's gate is properly re-hung, and the baker makes that thing with raisins on Thursdays, and young Aldric has apparently memorised where all the spare torches are.\n\nThis is not nothing."
      }
    ]
  },
  {
    "id": "act5",
    "num": "V",
    "title": "The Plagued Marshes — Shard Three",
    "sub": "Combat Quest 5 — Necromancer Vael",
    "scenes": [
      {
        "type": "read",
        "label": "Into the Marshes",
        "voice": "Slower. The air here is wrong.",
        "text": "The Plagued Marshes begin where the road ends. The ground tries to swallow your boots with every step. The trees are wrong — too pale, too still, branches reaching in directions that don't make sense. Every marsh creature you'd expect to hear is silent.\n\nElowen moves through the marsh without hesitation. Pip stays pressed against her ankle, ears flat.\n\n'Vael is different from the others,' Elowen says, not looking back. 'Grexx didn't know what the shard was. The Crypt Lord had no choice. Vael knows exactly what she has. She has been using it to power a ritual for two years. She wants to open one of the gates herself, before Drevak's employer can do it with all five. She wants to be first.'\n\n'She is not on your side. She is not on Drevak's side. Do not let her talk to you for long. She is very good at finding things you want and offering them.'"
      },
      {
        "type": "dm",
        "label": "Map Setup — The Plagued Marshes",
        "text": "ROOM 1 — The Sunken Path: 2 Plague Walkers rise from the mud. Heroes must stay on the solid path (marked with terrain). Step off = sink 1 square per turn, action to climb out.\n\nROOM 2 — The Corrupted Altar (SIDE QUEST): One of three altars that must be burned. Each unburned altar at quest's end gives Vael +1 Attack Die in the final fight. Place all three altars — one here, one in Room 3, one in Vael's chamber.\n\nROOM 3 — The Bone Bridge: 3 Plague Walkers + 1 Skeleton Warrior. Single-file movement only across the bridge.\n\nPLAGUE WALKER STATS: Move 3 - Atk 2 - Def 1 - Body 3\nSPECIAL: Any hero hit loses 1 extra Body Point at the start of their next turn (plague touch). A healing potion removes this effect."
      },
      {
        "type": "combat",
        "label": "Necromancer Vael — The Shard-Wielder",
        "text": "STATS: Move 2 - Atk 2 - Def 1 - Body 5\n\nShard Channel: At the start of each Zargon turn, Vael raises 1 Plague Walker anywhere on the board at 1 Body Point. This continues until the shard is taken (hero reaches her and uses an action — contested roll: 2 Atk vs 2 Def dice, skulls beat shields).\n\nThe Offer: Once, when a hero reaches her, Vael speaks to them personally before combat rolls. Use their motivation against them. Druid: 'I know where the wolf runs.' Wizard: 'I can show you what lies beyond the chains of the Conclave.' Barbarian: 'Your weapon is not lost. I know who took it.' If they listen for one full round, she raises 2 Plague Walkers.\n\nAltar Bonus: +1 Attack Die per unburned altar when the fight begins.\n\nLOOT: Third Crown Shard + 55 gold each."
      },
      {
        "type": "read",
        "label": "Aftermath — Three Shards. Something Changes.",
        "voice": "This one is different. Show it through Elowen.",
        "text": "When the third shard is taken from Vael's grip, something happens that has not happened before.\n\nAll three shards, wrapped in their leather pouches in Elowen's satchel, pulse once — a single, slow beat, like a heart that should not be beating.\n\nElowen goes very still.\n\n'That,' she says quietly, 'is new.'\n\nShe doesn't say anything else for a long time. Pip presses close to her leg and does not move.\n\nSomewhere to the north, well beyond where you can see, a light flares on the horizon — pale blue, momentary, gone. Like a signal.\n\nDrevak knows you have three."
      }
    ]
  },
  {
    "id": "rest5",
    "num": "RS-5",
    "title": "Rest Scene — After the Plagued Marshes",
    "sub": "Three shards. The world has noticed. Things are accelerating.",
    "scenes": [
      {
        "type": "read",
        "label": "The Journey Back from the Marshes",
        "voice": "Something has changed. The pulse of the shards was real. Play that.",
        "text": "The road back from the Plagued Marshes smells wrong for the first two miles — the particular wrongness of a place where the natural order has been asked to do something it wasn't designed for and is in the process of slowly recovering. Then it clears, and you are on a normal road in a normal landscape, and the marsh is behind you.\n\nElowen has not said much since the third shard pulsed.\n\nThe fragment around her neck — the gate piece she never explains — has been dark since it happened. Not just unlit: dark. The kind of dark that suggests something has changed in its relationship with the light.\n\nOn the second night of the journey, you make camp. Elowen sits watch. In the morning, she shows you the fragment. Overnight, something new has appeared on its surface — not carved, not scratched: grown, the way crystals grow. A pattern. None of you recognise it.\n\n'Neither do I,' Elowen says. 'Exactly.' And she puts it back under her collar."
      },
      {
        "type": "dm",
        "label": "Village Lore — Three Shards and the World Responds",
        "text": "WORLD SHADOW — THE BIG ONE:\n\nMillhaven is buzzing when the heroes return. Not with panic, but with the particular hum of a town that has received too much news at once and is processing it in public.\n\nFour things have happened while they were in the marshes:\n\n1. Two merchant convoys on the northern road have been turned back by 'official works' near the Cragged Spire. The official seal on the diversion notices is the Regent's, but three separate people who saw the notices say the ink looked wrong — the seal too perfect, too new.\n\n2. The church received a letter from the diocesan authority. The priest will not say what was in it, but he has boarded up the side window of the church that faces north.\n\n3. The cobbler in the market — who makes very ordinary shoes and has no opinions about anything — was visited by a hooded figure three days ago who commissioned a pair of boots in a specific style. Double buckle. The cobbler has been telling anyone who will listen. He seems excited rather than frightened, which suggests he doesn't quite understand what he is describing.\n\n4. Aldric — the boy who has been quietly making himself useful — came to find the Advisor two days ago with information he wouldn't share with anyone else. The Advisor left town that afternoon. She has not returned.\n\nELOWEN AND THE FRAGMENT — VILLAGE REACTION:\n\nWord has gotten around that the druid wears something strange around her neck. The herbalist at Ferb's has started being very careful around her. Not unkindly — he's simply moved breakable things off the lower shelves when she visits and started leaving extra space between them. 'Precaution,' he says cheerfully. 'Nothing personal.'\n\nThe priest from the church of Aured comes to find Elowen specifically. He has found a reference in a text he received from the capital scholar — a description of an artefact recovered from the original sealing ritual, 'a fragment of the threshold itself, lost when the first gate was closed.' He shows Elowen the description. He does not ask about her neck directly. He leaves the book on the table when he goes and makes very clear by his body language that he has left it there on purpose.\n\nSMALL HUMAN MOMENT — CONSEQUENCE:\n\nThe marsh plants that Vael had been cultivating — poisonous things, drawn toward the shard's energy — have begun dying now that the shard is gone. Villages on the marsh's edge have noticed their water running clearer. A delegation of three farmers arrives at the Rusty Flagon, slightly lost, asking if the heroes live here, because they've been told the heroes fixed the water. They have brought a wheel of cheese and two bottles of something strong and locally produced. They leave these on the table and do not know what else to offer, so they just nod a lot and go home.\n\nThe cheese is excellent.\n\nKING'S DEATH — REGENT INSTABILITY:\n\nLord Areth, Regent, has issued a public statement that the Crown is 'aware of disturbances in the eastern territories and is taking measured steps.' Nobody in Millhaven believes this. 'Measured steps' is the kind of language used by people who have no steps available. The market betting, if there were market betting, would be on the Regent being replaced within the month."
      },
      {
        "type": "read",
        "label": "The Unsigned Letter",
        "voice": "This is the hook into Act VI. Read it at the end of the rest scene.",
        "text": "The letter is on the table when you come down in the morning. No seal. No signature. The handwriting is neat, practised — the handwriting of someone who has spent a long time writing things down precisely.\n\n'The watchtower at the marsh's edge. Come alone. I know you won't, and I won't pretend that's unreasonable. But bring fewer than four. And come soon. I have something that belongs to you, and I am becoming — ' There is a pause in the ink here, a slight thickening where the pen hesitated. ' — less certain of my current arrangement than I was.'\n\nThat is all.\n\nElowen reads it twice. Pip the fox sits on the table, which she is not normally allowed to do, and stares at the letter with an expression that is either profound suspicion or profound hunger for the paper. With foxes it's sometimes hard to tell.\n\n'Drevak,' Elowen says. Not a question.\n\nShe picks up the letter and puts it in the satchel with the three shards.\n\n'Eat something first,' she says. 'It's going to be a long morning.'"
      }
    ]
  },
  {
    "id": "act6",
    "num": "VI",
    "title": "Drevak — Shard Four and the Reckoning",
    "sub": "Combat Quest 6 — The Hunt Ends",
    "scenes": [
      {
        "type": "dm",
        "label": "Setup — Finding Drevak",
        "text": "Drevak cannot be found by searching — he finds them. After the third shard is recovered and the heroes return to Millhaven for a rest scene, the Advisor is waiting at the Rusty Flagon with a sealed letter.\n\nThe letter is unsigned. It reads: 'The watchtower at the marsh's edge. Come alone. Someone who has been watching longer than you know.'\n\nIf the heroes go, it is Drevak. He wants to talk before they fight — he has been having second thoughts about his employer. He has the fourth shard and may give it up without a fight.\n\nIf the heroes refuse, Drevak comes to them — ambush at the Millhaven gate, at night."
      },
      {
        "type": "read",
        "label": "Meeting Drevak",
        "voice": "He sounds tired. That wicked grin is gone.",
        "text": "The watchtower is a ruin — half the upper floor collapsed inward. But there is a small fire going inside.\n\nDrevak is sitting beside it. He still wears the King's scouting cloak, now worn and frayed. He looks up when you enter without reaching for a weapon.\n\n'Good. You came.' He pauses. 'You've collected three shards. I know because every time you take one, Cassel knows. He has a way of knowing things.'\n\nHe holds up the fourth shard — small, dark, still. Like looking at a piece of the night that forgot to leave.\n\n'I've been working for Cassel for four years. He told me it was about restoring order. Balance. He told me a lot of things that turned out to be wrong.'"
      },
      {
        "type": "voice",
        "label": "Drevak — The Choice",
        "voice": "Not begging. Calculating. But something real underneath.",
        "text": "'I can give you this shard. You'll have four. One more and it's done — Cassel loses his keys. The gates stay sealed.\n\nIn return, I want to walk away from this. No cell. No trial. Just gone. I'll tell you everything I know about the fifth shard and the Citadel. I'll tell you who Cassel is and what he actually believes. And then I disappear, and you never hear from me again.'\n\nHe waits.\n\n'Or we can do this the hard way. I've had four years to prepare for the hard way. But I'd rather not.'"
      },
      {
        "type": "combat",
        "label": "If They Fight — Drevak's Stats",
        "text": "STATS: Move 8 - Atk 3 - Def 3 - Body 4\n\nSmoke and Mirrors: Once per combat, Drevak vanishes and reappears adjacent to the most isolated hero on Zargon's next turn.\n\nShard-Touched: Because he's carried Shard Four for years, his first time reaching 0 Body Points he's not dead — he uses Smoke and Mirrors and offers the deal again. Heroes can accept or press the attack.\n\nDREVAK'S BRIEFING (if they deal):\n- Cassel is the Archivist — real name Cassel Mourne, former royal scholar.\n- The Citadel is built directly over the fifth gate.\n- The fifth shard is set into the floor of the observatory's central chamber. It cannot be moved without a key — which Cassel wears around his neck.\n- Cassel does not think he is the villain. He will try to convince the heroes of this. He is not entirely wrong about everything — which is what makes him dangerous."
      }
    ]
  },
  {
    "id": "rest6",
    "num": "RS-6",
    "title": "Rest Scene — After Drevak",
    "sub": "Four shards. One conversation that changed the shape of everything.",
    "scenes": [
      {
        "type": "read",
        "label": "What Drevak Leaves Behind",
        "voice": "Quiet. The confrontation is over. Now comes the thinking.",
        "text": "Drevak is gone. Whether he walked away from a deal or walked away from a defeat, he walked away — and the fourth shard is in Elowen's satchel, sitting next to the other three, and the whole collection pulsed once, warmly, the moment the fourth joined them. Not cold this time. Warm.\n\nElowen stared at the satchel for a long time after that.\n\nThe road back to Millhaven feels shorter than it should. It is exactly as long as it has always been. Everything is just moving faster now, and you are aware of it the way you are aware of a current when you are already in the river.\n\nFour shards. One to go.\n\nThe Citadel is north. The Cragged Spire has been visible on clear days from the top of Millhaven's market hill since the beginning, a dark tooth on the horizon, and none of you mentioned it to each other at the start because it was very far away.\n\nIt is not very far away anymore."
      },
      {
        "type": "dm",
        "label": "Village Lore — The Last Rest Before the Finale",
        "text": "This is the final rest scene before the Citadel. Make it count. Run as many of these as feel right for the session — not all of them need to happen.\n\nALDRIC SAYS SOMETHING:\n\nThe boy who has been quietly useful since the beginning of the campaign is waiting when the heroes return. He has clearly been waiting for a while. He stands up when they come through the gate and says, with the specific dignity of someone who has rehearsed this: 'I want to come with you. To the end of it. I know I can't fight. But I know where all your things are, and I can carry things, and I learn fast.'\n\nHe waits.\n\nThis is the DM's call entirely. But he means it. And he has been more useful than most people twice his age.\n\nMARTA UNLOCKS THE GOOD SHELF:\n\nMarta the barkeep — who has so far expressed approval entirely through eyebrows and the quality of cups used — has unlocked the case behind the bar that nobody has ever seen open. She sets one bottle on the table. 'For when you get back,' she says. 'Not before.' She locks the case again. She does not explain how she knows.\n\nSMALL HUMAN MOMENT — FOUR OF THEM:\n\nFour things are waiting at the tavern when the heroes arrive. Mira's mother has left a parcel of travel food, wrapped in oilcloth, tied with red cord. The priest of Aured has left a copy of Saint Aured's handwritten account — the full version, translated, with annotations — 'in case it is useful at the end.' The farmer delegation from the marsh has sent another wheel of cheese, with a note that just says 'good luck' in careful letters. And on the top step, weighted down by a small stone, is a bunch of wildflowers from the ditch outside the west road.\n\nNo note. The girl doesn't need to sign her name.\n\nWORLD SHADOW — THE CITADEL MAKES ITSELF KNOWN:\n\nThe northern road has been reopened. Not because the 'official works' are finished — because whoever was managing them has stopped caring about concealment. Travellers coming south report that the Cragged Spire is lit, blue-white light from the upper observatory, visible at night from twenty miles out. Constant. Steady. Not a signal. A working light. Something is being done up there that requires illumination through the night.\n\nCassel is not waiting anymore.\n\nELOWEN — FINAL HONESTY:\n\nOn the last night before departure, if any hero sits with Elowen alone, she will say something she has not said before: 'I knew, when I came to you at the gate, that the fragment around my neck was guiding me. I told myself it was my own instinct. That distinction matters to me more than it probably should.'\n\nShe pauses.\n\n'Whatever happens in the Citadel — whatever Cassel says, and he will say things worth hearing, that is the worst part about him — remember that the shards need to be sealed. Not reforged. Not opened. Sealed. That is the one thing I am certain of.'\n\nShe looks at the satchel.\n\n'The fragment will do what it was always going to do. I have made my peace with that.'\n\nShe goes to bed.\n\nPip sleeps across the door."
      },
      {
        "type": "read",
        "label": "The Morning of the Last Quest",
        "voice": "Read this at the table before they set out for the Citadel. Let it land.",
        "text": "The morning is clear. Millhaven's west-road ditch has a new patch of wildflowers in it that wasn't there a week ago. The gate's replaced hinge catches the early light and throws a small bright rectangle on the cobblestones.\n\nMarta is awake when you come down. She has made something warm that is not stew. Nobody remarks on this because it would embarrass her.\n\nYoung Aldric is at the door. Whatever your decision about him, he is there. He has packed a bag. He is trying very hard not to look like someone who has packed a bag.\n\nThe north road stretches out between the morning fields toward where the sky is still a little darker than it should be.\n\nFour shards in a leather satchel. One to find. One to seal.\n\nYou have been in this town long enough to know which floorboard creaks on the second step. Long enough for Marta to use your names. Long enough for a girl in the ditch-road to pick flowers on a Tuesday morning for people she barely knows but has decided to believe in.\n\nThat is, it turns out, long enough.\n\nGo finish it."
      }
    ]
  },
  {
    "id": "act7",
    "num": "VII",
    "title": "The Citadel of Cassel Mourne — The Finale",
    "sub": "Combat Quest 7 — The End of The Shattered Crown",
    "scenes": [
      {
        "type": "read",
        "label": "Approaching the Citadel",
        "voice": "The endgame. Make it feel earned.",
        "text": "The Citadel of Cassel Mourne crowns the Cragged Spire like a crown of black iron — which, given everything, is either ironic or inevitable.\n\nYou have four shards. The fifth is inside. Elowen has barely spoken for two days. The fragment around her neck has started to glow, faintly, with a cold blue light that mirrors the shards in her satchel.\n\nAt the base of the Spire, she finally stops.\n\n'There is something I should have told you earlier. The fragment I wear — it is not decoration. It is a piece of one of the gates. It broke free during Valduren's original sealing ritual seventy years ago and has been influencing me ever since. It is how I found you. How I always knew where the shards were moving. It has been guiding this from the beginning.'\n\nShe looks at each of you.\n\n'I do not know if I am the hero of this story or part of the problem. I thought you should know that before we go in.'"
      },
      {
        "type": "dm",
        "label": "Map Setup — The Citadel",
        "text": "ROOM 1 — The Entry Hall: 2 Shadow Knights (former scholars who chose to follow Cassel). If a hero speaks to them (uses an action), they hesitate — each hesitating Shadow Knight rolls 1 fewer Attack Die that round.\n\nROOM 2 — The Archive: 2 Shadow Knights + High Priest Vorn. Vorn burns papers as heroes enter.\nVORN STATS: Move 4 - Atk 2 - Def 2 - Body 4\nProtective Seal: Once per combat, Vorn negates one attack against himself.\n\nROOM 3 — The Observatory Approach: No monsters. Each hero chooses: Stairs (safe, costs 2 turns) or Scholar's Bridge (fast, single file — if attacked while crossing, roll 1 Defend Die or fall back to start of bridge)."
      },
      {
        "type": "voice",
        "label": "Cassel's Speech — Read Before the Fight",
        "voice": "Calm. Certain. He genuinely believes this. That is what makes it frightening.",
        "text": "'I have read every account that survives of the world before Valduren sealed the gates. Do you know what those accounts describe? Not paradise lost. A world of consequence. Of truth. Valduren did not seal the gates to protect anyone — he sealed them to protect his power.\n\nI am not opening a door to something terrible. I am correcting an erasure. The people who were lost when Valduren sealed the gates — they are not dead. They are waiting. And you are standing between them and the door home.'\n\nHe looks at the shard in the floor.\n\n'I am asking you to understand before you choose. I will not stop you if you still choose to seal them. But I want you to know what you are choosing to keep locked away. Is that so wrong?'"
      },
      {
        "type": "combat",
        "label": "Cassel Mourne — The Archivist",
        "text": "STATS: Move 4 - Atk 4 - Def 3 - Body 8\n\nThe Argument: If any hero engages Cassel seriously in dialogue (DM's discretion), he is distracted — he takes -1 Defend Die for the first two rounds.\n\nGate Fragment: At 4 Body Points, the fifth shard in the floor activates. Cassel regains 2 Body Points and all Shadow Knights on the board are restored to 1 Body Point.\n\nThe Key: The key around Cassel's neck must be taken before the shard can be destroyed. Requires a hero to reach him and spend an action. Until the key is taken, the fifth shard cannot be removed from the floor.\n\nWINNING: Take the key, remove the fifth shard, place all five on the observatory floor. Elowen uses the gate fragment around her neck to seal them permanently. The fragment is destroyed in the process. So, possibly, is Elowen. DM's choice — this is the campaign's emotional finale."
      },
      {
        "type": "read",
        "label": "The Ending — All Five Shards",
        "voice": "Slow. Let it be big.",
        "text": "The five shards, placed together on the observatory floor, do not explode or scream or open anything.\n\nThey simply resonate. A low, felt-not-heard hum that moves through the stone beneath your feet and into somewhere you don't have a name for.\n\nElowen kneels beside them. She takes the fragment from around her neck — the one she has worn for decades, the one that has been guiding her like a compass toward a destination she never quite wanted to reach.\n\nShe places it in the centre of the five.\n\nThe blue light blazes once, brilliant and complete.\n\nAnd then it is gone.\n\nThe hum stops. The shards are dark. Dead. Five pieces of metal that were once a crown, now just five pieces of metal on a stone floor.\n\nElowen is still kneeling.\n\nShe is still there.\n\nShe looks up at you, and something in her face is different — lighter, as though she's put down something very heavy.\n\n'It's done,' she says.\n\nPip the fox trots in from somewhere and sits beside her, tail curled neatly.\n\nOutside, dawn is beginning."
      }
    ]
  }
];


function showCampaignPrompt(){
  // Delegates to openCampaignModal in state.js
  if(typeof openCampaignModal==='function') openCampaignModal();
}

function init(){
  if(!S.sqStatus) S.sqStatus={};
  initMercEnemyData();
  initShopData();
  initItemData();
  renderAll();
}

function renderAll(){
  renderGoldPot();
  initTurns();
  renderHome();
  renderMap();
  renderHeroes();
  renderTurns();
  renderOutposts('outpostMain');
  renderChecklist();
}


// ═══════════════════════════════════════════════════
// WORLD ITEMS — quest rewards, named items, loot
// ═══════════════════════════════════════════════════
