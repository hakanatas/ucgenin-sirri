/* SAHNE 4 — AÇILARINA GÖRE (44–58 s)  Acute, right and obtuse triangles. */
(function (LI) {
  'use strict';
  const { seg, hump } = LI.E;
  const A = LI.Ang, KD = LI.KD, F = () => LI.Film;
  /** three triangle spots: A-corner position of each */
  LI.Row = (env) => env.V
    ? { A: [[-90, -580], [-90, -140], [-90, 270]], base: 230, name: 58 }
    : { A: [[-400, 110], [40, 110], [470, 110]], base: 300, name: 66 };
  const SET = [
    { al: 60, be: 70, name: 'dar açılı', key: [0, 1, 2], t0: 44.8 },
    { al: 90, be: 40, name: 'dik açılı', key: [0], t0: 49.2 },
    { al: 30, be: 30, name: 'geniş açılı', key: [2], t0: 53.6 },
  ];
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => {
      const m = 1 - seg(t, 44.0, 44.6);
      if (m > 0) { const P = LI.drawMain(ctx, env, t, { alpha: m }); const v = F().vals(...F().angles(t)); [0, 1, 2].forEach((i) => F().corner(ctx, P, i, { label: v[i], la: 1, alpha: m })); }
      const R = LI.Row(env), out = 1 - seg(t, 57.6, 58.2);
      SET.forEach((s, j) => {
        const P = F().tri(R.A[j], R.base, s.al, s.be), v = F().vals(s.al, s.be);
        F().fill(ctx, P, seg(t, s.t0 + 0.6, s.t0 + 1.0) * out);
        F().outline(ctx, P, { p: seg(t, s.t0, s.t0 + 0.8), alpha: out, w: 8, seed: 20 + j });
        [0, 1, 2].forEach((i) => {
          const key = s.key.includes(i), pulse = key ? 1 + 0.25 * hump(t, s.t0 + 1.6, s.t0 + 2.6) : 1;
          F().corner(ctx, P, i, { r: 46, p: seg(t, s.t0 + 0.8, s.t0 + 1.3), label: v[i], la: seg(t, s.t0 + 1.1, s.t0 + 1.5), size: (key ? 50 : 40) * pulse, gap: 40, alpha: out * (key ? 1 : 0.6) });
        });
        A.text(ctx, s.name, R.A[j][0] + R.base / 2, R.A[j][1] + R.name, { size: 50, p: seg(t, s.t0 + 1.4, s.t0 + 2.1), alpha: out });
      });
    });
  }
  LI.registerScene({ id: 4, start: 44, end: 58, name: 'By angles', nameTr: 'Açılarına göre', concept: 'Acute · right · obtuse', conceptTr: 'Dar · dik · geniş açılı', render });
})(window.LI = window.LI || {});
