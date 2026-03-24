
var DM_COLS=26, DM_ROWS=19, DM_CELL=30;
var DM_CELL_W=DM_CELL, DM_CELL_H=DM_CELL; // may differ when board image has non-square tiles

// ── Board background image ────────────────────────────
var _dmBoardImg = null;
var _dmBoardImgReady = false;
(function(){
  var img = new Image();
  img.onload = function(){
    _dmBoardImg=img; _dmBoardImgReady=true;
    var st=document.getElementById('dm-board-img-status');
    if(st){ st.style.color='var(--green-hi)'; st.textContent='Board image loaded'; }
    dmResizeCanvas(); // recalc height from image aspect ratio before drawing
    dmDraw();
  };
  img.onerror = function(){
    _dmBoardImg=null; _dmBoardImgReady=false;
    var st=document.getElementById('dm-board-img-status');
    if(st){ st.style.color='var(--text-dim)'; st.textContent='No board image — save heroquest-board.jpg to img/'; }
  };
  img.src = 'img/heroquest-board.jpg';
  _dmBoardImg = img;
})();

// ── Base map: room definitions (user-editable via Design Mode) ──
// Each entry: {x,y,w,h,floor,tile,hi}
// x,y = top-left cell (0-indexed), w,h = size in cells
// floor = base colour, tile = individual tile colour, hi = highlight/grout
var DM_BASE_MAP = [
  // TOP ROW
  {x:1,  y:1,  w:5, h:4, floor:'#a06830', tile:'#b87840', hi:'#d4a060'},  // tan/wood
  {x:7,  y:1,  w:3, h:3, floor:'#6a1818', tile:'#8a2222', hi:'#c03030'},  // red
  {x:11, y:1,  w:3, h:3, floor:'#186060', tile:'#208080', hi:'#30b0b0'},  // teal
  {x:15, y:1,  w:4, h:4, floor:'#580e0e', tile:'#781818', hi:'#a82020'},  // dark crimson
  {x:20, y:1,  w:2, h:3, floor:'#586068', tile:'#687880', hi:'#90a8b0'},  // grey/white
  {x:22, y:1,  w:3, h:4, floor:'#685008', tile:'#886810', hi:'#b89018'},  // amber/gold

  // SECOND BAND
  {x:1,  y:6,  w:4, h:4, floor:'#303030', tile:'#404040', hi:'#585858'},  // dark grey
  {x:6,  y:4,  w:4, h:5, floor:'#285008', tile:'#386810', hi:'#58a018'},  // lime green
  {x:11, y:5,  w:5, h:6, floor:'#201808', tile:'#2c2010', hi:'#604030'},  // centre dark
  {x:17, y:4,  w:4, h:3, floor:'#504008', tile:'#686008', hi:'#989010'},  // amber stripe
  {x:22, y:5,  w:3, h:3, floor:'#384808', tile:'#505808', hi:'#809010'},  // yellow-green

  // MIDDLE BAND
  {x:1,  y:11, w:4, h:3, floor:'#486008', tile:'#607010', hi:'#90a010'},  // olive
  {x:6,  y:10, w:3, h:5, floor:'#0c3840', tile:'#185060', hi:'#208898'},  // teal diamond
  {x:10, y:10, w:3, h:4, floor:'#101828', tile:'#182038', hi:'#285878'},  // blue cracked
  {x:17, y:9,  w:3, h:5, floor:'#505060', tile:'#686878', hi:'#9898a8'},  // grey checker
  {x:21, y:10, w:4, h:2, floor:'#404008', tile:'#585808', hi:'#909010'},  // gold X
  {x:21, y:12, w:4, h:3, floor:'#382808', tile:'#503808', hi:'#806810'},  // darker gold

  // BOTTOM ROW
  {x:1,  y:15, w:4, h:3, floor:'#283040', tile:'#38404c', hi:'#506080'},  // blue flag
  {x:6,  y:15, w:4, h:3, floor:'#583030', tile:'#703c3c', hi:'#a05858'},  // salmon
  {x:11, y:14, w:4, h:4, floor:'#505008', tile:'#686808', hi:'#a09c10'},  // gold cracked
  {x:16, y:14, w:4, h:4, floor:'#583040', tile:'#704050', hi:'#a06878'},  // pink/rose
  {x:21, y:15, w:4, h:3, floor:'#1c4010', tile:'#285018', hi:'#488028'},  // green
];

// ── Token definitions ─────────────────────────────────────────
var DM_TOKENS=[
  {id:'goblin',    emoji:'👾', label:'Goblin',     cat:'monster', color:'rgba(30,70,10,0.85)'},
  {id:'orc',       emoji:'👺', label:'Orc',        cat:'monster', color:'rgba(60,30,5,0.85)'},
  {id:'skeleton',  emoji:'💀', label:'Skeleton',   cat:'monster', color:'rgba(80,50,20,0.85)'},
  {id:'zombie',    emoji:'🧟', label:'Zombie',     cat:'monster', color:'rgba(30,50,20,0.85)'},
  {id:'mummy',     emoji:'🪦', label:'Mummy',      cat:'monster', color:'rgba(60,40,0,0.85)'},
  {id:'gargoyle',  emoji:'🗿', label:'Gargoyle',   cat:'monster', color:'rgba(30,30,50,0.85)'},
  {id:'boss',      emoji:'🐉', label:'Boss',       cat:'monster', color:'rgba(90,10,10,0.85)'},
  {id:'chest',     emoji:'📦', label:'Chest',      cat:'furn',    color:'rgba(40,20,0,0.85)'},
  {id:'trap',      emoji:'⚠',  label:'Trap',       cat:'furn',    color:'rgba(80,20,0,0.85)'},
  {id:'table',     emoji:'🪵', label:'Table',      cat:'furn',    color:'rgba(30,20,0,0.85)'},
  {id:'bookcase',  emoji:'📚', label:'Bookcase',   cat:'furn',    color:'rgba(0,20,20,0.85)'},
  {id:'fire',      emoji:'🔥', label:'Fireplace',  cat:'furn',    color:'rgba(60,20,0,0.85)'},
  {id:'altar',     emoji:'⛩',  label:'Altar',      cat:'furn',    color:'rgba(20,0,50,0.85)'},
  {id:'pit',       emoji:'🕳', label:'Pit Trap',   cat:'trap',    color:'rgba(20,0,0,0.85)'},
  {id:'dart',      emoji:'🎯', label:'Dart Trap',  cat:'trap',    color:'rgba(40,0,30,0.85)'},
  {id:'door',      emoji:'🚪', label:'Door',       cat:'door',    color:'rgba(30,15,0,0.85)'},
  {id:'secret',    emoji:'🔍', label:'Secret Door',cat:'door',    color:'rgba(0,20,20,0.85)'},
  {id:'loot',      emoji:'💰', label:'Loot',       cat:'special', color:'rgba(30,30,0,0.85)'},
  {id:'stairs',    emoji:'🪜', label:'Stairs',     cat:'special', color:'rgba(10,10,25,0.85)'},
  {id:'hero',      emoji:'⭐', label:'Hero Start', cat:'special', color:'rgba(20,20,0,0.85)'},
  {id:'note',      emoji:'📌', label:'Note',       cat:'special', color:'rgba(25,0,0,0.85)'},
  {id:'ref',       emoji:'📋', label:'Ref Note',   cat:'special', color:'rgba(55,20,5,0.92)'},
  {id:'wall',      emoji:'🧱', label:'Wall',       cat:'terrain', color:'rgba(10,8,5,0.98)'},
  {id:'passage',   emoji:'🚶', label:'Passage',    cat:'terrain', color:'rgba(20,25,35,0.85)'},
];
var DM_CATS={monster:['goblin','orc','skeleton','zombie','mummy','gargoyle','boss'],furn:['chest','trap','table','bookcase','fire','altar'],trap:['pit','dart'],door:['door','secret'],special:['loot','stairs','hero','note','ref'],terrain:['wall','passage']};
var DM_CAT_NAMES={monster:'Monsters',furn:'Furniture',trap:'Traps',door:'Doors',special:'Special',terrain:'Terrain'};
var DM_CAT_COLORS={monster:'#c03030',furn:'#30a0a0',trap:'#9030c0',door:'#c09020',special:'#30a040',terrain:'#606060'};

// ── App state ─────────────────────────────────────────────────
var dmState={
  questId:'q-scratch',
  quests:{
    'q-scratch':{name:'Scratch Map',cells:{}},
    'q1':{name:'Quest 1 — Temple of Dragliton',cells:{}},
    'q2':{name:'Quest 2 — Siege of the West Gate',cells:{}},
    'q3':{name:'Quest 3 — Sunken Crypts',cells:{}},
    'q4':{name:'Quest 4 — Iron Fortress',cells:{}},
    'q5':{name:'Quest 5 — Plagued Marshes',cells:{}},
    'q6':{name:"Quest 6 — Drevak's Watchtower",cells:{}},
    'q7':{name:'Quest 7 — Citadel of Cassel Mourne',cells:{}},
  },
  designMode:false,
  drawColor:'#607010',
  drawRoom:[],
  baseMap:null,
  sel:null,
  eraser:false,
  hover:null,
};

function setGridSize(cols, rows){
  DM_COLS=Math.max(10,Math.min(40,cols));
  DM_ROWS=Math.max(8,Math.min(30,rows));
  dmResizeCanvas();
  dmDraw();
  notify('Grid: '+DM_COLS+' × '+DM_ROWS);
}

function initDMState(){
  if(!S.dungeonMaps) S.dungeonMaps={};
  Object.keys(S.dungeonMaps).forEach(function(k){
    if(!dmState.quests[k]) dmState.quests[k]={name:S.dungeonMaps[k].name,cells:{}};
    dmState.quests[k].cells=S.dungeonMaps[k].cells||{};
    dmState.quests[k].notes=S.dungeonMaps[k].notes||[];
  });
  if(S.dmBaseMap !== undefined && S.dmBaseMap !== null) dmState.baseMap=S.dmBaseMap;
}
function dmCells(){ return dmState.quests[dmState.questId].cells; }
function dmSave(){
  S.dungeonMaps={};
  Object.keys(dmState.quests).forEach(function(k){ S.dungeonMaps[k]=dmState.quests[k]; });
  if(dmState.baseMap) S.dmBaseMap=dmState.baseMap;
  saveLocal(); notify('Map saved');
}
function getBaseMap(){ return (dmState.baseMap !== null && dmState.baseMap !== undefined) ? dmState.baseMap : DM_BASE_MAP; }

// ── CANVAS DRAWING ────────────────────────────────────────────
function dmDraw(){
  var canvas=document.getElementById('dm-canvas');
  if(!canvas) return;
  var ctx=canvas.getContext('2d');
  var CW=DM_CELL_W, CH=DM_CELL_H;
  var W=canvas.width, H=canvas.height;

  if(_dmBoardImgReady && _dmBoardImg && _dmBoardImg.complete){
    // ── IMAGE MODE: use the real HeroQuest board photo as background ──

    ctx.fillStyle='#100c07'; ctx.fillRect(0,0,W,H);

    // Scale image to fill canvas exactly — aspect ratio already matched by dmResizeCanvas
    ctx.drawImage(_dmBoardImg, 0, 0, W, H);

    // Subtle grid overlay using correct per-axis cell sizes
    ctx.strokeStyle='rgba(0,0,0,0.20)'; ctx.lineWidth=0.5;
    for(var gx=0;gx<=DM_COLS;gx++){ ctx.beginPath();ctx.moveTo(gx*CW,0);ctx.lineTo(gx*CW,H);ctx.stroke(); }
    for(var gy=0;gy<=DM_ROWS;gy++){ ctx.beginPath();ctx.moveTo(0,gy*CH);ctx.lineTo(W,gy*CH);ctx.stroke(); }

    // Design mode overlays
    if(dmState.designMode){
      if(dmState.baseMap && dmState.baseMap.length>0){
        dmState.baseMap.forEach(function(r){
          var rx=r.x*CW, ry=r.y*CH, rw=r.w*CW, rh=r.h*CH;
          ctx.fillStyle=r.floor; ctx.globalAlpha=0.45;
          ctx.fillRect(rx,ry,rw,rh); ctx.globalAlpha=1;
          ctx.strokeStyle='rgba(225,210,180,0.7)'; ctx.lineWidth=1.5;
          ctx.strokeRect(rx+1,ry+1,rw-2,rh-2);
        });
      }
      if(dmState.drawRoom.length>0){
        dmState.drawRoom.forEach(function(k){
          var p=k.split(','); var tx=parseInt(p[0]),ty=parseInt(p[1]);
          ctx.fillStyle=dmState.drawColor; ctx.globalAlpha=0.55;
          ctx.fillRect(tx*CW+1,ty*CH+1,CW-2,CH-2); ctx.globalAlpha=1;
        });
      }
    }

  } else {
    // ── FALLBACK: procedurally drawn rooms (no image) ──
    // In fallback mode CW == CH (square cells)

    ctx.fillStyle='#1e1810'; ctx.fillRect(0,0,W,H);

    ctx.strokeStyle='rgba(44,34,14,0.6)'; ctx.lineWidth=0.5;
    for(var cx=0;cx<=DM_COLS;cx++){ ctx.beginPath();ctx.moveTo(cx*CW,0);ctx.lineTo(cx*CW,H);ctx.stroke(); }
    for(var cy=0;cy<=DM_ROWS;cy++){ ctx.beginPath();ctx.moveTo(0,cy*CH);ctx.lineTo(W,cy*CH);ctx.stroke(); }

    ctx.fillStyle='#130f08';
    ctx.fillRect(0,0,W,CH); ctx.fillRect(0,H-CH,W,CH);
    ctx.fillRect(0,0,CW,H); ctx.fillRect(W-CW,0,CW,H);
    ctx.strokeStyle='rgba(180,130,25,0.85)'; ctx.lineWidth=2.5;
    ctx.strokeRect(CW,CH,(DM_COLS-2)*CW,(DM_ROWS-2)*CH);

    var bmap=getBaseMap();
    bmap.forEach(function(r){
      var rx=r.x*CW, ry=r.y*CH, rw=r.w*CW, rh=r.h*CH;
      ctx.fillStyle=r.floor; ctx.fillRect(rx,ry,rw,rh);
      for(var tx=r.x;tx<r.x+r.w;tx++){
        for(var ty=r.y;ty<r.y+r.h;ty++){
          var v=(Math.sin(tx*4.7+ty*9.1)*0.5+0.5)*0.16;
          ctx.fillStyle=r.tile; ctx.globalAlpha=0.4+v;
          ctx.fillRect(tx*CW+1,ty*CH+1,CW-2,CH-2); ctx.globalAlpha=1;
          ctx.strokeStyle=r.hi; ctx.lineWidth=0.4; ctx.globalAlpha=0.2+v*0.3;
          ctx.strokeRect(tx*CW+1.5,ty*CH+1.5,CW-3,CH-3); ctx.globalAlpha=1;
          if((tx*3+ty*7+tx*ty)%11===0){
            ctx.save(); ctx.strokeStyle='rgba(0,0,0,0.3)'; ctx.lineWidth=0.4;
            ctx.beginPath();
            ctx.moveTo(tx*CW+CW*0.2,ty*CH+CH*0.3); ctx.lineTo(tx*CW+CW*0.55,ty*CH+CH*0.65);
            ctx.moveTo(tx*CW+CW*0.5,ty*CH+CH*0.15); ctx.lineTo(tx*CW+CW*0.8,ty*CH+CH*0.5);
            ctx.stroke(); ctx.restore();
          }
        }
      }
      ctx.strokeStyle='rgba(225,210,180,0.9)'; ctx.lineWidth=2;
      ctx.strokeRect(rx+1,ry+1,rw-2,rh-2);
    });

    if(dmState.designMode && dmState.drawRoom.length>0){
      dmState.drawRoom.forEach(function(k){
        var p=k.split(','); var tx=parseInt(p[0]),ty=parseInt(p[1]);
        ctx.fillStyle=dmState.drawColor; ctx.globalAlpha=0.6;
        ctx.fillRect(tx*CW+1,ty*CH+1,CW-2,CH-2); ctx.globalAlpha=1;
      });
    }
  }

  // ── Shared: hover highlight ──────────────────────────
  if(dmState.hover){
    var hx=dmState.hover.x, hy=dmState.hover.y;
    ctx.fillStyle=dmState.designMode?'rgba(100,200,100,0.2)':'rgba(212,168,32,0.22)';
    ctx.fillRect(hx*CW+1,hy*CH+1,CW-2,CH-2);
    ctx.strokeStyle=dmState.designMode?'rgba(100,200,100,0.7)':'rgba(212,168,32,0.75)';
    ctx.lineWidth=1.5; ctx.strokeRect(hx*CW+1,hy*CH+1,CW-2,CH-2);
  }

  // ── Shared: highlight cells for a note badge click ───
  if(dmState._highlightNote){
    var hcells=dmCells();
    Object.keys(hcells).forEach(function(key){
      if(hcells[key]==='ref:'+dmState._highlightNote){
        var hp=key.split(','),hcx=parseInt(hp[0]),hcy=parseInt(hp[1]);
        ctx.fillStyle='rgba(255,200,40,0.35)'; ctx.fillRect(hcx*CW,hcy*CH,CW,CH);
        ctx.strokeStyle='rgba(255,200,40,0.9)'; ctx.lineWidth=2;
        ctx.strokeRect(hcx*CW+1,hcy*CH+1,CW-2,CH-2);
      }
    });
  }

  // ── Shared: draw tokens ──────────────────────────────
  if(!dmState.designMode){
    var cells=dmCells();
    Object.keys(cells).forEach(function(key){
      var p=key.split(','), cx2=parseInt(p[0]),cy2=parseInt(p[1]);
      var cellVal=cells[key];

      // Numbered ref note token (ref:N)
      if(typeof cellVal==='string' && cellVal.indexOf('ref:')===0){
        var noteNum=cellVal.slice(4);
        ctx.fillStyle='rgba(55,20,5,0.92)'; ctx.fillRect(cx2*CW+2,cy2*CH+2,CW-4,CH-4);
        ctx.strokeStyle='rgba(255,160,40,0.85)'; ctx.lineWidth=1.5;
        ctx.strokeRect(cx2*CW+2,cy2*CH+2,CW-4,CH-4);
        ctx.font='bold '+(Math.min(CW,CH)*0.55)+'px Cinzel,serif';
        ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.fillStyle='rgba(255,175,40,1)';
        ctx.fillText(noteNum, cx2*CW+CW/2, cy2*CH+CH/2);
        ctx.textAlign='left'; ctx.textBaseline='alphabetic';
        return;
      }

      // Wall token — fill entire cell as solid stone
      if(cellVal==='wall'){
        ctx.fillStyle='rgba(10,8,5,0.98)'; ctx.fillRect(cx2*CW,cy2*CH,CW,CH);
        ctx.strokeStyle='rgba(55,45,30,0.5)'; ctx.lineWidth=0.5;
        ctx.strokeRect(cx2*CW+CW*0.12,cy2*CH+CH*0.12,CW*0.76,CH*0.76);
        ctx.font=(Math.min(CW,CH)*0.58)+'px serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.fillText('🧱',cx2*CW+CW/2,cy2*CH+CH/2);
        ctx.textAlign='left'; ctx.textBaseline='alphabetic';
        return;
      }

      var tok=DM_TOKENS.find(function(t){return t.id===cellVal;}); if(!tok) return;
      ctx.fillStyle=tok.color; ctx.fillRect(cx2*CW+2,cy2*CH+2,CW-4,CH-4);
      ctx.strokeStyle='rgba(255,255,255,0.45)'; ctx.lineWidth=1;
      ctx.strokeRect(cx2*CW+2,cy2*CH+2,CW-4,CH-4);
      ctx.font=(Math.min(CW,CH)*0.62)+'px serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillStyle='white'; ctx.fillText(tok.emoji,cx2*CW+CW/2,cy2*CH+CH/2);
      ctx.textAlign='left'; ctx.textBaseline='alphabetic';
    });
  }
}

// ── QUEST NOTES ───────────────────────────────────────────────
function dmGetNotes(){
  var q=dmState.quests[dmState.questId];
  if(!q.notes) q.notes=[];
  return q.notes;
}

function dmNextNoteId(){
  var notes=dmGetNotes();
  var maxId=0;
  notes.forEach(function(n){ if(n.id>maxId) maxId=n.id; });
  return maxId+1;
}

function dmBuildNotesPanel(){
  var list=document.getElementById('dm-notes-list'); if(!list) return;

  // Update quest subtitle label
  var lbl=document.getElementById('dm-notes-quest-label');
  if(lbl) lbl.textContent=dmState.quests[dmState.questId].name||'';

  var notes=dmGetNotes();
  list.innerHTML='';

  if(notes.length===0){
    var empty=document.createElement('div');
    empty.className='dm-note-empty';
    empty.innerHTML='No notes yet.<br><strong>📋 Ref Note</strong> tile → auto-creates one<br>or use the button below.';
    list.appendChild(empty);
    return;
  }

  notes.forEach(function(n){
    var card=document.createElement('div');
    card.className='dm-note-card';

    var badge=document.createElement('div');
    badge.className='dm-note-badge';
    badge.textContent=n.id;
    badge.title='Click to locate on map';
    badge.onclick=function(){
      dmState._highlightNote=n.id; dmDraw();
      setTimeout(function(){ dmState._highlightNote=null; dmDraw(); },1400);
    };

    var ta=document.createElement('textarea');
    ta.className='dm-note-ta';
    ta.id='dm-note-text-'+n.id;
    ta.value=n.text||'';
    ta.placeholder='Note '+n.id+'…';
    ta.rows=3;
    ta.oninput=function(){
      n.text=ta.value;
      clearTimeout(ta._st);
      ta._st=setTimeout(function(){ saveLocal(); },1200);
    };

    var del=document.createElement('button');
    del.className='dm-note-del';
    del.textContent='✕';
    del.title='Delete note';
    del.onclick=function(){
      var q=dmState.quests[dmState.questId];
      q.notes=q.notes.filter(function(x){return x.id!==n.id;});
      dmBuildNotesPanel();
      saveLocal();
    };

    card.appendChild(badge); card.appendChild(ta); card.appendChild(del);
    list.appendChild(card);
  });
}

// ── PALETTE ───────────────────────────────────────────────────
function dmBuildPalette(){
  var p=document.getElementById('dm-palette'); if(!p) return;
  p.innerHTML='<span style="font-family:Cinzel,serif;font-size:.5rem;letter-spacing:.12em;text-transform:uppercase;color:var(--text-dim);margin-right:.4rem;white-space:nowrap;">Place:</span>';
  Object.keys(DM_CATS).forEach(function(cat){
    var grp=document.createElement('div');
    grp.style.cssText='display:flex;flex-direction:column;gap:.12rem;padding:.2rem .35rem;border-left:2px solid '+DM_CAT_COLORS[cat]+';margin-right:.3rem;';
    var lbl=document.createElement('span');
    lbl.style.cssText='font-family:Cinzel,serif;font-size:.42rem;letter-spacing:.1em;text-transform:uppercase;color:var(--text-dim);white-space:nowrap;';
    lbl.textContent=DM_CAT_NAMES[cat]; grp.appendChild(lbl);
    var row=document.createElement('div'); row.style.cssText='display:flex;gap:.18rem;flex-wrap:wrap;';
    DM_CATS[cat].forEach(function(tid){
      var tok=DM_TOKENS.find(function(t){return t.id===tid;}); if(!tok) return;
      var btn=document.createElement('button');
      btn.title=tok.label; btn.textContent=tok.emoji; btn.setAttribute('data-tid',tok.id);
      btn.style.cssText='width:30px;height:30px;border-radius:3px;border:1.5px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.5);cursor:pointer;font-size:1rem;line-height:1;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .15s;padding:0;';
      btn.onclick=function(e){
        e.stopPropagation(); dmState.eraser=false; dmState.sel=tok.id;
        document.querySelectorAll('[data-tid]').forEach(function(b){b.style.borderColor='rgba(255,255,255,0.15)';b.style.background='rgba(0,0,0,0.5)';});
        btn.style.borderColor=DM_CAT_COLORS[cat]; btn.style.background=tok.color.replace('0.85','0.4');
        var eb=document.getElementById('dm-eraser-btn'); if(eb) eb.style.borderColor='var(--border-hi)';
        var st=document.getElementById('dm-status'); if(st) st.textContent='Placing: '+tok.label+' — click cells. Right-click to erase.';
      };
      row.appendChild(btn);
    });
    grp.appendChild(row); p.appendChild(grp);
  });
}

// ── DESIGN MODE ───────────────────────────────────────────────
function dmToggleDesign(){
  dmState.designMode=!dmState.designMode;
  dmState.drawRoom=[];
  var btn=document.getElementById('dm-design-btn');
  var palette=document.getElementById('dm-palette');
  var designPanel=document.getElementById('dm-design-panel');
  if(btn){
    btn.textContent=dmState.designMode?'✓ Exit Design Mode':'✏ Design Base Map';
    btn.style.borderColor=dmState.designMode?'var(--green-hi)':'var(--border-hi)';
  }
  if(palette) palette.style.display=dmState.designMode?'none':'flex';
  if(designPanel) designPanel.style.display=dmState.designMode?'flex':'none';
  var st=document.getElementById('dm-status');
  if(st) st.textContent=dmState.designMode?'Design mode: click+drag to paint a room, then click "Add Room". Right-click to erase a room cell.':'';
  dmDraw();
}

function dmAddRoom(){
  if(dmState.drawRoom.length===0){ notify('Paint some cells first'); return; }
  var cells=dmState.drawRoom;
  var xs=cells.map(function(k){return parseInt(k.split(',')[0]);});
  var ys=cells.map(function(k){return parseInt(k.split(',')[1]);});
  var minX=Math.min.apply(null,xs), minY=Math.min.apply(null,ys);
  var maxX=Math.max.apply(null,xs), maxY=Math.max.apply(null,ys);
  var w=maxX-minX+1, h=maxY-minY+1;
  var c=dmState.drawColor;
  var newRoom={x:minX,y:minY,w:w,h:h,floor:c,tile:c,hi:lightenHex(c,40)};
  if(!dmState.baseMap) dmState.baseMap=[];
  dmState.baseMap.push(newRoom);
  dmState.drawRoom=[];
  notify('Room added ('+w+'x'+h+')');
  dmDraw();
}

function dmEraseRoom(x,y){
  if(!dmState.baseMap) dmState.baseMap=[];
  dmState.baseMap=dmState.baseMap.filter(function(r){
    return !(x>=r.x&&x<r.x+r.w&&y>=r.y&&y<r.y+r.h);
  });
  dmDraw();
}

function dmResetBaseMap(){
  dmState.baseMap=null; S.dmBaseMap=null; dmDraw(); notify('Base map reset to default');
}

function dmClearBaseMap(){
  dmState.baseMap=[]; S.dmBaseMap=[]; dmDraw(); notify('Base map cleared — paint your rooms');
}

function lightenHex(hex,amount){
  var r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
  r=Math.min(255,r+amount); g=Math.min(255,g+amount); b=Math.min(255,b+amount);
  return '#'+r.toString(16).padStart(2,'0')+g.toString(16).padStart(2,'0')+b.toString(16).padStart(2,'0');
}

// ── QUEST SELECTOR ─────────────────────────────────────────────
function dmBuildQuestSel(){
  var sel=document.getElementById('dm-quest-sel'); if(!sel) return;
  sel.innerHTML='';
  Object.keys(dmState.quests).forEach(function(k){
    var o=document.createElement('option'); o.value=k; o.textContent=dmState.quests[k].name;
    if(k===dmState.questId) o.selected=true; sel.appendChild(o);
  });
  sel.onchange=function(){ dmState.questId=this.value; dmDraw(); dmBuildNotesPanel(); };
}

// ── INPUT HANDLING ─────────────────────────────────────────────
function dmWireEvents(){
  var canvas=document.getElementById('dm-canvas'); if(!canvas) return;

  function getCell(e){
    var rect=canvas.getBoundingClientRect();
    var scX=canvas.width/rect.width, scY=canvas.height/rect.height;
    var cx=(e.touches&&e.touches[0]?e.touches[0].clientX:e.clientX);
    var cy=(e.touches&&e.touches[0]?e.touches[0].clientY:e.clientY);
    return {
      x:Math.max(0,Math.min(DM_COLS-1,Math.floor((cx-rect.left)*scX/DM_CELL_W))),
      y:Math.max(0,Math.min(DM_ROWS-1,Math.floor((cy-rect.top)*scY/DM_CELL_H)))
    };
  }

  var _justDown=false;

  function act(e, rightClick){
    var cell=getCell(e), key=cell.x+','+cell.y;
    if(dmState.designMode){
      if(rightClick||dmState.eraser){
        dmState.drawRoom=dmState.drawRoom.filter(function(k){return k!==key;});
        dmEraseRoom(cell.x,cell.y);
        dmDraw();
      } else {
        if(dmState.drawRoom.indexOf(key)===-1) dmState.drawRoom.push(key);
        dmDraw();
      }
    } else {
      var cells=dmCells();
      if(rightClick||dmState.eraser){
        delete cells[key];
      } else if(dmState.sel==='ref'){
        // Only create a new ref note on fresh click on an empty cell
        if(_justDown && !cells[key]){
          var noteId=dmNextNoteId();
          dmGetNotes().push({id:noteId, text:''});
          cells[key]='ref:'+noteId;
          dmBuildNotesPanel();
          setTimeout(function(){
            var ta=document.getElementById('dm-note-text-'+noteId);
            if(ta){ ta.focus(); ta.scrollIntoView({behavior:'smooth',block:'nearest'}); }
            var panel=document.getElementById('dm-notes-panel');
            if(panel) panel.scrollTop=panel.scrollHeight;
          }, 60);
        }
      } else if(dmState.sel){
        cells[key]=dmState.sel;
      }
      dmDraw();
    }
  }

  var down=false;
  canvas.addEventListener('mousedown',function(e){ down=true; _justDown=true; act(e,e.button===2); _justDown=false; });
  canvas.addEventListener('mousemove',function(e){
    dmState.hover=getCell(e); dmDraw(); if(down) act(e,false);
  });
  canvas.addEventListener('mouseup',function(){ down=false; });
  document.addEventListener('mouseup',function(){ down=false; });
  canvas.addEventListener('mouseleave',function(){ dmState.hover=null; dmDraw(); });
  canvas.addEventListener('contextmenu',function(e){ e.preventDefault(); act(e,true); });
  canvas.addEventListener('touchstart',function(e){ e.preventDefault(); _justDown=true; act(e,false); _justDown=false; },{passive:false});
  canvas.addEventListener('touchmove',function(e){ e.preventDefault(); act(e,false); },{passive:false});

  // Button wiring
  var sv=document.getElementById('dm-save-map'); if(sv) sv.onclick=dmSave;
  var cl=document.getElementById('dm-clear-map');
  if(cl) cl.onclick=function(){ dmState.quests[dmState.questId].cells={}; dmDraw(); notify('Tokens cleared'); };
  var er=document.getElementById('dm-eraser-btn');
  if(er) er.onclick=function(){
    dmState.eraser=!dmState.eraser; dmState.sel=null;
    document.querySelectorAll('[data-tid]').forEach(function(b){b.style.borderColor='rgba(255,255,255,0.15)';b.style.background='rgba(0,0,0,0.5)';});
    er.style.borderColor=dmState.eraser?'var(--teal-hi)':'var(--border-hi)';
    var st=document.getElementById('dm-status'); if(st) st.textContent=dmState.eraser?'Eraser on — click to remove':'';
  };
  var nb=document.getElementById('dm-new-quest');
  if(nb) nb.onclick=function(){ var n=prompt('Quest map name:'); if(!n) return; var id='q-'+Date.now(); dmState.quests[id]={name:n,cells:{},notes:[]}; dmState.questId=id; dmBuildQuestSel(); dmBuildNotesPanel(); dmDraw(); };
  var anb=document.getElementById('dm-add-note-btn');
  if(anb) anb.onclick=function(){
    var noteId=dmNextNoteId();
    dmGetNotes().push({id:noteId, text:''});
    dmBuildNotesPanel();
    saveLocal();
    setTimeout(function(){
      var ta=document.getElementById('dm-note-text-'+noteId);
      if(ta){ ta.focus(); ta.scrollIntoView({behavior:'smooth',block:'nearest'}); }
      var panel=document.getElementById('dm-notes-panel');
      if(panel) panel.scrollTop=panel.scrollHeight;
    }, 40);
  };
  var pb=document.getElementById('dm-toggle-legend');
  if(pb) pb.onclick=function(){ var p=document.getElementById('dm-palette'); if(p) p.style.display=(p.style.display==='none'?'flex':'none'); };
  var db=document.getElementById('dm-design-btn'); if(db) db.onclick=dmToggleDesign;
  var ab=document.getElementById('dm-add-room-btn'); if(ab) ab.onclick=dmAddRoom;
  var rb=document.getElementById('dm-reset-base-btn'); if(rb) rb.onclick=dmResetBaseMap;
  var cb2=document.getElementById('dm-clear-base-btn'); if(cb2) cb2.onclick=dmClearBaseMap;
  var gsBtn=document.getElementById('dm-grid-size-btn');
  if(gsBtn) gsBtn.onclick=function(){
    var c=parseInt(document.getElementById('dm-cols-inp').value)||26;
    var r=parseInt(document.getElementById('dm-rows-inp').value)||19;
    setGridSize(c,r);
  };
  var cp=document.getElementById('dm-color-pick');
  if(cp) cp.oninput=function(){ dmState.drawColor=this.value; };
  document.querySelectorAll('[data-roomcolor]').forEach(function(btn){
    btn.onclick=function(){ dmState.drawColor=this.getAttribute('data-roomcolor'); if(cp) cp.value=dmState.drawColor; };
  });
  window._dmResizeHandler=function(){ dmResizeCanvas(); dmDraw(); };
  window.removeEventListener('resize', window._dmResizeHandler);
  window.addEventListener('resize', window._dmResizeHandler);
}

// ── MAIN RENDER ────────────────────────────────────────────────
function renderDungeonMap(){
  initDMState();
  dmBuildPalette(); dmBuildQuestSel(); dmBuildNotesPanel(); dmWireEvents();
  setTimeout(function(){
    dmResizeCanvas();
    dmDraw();
  }, 50);
}

function dmResizeCanvas(){
  var wrap=document.getElementById('dm-grid-wrap');
  var canvas=document.getElementById('dm-canvas');
  if(!canvas) return;
  var avail=0;
  // Use the dungeon section width minus the notes panel width and gaps
  var section=document.getElementById('tab-dungeon');
  if(section) avail=section.clientWidth;
  var notesPanel=document.getElementById('dm-notes-panel');
  if(notesPanel && notesPanel.offsetWidth) avail=avail-notesPanel.offsetWidth-14; // 14 = gap
  if(avail<=0 && wrap && wrap.parentElement) avail=wrap.parentElement.clientWidth;
  if(avail<=0 && wrap) avail=wrap.clientWidth;
  if(avail<=0) avail=window.innerWidth||800;
  avail=Math.min(avail, 960);

  // Width-based cell size (capped 24–36px)
  DM_CELL_W=Math.max(24,Math.min(36,Math.floor(avail/DM_COLS)));

  // Height: derived from image aspect ratio so the board image always fits perfectly
  if(_dmBoardImgReady && _dmBoardImg && _dmBoardImg.naturalWidth){
    var imgRatio=_dmBoardImg.naturalHeight/_dmBoardImg.naturalWidth;
    DM_CELL_H=(DM_CELL_W*DM_COLS*imgRatio)/DM_ROWS;
  } else {
    DM_CELL_H=DM_CELL_W; // square cells when no image
  }

  DM_CELL=DM_CELL_W; // keep legacy compat
  canvas.width=Math.round(DM_COLS*DM_CELL_W);
  canvas.height=Math.round(DM_ROWS*DM_CELL_H);
  canvas.style.width=canvas.width+'px';
  canvas.style.height=canvas.height+'px';
}
