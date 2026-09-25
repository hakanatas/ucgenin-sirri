/* SAHNE 1 — BİR ÜÇGEN (0–8 s)  Nokta is born from a drop of ink and draws a triangle. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  LI.drawMain = function (ctx, env, t, o = {}) {
    const P = F().main(t, env), a = o.alpha ?? 1;
    F().fill(ctx, P, seg(t, 5.2, 6.0) * a);
    F().outline(ctx, P, { p: seg(t, 3.3, 5.3), alpha: a });
    return P;
  };
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.drawMain(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 8, name: 'A triangle', nameTr: 'Bir üçgen', concept: 'Three sides, three angles', conceptTr: 'Üç kenar, üç açı', render });
})(window.LI = window.LI || {});
