/* SAHNE 5 — KENARLARINA GÖRE (58–76 s)
   Scalene, isosceles, equilateral (marked with equal-length ticks).
   Equal sides face equal angles; in an equilateral triangle every angle is 60°. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const A = LI.Ang, KD = LI.KD, F = () => LI.Film;
  const SET = [
    { al: 45, be: 75, name: 'çeşitkenar', ticks: [1, 2, 3], ang: [], t0: 58.6 },
    { al: 70, be: 70, name: 'ikizkenar', ticks: [2, 1, 1], ang: [0, 1], t0: 62.6 },
    { al: 60, be: 60, name: 'eşkenar', ticks: [1, 1, 1], ang: [0, 1, 2], t0: 66.6 },
  ];
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => {
      const R = LI.Row(env), out = 1 - seg(t, 75.6, 76.2);
      SET.forEach((s, j) => {
        const P = F().tri(R.A[j], R.base, s.al, s.be), v = F().vals(s.al, s.be);
        F().fill(ctx, P, seg(t, s.t0 + 0.6, s.t0 + 1.0) * out);
        F().outline(ctx, P, { p: seg(t, s.t0, s.t0 + 0.8), alpha: out, w: 8, seed: 30 + j });
        s.ticks.forEach((n, i) => F().ticks(ctx, P, i, n, { p: seg(t, s.t0 + 0.9 + i * 0.25, s.t0 + 1.2 + i * 0.25), alpha: out }));
        A.text(ctx, s.name, R.A[j][0] + R.base / 2, R.A[j][1] + R.name, { size: 50, p: seg(t, s.t0 + 1.2, s.t0 + 1.9), alpha: out });
        s.ang.forEach((i, n) => F().corner(ctx, P, i, { r: 46, p: seg(t, 70.8 + j * 0.8 + n * 0.3, 71.3 + j * 0.8 + n * 0.3), label: v[i], la: seg(t, 71.1 + j * 0.8 + n * 0.3, 71.5 + j * 0.8 + n * 0.3), size: 46, gap: 40, alpha: out }));
      });
    });
  }
  LI.registerScene({ id: 5, start: 58, end: 76, name: 'By sides', nameTr: 'Kenarlarına göre', concept: 'Scalene · isosceles · equilateral', conceptTr: 'Çeşitkenar · ikizkenar · eşkenar', render });
})(window.LI = window.LI || {});
