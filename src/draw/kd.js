/* Shared layout + Nokta helpers for "Üçgenin Sırrı". */
(function (LI) {
  'use strict';
  const { clamp } = LI.E;
  LI.KD = {
    /** positions for 16:9 and 9:16 */
    L(env) {
      return env.V
        ? { A: [-230, -250], base: 460, P: [40, 60], S: [40, 210], nx: -250, gy: 560, s: 1.15 }
        : { A: [-80, 150], base: 520, P: [700, 150], S: [600, -330], nx: -660, gy: 262, s: 1.15 };
    },
    cam(env, o = {}) { return Object.assign({ x: env.V ? 0 : -60, y: env.V ? 60 : 0, zoom: 1, rot: 0, tilt: 1 }, o); },
    /** pupils + face toward a world point */
    look(p, target) {
      const e = LI.Nokta.eyes(p)[0];
      const dx = target[0] - e[0], dy = target[1] - e[1], d = Math.hypot(dx, dy) || 1;
      p.lookX = clamp(dx / d * 1.1, -1, 1); p.lookY = clamp(dy / d * 1.1, -1, 1);
      p.turn = clamp(dx / 900, -0.5, 0.5);
      return p;
    },
    /** a short ground stroke under Nokta */
    ground(ctx, env, x, gy) { LI.Ambient.ground(ctx, x - 360, x + 360, gy + 6, { alpha: 0.32 }); },
  };
})(window.LI = window.LI || {});
