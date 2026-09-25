/* SAHNE 7 — KAPANIŞ (84–92 s)  The triangle and its three torn-off corners: 180°. Nokta celebrates. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const A = LI.Ang, KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => {
      const a = seg(t, 84.0, 84.8), L = KD.L(env);
      const P = F().main(t, env), v = F().vals(...F().angles(t));
      F().fill(ctx, P, a); F().outline(ctx, P, { alpha: a });
      [0, 1, 2].forEach((i) => F().corner(ctx, P, i, { label: v[i], la: 1, alpha: a }));
      LI.Ink.path(ctx, [[L.P[0] - 230, L.P[1]], [L.P[0] + 230, L.P[1]]], { w: 5, seed: 66, alpha: a });
      F().tiles(ctx, env, P, 1, { alpha: a, labels: 1 });
      A.text(ctx, '180°', L.P[0], L.P[1] - 180, { size: 72, color: A.amber, halo: true, alpha: a });
    });
    const k = seg(t, 85.4, 87.4);
    if (k > 0 && t < 91) {
      const n = LI.Film.nokta(t, env), C = [n.x, n.y - 170];
      [30, 60, 90, 120, 150].forEach((d, i) => {
        const r = 150 + 30 * Math.sin(t * 2 + i);
        A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
      });
    }
  }
  LI.registerScene({ id: 7, start: 84, end: 92, name: 'Remember', nameTr: 'Aklında kalsın', concept: 'Inside angles of a triangle: 180°', conceptTr: 'Üçgenin iç açıları toplamı 180°', render });
})(window.LI = window.LI || {});
