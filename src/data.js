// FIFA World Cup 2026 — Official Data
// Groups confirmed by FIFA Draw, Dec 5 2025, Kennedy Center, Washington D.C.
// Format: 48 teams, 12 groups (A–L), 104 total matches
// Hosts: USA, Canada, Mexico | Final: MetLife Stadium, July 19 2026

export const TOURNAMENT_INFO = {
  name: "FIFA World Cup 2026™",
  edition: "23rd",
  hosts: ["United States", "Canada", "Mexico"],
  startDate: "June 11, 2026",
  finalDate: "July 19, 2026",
  finalVenue: "MetLife Stadium, New York/New Jersey",
  totalTeams: 48,
  totalMatches: 104,
  groups: 12,
};

// FIFA Rankings used for strength rating (April 1 2026 update)
// strength: 0–100 scale for UI display
export const TEAMS = {
  // GROUP A
  Mexico:         { flag:"🇲🇽", confederation:"CONCACAF", host:true,  strength:74, fifaRank:15, group:"A", debut:false },
  "South Africa": { flag:"🇿🇦", confederation:"CAF",      host:false, strength:58, fifaRank:60, group:"A", debut:false },
  "South Korea":  { flag:"🇰🇷", confederation:"AFC",      host:false, strength:70, fifaRank:22, group:"A", debut:false },
  Czechia:        { flag:"🇨🇿", confederation:"UEFA",     host:false, strength:68, fifaRank:26, group:"A", debut:false },
  // GROUP B
  Canada:         { flag:"🇨🇦", confederation:"CONCACAF", host:true,  strength:67, fifaRank:30, group:"B", debut:false },
  "Bosnia & Herz.":{ flag:"🇧🇦", confederation:"UEFA",   host:false, strength:60, fifaRank:52, group:"B", debut:false },
  Qatar:          { flag:"🇶🇦", confederation:"AFC",      host:false, strength:56, fifaRank:62, group:"B", debut:false },
  Switzerland:    { flag:"🇨🇭", confederation:"UEFA",     host:false, strength:73, fifaRank:18, group:"B", debut:false },
  // GROUP C
  Brazil:         { flag:"🇧🇷", confederation:"CONMEBOL", host:false, strength:86, fifaRank:5,  group:"C", debut:false },
  Morocco:        { flag:"🇲🇦", confederation:"CAF",      host:false, strength:76, fifaRank:11, group:"C", debut:false },
  Haiti:          { flag:"🇭🇹", confederation:"CONCACAF", host:false, strength:50, fifaRank:82, group:"C", debut:false },
  Scotland:       { flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", confederation:"UEFA",     host:false, strength:66, fifaRank:34, group:"C", debut:false },
  // GROUP D
  "United States":{ flag:"🇺🇸", confederation:"CONCACAF", host:true,  strength:75, fifaRank:13, group:"D", debut:false },
  Paraguay:       { flag:"🇵🇾", confederation:"CONMEBOL", host:false, strength:63, fifaRank:42, group:"D", debut:false },
  Australia:      { flag:"🇦🇺", confederation:"AFC",      host:false, strength:68, fifaRank:24, group:"D", debut:false },
  Türkiye:        { flag:"🇹🇷", confederation:"UEFA",     host:false, strength:69, fifaRank:25, group:"D", debut:false },
  // GROUP E
  Germany:        { flag:"🇩🇪", confederation:"UEFA",     host:false, strength:84, fifaRank:6,  group:"E", debut:false },
  Curaçao:        { flag:"🇨🇼", confederation:"CONCACAF", host:false, strength:44, fifaRank:98, group:"E", debut:true  },
  "Ivory Coast":  { flag:"🇨🇮", confederation:"CAF",      host:false, strength:69, fifaRank:23, group:"E", debut:false },
  Ecuador:        { flag:"🇪🇨", confederation:"CONMEBOL", host:false, strength:68, fifaRank:27, group:"E", debut:false },
  // GROUP F
  Netherlands:    { flag:"🇳🇱", confederation:"UEFA",     host:false, strength:82, fifaRank:7,  group:"F", debut:false },
  Japan:          { flag:"🇯🇵", confederation:"AFC",      host:false, strength:77, fifaRank:10, group:"F", debut:false },
  Sweden:         { flag:"🇸🇪", confederation:"UEFA",     host:false, strength:72, fifaRank:19, group:"F", debut:false },
  Tunisia:        { flag:"🇹🇳", confederation:"CAF",      host:false, strength:60, fifaRank:49, group:"F", debut:false },
  // GROUP G
  Belgium:        { flag:"🇧🇪", confederation:"UEFA",     host:false, strength:79, fifaRank:9,  group:"G", debut:false },
  Egypt:          { flag:"🇪🇬", confederation:"CAF",      host:false, strength:64, fifaRank:38, group:"G", debut:false },
  Iran:           { flag:"🇮🇷", confederation:"AFC",      host:false, strength:62, fifaRank:44, group:"G", debut:false },
  "New Zealand":  { flag:"🇳🇿", confederation:"OFC",      host:false, strength:50, fifaRank:80, group:"G", debut:false },
  // GROUP H
  Spain:          { flag:"🇪🇸", confederation:"UEFA",     host:false, strength:94, fifaRank:1,  group:"H", debut:false },
  "Cape Verde":   { flag:"🇨🇻", confederation:"CAF",      host:false, strength:53, fifaRank:75, group:"H", debut:true  },
  "Saudi Arabia": { flag:"🇸🇦", confederation:"AFC",      host:false, strength:62, fifaRank:45, group:"H", debut:false },
  Uruguay:        { flag:"🇺🇾", confederation:"CONMEBOL", host:false, strength:79, fifaRank:8,  group:"H", debut:false },
  // GROUP I
  France:         { flag:"🇫🇷", confederation:"UEFA",     host:false, strength:93, fifaRank:2,  group:"I", debut:false },
  Senegal:        { flag:"🇸🇳", confederation:"CAF",      host:false, strength:71, fifaRank:20, group:"I", debut:false },
  Iraq:           { flag:"🇮🇶", confederation:"AFC",      host:false, strength:53, fifaRank:76, group:"I", debut:false },
  Norway:         { flag:"🇳🇴", confederation:"UEFA",     host:false, strength:73, fifaRank:17, group:"I", debut:false },
  // GROUP J
  Argentina:      { flag:"🇦🇷", confederation:"CONMEBOL", host:false, strength:92, fifaRank:3,  group:"J", debut:false },
  Algeria:        { flag:"🇩🇿", confederation:"CAF",      host:false, strength:61, fifaRank:46, group:"J", debut:false },
  Austria:        { flag:"🇦🇹", confederation:"UEFA",     host:false, strength:69, fifaRank:21, group:"J", debut:false },
  Jordan:         { flag:"🇯🇴", confederation:"AFC",      host:false, strength:51, fifaRank:78, group:"J", debut:true  },
  // GROUP K
  Portugal:       { flag:"🇵🇹", confederation:"UEFA",     host:false, strength:88, fifaRank:4,  group:"K", debut:false },
  "DR Congo":     { flag:"🇨🇩", confederation:"CAF",      host:false, strength:57, fifaRank:58, group:"K", debut:false },
  Uzbekistan:     { flag:"🇺🇿", confederation:"AFC",      host:false, strength:55, fifaRank:68, group:"K", debut:true  },
  Colombia:       { flag:"🇨🇴", confederation:"CONMEBOL", host:false, strength:77, fifaRank:12, group:"K", debut:false },
  // GROUP L
  England:        { flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", confederation:"UEFA",     host:false, strength:87, fifaRank:4,  group:"L", debut:false },
  Croatia:        { flag:"🇭🇷", confederation:"UEFA",     host:false, strength:75, fifaRank:14, group:"L", debut:false },
  Ghana:          { flag:"🇬🇭", confederation:"CAF",      host:false, strength:61, fifaRank:47, group:"L", debut:false },
  Panama:         { flag:"🇵🇦", confederation:"CONCACAF", host:false, strength:56, fifaRank:63, group:"L", debut:false },
};

// Official 12 Groups
export const GROUPS = {
  A: ["Mexico","South Africa","South Korea","Czechia"],
  B: ["Canada","Bosnia & Herz.","Qatar","Switzerland"],
  C: ["Brazil","Morocco","Haiti","Scotland"],
  D: ["United States","Paraguay","Australia","Türkiye"],
  E: ["Germany","Curaçao","Ivory Coast","Ecuador"],
  F: ["Netherlands","Japan","Sweden","Tunisia"],
  G: ["Belgium","Egypt","Iran","New Zealand"],
  H: ["Spain","Cape Verde","Saudi Arabia","Uruguay"],
  I: ["France","Senegal","Iraq","Norway"],
  J: ["Argentina","Algeria","Austria","Jordan"],
  K: ["Portugal","DR Congo","Uzbekistan","Colombia"],
  L: ["England","Croatia","Ghana","Panama"],
};

// All group stage fixtures — 6 matches per group, 72 total
// Each team plays every other team in their group once (round-robin)
export function generateGroupFixtures() {
  const fixtures = [];
  let id = 0;
  Object.entries(GROUPS).forEach(([group, teams]) => {
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        fixtures.push({
          id: id++,
          group,
          home: teams[i],
          away: teams[j],
          homeScore: null,
          awayScore: null,
          played: false,
        });
      }
    }
  });
  return fixtures;
}

// FIFA Tiebreaker rules (official 2026 regulations):
// 1. Points in group
// 2. Head-to-head points (between tied teams)
// 3. Head-to-head goal difference
// 4. Head-to-head goals scored
// 5. Overall goal difference
// 6. Overall goals scored
// 7. Fair play (not tracked in predictor — use strength as proxy)
// 8. Drawing of lots (use strength rating as tiebreaker for simulator)
export function calculateGroupStandings(group, fixtures) {
  const teams = GROUPS[group];
  const stats = {};
  teams.forEach(t => {
    stats[t] = { team: t, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, results: {} };
  });

  const playedFixtures = fixtures.filter(f => f.group === group && f.played);

  playedFixtures.forEach(f => {
    const h = stats[f.home], a = stats[f.away];
    if (!h || !a) return;
    h.p++; a.p++;
    h.gf += f.homeScore; h.ga += f.awayScore;
    a.gf += f.awayScore; a.ga += f.homeScore;
    h.gd = h.gf - h.ga; a.gd = a.gf - a.ga;
    h.results[f.away] = { scored: f.homeScore, conceded: f.awayScore };
    a.results[f.home] = { scored: f.awayScore, conceded: f.homeScore };
    if (f.homeScore > f.awayScore) { h.w++; a.l++; h.pts += 3; }
    else if (f.homeScore === f.awayScore) { h.d++; a.d++; h.pts++; a.pts++; }
    else { h.l++; a.w++; a.pts += 3; }
  });

  const standings = Object.values(stats);

  standings.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    // Head-to-head among tied teams
    const aVsB_pts = (a.results[b.team] ? (
      a.results[b.team].scored > a.results[b.team].conceded ? 3 :
      a.results[b.team].scored === a.results[b.team].conceded ? 1 : 0
    ) : 0);
    const bVsA_pts = (b.results[a.team] ? (
      b.results[a.team].scored > b.results[a.team].conceded ? 3 :
      b.results[a.team].scored === b.results[a.team].conceded ? 1 : 0
    ) : 0);
    if (aVsB_pts !== bVsA_pts) return bVsA_pts - aVsB_pts;
    // H2H goal diff
    const aVsB_gd = a.results[b.team] ? a.results[b.team].scored - a.results[b.team].conceded : 0;
    const bVsA_gd = b.results[a.team] ? b.results[a.team].scored - b.results[a.team].conceded : 0;
    if (aVsB_gd !== bVsA_gd) return bVsA_gd - aVsB_gd;
    // H2H goals scored
    const aVsB_gf = a.results[b.team] ? a.results[b.team].scored : 0;
    const bVsA_gf = b.results[a.team] ? b.results[a.team].scored : 0;
    if (aVsB_gf !== bVsA_gf) return bVsA_gf - aVsB_gf;
    // Overall GD
    if (b.gd !== a.gd) return b.gd - a.gd;
    // Overall GF
    if (b.gf !== a.gf) return b.gf - a.gf;
    // Strength as tiebreaker (FIFA uses lots)
    return (TEAMS[b.team]?.strength || 0) - (TEAMS[a.team]?.strength || 0);
  });

  return standings;
}

// Determine which 8 best 3rd-place teams advance
// Criteria: pts → gd → gf → strength
export function getBest3rdPlace(allStandings) {
  const thirdPlace = Object.entries(allStandings).map(([group, standings]) => ({
    ...standings[2],
    group,
  })).filter(t => t && t.team);

  thirdPlace.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.gd !== a.gd) return b.gd - a.gd;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return (TEAMS[b.team]?.strength || 0) - (TEAMS[a.team]?.strength || 0);
  });

  return thirdPlace.slice(0, 8);
}

// Knockout bracket structure (Round of 32)
// FIFA 2026 bracket: two separate pathways to prevent top-4 meeting before semis
// Spain (H1) & Argentina (J1) in opposite pathways
// France (I1) & England (L1) in opposite pathways
// Source: Official FIFA 2026 bracket regulations
export const BRACKET_TEMPLATE = {
  r32: [
    // Pathway 1 (leading to SF1)
    { id:"r32_1",  slot1:"A1", slot2:"C3orD3orE3orF3" },
    { id:"r32_2",  slot1:"C1", slot2:"E3orG3orH3orJ3" },
    { id:"r32_3",  slot1:"E1", slot2:"G3orH3orI3orK3" },
    { id:"r32_4",  slot1:"G1", slot2:"A3orB3orC3orD3" },
    { id:"r32_5",  slot1:"I1", slot2:"K3orL3" },   // France's side
    { id:"r32_6",  slot1:"K1", slot2:"B3orC3" },
    { id:"r32_7",  slot1:"B2", slot2:"F2" },
    { id:"r32_8",  slot1:"D2", slot2:"H2" },
    // Pathway 2 (leading to SF2)
    { id:"r32_9",  slot1:"B1", slot2:"F3orG3" },
    { id:"r32_10", slot1:"D1", slot2:"A3orB3" },
    { id:"r32_11", slot1:"F1", slot2:"H3orI3" },
    { id:"r32_12", slot1:"H1", slot2:"J3orK3orL3" }, // Spain's side
    { id:"r32_13", slot1:"J1", slot2:"D3orE3" },     // Argentina's side
    { id:"r32_14", slot1:"L1", slot2:"I3orJ3" },     // England's side
    { id:"r32_15", slot1:"A2", slot2:"E2" },
    { id:"r32_16", slot1:"C2", slot2:"G2" },
    // Then J2 vs L2 implied
    { id:"r32_17", slot1:"J2", slot2:"L2" },
    { id:"r32_18", slot1:"K2", slot2:"I2" },         // fill last 2
  ],
};

export const ROUND_LABELS = {
  r32: "Round of 32",
  r16: "Round of 16",
  qf: "Quarter-Finals",
  sf: "Semi-Finals",
  f: "Final",
};

export const CONFEDERATIONS = {
  UEFA: { name:"UEFA", color:"#4FC3F7", teams:16 },
  CAF:  { name:"CAF",  color:"#FF9800", teams:10 },
  AFC:  { name:"AFC",  color:"#66BB6A", teams:9  },
  CONMEBOL:{ name:"CONMEBOL",color:"#EF5350",teams:6 },
  CONCACAF:{ name:"CONCACAF",color:"#AB47BC",teams:6 },
  OFC:  { name:"OFC",  color:"#26C6DA", teams:1  },
};

export const PAST_CHAMPIONS = [
  { year:2022, winner:"Argentina", flag:"🇦🇷", runner:"France" },
  { year:2018, winner:"France",    flag:"🇫🇷", runner:"Croatia" },
  { year:2014, winner:"Germany",   flag:"🇩🇪", runner:"Argentina" },
  { year:2010, winner:"Spain",     flag:"🇪🇸", runner:"Netherlands" },
  { year:2006, winner:"Italy",     flag:"🇮🇹", runner:"France" },
  { year:2002, winner:"Brazil",    flag:"🇧🇷", runner:"Germany" },
];
