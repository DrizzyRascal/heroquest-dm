// ═══════════════════════════════════════════════════════
// STATE — Cloud only save/load via Cloudflare KV
// ═══════════════════════════════════════════════════════

var WORKER_URL = 'https://winter-cell-c39e.jr96driscoll.workers.dev';
var campaignId = '';
var _saveTimer = null;

// ── Build full save payload ───────────────────────────────────────────────────
function buildSaveData(){
  if(typeof dmState !== 'undefined'){
    S.dungeonMaps = {};
    Object.keys(dmState.quests).forEach(function(k){ S.dungeonMaps[k]=dmState.quests[k]; });
    S.dmBaseMap = (dmState.baseMap!==null && dmState.baseMap!==undefined) ? dmState.baseMap : null;
  }
  return {
    found:       true,
    groupGold:   S.groupGold||0,
    heroes:      S.heroes,
    turns:       S.turns,
    outposts:    S.outposts,
    encLog:      S.encLog,
    checklist:   S.checklist,
    sqStatus:    S.sqStatus||{},
    mercStats:   S.mercStats||{},
    enemyStats:  S.enemyStats||{},
    shopData:    S.shopData||{},
    itemData:    S.itemData||{},
    dungeonMaps: S.dungeonMaps||{},
    dmBaseMap:   S.dmBaseMap||null,
    notes:       (document.getElementById('storyNotes')||{}).value||'',
    editable:    gatherEditable()
  };
}

// ── Apply cloud data into S AND re-render everything ─────────────────────────
function applyAndRender(d){
  if(!d) return;
  // Unwrap if response is {found:true, data:{...}} format
  if(d.data && typeof d.data === 'object') d = d.data;
  console.log('[HQ] applyAndRender called, groupGold in data:', d.groupGold, 'found:', d.found);
  // Apply every field directly into S
  if(typeof d.groupGold !== 'undefined') S.groupGold = d.groupGold;
  if(d.heroes){
    S.heroes = d.heroes;
    S.heroes.forEach(function(h){ if(!h.level)h.level=1; if(typeof h.xp==='undefined')h.xp=0; });
  }
  if(d.turns)       S.turns       = d.turns;
  if(d.outposts)    S.outposts    = d.outposts;
  if(d.encLog)      S.encLog      = d.encLog;
  if(d.checklist)   S.checklist   = d.checklist;
  if(d.sqStatus)    S.sqStatus    = d.sqStatus;
  if(d.mercStats)   S.mercStats   = d.mercStats;
  if(d.enemyStats)  S.enemyStats  = d.enemyStats;
  if(d.shopData)    S.shopData    = d.shopData;
  if(d.itemData)    S.itemData    = d.itemData;
  if(d.dungeonMaps) S.dungeonMaps = d.dungeonMaps;
  if(d.dmBaseMap!=null && d.dmBaseMap!==undefined) S.dmBaseMap = d.dmBaseMap;

  // Re-render everything from the new S values
  console.log('[HQ] About to renderAll, S.groupGold =', S.groupGold);
  renderAll();
  console.log('[HQ] renderAll complete, S.groupGold =', S.groupGold);

  // Restore text fields
  if(d.notes){
    var sn = document.getElementById('storyNotes');
    if(sn) sn.value = d.notes;
  }
  if(d.editable){
    setTimeout(function(){
      try{ restoreEditable(d.editable); }catch(e){}
    }, 100);
  }
}

// ── Push current state to cloud ───────────────────────────────────────────────
function pushToCloud(silent){
  if(!campaignId) return;
  var d = buildSaveData();
  console.log('[HQ] pushToCloud firing, groupGold:', d.groupGold, 'campaignId:', campaignId);
  fetch(WORKER_URL + '?id=' + encodeURIComponent(campaignId), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(d)
  })
  .then(function(r){ return r.json(); })
  .then(function(res){ if(!silent) notify('☁ Saved'); })
  .catch(function(){ if(!silent) notify('☁ Save failed'); });
}

// ── saveLocal — called by every action in the app ────────────────────────────
function saveLocal(){
  if(!campaignId){
    // No campaign yet — show the passphrase screen
    showPassphraseScreen();
    return;
  }
  // Debounce: 800ms after last change
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(function(){ pushToCloud(true); }, 800);
}

// ── Passphrase login screen ───────────────────────────────────────────────────
function showPassphraseScreen(){
  if(document.getElementById('pp-screen')) return;

  var el = document.createElement('div');
  el.id = 'pp-screen';
  el.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(8,6,3,0.97);display:flex;align-items:center;justify-content:center;';
  el.innerHTML =
    '<div style="text-align:center;max-width:440px;width:90%;padding:2rem;">' +
      '<div style="font-family:Cinzel Decorative,serif;font-size:1.5rem;color:#d4a820;letter-spacing:.08em;margin-bottom:.4rem;">⚔ HeroQuest</div>' +
      '<div style="font-family:Cinzel,serif;font-size:.7rem;letter-spacing:.25em;color:#6a5830;margin-bottom:2.5rem;">THE SHATTERED CROWN</div>' +
      '<div style="font-family:Cinzel,serif;font-size:.62rem;letter-spacing:.18em;color:#ede0c0;margin-bottom:.5rem;">CAMPAIGN PASSPHRASE</div>' +
      '<input id="pp-input" class="inp" placeholder="e.g. shattered-crown" ' +
        'style="width:100%;text-align:center;font-size:1.1rem;letter-spacing:.06em;margin-bottom:.5rem;" ' +
        'autocomplete="off" spellcheck="false">' +
      '<div style="font-family:Georgia,serif;font-size:.7rem;color:#6a5830;font-style:italic;margin-bottom:1.5rem;line-height:1.6;">' +
        'Enter your campaign passphrase to load your save.<br>First time? Any passphrase starts a new campaign.' +
      '</div>' +
      '<button class="btn btn-gold" id="pp-btn" style="width:100%;font-size:.9rem;padding:.75rem 1rem;letter-spacing:.12em;">ENTER THE QUEST</button>' +
    '</div>';

  document.body.appendChild(el);

  var input = document.getElementById('pp-input');
  var btn   = document.getElementById('pp-btn');

  function enter(){
    var id = (input ? input.value : '').trim();
    if(id.length < 3){ notify('Passphrase must be at least 3 characters'); return; }

    btn.textContent = 'Loading...';
    btn.disabled = true;

    // Fetch from cloud
    console.log('[HQ] Fetching from cloud for id:', id);
    fetch(WORKER_URL + '?id=' + encodeURIComponent(id))
    .then(function(r){ return r.json(); })
    .then(function(d){
      console.log('[HQ] Cloud response:', JSON.stringify(d).slice(0,200));
      campaignId = id;
      el.remove();
      if(d && (d.found || (d.data && d.data.found))){
        applyAndRender(d);
        notify('☁ Campaign loaded: ' + id);
      } else {
        notify('✦ New campaign: ' + id);
      }
    })
    .catch(function(err){
      console.error('Load error', err);
      campaignId = id;
      el.remove();
      notify('Could not reach cloud — starting fresh');
    });
  }

  if(btn) btn.onclick = enter;
  if(input){
    setTimeout(function(){ input.focus(); }, 100);
    input.addEventListener('keydown', function(e){ if(e.key==='Enter') enter(); });
  }
}

// ── Manual campaign modal ─────────────────────────────────────────────────────
function openCampaignModal(){
  openModal('☁ Campaign',
    '<p class="dim" style="margin-bottom:.8rem">Manually save or load, or switch to a different campaign.</p>' +
    '<div style="margin-bottom:.7rem">' +
      '<div style="font-family:Cinzel,serif;font-size:.58rem;letter-spacing:.12em;color:var(--text-dim);margin-bottom:.3rem">PASSPHRASE</div>' +
      '<input class="inp" id="camp-inp" style="width:100%;font-size:1rem" placeholder="e.g. shattered-crown" value="' + escHtml(campaignId) + '">' +
    '</div>' +
    '<div class="brow">' +
      '<button class="btn btn-gold" id="camp-save-btn">☁ Save Now</button>' +
      '<button class="btn btn-teal" id="camp-load-btn">⬇ Load</button>' +
      '<button class="btn btn-grey btn-sm" onclick="closeModal()">Cancel</button>' +
    '</div>'
  );
  setTimeout(function(){
    var inp = document.getElementById('camp-inp');
    var sb  = document.getElementById('camp-save-btn');
    var lb  = document.getElementById('camp-load-btn');
    if(inp) inp.focus();
    if(sb) sb.onclick = function(){
      var id = inp ? inp.value.trim() : '';
      if(!id){ notify('Enter a passphrase'); return; }
      campaignId = id;
      closeModal();
      pushToCloud(false);
    };
    if(lb) lb.onclick = function(){
      var id = inp ? inp.value.trim() : '';
      if(!id){ notify('Enter a passphrase'); return; }
      closeModal();
      notify('Loading...');
      fetch(WORKER_URL + '?id=' + encodeURIComponent(id))
      .then(function(r){ return r.json(); })
      .then(function(d){
        if(d && (d.found || (d.data && d.data.found))){
          campaignId = id;
          applyAndRender(d);
          notify('☁ Loaded: ' + id);
        } else {
          notify('No save found for: ' + id);
        }
      })
      .catch(function(){ notify('Could not reach cloud'); });
    };
  }, 50);
}

// ── Boot ──────────────────────────────────────────────────────────────────────
(function boot(){
  // init() renders the app with default S values
  init();
  // Show passphrase screen — user enters passphrase → cloud loads → applyAndRender()
  showPassphraseScreen();
})();
