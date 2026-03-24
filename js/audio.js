
var HQAudio = (function(){

  // ── State ──────────────────────────────────────────────
  var actx = null;
  var masterGain = null;
  var muted = false;
  var volume = 0.7;
  var currentMode = null;
  var sfxEnabled = true;

  // ── Web Audio context (lazy) ────────────────────────────
  function getCtx(){
    if(!actx){
      actx = new (window.AudioContext||window.webkitAudioContext)();
      masterGain = actx.createGain();
      masterGain.gain.value = volume;
      masterGain.connect(actx.destination);
    }
    if(actx.state==='suspended') actx.resume();
    return actx;
  }

  // ── Local file playlists ────────────────────────────────
  var PLAYLISTS = {
    rest: [
      'audio/rest/Medieval Background (Loop).wav',
      'audio/rest/Medieval Catchy Tavern Adventure (Loop C).wav'
    ],
    combat: [
      'audio/combat/Epic Fantasy Choir and Orchestra.mp3',
      'audio/combat/Heroic Demise (No Choir).mp3',
      'audio/combat/Heroic Demise (With Choir).mp3',
      'audio/combat/Honor.wav'
    ]
  };

  var _audioEl = null;
  var _playlist = [];
  var _trackIdx = 0;

  function getAudioEl(){
    if(!_audioEl){
      _audioEl = new Audio();
      _audioEl.volume = volume;
      _audioEl.addEventListener('ended', function(){
        _trackIdx = (_trackIdx + 1) % _playlist.length;
        playTrack(_trackIdx);
      });
    }
    return _audioEl;
  }

  function playTrack(idx){
    var el = getAudioEl();
    _trackIdx = idx;
    el.src = _playlist[idx];
    el.play().catch(function(){});
    updateNowPlaying();
  }

  function updateNowPlaying(){
    var bar = document.getElementById('hq-now-playing');
    if(!bar) return;
    if(!currentMode || !_playlist.length){ bar.textContent=''; bar.style.opacity='0'; return; }
    var name = (_playlist[_trackIdx]||'').split('/').pop().replace(/\.[^.]+$/,'');
    bar.textContent = (currentMode==='rest' ? '♪ ' : '⚔ ') + name;
    bar.style.opacity = '1';
  }

  // ── One-shot SFX (Web Audio — instant, no CDN latency) ─────────────────

  // Quick helpers
  function osc(freq, t, dur, gain, type){
    var c=getCtx(), o=c.createOscillator(), g=c.createGain();
    o.type=type||'sine'; o.frequency.value=freq;
    g.gain.setValueAtTime(0.0001,t);
    g.gain.linearRampToValueAtTime(gain,t+0.006);
    g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    o.connect(g); g.connect(masterGain);
    o.start(t); o.stop(t+dur+0.05);
  }

  function nb(t, dur, gain, lp, hp){
    var c=getCtx(), len=Math.ceil(c.sampleRate*dur);
    var buf=c.createBuffer(1,len,c.sampleRate);
    var d=buf.getChannelData(0); for(var i=0;i<len;i++) d[i]=Math.random()*2-1;
    var src=c.createBufferSource(); src.buffer=buf;
    var chain=src;
    if(lp){var f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=lp;chain.connect(f);chain=f;}
    if(hp){var f2=c.createBiquadFilter();f2.type='highpass';f2.frequency.value=hp;chain.connect(f2);chain=f2;}
    var g=c.createGain();
    g.gain.setValueAtTime(gain,t);
    g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    chain.connect(g); g.connect(masterGain);
    src.start(t); src.stop(t+dur+0.05);
  }

  // ── Button click: solid wooden board knock ──────────────────────────────
  function sfxClick(){
    if(muted||!sfxEnabled) return;
    try{
      var c=getCtx(), t=c.currentTime;
      // Low thud body
      osc(110,t,0.08,0.22,'sine');
      osc(180,t,0.05,0.10,'sine');
      // Noise attack
      nb(t,0.018,0.4,700,90);
      nb(t+0.005,0.045,0.18,400,60);
      // Thin high click
      nb(t,0.01,0.3,8000,2500);
    }catch(e){}
  }

  // ── Coins: bright metallic jingle ──────────────────────────────────────
  function sfxCoins(){
    if(muted||!sfxEnabled) return;
    try{
      var c=getCtx(), t=c.currentTime;
      var count=5+Math.floor(Math.random()*5);
      for(var i=0;i<count;i++){
        var td=t+i*(0.038+Math.random()*0.05);
        var f=1600+Math.random()*1400;
        // Bell spectrum (coin = inharmonic series)
        [1,2.76,5.4].forEach(function(p,j){
          osc(f*p, td, 0.28-j*0.06, (0.2-j*0.05)*(0.6+Math.random()*0.5), 'sine');
        });
        nb(td, 0.014, 0.25, 10000, 3000);
      }
      // Scatter shimmer
      nb(t, 0.5, 0.05, 12000, 5000);
    }catch(e){}
  }

  // ── Door creak: resonant wood squeal ───────────────────────────────────
  function sfxDoor(){
    if(muted||!sfxEnabled) return;
    try{
      var c=getCtx(), t=c.currentTime;
      var o=c.createOscillator();
      var dst=c.createWaveShaper();
      var cv=new Float32Array(512);
      for(var i=0;i<512;i++){var x=i*2/512-1; cv[i]=(3*x*x-x)/(Math.PI+280*Math.abs(x)+1);}
      dst.curve=cv;
      var bp=c.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=620; bp.Q.value=6;
      var g=c.createGain();
      o.type='sawtooth';
      o.frequency.setValueAtTime(50,t);
      o.frequency.linearRampToValueAtTime(44,t+0.35);
      o.frequency.linearRampToValueAtTime(72,t+0.8);
      o.frequency.linearRampToValueAtTime(58,t+1.2);
      o.frequency.linearRampToValueAtTime(66,t+1.55);
      o.frequency.linearRampToValueAtTime(48,t+1.9);
      g.gain.setValueAtTime(0.0001,t);
      g.gain.linearRampToValueAtTime(0.3,t+0.1);
      g.gain.setValueAtTime(0.28,t+1.7);
      g.gain.exponentialRampToValueAtTime(0.0001,t+2.05);
      o.connect(dst); dst.connect(bp); bp.connect(g); g.connect(masterGain);
      o.start(t); o.stop(t+2.1);
      nb(t+0.05,1.6,0.06,500,70);
      // Latch clunk
      nb(t+1.9,0.055,0.32,700,80);
      osc(90,t+1.9,0.1,0.2,'sine');
    }catch(e){}
  }

  // ── Welcome chime: bell arpeggio after door ─────────────────────────────
  function sfxWelcome(){
    if(muted||!sfxEnabled) return;
    try{
      var c=getCtx(), t=c.currentTime+2.2;
      // G major arp with bell timbre
      [392,494,587,784].forEach(function(f,i){
        var td=t+i*0.2;
        osc(f,td,0.65-i*0.06,0.18-i*0.02,'sine');
        osc(f*2,td,0.38,0.07,'sine');
        osc(f*3.01,td,0.2,0.025,'sine');
        nb(td,0.015,0.12-i*0.02,9000,2500);
      });
    }catch(e){}
  }

  // ── Ambience control ────────────────────────────────────────────────────
  function startRest(){
    stopAll();
    currentMode = 'rest';
    _playlist = PLAYLISTS.rest.slice();
    _trackIdx = 0;
    playTrack(0);
  }

  function startCombat(){
    stopAll();
    currentMode = 'combat';
    _playlist = PLAYLISTS.combat.slice();
    _trackIdx = 0;
    playTrack(0);
  }

  function stopAll(){
    if(_audioEl){ _audioEl.pause(); _audioEl.src = ''; }
    currentMode = null;
    _playlist = [];
    _trackIdx = 0;
    updateNowPlaying();
  }

  // ── Volume ───────────────────────────────────────────────────────────────
  function setVol(v){
    volume = v;
    sfxEnabled = v > 0;
    muted = v === 0;
    if(masterGain) masterGain.gain.setTargetAtTime(v, getCtx().currentTime, 0.05);
    if(_audioEl) _audioEl.volume = muted ? 0 : v;
  }

  // ── Public API ───────────────────────────────────────────────────────────
  return {
    click:   sfxClick,
    coins:   sfxCoins,
    shop:    function(){ sfxDoor(); sfxWelcome(); },
    setVol:  setVol,
    setMode: function(m){ if(m==='rest') startRest(); else startCombat(); },
    stop:    stopAll,
  };

})();

// ── MODE BUTTON + VOLUME WIRING ────────────────────────────────────────────
window.addEventListener('load', function(){
  var slider  = document.getElementById('volSlider');
  var volIcon = document.getElementById('volIcon');
  if(slider){
    slider.oninput = function(){
      var v = parseFloat(this.value);
      this.style.background = 'linear-gradient(to right,var(--gold-hi) 0%,var(--gold-hi) '+(v*100)+'%,var(--border-hi) '+(v*100)+'%)';
      HQAudio.setVol(v);
      if(volIcon) volIcon.textContent = v===0 ? '\uD83D\uDD07' : v<0.4 ? '\uD83D\uDD08' : '\uD83D\uDD0A';
    };
  }
  if(volIcon){
    volIcon.onclick = function(){
      if(slider){
        var m = slider.value !== '0';
        slider.value = m ? 0 : 0.7;
        slider.dispatchEvent(new Event('input'));
      }
    };
  }
  var modeBtn  = document.getElementById('modeBtn');
  var modeIcon = document.getElementById('modeIcon');
  var modeLbl  = document.getElementById('modeLbl');
  if(modeBtn){
    modeBtn.onclick = function(){
      var isRest = modeBtn.classList.contains('rest');
      if(isRest){
        modeBtn.classList.remove('rest'); modeBtn.classList.add('combat');
        if(modeIcon) modeIcon.textContent = '\u2694';
        if(modeLbl)  modeLbl.textContent  = 'In Combat';
        HQAudio.setMode('combat');
        notify('\u2694 Combat — battle music starting');
      } else {
        modeBtn.classList.remove('combat'); modeBtn.classList.add('rest');
        if(modeIcon) modeIcon.textContent = '\uD83C\uDFE8';
        if(modeLbl)  modeLbl.textContent  = 'Rest Scene';
        HQAudio.setMode('rest');
        notify('\uD83C\uDFE8 Rest Scene — tavern ambience starting');
      }
    };
  }
});


document.addEventListener('click', function(e){
  var btn = e.target.closest('.btn, .hero-level-btn, .pip, .tpip, .sebtn, .d20row, .varea, .tab');
  if(btn && !btn.id.match(/^goldAdd|^goldSpend|^modeBtn/)){
    HQAudio.click();
  }
}, true); // capture phase so it fires before other handlers


// ══════════════════════════════════════════════════════════════
// HEROQUEST DUNGEON MAP SYSTEM
// 26×19 grid matching the actual HeroQuest board
// ══════════════════════════════════════════════════════════════
// HEROQUEST DUNGEON MAP SYSTEM v2 — Accurate coloured board
// ══════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════
// HEROQUEST DUNGEON MAP SYSTEM v3
// 26x19 grid with design mode + per-quest token placement
// ══════════════════════════════════════════════════════════════
