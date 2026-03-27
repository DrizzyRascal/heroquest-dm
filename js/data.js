
var SIDEQUESTS = [
  {
    "id": "sq-druid",
    "hero": "Druid",
    "heroId": "druid",
    "portrait": "🌿",
    "title": "The Lost Wolf",
    "subtitle": "Elowen's lifelong search ends in the Ashwood",
    "reward": "Permanent companion — Iron the Wolf joins all future quests.",
    "pet": {
      "name": "Iron the Wolf",
      "icon": "🐺",
      "ability": "Iron fights alongside the Druid. Once per combat, Iron attacks the nearest enemy automatically — roll 1 Combat Die. On a skull, deals 1 Body Point damage. Iron has 2 Body Points and 1 Defend Die. If Iron falls in combat, he recovers fully at the next rest scene."
    },
    "unlock": "Triggered when heroes reach Ashwood Forest between Quest 3 and 4, OR when the d20 Tavern roll produces a Side Quest result and Elowen is active.",
    "stages": [
      {
        "title": "The Rumour",
        "text": "A drunk at the Rusty Flagon — one of the genuine rumour results — mutters something about howling in the Ashwood at night. 'Not wolves,' he says. 'Not normal wolves, anyway. Big grey bastard, bigger than a pony. Wearing something silver around its neck. I ran. Wouldn't you?'"
      },
      {
        "title": "Into the Ashwood",
        "readout": "The trees here are older than the town, older than the road, older than the war. The bark is smooth and silver-grey. There is no wind. The light comes from everywhere and nowhere, the way it does in places that have been wild long enough to make their own rules.\n\nElowen stops walking.\n\nFrom the trees ahead — not a growl, not a bark — a sound like a question asked in a language you don't quite speak.",
        "text": "A short excursion to the Ashwood, two hours on foot west of Millhaven. Elowen grows quieter than usual as they approach."
      },
      {
        "title": "Finding Iron",
        "readout": "The wolf that steps from between the trees is enormous — chest-height at the shoulder, grey as ash, with a silver hunting collar that is clearly not made for any natural wolf. One eye is gold. The other is pale blue. He is looking at Elowen.\n\nShe goes to one knee in the wet leaves without hesitation. She says a word — quiet, in the old language she sometimes uses when she thinks no one is listening.\n\nThe wolf walks forward. Slowly. He presses his enormous head against her shoulder.\n\nElowen does not say anything else for a very long time.\n\nHis name, when she finally gives it, is Iron. She does not explain how she knows.",
        "text": "MECHANIC: Place 1 enemy token (the shape in the trees) at the far end of the Ashwood area. Elowen must REACH this token — not fight it. If any hero attacks the token before Elowen reaches it, the wolf flees and the side quest fails for this rest scene (can be reattempted next session)."
      },
      {
        "title": "Reward",
        "text": "Iron the Wolf joins Elowen permanently. Add him to her character sheet as a companion. He is present in all future combats and recovers fully at each rest scene. Elowen does not discuss him. If asked, she says only: 'He was always going to find me. Or I was always going to find him. I was never quite sure which.'"
      }
    ]
  },
  {
    "id": "sq-barb",
    "hero": "Barbarian",
    "heroId": "barb",
    "portrait": "🪓",
    "title": "The Weapon That Was Taken",
    "subtitle": "Ragnar's axe and the debt attached to it",
    "reward": "The Hearthcleaver — Ragnar's personal axe. Rolls 4 Attack Dice. Once per quest, on a kill, may immediately attack again.",
    "pet": null,
    "unlock": "Triggered in the tavern via d20 Side Quest result with Ragnar in the party, OR if the Dwarf's side quest mentions the name Vorath — Ragnar recognises it.",
    "stages": [
      {
        "title": "The Name",
        "text": "Whether it comes from a drunk at the Rusty Flagon or from the Dwarf's book, a name surfaces: Vorath. A fence and dealer in weapons, old debts, and things that shouldn't change hands. Currently operating out of a safehouse in the alley behind Steel and Stone.\n\nRagnar says nothing when he hears the name. He just goes still in a way that is different from his usual stillness."
      },
      {
        "title": "The Safehouse",
        "text": "MECHANIC: This is a social encounter, not a combat — unless the heroes make it one. Vorath is a small, quick, deeply nervous human surrounded by racks of confiscated weapons. He deals professionally and has no loyalty to anyone.\n\nIf approached normally: Vorath immediately tries to sell Ragnar the axe back. 'Found it at auction,' he says. Price is 80 gold.\n\nIf heroes intimidate: Vorath gives it up for 40 gold. He does not fight.\n\nIf they simply pay: Vorath looks at the axe one more time before handing it over. 'Hearthcleaver. I always wondered where it came from. You can feel the history in it.' He pauses. 'Don't tell me the history.'"
      },
      {
        "title": "The Hearthcleaver",
        "readout": "The axe is heavier than it looks, and lighter than it should be — the particular weight of something made for exactly one pair of hands. The grip is wrapped in leather worn smooth in precisely the shape of Ragnar's palm.\n\nHe doesn't say anything when Vorath hands it over.\n\nHe doesn't need to.",
        "text": "Ragnar receives the Hearthcleaver. Stats: 4 Attack Dice. Special — Deathblow: Once per quest, when Ragnar kills an enemy, he may immediately make a second attack against any adjacent enemy."
      }
    ]
  },
  {
    "id": "sq-elf",
    "hero": "Elf",
    "heroId": "elf",
    "portrait": "🧝",
    "title": "The Cloak of the Ashenwarden",
    "subtitle": "What Lysara has been searching for since before the campaign began",
    "reward": "The Ashenwarden Cloak — +1 Defend Die always, +1 Move, and once per quest Lysara may become invisible for one round.",
    "pet": null,
    "unlock": "Triggered at the Cloaks of Shame, or via d20 Side Quest result when Lysara is in the party.",
    "stages": [
      {
        "title": "The Test",
        "readout": "'Three tasks,' the eldest says. 'Not combat. Observation. Patience. Trust. The Cloak is not a weapon, Lysara Dawnwhisper. It is a responsibility. If you carry it like a weapon it will unmake you.'\n\nThe hooded figures watch her with glowing eyes.\n\n'Are you ready to be tested?'",
        "text": "When Lysara visits the Cloaks of Shame, the hooded figures are waiting. They already know her name — that is why they shook their heads in the opening scene. She was expected. The eldest figure speaks in a voice from a time before the current map."
      },
      {
        "title": "The Three Tasks",
        "text": "These are roleplaying challenges, not dice challenges. Each takes one turn.\n\nTASK 1 — OBSERVATION: The figures show Lysara a room filled with 8 objects. She has 30 real seconds to study it. They change 3 things while she looks away. She must identify all three. (2 or more correct = pass.)\n\nTASK 2 — PATIENCE: A hooded figure approaches and stops inches from her face. Does not speak. Does not move. Lysara must not move, speak, or react for a count of 10 real seconds. (Chloe holds still = pass.)\n\nTASK 3 — TRUST: The eldest whispers one question only Chloe can hear: 'Why do you want it?' She must answer honestly, out loud, in character. The figures judge the honesty — not the content. (DM's call.)"
      },
      {
        "title": "The Cloak",
        "readout": "They bring it from somewhere behind the wall of hoods — folded, dark as deep water, lighter than silk and heavier than stone simultaneously. It does not have a colour exactly, more a quality of light.\n\nThe eldest holds it out.\n\n'It chose you the day you were born. We have simply been waiting for you to catch up.'\n\nWhen she puts it on, the room's light rearranges itself subtly. She does not disappear. She simply becomes less certain. Like trying to look at something directly that is easier to see from the corner of your eye.\n\nThe hooded figures bow.\n\nThat is all.",
        "text": "Lysara receives the Ashenwarden Cloak. Stats: +1 Defend Die (permanent), +1 Movement (permanent), Shadowstep: once per quest, become untargetable for one full round unless she attacks first."
      }
    ]
  },
  {
    "id": "sq-dwarf",
    "hero": "Dwarf",
    "heroId": "dwarf",
    "portrait": "⛏",
    "title": "The Ironclad Codex",
    "subtitle": "Brondak finds the lost engineering text of the old Dwarven era",
    "reward": "The Ironclad Codex — Brondak can now operate the Olden Pistol from Shoot and Score. Also grants automatic mechanical trap detection.",
    "pet": null,
    "unlock": "Triggered via d20 Side Quest result in the tavern, or discovered in the Sunken Crypts if the Reliquary chamber is searched thoroughly.",
    "stages": [
      {
        "title": "The Discovery",
        "readout": "The book is the size of a hand and the weight of a considerably larger thing. The cover is embossed with a schematic — an exploded diagram of something mechanical, rendered in the precise loving detail of someone who spent their whole life learning to draw exactly what they saw.\n\nBrondak opens it to a random page and stops breathing for a moment.\n\nIt is a complete technical manual for a firing mechanism that has not been manufactured in two hundred years.\n\nThe Olden Pistol.\n\nHe knows this diagram. He has always known this diagram, the way you know the shape of a word you've never read but have always understood.",
        "text": "In the Sunken Crypts side chamber, beyond Saint Aured's handwritten account, Brondak notices a slim volume bound in grey iron-threaded leather. The language on the spine is Old Dwarven.\n\nAlternatively: a d20 Side Quest result sends a collector to Brondak specifically — he acquired the book from a collapsed library and cannot read a word of it. Asking price: 60 gold."
      },
      {
        "title": "The Study",
        "readout": "'The key,' Brondak says, mostly to himself, tracing a diagram with one thick finger, 'is the lock timing. Everyone who has tried to fire one of these without reading this first has been doing it backwards. You don't prime and then load — you load to a partial prime and finish the prime on the aim. That's why they always misfired. That's why everyone thought they were broken.'\n\nHe closes the book.\n\n'They weren't broken. They were just complicated.'",
        "text": "MECHANIC: Brondak must spend one full turn studying the Codex in the tavern (no other actions that turn). This represents one evening of reading.\n\nIf Chris narrates what Brondak learns as he reads — a sentence or two in character — award 10 bonus gold for the roleplay.\n\nAfter the study turn, the Codex is permanent equipment and Brondak can purchase and operate the Olden Pistol."
      },
      {
        "title": "Reward",
        "text": "Brondak receives the Ironclad Codex. He may now purchase the Olden Pistol at Shoot and Score and use it. Stats: 2 red dice automatic ranged damage, unlimited range, 1 shot per quest (Brondak only — no one else has the mechanical intuition). Bonus: Brondak automatically detects mechanical traps without needing to search."
      }
    ]
  },
  {
    "id": "sq-wizard",
    "hero": "Wizard",
    "heroId": "wizard",
    "portrait": "🧙",
    "title": "The Unchained Conclave",
    "subtitle": "Seraphel discovers why the magic society feared him",
    "reward": "Genie Cascade — Seraphel may now cast the Genie spell twice per quest. Once per campaign he may cast it a third time, but this permanently changes something about him.",
    "pet": null,
    "unlock": "Triggered at the Wizard's Den when Seraphel trains there for the first time, or via d20 Side Quest result. Connected to why Aldris the resident mage reacts strangely.",
    "stages": [
      {
        "title": "Aldris Knows",
        "readout": "'I know who you are,' Aldris finally says. 'Not Seraphel the Grey — anyone can call themselves that. I mean I know who you ARE. I was at the Conclave review board three years ago. The one they called about you specifically.'\n\nHe sits down.\n\n'They weren't trying to restrict your magic. They were trying to contain it. There's a difference. What you did with the Genie spell in the examination hall — you're not supposed to be able to do that. The spell has a single-use binding built into it at the foundational level. You cast it twice. In sequence. Without stopping. The board was terrified.'\n\nHe looks at Seraphel.\n\n'They didn't expel you. They bound you. Put a limiter in the memory-layer of the spell itself. You've been carrying half your own power around and not knowing it for three years.'",
        "text": "The first time Taylor visits the Wizard's Den, Aldris goes pale for just a moment when he sees Seraphel. Then the professional mask is back up. If pressed — by Seraphel directly asking, or by any hero pushing — Aldris breaks after a second attempt."
      },
      {
        "title": "The Unbinding",
        "readout": "'You're going to feel it when the binding comes loose,' Aldris says. 'Like a sound you've been hearing for so long you'd forgotten it was there, suddenly stopping.'\n\nHe begins.\n\nAnd Seraphel does feel it — not pain, nothing dramatic, just: a door that was latched from the wrong side for three years, quietly, without ceremony, opening.\n\nThe room is very quiet.\n\nAldris sits back and looks at him with the expression of someone who has done something they cannot undo and is at peace with it.\n\n'The Conclave is going to be very unhappy,' he says.\n\n'Good,' Seraphel says.",
        "text": "MECHANIC: Aldris can remove the binding — but it requires concentration from Seraphel. Taylor must sit quietly while Aldris describes the process (1-2 minutes uninterrupted). This represents the work.\n\nIf any other player interrupts during this in character — the unbinding stutters and must be attempted again next rest scene.\n\nCost: 50 gold to Aldris for the work."
      },
      {
        "title": "Reward",
        "text": "Seraphel receives the Genie Cascade upgrade. He may now cast the Genie spell twice per quest. Mark this as a permanent ability on his character sheet.\n\nThe third casting (once per campaign) is available at the DM's dramatic discretion — Taylor should choose when the moment feels right. The permanent change that follows should be agreed between Taylor and the DM beforehand so it's meaningful rather than random."
      }
    ]
  }
];



// ════════════════════════════════════════════
// STORY / ACTS
// ════════════════════════════════════════════

var currentActId = null;

function renderActNav(){
  var c = document.getElementById('actNav');
  if(!c) return;
  c.innerHTML = '';
  ACTS.forEach(function(act){
    var btn = document.createElement('div');
    btn.style.cssText = 'display:flex;align-items:center;gap:.6rem;padding:.5rem .7rem;border:1px solid var(--border);border-radius:2px;margin-bottom:.3rem;cursor:pointer;transition:all .2s;';
    var isRest=act.id&&act.id.indexOf('rest')===0;
    btn.innerHTML = '<span style="font-family:Cinzel,serif;font-size:.65rem;color:'+(isRest?'var(--teal-hi)':'var(--gold)')+';min-width:36px">'+act.num+'</span>'+
      '<div><div style="font-family:Cinzel,serif;font-size:.72rem;color:'+(isRest?'var(--teal-hi)':'var(--parch)')+'">' + act.title + '</div>'+
      '<div style="font-style:italic;font-size:.72rem;color:var(--text-dim)">'+act.sub+'</div></div>';
    btn.onmouseover = function(){ this.style.borderColor='var(--gold-dim)'; this.style.background='rgba(212,168,32,.05)'; };
    btn.onmouseout = function(){ this.style.borderColor=(currentActId===act.id?'var(--gold)':'var(--border)'); this.style.background=(currentActId===act.id?'rgba(212,168,32,.07)':''); };
    (function(a){ btn.onclick = function(){ loadAct(a.id); }; })(act);
    if(act.id===currentActId){ btn.style.borderColor='var(--gold)'; btn.style.background='rgba(212,168,32,.07)'; }
    c.appendChild(btn);
  });
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



// ════════════════════════════════════════════
// MERCENARY DATA
// ════════════════════════════════════════════

var MERC_TYPES = [
  {id:'ogre-lord',     roll:1, name:'Ogre Lord',      portrait:'👹', type:'Ogre',  atk:0,def:0,body:0,mind:0,notes:''},
  {id:'goblin-archer', roll:2, name:'Goblin Archer',  portrait:'🏹', type:'Goblin',atk:0,def:0,body:0,mind:0,notes:''},
  {id:'orc-archer',    roll:3, name:'Orc Archer',     portrait:'⚔', type:'Orc',   atk:0,def:0,body:0,mind:0,notes:''},
  {id:'ogre-commander',roll:4, name:'Ogre Commander', portrait:'🪖', type:'Ogre',  atk:0,def:0,body:0,mind:0,notes:''},
  {id:'ogre-warrior',  roll:5, name:'Ogre Warrior',   portrait:'🗡', type:'Ogre',  atk:0,def:0,body:0,mind:0,notes:''},
  {id:'ogre-champion', roll:6, name:'Ogre Champion',  portrait:'🏆', type:'Ogre',  atk:0,def:0,body:0,mind:0,notes:''},
];

var ENEMY_TYPES = [
  {id:'skeleton',      name:'Skeleton',      portrait:'💀', type:'Undead',  atk:0,def:0,body:0,mind:0,notes:''},
  {id:'dread-warrior', name:'Dread Warrior', portrait:'🧟', type:'Undead',  atk:0,def:0,body:0,mind:0,notes:''},
  {id:'orc',           name:'Orc',           portrait:'👺', type:'Monster', atk:0,def:0,body:0,mind:0,notes:''},
  {id:'abomination',   name:'Abomination',   portrait:'🐉', type:'Monster', atk:0,def:0,body:0,mind:0,notes:''},
  {id:'goblin',        name:'Goblin',        portrait:'👾', type:'Monster', atk:0,def:0,body:0,mind:0,notes:''},
  {id:'dragon',        name:'Dragon',        portrait:'🔥', type:'Dragon',  atk:0,def:0,body:0,mind:0,notes:''},
  {id:'mummy',         name:'Mummy',         portrait:'🪦', type:'Undead',  atk:0,def:0,body:0,mind:0,notes:''},
];

// Initialise from saved state or defaults
function initMercEnemyData(){
  if(!S.mercStats){
    S.mercStats={};
    MERC_TYPES.forEach(function(m){ S.mercStats[m.id]={atk:m.atk,def:m.def,body:m.body,mind:m.mind,notes:m.notes}; });
  }
  if(!S.enemyStats){
    S.enemyStats={};
    ENEMY_TYPES.forEach(function(e){ S.enemyStats[e.id]={atk:e.atk,def:e.def,body:e.body,mind:e.mind,notes:e.notes}; });
  }
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

// ════════════════════════════════════════════
// SHOP DATA
// ════════════════════════════════════════════

var SHOPS = [
  {
    id:'shoot', name:'Shoot & Score', icon:'🏹',
    items:[
      {id:'crossbow',        name:'Crossbow',          stock:null, price:0, notes:'Ranged weapon. Roll 2 Attack Dice at range.',        stats:{atk:1,def:0,bodyMax:0,mind:0,move:0,special:'Ranged attack — 2 Attack Dice, unlimited range, can attack before melee'}},
      {id:'ring-fortitude',  name:'Ring of Fortitude',  stock:null, price:0, notes:'Grants extra resilience.',                           stats:{atk:0,def:1,bodyMax:1,mind:0,move:0,special:''}},
      {id:'wizards-staff',   name:"Wizard's Staff",     stock:null, price:0, notes:'Magical focus staff for spellcasters.',               stats:{atk:1,def:0,bodyMax:0,mind:1,move:0,special:'Wizard only: cast 1 extra spell per quest'}},
      {id:'tool-kit',        name:'Tool Kit',            stock:null, price:0, notes:'Mechanical tools for traps and locks.',               stats:{atk:0,def:0,bodyMax:0,mind:0,move:0,special:'Automatically disarm mechanical traps; pick locks without a search action'}},
      {id:'throwing-dagger', name:'Throwing Dagger',     stock:null, price:0, notes:'Light ranged weapon.',                               stats:{atk:1,def:0,bodyMax:0,mind:0,move:0,special:'Can be thrown at range (1 Attack Die). Recoverable after combat'}},
    ]
  },
  {
    id:'superfly', name:'Superfly Active', icon:'🧥',
    items:[
      {id:'helmet',  name:'Helmet',  stock:3,    price:0, notes:'Sturdy helmet.',                        stats:{atk:0,def:1,bodyMax:0,mind:0,move:0,special:''}},
      {id:'shield',  name:'Shield',  stock:3,    price:0, notes:'Standard shield.',                      stats:{atk:0,def:1,bodyMax:0,mind:0,move:0,special:''}},
      {id:'bracers', name:'Bracers', stock:null, price:0, notes:'Arm bracers offering light protection.', stats:{atk:0,def:1,bodyMax:0,mind:0,move:0,special:''}},
    ]
  },
  {
    id:'steel', name:'Steel & Stone', icon:'⚔',
    items:[
      {id:'handaxe',    name:'Handaxe',    stock:null, price:0, notes:'Fast, light axe.',                     stats:{atk:1,def:0,bodyMax:0,mind:0,move:0,special:''}},
      {id:'plate-mail', name:'Plate Mail', stock:null, price:0, notes:'Heavy full plate armour.',              stats:{atk:0,def:3,bodyMax:1,mind:0,move:-1,special:''}},
      {id:'shortsword', name:'Shortsword', stock:null, price:0, notes:'Quick and reliable.',                   stats:{atk:1,def:0,bodyMax:0,mind:0,move:0,special:''}},
      {id:'battleaxe',  name:'Battleaxe',  stock:2,    price:0, notes:'Powerful two-handed axe.',              stats:{atk:2,def:0,bodyMax:0,mind:0,move:0,special:''}},
      {id:'broadsword', name:'Broadsword', stock:null, price:0, notes:'Balanced sword. Rolls 3 Attack Dice.',  stats:{atk:2,def:0,bodyMax:0,mind:0,move:0,special:''}},
      {id:'longsword',  name:'Longsword',  stock:2,    price:0, notes:'Reach and power.',                      stats:{atk:2,def:1,bodyMax:0,mind:0,move:0,special:''}},
      {id:'chain-mail', name:'Chain Mail', stock:null, price:0, notes:'Reliable chain armour.',                stats:{atk:0,def:2,bodyMax:0,mind:0,move:0,special:''}},
    ]
  },
  {
    id:'ferbs', name:"Ferb's Herbs", icon:'🌿',
    items:[
      {id:'venom-antidote',      name:'Venom Antidote',       stock:null, price:0, notes:'Cures poison effects instantly.',             stats:{atk:0,def:0,bodyMax:0,mind:0,move:0,special:'Consumable: remove all poison/plague effects immediately'}},
      {id:'potion-restoration',  name:'Potion of Restoration', stock:null, price:0, notes:'Restores 4 Body Points.',                    stats:{atk:0,def:0,bodyMax:0,mind:0,move:0,special:'Consumable: restore 4 Body Points instantly'}},
      {id:'potion-dexterity',    name:'Potion of Dexterity',   stock:null, price:0, notes:'Boosts agility for one quest.',              stats:{atk:0,def:0,bodyMax:0,mind:0,move:2,special:'Consumable: +2 Movement for the rest of the current quest'}},
      {id:'potion-battle',       name:'Potion of Battle',      stock:null, price:0, notes:'War elixir — sharpens combat instincts.',    stats:{atk:1,def:0,bodyMax:0,mind:0,move:0,special:'Consumable: +1 Attack Die for the rest of the current quest'}},
      {id:'potion-speed',        name:'Potion of Speed',       stock:null, price:0, notes:'Move automatically 10 squares this turn.',   stats:{atk:0,def:0,bodyMax:0,mind:0,move:0,special:'Consumable: instead of rolling movement, move exactly 10 squares this turn'}},
      {id:'holy-water',          name:'Holy Water',            stock:null, price:0, notes:'Effective against undead.',                  stats:{atk:0,def:0,bodyMax:0,mind:0,move:0,special:'Consumable: 2 automatic damage to one undead enemy (Skeleton, Zombie, Mummy, Dread Warrior)'}},
    ]
  },
];

function initShopData(){
  if(!S.shopData) S.shopData={};
  SHOPS.forEach(function(shop){
    if(!S.shopData[shop.id]) S.shopData[shop.id]={};
    shop.items.forEach(function(item){
      if(!S.shopData[shop.id][item.id]){
        S.shopData[shop.id][item.id]={ price:item.price, stock:item.stock, stockLeft:item.stock };
      }
    });
  });
}

function renderShops(){
  initShopData();
  var c=document.getElementById('shopsContent');
  if(!c) return;
  c.innerHTML='';
  SHOPS.forEach(function(shop){
    var section=document.createElement('div');
    section.className='panel';
    section.style.marginBottom='.9rem';
    var html='<div class="ptitle">'+shop.icon+' '+shop.name+'</div>';
    html+='<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">';
    html+='<thead><tr>';
    ['ITEM','PRICE (gold)','STOCK','NOTES',''].forEach(function(h){
      html+='<th style="font-family:Cinzel,serif;font-size:.58rem;letter-spacing:.15em;color:var(--gold);text-align:'+(h===''?'center':'left')+';padding:.4rem .6rem;border-bottom:1px solid var(--border)">'+h+'</th>';
    });
    html+='</tr></thead><tbody>';
    shop.items.forEach(function(item){
      var d=S.shopData[shop.id][item.id];
      var out=d.stockLeft!==null&&d.stockLeft<=0;
      var stockDisp=d.stockLeft===null?'\u221e':String(d.stockLeft);
      html+='<tr style="border-bottom:1px solid rgba(58,42,18,.35);'+(out?'opacity:.45':'')+'" id="shoprow-'+shop.id+'-'+item.id+'">';
      html+='<td style="padding:.45rem .6rem">';
      html+='<div style="font-family:Cinzel,serif;font-size:.78rem;color:var(--parch)">'+item.name+'</div>';
      if(item.stock) html+='<div style="font-family:Cinzel,serif;font-size:.52rem;letter-spacing:.1em;color:var(--text-dim)">Limited stock</div>';
      html+='</td>';
      html+='<td style="padding:.45rem .6rem;text-align:center">';
      html+='<input class="inp" type="number" min="0" value="'+d.price+'" id="price-'+shop.id+'-'+item.id+'" style="width:65px;text-align:center;font-family:Cinzel,serif;font-size:.85rem">';
      html+='</td>';
      html+='<td style="padding:.45rem .6rem;text-align:center">';
      html+='<div style="font-family:Cinzel,serif;font-size:.85rem;color:'+(out?'var(--blood-hi)':'var(--gold-hi)')+'">'+stockDisp+'</div>';
      if(d.stockLeft!==null) html+='<button class="btn btn-sm btn-grey" style="margin-top:.2rem;font-size:.5rem" id="restock-'+shop.id+'-'+item.id+'">&#8635;</button>';
      html+='</td>';
      html+='<td style="padding:.45rem .6rem">';
      html+='<input class="inp" type="text" value="'+escHtml(d.notes||'')+'" id="notes-'+shop.id+'-'+item.id+'" placeholder="Effects, rules..." style="width:100%;min-width:140px;font-size:.82rem">';
      html+='</td>';
      html+='<td style="padding:.45rem .6rem;text-align:center">';
      if(out) html+='<span style="font-family:Cinzel,serif;font-size:.55rem;letter-spacing:.1em;color:var(--blood-hi)">OUT</span>';
      else html+='<button class="btn btn-gold btn-sm" id="buy-'+shop.id+'-'+item.id+'">Buy</button>';
      html+='<button class="btn btn-green btn-sm" id="stats-'+shop.id+'-'+item.id+'" style="margin-top:.2rem;font-size:.5rem">&#9998; Stats</button>';
      html+='</td></tr>';
    });
    html+='</tbody></table></div>';
    section.innerHTML=html;
    c.appendChild(section);
    // Wire up events after DOM insertion
    shop.items.forEach(function(item){
      var priceEl=document.getElementById('price-'+shop.id+'-'+item.id);
      if(priceEl)(function(sid,iid){priceEl.onchange=function(){saveItemPrice(sid,iid);};})(shop.id,item.id);
      var notesEl=document.getElementById('notes-'+shop.id+'-'+item.id);
      if(notesEl)(function(sid,iid){notesEl.onchange=function(){saveItemNotes(sid,iid);};})(shop.id,item.id);
      var restockEl=document.getElementById('restock-'+shop.id+'-'+item.id);
      if(restockEl)(function(sid,iid){restockEl.onclick=function(){restockItem(sid,iid);};})(shop.id,item.id);
      var buyEl=document.getElementById('buy-'+shop.id+'-'+item.id);
      if(buyEl)(function(sid,iid){buyEl.onclick=function(){buyShopItem(sid,iid);};})(shop.id,item.id);
      var statsEl=document.getElementById('stats-'+shop.id+'-'+item.id);
      if(statsEl)(function(sid,iid,iname){statsEl.onclick=function(e){e.stopPropagation();openShopItemStatsEditor(sid,iid,iname);};})(shop.id,item.id,item.name);
    });
  });
}

function escHtml(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function saveItemPrice(shopId,itemId){
  initShopData();
  var el=document.getElementById('price-'+shopId+'-'+itemId);
  if(el){ S.shopData[shopId][itemId].price=parseInt(el.value)||0; saveLocal(); }
}

function saveItemNotes(shopId,itemId){
  initShopData();
  var el=document.getElementById('notes-'+shopId+'-'+itemId);
  if(el){ S.shopData[shopId][itemId].notes=el.value; saveLocal(); }
}

function restockItem(shopId,itemId){
  initShopData();
  var shop=SHOPS.find(function(s){return s.id===shopId;});
  var item=shop?shop.items.find(function(i){return i.id===itemId;}):null;
  if(!item) return;
  S.shopData[shopId][itemId].stockLeft=item.stock;
  saveLocal(); renderShops();
  notify('Stock restored: '+item.name+' x'+item.stock);
}

function buyShopItem(shopId,itemId){
  initShopData();
  var shop=SHOPS.find(function(s){return s.id===shopId;});
  var item=shop?shop.items.find(function(i){return i.id===itemId;}):null;
  if(!item) return;
  var d=S.shopData[shopId][itemId];
  var price=d.price;
  var heroOpts=activeHeroes().map(function(h){
    return '<option value="'+h.id+'">'+h.portrait+' '+h.name+'</option>';
  }).join('');
  openModal('Buy: '+item.name,
    '<p class="dim" style="margin-bottom:.7rem">Price: <strong style="color:var(--gold-hi);font-family:Cinzel,serif">'+(price?price+' gold':'Not set / Free')+'</strong>'+
    (d.stockLeft!==null?' | Stock left: '+d.stockLeft:'')+
    (d.notes?'<br><em style="color:var(--parch-dim)">'+escHtml(d.notes)+'</em>':'')+
    '</p>'+
    '<div class="frow"><span class="flbl">Hero</span><select class="inp" id="buy-hero-sel" style="flex:1">'+heroOpts+'</select></div>'+
    '<div class="brow"><button class="btn btn-gold" id="confirm-buy-btn">Confirm Purchase</button>'+
    '<button class="btn btn-grey btn-sm" onclick="closeModal()">Cancel</button></div>'
  );
  setTimeout(function(){
    var btn=document.getElementById('confirm-buy-btn');
    if(btn)(function(sid,iid,p,nm){
      btn.onclick=function(){
        var sel=document.getElementById('buy-hero-sel');
        var h=S.heroes.find(function(x){return x.id===sel.value;});
        if(!h) return;
        if(p>0&&(S.groupGold||0)<p){notify('Not enough gold in the party pot!');return;}
        if(p>0){S.groupGold=(S.groupGold||0)-p;renderGoldPot();}
        h.equipment.push(nm);
        applyItemToHero(h.id,nm,false);
        if(S.shopData[sid][iid].stockLeft!==null) S.shopData[sid][iid].stockLeft--;
        closeModal(); saveLocal(); renderHeroes(); renderShops();
        var bought_item=findItemByName(nm);
        var bonus_parts=[];
        if(bought_item&&bought_item.stats){var bs=bought_item.stats;if(bs.atk)bonus_parts.push((bs.atk>0?'+':'')+bs.atk+' Atk');if(bs.def)bonus_parts.push((bs.def>0?'+':'')+bs.def+' Def');if(bs.bodyMax)bonus_parts.push((bs.bodyMax>0?'+':'')+bs.bodyMax+' Body');}
        HQAudio.coins();
        notify(h.name+' bought '+nm+(bonus_parts.length?' ('+bonus_parts.join(', ')+')':'')+(p?' — '+p+' gold from pot':''));
      };
    })(shopId,itemId,price,item.name);
  },50);
}

function restockAllShops(){
  initShopData();
  SHOPS.forEach(function(shop){
    shop.items.forEach(function(item){
      if(item.stock!==null) S.shopData[shop.id][item.id].stockLeft=item.stock;
    });
  });
  saveLocal(); renderShops();
  notify('All limited stock restocked');
}

