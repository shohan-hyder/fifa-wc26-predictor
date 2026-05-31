// FIFA World Cup 2026 — Official Data
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

export const TEAMS = {
  Mexico: { confederation: "CONCACAF", host: true, strength: 74, fifaRank: 15, group: "A", debut: false },
  "South Africa": { confederation: "CAF", host: false, strength: 58, fifaRank: 60, group: "A", debut: false },
  "South Korea": { confederation: "AFC", host: false, strength: 70, fifaRank: 22, group: "A", debut: false },
  Czechia: { confederation: "UEFA", host: false, strength: 68, fifaRank: 26, group: "A", debut: false },
  Canada: { confederation: "CONCACAF", host: true, strength: 67, fifaRank: 30, group: "B", debut: false },
  "Bosnia & Herz.": { confederation: "UEFA", host: false, strength: 60, fifaRank: 52, group: "B", debut: false },
  Qatar: { confederation: "AFC", host: false, strength: 56, fifaRank: 62, group: "B", debut: false },
  Switzerland: { confederation: "UEFA", host: false, strength: 73, fifaRank: 18, group: "B", debut: false },
  Brazil: { confederation: "CONMEBOL", host: false, strength: 86, fifaRank: 5, group: "C", debut: false },
  Morocco: { confederation: "CAF", host: false, strength: 76, fifaRank: 11, group: "C", debut: false },
  Haiti: { confederation: "CONCACAF", host: false, strength: 50, fifaRank: 82, group: "C", debut: false },
  Scotland: { confederation: "UEFA", host: false, strength: 66, fifaRank: 34, group: "C", debut: false },
  "United States": { confederation: "CONCACAF", host: true, strength: 75, fifaRank: 13, group: "D", debut: false },
  Paraguay: { confederation: "CONMEBOL", host: false, strength: 63, fifaRank: 42, group: "D", debut: false },
  Australia: { confederation: "AFC", host: false, strength: 68, fifaRank: 24, group: "D", debut: false },
  Türkiye: { confederation: "UEFA", host: false, strength: 69, fifaRank: 25, group: "D", debut: false },
  Germany: { confederation: "UEFA", host: false, strength: 84, fifaRank: 6, group: "E", debut: false },
  Curaçao: { confederation: "CONCACAF", host: false, strength: 44, fifaRank: 98, group: "E", debut: true },
  "Ivory Coast": { confederation: "CAF", host: false, strength: 69, fifaRank: 23, group: "E", debut: false },
  Ecuador: { confederation: "CONMEBOL", host: false, strength: 68, fifaRank: 27, group: "E", debut: false },
  Netherlands: { confederation: "UEFA", host: false, strength: 82, fifaRank: 7, group: "F", debut: false },
  Japan: { confederation: "AFC", host: false, strength: 77, fifaRank: 10, group: "F", debut: false },
  Sweden: { confederation: "UEFA", host: false, strength: 72, fifaRank: 19, group: "F", debut: false },
  Tunisia: { confederation: "CAF", host: false, strength: 60, fifaRank: 49, group: "F", debut: false },
  Belgium: { confederation: "UEFA", host: false, strength: 79, fifaRank: 9, group: "G", debut: false },
  Egypt: { confederation: "CAF", host: false, strength: 64, fifaRank: 38, group: "G", debut: false },
  Iran: { confederation: "AFC", host: false, strength: 62, fifaRank: 44, group: "G", debut: false },
  "New Zealand": { confederation: "OFC", host: false, strength: 50, fifaRank: 80, group: "G", debut: false },
  Spain: { confederation: "UEFA", host: false, strength: 94, fifaRank: 1, group: "H", debut: false },
  "Cape Verde": { confederation: "CAF", host: false, strength: 53, fifaRank: 75, group: "H", debut: true },
  "Saudi Arabia": { confederation: "AFC", host: false, strength: 62, fifaRank: 45, group: "H", debut: false },
  Uruguay: { confederation: "CONMEBOL", host: false, strength: 79, fifaRank: 8, group: "H", debut: false },
  France: { confederation: "UEFA", host: false, strength: 93, fifaRank: 2, group: "I", debut: false },
  Senegal: { confederation: "CAF", host: false, strength: 71, fifaRank: 20, group: "I", debut: false },
  Iraq: { confederation: "AFC", host: false, strength: 53, fifaRank: 76, group: "I", debut: false },
  Norway: { confederation: "UEFA", host: false, strength: 73, fifaRank: 17, group: "I", debut: false },
  Argentina: { confederation: "CONMEBOL", host: false, strength: 92, fifaRank: 3, group: "J", debut: false },
  Algeria: { confederation: "CAF", host: false, strength: 61, fifaRank: 46, group: "J", debut: false },
  Austria: { confederation: "UEFA", host: false, strength: 69, fifaRank: 21, group: "J", debut: false },
  Jordan: { confederation: "AFC", host: false, strength: 51, fifaRank: 78, group: "J", debut: true },
  Portugal: { confederation: "UEFA", host: false, strength: 88, fifaRank: 4, group: "K", debut: false },
  "DR Congo": { confederation: "CAF", host: false, strength: 57, fifaRank: 58, group: "K", debut: false },
  Uzbekistan: { confederation: "AFC", host: false, strength: 55, fifaRank: 68, group: "K", debut: true },
  Colombia: { confederation: "CONMEBOL", host: false, strength: 77, fifaRank: 12, group: "K", debut: false },
  England: { confederation: "UEFA", host: false, strength: 87, fifaRank: 4, group: "L", debut: false },
  Croatia: { confederation: "UEFA", host: false, strength: 75, fifaRank: 14, group: "L", debut: false },
  Ghana: { confederation: "CAF", host: false, strength: 61, fifaRank: 47, group: "L", debut: false },
  Panama: { confederation: "CONCACAF", host: false, strength: 56, fifaRank: 63, group: "L", debut: false },
};

export const GROUPS = {
  A: ["Mexico", "South Africa", "South Korea", "Czechia"],
  B: ["Canada", "Bosnia & Herz.", "Qatar", "Switzerland"],
  C: ["Brazil", "Morocco", "Haiti", "Scotland"],
  D: ["United States", "Paraguay", "Australia", "Türkiye"],
  E: ["Germany", "Curaçao", "Ivory Coast", "Ecuador"],
  F: ["Netherlands", "Japan", "Sweden", "Tunisia"],
  G: ["Belgium", "Egypt", "Iran", "New Zealand"],
  H: ["Spain", "Cape Verde", "Saudi Arabia", "Uruguay"],
  I: ["France", "Senegal", "Iraq", "Norway"],
  J: ["Argentina", "Algeria", "Austria", "Jordan"],
  K: ["Portugal", "DR Congo", "Uzbekistan", "Colombia"],
  L: ["England", "Croatia", "Ghana", "Panama"],
};

export function generateGroupFixtures() {
  const fixtures = [];
  let id = 0;
  Object.entries(GROUPS).forEach(([group, teams]) => {
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        fixtures.push({
          id: id++, group, home: teams[i], away: teams[j],
          homeScore: null, awayScore: null, played: false,
        });
      }
    }
  });
  return fixtures;
}

export function calculateGroupStandings(group, fixtures) {
  const teams = GROUPS[group];
  const stats = {};
  teams.forEach(t => { stats[t] = { team: t, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, results: {} }; });
  const playedFixtures = fixtures.filter(f => f.group === group && f.played);
  playedFixtures.forEach(f => {
    const h = stats[f.home], a = stats[f.away];
    if (!h || !a) return;
    h.p++; a.p++; h.gf += f.homeScore; h.ga += f.awayScore; a.gf += f.awayScore; a.ga += f.homeScore;
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
    const aVsB_pts = a.results[b.team] ? (a.results[b.team].scored > a.results[b.team].conceded ? 3 : a.results[b.team].scored === a.results[b.team].conceded ? 1 : 0) : 0;
    const bVsA_pts = b.results[a.team] ? (b.results[a.team].scored > b.results[a.team].conceded ? 3 : b.results[a.team].scored === b.results[a.team].conceded ? 1 : 0) : 0;
    if (aVsB_pts !== bVsA_pts) return bVsA_pts - aVsB_pts;
    const aVsB_gd = a.results[b.team] ? a.results[b.team].scored - a.results[b.team].conceded : 0;
    const bVsA_gd = b.results[a.team] ? b.results[a.team].scored - b.results[a.team].conceded : 0;
    if (aVsB_gd !== bVsA_gd) return bVsA_gd - aVsB_gd;
    const aVsB_gf = a.results[b.team] ? a.results[b.team].scored : 0;
    const bVsA_gf = b.results[a.team] ? b.results[a.team].scored : 0;
    if (aVsB_gf !== bVsA_gf) return bVsA_gf - aVsB_gf;
    if (b.gd !== a.gd) return b.gd - a.gd;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return (TEAMS[b.team]?.strength || 0) - (TEAMS[a.team]?.strength || 0);
  });
  return standings;
}

export function getBest3rdPlace(allStandings) {
  const thirdPlace = Object.entries(allStandings).map(([group, standings]) => ({ ...standings[2], group })).filter(t => t && t.team);
  thirdPlace.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.gd !== a.gd) return b.gd - a.gd;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return (TEAMS[b.team]?.strength || 0) - (TEAMS[a.team]?.strength || 0);
  });
  return thirdPlace.slice(0, 8);
}

export const ROUND_LABELS = {
  r32: "Round of 32", r16: "Round of 16", qf: "Quarter-Finals", sf: "Semi-Finals", f: "Final",
};
export const CONFEDERATIONS = {
  UEFA: { name: "UEFA", color: "#4FC3F7", teams: 16 }, CAF: { name: "CAF", color: "#FF9800", teams: 10 },
  AFC: { name: "AFC", color: "#66BB6A", teams: 9 }, CONMEBOL: { name: "CONMEBOL", color: "#EF5350", teams: 6 },
  CONCACAF: { name: "CONCACAF", color: "#AB47BC", teams: 6 }, OFC: { name: "OFC", color: "#26C6DA", teams: 1 },
};
export const PAST_CHAMPIONS = [
  { year: 2022, winner: "Argentina", flag: "🇦", runner: "France" },
  { year: 2018, winner: "France", flag: "🇫🇷", runner: "Croatia" },
  { year: 2014, winner: "Germany", flag: "🇩🇪", runner: "Argentina" },
  { year: 2010, winner: "Spain", flag: "🇸", runner: "Netherlands" },
  { year: 2006, winner: "Italy", flag: "🇹", runner: "France" },
  { year: 2002, winner: "Brazil", flag: "🇧🇷", runner: "Germany" },
];