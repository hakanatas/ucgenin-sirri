/* SAHNE 2 — 180° (8–30 s)
   Measure the three inside angles, add them: 180°. Then tear the corners off and
   lay them side by side on a straight line: together they make a straight angle. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const A = LI.Ang, KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => {
      const P = LI.drawMain(ctx, env, t), v = F().vals(...F().angles(t)), L = KD.L(env);
      [0, 1, 2].forEach((i) => F().corner(ctx, P, i, { p: seg(t, 8.6 + 0.6 * i, 9.2 + 0.6 * i), label: v[i], la: seg(t, 9.0 + 0.6 * i, 9.4 + 0.6 * i) }));
      const out = 1 - seg(t, 29.4, 30.0);
      F().sum(ctx, env, t, v, out, seg(t, 13.0, 14.4));
      // the straight line the corners will sit on
      const ln = seg(t, 16.6, 17.2);
      if (ln > 0) LI.Ink.path(ctx, [[L.P[0] - 230, L.P[1]], [L.P[0] + 230, L.P[1]]], { w: 5, p: ln, seed: 66, alpha: out });
      const k = seg(t, 17.2, 19.8);
      if (k > 0) F().tiles(ctx, env, P, k, { alpha: out, labels: seg(t, 19.8, 20.2) });
      A.text(ctx, '180°', L.P[0], L.P[1] - 180, { size: 72, color: A.amber, halo: true, p: seg(t, 20.2, 20.8), alpha: out });
    });
  }
  LI.registerScene({ id: 2, start: 8, end: 30, name: '180°', nameTr: 'Toplam 180°', concept: 'Inside angles add up to 180°', conceptTr: 'İç açılar toplamı 180°', render });
})(window.LI = window.LI || {});
