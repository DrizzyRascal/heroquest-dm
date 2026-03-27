
var WORLD_ITEMS = [
  {id:'ashenwarden-cloak', name:'Ashenwarden Cloak',  category:'Side Quest', hero:'Elf',
   icon:'🪄', description:'The cloak Lysara sought. Ancient elven magic — grants stealth and speed.',
   stats:{atk:0,def:1,bodyMax:0,mind:0,move:1,special:'Shadowstep: once per quest become untargetable for 1 full round'}},
  {id:'hearthcleaver',     name:'Hearthcleaver',       category:'Side Quest', hero:'Barbarian',
   icon:'🪓', description:"Ragnar's axe, returned. The grip worn to the exact shape of his palm.",
   stats:{atk:2,def:0,bodyMax:0,mind:0,move:0,special:"Deathblow: once per quest, killing an enemy lets Ragnar immediately attack an adjacent enemy"}},
  {id:'ironclad-codex',    name:'Ironclad Codex',      category:'Side Quest', hero:'Dwarf',
   icon:'📖', description:'Lost Dwarven engineering manual. Unlocks the Olden Pistol.',
   stats:{atk:0,def:0,bodyMax:0,mind:0,move:0,special:'Unlocks Olden Pistol; auto-detect and disarm mechanical traps'}},
  {id:'iron-wolf',         name:'Iron the Wolf',       category:'Side Quest', hero:'Druid',
   icon:'🐺', description:"Elowen's lifelong companion, found in the Ashwood.",
   stats:{atk:0,def:0,bodyMax:0,mind:0,move:0,special:'Once per combat: Iron attacks nearest enemy — roll 1 Combat Die, skull = 1 Body Point. Iron recovers at rest scenes'}},
  {id:'genie-cascade',     name:'Genie Cascade',       category:'Side Quest', hero:'Wizard',
   icon:'🧙', description:"The Conclave binding removed. Seraphel's true power restored.",
   stats:{atk:0,def:0,bodyMax:0,mind:1,move:0,special:'Cast Genie spell twice per quest instead of once'}},
  {id:'fortunesword',      name:'Fortunesword',        category:'Loot', hero:'Any',
   icon:'⚔', description:'A blade that turns at the last moment to find weak points.',
   stats:{atk:2,def:0,bodyMax:0,mind:0,move:0,special:'Once per combat: reroll one failed attack die'}},
  {id:'sprit-blade',       name:'Sprit Blade',         category:'Loot', hero:'Any',
   icon:'🗡', description:'A spirit-touched blade that hums faintly in the dark.',
   stats:{atk:1,def:0,bodyMax:0,mind:0,move:0,special:'Deals 1 bonus damage to undead enemies'}},
  {id:'olden-pistol',      name:'Olden Pistol',        category:'Loot', hero:'Dwarf',
   icon:'🔫', description:'Ancient Dwarven firearm. Requires the Ironclad Codex.',
   stats:{atk:0,def:0,bodyMax:0,mind:0,move:0,special:'Dwarf only (needs Codex): 2 red dice ranged, unlimited range, 1 shot per quest'}},
  {id:'boring-armour',     name:'Boring Armour',       category:'Loot', hero:'Any',
   icon:'🛡', description:"Not glamorous. Works.",
   stats:{atk:0,def:2,bodyMax:0,mind:0,move:0,special:''}},
  {id:'cloak',             name:'Cloak',               category:'Loot', hero:'Any',
   icon:'🧥', description:'A travelling cloak providing modest protection.',
   stats:{atk:0,def:1,bodyMax:0,mind:0,move:0,special:''}},
];

function initItemData(){
  if(!S.itemData) S.itemData={};
  WORLD_ITEMS.forEach(function(item){
    if(!S.itemData[item.id]) S.itemData[item.id]={obtained:false,ownedBy:null};
  });
}

function getItemStats(itemId){
  for(var si=0;si<SHOPS.length;si++){
    var shop=SHOPS[si];
    for(var ii=0;ii<shop.items.length;ii++){
      if(shop.items[ii].id===itemId){
        var base=shop.items[ii].stats||{atk:0,def:0,bodyMax:0,mind:0,move:0,special:''};
        var over=S.shopData[shop.id]&&S.shopData[shop.id][itemId]&&S.shopData[shop.id][itemId].statsOverride;
        return over||base;
      }
    }
  }
  for(var wi=0;wi<WORLD_ITEMS.length;wi++){
    if(WORLD_ITEMS[wi].id===itemId) return WORLD_ITEMS[wi].stats||{atk:0,def:0,bodyMax:0,mind:0,move:0,special:''};
  }
  return null;
}

function findItemByName(name){
  var low=name.toLowerCase().replace(/[^a-z0-9]/g,'');
  for(var i=0;i<WORLD_ITEMS.length;i++){
    var wi=WORLD_ITEMS[i];
    if(wi.name.toLowerCase().replace(/[^a-z0-9]/g,'')==low) return wi;
  }
  for(var si=0;si<SHOPS.length;si++){
    for(var ii=0;ii<SHOPS[si].items.length;ii++){
      var it=SHOPS[si].items[ii];
      if(it.name.toLowerCase().replace(/[^a-z0-9]/g,'')==low) return it;
    }
  }
  return null;
}

function applyItemToHero(heroId,itemName,reverse){
  var h=S.heroes.find(function(x){return x.id===heroId;});
  if(!h) return;
  var item=findItemByName(itemName);
  if(!item||!item.stats) return;
  var m=reverse?-1:1;
  h.atk=Math.max(0,(h.atk)+(m*(item.stats.atk||0)));
  h.def=Math.max(0,(h.def)+(m*(item.stats.def||0)));
  var bd=m*(item.stats.bodyMax||0);
  h.bodyMax=Math.max(1,h.bodyMax+bd);
  if(bd>0) h.body=Math.min(h.body+bd,h.bodyMax);
  if(bd<0) h.body=Math.min(h.body,h.bodyMax);
  h.mindMax=Math.max(0,(h.mindMax)+(m*(item.stats.mind||0)));
}

function buildEquipBonuses(h){
  if(!h.equipment||!h.equipment.length) return '';
  var bonuses=[];var specials=[];
  h.equipment.forEach(function(nm){
    var it=findItemByName(nm);
    if(!it||!it.stats) return;
    var s=it.stats;
    if(s.atk)     bonuses.push({lbl:(s.atk>0?'+':'')+s.atk+' Atk',pos:s.atk>0});
    if(s.def)     bonuses.push({lbl:(s.def>0?'+':'')+s.def+' Def',pos:s.def>0});
    if(s.bodyMax) bonuses.push({lbl:(s.bodyMax>0?'+':'')+s.bodyMax+' Body',pos:s.bodyMax>0});
    if(s.mind)    bonuses.push({lbl:(s.mind>0?'+':'')+s.mind+' Mind',pos:s.mind>0});
    if(s.move)    bonuses.push({lbl:(s.move>0?'+':'')+s.move+' Move',pos:s.move>0});
    if(s.special) specials.push(s.special);
  });
  if(!bonuses.length&&!specials.length) return '';
  var out='<div style="margin-bottom:.45rem">';
  if(bonuses.length){
    out+='<div style="display:flex;flex-wrap:wrap;gap:.22rem;margin-bottom:.28rem">';
    bonuses.forEach(function(b){
      out+='<span style="font-family:Cinzel,serif;font-size:.5rem;padding:.1rem .35rem;border-radius:2px;'+
        'background:'+(b.pos?'rgba(42,90,32,.22)':'rgba(122,16,16,.22)')+';'+
        'border:1px solid '+(b.pos?'var(--green)':'var(--blood)')+';'+
        'color:'+(b.pos?'var(--green-hi)':'var(--blood-hi)')+'">'+b.lbl+'</span>';
    });
    out+='</div>';
  }
  specials.forEach(function(sp){
    out+='<div style="font-size:.65rem;font-style:italic;color:var(--teal-hi);line-height:1.4;margin-bottom:.2rem">&#9670; '+sp+'</div>';
  });
  out+='</div>';
  return out;
}

function renderWorldItems(){
  initItemData();
  var c=document.getElementById('worldItemsContent');
  if(!c) return;
  c.innerHTML='';
  var cats={};
  WORLD_ITEMS.forEach(function(item){if(!cats[item.category])cats[item.category]=[];cats[item.category].push(item);});
  Object.keys(cats).forEach(function(cat){
    var sec=document.createElement('div');sec.style.marginBottom='1.2rem';
    var lbl=document.createElement('div');lbl.className='ptitle';
    lbl.innerHTML=(cat==='Side Quest'?'🗺':'⚔')+' '+cat+' Items';
    sec.appendChild(lbl);
    var grid=document.createElement('div');grid.className='g3';
    cats[cat].forEach(function(item){grid.appendChild(buildWorldItemCard(item));});
    sec.appendChild(grid);c.appendChild(sec);
  });
}

function buildWorldItemCard(item){
  var d=S.itemData&&S.itemData[item.id]?S.itemData[item.id]:{obtained:false,ownedBy:null};
  var obtained=d.obtained;
  var owner=d.ownedBy?S.heroes.find(function(h){return h.id===d.ownedBy;}):null;
  var s=item.stats||{};
  var bonuses=[];
  if(s.atk)     bonuses.push({lbl:(s.atk>0?'+':'')+s.atk+' Atk',pos:s.atk>0});
  if(s.def)     bonuses.push({lbl:(s.def>0?'+':'')+s.def+' Def',pos:s.def>0});
  if(s.bodyMax) bonuses.push({lbl:(s.bodyMax>0?'+':'')+s.bodyMax+' Body',pos:s.bodyMax>0});
  if(s.mind)    bonuses.push({lbl:(s.mind>0?'+':'')+s.mind+' Mind',pos:s.mind>0});
  if(s.move)    bonuses.push({lbl:(s.move>0?'+':'')+s.move+' Move',pos:s.move>0});

  var card=document.createElement('div');
  card.style.cssText='background:linear-gradient(160deg,var(--dark),var(--bg));border:1px solid '+(obtained?'var(--gold)':'var(--border)')+';border-radius:2px;padding:1rem;transition:border-color .2s;';
  var bonusHtml='';
  if(bonuses.length){
    bonusHtml='<div style="display:flex;flex-wrap:wrap;gap:.22rem;margin-bottom:.45rem">';
    bonuses.forEach(function(b){bonusHtml+='<span style="font-family:Cinzel,serif;font-size:.55rem;padding:.12rem .4rem;border-radius:2px;background:'+(b.pos?'rgba(42,90,32,.2)':'rgba(122,16,16,.2)')+';border:1px solid '+(b.pos?'var(--green)':'var(--blood)')+';color:'+(b.pos?'var(--green-hi)':'var(--blood-hi)')+'">'+b.lbl+'</span>';});
    bonusHtml+='</div>';
  }
  var heroRow='';
  if(!obtained){
    heroRow='<div><div style="font-family:Cinzel,serif;font-size:.55rem;letter-spacing:.12em;color:var(--text-dim);margin-bottom:.35rem">AWARD TO</div>'+
      '<div style="display:flex;gap:.3rem;flex-wrap:wrap" id="wi-heroes-'+item.id+'">'+
      S.heroes.filter(function(h){return h.active;}).map(function(h){
        return '<button class="btn btn-gold btn-sm" id="wi-give-'+item.id+'-'+h.id+'">'+h.portrait+' '+h.name+'</button>';
      }).join('')+'</div></div>';
  } else {
    heroRow='<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.3rem">'+
      '<span style="font-family:Cinzel,serif;font-size:.6rem;letter-spacing:.1em;color:var(--green-hi)">&#10003; '+(owner?owner.name:'Obtained')+'</span>'+
      '<button class="btn btn-blood btn-sm" id="wi-revoke-'+item.id+'">Remove</button></div>';
  }
  card.innerHTML=
    '<div style="font-size:1.8rem;text-align:center;margin-bottom:.3rem">'+item.icon+'</div>'+
    '<div style="font-family:Cinzel,serif;font-size:.82rem;color:'+(obtained?'var(--gold-hi)':'var(--parch)')+';text-align:center;margin-bottom:.12rem">'+item.name+'</div>'+
    '<div style="font-family:Cinzel,serif;font-size:.52rem;letter-spacing:.15em;color:var(--teal-hi);text-align:center;margin-bottom:.45rem">'+item.hero.toUpperCase()+'</div>'+
    '<div style="font-style:italic;font-size:.78rem;color:var(--parch-dim);margin-bottom:.55rem;line-height:1.55">'+item.description+'</div>'+
    bonusHtml+
    (s.special?'<div style="font-size:.72rem;font-style:italic;color:var(--teal-hi);border-top:1px solid var(--border);padding-top:.4rem;margin-bottom:.5rem;line-height:1.5">&#9670; '+s.special+'</div>':'')+
    heroRow;

  (function(wi,el){
    var revoke=el.querySelector('#wi-revoke-'+wi.id);
    if(revoke) revoke.onclick=function(){
      var prev=S.itemData&&S.itemData[wi.id]?S.itemData[wi.id].ownedBy:null;
      if(prev){
        applyItemToHero(prev,wi.name,true);
        var ph=S.heroes.find(function(x){return x.id===prev;});
        if(ph) ph.equipment=ph.equipment.filter(function(e){return e.toLowerCase().replace(/[^a-z0-9]/g,'')!==wi.name.toLowerCase().replace(/[^a-z0-9]/g,'');});
      }
      if(!S.itemData) S.itemData={};
      S.itemData[wi.id]={obtained:false,ownedBy:null};
      saveLocal();renderWorldItems();renderHeroes();
      notify(wi.name+' removed');
    };
    S.heroes.filter(function(h){return h.active;}).forEach(function(h){
      var btn=el.querySelector('#wi-give-'+wi.id+'-'+h.id);
      if(btn) btn.onclick=function(){
        if(!S.itemData) S.itemData={};
        S.itemData[wi.id]={obtained:true,ownedBy:h.id};
        h.equipment.push(wi.name);
        applyItemToHero(h.id,wi.name,false);
        saveLocal();renderWorldItems();renderHeroes();
        notify(wi.name+' awarded to '+h.name);
      };
    });
  })(item,card);
  return card;
}

function openShopItemStatsEditor(shopId,itemId,itemName){
  var shop=SHOPS.find(function(s){return s.id===shopId;});
  var item=shop?shop.items.find(function(i){return i.id===itemId;}):null;
  if(!item) return;
  var base=item.stats||{atk:0,def:0,bodyMax:0,mind:0,move:0,special:''};
  var over=S.shopData[shopId]&&S.shopData[shopId][itemId]&&S.shopData[shopId][itemId].statsOverride;
  var cur=over||base;
  openModal('Stats: '+itemName,
    '<p class="dim" style="margin-bottom:.65rem">Bonuses apply when this item is equipped. Tweak defaults here.</p>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.4rem;margin-bottom:.6rem">'+
    sMini('Atk','se-atk',cur.atk)+sMini('Def','se-def',cur.def)+sMini('Body','se-bodyMax',cur.bodyMax)+
    sMini('Mind','se-mind',cur.mind)+sMini('Move','se-move',cur.move)+
    '</div>'+
    '<div style="margin-bottom:.65rem"><div style="font-family:Cinzel,serif;font-size:.55rem;letter-spacing:.12em;color:var(--text-dim);margin-bottom:.3rem">SPECIAL ABILITY</div>'+
    '<input class="inp" id="se-special" style="width:100%;font-size:.85rem" value="'+escHtml(cur.special||'')+'" placeholder="e.g. Once per quest, reroll 1 die"></div>'+
    '<div class="brow"><button class="btn btn-gold" id="se-save">Save</button>'+
    '<button class="btn btn-grey btn-sm" id="se-reset">Reset Default</button>'+
    '<button class="btn btn-grey btn-sm" onclick="closeModal()">Cancel</button></div>'
  );
  setTimeout(function(){
    var sv=document.getElementById('se-save');
    if(sv)(function(sid,iid){sv.onclick=function(){
      if(!S.shopData[sid]) S.shopData[sid]={};
      if(!S.shopData[sid][iid]) S.shopData[sid][iid]={};
      S.shopData[sid][iid].statsOverride={
        atk:parseInt(document.getElementById('se-atk').value)||0,
        def:parseInt(document.getElementById('se-def').value)||0,
        bodyMax:parseInt(document.getElementById('se-bodyMax').value)||0,
        mind:parseInt(document.getElementById('se-mind').value)||0,
        move:parseInt(document.getElementById('se-move').value)||0,
        special:document.getElementById('se-special').value.trim()
      };
      closeModal();saveLocal();renderShops();notify('Stats saved: '+itemName);
    };})(shopId,itemId);
    var rs=document.getElementById('se-reset');
    if(rs)(function(sid,iid){rs.onclick=function(){
      if(S.shopData[sid]&&S.shopData[sid][iid]) S.shopData[sid][iid].statsOverride=null;
      closeModal();saveLocal();renderShops();notify('Reset to default: '+itemName);
    };})(shopId,itemId);
  },50);
}

function sMini(lbl,id,val){
  return '<div style="background:rgba(0,0,0,.3);border:1px solid var(--border-hi);border-radius:2px;padding:.4rem;text-align:center">'+
    '<div style="font-family:Cinzel,serif;font-size:.48rem;letter-spacing:.1em;text-transform:uppercase;color:var(--text-dim);margin-bottom:.22rem">'+lbl+'</div>'+
    '<input class="inp" type="number" id="'+id+'" value="'+val+'" style="width:100%;text-align:center;font-size:.95rem;font-family:Cinzel,serif"></div>';
}


// ══════════════════════════════════════════════════════════
// HEROQUEST AUDIO ENGINE v3 — YouTube + soundimage.org
// ══════════════════════════════════════════════════════════
//
// AMBIENCE: Hidden YouTube iframes (needs internet, stays muted until mode activated)
// SFX: soundimage.org direct MP3s + Web Audio fallback
// One-shot SFX still use Web Audio (instant, no latency)
//
// YouTube video IDs used:
//   REST   : nJ2BEF5dNKY  — "Medieval Tavern Ambience" (Guild of Ambience, 1hr)
//   COMBAT : 7tGnLdJf2IM  — "Epic Battle Music" (no-copyright medieval battle, 1hr)
// ══════════════════════════════════════════════════════════
