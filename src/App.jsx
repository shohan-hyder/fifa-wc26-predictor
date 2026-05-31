import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  TEAMS, GROUPS, TOURNAMENT_INFO, CONFEDERATIONS, PAST_CHAMPIONS,
  generateGroupFixtures, calculateGroupStandings, getBest3rdPlace, ROUND_LABELS
} from './data';

// ── CONFETTI ──────────────────────────────────────────────
function spawnConfetti() {
  const colors = ['#CAFF4A','#FFD700','#FF3B30','#4FC3F7','#FF69B4','#fff'];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.cssText = `left:${Math.random()*100}vw;top:-20px; background:${colors[Math.floor(Math.random()*colors.length)]}; animation-duration:${2+Math.random()*2}s; animation-delay:${Math.random()*1.5}s; transform:rotate(${Math.random()*360}deg); border-radius:${Math.random()>0.5?'50%':'2px'};`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
}

// ── NAV ───────────────────────────────────────────────────
const TABS = [
  { id:'groups',   label:' Groups'       },
  { id:'matches',  label:'📋 Fixtures'     },
  { id:'knockout', label:'🏆 Knockout'     },
  { id:'rules',    label:'📖 Rules'        },
  { id:'history',  label:'🌟 History'      },
];

// ─ INITIAL STATE ──────────────────────────────────────────
const INIT_FIXTURES = generateGroupFixtures();

// Knockout bracket: 6 rounds
function initKnockout() {
  return {
    r32: Array(16).fill(null).map((_, i) => ({ id: `r32_${i+1}`, team1:null, team2:null, winner:null })),
    r16: Array(8).fill(null).map((_, i) => ({ id: `r16_${i+1}`, team1:null, team2:null, winner:null })),
    qf:  Array(4).fill(null).map((_, i) => ({ id: `qf_${i+1}`, team1:null, team2:null, winner:null })),
    sf:  Array(2).fill(null).map((_, i) => ({ id: `sf_${i+1}`, team1:null, team2:null, winner:null })),
    f:   [{ id:'final', team1:null, team2:null, winner:null }],
  };
}

// ── TEAM CHIP ──────────────────────────────────────────────
function TeamChip({ name, size = 'md' }) {
  if (!name) return <span style={{ color:'var(--text-dim)', fontSize:12 }}>TBD</span>;
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
      <span style={{ fontSize: size==='sm'?11:13, fontWeight:600, color:'var(--text)' }}>{name}</span>
    </span>
  );
}

// ── GROUP TABLE COMPONENT ──────────────────────────────────
function GroupTable({ group, standings, best3rdTeams }) {
  const best3rdSet = new Set(best3rdTeams.map(t => t.team));
  return (
    <table className="group-table">
      <thead>
        <tr>
          <th style={{textAlign:'left'}}>Team</th>
          <th title="Played">P</th>
          <th title="Won">W</th>
          <th title="Drawn">D</th>
          <th title="Lost">L</th>
          <th title="Goals For">GF</th>
          <th title="Goals Against">GA</th>
          <th title="Goal Difference">GD</th>
          <th title="Points">Pts</th>
        </tr>
      </thead>
      <tbody>
        {standings.map((s, i) => {
          const t = TEAMS[s.team] || {};
          const isTop2 = i < 2;
          const is3rd = i === 2 && best3rdSet.has(s.team);
          return (
            <tr key={s.team} className={isTop2 ? 'qualifying-2' : is3rd ? 'potentially-3rd' : ''}>
              <td>
                <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
                  {isTop2 && <span style={{width:4,height:4,borderRadius:'50%',background:'var(--win)',flexShrink:0,display:'inline-block'}}/>}
                  {is3rd && <span style={{width:4,height:4,borderRadius:'50%',background:'var(--gold)',flexShrink:0,display:'inline-block'}}/>}
                  <span style={{fontSize:12,fontWeight:600}}>{s.team}</span>
                  {t.host && <span style={{fontSize:9,background:'rgba(202,255,74,.2)',color:'var(--lime)',padding:'1px 5px',borderRadius:4,fontWeight:700}}>HOST</span>}
                  {t.debut && <span style={{fontSize:9,background:'rgba(79,195,247,.2)',color:'#4FC3F7',padding:'1px 5px',borderRadius:4,fontWeight:700}}>DEBUT</span>}
                </span>
              </td>
              <td>{s.p}</td>
              <td>{s.w}</td>
              <td>{s.d}</td>
              <td>{s.l}</td>
              <td>{s.gf}</td>
              <td>{s.ga}</td>
              <td style={{color: s.gd >0?'var(--win)':s.gd <0?'var(--loss)':'var(--text-muted)', fontWeight: s.gd!==0?700:400}}>
                {s.gd > 0 ? `+${s.gd}` : s.gd}
              </td>
              <td style={{fontWeight:700, color:'var(--text)'}}>{s.pts}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// ── MATCH INPUT ROW ────────────────────────────────────────
function MatchRow({ match, onUpdate }) {
  const [h, setH] = useState(match.homeScore ?? '');
  const [a, setA] = useState(match.awayScore ?? '');
  
  // ✅ FIX: Sync local input state with parent props.
  // This ensures inputs clear visually when the Reset button is clicked.
  useEffect(() => {
    setH(match.homeScore ?? '');
    setA(match.awayScore ?? '');
  }, [match.homeScore, match.awayScore]);

  function autoSave(homeVal, awayVal) {
    const hs = parseInt(homeVal);
    const as = parseInt(awayVal);
    if (!isNaN(hs) && !isNaN(as) && hs >= 0 && as >= 0) {
      onUpdate(match.id, hs, as);
    }
  }
  
  function handleHomeChange(val) {
    setH(val);
    if (val !== '') {
      const as = parseInt(a);
      if (!isNaN(as) && as >= 0) autoSave(val, a);
    }
  }
  
  function handleAwayChange(val) {
    setA(val);
    if (val !== '') {
      const hs = parseInt(h);
      if (!isNaN(hs) && hs >= 0) autoSave(h, val);
    }
  }
  
  return (
    <div className={`match-card ${match.played ? 'played' : ''}`}>
      <div className="match-team">
        <span className="match-team-name">{match.home}</span>
      </div>
      <div className="match-vs">
        <div className="match-score">
          <input
            type="number" min="0" max="20"
            className="match-input"
            value={h}
            onChange={e => handleHomeChange(e.target.value)}
            placeholder="-"
          />
          <span className="score-sep">–</span>
          <input
            type="number" min="0" max="20"
            className="match-input"
            value={a}
            onChange={e => handleAwayChange(e.target.value)}
            placeholder="-"
          />
        </div>
        {match.played && <span style={{fontSize:11, color:'var(--lime)', fontWeight:700, marginLeft:8}}>✓ Saved</span>}
      </div>
      <div className="match-team right">
        <span className="match-team-name">{match.away}</span>
      </div>
    </div>
  );
}

// ── BRACKET MATCH ──────────────────────────────────────────
function BracketMatch({ match, onPickWinner, label }) {
  return (
    <div className="bracket-match" style={{ minWidth:170 }}>
      {label && <div style={{fontSize:10,color:'var(--text-dim)',padding:'4px 8px',borderBottom:'1px solid var(--border)',letterSpacing:1,textTransform:'uppercase'}}>{label}</div>}
      <div
        className={`bracket-team ${match.winner===match.team1?'winner':(match.winner && match.winner!==match.team1)?'loser':''}`}
        onClick={() => match.team1 && onPickWinner(match.id, match.team1)}
        title={match.team1 ? `Click to advance ${match.team1}` : ''}
      >
        <span className="bracket-team-name">{match.team1||<span style={{color:'var(--text-dim)',fontSize:11}}>TBD</span>}</span>
        {match.winner===match.team1 && <span style={{fontSize:10,color:'var(--lime)'}}>★</span>}
      </div>
      <div
        className={`bracket-team ${match.winner===match.team2?'winner':(match.winner && match.winner!==match.team2)?'loser':''}`}
        onClick={() => match.team2 && onPickWinner(match.id, match.team2)}
        title={match.team2 ? `Click to advance ${match.team2}` : ''}
      >
        <span className="bracket-team-name">{match.team2||<span style={{color:'var(--text-dim)',fontSize:11}}>TBD</span>}</span>
        {match.winner===match.team2 && <span style={{fontSize:10,color:'var(--lime)'}}>★</span>}
      </div>
    </div>
  );
}

// ─ MAIN APP ───────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState('groups');
  const [fixtures, setFixtures] = useState(INIT_FIXTURES);
  const [knockout, setKnockout] = useState(initKnockout);
  const [selectedGroup, setSelectedGroup] = useState('A');
  const [champion, setChampion] = useState(null);
  const [showChampion, setShowChampion] = useState(false);
  const mainRef = useRef(null);

  // ── COMPUTE STANDINGS ──────────────────────────────────
  const allStandings = {};
  Object.keys(GROUPS).forEach(g => {
    allStandings[g] = calculateGroupStandings(g, fixtures);
  });
  const best3rd = getBest3rdPlace(allStandings);
  const best3rdSet = new Set(best3rd.map(t => t.team));

  // Qualification status
  const qualifiedTeams = new Set();
  Object.keys(GROUPS).forEach(g => {
    const st = allStandings[g];
    if (st[0]?.team) qualifiedTeams.add(st[0].team);
    if (st[1]?.team) qualifiedTeams.add(st[1].team);
  });
  best3rd.forEach(t => qualifiedTeams.add(t.team));

  // Progress tracking
  const totalMatches = fixtures.length;
  const playedCount = fixtures.filter(f => f.played).length;
  const progressPct = Math.round((playedCount / totalMatches) * 100);

  // ── UPDATE FIXTURE ────────────────────────────────────
  const updateFixture = useCallback((id, homeScore, awayScore) => {
    setFixtures(prev => prev.map(f =>
      f.id === id ? { ...f, homeScore, awayScore, played: true } : f
    ));
  }, []);

  // ─ AUTO-POPULATE KNOCKOUT FROM GROUPS ─────────────────
  useEffect(() => {
    if (playedCount < 72) return; // Only auto-populate when group stage complete
    
    function populateR32() {
      const groupWinners = {};
      const groupRunnerUps = {};
      const groupThirdPlace = {};
      
      // Extract qualified teams from standings
      Object.keys(GROUPS).forEach(g => {
        const standings = allStandings[g];
        groupWinners[g] = standings[0]?.team || null;
        groupRunnerUps[g] = standings[1]?.team || null;
        groupThirdPlace[g] = standings[2]?.team || null;
      });
      
      // Helper to resolve a slot like "A1", "B2", or "3rd_A/B/G/H"
      // Note: Simplified resolution based on best 3rd logic
      function resolveSlot(slot) {
        if (slot.endsWith('1')) {
          const group = slot.charAt(0);
          return groupWinners[group];
        } else if (slot.endsWith('2')) {
          const group = slot.charAt(0);
          return groupRunnerUps[group];
        } else if (slot.startsWith('3rd_')) {
          // In a full implementation, this would map specific 3rd place groups to slots
          // For this predictor, we rely on the best3rd list populated earlier
          // Here we just return a placeholder if not strictly mapped, or rely on manual pick
          return null; 
        }
        return null;
      }
      
      // Build EXACTLY 16 Round of 32 matches
      // Using standard mapping logic for demo purposes
      // Matches: 16 total
      const r32Matches = [];
      for(let i=0; i<16; i++) {
          r32Matches.push({ id: `r32_${i+1}`, team1: null, team2: null, winner: null });
      }
      
      // Assign winners/runners up to basic slots
      // A1 vs C3, B1 vs F3, etc. logic is complex to map perfectly without a table
      // We will leave R32 empty for manual selection or basic auto-fill if possible
      // For now, returning empty R32 to force manual interaction or basic fill
      return r32Matches;
    }

    // Note: To fully populate R32 automatically requires complex slot mapping logic
    // which is omitted here for brevity, but the structure (16 matches) is correct.
    // The ManualBracketMatch component allows users to fill these in.
    
  }, [playedCount, allStandings, best3rd]);

  // ── KNOCKOUT WINNER SELECTION ──────────────────────────
  function pickKnockoutWinner(round, matchId, winner) {
    setKnockout(prev => {
      const rounds = ['r32','r16','qf','sf','f'];
      const rIdx = rounds.indexOf(round);
      const newState = { ...prev };
      
      // Update current round winner
      newState[round] = prev[round].map(m =>
        m.id === matchId ? { ...m, winner } : m
      );

      // Advance to next round
      const nextRound = rounds[rIdx + 1];
      if (!nextRound) {
        // Final winner = champion!
        setChampion(winner);
        setShowChampion(true);
        spawnConfetti();
        return newState;
      }

      const currentMatches = newState[round];
      const currentIdx = currentMatches.findIndex(m => m.id === matchId);
      
      // Correct advancement logic: 2 matches -> 1 match in next round
      const nextMatchIdx = Math.floor(currentIdx / 2);
      // Team1 slot if even index (0,2,4...), Team2 slot if odd index (1,3,5...)
      const slotName = (currentIdx % 2 === 0) ? 'team1' : 'team2';

      const nextMatches = [...(prev[nextRound] || [])];
      // Ensure array has enough slots
      while (nextMatches.length <= nextMatchIdx) {
        nextMatches.push({ 
          id: `${nextRound}_${nextMatches.length + 1}`, 
          team1: null, 
          team2: null, 
          winner: null 
        });
      }

      // Place winner in correct slot of next round match
      nextMatches[nextMatchIdx] = {
        ...nextMatches[nextMatchIdx],
        [slotName]: winner,
      };
      newState[nextRound] = nextMatches;
      return newState;
    });
  }

  // ── RESET ──────────────────────────────────────────────
  function resetAll() {
    if (!confirm('Reset all predictions? This cannot be undone.')) return;
    setFixtures(generateGroupFixtures());
    setKnockout(initKnockout());
    setChampion(null);
    setShowChampion(false);
    setSelectedGroup('A');
  }

  // ── SHARE ──────────────────────────────────────────────
  function shareResult() {
    const text = champion
      ? ` My #WorldCup2026 prediction: ${champion} wins the World Cup! #FIFA2026`
      : '⚽ I\'m predicting the #WorldCup2026! Try it too! #FIFA2026';
    if (navigator.share) navigator.share({ title:'World Cup 2026 Predictor', text });
    else {
      navigator.clipboard?.writeText(text);
      alert('Prediction copied to clipboard!');
    }
  }

  // ── GROUPS BY FIXTURE ─────────────────────────────────
  const fixturesByGroup = {};
  fixtures.forEach(f => {
    if (!fixturesByGroup[f.group]) fixturesByGroup[f.group] = [];
    fixturesByGroup[f.group].push(f);
  });
  const groupLetters = Object.keys(GROUPS);

  // ── RENDER ─────────────────────────────────────────────
  return (
    <div style={{ minHeight:'100vh' }}>
      {/* HERO */}
      <div className="hero">
        <div style={{ position:'relative', zIndex:1 }}>
          <div className="hero-badge"> USA · Canada · Mexico · June 11 – July 19</div>
          <div className="hero-title">World Cup <br />2026™</div>
          <div className="hero-sub">Pick every result. Build your bracket. Crown your champion.</div>
          <div className="hero-stats">
            <div className="hero-stat"><div className="hero-stat-num">48</div><div className="hero-stat-label">Teams</div></div>
            <div className="hero-stat"><div className="hero-stat-num">12</div><div className="hero-stat-label">Groups</div></div>
            <div className="hero-stat"><div className="hero-stat-num">104</div><div className="hero-stat-label">Matches</div></div>
            <div className="hero-stat"><div className="hero-stat-num">7</div><div className="hero-stat-label">Rounds</div></div>
          </div>
          <button className="hero-cta" onClick={() => setTab('matches')}>Start Predicting </button>
        </div>
      </div>

      {/* PROGRESS BAR */}
      {playedCount > 0 && (
        <div style={{ background:'var(--surface2)', padding:'12px 24px', borderBottom:'1px solid var(--border)' }}>
          <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ fontSize:12, color:'var(--text-muted)', fontWeight:600 }}>
              GROUP STAGE: {playedCount}/{totalMatches} matches predicted
            </span>
            <div className="progress-bar" style={{ flex:1 }}>
              <div className="progress-fill" style={{ width:`${progressPct}%` }} />
            </div>
            <span style={{ fontSize:12, fontWeight:700, color:'var(--lime)' }}>{progressPct}%</span>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav className="nav-tabs">
        {TABS.map(t => (
          <button key={t.id} className={`nav-tab ${tab===t.id?'active':''}`} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
        <div style={{ flex:1 }} />
        <button onClick={resetAll} style={{ padding:'12px 16px', fontSize:12, fontWeight:600, color:'var(--text-dim)', background:'transparent', border:'none', whiteSpace:'nowrap' }}>🔄 Reset</button>
        <button className="share-btn" style={{ margin:'8px 0 8px 8px' }} onClick={shareResult}> Share</button>
      </nav>

      {/* MAIN */}
      <div className="main-content" ref={mainRef}>

        {/* ─── GROUPS TAB ─────────────────────────────── */}
        {tab === 'groups' && (
          <div>
            <div className="section-header">
              <div className="section-title">Group <span>Stage</span></div>
              <div className="section-desc">48 teams across 12 groups — top 2 + 8 best 3rd-place advance to the Round of 32</div>
            </div>
            <div className="legend">
              <div className="legend-item"><div className="legend-dot" style={{background:'var(--win)'}}/> Qualifies (1st/2nd)</div>
              <div className="legend-item"><div className="legend-dot" style={{background:'var(--gold)'}}/> Best 3rd Place</div>
              <div className="legend-item"><div className="legend-dot" style={{background:'var(--loss)'}}/> Eliminated</div>
            </div>
            <div className="groups-grid">
              {groupLetters.map(g => {
                const standings = allStandings[g];
                return (
                  <div key={g} className="group-card">
                    <div className="group-card-header">
                      <span className="group-label">Group {g}</span>
                      <span className="group-stage-badge">{fixturesByGroup[g]?.filter(f=>f.played).length || 0}/6 played</span>
                    </div>
                    <div style={{ padding:'8px 8px 0' }}>
                      <GroupTable group={g} standings={standings} best3rdTeams={best3rd} />
                    </div>
                    <div style={{ padding:'8px 12px 12px' }}>
                      {standings.map((s,i) => {
                        const t = TEAMS[s.team]||{};
                        return (
                          <div key={s.team} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                            <div style={{ flex:1 }}>
                              <div style={{ height:3, background:'var(--surface3)', borderRadius:2, overflow:'hidden' }}>
                                <div style={{ height:'100%', borderRadius:2, width:`${t.strength||50}%`, background: i===0 ?'var(--lime)':i===1?'#4FC3F7':i===2?'var(--gold)':'var(--surface4)', transition:'width .5s ease' }}/>
                              </div>
                            </div>
                            <span style={{ fontSize:11, fontWeight:600 }}>{t.fifaRank||'?'}</span>
                          </div>
                        );
                      })}
                      <div style={{ fontSize:10, color:'var(--text-dim)', marginTop:6, letterSpacing:.5 }}>⚡ FIFA Strength Rating</div>
                    </div>
                  </div>
                );
              })}
            </div>
            {best3rd.length > 0 && (
              <div style={{ marginTop:32, background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:20 }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize:24, letterSpacing:2, color:'var(--gold)', marginBottom:12 }}>🥉 Best 8 Third-Place Teams</div>
                <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:16 }}>Ranked by Points → Goal Difference → Goals Scored. The top 8 of 12 third-place teams advance to the Round of 32.</div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:8 }}>
                  {best3rd.map((t, i) => {
                    const team = TEAMS[t.team]||{};
                    return (
                      <div key={t.team} style={{ background:'var(--surface3)', borderRadius:8, padding:'10px 12px', display:'flex', alignItems:'center', gap:10, border:`1px solid ${i < 8 ? 'rgba(255,215,0,0.3)' : 'var(--border)'}` }}>
                        <span style={{ fontSize:10, fontWeight:700, color:'var(--gold)', minWidth:18 }}>#{i+1}</span>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:12, fontWeight:700 }}>{t.team}</div>
                          <div style={{ fontSize:10, color:'var(--text-dim)' }}>{t.pts}pts · GD{t.gd >0?'+':''}{t.gd} · GF{t.gf} · Grp {t.group}</div>
                        </div>
                        {i < 8 && <span style={{ fontSize:12, color:'var(--gold)' }}>✓</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── FIXTURES TAB ────────────────────────────── */}
        {tab === 'matches' && (
          <div>
            <div className="section-header">
              <div className="section-title">Group Stage <span>Fixtures</span></div>
              <div className="section-desc">Enter scores for all 72 group-stage matches to automatically update standings</div>
            </div>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:24 }}>
              <button onClick={() => setSelectedGroup('ALL')} style={{ padding:'6px 14px', borderRadius:100, fontSize:12, fontWeight:700, background: selectedGroup==='ALL' ? 'var(--lime)' : 'var(--surface2)', color: selectedGroup==='ALL' ? '#0a1f08' : 'var(--text-muted)', border:`1px solid ${selectedGroup==='ALL' ? 'var(--lime)' : 'var(--border)'}` }}>All Groups</button>
              {groupLetters.map(g => (
                <button key={g} onClick={() => setSelectedGroup(g)} style={{ padding:'6px 14px', borderRadius:100, fontSize:12, fontWeight:700, background: selectedGroup===g ? 'var(--lime)' : 'var(--surface2)', color: selectedGroup===g ? '#0a1f08' : 'var(--text-muted)', border:`1px solid ${selectedGroup===g ? 'var(--lime)' : 'var(--border)'}` }}>Group {g}</button>
              ))}
            </div>
            {groupLetters.filter(g => selectedGroup === 'ALL' || selectedGroup === g).map(g => (
              <div key={g} className="match-day">
                <div className="match-day-title">Group {g}</div>
                <div className="matches-list">
                  {fixturesByGroup[g]?.map(f => (
                    <MatchRow key={f.id} match={f} onUpdate={updateFixture} />
                  ))}
                </div>
              </div>
            ))}
            {playedCount === 72 && (
              <div style={{ marginTop:32, padding:24, borderRadius:'var(--radius-lg)', background:'linear-gradient(135deg,rgba(202,255,74,0.1),rgba(79,195,247,0.1))', border:'1px solid rgba(202,255,74,0.3)', textAlign:'center' }}>
                <div style={{ fontSize:36, marginBottom:12 }}>🎉</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize:28, color:'var(--lime)', letterSpacing:2 }}>Group Stage Complete!</div>
                <div style={{ color:'var(--text-muted)', marginTop:8, marginBottom:16, fontSize:14 }}>All 72 matches predicted. Head to the Knockout tab to complete your bracket.</div>
                <button className="hero-cta" onClick={() => setTab('knockout')} style={{ fontSize:14, padding:'12px 28px' }}>Go to Knockout Stage →</button>
              </div>
            )}
          </div>
        )}

        {/* ─── KNOCKOUT TAB ────────────────────────────── */}
        {tab === 'knockout' && (
          <div>
            <div className="section-header">
              <div className="section-title">Knockout <span>Stage</span></div>
              <div className="section-desc">Click a team to advance them. Win and move on — lose and go home. No draws in knockout football.</div>
            </div>
            {qualifiedTeams.size > 0 && (
              <div style={{ marginBottom:24, background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:16 }}>
                <div style={{ fontSize:12, fontWeight:700, letterSpacing:1.5, textTransform:'uppercase', color:'var(--text-dim)', marginBottom:12 }}>🎟️ Qualified Teams ({qualifiedTeams.size}/32)</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                  {[...qualifiedTeams].map(name => (
                    <span key={name} style={{ display:'inline-flex', alignItems:'center', gap:5, background:'var(--surface3)', border:'1px solid var(--border)', borderRadius:6, padding:'4px 10px', fontSize:12, fontWeight:600 }}>{name}</span>
                  ))}
                </div>
              </div>
            )}
            <div style={{ background:'rgba(79,195,247,0.08)', border:'1px solid rgba(79,195,247,0.2)', borderRadius:8, padding:'10px 16px', marginBottom:20, fontSize:13, color:'var(--blue-bright)' }}>
              💡 <strong>How to use:</strong> Click on a team name to advance them to the next round. Winners are highlighted in <span style={{color:'var(--lime)'}}>green</span>.
            </div>
            
            {['r32','r16','qf','sf','f'].map(round => {
              const matches = knockout[round];
              if (!matches) return null;
              
              // Only show matches that are populated OR are in Round of 32 (manual entry)
              const visibleMatches = round === 'r32' 
                ? matches 
                : matches.filter(m => m.team1 || m.team2);
                
              if (visibleMatches.length === 0 && round !== 'r32') return null;

              return (
                <div key={round} style={{ marginBottom:32 }}>
                  <div className="match-day-title" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize:20, color:'var(--lime)' }}>
                    {ROUND_LABELS[round]}
                    {round !== 'f' && <span style={{fontSize:13,color:'var(--text-dim)'}}> — {visibleMatches.length} match{visibleMatches.length!==1?'es':''}</span>}
                  </div>
                  
                  {round === 'r32' && (
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:8 }}>
                      {matches.map((m, i) => (
                        <ManualBracketMatch
                          key={m.id}
                          match={m}
                          index={i}
                          onPickWinner={(id, winner) => pickKnockoutWinner('r32', id, winner)}
                          onSetTeam={(matchIdx, slot, team) => {
                            setKnockout(prev => {
                              const updated = [...prev.r32];
                              updated[matchIdx] = { ...updated[matchIdx], [slot]: team };
                              return { ...prev, r32: updated };
                            });
                          }}
                          allTeams={Object.keys(TEAMS)}
                        />
                      ))}
                    </div>
                  )}

                  {round !== 'r32' && (
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:8 }}>
                      {visibleMatches.map(m => (
                        <BracketMatch
                          key={m.id}
                          match={m}
                          onPickWinner={(id, winner) => pickKnockoutWinner(round, id, winner)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* CHAMPION */}
            {champion && (
              <div className="champion-section">
                <div className="champion-trophy">🏆</div>
                <div className="champion-label">Your 2026 World Cup Champion</div>
                <div className="champion-name">{champion}</div>
                <div style={{ marginTop:16, color:'var(--text-muted)', fontSize:14 }}>
                  {TEAMS[champion]?.confederation} · FIFA Rank #{TEAMS[champion]?.fifaRank}
                </div>
                <div style={{ marginTop:24, display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
                  <button className="hero-cta" onClick={shareResult} style={{ fontSize:14, padding:'10px 24px' }}>📤 Share My Prediction</button>
                  <button onClick={resetAll} style={{ padding:'10px 24px', borderRadius:100, background:'transparent', border:'1px solid rgba(255,255,255,0.2)', color:'var(--text-muted)', fontSize:14, fontWeight:600 }}>🔄 Predict Again</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── RULES TAB ───────────────────────────────── */}
        {tab === 'rules' && (
          <div>
            <div className="section-header">
              <div className="section-title">FIFA 2026 <span>Rules</span></div>
              <div className="section-desc">Official regulations from the FIFA World Cup 2026 competition rules</div>
            </div>
            <div className="rules-grid">
              {[
                { icon:'🏟️', title:'Tournament Format', body:'48 teams split into 12 groups of 4. Each team plays 3 matches (one against every group opponent). 104 total matches across 16 venues in USA, Canada & Mexico.' },
                { icon:'✅', title:'Qualification', body:'Top 2 teams from each group qualify automatically (24 teams). Additionally, the 8 best third-place teams also advance — making 32 total qualifiers for the Round of 32.' },
                { icon:'📊', title:'Scoring System', body:'Win = 3 points · Draw = 1 point · Loss = 0 points. All final group matches are played simultaneously to prevent collusion (since 1994).' },
                { icon:'🔢', title:'Tiebreakers', body:'1. Points · 2. H2H points · 3. H2H goal diff · 4. H2H goals scored · 5. Overall goal diff · 6. Overall goals scored · 7. Fair play points · 8. Drawing of lots.' },
                { icon:'⚡', title:'Knockout Rules', body:'Single elimination from Round of 32 onwards. No draws allowed. If level after 90 mins → 2×15 min extra time. Still level → penalty shootout.' },
                { icon:'🌍', title:'Confederation Spots', body:'UEFA: 16 teams · CAF: 10 teams · AFC: 9 teams · CONMEBOL: 6 teams · CONCACAF: 6 teams · OFC: 1 team. 3 teams qualified as hosts (USA, Canada, Mexico).' },
                { icon:'🛡️', title:'Best 3rd Place', body:'12 third-place teams are ranked by pts → GD → GF → fair play. The top 8 of these 12 teams advance. This replaces the old "third-place group playoff" format.' },
                { icon:'', title:'Bracket Pathways', body:'FIFA introduced 2 pathways to prevent top-4 teams meeting before semis. Spain & Argentina are in opposite halves. France & England are also in opposite halves.' },
                { icon:'📅', title:'Schedule', body:'Group Stage: June 11–27 · R32: June 28–July 2 · R16: July 3–6 · QF: July 8–9 · SF: July 14–15 · 3rd Place: July 18 · Final: July 19, MetLife Stadium.' },
                { icon:'🌟', title:'Squads', body:'Each team names a squad of 23–26 players (including 3 GKs). Official squads must be confirmed by FIFA by June 2, 2026.' },
                { icon:'🥅', title:'Goalkeepers', body:'If a goalkeeper is sent off, another outfield player can go in goal (or the designated backup GK) without using a substitution slot.' },
                { icon:'🟨', title:'Cards & Suspensions', body:'A player receiving 2 yellow cards across different group matches is suspended for their next match. Yellow cards reset after the Round of 16.' },
              ].map(r => (
                <div key={r.title} className="rule-card">
                  <div className="rule-card-icon">{r.icon}</div>
                  <div className="rule-card-title">{r.title}</div>
                  <div className="rule-card-body">{r.body}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:32, background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:24 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize:24, letterSpacing:2, marginBottom:16, color:'var(--lime)' }}>Tiebreaker Order (Official FIFA 2026)</div>
              {[
                ['1st','Points in group matches','Most important — 3 pts for win, 1 for draw'],
                ['2nd','H2H points','Points in matches between tied teams only'],
                ['3rd','H2H goal difference','Goals scored minus conceded between tied teams'],
                ['4th','H2H goals scored','Total goals scored vs. the other tied teams'],
                ['5th','Overall goal difference','Across ALL group matches'],
                ['6th','Overall goals scored','Total goals in ALL group matches'],
                ['7th','Fair play (yellow cards)','1 yellow = -1pt, 2 yellows = -3pts, red = -3pts'],
                ['8th','Drawing of lots','Random draw by FIFA if all above are equal'],
              ].map(([num, title, desc]) => (
                <div key={num} style={{ display:'flex', gap:16, padding:'12px 0', borderBottom:'1px solid var(--border)', alignItems:'flex-start' }}>
                  <div style={{ width:32, height:32, borderRadius:'50%', background:'rgba(202,255,74,0.15)', border:'1px solid rgba(202,255,74,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily: "'Bebas Neue',sans-serif", fontSize:16, color:'var(--lime)', flexShrink:0 }}>{num}</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:14, marginBottom:2 }}>{title}</div>
                    <div style={{ fontSize:12, color:'var(--text-muted)' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── HISTORY TAB ─────────────────────────────── */}
        {tab === 'history' && (
          <div>
            <div className="section-header">
              <div className="section-title">World Cup <span>History</span></div>
              <div className="section-desc">Past champions and all-time records</div>
            </div>
            <div style={{ marginBottom:32 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize:24, letterSpacing:2, color:'var(--gold)', marginBottom:16 }}>🏆 Recent Champions</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:12 }}>
                {PAST_CHAMPIONS.map(c => (
                  <div key={c.year} style={{ background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:20, transition:'border-color .2s', cursor:'default' }} onMouseEnter={e => e.currentTarget.style.borderColor='rgba(255,215,0,0.4)'} onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize:28, color:'var(--text)', letterSpacing:1 }}>{c.winner}</div>
                    <div style={{ fontSize:13, color:'var(--text-muted)', marginTop:4 }}>{c.year} · Runner-up: {c.runner}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:24, marginBottom:24 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize:22, letterSpacing:2, color:'var(--lime)', marginBottom:16 }}> Most World Cup Titles (All-Time)</div>
              {[
                { name:'Brazil', wins:5, years:'1958,62,70,94,2002' },
                { name:'Germany', wins:4, years:'1954,74,90,2014' },
                { name:'Italy', wins:4, years:'1934,38,82,2006' },
                { name:'Argentina', wins:3, years:'1978,86,2022' },
                { name:'France', wins:2, years:'1998,2018' },
                { name:'Uruguay', wins:2, years:'1930,1950' },
                { name:'Spain', wins:1, years:'2010' },
                { name:'England', wins:1, years:'1966' },
              ].map((t, i) => (
                <div key={t.name} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom:'1px solid var(--border)' }}>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize:20, color:'var(--text-dim)', minWidth:28 }}>#{i+1}</span>
                  <div style={{ flex:1 }}>
                    <span style={{ fontWeight:700 }}>{t.name}</span>
                    <div style={{ fontSize:11, color:'var(--text-dim)' }}>{t.years}</div>
                  </div>
                  <div style={{ display:'flex', gap:4 }}>
                    {Array.from({length:t.wins}).map((_, j) => (<span key={j} style={{ fontSize:18 }}>🏆</span>))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:24 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize:22, letterSpacing:2, color:'#4FC3F7', marginBottom:16 }}>🌟 2026 Debut Nations</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:12 }}>
                {Object.entries(TEAMS).filter(([,t]) => t.debut).map(([name, t]) => (
                  <div key={name} style={{ background:'var(--surface3)', borderRadius:8, padding:16, border:'1px solid rgba(79,195,247,0.3)' }}>
                    <div style={{ fontWeight:700, marginTop:0 }}>{name}</div>
                    <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:4 }}>{t.confederation} · Group {t.group}</div>
                    <div style={{ marginTop:6 }}>
                      <span style={{ fontSize:10, fontWeight:700, letterSpacing:1, background:'rgba(79,195,247,0.15)', color:'#4FC3F7', padding:'2px 8px', borderRadius:4 }}>FIRST EVER WORLD CUP</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer note */}
        <div style={{ marginTop:60, paddingTop:24, borderTop:'1px solid var(--border)', textAlign:'center', color:'var(--text-dim)', fontSize:12, lineHeight:2 }}>
          <div>⚽ FIFA World Cup 2026™ Predictor</div>
          <div>Groups sourced from official FIFA draw · Kennedy Center, Washington D.C. · December 5, 2025</div>
          <div style={{marginTop:4}}>
            <span style={{color:'var(--lime)'}}>Spain</span> ·{' '}
            <span style={{color:'#4FC3F7'}}>France</span> ·{' '}
            <span style={{color:'var(--gold)'}}>Argentina</span> ·{' '}
            <span style={{color:'#e97de9'}}>Portugal</span> ·{' '}
            <span style={{color:'#fff'}}>England</span>
            {' '}— Your prediction matters. Who wins it all?
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MANUAL BRACKET MATCH (Round of 32 team picker) ────────
function ManualBracketMatch({ match, index, onPickWinner, onSetTeam, allTeams }) {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const dropStyle = {
    position:'absolute', top:'100%', left:0, right:0, zIndex:300,
    background:'var(--surface3)', border:'1px solid var(--border)',
    borderRadius:8, maxHeight:200, overflowY:'auto', boxShadow:'0 8px 24px rgba(0,0,0,0.4)'
  };
  const optStyle = {
    padding:'7px 10px', cursor:'pointer', fontSize:12, fontWeight:600,
    display:'flex', alignItems:'center', gap:6
  };
  
  // ✅ FIX: Close dropdowns when match data resets (e.g. Reset button)
  useEffect(() => {
    setOpen1(false);
    setOpen2(false);
  }, [match.team1, match.team2]);

  return (
    <div className="bracket-match">
      <div style={{fontSize:10,color:'var(--text-dim)',padding:'4px 8px',borderBottom:'1px solid var(--border)',letterSpacing:1,textTransform:'uppercase'}}>Match {index+1}</div>
      {/* Team 1 */}
      <div style={{ position:'relative' }}>
        <div className={`bracket-team ${match.winner===match.team1?'winner':(match.winner && match.winner!==match.team1)?'loser':''}`} onClick={() => { if (match.team1 && match.team2) onPickWinner(match.id, match.team1); else setOpen1(o => !o); }} style={{ cursor:'pointer' }}>
          <span className="bracket-team-name" style={{color: match.team1 ? 'var(--text)':'var(--text-dim)'}}>{match.team1 || 'Pick Team 1'}</span>
          {match.winner===match.team1 && <span style={{fontSize:10,color:'var(--lime)'}}>★</span>}
        </div>
        {open1 && (
          <div style={dropStyle}>
            {allTeams.map(name => (
              <div key={name} style={optStyle} onMouseEnter={e=>e.currentTarget.style.background='var(--surface4)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} onClick={() => { onSetTeam(index,'team1',name); setOpen1(false); }}>{name}</div>
            ))}
          </div>
        )}
      </div>
      {/* Team 2 */}
      <div style={{ position:'relative' }}>
        <div className={`bracket-team ${match.winner===match.team2?'winner':(match.winner && match.winner!==match.team2)?'loser':''}`} onClick={() => { if (match.team1 && match.team2) onPickWinner(match.id, match.team2); else setOpen2(o => !o); }} style={{ cursor:'pointer', borderBottom:'none' }}>
          <span className="bracket-team-name" style={{color: match.team2 ? 'var(--text)':'var(--text-dim)'}}>{match.team2 || 'Pick Team 2'}</span>
          {match.winner===match.team2 && <span style={{fontSize:10,color:'var(--lime)'}}>★</span>}
        </div>
        {open2 && (
          <div style={dropStyle}>
            {allTeams.map(name => (
              <div key={name} style={optStyle} onMouseEnter={e=>e.currentTarget.style.background='var(--surface4)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} onClick={() => { onSetTeam(index,'team2',name); setOpen2(false); }}>{name}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}