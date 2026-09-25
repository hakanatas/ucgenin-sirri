/* SAHNE 3 — HEP 180° (30–44 s)  The triangle changes shape; the angles change; the sum does not. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => {
      const P = LI.drawMain(ctx, env, t), v = F().vals(...F().angles(t));
      [0, 1, 2].forEach((i) => F().corner(ctx, P, i, { label: v[i], la: 1 }));
      F().sum(ctx, env, t, v, seg(t, 30.2, 30.8), 1);
    });
  }
  LI.registerScene({ id: 3, start: 30, end: 44, name: 'Always 180°', nameTr: 'Hep 180°', concept: 'Any triangle: 180°', conceptTr: 'Her üçgende 180°', render });
})(window.LI = window.LI || {});
