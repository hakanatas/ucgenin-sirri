/* ─────────────────────────────────────────────────────────────
   The film's continuous state as pure functions of time.
   The main triangle is built from its two base angles (α at A, β at B)
   on a fixed base AB, so its shape can change smoothly while the
   angle sum stays exactly 180°.
   ───────────────────────────────────────────────────────────── */
(function (LI) {
  'use strict';
  const { seg, clamp, lerp, track, inOut, outBack, outCubic, hump } = LI.E;
  const A = LI.Ang, KD = LI.KD, Ink = LI.Ink;
  const R2D = 180 / Math.PI, D2R = Math.PI / 180;

  /** triangle on base A→B (length base) with base angles al (at A) and be (at B) */
  function tri(Pa, base, al, be) {
    const B = [Pa[0] + base, Pa[1]];
    const ac = (base * Math.sin(be * D2R)) / Math.sin((al + be) * D2R);
    return [Pa, B, A.at(Pa, al, ac)];
  }
  /** the three angles as whole degrees that always add up to exactly 180 */
  const vals = (al, be) => { const a = Math.round(al), b = Math.round(be); return [a, b, 180 - a - b]; };

  /** the main triangle's base angles over time */
  function angles(t) {
    const al = track([[0, 50], [32, 50], [34.5, 30], [36.5, 30], [39, 80], [41, 80], [43.5, 50], [92, 50]], t);
    const be = track([[0, 70], [32, 70], [34.5, 40], [36.5, 40], [39, 55], [41, 55], [43.5, 70], [92, 70]], t);
    return [al, be];
  }

  const rel = (V, X) => [X[0] - V[0], X[1] - V[1]];
  const degOf = (v) => Math.atan2(-v[1], v[0]) * R2D;
  /** inside-angle sector at corner i: start direction and sweep (degrees) */
  function sector(P, i) {
    const V = P[i], a = P[(i + P.length - 1) % P.length], b = P[(i + 1) % P.length];
    let d1 = degOf(rel(V, a)), d2 = degOf(rel(V, b));
    let sw = (((d2 - d1) % 360) + 360) % 360;
    if (sw > 180) { d1 = d2; sw = 360 - sw; }
    return { V, d1, sw };
  }
  /** amber arc (or square for 90°) for the inside angle at corner i, with an optional degree label */
  function corner(ctx, P, i, o = {}) {
    const { V, d1, sw } = sector(P, i), r = o.r ?? 56, a = o.alpha ?? 1;
    if (a <= 0) return;
    const k = o.p ?? 1;
    A.wedge(ctx, V, r, d1, d1 + sw, (o.fill ?? 0.2) * a * k);
    if (Math.abs(sw - 90) < 0.6 && o.square !== false) A.square(ctx, V, d1, r * 0.62, { p: k, alpha: a });
    else A.arc(ctx, V, r, d1 + 2, d1 + sw - 2, { p: k, alpha: a, w: o.w ?? 6, seed: 40 + i });
    if (o.label != null && (o.la ?? 0) > 0) {
      const m = d1 + sw / 2, L = A.at(V, m, r + (o.gap ?? 56) + (sw < 40 ? 26 : 0));
      A.deg(ctx, o.label, L[0], L[1], { size: o.size ?? 52, halo: true, alpha: o.la * a });
    }
  }
  /** little equal-length marks on side i (n strokes) */
  function ticks(ctx, P, i, n, o = {}) {
    const V = P[i], W = P[(i + 1) % P.length], M = [(V[0] + W[0]) / 2, (V[1] + W[1]) / 2];
    const d = degOf(rel(V, W)), a = o.alpha ?? 1; if (a <= 0 || n <= 0) return;
    for (let j = 0; j < n; j++) {
      const C = A.at(M, d, (j - (n - 1) / 2) * 15);
      Ink.path(ctx, [A.at(C, d + 90, -18), A.at(C, d + 90, 18)], { w: 6, color: LI.AMBER_RGB, alpha: a, p: o.p ?? 1, seed: 90 + i * 3 + j, taper: [0.1, 0.1] });
    }
  }
  const outline = (ctx, P, o = {}) => Ink.path(ctx, P.concat([P[0]]), { w: o.w ?? 10, p: o.p ?? 1, seed: o.seed ?? 7, taper: [0.02, 0.02], wob: 0.12, dry: 0.3, bleed: 0.5, alpha: o.alpha ?? 1 });
  function fill(ctx, P, a) { if (a <= 0) return; ctx.fillStyle = `rgba(${LI.AMBER_RGB},${0.1 * a})`; ctx.beginPath(); P.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.closePath(); ctx.fill(); }
  /** a regular polygon's corners (bottom side horizontal) */
  function regular(n, G, Rc) { const P = []; for (let i = 0; i < n; i++) P.push(A.at(G, 270 - 180 / n + (360 * i) / n, Rc)); return P; }

  /** the three corners torn off and laid side by side on a straight line (k: 0 on the triangle → 1 on the line) */
  function tiles(ctx, env, P, k, o = {}) {
    const L = KD.L(env), a = o.alpha ?? 1; if (a <= 0) return;
    const [al, be] = [sector(P, 0).sw, sector(P, 1).sw];
    const starts = [be + (180 - al - be), 0, be]; // A: left, B: right, C: middle
    const lab = vals(al, be), rw = 120;
    [1, 2, 0].forEach((i, n) => {
      const s = sector(P, i), kk = inOut(seg(k, n * 0.15, n * 0.15 + 0.7));
      let d1 = s.d1; while (d1 - starts[i] > 180) d1 -= 360; while (starts[i] - d1 > 180) d1 += 360;
      const C = [lerp(s.V[0], L.P[0], kk), lerp(s.V[1], L.P[1], kk)], st = lerp(d1, starts[i], kk);
      A.wedge(ctx, C, rw, st, st + s.sw, 0.3 * a);
      Ink.path(ctx, [A.at(C, st, rw), C, A.at(C, st + s.sw, rw)], { w: 3, alpha: 0.7 * a, seed: 70 + i, taper: [0, 0] });
      A.arc(ctx, C, rw, st + 2, st + s.sw - 2, { alpha: a, w: 6, seed: 74 + i });
      if (kk >= 1 && (o.labels ?? 1) > 0) { const Q = A.at(C, st + s.sw / 2, rw * 0.64); A.text(ctx, `${lab[i]}°`, Q[0], Q[1], { size: 40, alpha: a * o.labels, color: (x) => `rgba(${LI.INK_RGB},${x})` }); }
    });
  }

  /** Nokta, as a function of time */
  function nokta(t, env) {
    const L = KD.L(env);
    const p = { x: L.nx, y: L.gy, s: L.s, mouth: 0.4, brow: 0.1 };
    const g = outCubic(seg(t, 1.3, 2.3));
    p.born = { body: lerp(0.3, 1, g), legs: outCubic(seg(t, 2.0, 2.6)), arms: outCubic(seg(t, 2.3, 2.8)), tuft: outBack(seg(t, 2.5, 2.9)) };
    if (t < 3.0) { p.sq = lerp(0.4, 1, clamp(LI.E.spring(seg(t, 1.3, 3.0) * 2, 8, 3.4), 0, 1.3)); p.drop = 1 - g; p.wobble = 1 - seg(t, 1.3, 2.8); }
    p.eyeOpen = outCubic(seg(t, 2.8, 3.1));
    KD.look(p, [L.A[0] + L.base / 2, L.A[1] - 120]);
    if (t > 16.8 && t < 29) KD.look(p, L.P);
    if (t > 2.9 && t < 5.6) { p.hold = 'brush'; p.brushAng = -0.8 + 0.3 * Math.sin(t * 9); p.hands = { R: [1.35, -0.2 + 0.15 * Math.sin(t * 9)] }; }
    const pointing = (a, b) => { if (t > a && t < b) { p.point = 'R'; p.hands = { L: [-1.2, 0.55], R: [1.5, -0.35] }; } };
    pointing(16.8, 19.6); pointing(32.0, 43.6);
    if (t > 19.8 && t < 21.4) { p.mouthOpen = 0.6; p.eyeScale = 1.1; p.sq = 1.05; }
    const joy = (a, b) => { if (t > a && t < b) { p.squint = 1; p.mouth = 1; p.sq = 1 + 0.1 * hump(t, a, a + 0.6); p.y -= 26 * hump(t, a, a + 0.6); p.hands = { L: [-1.3, -0.35], R: [1.3, -0.35] }; } };
    joy(14.6, 16.2); joy(26.0, 27.6); joy(56.2, 57.8); joy(73.4, 75.0);
    if (t > 85.0) {
      const j = (t - 85.0) % 1.4;
      p.squint = 1; p.mouth = 1; p.turn = 0.15; p.lookX = 0.3; p.lookY = 0;
      p.sq = 1 + 0.1 * Math.sin(Math.PI * clamp(j / 0.6)); p.y -= 40 * Math.sin(Math.PI * clamp(j / 0.6));
      p.hands = { L: [-1.35, -0.6 - 0.2 * Math.sin(t * 6)], R: [1.35, -0.6 + 0.2 * Math.sin(t * 6)] };
      if (t > 89.2) { p.squint = 0; p.lookX = 0; p.lookY = 0.2; p.turn = 0; p.y = L.gy; p.sq = 1; p.hands = { L: [-1.2, 0.55], R: [1.2, -1.0 + 0.25 * Math.sin(t * 10)] }; }
    }
    p.blink = Math.max(hump(t, 5.8, 5.95), hump(t, 23.0, 23.15), hump(t, 31.0, 31.15), hump(t, 47.0, 47.15), hump(t, 63.0, 63.15), hump(t, 80.0, 80.15));
    return p;
  }

  /** the main triangle (on screen in scenes 1–3 and 7) */
  function main(t, env) { const L = KD.L(env), [al, be] = angles(t); return tri(L.A, L.base, al, be); }

  /** common render: ground and Nokta; returns the camera-space helpers */
  function base(ctx, env, t, cam, drawBefore) {
    const L = KD.L(env);
    LI.Ambient.specks(ctx, env, cam, t, { alpha: 0.22, n: 18, depth: 0.4, seed: 21 });
    LI.Camera.apply(ctx, env, cam);
    KD.ground(ctx, env, L.nx, L.gy);
    if (drawBefore) drawBefore();
    LI.Nokta.draw(ctx, LI.Nokta.follow((tt) => nokta(tt, env), t), t);
    if (t < 1.35 && t > 0.3) { const f = seg(t, 0.3, 1.3); Ink.dot(ctx, L.nx, lerp(-700, L.gy - 14, f * f), 15, { seed: 2, bleed: 0 }); }
    if (t > 1.3) Ink.drops(ctx, L.nx, L.gy - 4, t - 1.3, { n: 9, seed: 5, ground: L.gy + 4, scale: 0.8, alpha: 1 - seg(t, 4, 8) * 0.6 });
    return L;
  }

  /** the "a + b + c = 180°" sum line */
  function sum(ctx, env, t, v, a, p) {
    const L = KD.L(env); if (a <= 0) return;
    A.text(ctx, `${v[0]}° + ${v[1]}° + ${v[2]}° = 180°`, L.S[0], L.S[1], { size: 56, color: A.amber, halo: true, alpha: a, p });
  }

  LI.Film = { tri, vals, angles, sector, corner, ticks, outline, fill, regular, tiles, nokta, main, base, sum };
})(window.LI = window.LI || {});
