/* SAHNE 6 — DÜZGÜN ÇOKGENLER (76–84 s)  All sides equal and all angles equal. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const A = LI.Ang, KD = LI.KD, F = () => LI.Film;
  const SET = [[3, 'eşkenar üçgen', 60], [4, 'kare', 90], [5, 'düzgün beşgen', 108], [6, 'düzgün altıgen', 120]];
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => {
      const S = env.V ? [[-200, -660], [240, -660], [-200, -230], [240, -230]] : [[-330, -60], [-30, -60], [270, -60], [570, -60]];
      const Rr = env.V ? 115 : 105, out = 1 - seg(t, 83.6, 84.2);
      SET.forEach(([n, name, deg], i) => {
        const t0 = 76.4 + i * 0.7, G = [S[i][0], S[i][1] + (n === 3 ? 18 : 0)], P = F().regular(n, G, Rr);
        F().fill(ctx, P, seg(t, t0 + 0.6, t0 + 1.0) * out);
        F().outline(ctx, P, { p: seg(t, t0, t0 + 0.7), alpha: out, w: 8, seed: 40 + i });
        P.forEach((_, j) => F().ticks(ctx, P, j, 1, { p: seg(t, t0 + 0.7, t0 + 1.0), alpha: out }));
        P.forEach((_, j) => F().corner(ctx, P, j, { r: 24, w: 4, p: seg(t, t0 + 1.0, t0 + 1.4), alpha: out, fill: 0.25, square: n === 4 }));
        A.text(ctx, `${deg}°`, G[0], G[1] + (n === 3 ? 10 : 0), { size: 44, color: A.amber, p: seg(t, t0 + 1.3, t0 + 1.8), alpha: out });
        A.text(ctx, name, S[i][0], S[i][1] + Rr + 60, { size: 42, p: seg(t, t0 + 0.8, t0 + 1.5), alpha: out });
      });
    });
  }
  LI.registerScene({ id: 6, start: 76, end: 84, name: 'Regular polygons', nameTr: 'Düzgün çokgenler', concept: 'Equal sides, equal angles', conceptTr: 'Eşit kenar, eşit açı', render });
})(window.LI = window.LI || {});
