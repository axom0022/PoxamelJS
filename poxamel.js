(function () {
const env = globalThis;
const math = env['Math'];
const jsonc = env['JSON'];
const plug = env['Promise'];
const objt = env['Object'];
const arrt = env['Array'];
const numt = env['Number'];
const strt = env['String'];
const boolt = env['Boolean'];
const datec = env['Date'];
const setc = env['Set'];
const mapc = env['Map'];
const weakc = env['WeakMap'];
const regxc = env['RegExp'];
const errc = env['Error'];
const imgc = env['Image'];
const { abs, acos, asin, atan, atan2, ceil, cos, exp, floor, hypot, log, max, min, pow, round, sign, sin, sqrt, tan } = math;
const pi = math['PI'];
const tau = pi * 2;
const eul = math['E'];
const inf = env['Infinity'];
const nan = env['NaN'];
const isbad = env['isNaN'];
const numof = env['parseFloat'];
const intof = env['parseInt'];
const rafx = env['requestAnimationFrame'];
const cafx = env['cancelAnimationFrame'];
const on = (a, b, c, d) => env['addEventListener'](a, b, c, d);
const off = (a, b, c, d) => env['removeEventListener'](a, b, c, d);
const now = () => (env['performance'] ? env['performance']['now']() : datec['now']());
const elm = (a) => env['document']['createElement'](a);
const getel = (a) => { const d = env['document']; if (!d) return null; return d['querySelector'](a) || (d['getElementById'] ? d['getElementById'](a) : null); };
const warn = (a) => { if (env['console']) env['console']['warn'](a); };
const bite = (a) => a | 0;
const temp = [];
const vecof = (a, b) => new vec(a, b);
const angleof = (a, b, c, d) => atan2(d - b, c - a);
const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a, b, t) => a + (b - a) * t;
const blerp = (a, b, t, dt) => (1 - pow(a, dt)) * t + pow(b, dt) * (b - b);
const smooth = (t) => t * t * (3 - 2 * t);
const smoother = (t) => t * t * t * (t * (t * 6 - 15) + 10);
const stepv = (t) => (t < 1 ? 1 : 0);
const quant = (v, s) => floor(v / s) * s;
const wrap = (v, lo, hi) => { const n = hi - lo; if (n <= 0) return lo; return lo + (((v - lo) % n) + n) % n; };
const ping = (v, lo, hi) => { const n = hi - lo; if (n <= 0) return lo; const t = wrap(v - lo, 0, n * 2); return lo + (t > n ? n * 2 - t : t); };
const mapr = (v, a, b, c, d) => c + (d - c) * ((v - a) / (b - a || 1));
const snap = (v, s) => round(v / s) * s;
const approach = (v, t, d) => (v < t ? min(v + d, t) : max(v - d, t));
const step2 = (v, t, d, s) => approach(v, t, d * s);
const move = (v, t, d, s) => (v < t ? min(v + d * s, t) : v > t ? max(v - d * s, t) : t);
const ease01 = (v, t, d, s) => clamp01(approach(v, t, d * s));
const springv = (v, t, k, damp, s) => (v - t) * (1 - (k * (1 - damp) * s)) + t;
const damp = (v, t, k, s) => t + (v - t) * exp(-k * s);
const fract = (v) => v - floor(v);
const distsq = (ax, ay, bx, by) => { const dx = bx - ax, dy = by - ay; return dx * dx + dy * dy; };
const dist = (ax, ay, bx, by) => sqrt(distsq(ax, ay, bx, by));
const angdiff = (a, b) => { let d = wrap(b - a, -pi, pi); return d; };
const rotx = (x, y, a) => x * cos(a) - y * sin(a);
const roty = (x, y, a) => x * sin(a) + y * cos(a);
const avgle = (a, b, t) => a + angdiff(a, b) * t;
const polar = (a, r) => ({ x: cos(a) * r, y: sin(a) * r });
const dirx = (a) => cos(a);
const diry = (a) => sin(a);
const aspect = (p) => (p === 'x' ? 1 : p === 'y' ? 0 : 0.5);
const hue2 = (l, a, d, h) => (h < 0 ? h + 1 : h > 1 ? h - 1 : h);
const hash = (a, b = 0) => { let h = (a * 374761393 + b * 668265263) | 0; h = (h ^ (h >> 13)) * 1274126177; return ((h ^ (h >> 16)) >>> 0) / 4294967296; };
const noise = (x, y = 0) => { const xi = floor(x), yi = floor(y), xf = x - xi, yf = y - yi; const u = smooth(xf), v = smooth(yf); return lerp(lerp(hash(xi, yi), hash(xi + 1, yi), u), lerp(hash(xi, yi + 1), hash(xi + 1, yi + 1), u), v); };
const fbm = (x, y = 0, oct = 4, gain = 0.5, lac = 2) => { let s = 0, a = 1, n = 0, f = 1; for (let i = 0; i < oct; i++) { s += noise(x * f, y * f) * a; n += a; a *= gain; f *= lac; } return s / n; };
const ridge = (x, y = 0, oct = 4) => { let s = 0, a = 1, n = 0, f = 1; for (let i = 0; i < oct; i++) { s += (1 - abs(noise(x * f, y * f) * 2 - 1)) * a; n += a; a *= 0.5; f *= 2; } return s / n; };

class vec {
  constructor(x = 0, y = 0) { this.x = x; this.y = y; }
  set(x = 0, y = 0) { this.x = x; this.y = y; return this; }
  setv(v) { this.x = v.x; this.y = v.y; return this; }
  copy() { return new vec(this.x, this.y); }
  setar(a) { this.x = a[0]; this.y = a[1]; return this; }
  add(x, y) { if (x instanceof vec) { this.x += x.x; this.y += x.y; } else { this.x += x; this.y += y || 0; } return this; }
  sub(x, y) { if (x instanceof vec) { this.x -= x.x; this.y -= x.y; } else { this.x -= x; this.y -= y || 0; } return this; }
  mul(x, y) { if (x instanceof vec) { this.x *= x.x; this.y *= x.y; } else { this.x *= x; this.y *= x; } return this; }
  div(x) { this.x /= x; this.y /= x; return this; }
  neg() { this.x = -this.x; this.y = -this.y; return this; }
  rot(a) { const x = rotx(this.x, this.y, a), y = roty(this.x, this.y, a); this.x = x; this.y = y; return this; }
  perp() { const x = -this.y; this.y = this.x; this.x = x; return this; }
  sq() { return this.x * this.x + this.y * this.y; }
  len() { return hypot(this.x, this.y); }
  norm() { const l = hypot(this.x, this.y); if (l > 1e-9) { this.x /= l; this.y /= l; } else { this.x = 0; this.y = 1; } return this; }
  limit(m) { const l = hypot(this.x, this.y); if (l > m) { this.x = (this.x / l) * m; this.y = (this.y / l) * m; } return this; }
  clamplen(a, b) { const l = hypot(this.x, this.y); if (l < 1e-9) return this; const c = clamp(l, a, b); this.x = (this.x / l) * c; this.y = (this.y / l) * c; return this; }
  floor() { this.x = floor(this.x); this.y = floor(this.y); return this; }
  round() { this.x = round(this.x); this.y = round(this.y); return this; }
  abs() { this.x = abs(this.x); this.y = abs(this.y); return this; }
  lrp(v, t) { this.x = lerp(this.x, v.x, t); this.y = lerp(this.y, v.y, t); return this; }
  toward(v, d) { this.x = approach(this.x, v.x, d); this.y = approach(this.y, v.y, d); return this; }
  ang() { return atan2(this.y, this.x); }
  setang(a, r = 1) { this.x = cos(a) * r; this.y = sin(a) * r; return this; }
  drop(f, x = 0, y = 0) { this.x = this.x * (1 - f) + x * f; this.y = this.y * (1 - f) + y * f; return this; }
  dot(v) { return this.x * v.x + this.y * v.y; }
  cross(v) { return this.x * v.y - this.y * v.x; }
  eq(v) { return this.x === v.x && this.y === v.y; }
  near(v, r = 1) { return distsq(this.x, this.y, v.x, v.y) <= r * r; }
  clone() { return new vec(this.x, this.y); }
  str() { return this.x + ',' + this.y; }
  static of(x, y) { return new vec(x, y); }
  static from(a, r = 1) { return new vec(cos(a) * r, sin(a) * r); }
  static lerp(a, b, t) { return new vec(lerp(a.x, b.x, t), lerp(a.y, b.y, t)); }
}

class box {
  constructor(x = 0, y = 0, w = 0, h = 0) { this.set(x, y, w, h); }
  set(x, y, w, h) { this.x = x; this.y = y; this.w = w; this.h = h; return this; }
  setv(v, w, h) { this.x = v.x; this.y = v.y; this.w = w; this.h = h; return this; }
  copy() { return new box(this.x, this.y, this.w, this.h); }
  setfrom(b) { this.x = b.x; this.y = b.y; this.w = b.w; this.h = b.h; return this; }
  setbox(a, b) { this.x = a.x; this.y = a.y; this.w = b.x - a.x; this.h = b.y - a.y; return this; }
  center(cx, cy, w, h) { this.w = w; this.h = h; this.x = cx - w / 2; this.y = cy - h / 2; return this; }
  push(x, y) { this.x += x; this.y += y; return this; }
  grow(v) { this.x -= v; this.y -= v; this.w += v * 2; this.h += v * 2; return this; }
  shrink(v) { return this.grow(-v); }
  take(b) { const l = max(this.x, b.x), t = max(this.y, b.y), r = min(this.right, b.right), o = min(this.bottom, b.bottom); this.x = l; this.y = t; this.w = max(0, r - l); this.h = max(0, o - t); return this; }
  union(b) { const l = min(this.x, b.x), t = min(this.y, b.y), r = max(this.right, b.right), o = max(this.bottom, b.bottom); this.x = l; this.y = t; this.w = r - l; this.h = o - t; return this; }
  at(x, y) { this.x = x; this.y = y; return this; }
  get right() { return this.x + this.w; }
  get bottom() { return this.y + this.h; }
  get cx() { return this.x + this.w / 2; }
  get cy() { return this.y + this.h / 2; }
  set right(v) { this.w = v - this.x; }
  set bottom(v) { this.h = v - this.y; }
  has(x, y) { return x >= this.x && x <= this.right && y >= this.y && y <= this.bottom; }
  hits(b) { return this.x < b.right && this.right > b.x && this.y < b.bottom && this.bottom > b.y; }
  nears(b, r) { return this.x - r < b.right && this.right + r > b.x && this.y - r < b.bottom && this.bottom + r > b.y; }
  inside(b) { return this.x >= b.x && this.y >= b.y && this.right <= b.right && this.bottom <= b.bottom; }
  hitspoint(x, y) { return this.has(x, y); }
  hitsline(ax, ay, bx, by) { const s = this.x, t = this.y, w = this.w, h = this.h; let dx = bx - ax, dy = by - ay, t0 = 0, t1 = 1; for (let i = 0; i < 2; i++) { const p = i ? dx : dy, o = i ? ax : ay, mn = i ? s : t, mx = i ? s + w : t + h; if (abs(p) < 1e-9) { if (o < mn || o > mx) return false; } else { let a = (mn - o) / p, b = (mx - o) / p; if (a > b) { const q = a; a = b; b = q; } t0 = max(t0, a); t1 = min(t1, b); if (t0 > t1) return false; } } return true; }
  str() { return this.x + ',' + this.y + ',' + this.w + ',' + this.h; }
}

class dice {
  constructor(seed = 1) { this.seed = seed >>> 0 || 1; this.state = this.seed; }
  reset(seed = this.seed) { this.state = seed >>> 0 || 1; return this; }
  next() { let t = (this.state += 0x6d2b79f5) >>> 0; t = ((t ^ (t >>> 15)) * (t | 1)) >>> 0; t = (t ^ (t + ((t ^ (t >>> 7)) * (t | 61)))) >>> 0; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }
  float(a = 0, b = 1) { return a + this.next() * (b - a); }
  int(a, b) { if (b === undefined) { b = a; a = 0; } return floor(this.float(a, b + 1)); }
  chance(p) { return this.next() < p; }
  sign() { return this.next() < 0.5 ? -1 : 1; }
  pick(l) { return l[floor(this.next() * l.length)]; }
  weight(l) { let s = 0; for (let i = 0; i < l.length; i++) s += l[i]; let r = this.next() * s; for (let i = 0; i < l.length; i++) { r -= l[i]; if (r <= 0) return i; } return l.length - 1; }
  shuffle(l) { for (let i = l.length - 1; i > 0; i--) { const j = this.int(i); const q = l[i]; l[i] = l[j]; l[j] = q; } return l; }
  angle() { return this.next() * tau; }
  vector(r = 1) { const a = this.angle(); return new vec(cos(a) * r, sin(a) * r); }
  spread(a, w) { return a + this.float(-w / 2, w / 2); }
  bell(a = 0, b = 1) { return lerp(a, b, (this.next() + this.next() + this.next()) / 3); }
  chancebox(b) { return new vec(this.float(b.x, b.right), this.float(b.y, b.bottom)); }
}

const rng = new dice(12345);
const rand = (a = 1, b) => (b === undefined ? rng.float(0, a) : rng.float(a, b));
const randint = (a, b) => rng.int(a, b);
const chance = (p) => rng.chance(p);
const pick = (l) => rng.pick(l);
const shuffle = (l) => rng.shuffle(l);
const jitter = (v, a = 1) => v + rng.float(-a, a);

class bus {
  constructor() { this.list = {}; }
  on(k, f) { (this.list[k] || (this.list[k] = [])).push(f); return f; }
  once(k, f) { const w = (a, b, c, d) => { this.off(k, w); f(a, b, c, d); }; w.mark = f; return this.on(k, w); }
  off(k, f) { const l = this.list[k]; if (!l) return this; if (!f) { delete this.list[k]; return this; } for (let i = l.length - 1; i >= 0; i--) if (l[i] === f || l[i].mark === f) l.splice(i, 1); return this; }
  fire(k, a, b, c, d) { const l = this.list[k]; if (!l) return 0; const c2 = l.slice(); for (let i = 0; i < c2.length; i++) c2[i](a, b, c, d); return c2.length; }
  has(k) { return !!(this.list[k] && this.list[k].length); }
  clear(k) { if (k) delete this.list[k]; else this.list = {}; return this; }
  count(k) { return k ? (this.list[k] || []).length : objt['keys'](this.list).length; }
}

class pool {
  constructor(make, size = 0) { this.make = make; this.free = []; this.used = 0; if (size) this.fill(size); }
  fill(n) { while (this.free.length < n) this.free.push(this.make()); return this; }
  get() { this.used++; return this.free.length ? this.free.pop() : this.make(); }
  put(o) { this.used--; if (this.free.length < 4096) this.free.push(o); return this; }
  each(f) { for (let i = 0; i < this.free.length; i++) f(this.free[i], i); return this; }
  clear() { this.free.length = 0; return this; }
  get size() { return this.free.length; }
}

const ease = {
  line: (t) => t,
  smooth: (t) => t * t * (3 - 2 * t),
  smoother: (t) => t * t * t * (t * (t * 6 - 15) + 10),
  step: (t) => (t < 1 ? 0 : 1),
  hold: (t) => (t < 1 ? 0 : 1),
  quadin: (t) => t * t,
  quadout: (t) => 1 - (1 - t) * (1 - t),
  quadio: (t) => (t < 0.5 ? 2 * t * t : 1 - pow(-2 * t + 2, 2) / 2),
  cubicin: (t) => t * t * t,
  cubicout: (t) => 1 - pow(1 - t, 3),
  cubicio: (t) => (t < 0.5 ? 4 * t * t * t : 1 - pow(-2 * t + 2, 3) / 2),
  quartin: (t) => t * t * t * t,
  quartout: (t) => 1 - pow(1 - t, 4),
  quartio: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - pow(-2 * t + 2, 4) / 2),
  quintin: (t) => pow(t, 5),
  quintout: (t) => 1 - pow(1 - t, 5),
  quintio: (t) => (t < 0.5 ? 16 * pow(t, 5) : 1 - pow(-2 * t + 2, 5) / 2),
  sinein: (t) => 1 - cos((t * pi) / 2),
  sineout: (t) => sin((t * pi) / 2),
  sineio: (t) => -(cos(pi * t) - 1) / 2,
  expoin: (t) => (t <= 0 ? 0 : pow(2, 10 * t - 10)),
  expoout: (t) => (t >= 1 ? 1 : 1 - pow(2, -10 * t)),
  expoio: (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t < 0.5 ? pow(2, 20 * t - 10) / 2 : (2 - pow(2, -20 * t + 10)) / 2),
  circin: (t) => 1 - sqrt(max(0, 1 - t * t)),
  circout: (t) => sqrt(max(0, 1 - pow(t - 1, 2))),
  circio: (t) => (t < 0.5 ? (1 - sqrt(1 - 4 * t * t)) / 2 : (sqrt(1 - pow(-2 * t + 2, 2)) + 1) / 2),
  backin: (t) => 2.70158 * t * t * t - 1.70158 * t * t,
  backout: (t) => 1 + 2.70158 * pow(t - 1, 3) + 1.70158 * pow(t - 1, 2),
  backio: (t) => (t < 0.5 ? (pow(2 * t, 2) * (7.189819 * t - 2.5949095)) / 2 : (pow(2 * t - 2, 2) * (3.5949095 * (t * 2 - 2) + 2.5949095) + 2) / 2),
  elasticin: (t) => (t <= 0 ? 0 : t >= 1 ? 1 : -pow(2, 10 * t - 10) * sin((t * 10 - 10.75) * ((2 * pi) / 3))),
  elasticout: (t) => (t <= 0 ? 0 : t >= 1 ? 1 : pow(2, -10 * t) * sin((t * 10 - 0.75) * ((2 * pi) / 3)) + 1),
  elasticio: (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t < 0.5 ? -(pow(2, 20 * t - 10) * sin((20 * t - 11.125) * ((2 * pi) / 4.5))) / 2 : (pow(2, -20 * t + 10) * sin((20 * t - 11.125) * ((2 * pi) / 4.5))) / 2 + 1),
  bouncein: (t) => 1 - ease.bounceout(1 - t),
  bounceout: (t) => { const n = 7.5625, d = 2.75; if (t < 1 / d) return n * t * t; if (t < 2 / d) return n * (t -= 1.5 / d) * t + 0.75; if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + 0.9375; return n * (t -= 2.625 / d) * t + 0.984375; },
  bounceio: (t) => (t < 0.5 ? (1 - ease.bounceout(1 - 2 * t)) / 2 : (1 + ease.bounceout(2 * t - 1)) / 2),
  wave: (t) => sin(t * pi),
  pulse: (t) => (t < 0.5 ? t * 2 : 2 - t * 2),
  spring: (t) => (t >= 1 ? 1 : pow(2, -8 * t) * sin(14 * t)),
  pop: (t) => (t >= 1 ? 1 : -3.4 * t * t + 4.4 * t),
  hop: (t) => abs(sin(t * pi * 0.5)),
  swing: (t) => 1 - cos(t * pi),
  get(n) { if (typeof n === 'function') return n; return ease[n] || ease.line; }
};

const paint = {
  of(c) {
    if (!c) return { r: 255, g: 255, b: 255, a: 1 };
    if (typeof c === 'string') return paint.hex(c);
    if (typeof c === 'number') return { r: (c >> 16) & 255, g: (c >> 8) & 255, b: c & 255, a: ((c >> 24) & 255) / 255 || 1 };
    if (c.a === undefined) c.a = 1;
    return c;
  },
  hex(s) {
    let t = s.trim();
    if (t[0] === '#') t = t.slice(1);
    if (t.length === 3) t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2];
    if (t.length === 4) t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2] + t[3] + t[3];
    if (t.length === 6 || t.length === 8) {
      const n = intof(t, 16);
      if (t.length === 6) return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, a: 1 };
      return { r: (n >>> 24) & 255, g: (n >> 16) & 255, b: (n >> 8) & 255, a: (n & 255) / 255 };
    }
    const w = t.split(',');
    if (w.length >= 3) return { r: intof(w[0]) || 0, g: intof(w[1]) || 0, b: intof(w[2]) || 0, a: w[3] === undefined ? 1 : numof(w[3]) };
    return { r: 255, g: 255, b: 255, a: 1 };
  },
  css(c, a) {
    const o = paint.of(c);
    const al = a === undefined ? o.a : a;
    if (al >= 1) return 'rgb(' + bite(o.r) + ',' + bite(o.g) + ',' + bite(o.b) + ')';
    return 'rgba(' + bite(o.r) + ',' + bite(o.g) + ',' + bite(o.b) + ',' + (round(al * 1000) / 1000) + ')';
  },
  rgb(r, g, b, a = 1) { return { r, g, b, a }; },
  alpha(c, a) { const o = paint.of(c); return { r: o.r, g: o.g, b: o.b, a: a === undefined ? o.a : a }; },
  mix(a, b, t) { const A = paint.of(a), B = paint.of(b); return { r: lerp(A.r, B.r, t), g: lerp(A.g, B.g, t), b: lerp(A.b, B.b, t), a: lerp(A.a, B.a, t) }; },
  lite(c, t) { return paint.mix(c, { r: 255, g: 255, b: 255, a: 1 }, t); },
  dark(c, t) { return paint.mix(c, { r: 0, g: 0, b: 0, a: 1 }, t); },
  gray(c, t = 1) { const o = paint.of(c), v = o.r * 0.299 + o.g * 0.587 + o.b * 0.114; return { r: lerp(o.r, v, t), g: lerp(o.g, v, t), b: lerp(o.b, v, t), a: o.a }; },
  invert(c) { const o = paint.of(c); return { r: 255 - o.r, g: 255 - o.g, b: 255 - o.b, a: o.a }; },
  hsl(h, s, l, a = 1) {
    h = wrap(h, 0, 1); s = clamp01(s); l = clamp01(l);
    if (s === 0) return { r: l * 255, g: l * 255, b: l * 255, a };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    const h2 = (t) => (t < 0 ? t + 1 : t > 1 ? t - 1 : t);
    const f = (t) => { t = h2(t); if (t < 1 / 6) return p + (q - p) * 6 * t; if (t < 1 / 2) return q; if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6; return p; };
    return { r: f(h + 1 / 3) * 255, g: f(h) * 255, b: f(h - 1 / 3) * 255, a };
  },
  hsv(h, s, v, a = 1) { const i = floor(h * 6), f = h * 6 - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s); const m = i % 6; const r = [v, q, p, p, t, v][m], g = [t, v, v, q, p, p][m], b = [p, p, t, v, v, q][m]; return { r: r * 255, g: g * 255, b: b * 255, a }; },
  hue(c, d) { const o = paint.of(c); const m = max(o.r, o.g, o.b), n = min(o.r, o.g, o.b); let h = 0; const l = (m + n) / 510; const s = m === n ? 0 : (m - n) / (m + n < 255 ? m + n : 510 - m - n); if (m !== n) { if (m === o.r) h = (o.g - o.b) / (m - n) + (o.g < o.b ? 6 : 0); else if (m === o.g) h = (o.b - o.r) / (m - n) + 2; else h = (o.r - o.g) / (m - n) + 4; h /= 6; } return paint.hsl(h + d, s, l, o.a); },
  sat(c, t) { const o = paint.of(c); const m = max(o.r, o.g, o.b), n = min(o.r, o.g, o.b); let h = 0; const l = (m + n) / 510; let s = m === n ? 0 : (m - n) / (m + n < 255 ? m + n : 510 - m - n); if (m !== n) { if (m === o.r) h = (o.g - o.b) / (m - n) + (o.g < o.b ? 6 : 0); else if (m === o.g) h = (o.b - o.r) / (m - n) + 2; else h = (o.r - o.g) / (m - n) + 4; h /= 6; } return paint.hsl(h, clamp01(s * (1 + t)), l, o.a); },
  rand(hb = -1, s = 0.6, l = 0.6) { return paint.hsl(hb < 0 ? rng.next() : hb, s, l); },
  ramp(a, b, n) { const o = []; for (let i = 0; i < n; i++) o.push(paint.css(paint.mix(a, b, n > 1 ? i / (n - 1) : 0))); return o; },
  shade(c, t) { return t < 0 ? paint.dark(c, -t) : paint.lite(c, t); },
  grad(c, b, list, vert) {
    const g = vert ? c['createLinearGradient'](b.x, b.y, b.x, b.bottom) : c['createLinearGradient'](b.x, b.y, b.right, b.y);
    for (let i = 0; i < list.length; i++) g['addColorStop'](clamp01(i / max(1, list.length - 1)), paint.css(list[i]));
    return g;
  },
  radial(c, cx, cy, r0, r1, list) {
    const g = c['createRadialGradient'](cx, cy, r0, cx, cy, r1);
    for (let i = 0; i < list.length; i++) g['addColorStop'](clamp01(i / max(1, list.length - 1)), paint.css(list[i]));
    return g;
  },
  white: { r: 255, g: 255, b: 255, a: 1 },
  black: { r: 0, g: 0, b: 0, a: 1 },
  clear: { r: 0, g: 0, b: 0, a: 0 },
  grayc: { r: 128, g: 128, b: 128, a: 1 },
  red: { r: 235, g: 70, b: 70, a: 1 },
  green: { r: 90, g: 210, b: 110, a: 1 },
  blue: { r: 90, g: 150, b: 245, a: 1 },
  gold: { r: 250, g: 205, b: 90, a: 1 },
  sky: { r: 130, g: 200, b: 245, a: 1 }
};
class mat {
  constructor(a = 1, b = 0, c = 0, d = 1, e = 0, f = 0) { this.a = a; this.b = b; this.c = c; this.d = d; this.e = e; this.f = f; }
  set(a = 1, b = 0, c = 0, d = 1, e = 0, f = 0) { this.a = a; this.b = b; this.c = c; this.d = d; this.e = e; this.f = f; return this; }
  ident() { return this.set(1, 0, 0, 1, 0, 0); }
  setfrom(m) { return this.set(m.a, m.b, m.c, m.d, m.e, m.f); }
  copy() { return new mat(this.a, this.b, this.c, this.d, this.e, this.f); }
  pos(x, y, rot = 0, sx = 1, sy = 1) { const C = cos(rot), S = sin(rot); return this.set(C * sx, S * sx, -S * sy, C * sy, x, y); }
  mul(m) { const a = this.a * m.a + this.c * m.b, b = this.b * m.a + this.d * m.b, c = this.a * m.c + this.c * m.d, d = this.b * m.c + this.d * m.d, e = this.a * m.e + this.c * m.f + this.e, f = this.b * m.e + this.d * m.f + this.f; return this.set(a, b, c, d, e, f); }
  mulinto(out, m) { const a = this.a * m.a + this.c * m.b, b = this.b * m.a + this.d * m.b, c = this.a * m.c + this.c * m.d, d = this.b * m.c + this.d * m.d, e = this.a * m.e + this.c * m.f + this.e, f = this.b * m.e + this.d * m.f + this.f; return out.set(a, b, c, d, e, f); }
  apply(x, y, out) { out.x = this.a * x + this.c * y + this.e; out.y = this.b * x + this.d * y + this.f; return out; }
  appx(x, y) { return this.a * x + this.c * y + this.e; }
  appy(x, y) { return this.b * x + this.d * y + this.f; }
  get scale() { return hypot(this.a, this.b); }
  get rot() { return atan2(this.b, this.a); }
  invert(out) { const det = this.a * this.d - this.b * this.c || 1e-9; const ia = this.d / det, ib = -this.b / det, ic = -this.c / det, id = this.a / det; return out.set(ia, ib, ic, id, -(ia * this.e + ic * this.f), -(ib * this.e + id * this.f)); }
  write(c) { c['setTransform'](this.a, this.b, this.c, this.d, this.e, this.f); return this; }
  box(b, out) {
    const p = out || new box();
    const x0 = this.appx(b.x, b.y), y0 = this.appy(b.x, b.y), x1 = this.appx(b.x + b.w, b.y), y1 = this.appy(b.x + b.w, b.y), x2 = this.appx(b.x + b.w, b.y + b.h), y2 = this.appy(b.x + b.w, b.y + b.h), x3 = this.appx(b.x, b.y + b.h), y3 = this.appy(b.x, b.y + b.h);
    const l = min(x0, x1, x2, x3), t = min(y0, y1, y2, y3);
    p.x = l; p.y = t; p.w = max(x0, x1, x2, x3) - l; p.h = max(y0, y1, y2, y3) - t;
    return p;
  }
  str() { return 'mat[' + round(this.a * 100) / 100 + ',' + round(this.b * 100) / 100 + ',' + round(this.c * 100) / 100 + ',' + round(this.d * 100) / 100 + ',' + round(this.e) + ',' + round(this.f) + ']'; }
}

class jux {
  constructor(o) { this.o = o; this.list = []; }
  add(k, to, dur, e = 'smooth', from) { if (from === undefined) from = this.o[k]; this.list.push({ k, from, to, t: 0, dur: max(0.0001, dur), e }); return this; }
  by(k, dv, dur, e) { return this.add(k, this.o[k] + dv, dur, e); }
  kill() { this.list.length = 0; return this; }
  update(dt) {
    for (let i = this.list.length - 1; i >= 0; i--) {
      const t = this.list[i];
      t.t += dt;
      const p = clamp01(t.t / t.dur);
      this.o[t.k] = lerp(t.from, t.to, ease.get(t.e)(p));
      if (p >= 1) this.list.splice(i, 1);
    }
    return this;
  }
  get busy() { return this.list.length > 0; }
}

class node {
  constructor(x = 0, y = 0, w = 0, h = 0) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ax = 0;
    this.ay = 0;
    this.rot = 0;
    this.sx = 1;
    this.sy = 1;
    this.alpha = 1;
    this.vis = true;
    this.live = true;
    this.z = 0;
    this.layer = 0;
    this.blend = 'source-over';
    this.tag = '';
    this.tags = null;
    this.kids = null;
    this.dad = null;
    this.scene = null;
    this.game = null;
    this.box = null;
    this.grow = 0;
    this.world = new mat();
    this.bounds = new box();
    this.juice = { ox: 0, oy: 0, rot: 0, sxx: 1, syy: 1, al: 1, tint: null, ta: 0 };
    this.jx = new jux(this.juice);
    this.theta = 0;
    this.slot = null;
  }
  get cx() { return this.x + this.w * (0.5 - this.ax); }
  get cy() { return this.y + this.h * (0.5 - this.ay); }
  get wx() { return this.world.e; }
  get wy() { return this.world.f; }
  get wrot() { return this.world.rot; }
  get wscale() { return this.world.scale; }
  get right() { return this.x + this.w; }
  get bottom() { return this.y + this.h; }
  get tint() { return this.juice.tint; }
  set tint(v) { this.juice.tint = typeof v === 'string' ? paint.hex(v) : v; }
  awake() { return this; }
  sleep() { return this; }
  step(dt) { return this; }
  paint(p) { return this; }
  hit(n) { return this.bounds.hits(n.bounds); }
  range(n, r) { return this.bounds.nears(n.bounds, r); }
  add(a) {
    if (!a) return this;
    if (a instanceof arrt) { for (let i = 0; i < a.length; i++) this.add(a[i]); return a; }
    if (a.dad) a.dad.remove(a);
    if (!this.kids) this.kids = [];
    this.kids.push(a);
    a.dad = this;
    this.link(a);
    a.awake();
    return a;
  }
  link(a) {
    a.scene = this.scene || (this instanceof scene ? this : null);
    a.game = this.game || (this instanceof scene ? this.game : null);
    if (a.scene) a.scene.reindex();
    if (a.kids) for (let i = 0; i < a.kids.length; i++) this.link(a.kids[i]);
    return a;
  }
  pops(a) { if (a) this.remove(a); else if (this.dad) this.dad.remove(this); return this; }
  remove(a) {
    if (!this.kids) return this;
    const i = this.kids.indexOf(a);
    if (i >= 0) { this.kids.splice(i, 1); a.dad = null; a.sleep(); }
    return this;
  }
  eject(a) { this.remove(a); return this.add(a); }
  kill() { this.live = false; return this; }
  revive() { this.live = true; return this; }
  clear() { if (this.kids) for (let i = this.kids.length - 1; i >= 0; i--) this.kids[i].kill(); return this; }
  sort() { if (this.kids) this.kids.sort((a, b) => a.layer - b.layer || a.z - b.z || a.y - b.y); return this; }
  front() { if (this.dad && this.dad.kids) { const k = this.dad.kids; const i = k.indexOf(this); if (i >= 0) { k.splice(i, 1); k.push(this); } } return this; }
  back() { if (this.dad && this.dad.kids) { const k = this.dad.kids; const i = k.indexOf(this); if (i >= 0) { k.splice(i, 1); k.unshift(this); } } return this; }
  upto(n = 1) { let o = this; while (n-- > 0 && o) o = o.dad; return o; }
  where(f, out) { out = out || []; if (this.kids) for (let i = 0; i < this.kids.length; i++) { const k = this.kids[i]; if (f(k)) out.push(k); k.where(f, out); } return out; }
  find(tag) { const l = this.where((k) => k.tag === tag); return l.length ? l[0] : null; }
  all(tag) { return this.where((k) => k.tag === tag); }
  type(c) { return this.where((k) => k instanceof c); }
  near(x, y, r, out) { return this.where((k) => distsq(k.wx, k.wy, x, y) <= r * r, out); }
  tally() { let n = 0; if (this.kids) for (let i = 0; i < this.kids.length; i++) n += 1 + this.kids[i].tally(); return n; }
  touch() { if (this.scene) this.scene.reindex(); return this; }
  to(wx, wy, out) { out = out || new vec(); this.world.invert(node.tmpi); return node.tmpi.apply(wx, wy, out); }
  from(x, y, out) { const p = this.world.apply(x, y, new vec()); if (!this.dad) return out ? out.set(p.x, p.y) : p; return this.dad.to(p.x, p.y, out); }
  oust(x, y, out) { return this.world.apply(x, y, out || new vec()); }
  hull() {
    if (this.box) this.world.box(this.box, this.bounds);
    else this.world.box(node.tmpbox.set(0, 0, this.w, this.h), this.bounds);
    if (this.grow) this.bounds.grow(this.grow * max(0.0001, this.world.scale));
    return this.bounds;
  }
  flash(c = '#fff', dur = 0.08) { this.juice.tint = typeof c === 'string' ? paint.hex(c) : c; this.juice.ta = 0.0001; this.jx.add('ta', 1, dur / 2, 'line').add('ta', 0, dur / 2, 'line'); return this; }
  shake(a = 2, dur = 0.14) { this.jx.add('ox', rand(-a, a), dur / 2, 'quadout').add('oy', rand(-a, a), dur / 2, 'quadout'); return this; }
  rumble(a = 1, dur = 0.1) { this.jx.add('ox', rand(-a, a), dur, 'line').add('oy', rand(-a, a), dur, 'line'); return this; }
  kick(ox, oy, dur = 0.12) { this.jx.add('ox', ox, dur, 'quartout').add('oy', oy, dur, 'quartout'); return this; }
  squash(sx2, sy2, dur = 0.2, e = 'backout') { this.jx.add('sxx', sx2, dur, e).add('syy', sy2, dur, e); return this; }
  spin(deg, dur = 0.3, e = 'backout') { this.jx.add('rot', this.juice.rot + deg * (pi / 180), dur, e); return this; }
  blink(dur = 0.4, times = 4) { const d = dur / (times * 2); for (let i = 0; i < times; i++) { this.jx.add('al', 0.15, d, 'line'); this.jx.add('al', 1, d, 'line'); } return this; }
  fader(a, dur = 0.3, e = 'line') { this.jx.add('al', a, dur, e); return this; }
  pop(amount = 1.25, dur = 0.25) { const d = dur / 2; this.jx.add('sxx', amount, d, 'quadout').add('sxx', 1, d, 'quadin').add('syy', amount, d, 'quadout').add('syy', 1, d, 'quadin'); return this; }
  hop(a = 8, dur = 0.3) { this.jx.add('oy', a, dur, 'pulse'); return this; }
  bob(a = 4, spd = 2) { this.jx.add('oy', a, 1 / spd, 'sineio'); return this; }
  follow(t, k = 6, dt = 1 / 60) { this.x = damp(this.x, t.x, k, dt); this.y = damp(this.y, t.y, k, dt); return this; }
  aimat(t, sp) { const a = atan2(t.wy - this.wy, t.wx - this.wx); this.x += cos(a) * sp; this.y += sin(a) * sp; return this; }
  faceat(t) { const a = atan2(t.wy - this.wy, t.wx - this.wx); this.rot = a; return this; }
  attach(target, ox = 0, oy = 0) { this.slot = { target, ox, oy }; return this; }
  detach() { this.slot = null; return this; }
  walk(dt, pm) {
    this.theta += dt;
    if (this.jx.list.length) this.jx.update(dt);
    if (this.slot) { if (!this.slot.target.live) this.kill(); else { this.x = this.slot.target.x + this.slot.ox; this.y = this.slot.target.y + this.slot.oy; } }
    const j = this.juice;
    node.tmpm.pos(this.x - this.w * this.ax + j.ox, this.y - this.h * this.ay + j.oy, this.rot + j.rot, this.sx * j.sxx, this.sy * j.syy);
    pm.mulinto(this.world, node.tmpm);
    this.hull();
    if (this.kids && this.kids.length) {
      let sorted = false;
      for (let i = 1; i < this.kids.length; i++) if (this.kids[i].z || this.kids[i].layer) { sorted = true; break; }
      if (sorted) this.sort();
      for (let i = 0; i < this.kids.length; i++) {
        const k = this.kids[i];
        if (k.live) k.walk(dt, this.world);
      }
      for (let i = this.kids.length - 1; i >= 0; i--) if (!this.kids[i].live) this.kids.splice(i, 1);
    }
    this.step(dt);
    return this;
  }
  draw(p) {
    if (!this.vis || (this.alpha <= 0 && this.juice.al <= 0)) return this;
    this.hooked = false;
    this.paint(p);
    if (this.kids) for (let i = 0; i < this.kids.length; i++) this.kids[i].draw(p);
    this.postdraw(p);
    return this;
  }
  postdraw(p) { return this; }
  clipkids(p) { p.clipset(this, this.w, this.h); this.hooked = true; return this; }
  static tmpm = new mat();
  static tmpi = new mat();
  static tmpbox = new box();
}

class group extends node {
  constructor(x = 0, y = 0) { super(x, y, 0, 0); }
}
const texter = { ctx: null };
const textctx = () => {
  if (!texter.ctx) { const c = elm('canvas'); c.width = 8; c.height = 8; texter.ctx = c['getContext']('2d'); }
  return texter.ctx;
};

class art {
  constructor(canv, w, h) {
    if (canv instanceof art) { this.canvas = canv.canvas; this.ctx = canv.ctx; this.w = canv.w; this.h = canv.h; this.frames = canv.frames; this.clips = canv.clips; this.slice = canv.slice; this.tints = canv.tints; this.smooth = canv.smooth; this.name = canv.name; this.src = canv.src; return; }
    if (canv && canv['width'] !== undefined) {
      this.canvas = canv;
      this.ctx = canv['getContext'] ? canv['getContext']('2d') : null;
      this.w = w === undefined ? canv['width'] : w;
      this.h = h === undefined ? canv['height'] : h;
    } else {
      const cv = elm('canvas');
      cv.width = max(1, round(w || 1));
      cv.height = max(1, round(h || 1));
      this.canvas = cv;
      this.ctx = cv['getContext']('2d');
      this.w = cv.width;
      this.h = cv.height;
    }
    if (!this.w) { this.w = this.canvas['width']; this.h = this.canvas['height']; }
    this.frames = {};
    this.clips = {};
    this.slice = null;
    this.tints = {};
    this.smooth = false;
    this.name = '';
    this.src = 0;
  }
  static make(w, h) { return new art(null, w, h); }
  static of(a, w, h) {
    if (a instanceof art) return a;
    if (!a) return null;
    if (a['width'] !== undefined) return new art(a);
    return null;
  }
  static from(a, w, h) { return art.of(a, w, h); }
  get ctxl() { return this.ctx; }
  clear() { if (this.ctx) this.ctx['clearRect'](0, 0, this.w, this.h); return this; }
  fill(c, x = 0, y = 0, w = this.w, h = this.h) { if (this.ctx) { this.ctx['fillStyle'] = paint.css(c); this.ctx['fillRect'](x, y, w, h); } return this; }
  rect(c, x, y, w, h, r = 0) { const g = this.ctx; if (!g) return this; g['fillStyle'] = paint.css(c); if (r > 0) { g.beginPath(); rrpath(g, x, y, w, h, r); g.fill(); } else g['fillRect'](x, y, w, h); return this; }
  frame(name, x, y, w, h) { this.frames[name] = new box(x, y, w, h); if (this.src === 0) this.src = 1; return this; }
  auto() { return this.frame('0', 0, 0, this.w, this.h); }
  grid(fw, fh, cols, rows, opts) {
    opts = opts || {};
    const gx = opts.gapx || opts.gap || 0, gy = opts.gapy === undefined ? opts.gap || 0 : opts.gapy;
    const ox = opts.x || 0, oy = opts.y || 0;
    let n = 0;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) this.frame(opts.prefix ? opts.prefix + n : strt(n), ox + c * (fw + gx), oy + r * (fh + gy), fw, fh), n++;
    return this;
  }
  strip(fw, fh, count, opts) { opts = opts || {}; return this.grid(fw, fh, count, 1, opts); }
  clip(name, list, rate = 8, loop = true) {
    if (typeof list === 'string') list = list.split(' ').filter((s) => s.length);
    if (!list.length && this.frames['0']) { const n = objt['keys'](this.frames).length; list = []; for (let i = 0; i < n; i++) list.push(strt(i)); }
    this.clips[name] = { list, rate, loop };
    return this;
  }
  seq(name, from, count, rate = 8, loop = true) { const l = []; for (let i = 0; i < count; i++) l.push(strt(from + i)); return this.clip(name, l, rate, loop); }
  nine(l, t, r, b) { this.slice = { l, t, r, b }; return this; }
  tint(c) {
    const k = paint.css(c);
    if (this.tints[k]) return this.tints[k];
    const o = paint.of(c);
    const a = art.make(this.w, this.h);
    a.frames = this.frames;
    a.clips = this.clips;
    a.slice = this.slice;
    a.smooth = this.smooth;
    a.name = this.name;
    if (a.ctx) {
      a.ctx['drawImage'](this.canvas, 0, 0);
      a.ctx['globalCompositeOperation'] = 'source-in';
      a.ctx['fillStyle'] = paint.css(o);
      a.ctx['fillRect'](0, 0, a.w, a.h);
      a.ctx['globalCompositeOperation'] = 'source-over';
    }
    a.src = 0;
    this.tints[k] = a;
    return a;
  }
  mask(c) { const a = art.make(this.w, this.h); a.frames = this.frames; a.clips = this.clips; a.slice = this.slice; a.ctx['fillStyle'] = paint.css(c); a.ctx['fillRect'](0, 0, this.w, this.h); a.ctx['globalCompositeOperation'] = 'destination-in'; a.ctx['drawImage'](this.canvas, 0, 0); a.ctx['globalCompositeOperation'] = 'source-over'; a.src = 0; return a; }
  sub(x, y, w, h) { const a = new art(this.canvas, this.w, this.h); a.frames = { '0': new box(x, y, w, h) }; a.clips = this.clips; a.slice = null; a.smooth = this.smooth; return a; }
  at(name) { if (!this.frames[name]) this.frames[name] = new box(0, 0, this.w, this.h); return this.frames[name]; }
  size(name) { const f = this.at(name); return { w: f.w, h: f.h }; }
  flipx() { if (!this.fx) this.fx = {}; if (!this.fx.x) { const a = art.make(this.w, this.h); a.ctx['translate'](this.w, 0); a.ctx['scale'](-1, 1); a.ctx['drawImage'](this.canvas, 0, 0); a.frames = this.frames; a.clips = this.clips; a.src = 0; this.fx.x = a; } return this.fx.x; }
  flipy() { if (!this.fx) this.fx = {}; if (!this.fx.y) { const a = art.make(this.w, this.h); a.ctx['translate'](0, this.h); a.ctx['scale'](1, -1); a.ctx['drawImage'](this.canvas, 0, 0); a.frames = this.frames; a.clips = this.clips; a.src = 0; this.fx.y = a; } return this.fx.y; }
  scaled(f) {
    if (f === 1) return this;
    if (!this.sc) this.sc = {};
    if (this.sc[f]) return this.sc[f];
    const a = art.make(max(1, round(this.w * f)), max(1, round(this.h * f)));
    a.ctx['imageSmoothingEnabled'] = false;
    a.ctx['drawImage'](this.canvas, 0, 0, a.w, a.h);
    const m = f;
    for (const k in this.frames) { const b = this.frames[k]; a.frames[k] = new box(b.x * m, b.y * m, b.w * m, b.h * m); }
    a.clips = this.clips;
    a.src = 0;
    a.smooth = this.smooth;
    this.sc[f] = a;
    return a;
  }
  rebake(f) {
    const a = art.make(max(1, round(this.w * f)), max(1, round(this.h * f)));
    a.ctx['imageSmoothingEnabled'] = true;
    a.ctx['drawImage'](this.canvas, 0, 0, a.w, a.h);
    for (const k in this.frames) { const b = this.frames[k]; a.frames[k] = new box(b.x * f, b.y * f, b.w * f, b.h * f); }
    a.clips = this.clips;
    a.smooth = true;
    a.src = this.src;
    this.hi = a;
    return a;
  }
  count() { return objt['keys'](this.frames).length; }
  clone() {
    const a = art.make(this.w, this.h);
    a.ctx['drawImage'](this.canvas, 0, 0);
    for (const k in this.frames) { const b = this.frames[k]; a.frames[k] = b.copy(); }
    for (const k in this.clips) a.clips[k] = { list: this.clips[k].list.slice(), rate: this.clips[k].rate, loop: this.clips[k].loop };
    a.slice = this.slice ? { l: this.slice.l, t: this.slice.t, r: this.slice.r, b: this.slice.b } : null;
    a.smooth = this.smooth;
    a.src = this.src;
    return a;
  }
  static flat(w, h, c, r = 0) { const a = art.make(w, h); a.rect(c, 0, 0, w, h, r); a.auto(); return a; }
  static circle(r, c) { const a = art.make(r * 2, r * 2); if (a.ctx) { a.ctx['fillStyle'] = paint.css(c); a.ctx.beginPath(); a.ctx['arc'](r, r, r, 0, tau); a.ctx.fill(); } a.auto(); return a; }
  static ring(r, c, w = 2) { const a = art.make(r * 2, r * 2); const g = a.ctx; if (g) { g.beginPath(); g['arc'](r, r, r - w / 2, 0, tau); g['strokeStyle'] = paint.css(c); g['lineWidth'] = w; g.stroke(); } a.auto(); return a; }
  static grad(w, h, list, vert = false) { const a = art.make(w, h); if (a.ctx) { a.ctx['fillStyle'] = paint.grad(a.ctx, a.newbox(), list, vert); a.ctx['fillRect'](0, 0, w, h); } a.auto(); return a; }
  static noise(w, h, opts) {
    opts = opts || {};
    const a = art.make(w, h);
    const g = a.ctx;
    if (g) {
      const img = g['createImageData'](w, h);
      const d = img['data'];
      const sc = opts.scale || 1;
      const oct = opts.octaves || 4;
      const seed = opts.seed === undefined ? 0 : opts.seed;
      const lo = opts.low === undefined ? 0 : opts.low;
      const hi = opts.high === undefined ? 1 : opts.high;
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const n = fbm((x * sc) / 16 + seed, (y * sc) / 16 + seed, oct);
        const v = lerp(lo, hi, n) * 255;
        const i = (y * w + x) * 4;
        d[i] = v * (opts.r === undefined ? 1 : opts.r);
        d[i + 1] = v * (opts.g === undefined ? 1 : opts.g);
        d[i + 2] = v * (opts.b === undefined ? 1 : opts.b);
        d[i + 3] = opts.alpha === undefined ? 255 : opts.alpha * 255;
      }
      g['putImageData'](img, 0, 0);
    }
    a.auto();
    return a;
  }
  newbox() { return new box(0, 0, this.w, this.h); }
}

class sprite extends node {
  constructor(a, x = 0, y = 0) {
    super(x, y, 0, 0);
    this.art = art.of(a);
    this.frame = '0';
    this.clip = null;
    this.clock = 0;
    this.idx = 0;
    this.loop = true;
    this.speed = 1;
    this.flipx = false;
    this.flipy = false;
    this.lock = false;
    this.tintv = null;
    this.tintp = 1;
    this.end = null;
    this.baked = null;
    this.res = 1;
    if (this.art && this.art.src === 0 && this.art.count() === 0) this.art.auto();
    if (this.art) { const f = this.art.at(this.frame); this.w = f.w; this.h = f.h; }
  }
  setart(a) { this.art = art.of(a); this.baked = null; if (this.art && this.art.src === 0 && this.art.count() === 0) this.art.auto(); this.fit(); return this; }
  fit() { if (this.art && !this.lock) { const f = this.current(); this.w = f.w; this.h = f.h; } return this; }
  current() { return this.art ? this.art.at(this.frame) : new box(); }
  play(name, restart = false) {
    if (!this.art || !this.art.clips[name]) return this;
    if (this.clip === name && !restart) return this;
    this.clip = name;
    this.clock = 0;
    this.idx = 0;
    this.loop = this.art.clips[name].loop !== false;
    this.frame = this.art.clips[name].list[0];
    this.fit();
    return this;
  }
  stop() { this.clip = null; return this; }
  goto(name, i = 0) { this.play(name, true); this.idx = i; this.frame = this.art.clips[name].list[i]; this.fit(); return this; }
  get progress() { if (!this.clip) return 0; const c = this.art.clips[this.clip]; return clamp01(this.idx / max(1, c.list.length - 1)); }
  get done() { return !this.clip || (!this.loop && this.clock >= this.art.clips[this.clip].list.length / this.art.clips[this.clip].rate); }
  ondone(f) { this.end = f; return this; }
  paintmode(c, t = 1) { this.tintv = typeof c === 'string' ? paint.hex(c) : c; this.tintp = t; return this; }
  step(dt) {
    const j = this.juice;
    if (j.tint && j.ta > 0) this.tintv = j.tint;
    if (this.clip && this.art) {
      const c = this.art.clips[this.clip];
      this.clock += dt * this.speed;
      const steprate = this.clock * c.rate;
      const total = c.list.length;
      if (this.loop) {
        const i = floor(steprate) % total;
        if (i !== this.idx) { this.idx = i; this.frame = c.list[i]; this.fit(); }
      } else {
        const i = min(total - 1, floor(steprate));
        if (i !== this.idx) { this.idx = i; this.frame = c.list[i]; this.fit(); }
        if (steprate >= total && this.end) { const f = this.end; this.end = null; f(this); }
      }
    }
    return this;
  }
  paint(p) {
    if (!this.art || p.cull(this)) return this;
    const f = this.art.at(this.frame);
    p.begin(this);
    p.blit(this.art, f.x, f.y, f.w, f.h, 0, 0, this.w, this.h, this);
    return this;
  }
}

class text extends node {
  constructor(value = '', opts = {}) {
    super(opts.x || 0, opts.y || 0, 0, 0);
    this.value = strt(value === undefined || value === null ? '' : value);
    this.face = opts.face || 'sans';
    this.size = opts.size === undefined ? 16 : opts.size;
    this.weight = opts.weight || '700';
    this.italic = !!opts.italic;
    this.ink = paint.of(opts.ink === undefined ? '#ffffff' : opts.ink);
    this.align = opts.align || 'left';
    this.valign = opts.valign || 'top';
    this.lineh = opts.lineh === undefined ? 1.25 : opts.lineh;
    this.track = opts.track || 0;
    this.space = opts.space === undefined ? 0 : opts.space;
    this.maxw = opts.maxw || 0;
    this.wrap = opts.wrap !== false;
    this.edge = opts.edge || null;
    this.edgew = opts.edgew === undefined ? 2 : opts.edgew;
    this.drop = opts.drop === undefined ? null : opts.drop;
    this.dropx = opts.dropx === undefined ? 1 : opts.dropx;
    this.dropy = opts.dropy === undefined ? 2 : opts.dropy;
    this.tab = opts.tab === undefined ? 4 : opts.tab;
    this.lines = [];
    this.runs = [];
    this.dirty = true;
    this.rev = 1;
    this.clock = 0;
    this.anim = false;
    this.spd = 1;
    this.reveal = -1;
    this.typing = 0;
    this.typingon = false;
    this.cursor = opts.cursor || '';
    this.shadow = opts.shadow === undefined ? 0 : opts.shadow;
    this.rainbowmode = !!opts.rainbow;
    this.layout();
  }
  get str() { return this.value; }
  set(v) { const t = v === undefined || v === null ? '' : strt(v); if (this.value !== t) { this.value = t; this.dirty = true; this.rev++; this.layout(); } return this; }
  style(o) {
    if (!o) return this;
    if (o.face !== undefined) this.face = o.face;
    if (o.size !== undefined) this.size = o.size;
    if (o.weight !== undefined) this.weight = o.weight;
    if (o.italic !== undefined) this.italic = o.italic;
    if (o.ink !== undefined) this.ink = paint.of(o.ink);
    if (o.align !== undefined) this.align = o.align;
    if (o.valign !== undefined) this.valign = o.valign;
    if (o.lineh !== undefined) this.lineh = o.lineh;
    if (o.track !== undefined) this.track = o.track;
    if (o.maxw !== undefined) this.maxw = o.maxw;
    if (o.edge !== undefined) this.edge = o.edge;
    if (o.drop !== undefined) this.drop = o.drop;
    if (o.wrap !== undefined) this.wrap = o.wrap;
    this.dirty = true;
    this.rev++;
    this.layout();
    return this;
  }
  fnt(sz) { return (this.weight ? this.weight + ' ' : '') + (this.italic ? 'italic ' : '') + (sz || this.size) + 'px "' + this.face + '", "Segoe UI", system-ui, sans-serif'; }
  measure(t, sz) {
    if (!t) return 0;
    const g = textctx();
    g['font'] = this.fnt(sz);
    return g['measureText'](t)['width'] + this.track * max(0, t.length - 1);
  }
  layout() {
    this.lines = [];
    this.anim = this.rainbowmode || this.anim;
    if (!this.value) { this.w = 0; this.h = 0; this.dirty = false; if (this.bakedp) this.bump(); return this; }
    const hard = this.value.split('\n');
    for (let hi = 0; hi < hard.length; hi++) {
      const runs = this.richtext(hard[hi]);
      let line = { runs: [], w: 0, h: 0 };
      const pushline = () => { line.h = line.h || this.size; this.lines.push(line); line = { runs: [], w: 0, h: 0 }; };
      for (let ri = 0; ri < runs.length; ri++) {
        const run = runs[ri];
        const words = run.text.split(' ');
        for (let wi = 0; wi < words.length; wi++) {
          const raw = wi < words.length - 1 ? words[wi] + ' ' : words[wi];
          if (!raw) continue;
          const ww = this.measure(raw, run.size);
          if (this.wrap && this.maxw > 0 && line.runs.length && line.w + ww > this.maxw) pushline();
          const last = line.runs.length ? line.runs[line.runs.length - 1] : null;
          if (last && last.src === run) { last.text += raw; last.w += ww; }
          else line.runs.push({ src: run, text: raw, w: ww, size: run.size, ink: run.ink, fnt: run.fnt, face: run.face, weight: run.weight, italic: run.italic, wave: run.wave, shake: run.shake, rainbow: run.rainbow, pop: run.pop, pulse: run.pulse, jitter: run.jitter, spin: run.spin, blink: run.blink, outline: run.outline, dim: run.dim, grow: run.grow, sparkle: run.sparkle, anim: run.anim });
          line.w += ww;
          line.h = max(line.h, run.size);
        }
      }
      pushline();
    }
    let tw = 0, th = 0;
    for (let i = 0; i < this.lines.length; i++) { tw = max(tw, this.lines[i].w); th += this.lh(this.lines[i]); }
    this.w = tw;
    this.h = th;
    this.dirty = false;
    this.rebake();
    return this;
  }
  richtext(src) {
    const out = [];
    const base = { size: this.size, ink: this.ink, weight: this.weight, italic: this.italic, face: this.face, wave: 0, shake: 0, rainbow: this.rainbowmode ? 1 : 0, pop: 0, pulse: 0, jitter: 0, spin: 0, blink: 0, outline: null, dim: 0, grow: 0, sparkle: 0, anim: false };
    const st = { ...base };
    const stack = [];
    let buf = '';
    let i = 0;
    const flush = () => { if (buf) { out.push({ ...st, text: buf }); buf = ''; } };
    const known = { c: 1, b: 1, i: 1, size: 1, face: 1, wave: 1, shake: 1, jitter: 1, rainbow: 1, pop: 1, pulse: 1, grow: 1, spin: 1, blink: 1, sparkle: 1, dim: 1, outline: 1 };
    while (i < src.length) {
      if (src[i] === '[') {
        const close = src.indexOf(']', i);
        if (close > i) {
          const inside = src.slice(i + 1, close);
          const eq = inside.indexOf('=');
          const cmd = (eq < 0 ? inside : inside.slice(0, eq)).toLowerCase();
          const val = eq < 0 ? '' : inside.slice(eq + 1);
          if (cmd[0] === '/') {
            const k = stack.pop();
            if (k) { flush(); for (const kk in k) st[kk] = k[kk]; }
            i = close + 1;
            continue;
          }
          if (known[cmd]) {
            flush();
            stack.push({ ...st });
            if (cmd === 'c') st.ink = paint.of(val || '#ffffff');
            else if (cmd === 'b') st.weight = val || '800';
            else if (cmd === 'i') { st.italic = true; if (val) st.weight = val; }
            else if (cmd === 'size') st.size = numof(val) || this.size;
            else if (cmd === 'face') st.face = val || this.face;
            else if (cmd === 'outline') st.outline = val || '#000000';
            else if (cmd === 'wave') st.wave = numof(val) || 3;
            else if (cmd === 'shake') st.shake = numof(val) || 2;
            else if (cmd === 'jitter') st.jitter = numof(val) || 1.5;
            else if (cmd === 'pop') st.pop = numof(val) || 1;
            else if (cmd === 'pulse') st.pulse = numof(val) || 1;
            else if (cmd === 'grow') st.grow = numof(val) || 1;
            else if (cmd === 'spin') st.spin = numof(val) || 1;
            else if (cmd === 'rainbow') st.rainbow = numof(val) || 1;
            else if (cmd === 'blink') st.blink = numof(val) || 0.6;
            else if (cmd === 'sparkle') st.sparkle = numof(val) || 1;
            else if (cmd === 'dim') st.dim = numof(val) || 0.5;
            st.text = '';
            i = close + 1;
            continue;
          }
        }
      }
      buf += src[i];
      i++;
    }
    flush();
    if (!out.length) out.push({ ...st, text: '' });
    for (let k = 0; k < out.length; k++) {
      const o = out[k];
      o.fnt = (o.weight ? o.weight + ' ' : '') + (o.italic ? 'italic ' : '') + o.size + 'px "' + o.face + '", "Segoe UI", system-ui, sans-serif';
      o.anim = !!(o.wave || o.shake || o.rainbow || o.pop || o.pulse || o.jitter || o.blink || o.grow || o.sparkle || o.spin);
      if (o.anim) this.anim = true;
    }
    return out;
  }
  lh(line) { return (line && line.h ? line.h : this.size) * this.lineh; }
  widthof(t) { return this.measure(t); }
  plain() { let s = ''; for (let i = 0; i < this.lines.length; i++) for (let k = 0; k < this.lines[i].runs.length; k++) s += this.lines[i].runs[k].text; return s; }
  typewrite(speed = 40) { this.typingon = true; this.typing = 0; this.spd = speed; this.reveal = 0; return this; }
  skip() { this.reveal = -1; this.typingon = false; return this; }
  get complete() { return this.reveal < 0 || this.reveal >= this.plain().length; }
  rebake() { if (this.bakedp) { this.rev++; this.bakedp = null; } return this; }
  step(dt) {
    this.clock += dt;
    if (this.sparkle) this.sparkle = max(0, this.sparkle - dt);
    if (this.typingon) {
      this.typing += dt * this.spd;
      const total = this.plain().length;
      this.reveal = min(total, floor(this.typing));
      if (this.reveal >= total) this.typingon = false;
    }
    return this;
  }
  bump() { if (this.bakedp) { this.bakedp = null; this.rev++; } return this; }
  paint(p) {
    if (p.cull(this)) return this;
    if (p.text) { p.text(this); return this; }
    const g = p.gfx;
    p.begin(this);
    this.inkstyle(g, p);
    return this;
  }
  inkstyle(g, p) {
    const a = p.alphaof(this);
    let y = 0;
    let shown = 0;
    for (let i = 0; i < this.lines.length; i++) {
      const line = this.lines[i];
      const lh = this.lh(line);
      let x = this.align === 'center' ? (this.w - line.w) / 2 : this.align === 'right' ? this.w - line.w : 0;
      for (let k = 0; k < line.runs.length; k++) {
        const run = line.runs[k];
        let str2 = run.text;
        if (this.reveal >= 0) {
          const avail = max(0, this.reveal - shown);
          if (avail <= 0) { shown += str2.length; x += run.w; continue; }
          if (avail < str2.length) str2 = str2.slice(0, avail);
          shown += run.text.length;
        }
        if (run.blink > 0 && fract(this.clock / (run.blink * 2)) > 0.5) { x += run.w; continue; }
        const ry = y + (line.h - run.size) * 0.5;
        if (!run.anim) this.gulpaint(g, str2, x, ry, run, run.ink, a, p);
        else {
          let cx = x;
          for (let ci = 0; ci < str2.length; ci++) {
            const ch = str2[ci];
            const cw = this.measure(ch, run.size);
            let dy = 0, dx = 0, sc = 1, rot = 0, ink = run.ink;
            if (run.wave) dy += sin(this.clock * 6 * this.spd + ci * 0.7) * run.wave;
            if (run.shake || run.jitter) { const jj = run.shake || run.jitter; dy += sin(this.clock * 41 + ci * 13.3) * jj; dx += cos(this.clock * 37 + ci * 7.7) * jj; }
            if (run.pop) sc += (sin(this.clock * 8 + ci) * 0.5 + 0.5) * run.pop * 0.45;
            if (run.pulse) sc += (sin(this.clock * 4) * 0.5 + 0.5) * run.pulse * 0.3;
            if (run.grow) sc += run.grow * ease.smooth((sin(this.clock * 2 - ci * 0.3) + 1) / 2) * 0.4;
            if (run.spin) rot = sin(this.clock * 3 + ci) * run.spin * 0.5;
            if (run.rainbow) { const hb = wrap(this.clock * 0.15 * this.spd + ci * 0.05, 0, 1); ink = paint.hsl(hb, 0.85, 0.62, run.ink.a === undefined ? 1 : run.ink.a); }
            if (run.sparkle && hash(ci, floor(this.clock * 12)) > 0.86) ink = paint.lite(ink, 0.7);
            const dyv = dy + (p.gpu ? this.size * 0.25 : 0);
            if (sc !== 1 || rot || dx || dyv) {
              g['save']();
              g['globalAlpha'] = a * (run.dim ? 1 - run.dim : 1);
              g['translate'](cx + cw / 2 + dx, ry + run.size * 0.5 + dyv);
              if (sc !== 1 || rot) g['transform'](cos(rot) * sc, sin(rot) * sc, -sin(rot) * sc, cos(rot) * sc, 0, 0);
              this.gulpaint(g, ch, -cw / 2, -run.size * 0.5, run, ink, 1, p);
              g['restore']();
            } else this.gulpaint(g, ch, cx, ry, run, ink, a, p);
            cx += cw + this.track;
          }
        }
        x += run.w;
      }
      y += lh;
    }
    if (this.reveal >= 0 && this.reveal < this.plain().length && fract(this.clock * 2) < 0.5) {
      g['fillStyle'] = paint.css(this.ink);
      g['fillRect'](x + 1, y - this.lh(null) + this.size * 0.18, max(2, this.size * 0.4), this.size * 0.85);
    }
    return this;
  }
  gulpaint(g, s2, x, y, run, ink, a, p) {
    if (!s2) return this;
    g['globalAlpha'] = a;
    g['font'] = run.fnt;
    g['textBaseline'] = 'top';
    const outline = run.outline || this.edge;
    const drop = this.drop;
    if (drop) { g['fillStyle'] = paint.css(drop); g['fillText'](s2, x + this.dropx, y + this.dropy); }
    if (outline) { g['lineWidth'] = this.edgew; g['strokeStyle'] = paint.css(outline); g['lineJoin'] = 'round'; g['strokeText'](s2, x, y); }
    g['fillStyle'] = paint.css(ink);
    g['fillText'](s2, x, y);
    g['globalAlpha'] = 1;
    return this;
  }
}

class cache extends node {
  constructor(x = 0, y = 0, w = 0, h = 0) {
    super(x, y, w, h);
    this.bakedart = null;
    this.parx = 0;
    this.pary = 0;
    this.res = 1;
    this.auto = false;
    this.clock = 0;
  }
  bake(p, res) {
    const painter = p || (this.scene ? this.scene.p : null) || (this.game ? this.game.p : null);
    if (!painter) return this;
    const w = this.w || 1, h = this.h || 1;
    this.bakedart = painter.bake(this, w, h, res || this.res);
    return this;
  }
  unbake() { this.bakedart = null; return this; }
  step(dt) { this.clock += dt; if (this.auto && this.bakedart && fract(this.clock) < dt) this.bake(); return this; }
  paint(p) {
    if (!this.bakedart) { p.keep = this; return this; }
    if (p.cull(this)) return this;
    p.begin(this);
    p.blit(this.bakedart, 0, 0, this.bakedart.w, this.bakedart.h, 0, 0, this.w, this.h, this);
    return this;
  }
}

class nine extends node {
  constructor(a, x = 0, y = 0, w = 0, h = 0) {
    super(x, y, w, h);
    this.art = art.of(a);
    this.frame = '0';
    this.ins = this.art && this.art.slice ? { l: this.art.slice.l, t: this.art.slice.t, r: this.art.slice.r, b: this.art.slice.b } : { l: 2, t: 2, r: 2, b: 2 };
    if (this.art && this.art.src === 0 && this.art.count() === 0) this.art.auto();
    this.inside = null;
  }
  inset(l, t, r, b) { this.ins = { l, t, r, b }; return this; }
  paint(p) {
    if (!this.art || p.cull(this)) return this;
    const f = this.art.at(this.frame);
    const s = this.ins;
    p.begin(this);
    p.nineblit(this.art, f.x, f.y, f.w, f.h, s.l, s.t, s.r, s.b, 0, 0, this.w, this.h, this);
    return this;
  }
}

const rrpath = (g, x, y, w, h, r) => {
  const rr = min(r, w / 2, h / 2);
  g.beginPath();
  g['moveTo'](x + rr, y);
  g['lineTo'](x + w - rr, y);
  g['arcTo'](x + w, y, x + w, y + rr, rr);
  g['lineTo'](x + w, y + h - rr);
  g['arcTo'](x + w, y + h, x + w - rr, y + h, rr);
  g['lineTo'](x + rr, y + h);
  g['arcTo'](x, y + h, x, y + h - rr, rr);
  g['lineTo'](x, y + rr);
  g['arcTo'](x, y, x + rr, y, rr);
  g.closePath();
};
class timer {
  constructor(sec, fn, repeat = 1) {
    this.sec = max(0.0001, sec);
    this.fn = fn || null;
    this.left = this.sec;
    this.t = 0;
    this.repeat = repeat;
    this.count = 0;
    this.live = true;
    this.paused = false;
    this.tag = '';
    this.endhook = null;
  }
  get progress() { return clamp01(1 - this.left / this.sec); }
  get ratio() { return this.progress; }
  get done() { return !this.live; }
  hold() { this.paused = true; return this; }
  free() { this.paused = false; return this; }
  reset(sec) { if (sec !== undefined) this.sec = max(0.0001, sec); this.left = this.sec; this.t = 0; this.live = true; this.count = 0; return this; }
  end(f) { this.endhook = f; return this; }
  kill() { this.live = false; return this; }
  step(dt) {
    if (!this.live || this.paused) return false;
    this.t += dt;
    this.left -= dt;
    if (this.left > 0) return false;
    this.count++;
    const more = this.repeat < 0 || this.count < this.repeat;
    const f = this.fn;
    if (f) f(this.count);
    if (more) { this.left += this.sec; if (this.left <= 0) this.left = this.sec; }
    else { this.live = false; if (this.endhook) this.endhook(this); }
    return true;
  }
}

class coro {
  constructor(fn, owner) {
    this.fn = fn;
    this.owner = owner || null;
    this.gen = typeof fn === 'function' ? fn(this) : fn;
    this.waits = 0;
    this.cond = null;
    this.pending = null;
    this.done = false;
    this.t = 0;
    this.tag = '';
    this.live = true;
    this.value = undefined;
  }
  wait(sec) { return { w: sec === undefined ? 1 / 60 : sec }; }
  frame() { return { w: 0 }; }
  until(fn) { return { u: fn }; }
  after(sec) { return { w: sec }; }
  get busy() { return !this.done; }
  kill() { this.done = true; this.live = false; return this; }
  resume(dt) {
    if (this.done || !this.live || this.paused) return false;
    this.t += dt;
    if (this.waits > 0) { this.waits -= dt; if (this.waits > 0) return true; }
    if (this.cond) { if (!this.cond()) return true; this.cond = null; }
    if (this.pending) { if (!this.pending.ok) return true; this.pending = null; }
    let r;
    try { r = this.gen.next(this.value); } catch (e) { this.done = true; this.live = false; throw e; }
    if (r.done) { this.done = true; this.live = false; return false; }
    const v = r.value;
    if (v && typeof v === 'object') {
      if (v.w !== undefined) this.waits = v.w;
      if (v.u) this.cond = v.u;
      if (v.p) { const box = { ok: false }; this.pending = box; v.p.then((x) => { box.ok = true; box.val = x; }, () => { box.ok = true; box.val = null; }); }
      if (v.w === 0) this.waits = 0;
    } else if (typeof v === 'number') this.waits = v;
    return true;
  }
}

class tune {
  constructor(target, dur = 0, e = 'smooth') {
    this.o = target;
    this.steps = [];
    this.i = 0;
    this.t = 0;
    this.acc = 0;
    this.from = {};
    this.loops = 1;
    this.round = 0;
    this.live = true;
    this.paused = false;
    this.running = false;
    this.tag = '';
    this.end = null;
    this.auto = true;
    if (dur > 0) this.to({}, dur, e);
  }
  to(props, dur = 0.3, e = 'smooth') { this.steps.push({ props: props || {}, dur: max(0, dur), e, keys: objt['keys'](props || {}), prep: false }); return this; }
  by(props, dur = 0.3, e = 'smooth') { const o = {}; for (const k in props) o[k] = (numof(readprop(this.o, k)) || 0) + props[k]; return this.to(o, dur, e); }
  from(props, dur = 0.3, e = 'smooth') { const o = {}; for (const k in props) { o[k] = readprop(this.o, k); write(propof(this.o, k), k.indexOf('.') >= 0 ? k.slice(k.indexOf('.') + 1) : k, props[k]); } return this.to(o, dur, e); }
  call(fn) { this.steps.push({ props: {}, dur: 0, e: 'line', keys: [], fn, prep: false }); return this; }
  wait(sec) { this.steps.push({ props: {}, dur: sec, e: 'line', keys: [], wait: true, prep: false }); return this; }
  loop(n = -1) { this.loops = n; return this; }
  pause() { this.paused = true; return this; }
  play() { this.paused = false; return this; }
  kill() { this.live = false; return this; }
  fin(f) { this.end = f; return this; }
  get progress() { const s = this.steps[this.i]; return s ? clamp01(this.t / max(0.0001, s.dur)) : 1; }
  get done() { return !this.live; }
  get step() { return this.steps[this.i]; }
  get total() { let s = 0; for (let i = 0; i < this.steps.length; i++) s += this.steps[i].dur; return s; }
  goal(k) { const s = this.steps[this.i]; return s ? s.props[k] : undefined; }
  read(k) { return readprop(this.o, k); }
  raw(k) { const s = this.steps[this.i]; if (!s || !(k in s.props)) return undefined; return typeof s.props[k] === 'string' ? numof(this.from[k]) + numof(s.props[k]) : s.props[k]; }
  prep(s) {
    this.from = {};
    for (let i = 0; i < s.keys.length; i++) {
      const k = s.keys[i];
      const cur = readprop(this.o, k);
      const raw = s.props[k];
      const dest = typeof raw === 'string' && (raw[0] === '+' || raw[0] === '-') && typeof cur === 'number' ? cur + numof(raw) : raw;
      s.props[k] = dest;
      this.from[k] = cur;
    }
    s.prep = true;
    return this;
  }
  each(stepfn) { const s = this.steps[this.i]; return s; }
  apply(p, e) {
    const s = this.steps[this.i];
    if (!s) return this;
    for (let i = 0; i < s.keys.length; i++) {
      const k = s.keys[i];
      const a = this.from[k], b = s.props[k];
      let v;
      if (typeof a === 'number' && typeof b === 'number') v = lerp(a, b, e);
      else v = e >= 1 ? b : a;
      const dot = k.indexOf('.');
      if (dot < 0) this.o[k] = v;
      else { const par = propof(this.o, k); if (par) par[k.slice(dot + 1)] = v; }
    }
    return this;
  }
  finish() {
    this.live = false;
    if (this.end) this.end(this);
    return this;
  }
  restart() { this.i = 0; this.t = 0; this.round = 0; this.live = true; for (let k2 = 0; k2 < this.steps.length; k2++) this.steps[k2].prep = false; return this; }
  step2(dt) {
    if (!this.live || this.paused) return this;
    this.acc = dt;
    let guard = 0;
    while (this.acc > 0 && this.live && guard++ < 256) {
      const s = this.steps[this.i];
      if (!s) { this.round++; if (this.loops < 0 || this.round < this.loops) { this.i = 0; this.t = 0; for (let k2 = 0; k2 < this.steps.length; k2++) this.steps[k2].prep = false; continue; } this.finish(); return this; }
      if (!s.prep) this.prep(s);
      if (s.keys.length && s.dur > 0) {
        const left = s.dur - this.t;
        const use = min(this.acc, left);
        this.t += use;
        this.acc -= use;
        const p = clamp01(this.t / s.dur);
        this.apply(p, ease.get(s.e)(p));
        if (p >= 1) { this.t = 0; this.i++; s.prep = false; }
      } else {
        if (s.fn) { s.fn(this.o); s.fn = null; }
        if (s.wait && this.t < s.dur) {
          const use = min(this.acc, s.dur - this.t);
          this.t += use;
          this.acc -= use;
          if (this.t < s.dur) return this;
          this.t = 0;
        }
        s.prep = false;
        this.i++;
      }
    }
    return this;
  }
}

class clock {
  constructor() { this.timers = []; this.coros = []; this.tunes = []; this.time = 0; this.scale = 1; this.tag = ''; }
  hold(sec, fn, n = 1) { const t = new timer(sec, fn, n); this.timers.push(t); return t; }
  forever(sec, fn) { return this.hold(sec, fn, -1); }
  after(sec, fn) { return this.hold(sec, fn, 1); }
  tween(target, dur = 0.3, e = 'smooth') { const t = new tune(target, dur, e); this.tunes.push(t); return t; }
  to(target, props, dur, e) { return this.tween(target, dur, e).to(props, dur, e); }
  cue(fn, owner) { const c = new coro(fn, owner); this.coros.push(c); return c; }
  kill(t) {
    if (t instanceof timer) { const i = this.timers.indexOf(t); if (i >= 0) this.timers.splice(i, 1); }
    else if (t instanceof coro) { t.kill(); const i = this.coros.indexOf(t); if (i >= 0) this.coros.splice(i, 1); }
    else if (t instanceof tune) { t.kill(); const i = this.tunes.indexOf(t); if (i >= 0) this.tunes.splice(i, 1); }
    return this;
  }
  clear() { this.timers.length = 0; this.coros.length = 0; this.tunes.length = 0; return this; }
  step(dt) {
    const d = dt * this.scale;
    this.time += d;
    for (let i = this.timers.length - 1; i >= 0; i--) { this.timers[i].step(d); if (!this.timers[i].live) this.timers.splice(i, 1); }
    for (let i = this.tunes.length - 1; i >= 0; i--) { this.tunes[i].step2(d); if (!this.tunes[i].live) this.tunes.splice(i, 1); }
    for (let i = this.coros.length - 1; i >= 0; i--) { this.coros[i].resume(d); if (!this.coros[i].live) this.coros.splice(i, 1); }
    return this;
  }
}

class machine {
  constructor(owner) {
    this.owner = owner;
    this.states = {};
    this.stack = [];
    this.time = 0;
    this.last = null;
    this.log = [];
    this.data = {};
    this.changed = false;
  }
  state(name, def) { this.states[name] = def || {}; return this; }
  get cur() { return this.stack.length ? this.stack[this.stack.length - 1].name : null; }
  get prev() { return this.stack.length > 1 ? this.stack[this.stack.length - 2].name : this.last; }
  at(name) { return this.cur === name; }
  was(name) { return this.prev === name; }
  any(...names) { for (let i = 0; i < names.length; i++) if (this.cur === names[i]) return true; return false; }
  go(name, force = false) {
    if (!this.states[name]) return this;
    if (this.cur === name && !force) return this;
    const from = this.cur;
    if (from) { const d = this.states[from]; if (d.exit) d.exit(this.owner, name, this); }
    if (this.stack.length) this.stack.pop();
    this.stack.push({ name, t: 0, force: false });
    this.time = 0;
    this.last = from;
    this.changed = true;
    const d = this.states[name];
    if (d.enter) d.enter(this.owner, from, this);
    return this;
  }
  push(name) {
    const from = this.cur;
    this.stack.push({ name, t: 0 });
    this.time = 0;
    this.changed = true;
    const d = this.states[name];
    if (d.enter) d.enter(this.owner, from, this);
    return this;
  }
  pop() {
    const cur = this.cur;
    if (this.stack.length <= 1) return this;
    const d = this.states[cur];
    if (d && d.exit) d.exit(this.owner, this.stack[this.stack.length - 2].name, this);
    this.stack.pop();
    this.time = 0;
    this.changed = true;
    const back = this.cur;
    const bd = this.states[back];
    if (bd && bd.resume) bd.resume(this.owner, cur, this);
    return this;
  }
  step(dt) {
    this.changed = false;
    this.time += dt;
    const top = this.stack.length ? this.stack[this.stack.length - 1] : null;
    if (!top) return this;
    top.t += dt;
    const d = this.states[top.name];
    if (!d) return this;
    if (d.until) { const next = d.until(this.owner, top.t, this); if (next && next !== true) { this.go(next); return this; } if (next === true) { this.pop(); return this; } if (this.changed) return this; }
    if (d.step) d.step(this.owner, dt, this);
    if (this.cur === top.name) { if (d.exitwhen && d.exitwhen(this.owner, this)) { this.go(d.then || (this.stack.length > 1 ? this.stack[this.stack.length - 2].name : this.cur)); } }
    return this;
  }
  dump() { return this.stack.map((s) => s.name).join('>'); }
}

const readprop = (o, k) => { let v = o, i = 0; while (i < k.length) { const d = k.indexOf('.', i); if (d < 0) { v = v[k.slice(i)]; break; } v = v[k.slice(i, d)]; i = d + 1; } return typeof v === 'function' ? v.call(o) : v; };
const propof = (o, k) => { let v = o, i = 0; while (i < k.length) { const d = k.indexOf('.', i); if (d < 0) return v; v = v[k.slice(i, d)]; i = d + 1; } return v; };
const write = (o, k, v) => { const d = k.indexOf('.'); if (d < 0) { o[k] = v; } else { const par = propof(o, k); par[k.slice(d + 1)] = v; } return o; };
const nested = (k) => (k.indexOf('.') >= 0 ? { par: 1 } : null);

class spring {
  constructor(value = 0, opts = {}) {
    this.value = value;
    this.target = value;
    this.vel = 0;
    this.stiff = opts.stiff || 170;
    this.damp = opts.damp || 26;
    this.prec = opts.prec || 0.01;
    this.on = true;
  }
  to(v) { this.target = v; return this; }
  set(v) { this.value = v; this.target = v; this.vel = 0; return this; }
  step(dt) {
    if (!this.on) return this.value;
    const steps = max(1, min(8, ceil(dt / 0.008)));
    const h = dt / steps;
    for (let i = 0; i < steps; i++) {
      const a = (this.target - this.value) * this.stiff - this.vel * this.damp;
      this.vel += a * h;
      this.value += this.vel * h;
    }
    if (abs(this.target - this.value) < this.prec && abs(this.vel) < this.prec) { this.value = this.target; this.vel = 0; }
    return this.value;
  }
  get done() { return this.value === this.target && this.vel === 0; }
}
const DT = 1 / 60;
const codes = (a) => strt(a).split(/[,\s|]+/).filter((s) => s.length);
const keyname = (e) => {
  if (e['code']) return e['code'];
  const k = e['key'];
  if (!k) return 'Unknown';
  if (k === ' ') return 'Space';
  if (k.length === 1) { const u = k.toUpperCase(); if (u >= 'A' && u <= 'Z') return 'Key' + u; if (k >= '0' && k <= '9') return 'Digit' + k; }
  const t = { Esc: 'Escape', Left: 'ArrowLeft', Right: 'ArrowRight', Up: 'ArrowUp', Down: 'ArrowDown', Del: 'Delete' };
  return t[k] || k;
};

class keys {
  constructor() {
    this.live = {};
    this.held = {};
    this.hits = {};
    this.let = {};
    this.sec = {};
    this.binds = {};
    this.bufs = {};
    this.window = 0.16;
    this.steals = ['Space', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'F1', 'F2', 'F3', 'F4', 'F5'];
    this.grab = true;
    this.onkey = null;
    this.ontext = null;
    this.text = '';
    this.mods = { shift: false, ctrl: false, alt: false, meta: false };
    this.typed = '';
  }
  down(code) { return !!this.held[code]; }
  hit(code) { return !!this.hits[code]; }
  release(code) { return !!this.let[code]; }
  time(code) { return this.sec[code] || 0; }
  any(...cs) { for (let i = 0; i < cs.length; i++) if (this.held[cs[i]]) return true; return false; }
  anyhit(...cs) { for (let i = 0; i < cs.length; i++) if (this.hits[cs[i]]) return true; return false; }
  bind(name, str, opts) {
    const o = opts || {};
    this.binds[name] = { codes: codes(str), rate: o.rate || 0, hold: o.hold || 0, delay: o.delay === undefined ? 0.4 : o.delay, axis: o.axis || 0 };
    return this;
  }
  keydown(code) { if (!this.held[code]) { this.hits[code] = true; this.bufs[code] = 1; this.sec[code] = 0; } this.held[code] = true; this.let[code] = false; return this; }
  keyup(code) { if (this.held[code]) this.let[code] = true; this.held[code] = false; this.sec[code] = 0; return this; }
  tap(name) { return this.acthit(name); }
  act(name) { const b = this.binds[name]; if (!b) return this.down(name); for (let i = 0; i < b.codes.length; i++) if (this.held[b.codes[i]]) return true; return false; }
  acthit(name) {
    const b = this.binds[name];
    if (!b) return this.hit(name);
    for (let i = 0; i < b.codes.length; i++) if (this.hits[b.codes[i]] || (this.bufs[b.codes[i]] || 0) > 0) return true;
    return false;
  }
  actup(name) { const b = this.binds[name]; if (!b) return this.release(name); for (let i = 0; i < b.codes.length; i++) if (this.let[b.codes[i]]) return true; return false; }
  acttime(name) { const b = this.binds[name]; if (!b) return this.time(name); let s = 0; for (let i = 0; i < b.codes.length; i++) if (this.held[b.codes[i]]) s = max(s, this.sec[b.codes[i]] || 0); return s; }
  axistwo(neg, pos) { return (this.act(pos) ? 1 : 0) - (this.act(neg) ? 1 : 0); }
  axis(neg, pos) { return this.axistwo(neg, pos); }
  repeat(name, rate = 0.14, first = 0.35) {
    const b = this.binds[name];
    if (!b) return false;
    for (let i = 0; i < b.codes.length; i++) {
      const c = b.codes[i];
      if (!this.held[c]) continue;
      const t = this.sec[c] || 0;
      if (t < first) return this.hits[c];
      return floor((t - first) / rate) !== floor((t - first - DT) / rate);
    }
    return false;
  }
  flush() { for (const k in this.hits) this.hits[k] = false; for (const k in this.let) this.let[k] = false; this.typed = ''; return this; }
  clear() { this.live = {}; this.held = {}; this.hits = {}; this.let = {}; this.sec = {}; return this; }
  step(dt) {
    for (const c in this.held) if (this.held[c]) this.sec[c] = (this.sec[c] || 0) + dt;
    if (dt) for (const c in this.bufs) { this.bufs[c] = (this.bufs[c] || 0) - dt; if (this.bufs[c] < 0) this.bufs[c] = 0; }
    return this;
  }
}

class mouse {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.px = 0;
    this.py = 0;
    this.dx = 0;
    this.dy = 0;
    this.wheel = 0;
    this.swing = 0;
    this.down = [false, false, false, false, false];
    this.hits = [false, false, false, false, false];
    this.lets = [false, false, false, false, false];
    this.sec = [0, 0, 0, 0, 0];
    this.click = 0;
    this.used = false;
    this.inside = false;
    this.lock = false;
    this.rawdx = 0;
    this.rawdy = 0;
    this.dbl = 0;
    this.pressed = '';
  }
  is(i = 0) { return !!this.down[i]; }
  hit(i = 0) { return !!this.hits[i]; }
  release(i = 0) { return !!this.lets[i]; }
  time(i = 0) { return this.sec[i] || 0; }
  left() { return !!this.down[0]; }
  leftout() { return !!this.hits[0]; }
  right() { return !!this.down[2]; }
  mid() { return !!this.down[1]; }
  any() { return this.down[0] || this.down[1] || this.down[2]; }
  flush() { for (let i = 0; i < 5; i++) { this.hits[i] = false; this.lets[i] = false; } this.used = false; this.wheel = 0; this.dx = 0; this.dy = 0; return this; }
  step(dt) { for (let i = 0; i < 5; i++) if (this.down[i]) this.sec[i] = (this.sec[i] || 0) + dt; this.swing = max(0, this.swing - dt); return this; }
}

class touch {
  constructor() {
    this.list = [];
    this.just = [];
    this.gone = [];
    this.cur = new mapc();
    this.count = 0;
    this.pinch = 1;
    this.pinch0 = 1;
    this.rot = 0;
    this.swiped = '';
    this.tapzone = null;
    this.first = null;
    this.stick = null;
  }
  get any() { return this.count > 0; }
  get main() { return this.list.length ? this.list[0] : null; }
  tap(x, y, id) {
    const p = { id: id || 0, x, y, x0: x, y0: y, dx: 0, dy: 0, t: 0, live: true, vx: 0, vy: 0, down: true, hit: true, released: false, hold: 0, pinch: 1 };
    this.list.push(p);
    this.just.push(p);
    this.count = this.list.length;
    return p;
  }
  move(x, y, id) {
    for (let i = 0; i < this.list.length; i++) { const p = this.list[i]; if (p.id === (id || 0)) { p.dx = x - p.x; p.dy = y - p.y; p.x = x; p.y = y; p.vx = p.dx * 60; p.vy = p.dy * 60; return p; } }
    return null;
  }
  lift(id) {
    for (let i = 0; i < this.list.length; i++) { const p = this.list[i]; if (p.id === (id || 0)) { p.down = false; p.released = true; this.gone.push(p); this.list.splice(i, 1); this.count = this.list.length; return p; } }
    return null;
  }
  step(dt) {
    this.just.length = 0;
    this.gone.length = 0;
    for (let i = 0; i < this.list.length; i++) { const p = this.list[i]; p.t += dt; p.hit = false; if (p.down) p.hold += dt; }
    if (this.list.length >= 2) {
      const a = this.list[0], b = this.list[1];
      const d = dist(a.x, a.y, b.x, b.y);
      if (!this.spread) this.spread = d;
      this.pinch = this.spread > 0 ? d / this.spread : 1;
      this.rot = angleof(a.x, a.y, b.x, b.y) - (this.angle0 || 0);
    }
    return this;
  }
}

class pads {
  constructor() {
    this.list = [];
    this.binds = {};
    this.axes = [];
    this.on = false;
    this.dead = 0.24;
  }
  bind(name, btn, axis, dir) { this.binds[name] = { btn, axis, dir }; return this; }
  fetch() {
    const g = env['navigator'];
    if (!g || !g['getGamepads']) return this;
    const all = g['getGamepads']();
    this.list = [];
    for (let i = 0; i < all.length; i++) if (all[i]) this.list.push(all[i]);
    this.on = this.list.length > 0;
    return this;
  }
  act(name) {
    const b = this.binds[name];
    if (!b) return false;
    for (let i = 0; i < this.list.length; i++) {
      const g = this.list[i];
      if (b.btn !== undefined && g['buttons'][b.btn] && g['buttons'][b.btn]['pressed']) return true;
      if (b.axis !== undefined) { const v = g['axes'][b.axis]; if (v && sign(v) === b.dir && abs(v) > this.dead) return true; }
    }
    return false;
  }
  axis(i = 0, n = 0) { const g = this.list[n]; if (!g) return 0; const v = g['axes'][i] || 0; return abs(v) < this.dead ? 0 : v; }
  btn(i, n = 0) { const g = this.list[n]; if (!g) return 0; const b = g['buttons'][i]; return b ? b['value'] : 0; }
  move(n = 0) {
    const g = this.list[n];
    if (!g) return new vec();
    const v = new vec(g['axes'][0] || 0, g['axes'][1] || 0);
    if (abs(v.x) < this.dead) v.x = 0;
    if (abs(v.y) < this.dead) v.y = 0;
    const l = v.len();
    return l > 1 ? v.norm() : v;
  }
}

class input {
  constructor(target) {
    this.keys = new keys();
    this.mouse = new mouse();
    this.touches = new touch();
    this.pads = new pads();
    this.target = target || null;
    this.move = new vec();
    this.point = new vec();
    this.wpoint = new vec();
    this.vpoint = new vec();
    this.attached = false;
    this.tapstick = null;
    this.stickon = false;
    this.locked = false;
    this.noesc = false;
    this.handlers = [];
    this.clock = 0;
    this.keysflag = false;
    this.defaults();
  }
  defaults() {
    const k = this.keys;
    k.bind('left', 'ArrowLeft,KeyA');
    k.bind('right', 'ArrowRight,KeyD');
    k.bind('up', 'ArrowUp,KeyW');
    k.bind('down', 'ArrowDown,KeyS');
    k.bind('jump', 'Space,KeyZ,KeyK');
    k.bind('dash', 'ShiftLeft,ShiftRight,KeyC,KeyJ');
    k.bind('attack', 'KeyX,KeyL');
    k.bind('grab', 'KeyG,KeyQ');
    k.bind('fire', 'KeyF,KeyV');
    k.bind('run', 'ControlLeft,ControlRight');
    k.bind('confirm', 'Enter,Space');
    k.bind('cancel', 'Escape,Backspace');
    k.bind('pause', 'Escape,KeyP');
    k.bind('menu', 'Escape');
    this.pads.bind('jump', 0);
    this.pads.bind('attack', 2);
    this.pads.bind('dash', 1);
    this.pads.bind('grab', 5);
    return this;
  }
  attach(target) {
    if (this.attached) this.detach();
    this.target = target || this.target || elm('canvas');
    const t = this.target;
    const w = env;
    const addf = (a, b, c) => { const h = (e) => b(e); t['addEventListener'](a, h, c); this.handlers.push([t, a, h, c]); };
    addf('keydown', (e) => {
      const c = keyname(e);
      if (this.keys.grab && this.keys.steals.indexOf(c) >= 0) e['preventDefault']();
      if (this.locked) e['preventDefault']();
      this.keys.keydown(c);
      this.keys.mods.shift = e['shiftKey'];
      if (!e['ctrlKey'] && !e['metaKey'] && !e['altKey']) this.keys.typed += keychar(c, !!e['shiftKey']);
      this.keys.mods.ctrl = e['ctrlKey'];
      this.keys.mods.alt = e['altKey'];
      this.keys.mods.meta = e['metaKey'];
      if (this.keys.onkey) this.keys.onkey(c, true, e);
    });
    addf('keyup', (e) => {
      const c = keyname(e);
      this.keys.keyup(c);
      this.keys.mods.shift = e['shiftKey'];
      if (this.keys.onkey) this.keys.onkey(c, false, e);
    });
    addf('mousemove', (e) => { const p = this.pointerof(e); this.mouse.inside = true; this.mouse.x = p.x; this.mouse.y = p.y; });
    addf('mousedown', (e) => { const p = this.pointerof(e); this.mouse.x = p.x; this.mouse.y = p.y; const i = e['button']; this.mouse.down[i] = true; this.mouse.hits[i] = true; this.mouse.sec[i] = 0; e['preventDefault'](); });
    addf('mouseup', (e) => { const i = e['button']; this.mouse.down[i] = false; this.mouse.lets[i] = true; this.mouse.sec[i] = 0; const n2 = clock2.now(); if (n2 - this.mouse.dbl < 260) this.mouse.click = 2; else this.mouse.click = 1; this.mouse.dbl = n2; });
    addf('mouseleave', () => { this.mouse.inside = false; for (let i = 0; i < 5; i++) this.mouse.down[i] = false; });
    addf('contextmenu', (e) => { if (this.keys.grab) e['preventDefault'](); });
    addf('wheel', (e) => { this.mouse.wheel += e['deltaY']; this.mouse.swing = 0.25; if (this.keys.grab) e['preventDefault'](); }, { passive: false });
    this.attached = true;
    if (env['HTMLCanvasElement'] && t instanceof env['HTMLCanvasElement']) {
      const topts = { passive: false };
      const addt = (a, b) => { const h = (e) => b(e); t['addEventListener'](a, h, topts); this.handlers.push([t, a, h, topts]); };
      addt('touchstart', (e) => { e['preventDefault'](); for (let i = 0; i < e['changedTouches'].length; i++) { const tt = e['changedTouches'][i]; const p = this.pointerof(tt); this.touches.tap(p.x, p.y, tt['identifier']); } });
      addt('touchmove', (e) => { e['preventDefault'](); for (let i = 0; i < e['changedTouches'].length; i++) { const tt = e['changedTouches'][i]; const p = this.pointerof(tt); this.touches.move(p.x, p.y, tt['identifier']); } });
      const endf = (e) => { for (let i = 0; i < e['changedTouches'].length; i++) this.touches.lift(e['changedTouches'][i]['identifier']); };
      addt('touchend', endf);
      addt('touchcancel', endf);
    }
    return this;
  }
  detach() {
    for (let i = 0; i < this.handlers.length; i++) { const h = this.handlers[i]; h[0]['removeEventListener'](h[1], h[2], h[3]); }
    this.handlers.length = 0;
    this.attached = false;
    return this;
  }
  pointerof(e) {
    const t = this.target;
    if (!t) return { x: e['clientX'], y: e['clientY'] };
    const r = t['getBoundingClientRect']();
    const f = this.xform;
    const sx = f && f.sx ? f.sx : (r['width'] ? t['width'] / r['width'] : 1);
    const sy = f && f.sy ? f.sy : (r['height'] ? t['height'] / r['height'] : 1);
    return { x: (e['clientX'] - r['left']) * sx, y: (e['clientY'] - r['top']) * sy };
  }
  bind(name, str, opts) { this.keys.bind(name, str, opts); return this; }
  padbind(name, btn, axis, dir) { this.pads.bind(name, btn, axis, dir); return this; }
  act(name) { return this.keys.act(name) || this.pads.act(name); }
  acthit(name) { return this.keys.acthit(name) || this.pads.act(name); }
  axis(name, neg, pos) {
    let v = this.keys.axistwo(neg, pos);
    const b = this.keys.binds[name];
    if (b && b.axis) v += this.pads.axis(b.axis);
    return clamp(v, -1, 1);
  }
  walkx(neg = 'left', pos = 'right') {
    let v = (this.keys.act(pos) ? 1 : 0) - (this.keys.act(neg) ? 1 : 0);
    v += this.pads.axis(0);
    if (this.stickon && this.tapstick && this.tapstick.on) v += this.tapstick.vx;
    return clamp(v, -1, 1);
  }
  walky(neg = 'up', pos = 'down') {
    let v = (this.keys.act(pos) ? 1 : 0) - (this.keys.act(neg) ? 1 : 0);
    v += this.pads.axis(1);
    if (this.stickon && this.tapstick && this.tapstick.on) v += this.tapstick.vy;
    return clamp(v, -1, 1);
  }
  stickzone(x, y, r) { this.tapstick = new stickzone(x, y, r, this); this.stickon = true; return this.tapstick; }
  attachonce() { return this; }
  world(cam, out) { out = out || this.wpoint; cam.screen(cam.view, this.mouse.x, this.mouse.y, out); return out; }
  fromcam(cam) { return this.world(cam); }
  pointerdown(i = 0) { return this.mouse.is(i) || this.touches.any; }
  pointerhit(i = 0) { return this.mouse.hit(i) || this.touches.just.length > 0; }
  rumble(ms = 120, weak = 0.6, strong = 0.4) {
    for (let i = 0; i < this.pads.list.length; i++) {
      const g = this.pads.list[i];
      const v = g['vibrationActuator'];
      if (v && v['playEffect']) v['playEffect']('dual-rumble', { duration: ms, weakMagnitude: weak, strongMagnitude: strong });
    }
    return this;
  }
  lockpointer(on) { if (this.target && this.target['requestPointerLock']) { if (on) this.target['requestPointerLock'](); else if (env['document']) env['document']['exitPointerLock'](); } return this; }
  step(dt) {
    this.clock += dt;
    this.keys.step(dt);
    this.mouse.step(dt);
    this.touches.step(dt);
    this.pads.fetch();
    if (this.tapstick) this.tapstick.step(dt);
    this.point.set(this.mouse.x, this.mouse.y);
    if (this.mouse.lock) { this.mouse.dx = this.mouse.rawdx; this.mouse.dy = this.mouse.rawdy; }
    return this;
  }
  flush() { this.keys.flush(); this.mouse.flush(); this.mouse.rawdx = 0; this.mouse.rawdy = 0; return this; }
  clear() { this.keys.clear(); this.keysflag = false; return this; }
}

const clock2 = { t0: 0, now() { const p = env['performance']; return p ? p['now']() : datec['now'](); } };

class stickzone {
  constructor(x, y, r, inp) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.ix = x;
    this.iy = y;
    this.vx = 0;
    this.vy = 0;
    this.on = false;
    this.id = -1;
    this.hold = 0;
    this.inp = inp;
    this.knob = { x, y, r: r * 0.45 };
    this.dead = 0.16;
    this.touchonly = true;
  }
  matches(x, y) { return distsq(x, y, this.ix, this.iy) <= this.r * this.r; }
  step(dt) {
    const t = this.inp.touches;
    let found = null;
    for (let i = 0; i < t.list.length; i++) { const p = t.list[i]; if (p.id === this.id) { found = p; break; } }
    if (!found) {
      for (let i = 0; i < t.list.length; i++) { const p = t.list[i]; if (this.matches(p.x0, p.y0)) { found = p; this.id = p.id; break; } }
    }
    if (found) {
      this.on = true;
      const dx = found.x - this.ix, dy = found.y - this.iy;
      const l = hypot(dx, dy);
      const cl = min(l, this.r);
      this.knob.x = this.ix + (l > 0 ? (dx / l) * cl : 0);
      this.knob.y = this.iy + (l > 0 ? (dy / l) * cl : 0);
      const nx = (this.knob.x - this.ix) / this.r, ny = (this.knob.y - this.iy) / this.r;
      this.vx = abs(nx) < this.dead ? 0 : nx;
      this.vy = abs(ny) < this.dead ? 0 : ny;
      this.hold += dt;
    } else { this.on = false; this.vx = 0; this.vy = 0; this.id = -1; this.hold = 0; this.knob.x = this.ix; this.knob.y = this.iy; }
    return this;
  }
  draw(p) {
    if (!this.on) return this;
    p.gfx['globalAlpha'] = 0.35;
    p.gfx['beginPath']();
    p.gfx['arc'](this.ix, this.iy, this.r, 0, tau);
    p.gfx['fillStyle'] = '#000';
    p.gfx['fill']();
    p.gfx['beginPath']();
    p.gfx['arc'](this.knob.x, this.knob.y, this.knob.r, 0, tau);
    p.gfx['fillStyle'] = '#fff';
    p.gfx['fill']();
    p.gfx['globalAlpha'] = 1;
    return this;
  }
}

const gestures = {
  swipe(t, opts) {
    const o = opts || {};
    const min = o.min || 30;
    return t.list.some((p) => (p.dx * p.dx + p.dy * p.dy > min * min));
  },
  dir(p) { return abs(p.dx) > abs(p.dy) ? (p.dx > 0 ? 'right' : 'left') : (p.dy > 0 ? 'down' : 'up'); },
  hold(p, sec) { return p.hold >= sec; },
  pinch(t, lo, hi) { return t.pinch >= lo && t.pinch <= hi; }
};
class rec {
  constructor() { this.x = 0; this.y = 0; this.w = 0; this.h = 0; this.oneway = false; this.slope = 0; this.tag = ''; this.node = null; this.map = null; this.tx = 0; this.ty = 0; this.dx = 0; this.dy = 0; this.what = ''; }
  set(x, y, w, h) { this.x = x; this.y = y; this.w = w; this.h = h; return this; }
  get right() { return this.x + this.w; }
  get bottom() { return this.y + this.h; }
  get cx() { return this.x + this.w / 2; }
  get cy() { return this.y + this.h / 2; }
}

class space {
  constructor(opts) {
    const o = opts || {};
    this.blocks = [];
    this.lifts = [];
    this.zones = [];
    this.maps = [];
    this.actors = [];
    this.cell = o.cell || 80;
    this.hash = new mapc();
    this.gravity = new vec(o.gx || 0, o.gy === undefined ? 900 : o.gy);
    this.drag = o.drag || 0;
    this.maxstep = o.maxstep || 1;
    this.time = 0;
    this.dirty = true;
    this.clock = new clock();
    this.scene = null;
    this.game = null;
    this.bus = new bus();
    this.groups = {};
    this.count = 0;
  }
  on(k, f) { this.bus.on(k, f); return this; }
  fire(k, a, b, c) { return this.bus.fire(k, a, b, c); }
  key(cx, cy) { return cx + ',' + cy; }
  buckets(b, push) {
    const cs = this.cell;
    const x0 = floor(b.x / cs), y0 = floor(b.y / cs), x1 = floor((b.x + b.w) / cs), y1 = floor((b.y + b.h) / cs);
    for (let cy = y0; cy <= y1; cy++) for (let cx = x0; cx <= x1; cx++) push(this.key(cx, cy));
    return this;
  }
  rehash() {
    this.hash.clear();
    for (let i = 0; i < this.blocks.length; i++) {
      const s = this.blocks[i];
      if (!s.on) continue;
      this.buckets(s, (k) => { let l = this.hash.get(k); if (!l) this.hash.set(k, (l = [])); l.push(s); });
    }
    this.dirty = false;
    return this;
  }
  add(a) {
    if (!a) return a;
    if (a instanceof arrt) { for (let i = 0; i < a.length; i++) this.add(a[i]); return a; }
    if (a instanceof tilemap) { if (this.maps.indexOf(a) < 0) this.maps.push(a); a.space = this; return a; }
    if (a instanceof zone) { if (this.zones.indexOf(a) < 0) this.zones.push(a); a.space = this; return a; }
    if (a instanceof lift) { if (this.lifts.indexOf(a) < 0) this.lifts.push(a); return a; }
    if (a instanceof block) { if (this.blocks.indexOf(a) < 0) this.blocks.push(a); this.dirty = true; return a; }
    if (a.rig) { if (this.actors.indexOf(a) < 0) this.actors.push(a); a.rig.space = this; return a; }
    return a;
  }
  drop(a) {
    const pop = (l) => { const i = l.indexOf(a); if (i >= 0) l.splice(i, 1); };
    pop(this.blocks); pop(this.lifts); pop(this.zones); pop(this.maps); pop(this.actors);
    if (this.maps.indexOf(a) < 0 && a.space === this) a.space = null;
    this.dirty = true;
    return this;
  }
  clear() { this.blocks.length = 0; this.lifts.length = 0; this.zones.length = 0; this.maps.length = 0; this.actors.length = 0; this.hash.clear(); return this; }
  near(b, out) {
    out = out || [];
    if (this.dirty) this.rehash();
    const cs = this.cell;
    const x0 = floor(b.x / cs), y0 = floor(b.y / cs), x1 = floor((b.x + b.w) / cs), y1 = floor((b.y + b.h) / cs);
    for (let cy = y0; cy <= y1; cy++) for (let cx = x0; cx <= x1; cx++) {
      const l = this.hash.get(this.key(cx, cy));
      if (l) for (let i = 0; i < l.length; i++) if (out.indexOf(l[i]) < 0) out.push(l[i]);
    }
    for (let i = 0; i < this.lifts.length; i++) { const s = this.lifts[i]; if (s.on && b.hits(s)) out.push(s); }
    return out;
  }
  rects(r, b, fn) {
    const out = this.near(b);
    for (let i = 0; i < out.length; i++) { const s = out[i]; fn(s.x, s.y, s.w, s.h, s.oneway ? 1 : 0, 0, s); }
    if (r) for (let i = 0; i < this.maps.length; i++) this.maps[i].rects(r, b, fn);
    return this;
  }
  solids(b, out) {
    if (this.dirty) this.rehash();
    const l = out || [];
    l.length = 0;
    const cs = this.cell;
    const x0 = floor(b.x / cs), y0 = floor(b.y / cs), x1 = floor((b.x + b.w) / cs), y1 = floor((b.y + b.h) / cs);
    for (let cy = y0; cy <= y1; cy++) for (let cx = x0; cx <= x1; cx++) {
      const arr = this.hash.get(this.key(cx, cy));
      if (arr) for (let i = 0; i < arr.length; i++) { const s = arr[i]; if (s.on && b.hits(s) && l.indexOf(s) < 0) l.push(s); }
    }
    for (let i = 0; i < this.lifts.length; i++) { const s = this.lifts[i]; if (s.on && s.sturdy && b.hits(s)) l.push(s); }
    for (let i = 0; i < this.maps.length; i++) this.maps[i].boxrects(b, l);
    return l;
  }
  boxhits(b, oneway, vy) {
    if (this.dirty) this.rehash();
    const out = temp;
    out.length = 0;
    this.solids(b, out);
    for (let i = 0; i < out.length; i++) {
      const s = out[i];
      if (s.oneway) { if (!(oneway && vy > 0 && b.bottom - vy <= s.y + 1)) continue; }
      return s;
    }
    return null;
  }
  solidat(x, y) { const b = space.tmpbox.set(x, y, 0.001, 0.001); return !!this.boxhits(b, false, 0); }
  hitsat(x, y, w, h) { return !!this.boxhits(space.tmpbox.set(x, y, w, h), false, 0); }
  overlaps(b, filter, out) {
    out = out || [];
    out.length = 0;
    const l = this.solids(b, temp);
    for (let i = 0; i < l.length; i++) if (!filter || filter(l[i])) out.push(l[i]);
    l.length = 0;
    return out;
  }
  ray(x1, y1, x2, y2, opts) {
    const o = opts || {};
    const maxlen = o.max === undefined ? 4096 : o.max;
    let dx = x2 - x1, dy = y2 - y1;
    const len = hypot(dx, dy);
    if (len < 1e-6) return null;
    if (len > maxlen) { dx = (dx / len) * maxlen; dy = (dy / len) * maxlen; }
    const steps = ceil(hypot(dx, dy) / (o.prec || 2));
    const sx = dx / steps, sy = dy / steps;
    let px = x1, py = y1;
    for (let i = 0; i < steps; i++) {
      px += sx;
      py += sy;
      const hit = this.pointat(px, py, o);
      if (hit) { hit.dist = dist(x1, y1, px, py); return hit; }
      if (o.stop && o.stop(px, py)) return null;
    }
    return null;
  }
  pointat(x, y, o) {
    const opt = o || {};
    const b = space.tmpbox.set(x, y, 0.01, 0.01);
    const l = this.solids(b, temp);
    for (let i = 0; i < l.length; i++) {
      const s = l[i];
      if (s.oneway && !opt.oneway) continue;
      if (opt.ignore && opt.ignore(s)) continue;
      return { x, y, what: s, nx: 0, ny: 0, node: s.node || null, tag: s.tag || '' };
    }
    return null;
  }
  sweep(b, dx, dy, opts) {
    const o = opts || {};
    const list = this.solids(new box(b.x + min(0, dx), b.y + min(0, dy), b.w + abs(dx), b.h + abs(dy)), []);
    let best = 1, hit = null, nx = 0, ny = 0;
    for (let i = 0; i < list.length; i++) {
      const s = list[i];
      if (s.oneway && !o.oneway) continue;
      if (o.ignore && o.ignore(s)) continue;
      let t0 = 0, t1 = 1;
      let ok = true;
      const ax = [b.x, b.y], aw = [b.w, b.h], as = [s.x, s.y], al = [s.w, s.h], ad = [dx, dy];
      for (let a = 0; a < 2 && ok; a++) {
        if (abs(ad[a]) < 1e-9) { if (ax[a] + aw[a] <= as[a] || ax[a] >= as[a] + al[a]) ok = false; }
        else {
          let n0 = (as[a] - (ax[a] + aw[a])) / ad[a];
          let n1 = (as[a] + al[a] - ax[a]) / ad[a];
          if (n0 > n1) { const q = n0; n0 = n1; n1 = q; }
          t0 = max(t0, n0);
          t1 = min(t1, n1);
          if (t0 > t1) ok = false;
        }
      }
      if (ok && t0 < best) { best = t0; hit = s; }
    }
    if (!hit) return null;
    const hx = b.x + dx * best, hy = b.y + dy * best;
    if (abs(dx) > abs(dy)) nx = sign(dx) * -1, ny = 0; else nx = 0, ny = sign(dy) * -1;
    return { x: hx, y: hy, t: best, what: hit, node: hit.node || null, tag: hit.tag || '', nx, ny, dist: hypot(dx * best, dy * best) };
  }
  step(dt) {
    this.time += dt;
    this.count++;
    for (let i = 0; i < this.lifts.length; i++) this.lifts[i].drift(dt);
    for (let i = 0; i < this.actors.length; i++) if (!this.actors[i].live) this.actors.splice(i, 1), i--;
    for (let i = 0; i < this.zones.length; i++) this.zones[i].watch(dt, this);
    this.clock.step(dt);
    return this;
  }
  query(b) { return this.overlaps(b, null, []); }
  shapesat(x, y, w, h, cls) { return this.overlaps(space.tmpbox.set(x, y, w, h), null, []).filter((s) => !cls || s.node instanceof cls); }
  spawn(n, scene) { if (scene) scene.add(n); this.add(n); return n; }
  static tmpbox = new box();
}

class block extends node {
  constructor(x = 0, y = 0, w = 16, h = 16, opts) {
    super(x, y, w, h);
    const o = opts || {};
    this.on = true;
    this.sturdy = o.sturdy !== false;
    this.oneway = !!o.oneway;
    this.slope = o.slope || 0;
    this.ink = o.ink === undefined ? '#4b5568' : paint.of(o.ink);
    this.line = o.line || null;
    this.strokeo = o.stroke === undefined ? 1 : o.stroke;
    this.art = o.art ? art.of(o.art) : null;
    this.nine = !!o.nine;
    this.hidden = !!o.hidden;
    this.ax = 0;
    this.ay = 0;
    this.tag = o.tag || 'block';
  }
  paint(p) {
    if (this.hidden) return this;
    if (!this.art) {
      if (p.cull(this)) return this;
      p.begin(this);
      p.rect(0, 0, this.w, this.h, { fill: this.ink, stroke: this.line, linew: this.strokeo, radius: this.radius || 0 });
      return this;
    }
    p.begin(this);
    p.blit(this.art, 0, 0, this.art.w, this.art.h, 0, 0, this.w, this.h, this);
    return this;
  }
}

class lift extends block {
  constructor(x = 0, y = 0, w = 32, h = 8, opts) {
    super(x, y, w, h, opts);
    const o = opts || {};
    this.vx = 0;
    this.vy = 0;
    this.dx = 0;
    this.dy = 0;
    this.back = false;
    this.travel = o.travel || 0;
    this.udir = { x: o.dx || 0, y: o.dy || 0 };
    this.speed = o.speed || 40;
    this.wait = 0;
    this.pause = o.pause === undefined ? 0.6 : o.pause;
    this.timer = 0;
    this.homex = x;
    this.homey = y;
    this.riders = [];
    this.tag = o.tag || 'lift';
    this.grav = o.gravity ? o.gravity : 0;
  }
  drift(dt) {
    const px = this.x, py = this.y;
    if (this.wait > 0) this.wait -= dt;
    else if (this.udir.x || this.udir.y) {
      this.x += this.udir.x * this.speed * dt;
      this.y += this.udir.y * this.speed * dt;
      if (this.travel > 0 && dist(this.homex, this.homey, this.x, this.y) >= this.travel) {
        this.udir.x = -this.udir.x;
        this.udir.y = -this.udir.y;
        this.wait = this.pause;
      }
    } else if (this.vx || this.vy) {
      if (this.grav) this.vy += this.grav * dt;
      this.x += this.vx * dt;
      this.y += this.vy * dt;
    }
    this.dx = this.x - px;
    this.dy = this.y - py;
    return this;
  }
  go(dx, dy, speed) { this.udir.x = dx; this.udir.y = dy; if (speed) this.speed = speed; this.travel = 0; return this; }
  patrol(dirx, diry, dist2, speed) { this.udir.x = dirx; this.udir.y = diry; this.travel = dist2; this.speed = speed || this.speed; return this; }
  carry(r) { if (this.dx) r.ox += this.dx; if (this.dy) r.oy += this.dy; return this; }
}

class zone extends node {
  constructor(x = 0, y = 0, w = 32, h = 32, opts) {
    super(x, y, w, h);
    const o = opts || {};
    this.tag = o.tag || 'zone';
    this.inside = [];
    this.once = !!o.once;
    this.done = false;
    this.need = o.need || null;
    this.who = o.who || null;
    this.enter = o.enter || null;
    this.exit = o.exit || null;
    this.stay = o.stay || null;
    this.on = o.on !== false;
    this.space = null;
    this.debug = !!o.debug;
    this.ink = paint.of(o.ink === undefined ? '#5fd0a8' : o.ink);
    this.delay = o.delay || 0;
    this.armed = 0;
  }
  watch(dt, sp) {
    if (!this.on || (this.once && this.done)) return this;
    const b = this.bounds;
    for (let i = this.inside.length - 1; i >= 0; i--) {
      const a = this.inside[i];
      if (!a.live || !a.bounds.hits(b)) { this.inside.splice(i, 1); if (this.exit) this.exit(a, this); sp.fire('zoneexit', this, a); }
    }
    if (this.armed > 0) { this.armed -= dt; return this; }
    for (let i = 0; i < sp.actors.length; i++) {
      const a = sp.actors[i];
      if (!a.live || (this.who && !(a instanceof this.who))) continue;
      if (this.inside.indexOf(a) >= 0) { if (this.stay) this.stay(a, dt, this); continue; }
      if (a.bounds.hits(b) && (!this.need || this.need(a))) {
        this.inside.push(a);
        if (this.enter) this.enter(a, this);
        sp.fire('zoneenter', this, a);
        if (this.once) { this.done = true; break; }
      }
    }
    return this;
  }
  paint(p) {
    if (!this.debug) return this;
    p.begin(this);
    p.rect(0, 0, this.w, this.h, { fill: paint.alpha(this.ink, 0.16), stroke: paint.alpha(this.ink, 0.7), linew: 1 });
    return this;
  }
}

class rig {
  constructor(owner) {
    this.o = owner;
    this.space = null;
    this.w = 8;
    this.h = 8;
    this.maxstep = 1;
    this.ox = 0;
    this.oy = 0;
    this.vx = 0;
    this.vy = 0;
    this.maxx = 96;
    this.maxy = 420;
    this.accx = 700;
    this.accg = 1;
    this.frix = 0.86;
    this.air = 0.995;
    this.grav = 1;
    this.onground = false;
    this.wasground = false;
    this.onwall = 0;
    this.onceil = false;
    this.leftwall = false;
    this.rightwall = false;
    this.groundtime = 0;
    this.airtime = 0;
    this.onewaydrop = 0;
    this.slopes = true;
    this.stepup = 0;
    this.ride = null;
    this.lastsolid = null;
    this.hitx = false;
    this.hity = false;
    this.squish = false;
    this.list = [];
    this.recs = [];
    this.n = 0;
    this.frozen = 0;
    this.bounce = 0;
    this.turnboost = 1.5;
    this.arena = null;
  }
  box(out) { return (out || this.rbox || (this.rbox = new box())).set(this.o.x + this.ox, this.o.y + this.oy, this.w, this.h); }
  get gx() { return this.o.x + this.ox; }
  get gy() { return this.o.y + this.oy; }
  get onwallany() { return this.leftwall || this.rightwall; }
  get speed() { return hypot(this.vx, this.vy); }
  place(x, y) { this.o.x = x - this.ox; this.o.y = y - this.oy; return this; }
  size(w, h) { this.w = w; this.h = h; return this; }
  offset(ox, oy) { this.ox = ox; this.oy = oy; return this; }
  clear() { this.n = 0; return this; }
  push(x, y, w, h, oneway, slope, node2) {
    let r = this.recs[this.n];
    if (!r) r = this.recs[this.n] = new rec();
    r.x = x; r.y = y; r.w = w; r.h = h; r.oneway = !!oneway; r.slope = slope || 0; r.node = node2 || null;
    this.list[this.n] = r;
    this.n++;
    return r;
  }
  gather(b) {
    this.clear();
    if (!this.space) return this;
    const sp = this.space;
    sp.rects(this, b, (x, y, w, h, oneway, slope, node2) => { this.push(x, y, w, h, oneway, slope, node2); });
    return this;
  }
  test(b, oneway, vy) {
    for (let i = 0; i < this.n; i++) {
      const s = this.list[i];
      if (!b.hits(s)) continue;
      if (s.oneway) {
        if (!oneway) continue;
        if (vy <= 0) continue;
        const prev = b.y + b.h - vy;
        if (prev > s.y + 1) continue;
        if (vy > s.h + 1) continue;
      }
      return s;
    }
    return null;
  }
  testpoint(x, y) {
    for (let i = 0; i < this.n; i++) { const s = this.list[i]; if (x >= s.x && x < s.right && y >= s.y && y < s.bottom) return s; }
    return null;
  }
  solid(x, y, w = 1, h = 1) {
    const b = rig.tmp.set(x, y, w, h);
    this.gather(b);
    return !!this.test(b, false, 0);
  }
  hitat(x, y) { return this.solid(x, y, 0.001, 0.001); }
  movex(dx, opts) {
    const o = opts || {};
    const oneway = o.oneway === undefined ? this.onewayok : o.oneway;
    this.hitx = false;
    this.leftwall = false;
    this.rightwall = false;
    const b = this.box();
    if (abs(dx) > 1e-9) {
      const sgn = dx < 0 ? -1 : 1;
      this.gather(rig.tmp.set(b.x + min(0, dx) - 1, b.y - 1, b.w + abs(dx) + 2, b.h + 2));
      let left = abs(dx);
      let guard = 0;
      while (left > 1e-9 && guard++ < 65536) {
        const stepx = min(this.maxstep, left);
        const nb = rig.tmp.set(b.x + sgn * stepx, b.y, b.w, b.h);
        const s = this.test(nb, oneway, 0);
        if (s) {
          const push = sgn > 0 ? s.x - (b.x + b.w) : s.right - b.x;
          b.x += push;
          left = 0;
          this.hitx = true;
          if (sgn > 0) this.rightwall = true; else this.leftwall = true;
          this.onwall = sgn;
          this.lastsolid = s;
          if (s.node && s.node.carry) this.ride = s.node;
          break;
        }
        b.x += sgn * stepx;
        left -= stepx;
      }
    }
    if (this.slopes && this.onground) {
      const up = this.slopeup(b);
      if (abs(up) > 0.01) b.y += up;
    }
    this.sync(b);
    return b.x;
  }
  movey(dy, opts) {
    const o = opts || {};
    const oneway = o.oneway === undefined ? this.onewayok : o.oneway;
    this.hity = false;
    this.onceil = false;
    const wasg = this.onground;
    this.onground = false;
    const b = this.box();
    if (abs(dy) < 1e-9) {
      const sp = rig.tmp.set(b.x + 0.25, b.y + b.h, b.w - 0.5, 1);
      this.gather(sp);
      const s0 = this.test(sp, oneway, 1);
      if (s0) { this.onground = true; this.lastsolid = s0; }
      if (this.slopes) { const dn = this.slopedown(b); if (dn > 0.01) b.y += dn; }
      this.sync(b);
      this.settle(wasg);
      return b.y;
    }
    const sgn = dy < 0 ? -1 : 1;
    this.gather(rig.tmp.set(b.x - 1, b.y + min(0, dy) - 1, b.w + 2, b.h + abs(dy) + 2));
    let left = abs(dy);
    let guard = 0;
    let ground = null;
    while (left > 1e-9 && guard++ < 65536) {
      const py = min(this.maxstep, left) * sgn;
      const nb = rig.tmp.set(b.x, b.y + py, b.w, b.h);
      const s = this.test(nb, oneway, py);
      if (s) {
        const push = sgn > 0 ? s.y - (b.y + b.h) : s.bottom - b.y;
        b.y += push;
        if (sgn > 0) ground = s; else this.onceil = true;
        this.hity = true;
        left = 0;
        break;
      }
      b.y += py;
      left -= abs(py);
    }
    if (ground) {
      this.onground = true;
      this.lastsolid = ground;
      if (ground.node && ground.node.carry) this.ride = ground.node;
      if (this.vy > 0) this.vy = 0;
    }
    if (this.slopes && sgn > 0) {
      if (!this.onground) {
        const probe = rig.tmp.set(b.x + 1, b.y + b.h, b.w - 2, 2);
        this.gather(probe);
        const s2 = this.test(probe, oneway, 2);
        if (s2) { this.onground = true; this.lastsolid = s2; }
      }
      if (this.onground) { const dn = this.slopedown(b); if (dn > 0.01) b.y += dn; }
    }
    this.sync(b);
    this.settle(wasg);
    return b.y;
  }
  settle(wasg) {
    this.justlanded = this.onground && !wasg;
    this.justleft = !this.onground && wasg;
    this.wasground = wasg;
    this.groundtime = this.onground ? this.groundtime : 0;
    this.airtime = this.onground ? 0 : this.airtime;
    return this;
  }
  sync(b) { this.o.x = b.x - this.ox; this.o.y = b.y - this.oy; return this; }
  slopeup(b) {
    if (!this.space || !this.space.maps.length) return 0;
    const y = b.y + b.h - 0.5;
    for (let i = 0; i < this.space.maps.length; i++) {
      const sl = this.space.maps[i].slopeat(b.cx, y);
      if (!sl) continue;
      const want = sl.surf(b.cx) - b.h;
      const d = want - b.y;
      if (d < 0 && d >= -(this.stepup + 2)) return d;
    }
    return 0;
  }
  slopedown(b) {
    if (!this.space || !this.space.maps.length) return 0;
    const x = b.cx;
    const y = b.y + b.h + 1;
    for (let i = 0; i < this.space.maps.length; i++) {
      const sl = this.space.maps[i].slopeat(x, y);
      if (!sl) continue;
      const want = sl.surf(x) - b.h;
      const d = want - b.y;
      if (d > 0 && d <= this.stepup + 3) return d;
    }
    return 0;
  }
  apply(dt, opts) {
    const o = opts || {};
    if (this.frozen > 0) { this.frozen -= dt; return this; }
    const g = this.space ? this.space.gravity : { x: 0, y: 900 };
    const gs = o.grav === undefined ? this.grav : o.grav;
    if (o.gravity !== false && !this.onground) this.vy += g.y * gs * dt;
    if (o.drag !== false) {
      const retain = this.onground ? this.frix : this.air;
      this.vx *= pow(clamp01(retain), dt * 60);
    }
    if (o.clamp !== false) {
      this.vy = clamp(this.vy, -this.maxy, this.maxy);
      this.vx = clamp(this.vx, -this.maxx, this.maxx);
    }
    if (o.integrate === false) return this;
    if (this.onewaydrop > 0) { this.onewaydrop -= dt; this.onewayok = false; } else this.onewayok = true;
    const accx = (o.addx || 0) + this.vx * dt;
    const accy = (o.addy || 0) + this.vy * dt;
    const wasg = this.onground;
    this.movex(accx, o);
    this.applyride();
    this.movey(accy, o);
    this.settle(wasg);
    return this;
  }
  applyride() {
    const r = this.ride;
    if (!r || !this.onground) return this;
    if (r.dx || r.dy) { this.o.x += r.dx; this.o.y += r.dy; }
    return this;
  }
  fling(vx, vy) { this.vx = vx; this.vy = vy; return this; }
  stopx() { this.vx = 0; return this; }
  stopy() { this.vy = 0; return this; }
  dropthrough(sec = 0.16) { this.onewaydrop = sec; this.onewayok = false; return this; }
  wallcheck(dir) {
    const b = this.box();
    const probe = rig.tmp.set(dir > 0 ? b.x + b.w + 1 : b.x - 2, b.y + 1, 2, b.h - 2);
    this.gather(probe);
    return this.test(probe, false, 0);
  }
  groundcheck() {
    const b = this.box();
    const probe = rig.tmp.set(b.x + 1, b.y + b.h + 1, b.w - 2, 2);
    this.gather(probe);
    return this.test(probe, this.onewayok, 1);
  }
  ceilcheck() {
    const b = this.box();
    const probe = rig.tmp.set(b.x + 1, b.y - 2, b.w - 2, 2);
    this.gather(probe);
    return this.test(probe, false, 0);
  }
  freecorner(dir) {
    const b = this.box();
    const probe = rig.tmp.set(b.x + dir * 2, b.y - 1, b.w, b.h + 1);
    this.gather(probe);
    return !this.test(probe, false, 0);
  }
  raycone(ang, n, spread, len) {
    const out = [];
    const cx = this.o.x + this.ox + this.w / 2, cy = this.o.y + this.oy + this.h / 2;
    for (let i = 0; i < n; i++) {
      const a = ang + (n > 1 ? (i / (n - 1) - 0.5) * spread : 0);
      const hx = cx + cos(a) * len;
      const hy = cy + sin(a) * len;
      const h2 = this.space ? this.space.ray(cx, cy, hx, hy, { max: len }) : null;
      out.push(h2 || { x: hx, y: hy, what: null, dist: len, hit: false });
    }
    return out;
  }
  static tmp = new box();
}
const good = 'good';
const bad = 'bad';

class ghost extends sprite {
  constructor(a, x, y, opts) {
    super(a, x, y);
    const o = opts || {};
    this.ax = 0.5;
    this.ay = 0.5;
    this.life = o.life || 0.24;
    this.t = 0;
    this.alpha = o.alpha === undefined ? 0.5 : o.alpha;
    this.tint = o.tint || null;
    this.blend = o.blend || 'source-over';
    this.rise = o.rise || 0;
  }
  step(dt) {
    this.t += dt;
    this.alpha = 0.5 * (1 - this.t / this.life);
    this.y += this.rise * dt;
    if (this.t >= this.life) this.kill();
    return this;
  }
}

class hero extends node {
  constructor(x = 0, y = 0, opts = {}) {
    super(x, y, 0, 0);
    const o = opts || {};
    this.rig = new rig(this);
    this.rig.size(o.w || 10, o.h || 16);
    this.w = this.rig.w;
    this.h = this.rig.h;
    this.team = good;
    this.tag = o.tag || 'hero';
    this.runspeed = o.runspeed === undefined ? 148 : o.runspeed;
    this.walkspeed = o.walkspeed === undefined ? 74 : o.walkspeed;
    this.runpush = o.runpush === undefined ? 900 : o.runpush;
    this.airpush = o.airpush === undefined ? 620 : o.airpush;
    this.fric = o.fric === undefined ? 700 : o.fric;
    this.airfric = o.airfric === undefined ? 190 : o.airfric;
    this.turnboost = o.turnboost === undefined ? 1.9 : o.turnboost;
    this.grav = o.grav === undefined ? 1250 : o.grav;
    this.maxfall = o.maxfall === undefined ? 430 : o.maxfall;
    this.fastfall = o.fastfall === undefined ? 620 : o.fastfall;
    this.jumpvel = o.jumpvel === undefined ? 380 : o.jumpvel;
    this.cutjump = o.cutjump === undefined ? 0.42 : o.cutjump;
    this.holdjump = o.holdjump === undefined ? 0.55 : o.holdjump;
    this.jumps = o.jumps === undefined ? 1 : o.jumps;
    this.jumpleft = this.jumps;
    this.coyote = o.coyote === undefined ? 0.09 : o.coyote;
    this.coyotetime = 0;
    this.bufsec = o.bufsec === undefined ? 0.12 : o.bufsec;
    this.bufleft = 0;
    this.cornerfix = o.cornerfix === undefined ? 4 : o.cornerfix;
    this.wallslide = o.wallslide !== false;
    this.slidespeed = o.slidespeed === undefined ? 70 : o.slidespeed;
    this.walljumpx = o.walljumpx === undefined ? 190 : o.walljumpx;
    this.walljumpy = o.walljumpy === undefined ? 340 : o.walljumpy;
    this.walljumpsec = o.walljumpsec === undefined ? 0.14 : o.walljumpsec;
    this.walljumpdone = 0;
    this.wallgrab = !!o.wallgrab;
    this.grabsec = o.grabsec === undefined ? 0.9 : o.grabsec;
    this.grabstamina = this.grabsec;
    this.dashspeed = o.dashspeed === undefined ? 460 : o.dashspeed;
    this.dashsec = o.dashsec === undefined ? 0.16 : o.dashsec;
    this.dashes = o.dashes === undefined ? 1 : o.dashes;
    this.dashleft = this.dashes;
    this.dashcool = o.dashcool === undefined ? 0.18 : o.dashcool;
    this.dashcoolleft = 0;
    this.dashgrace = o.dashgrace === undefined ? 0.12 : o.dashgrace;
    this.dashghost = o.dashghost !== false;
    this.dashdamage = o.dashdamage || 0;
    this.health = o.health === undefined ? 3 : o.health;
    this.maxhealth = o.maxhealth === undefined ? this.health : o.maxhealth;
    this.iframes = 0;
    this.hurtsec = o.hurtsec === undefined ? 0.9 : o.hurtsec;
    this.hurtknock = o.hurtknock === undefined ? 210 : o.hurtknock;
    this.hurtup = o.hurtup === undefined ? 190 : o.hurtup;
    this.attackdamage = o.attackdamage === undefined ? 1 : o.attackdamage;
    this.attacksec = o.attacksec === undefined ? 0.26 : o.attacksec;
    this.attackwind = o.attackwind === undefined ? 0.06 : o.attackwind;
    this.attackbox = o.attackbox || { x: 6, y: -2, w: 16, h: 14 };
    this.attackcool = o.attackcool === undefined ? 0.34 : o.attackcool;
    this.atkleft = 0;
    this.combo = 0;
    this.combotime = 0;
    this.pogo = o.pogo !== false;
    this.firecool = o.firecool === undefined ? 0.3 : o.firecool;
    this.fireleft = 0;
    this.dead = false;
    this.deadsec = 0;
    this.face = 1;
    this.spawnpoint = { x, y };
    this.acts = { left: 'left', right: 'right', up: 'up', down: 'down', jump: 'jump', dash: 'dash', attack: 'attack', grab: 'grab', fire: 'fire', run: 'run' };
    this.wants = { x: 0, y: 0, jump: false, jumpheld: false, jumpout: false, dash: false, dashout: false, attack: false, attackout: false, grab: false, fire: false, run: false };
    this.brain = null;
    this.input = null;
    this.mind = new machine(this);
    this.bus = new bus();
    this.slash = null;
    this.ghostclk = 0;
    this.skid = 0;
    this.turn = 0;
    this.anims = { idle: 'idle', run: 'run', jump: 'jump', fall: 'fall', wall: 'wall', dash: 'dash', attack: 'attack', hurt: 'hurt', dead: 'dead', land: 'land', skid: 'skid', grab: 'grab', rise: 'rise' };
    this.skin = null;
    this.art = o.art ? art.of(o.art) : null;
    if (this.art) this.setskin(this.art);
    this.spawn(x, y);
    this.pick(o);
    this.states();
  }
  pick(o) {
    for (const k in o) if (this[k] === undefined) this[k] = o[k];
    if (o.health !== undefined) { this.health = o.health; this.maxhealth = o.maxhealth === undefined ? o.health : o.maxhealth; }
    return this;
  }
  setskin(a) {
    this.art = art.of(a);
    this.skin = new sprite(this.art, 0, 0);
    this.skin.ax = 0.5;
    this.skin.ay = 1;
    this.skin.vis = true;
    this.skin.lock = true;
    this.skin.w = this.art.w;
    this.skin.h = this.art.h;
    this.add(this.skin);
    this.spot();
    return this;
  }
  spot() {
    if (!this.skin) return this;
    this.skin.x = this.rig.ox + this.w / 2;
    this.skin.y = this.rig.oy + this.h;
    return this;
  }
  on(k, f) { this.bus.on(k, f); return this; }
  signal(k, a, b, c) { return this.bus.fire(k, a, b, c); }
  spawn(x, y) {
    this.rig.place(x, y);
    this.spawnpoint = { x, y };
    return this;
  }
  respawn() {
    this.spawn(this.spawnpoint.x, this.spawnpoint.y);
    this.rig.fling(0, 0);
    this.health = this.maxhealth;
    this.dead = false;
    this.iframes = 1.2;
    this.jumpleft = this.jumps;
    this.dashleft = this.dashes;
    this.mind.go('air');
    this.signal('respawn', this);
    return this;
  }
  states() {
    const M = this.mind;
    M.state('ground', {
      enter: (o) => { o.jumpleft = o.jumps; o.dashleft = o.dashes; if (o.bouncefix) { } },
      step: (o, dt) => {
        o.stride(dt);
        o.airborne(dt);
        if (!o.rig.onground) { o.mind.go('air'); return; }
        if (o.wants.attackout && o.atkleft <= 0) { o.mind.go('attack'); return; }
        if (o.wants.dashout && o.dashleft > 0 && o.dashcoolleft <= 0) { o.mind.go('dash'); return; }
        if (o.wants.jumpout && (o.bufleft > 0 || o.coyotetime > 0)) { o.mind.go('air'); o.jumpnow(1); return; }
      }
    });
    M.state('air', {
      step: (o, dt) => {
        o.stride(dt);
        o.slide(dt);
        o.airborne(dt);
        if (o.wants.attackout && o.atkleft <= 0) { o.mind.go('attack'); return; }
        if (o.wants.dashout && o.dashleft > 0 && o.dashcoolleft <= 0) { o.mind.go('dash'); return; }
        const rig2 = o.rig;
        if (o.wants.jumpout) {
          if (rig2.onwall && !rig2.onground) { o.walljump(rig2.onwall); return; }
          if (o.jumpleft > 0) { o.jumpnow(1); return; }
          if (o.coyotetime > 0) { o.jumpnow(1); return; }
        }
        if (o.wants.grab && o.wallgrab && rig2.onwall && rig2.vy > -60 && o.grabstamina > 0) { o.mind.go('grab'); return; }
        if (rig2.onground && rig2.vy >= 0 && !rig2.justlanded && o.coyotetime <= 0) { o.mind.go('ground'); return; }
        if (rig2.justlanded) { o.mind.go('ground'); o.landed(abs(o.fallvy || 0)); return; }
      }
    });
    M.state('grab', {
      step: (o, dt) => {
        const rig2 = o.rig;
        rig2.vx = 0;
        rig2.vy = 0;
        o.grabstamina -= dt;
        const dir = rig2.onwall || o.face;
        if (!rig2.onwall) { o.mind.go('air'); return; }
        rig2.movey(0, { oneway: false });
        if (o.grabstamina <= 0) { o.mind.go('air'); return; }
        if (o.wants.jumpout) { o.mind.go('air'); o.walljump(dir); return; }
        if (!o.wants.grab) { o.mind.go('air'); return; }
        if (o.wants.attackout && o.atkleft <= 0) { o.mind.go('attack'); return; }
      },
      exit: (o) => { if (o.rig.onground) o.grabstamina = o.grabsec; }
    });
    M.state('dash', {
      enter: (o) => {
        const dy = o.wants.y;
        const dx = o.wants.x !== 0 ? sign(o.wants.x) : o.face;
        o.dashdir = { x: dy !== 0 ? 0 : dx, y: dy !== 0 ? sign(dy) : 0 };
        if (dy === 0 && o.wants.x === 0) o.dashdir = { x: o.face, y: 0 };
        o.dashleft--;
        o.dashcoolleft = o.dashcool + o.dashsec;
        o.rig.vx = o.dashdir.x * o.dashspeed;
        o.rig.vy = o.dashdir.y * o.dashspeed;
        o.ghostclk = 0;
        o.iframes = max(o.iframes, 0.12);
        o.dasht = 0;
        if (o.dashdir.x) o.face = o.dashdir.x;
        o.play('dash', true);
        o.signal('dash', o, o.dashdir);
        if (o.scene) o.scene.fx.burst(o.wx + o.w / 2, o.wy + o.h / 2, { count: 8, ink: '#7ff2ff', spd: 90, life: 0.25, size: 3 });
      },
      step: (o, dt) => {
        o.dasht += dt;
        o.rig.vx = o.dashdir.x * o.dashspeed;
        o.rig.vy = o.dashdir.y * o.dashspeed;
        o.rig.movex(o.rig.vx * dt);
        o.rig.movey(o.rig.vy * dt);
        if (o.dashcoolleft > 0) o.dashcoolleft -= dt;
        if (o.atkleft > 0) o.atkleft -= dt;
        if (o.combotime > 0) o.combotime -= dt;
        if (o.iframes > 0) o.iframes -= dt;
        if (o.dashghost) { o.ghostclk -= dt; if (o.ghostclk <= 0) { o.ghostclk = 0.03; o.afterimage(); } }
        if (o.dasht >= o.dashsec) { o.rig.vx *= o.dashdir.x ? 0.45 : 0.9; o.rig.vy = o.dashdir.y ? o.rig.vy * 0.3 : o.rig.vy; o.mind.go(o.rig.onground ? 'ground' : 'air'); return; }
        if (o.dashdamage > 0) o.dashhits();
      }
    });
    M.state('attack', {
      enter: (o) => {
        o.attackt = 0;
        o.atkleft = o.attackcool;
        o.combo = (o.combotime > 0 ? o.combo + 1 : 0) % 3;
        o.combotime = 0.55;
        o.play('attack', true);
        o.signal('attack', o, o.combo);
      },
      step: (o, dt) => {
        o.attackt += dt;
        if (!o.attackdone && o.attackt >= o.attackwind) { o.attackdone = true; o.slashnow(); }
        o.rig.vx *= pow(0.001, dt);
        o.airborne(dt);
        if (o.attackt >= o.attacksec) { o.attackdone = false; o.mind.go(o.rig.onground ? 'ground' : 'air'); }
      },
      exit: (o) => { o.attackdone = false; }
    });
    M.state('hurt', {
      enter: (o, from) => {
        o.hurtt = 0;
        if (o.hurtdir) { o.rig.fling(o.hurtdir.x * o.hurtknock, o.hurtdir.y * o.hurtup); o.hurtdir = null; }
        o.play('hurt', true);
      },
      step: (o, dt) => {
        o.hurtt += dt;
        o.airborne(dt, { control: false });
        if (o.hurtt >= o.hurtsec) o.mind.go(o.rig.onground ? 'ground' : 'air');
      }
    });
    M.state('dead', {
      enter: (o) => { o.deadsec = 0; o.play('dead', true); o.signal('die', o); },
      step: (o, dt) => {
        o.deadsec += dt;
        o.rig.vy = min(o.rig.vy + o.grav * dt, o.maxfall);
        o.rig.movex(o.rig.vx * dt);
        o.rig.movey(o.rig.vy * dt);
        o.rig.vx *= pow(0.02, dt);
      }
    });
    M.go('air');
    return this;
  }
  play(name, restart) {
    if (!this.skin || !this.art || !this.art.clips[this.anims[name] || name]) return this;
    this.skin.play(this.anims[name] || name, restart);
    return this;
  }
  anim() {
    if (!this.skin) return this;
    const rig2 = this.rig;
    const st = this.mind.cur;
    let name = 'idle';
    if (this.dead) name = 'dead';
    else if (st === 'attack') name = 'attack';
    else if (st === 'dash') name = 'dash';
    else if (st === 'hurt') name = 'hurt';
    else if (st === 'grab') name = 'grab';
    else if (!rig2.onground) name = rig2.onwall && rig2.vy > 0 && abs(this.wants.x) > 0.1 ? 'wall' : rig2.vy < -10 ? 'jump' : 'fall';
    else if (abs(this.wants.x) > 0.1) name = this.skid > 0 ? 'skid' : 'run';
    const clip = this.anims[name] || name;
    if (this.art.clips[clip]) this.skin.play(clip);
    this.skin.flipx = this.face < 0;
    return this;
  }
  pull() {
    const w = this.wants;
    w.jumpout = false;
    w.dashout = false;
    w.attackout = false;
    if (this.brain) { this.brain(this, w); return this; }
    const i = this.input;
    if (!i) { w.x = 0; w.jump = false; w.jumpheld = false; w.dash = false; w.attack = false; return this; }
    const a = this.acts;
    w.x = i.walkx(a.left, a.right);
    w.y = i.walky(a.up, a.down);
    w.jumpheld = w.jump;
    w.jump = i.act(a.jump);
    if (w.jump && !w.jumpheld) w.jumpout = true;
    const d = i.act(a.dash);
    if (d && !w.dash) w.dashout = true;
    w.dash = d;
    const at = i.act(a.attack);
    if (at && !w.attack) w.attackout = true;
    w.attack = at;
    w.grab = i.act(a.grab);
    w.fire = i.act(a.fire);
    w.run = true;
    return this;
  }
  stride(dt) {
    const w = this.wants;
    const rig2 = this.rig;
    let target = w.x * (w.run ? this.runspeed : this.walkspeed);
    if (this.mind.at('attack')) target *= 0.35;
    const accel = abs(target) > 0.01 ? (rig2.onground ? this.runpush : this.airpush) : (rig2.onground ? this.fric : this.airfric);
    const boost = rig2.onground && sign(target) !== sign(rig2.vx) && abs(rig2.vx) > 20 ? this.turnboost : 1;
    rig2.vx = move(rig2.vx, target, accel * boost, dt);
    this.skid = rig2.onground && sign(target) !== sign(rig2.vx) && abs(rig2.vx) > 40 ? 1 : 0;
    if (w.x !== 0) this.face = sign(w.x);
    return this;
  }
  slide(dt) {
    const rig2 = this.rig;
    if (!this.wallslide) return this;
    const wall = rig2.onwall;
    if (!wall || rig2.onground) return this;
    if (sign(this.wants.x) !== wall) return this;
    if (this.walljumpdone > 0) return this;
    if (rig2.vy > this.slidespeed) rig2.vy = this.slidespeed;
    return this;
  }
  airborne(dt, opts) {
    const o = opts || {};
    const rig2 = this.rig;
    if (o.control !== false) { }
    const gs = this.wants.jumpheld && rig2.vy < 0 ? this.grav * this.holdjump : this.grav;
    rig2.vy = min(rig2.vy + gs * dt, this.maxfall);
    if (this.wallslide && rig2.onwall && !rig2.onground && this.walljumpdone <= 0 && sign(this.wants.x) === rig2.onwall && rig2.vy > this.slidespeed) rig2.vy = this.slidespeed;
    if (!this.wants.jumpheld && rig2.vy < 0) rig2.vy *= pow(this.cutjump + 0.001, dt * 12);
    if (this.walljumpdone > 0) this.walljumpdone -= dt;
    if (this.coyotetime > 0) this.coyotetime -= dt;
    if (this.bufleft > 0) this.bufleft -= dt;
    if (this.dashcoolleft > 0) this.dashcoolleft -= dt;
    if (this.atkleft > 0) this.atkleft -= dt;
    if (this.fireleft > 0) this.fireleft -= dt;
    if (this.combotime > 0) this.combotime -= dt;
    if (this.iframes > 0) this.iframes -= dt;
    this.fallvy = max(this.fallvy || 0, rig2.vy);
    if (rig2.onground) { this.fallvy = 0; this.coyotetime = this.coyote; if (this.grabstamina < this.grabsec) this.grabstamina = min(this.grabsec, this.grabstamina + dt * 0.6); }
    if (this.wants.jumpout) { if (rig2.onground || this.coyotetime > 0) this.jumpnow(1); else this.bufleft = this.bufsec; }
    if (this.wants.jumpout && this.wants.y > 0.4 && rig2.onground) { rig2.dropthrough(0.2); this.jumpleft = this.jumps; }
    this.carry();
    rig2.movex(rig2.vx * dt);
    rig2.movey(rig2.vy * dt);
    if (rig2.vy < -10) this.cornercorrect();
    return this;
  }
  carry() {
    const r = this.rig;
    if (!r.onground || !r.lastsolid) return this;
    const s = r.lastsolid;
    if (s.node && (s.node.dx || s.node.dy)) { this.x += s.node.dx || 0; this.y += s.node.dy || 0; }
    return this;
  }
  cornercorrect() {
    const rig2 = this.rig;
    const b = rig2.box();
    if (!rig2.onceil && !rig2.hitx) return this;
    const dirs = rig2.hitx ? [rig2.onwall || 1] : [1, -1];
    for (let d = 1; d <= this.cornerfix; d++) {
      for (let i = 0; i < dirs.length; i++) {
        const s = dirs[i];
        const probe = rig.tmp.set(b.x + s * d, b.y - 1, b.w, b.h);
        rig2.gather(probe);
        if (!rig2.test(probe, false, 0)) { this.x += s * d; return this; }
      }
    }
    return this;
  }
  jumpnow(kind) {
    const rig2 = this.rig;
    rig2.vy = -this.jumpvel;
    this.jumpleft = max(0, this.jumpleft - (kind === 1 ? 1 : 0));
    this.coyotetime = 0;
    this.bufleft = 0;
    this.grabstamina = this.grabsec;
    this.play('jump', true);
    this.signal('jump', this, kind);
    if (kind === 2 && this.scene) this.scene.fx.ring(this.wx + this.w / 2, this.wy + this.h, { ink: '#bff7ff', size: 16, life: 0.3 });
    return this;
  }
  walljump(dir) {
    const rig2 = this.rig;
    rig2.vx = -dir * this.walljumpx;
    rig2.vy = -this.walljumpy;
    this.face = -dir;
    this.walljumpdone = this.walljumpsec;
    this.jumpleft = max(this.jumpleft, 1);
    this.grabstamina = this.grabsec;
    this.play('jump', true);
    this.signal('walljump', this, dir);
    if (this.scene) this.scene.fx.burst(this.wx + (dir > 0 ? this.w : 0), this.wy + this.h / 2, { count: 6, ink: '#dfe9ff', spd: 70, life: 0.22, size: 2 });
    return this;
  }
  landed(fromvy) {
    this.jumpleft = this.jumps;
    this.dashleft = this.dashes;
    this.play('land', true);
    this.signal('land', this, fromvy);
    if (fromvy > 340 && this.scene) this.scene.fx.burst(this.wx + this.w / 2, this.wy + this.h, { count: 8, ink: '#ffffff', spd: 60, life: 0.2, size: 2, dir: -pi / 2, spread: pi });
    return this;
  }
  afterimage() {
    if (!this.skin || !this.scene) return this;
    const g = new ghost(this.art, this.x + this.rig.ox + this.w / 2, this.y + this.rig.oy + this.h / 2, { life: 0.22, tint: '#8ef3ff' });
    g.rot = this.rot;
    g.frame = this.skin.frame;
    g.flipx = this.skin.flipx;
    g.w = this.skin.w;
    g.h = this.skin.h;
    g.z = this.z - 1;
    this.scene.spawn(g, this.dad || this.scene.layers.main);
    return this;
  }
  attackdir() {
    const w = this.wants;
    if (w.y < -0.4) return { x: 0, y: -1 };
    if (w.y > 0.4 && !this.rig.onground) return { x: 0, y: 1 };
    return { x: this.face, y: 0 };
  }
  slashnow() {
    const d = this.attackdir();
    const b = this.attackbox;
    const cx = this.rig.gx + this.w / 2;
    const cy = this.rig.gy + this.h / 2;
    let hx, hy;
    if (d.y !== 0) { hx = cx - b.w / 2; hy = cy + d.y * (this.h / 2 + b.h / 2) - b.h / 2; }
    else { hx = cx + d.x * (this.w / 2 + b.w / 2) - b.w / 2; hy = cy - b.h / 2 + b.y / 2; }
    const h = new hit(hx, hy, b.w, b.h, {
      damage: this.attackdamage,
      team: good,
      life: 0.1,
      knock: 220,
      src: this,
      tag: 'slash',
      onhit: (target, self) => {
        this.signal('hit', this, target);
        if (this.scene) this.scene.hitstop(0.045, 0.08);
        if (this.pogo && (d.y !== 0 || this.rig.vy > 0)) this.bounce(-this.jumpvel * 0.86);
      }
    });
    h.rot = 0;
    if (this.scene) this.scene.spawn(h, this.scene.layers.main);
    this.slash = h;
    return this;
  }
  bounce(vy, reset) {
    this.rig.vy = vy;
    if (reset !== false) { this.jumpleft = max(this.jumpleft, 0); this.dashleft = this.dashes; }
    this.play('jump', true);
    this.signal('bounce', this);
    return this;
  }
  dashhits() {
    if (!this.scene || !this.scene.space) return this;
    const l = this.scene.space.actors;
    for (let i = 0; i < l.length; i++) {
      const a2 = l[i];
      if (a2 === this || !a2.hurt || a2.team === this.team || a2.iframes > 0.5) continue;
      if (this.bounds.hits(a2.bounds)) { a2.hurt(this.dashdamage, this, a2.wx < this.wx ? -1 : 1); this.dashleft = 0; }
    }
    return this;
  }
  shoot(opts) {
    if (this.fireleft > 0 || !this.scene) return null;
    this.fireleft = this.firecool;
    const o = opts || {};
    const d = this.attackdir();
    const sh = new shot(this.rig.gx + this.w / 2 + d.x * 8, this.rig.gy + this.h / 2 + d.y * 8, {
      art: o.art, vx: d.x * (o.speed || 340), vy: d.y * (o.speed || 340), damage: o.damage === undefined ? 1 : o.damage,
      team: good, life: o.life || 1.6, owner: this, gravity: o.gravity || 0, ink: o.ink || '#ffe9a0', size: o.size || 4, pierce: o.pierce || 0
    });
    this.scene.spawn(sh, this.scene.layers.main);
    this.signal('fire', this, sh);
    return sh;
  }
  pullbox(opts) {
    const o = opts || {};
    const r = o.r || 90;
    return this.scene ? this.scene.space.overlaps(boxe.center(this.wx + this.w / 2, this.wy + this.h / 2, r * 2, r * 2), null, []) : [];
  }
  hurt(dmg, src, dir) {
    if (this.dead || this.iframes > 0 || this.god) return this;
    this.health -= dmg;
    this.iframes = this.hurtsec;
    this.hurtdir = { x: dir === undefined ? (src && src.wx > this.wx ? -1 : 1) : dir < 0 ? -1 : dir > 0 ? 1 : 1, y: -1 };
    this.signal('hurt', this, dmg, src);
    if (this.scene) { this.scene.shake(4, 0.2); this.scene.hitstop(0.06, 0.12); }
    if (this.health <= 0) { this.health = 0; this.die(); }
    else this.mind.go('hurt');
    return this;
  }
  heal(n = 1) { this.health = min(this.maxhealth, this.health + n); this.signal('heal', this, n); return this; }
  die() {
    if (this.dead) return this;
    this.dead = true;
    this.mind.go('dead');
    if (this.scene) this.scene.fx.burst(this.wx + this.w / 2, this.wy + this.h / 2, { count: 22, ink: '#ff6f8a', spd: 200, life: 0.6, size: 3 });
    return this;
  }
  step(dt) {
    if (this.dead) { this.mind.go('dead'); }
    this.pull();
    this.mind.step(dt);
    this.anim();
    if (this.skin) this.skin.vis = !(this.iframes > 0 && fract(this.theta * 18) < 0.4);
    if (this.wants.fire) this.shoot();
    return this;
  }
}

class mob extends node {
  constructor(x = 0, y = 0, opts = {}) {
    super(x, y, 0, 0);
    const o = opts || {};
    this.rig = new rig(this);
    this.rig.size(o.w || 12, o.h || 12);
    this.w = this.rig.w;
    this.h = this.rig.h;
    this.team = o.team || bad;
    this.tag = o.tag || 'mob';
    this.health = o.health === undefined ? 3 : o.health;
    this.maxhealth = o.maxhealth === undefined ? this.health : o.maxhealth;
    this.damage = o.damage === undefined ? 1 : o.damage;
    this.contact = o.contact === undefined ? 1 : o.contact;
    this.speed = o.speed === undefined ? 42 : o.speed;
    this.chasespeed = o.chasespeed === undefined ? this.speed * 1.5 : o.chasespeed;
    this.jumpvel = o.jumpvel === undefined ? 300 : o.jumpvel;
    this.grav = o.grav === undefined ? 1250 : o.grav;
    this.maxfall = o.maxfall === undefined ? 480 : o.maxfall;
    this.fly = !!o.fly;
    this.hover = o.hover || 0;
    this.sight = o.sight === undefined ? 200 : o.sight;
    this.sightangle = o.sightangle === undefined ? pi * 0.6 : o.sightangle;
    this.los = o.los !== false;
    this.patrol = o.patrol === undefined ? 72 : o.patrol;
    this.attackrange = o.attackrange === undefined ? 22 : o.attackrange;
    this.attackcd = o.attackcd === undefined ? 1.1 : o.attackcd;
    this.attackleft = rand(0.2, this.attackcd);
    this.attackwind = o.attackwind === undefined ? 0.28 : o.attackwind;
    this.attackkind = o.attackkind || 'melee';
    this.attacktime = 0;
    this.windup = 0;
    this.knockback = o.knockback === undefined ? 150 : o.knockback;
    this.hurtsec = o.hurtsec === undefined ? 0.24 : o.hurtsec;
    this.iframes = 0;
    this.deadt = 0;
    this.dead = false;
    this.face = o.face ? sign(o.face) : -1;
    this.home = { x, y };
    this.target = null;
    this.faction = o.faction || 0;
    this.loot = o.loot || null;
    this.wander = !!o.wander;
    this.passive = !!o.passive;
    this.boss = !!o.boss;
    this.phases = o.phases || null;
    this.phase = 0;
    this.guard = o.guard || null;
    this.flying = !!o.fly;
    this.walkback = o.walkback !== false;
    this.edge = o.edge !== false;
    this.mind = new machine(this);
    this.bus = new bus();
    this.wants = { x: 0, y: 0, jump: false, jumpout: false, shoot: false, melee: false, special: false };
    this.art = null;
    this.skin = null;
    this.anims = { idle: 'idle', walk: 'walk', run: 'run', jump: 'jump', fall: 'fall', attack: 'attack', hurt: 'hurt', dead: 'dead' };
    if (o.art) this.setskin(o.art);
    this.spot();
    this.states();
    this.pick(o);
    this.mind.go('idle');
  }
  pick(o) { for (const k in o) if (this[k] === undefined) this[k] = o[k]; return this; }
  setskin(a) {
    this.art = art.of(a);
    this.skin = new sprite(this.art, 0, 0);
    this.skin.ax = 0.5;
    this.skin.ay = 1;
    this.skin.lock = true;
    this.skin.w = this.art.w;
    this.skin.h = this.art.h;
    this.add(this.skin);
    this.spot();
    return this;
  }
  spot() { if (this.skin) { this.skin.x = this.rig.ox + this.w / 2; this.skin.y = this.rig.oy + this.h; } return this; }
  on(k, f) { this.bus.on(k, f); return this; }
  signal(k, a, b, c) { return this.bus.fire(k, a, b, c); }
  eye() { return new vec(this.rig.gx + this.w / 2, this.rig.gy + this.h / 2); }
  center() { return this.eye(); }
  distto(t) { const e = this.eye(); return dist(e.x, e.y, t.wx + t.w / 2, t.wy + t.h / 2); }
  angto(t) { const e = this.eye(); return atan2(t.wy + t.h / 2 - e.y, t.wx + t.w / 2 - e.x); }
  losclear(t) {
    if (!this.los || !this.scene || !this.scene.space) return true;
    const e = this.eye();
    const h = this.scene.space.ray(e.x, e.y, t.wx + t.w / 2, t.wy + t.h / 2, { max: this.sight + 40 });
    return !h;
  }
  sees(t) {
    if (!t || t.dead || !t.live) return false;
    const d = this.distto(t);
    if (d > this.sight) return false;
    const da = abs(angdiff(atan2(t.wy + t.h / 2 - this.eye().y, t.wx + t.w / 2 - this.eye().x), this.face > 0 ? 0 : pi));
    if (da > this.sightangle) return false;
    return this.losclear(t);
  }
  seek(t) { return t ? this.scene.space.ray(this.eye().x, this.eye().y, t.wx + t.w / 2, t.wy + t.h / 2, { max: this.sight }) : null; }
  toward(t, dt) {
    const a = this.angto(t);
    if (this.fly) { this.rig.vx = move(this.rig.vx, cos(a) * this.chasespeed, 260, dt); this.rig.vy = move(this.rig.vy, sin(a) * this.chasespeed, 260, dt); this.rig.movex(this.rig.vx * dt); this.rig.movey(this.rig.vy * dt); }
    else {
      if (cos(a) > 0.05) this.wants.x = 1; else if (cos(a) < -0.05) this.wants.x = -1; else this.wants.x = 0;
    }
    return this;
  }
  patrolstep(dt) {
    const rig2 = this.rig;
    const d = this.x - this.home.x;
    if (abs(d) > this.patrol) this.face = d > 0 ? -1 : 1;
    if (this.edge && rig2.onground && !this.passive) {
      const ahead = rig2.box();
      const probe = rig.tmp.set(ahead.x + (this.face > 0 ? ahead.w + 2 : -3), ahead.y + ahead.h + 1, 2, 3);
      rig2.gather(probe);
      if (!rig2.test(probe, false, 1)) { this.face = -this.face; }
      const wall = rig2.wallcheck(this.face);
      if (wall) this.face = -this.face;
    }
    this.wants.x = this.face;
    return this;
  }
  shoot(opts) {
    if (!this.scene) return null;
    const o = opts || {};
    const t = o.at || this.target;
    let vx = 0, vy = 0, sp = o.speed || 210;
    if (t) { const a = atan2(t.wy + t.h / 2 - this.eye().y, t.wx + t.w / 2 - this.eye().x); vx = cos(a) * sp; vy = sin(a) * sp; }
    else { vx = this.face * sp; }
    const s = new shot(this.eye().x, this.eye().y, {
      art: o.art, vx, vy, damage: o.damage === undefined ? this.damage : o.damage, team: this.team, life: o.life || 2.2,
      gravity: o.gravity || 0, owner: this, ink: o.ink || '#ff9b6a', size: o.size || 4, home: o.home || null, turn: o.turn || 0, pierce: o.pierce || 0
    });
    this.scene.spawn(s, o.layer || this.scene.layers.main);
    this.signal('shoot', this, s);
    return s;
  }
  slash(opts) {
    const o = opts || {};
    const r = o.r || this.attackrange;
    const x = this.eye().x + this.face * (r / 2 + 4) - r / 2;
    const y = this.eye().y - this.h / 2;
    const h = new hit(x, y, r, this.h, { damage: o.damage === undefined ? this.damage : o.damage, team: this.team, life: o.life || 0.14, knock: o.knock || 180, src: this, tag: 'mobslash' });
    if (this.scene) this.scene.spawn(h, this.scene.layers.main);
    this.signal('melee', this, h);
    return h;
  }
  leap(vx, vy) { this.rig.vx = vx === undefined ? this.face * 130 : vx; this.rig.vy = vy === undefined ? -this.jumpvel : vy; this.signal('leap', this); return this; }
  cling(t) { return this; }
  summon(cls, opts) {
    if (!this.scene) return null;
    const o = opts || {};
    const m = new cls(this.x + (o.dx || 0), this.y + (o.dy || 0), o.opts || {});
    this.scene.spawn(m, this.scene.layers.main);
    this.signal('summon', this, m);
    return m;
  }
  drop() {
    if (!this.loot || !this.scene) return null;
    const l = this.loot;
    const it = new pickup(this.x, this.y, typeof l === 'string' ? { art: l } : l);
    this.scene.spawn(it, this.scene.layers.main);
    this.signal('drop', this, it);
    return it;
  }
  phasego(n) {
    this.phase = n;
    this.signal('phase', this, n);
    if (this.phases && this.phases[n] && this.phases[n].enter) this.phases[n].enter(this);
    return this;
  }
  hurt(dmg, src, dir) {
    if (this.dead || this.iframes > 0 || this.god) return this;
    this.health -= dmg;
    this.iframes = 0.12;
    this.flash('#ffffff', 0.12);
    this.signal('hurt', this, dmg, src);
    if (this.health <= 0) { this.die(); return this; }
    if (dmg > 0) this.mind.go('hurt');
    if (dir !== 0) this.rig.vx = (dir || 1) * this.knockback * 0.6;
    else this.rig.vx = (src && src.wx > this.wx ? -1 : 1) * this.knockback * 0.6;
    this.rig.vy = -70;
    return this;
  }
  die() {
    if (this.dead) return this;
    this.dead = true;
    this.mind.go('dead');
    this.drop();
    if (this.scene) this.scene.fx.burst(this.eye().x, this.eye().y, { count: 14, ink: '#ffd2d2', spd: 150, life: 0.5, size: 3 });
    this.signal('die', this);
    return this;
  }
  states() {
    const M = this.mind;
    M.state('idle', {
      enter: (o) => { o.wants.x = 0; },
      step: (o, dt) => {
        o.idlesec = (o.idlesec || 0) + dt;
        o.bleed(dt);
        if (o.target && o.sees(o.target)) { o.mind.go('chase'); return; }
        if (o.idlesec > (o.idlehold || 0.6)) {
          o.idlesec = 0;
          if (o.wander) o.mind.go('wander');
          else if (o.guard) o.mind.go('guard');
          else if (o.patrol > 0) o.mind.go('patrol');
        }
      }
    });
    M.state('patrol', {
      enter: (o) => { o.wants.x = o.face; },
      step: (o, dt) => {
        o.patrolstep(dt);
        o.walkstep(dt);
        o.bleed(dt);
        if (o.target && o.sees(o.target)) o.mind.go('chase');
      }
    });
    M.state('guard', {
      enter: (o) => { o.wants.x = 0; o.hometo = true; },
      step: (o, dt) => {
        const g = o.guard;
        const d = dist(o.x, o.y, g.x, g.y);
        if (d > g.r) { o.wants.x = sign(g.x - o.x); o.face = o.wants.x || o.face; }
        else if (o.face) {
          const ahead = o.eye().x + o.face * g.r;
          if (abs(ahead - g.x) > g.r) o.face = -o.face;
        }
        o.walkstep(dt);
        o.bleed(dt);
        if (o.target && o.sees(o.target)) o.mind.go('chase');
      }
    });
    M.state('wander', {
      enter: (o) => { o.wt = rand(0.4, 1.6); o.wants.x = chance(0.5) ? 1 : -1; },
      step: (o, dt) => {
        o.wt -= dt;
        o.wants.x = abs(o.wants.x) < 0.1 ? 0 : o.wants.x;
        o.walkstep(dt);
        o.bleed(dt);
        if (o.wt <= 0) { o.mind.go('idle'); return; }
        if (o.target && o.sees(o.target)) o.mind.go('chase');
      }
    });
    M.state('chase', {
      enter: (o) => { o.signal('sight', o, o.target); o.chaset = 0; },
      step: (o, dt) => {
        const t = o.target;
        o.chaset += dt;
        if (!t || t.dead) { o.mind.go('idle'); return; }
        const seen = o.sees(t);
        if (!seen) { o.lostsec = (o.lostsec || 0) + dt; if (o.lostsec > 1.4) { o.target = null; o.lostsec = 0; o.mind.go('idle'); return; } }
        else o.lostsec = 0;
        const d = o.distto(t);
        if (o.fly) { o.toward(t, dt); o.bleed(dt); }
        else {
          o.wants.x = sign(t.wx + t.w / 2 - (o.rig.gx + o.w / 2));
          o.face = o.wants.x || o.face;
          o.speednow = o.chasespeed;
          o.walkstep(dt);
          if (o.jumpvel > 0 && o.rig.onground && d < 90 && t.wy + t.h < o.rig.gy - 6) o.leap();
          if (!o.rig.onground && o.rig.hitx && o.jumpvel > 0) o.leap();
          if (o.rig.onground) o.bleed(dt);
        }
        if (o.attackkind !== 'none' && d <= o.attackrange && o.attackleft <= 0) { o.mind.go('attack'); return; }
      }
    });
    M.state('attack', {
      enter: (o) => {
        o.attacktime = 0;
        o.windup = 0;
        o.attackleft = o.attackcd;
        o.wants.x = 0;
        o.play('attack', true);
        o.signal('windup', o);
      },
      step: (o, dt) => {
        o.attacktime += dt;
        if (o.attacktime < o.attackwind) { o.bleed(dt); return; }
        if (!o.attackdone) {
          o.attackdone = true;
          if (o.attackkind === 'shoot') o.shoot();
          else if (o.attackkind === 'leap') o.leap();
          else if (o.attackkind === 'contact') { o.charge = 0.4; o.leap(o.face * (o.chasespeed * 2.4), -40); }
          else o.slash();
        }
        if (o.attacktime > o.attackwind + 0.26) { o.attackdone = false; o.mind.go(o.target && o.sees(o.target) ? 'chase' : 'idle'); }
        o.rig.movex(0);
        o.bleed(dt);
      }
    });
    M.state('hurt', {
      enter: (o) => { o.hurtt = 0; o.play('hurt', true); },
      step: (o, dt) => {
        o.hurtt += dt;
        o.rig.vy = min(o.rig.vy + o.grav * dt, o.maxfall);
        o.rig.vx *= pow(0.02, dt);
        o.rig.movex(o.rig.vx * dt);
        o.rig.movey(o.rig.vy * dt);
        if (o.hurtt >= o.hurtsec) o.mind.go(o.target && o.sees(o.target) ? 'chase' : 'idle');
      }
    });
    M.state('dead', {
      step: (o, dt) => {
        o.deadt += dt;
        o.rig.vy = min(o.rig.vy + o.grav * dt, o.maxfall);
        o.rig.movex(o.rig.vx * dt);
        o.rig.movey(o.rig.vy * dt);
        o.rig.vx *= pow(0.02, dt);
        if (o.deadt > (o.fade || 0.7)) o.kill();
      }
    });
    return this;
  }
  play(name, restart) {
    if (!this.skin || !this.art || !this.art.clips[this.anims[name] || name]) return this;
    this.skin.play(this.anims[name] || name, restart);
    return this;
  }
  walkstep(dt) {
    const rig2 = this.rig;
    const sp = this.speednow === undefined ? this.speed : this.speednow;
    const want = clamp(this.wants.x, -1, 1) * sp;
    rig2.vx = move(rig2.vx, want, 420, dt);
    if (this.fly) {
      const wy = this.wants.y * sp * 0.8;
      rig2.vy = move(rig2.vy, wy, 300, dt);
    } else {
      rig2.vy = min(rig2.vy + this.grav * dt, this.maxfall);
    }
    if (this.slopes !== false) { }
    rig2.movex(rig2.vx * dt);
    rig2.movey(rig2.vy * dt);
    this.speednow = undefined;
    return this;
  }
  bleed(dt) {
    if (this.iframes > 0) this.iframes -= dt;
    if (this.attackleft > 0) this.attackleft -= dt;
    if (this.target && !this.target.live) this.target = null;
    if (this.contact > 0 && this.target && this.target.hurt && this.bounds.hits(this.target.bounds) && !this.dead) {
      this.target.hurt(this.contact, this);
    }
    if (this.scene && this.scene.hero && !this.target && this.team !== this.scene.hero.team) this.target = this.scene.hero;
    return this;
  }
  step(dt) {
    if (this.iframes > 0 && !this.dead) this.skin && (this.skin.juice.ta = fract(this.theta * 20) < 0.5 ? 0.6 : 0);
    this.mind.step(dt);
    if (this.skin) { this.skin.flipx = this.face < 0; if (this.dead) this.skin.alpha = max(0, 1 - this.deadt / (this.fade || 0.7)); }
    this.bleed(dt);
    return this;
  }
}

class shot extends node {
  constructor(x = 0, y = 0, opts = {}) {
    super(x, y, 0, 0);
    const o = opts || {};
    this.rig = new rig(this);
    this.w = o.size === undefined ? 6 : o.size;
    this.h = o.size === undefined ? 6 : o.size;
    this.rig.size(o.w || this.w, o.h || this.h);
    this.rig.grav = o.gravity ? 1 : 0;
    this.gravity = o.gravity || 0;
    this.team = o.team || bad;
    this.damage = o.damage === undefined ? 1 : o.damage;
    this.life = o.life === undefined ? 2 : o.life;
    this.t = 0;
    this.pierce = o.pierce || 0;
    this.bounce = o.bounce || 0;
    this.owner = o.owner || null;
    this.target = o.home || null;
    this.turn = o.turn || 0;
    this.ink = paint.of(o.ink === undefined ? '#ffd166' : o.ink);
    this.trail = o.trail === undefined ? 3 : o.trail;
    this.trailt = 0;
    this.art = o.art ? art.of(o.art) : null;
    this.rot = o.angle === undefined ? atan2(o.vy || 0, o.vx || 1) : o.angle;
    this.spin = o.spin === undefined ? 0 : o.spin;
    this.knock = o.knock === undefined ? 140 : o.knock;
    this.gone = false;
    this.hitlist = [];
    this.ax = 0.5;
    this.ay = 0.5;
    this.rig.fling(o.vx || 0, o.vy || 0);
    this.onhit = o.onhit || null;
    this.solid = o.solid !== false;
    this.smoke = o.smoke !== false;
    this.maxstep = 2;
    this.rig.maxstep = 2;
    if (this.art) { this.w = this.art.w; this.h = this.art.h; this.rig.size(this.w, this.h); }
  }
  blow() {
    if (this.gone) return this;
    this.gone = true;
    this.kill();
    if (this.scene && this.smoke) this.scene.fx.burst(this.wx + this.w / 2, this.wy + this.h / 2, { count: 8, ink: paint.css(this.ink), spd: 110, life: 0.28, size: 2.6 });
    if (this.onhit) this.onhit(this);
    return this;
  }
  step(dt) {
    this.t += dt;
    if (this.t >= this.life) { this.blow(); return this; }
    const rig2 = this.rig;
    if (this.turn && this.target && this.target.live) {
      const a = atan2(this.target.wy + this.target.h / 2 - (this.wy + this.h / 2), this.target.wx + this.target.w / 2 - (this.wx + this.w / 2));
      const cur = atan2(rig2.vy, rig2.vx);
      const na = avgle(cur, a, clamp01(this.turn * dt));
      const sp = hypot(rig2.vx, rig2.vy);
      rig2.vx = cos(na) * sp;
      rig2.vy = sin(na) * sp;
      this.rot = na;
    } else if (this.turn) this.rot = this.rot;
    if (this.gravity) rig2.vy += this.gravity * dt;
    if (this.spin) this.rot += this.spin * dt;
    if (this.trail > 0) {
      this.trailt -= dt;
      if (this.trailt <= 0 && this.scene && this.scene.fx) {
        this.trailt = 0.03;
        this.scene.fx.spark(this.wx + this.w / 2, this.wy + this.h / 2, { ink: paint.css(this.ink), life: 0.2, size: 2, vx: -rig2.vx * 0.05, vy: -rig2.vy * 0.05 });
      }
    }
    const dx = rig2.vx * dt, dy = rig2.vy * dt;
    if (this.solid && this.scene && this.scene.space) {
      const sp = this.scene.space;
      const b = rig2.box();
      const sh = sp.ray(b.x + b.w / 2, b.y + b.h / 2, b.x + b.w / 2 + dx, b.y + b.h / 2 + dy, { max: hypot(dx, dy) + 2 });
      if (sh) {
        if (this.bounce > 0) {
          this.bounce--;
          if (abs(dx) > abs(dy)) rig2.vx *= -1; else rig2.vy *= -1;
          this.rot = atan2(rig2.vy, rig2.vx);
          this.x += dx * 0.4;
          this.y += dy * 0.4;
          return this;
        }
        rig2.movex(dx);
        rig2.movey(dy);
        this.blow();
        return this;
      }
    }
    rig2.movex(dx);
    rig2.movey(dy);
    this.targets();
    return this;
  }
  targets() {
    if (!this.scene || !this.scene.space) return this;
    const l = this.scene.space.actors;
    for (let i = 0; i < l.length; i++) {
      const a = l[i];
      if (a === this.owner || a.team === this.team || !a.hurt || a.dead) continue;
      if (this.hitlist.indexOf(a) >= 0) continue;
      if (this.bounds.hits(a.bounds)) {
        a.hurt(this.damage, this.owner || this, this.rig.vx > 0 ? 1 : -1);
        this.hitlist.push(a);
        if (this.pierce > 0) this.pierce--;
        else { this.blow(); return this; }
      }
    }
    return this;
  }
  paint(p) {
    if (p.cull(this)) return this;
    p.begin(this);
    if (this.art) p.blit(this.art, 0, 0, this.art.w, this.art.h, -this.w / 2, -this.h / 2, this.w, this.h, this);
    else p.dot(this, this.w, this.h, this.ink, true);
    return this;
  }
}

class hit extends node {
  constructor(x = 0, y = 0, w = 8, h = 8, opts = {}) {
    super(x, y, w, h);
    const o = opts || {};
    this.damage = o.damage === undefined ? 1 : o.damage;
    this.team = o.team || good;
    this.life = o.life === undefined ? 0.1 : o.life;
    this.knock = o.knock === undefined ? 160 : o.knock;
    this.once = o.once === true;
    this.src = o.src || null;
    this.tag = o.tag || 'hit';
    this.hitlist = [];
    this.onhit = o.onhit || null;
    this.targetscls = o.targets || null;
    this.t = 0;
    this.kind = o.kind || 'slash';
    this.ink = paint.of(o.ink === undefined ? '#ffffff' : o.ink);
    this.art = o.art ? art.of(o.art) : null;
  }
  setart(a) { this.art = a ? art.of(a) : null; return this; }
  step(dt) {
    this.t += dt;
    if (this.t >= this.life) { this.kill(); return this; }
    if (!this.scene || !this.scene.space) return this;
    const l = this.scene.space.actors;
    for (let i = 0; i < l.length; i++) {
      const a = l[i];
      if (a === this.src || !a.hurt || a.dead || a.team === this.team) continue;
      if (this.hitlist.indexOf(a) >= 0) continue;
      if (this.targetscls && !(a instanceof this.targetscls)) continue;
      if (!this.bounds.hits(a.bounds)) continue;
      this.hitlist.push(a);
      a.hurt(this.damage, this.src || this, a.wx < this.wx ? -1 : 1);
      if (this.onhit) this.onhit(a, this);
      if (this.once) { this.kill(); return this; }
    }
    return this;
  }
  paint(p) { return this; }
}

class pickup extends node {
  constructor(x = 0, y = 0, opts = {}) {
    super(x, y, 0, 0);
    const o = opts || {};
    this.art = o.art ? art.of(o.art) : null;
    this.w = o.w || (this.art ? this.art.w : 8);
    this.h = o.h || (this.art ? this.art.h : 8);
    this.kind = o.kind || 'coin';
    this.value = o.value === undefined ? 1 : o.value;
    this.team = good;
    this.magnet = o.magnet === undefined ? 46 : o.magnet;
    this.magnetsec = o.magnetsec === undefined ? 0.35 : o.magnetsec;
    this.bob = o.bob === undefined ? 2 : o.bob;
    this.life = o.life || 0;
    this.t = 0;
    this.ink = paint.of(o.ink === undefined ? '#ffd166' : o.ink);
    this.rig = new rig(this);
    this.rig.size(this.w, this.h);
    this.rig.grav = o.gravity ? 1 : 0;
    this.rig.fling(o.vx || 0, o.vy || 0);
    this.onsell = o.collect || null;
    this.by = o.by || null;
    this.gravity = o.gravity || 0;
    this.homey = y;
    this.ax = 0.5;
    this.ay = 0.5;
    this.auto = o.auto !== false;
    this.tag = 'pickup';
  }
  step(dt) {
    this.t += dt;
    if (this.life > 0 && this.t > this.life) { this.kill(); return this; }
    const rig2 = this.rig;
    let target = this.by;
    if (!target && this.scene) target = this.scene.hero;
    if (target && target.live && !target.dead) {
      const d = dist(this.wx, this.wy, target.wx + target.w / 2, target.wy + target.h / 2);
      if (d < this.magnet * this.magnetsec && this.t > 0.05) {
        const a = atan2(target.wy + target.h / 2 - this.wy, target.wx + target.w / 2 - this.wx);
        const pull = lerp(600, 120, clamp01(d / max(1, this.magnet)));
        rig2.vx = move(rig2.vx, cos(a) * pull, 900, dt);
        rig2.vy = move(rig2.vy, sin(a) * pull, 900, dt);
        this.magnetsec += dt * 2;
      }
      if (d < 10 && this.auto) { this.collect(target); return this; }
    }
    if (this.gravity) rig2.vy += this.gravity * dt;
    else if (this.bob) rig2.vy = cos(this.t * 4) * this.bob * 4;
    rig2.movex(rig2.vx * dt);
    rig2.movey(rig2.vy * dt);
    if (rig2.hity && rig2.onground) rig2.vy = 0;
    return this;
  }
  collect(who) {
    this.kill();
    if (this.scene) this.scene.fx.burst(this.wx, this.wy, { count: 10, ink: paint.css(this.ink), spd: 90, life: 0.3, size: 2.4 });
    if (this.onsell) this.onsell(who, this);
    if (who && who.fire2) who.signal('pickup', who, this);
    if (this.scene) this.scene.fire('pickup', this, who);
    return this;
  }
  paint(p) {
    if (p.cull(this)) return this;
    p.begin(this);
    if (this.art) p.blit(this.art, 0, 0, this.art.w, this.art.h, -this.w / 2, -this.h / 2, this.w, this.h, this);
    else p.dot(this, this.w, this.h, this.ink, true);
    return this;
  }
}

const boxe = { center: (x, y, w, h) => new box(x - w / 2, y - h / 2, w, h) };
class tileset {
  constructor(a, tw = 16, th = 16, opts) {
    const o = opts || {};
    this.art = a ? art.of(a) : art.make(tw * 4, th);
    this.tw = tw;
    this.th = th;
    this.cols = o.cols || max(1, floor(this.art.w / tw));
    this.defs = {};
    this.chars = o.chars || '';
    this.smooth = o.smooth !== false;
    this.gapx = o.gapx || 0;
    this.gapy = o.gapy || 0;
    if (o.chars) { const c = o.chars; for (let i = 0; i < c.length; i++) if (c[i] !== ' ') this.def(c[i], i, o.all || {}); }
  }
  def(ch, index, opts) {
    const o = opts || {};
    this.defs[ch] = {
      ch, i: index === undefined ? objt['keys'](this.defs).length : index,
      solid: !!o.solid, oneway: !!o.oneway, slope: o.slope || 0,
      hazard: o.hazard ? (typeof o.hazard === 'number' ? o.hazard : 1) : 0,
      tag: o.tag || '', auto: !!o.auto, lift: o.lift || 0, climb: !!o.climb, water: !!o.water,
      src: null
    };
    return this;
  }
  raw(ch, o) { return this.def(ch, o && o.i, o); }
  src(ch) {
    const d = this.defs[ch];
    if (!d) return null;
    if (!d.src) d.src = new box((d.i % this.cols) * (this.tw + this.gapx), floor(d.i / this.cols) * (this.th + this.gapy), this.tw, this.th);
    return d.src;
  }
  auto(ch, o) {
    const d = this.def(ch, o && o.i, o);
    d.auto = true;
    return this;
  }
  index(ch) { const d = this.defs[ch]; return d ? d.i : -1; }
  solidch(ch) { const d = this.defs[ch]; return !!(d && d.solid); }
  onewaych(ch) { const d = this.defs[ch]; return !!(d && d.oneway); }
}

class tilemap extends group {
  constructor(set, rows, opts) {
    super(0, 0);
    const o = opts || {};
    this.set = set;
    this.rows = typeof rows === 'string' ? rows.split('\n') : rows.slice();
    this.cols = 0;
    for (let i = 0; i < this.rows.length; i++) this.cols = max(this.cols, this.rows[i].length);
    this.rowcount = this.rows.length;
    this.tw = set.tw;
    this.th = set.th;
    this.cellw = o.cellw || 8;
    this.cellh = o.cellh || 8;
    this.tx = o.tx || 0;
    this.ty = o.ty || 0;
    this.data = new arrt(this.cols * this.rowcount);
    this.solidbits = new Uint8Array(this.cols * this.rowcount);
    this.space = null;
    this.chart = new mapc();
    this.cells = new Uint16Array(this.cols * this.rowcount);
    this.codewords = new mapc();
    this.caches = new mapc();
    this.visible = true;
    this.debug = false;
    this.slopes = new mapc();
    this.auto = o.auto !== false;
    this.parx = 0;
    this.pary = 0;
    this.layer = o.layer === undefined ? -10 : o.layer;
    this.z = o.z === undefined ? -10 : o.z;
    this.ink = paint.of(o.ink === undefined ? '#2b3242' : o.ink);
    this.measure();
    this.parse();
    this.measure();
  }
  parse() {
    const d = this.data;
    d.fill(-1);
    const s = this.set;
    for (let y = 0; y < this.rowcount; y++) {
      const row = this.rows[y];
      for (let x = 0; x < row.length; x++) {
        const ch = row[x];
        if (ch === ' ' || ch === '.' || ch === '_') continue;
        const def = s.defs[ch];
        if (!def) continue;
        d[y * this.cols + x] = s.index(ch);
        this.chart.set(s.index(ch), ch);
        this.codewords.set(ch, ch.charCodeAt(0));
        this.cells[y * this.cols + x] = ch.charCodeAt(0);
        if (def.solid) this.solidbits[y * this.cols + x] |= 1;
        if (def.oneway) this.solidbits[y * this.cols + x] |= 2;
      }
    }
    return this;
  }
  measure() { this.w = this.cols * this.tw; this.h = this.rowcount * this.th; return this; }
  index(cx, cy) {
    if (cx < 0 || cy < 0 || cx >= this.cols || cy >= this.rowcount) return -1;
    return this.data[cy * this.cols + cx];
  }
  char(cx, cy) {
    if (cx < 0 || cy < 0 || cx >= this.cols || cy >= this.rowcount) return ' ';
    const c = this.cells[cy * this.cols + cx];
    return c ? strt['fromCharCode'](c) : ' ';
  }
  bits(cx, cy) {
    if (cx < 0 || cy < 0 || cx >= this.cols || cy >= this.rowcount) return 0;
    return this.solidbits[cy * this.cols + cx];
  }
  put(cx, cy, ch) {
    if (cx < 0 || cy < 0 || cx >= this.cols || cy >= this.rowcount) return this;
    const i = ch === ' ' || ch === '.' ? -1 : this.set.index(ch);
    this.data[cy * this.cols + cx] = i;
    this.cells[cy * this.cols + cx] = ch && ch !== ' ' ? ch.charCodeAt(0) : 0;
    const def = this.set.defs[ch];
    let b = 0;
    if (def && def.solid) b |= 1;
    if (def && def.oneway) b |= 2;
    this.solidbits[cy * this.cols + cx] = b;
    this.chart.set(i, ch);
    if (this.auto) this.chartclr(cx, cy);
    return this;
  }
  rect(cx, cy, w, h, ch) { for (let y = cy; y < cy + h; y++) for (let x = cx; x < cx + w; x++) this.put(x, y, ch); this.measure(); return this; }
  chartclr(cx, cy) {
    const c = this.chunkw || 8, r = this.chunkh || 8;
    this.caches.delete(floor(cx / c) + ',' + floor(cy / r));
    return this;
  }
  clearcache() { this.caches.clear(); return this; }
  solidsat(px, py) { return (this.bits(floor(px / this.tw), floor(py / this.th)) & 1) !== 0; }
  onewayat(px, py) { return (this.bits(floor(px / this.tw), floor(py / this.th)) & 2) !== 0; }
  hazardat(px, py) {
    const ch = this.char(floor(px / this.tw), floor(py / this.th));
    const def = this.set.defs[ch];
    return def ? def.hazard : 0;
  }
  solidbox(b) {
    const x0 = floor(b.x / this.tw), x1 = floor((b.x + b.w - 0.001) / this.tw);
    const y0 = floor(b.y / this.th), y1 = floor((b.y + b.h - 0.001) / this.th);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (this.bits(x, y) & 1) return true;
    return false;
  }
  slopeat(px, py) {
    if (py >= this.h + 64 || py < -64) return null;
    const cx = floor(px / this.tw), cy = floor(py / this.th);
    const ch = this.char(cx, cy);
    const def = this.set.defs[ch];
    if (!def || !def.slope) return null;
    const key = cx + ',' + cy;
    let sl = this.slopes.get(key);
    if (!sl) {
      const tx = cx * this.tw, ty = cy * this.th, tw = this.tw, th = this.th, dir = def.slope;
      sl = {
        def, tx, ty, tw, th,
        surf: (x) => {
          const f = clamp01((x - tx) / tw);
          if (dir === 1) return ty + th - f * th;
          if (dir === -1) return ty + f * th;
          if (dir === 2) return ty + th - (1 - f) * th;
          return ty + (1 - f) * th;
        }
      };
      this.slopes.set(key, sl);
    }
    return sl;
  }
  rects(r, b, fn) {
    const x0 = floor(b.x / this.tw), x1 = floor((b.x + b.w - 0.001) / this.tw);
    const y0 = floor(b.y / this.th), y1 = floor((b.y + b.h - 0.001) / this.th);
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const bits = this.bits(x, y);
        if (!bits) continue;
        fn(x * this.tw + this.tx, y * this.th + this.ty, this.tw, this.th, (bits & 2) ? 1 : 0, 0, null);
      }
    }
    return this;
  }
  boxrects(b, out) { return this.rects(null, b, (x, y, w, h, oneway) => out.push(tilemap.tile(x, y, w, h, oneway, this))); }
  marks(ch) {
    const l = [];
    for (let y = 0; y < this.rowcount; y++) for (let x = 0; x < this.cols; x++) if (this.char(x, y) === ch) l.push({ x: this.tx + x * this.tw + this.tw / 2, y: this.ty + y * this.th + this.th / 2, cx: x, cy: y });
    return l;
  }
  spawnmarks(ch, fn, scene) {
    const l = this.marks(ch);
    for (let i = 0; i < l.length; i++) { const n = fn(l[i], i); if (n && scene) scene.spawn(n); }
    return l;
  }
  autovariant(cx, cy) {
    const ch = this.char(cx, cy);
    const def = this.set.defs[ch];
    if (!def) return def;
    if (!def.auto) return def;
    let m = 0;
    if (this.set.solidch(this.char(cx, cy - 1))) m |= 1;
    if (this.set.solidch(this.char(cx + 1, cy))) m |= 2;
    if (this.set.solidch(this.char(cx, cy + 1))) m |= 4;
    if (this.set.solidch(this.char(cx - 1, cy))) m |= 8;
    if (m === 0) return def;
    const v = def.i + m;
    return { i: v, solid: def.solid, oneway: def.oneway, slope: def.slope, tag: def.tag };
  }
  tileindex(cx, cy) { const d = this.autovariant(cx, cy); return d ? d.i : -1; }
  tileart() { return this.set.art; }
  chunk(cx, cy, cw, chh) {
    const key = cx + ',' + cy;
    let a = this.caches.get(key);
    if (a) return a;
    a = art.make(cw * this.tw, chh * this.th);
    const g = a.ctx;
    if (g) {
      g['imageSmoothingEnabled'] = this.set.smooth;
      for (let y = 0; y < chh; y++) {
        for (let x = 0; x < cw; x++) {
          const tx2 = cx * cw + x, ty2 = cy * chh + y;
          const si = this.tileindex(tx2, ty2);
          if (si < 0) continue;
          const src = this.srcof(si);
          if (!src) continue;
          g['drawImage'](this.set.art.canvas, src.x, src.y, src.w, src.h, x * this.tw, y * this.th, this.tw, this.th);
        }
      }
    }
    this.caches.set(key, a);
    return a;
  }
  srcof(si) {
    if (si < 0) return null;
    const cols = this.set.cols;
    return new box((si % cols) * (this.tw + this.set.gapx), floor(si / cols) * (this.th + this.set.gapy), this.tw, this.th);
  }
  paint(p) {
    if (!this.visible) return this;
    const art2 = this.set.art;
    if (!art2 || !this.cols || !this.rowcount) return this;
    if (p.gfx) {
      const cw = this.chunkw || 8, chh = this.chunkh || 8;
      const v = p.view;
      const x0 = max(0, floor((v.x - this.tx) / (cw * this.tw)));
      const x1 = min(ceil(this.cols / cw) - 1, floor((v.right - this.tx) / (cw * this.tw)));
      const y0 = max(0, floor((v.y - this.ty) / (chh * this.th)));
      const y1 = min(ceil(this.rowcount / chh) - 1, floor((v.bottom - this.ty) / (chh * this.th)));
      p.begin(this);
      for (let cy = y0; cy <= y1; cy++) {
        for (let cx = x0; cx <= x1; cx++) {
          const a = this.chunk(cx, cy, cw, chh);
          p.gfx['drawImage'](a.canvas, cx * cw * this.tw, cy * chh * this.th, a.w, a.h);
        }
      }
    } else {
      const v = p.view;
      const x0 = max(0, floor((v.x - this.tx) / this.tw));
      const x1 = min(this.cols - 1, floor((v.right - this.tx) / this.tw));
      const y0 = max(0, floor((v.y - this.ty) / this.th));
      const y1 = min(this.rowcount - 1, floor((v.bottom - this.ty) / this.th));
      p.begin(this);
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          const si = this.tileindex(x, y);
          if (si < 0) continue;
          const src = this.srcof(si);
          if (!src) continue;
          p.blit(art2, src.x, src.y, src.w, src.h, x * this.tw, y * this.th, this.tw, this.th, this);
        }
      }
    }
    if (this.debug) this.debugdraw(p);
    return this;
  }
  debugdraw(p) {
    const v = p.view;
    const x0 = max(0, floor((v.x - this.tx) / this.tw)), x1 = min(this.cols - 1, floor((v.right - this.tx) / this.tw));
    const y0 = max(0, floor((v.y - this.ty) / this.th)), y1 = min(this.rowcount - 1, floor((v.bottom - this.ty) / this.th));
    p.begin(this);
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const bits = this.bits(x, y);
        if (!bits) continue;
        p.rect(x * this.tw, y * this.th, this.tw, this.th, { stroke: bits & 2 ? '#ffcc66' : '#7fd7ff', linew: 1 });
      }
    }
    return this;
  }
  save() { return this.rows.join('\n'); }
  static tile(x, y, w, h, oneway, map) { return { x, y, w, h, oneway: !!oneway, node: null, tag: 'tile', map }; }
  static from(source, tw, th, opts) {
    const o = opts || {};
    const rows = (o.rows ? o.rows.split('\n') : (o.tiles || ['#'])).slice();
    const set = new tileset(art.flat(tw, th, o.ink || '#3a4256'), tw, th);
    set.def('#', 0, { solid: true });
    const m = new tilemap(set, rows, o);
    return m;
  }
}

const tileartof = (a, tw, th, opts) => new tileset(a, tw, th, opts);
const shapebrush = { dot: 0, rect: 1, ring: 2, star: 3, art: 4, line: 5, glow: 6, spark: 7 };

class fx extends group {
  constructor(opts) {
    super(0, 0);
    const o = opts || {};
    this.parts = [];
    this.pool = [];
    this.count = 0;
    this.maxparts = o.maxparts || 4000;
    this.gravity = new vec(o.gx || 0, o.gy === undefined ? 380 : o.gy);
    this.z = o.z === undefined ? 50 : o.z;
    this.layer = o.layer === undefined ? 4 : o.layer;
    this.pops = [];
    this.poppool = [];
    this.tracks = [];
    this.follow = new vec();
    this.clock = 0;
    this.depthsort = !!o.depthsort;
    this.tag = 'fx';
    this.w = 0;
    this.h = 0;
    this.bounds.set(-1e6, -1e6, 2e6, 2e6);
  }
  grab() {
    if (this.pool.length) { const p = this.pool.pop(); return p; }
    return { x: 0, y: 0, vx: 0, vy: 0, life: 0, t: 0, size: 3, size2: 0, ink: paint.white, ink2: null, shape: 0, grav: 0, drag: 0, rot: 0, spin: 0, alpha: 1, blend: 'source-over', art: null, frame: null, fade: 0, wiggle: 0, spread: 0, glow: 0, floor: false, bounce: 0, scalev: 0, follow: null, foff: null, text: null, len: 0, live: false };
  }
  free(p) { if (this.pool.length < this.maxparts) this.pool.push(p); }
  spawn(opts) {
    const o = opts || {};
    if (this.parts.length >= this.maxparts) { const old = this.parts.shift(); if (old) this.free(old); }
    const p = this.grab();
    p.x = o.x === undefined ? 0 : o.x;
    p.y = o.y === undefined ? 0 : o.y;
    const a = o.angle === undefined ? rand(0, tau) : o.angle + rand(-(o.spread || 0), o.spread || 0) / 2;
    const sp = o.speed === undefined ? rand(20, 60) : (o.speed.length ? rand(o.speed[0], o.speed[1]) : o.speed);
    p.vx = (o.vx === undefined ? cos(a) * sp : o.vx) + (o.pushx || 0);
    p.vy = (o.vy === undefined ? sin(a) * sp : o.vy) + (o.pushy || 0);
    p.life = o.life === undefined ? 0.5 : (o.life.length ? rand(o.life[0], o.life[1]) : o.life);
    p.t = 0;
    p.size = o.size === undefined ? 3 : (o.size.length ? rand(o.size[0], o.size[1]) : o.size);
    p.size2 = o.size2 === undefined ? 0 : o.size2;
    p.ink = o.ink === undefined ? paint.white : (typeof o.ink === 'string' ? paint.hex(o.ink) : (o.ink.length ? paint.of(pick(o.ink)) : paint.of(o.ink)));
    p.ink2 = o.ink2 ? paint.of(o.ink2) : null;
    p.shape = typeof o.shape === 'string' ? (shapebrush[o.shape] || 0) : (o.shape || 0);
    p.grav = o.grav === undefined ? 1 : o.grav;
    p.drag = o.drag === undefined ? 0.9 : o.drag;
    p.rot = o.rot === undefined ? 0 : o.rot;
    p.spin = o.spin === undefined ? rand(-4, 4) : (o.spin.length ? rand(o.spin[0], o.spin[1]) : o.spin);
    p.alpha = o.alpha === undefined ? 1 : o.alpha;
    p.blend = o.blend || 'source-over';
    p.art = o.art ? art.of(o.art) : null;
    p.frame = o.frame || '0';
    p.fade = o.fade === undefined ? 0 : o.fade;
    p.wiggle = o.wiggle || 0;
    p.glow = o.glow || 0;
    p.floor = !!o.floor;
    p.bounce = o.bounce || 0;
    p.follow = o.follow || null;
    p.foff = o.foff || null;
    p.text = o.text || null;
    p.len = o.len || 0;
    p.live = true;
    p.w = o.w || 0;
    p.h = o.h || 0;
    this.parts.push(p);
    this.count++;
    return p;
  }
  burst(x, y, opts) {
    const o = opts || {};
    const n = o.count === undefined ? 10 : o.count;
    const dir = o.dir === undefined ? -pi / 2 : o.dir;
    const spread = o.spread === undefined ? pi * 2 : o.spread;
    for (let i = 0; i < n; i++) {
      const a = spread >= tau - 1e-6 ? rand(0, tau) : dir + (n > 1 ? (i / (n - 1) - 0.5) * spread : 0) + rand(-0.12, 0.12);
      this.spawn({ x: x + rand(-2, 2), y: y + rand(-2, 2), angle: a, speed: o.spd === undefined ? [40, 130] : (typeof o.spd === 'number' ? [o.spd * 0.6, o.spd * 1.4] : o.spd), life: o.life || [0.2, 0.45], size: o.size || [2, 4], ink: o.ink || '#ffffff', shape: o.shape === undefined ? 'dot' : o.shape, grav: o.grav === undefined ? 1 : o.grav, drag: o.drag === undefined ? 0.86 : o.drag, blend: o.blend, glow: o.glow, size2: o.size2, art: o.art, fade: o.fade, floor: o.floor, bounce: o.bounce });
    }
    return this;
  }
  spark(x, y, opts) {
    const o = opts || {};
    return this.spawn({ x, y, vx: o.vx, vy: o.vy, speed: o.speed === undefined ? 0 : 0, life: o.life || 0.25, size: o.size || 2, ink: o.ink || '#ffffff', shape: o.shape === undefined ? 'dot' : o.shape, grav: o.grav === undefined ? 0 : o.grav, drag: o.drag === undefined ? 0.9 : o.drag, blend: o.blend || 'lighter', glow: 1 });
  }
  splash(x, y, opts) { const o = opts || {}; return this.burst(x, y, { count: o.count || 12, dir: -pi / 2, spread: pi, spd: o.spd || [60, 160], life: [0.25, 0.5], ink: o.ink || '#9fd7ff', size: [2, 4], shape: 'dot', grav: o.grav === undefined ? 1 : o.grav, floor: true }); }
  smoke(x, y, opts) {
    const o = opts || {};
    return this.spawn({ x, y, vx: rand(-14, 14) + (o.vx || 0), vy: (o.vy === undefined ? -26 : o.vy) + rand(-8, 8), life: o.life || [0.5, 1.1], size: o.size || [3, 7], size2: o.size2 === undefined ? 10 : o.size2, ink: o.ink || '#e8e8e8', alpha: o.alpha === undefined ? 0.5 : o.alpha, shape: 'dot', grav: o.grav === undefined ? -0.06 : o.grav, drag: 0.94, blend: o.blend || 'source-over' });
  }
  dust(x, y, opts) {
    const o = opts || {};
    return this.spawn({ x, y, vx: rand(-30, 30), vy: o.vy === undefined ? rand(-30, -6) : o.vy, life: [0.2, 0.42], size: [2, 4], size2: 6, ink: o.ink || '#cbb9a0', alpha: 0.65, grav: 0.15, drag: 0.9 });
  }
  ring(x, y, opts) {
    const o = opts || {};
    return this.spawn({ x, y, vx: 0, vy: 0, life: o.life || 0.32, size: o.size || 8, size2: o.size2 === undefined ? (o.grow === undefined ? 34 : o.grow) : o.size2, shape: 'ring', ink: o.ink || '#ffffff', alpha: o.alpha === undefined ? 0.9 : o.alpha, grav: 0, drag: 1, blend: o.blend || 'lighter', len: o.len || 0 });
  }
  shock(x, y, opts) { const o = opts || {}; return this.ring(x, y, { size: o.size || 6, size2: o.size2 || 90, life: o.life || 0.4, ink: o.ink || '#bff0ff' }); }
  streak(x1, y1, x2, y2, opts) {
    const o = opts || {};
    const a = angleof(x1, y1, x2, y2), l = dist(x1, y1, x2, y2);
    const p = this.spawn({ x: x1, y: y1, vx: 0, vy: 0, life: o.life || 0.18, size: o.size || 2, ink: o.ink || '#ffffff', shape: 'line', rot: a, len: l, grav: 0, drag: 1, alpha: o.alpha === undefined ? 0.9 : o.alpha, blend: o.blend || 'lighter' });
    return p;
  }
  star(x, y, opts) { return this.spawn({ x, y, life: [0.4, 0.9], size: [3, 6], ink: opts && opts.ink ? opts.ink : ['#fff2a8', '#ffe066', '#ffffff'], shape: 'star', grav: 0.2, drag: 0.92, spin: [-3, 3], sparkle: 1 }); }
  glowpuff(x, y, opts) { const o = opts || {}; return this.spawn({ x, y, vx: 0, vy: 0, life: o.life || [0.2, 0.5], size: o.size || [6, 14], size2: 0, ink: o.ink || '#ffe9a0', shape: 'glow', alpha: 0.6, grav: 0, drag: 0.9, blend: 'lighter' }); }
  trail(node, opts) { const e = new emitter(this, node, opts); this.tracks.push(e); return e; }
  emit(opts) { const e = new emitter(this, opts && opts.follow ? opts.follow : null, opts); this.tracks.push(e); return e; }
  stamp(x, y, opts) { return this.spawn({ x, y, vx: 0, vy: 0, life: opts && opts.life || 0.4, size: opts && opts.size || 12, shape: 'art', art: opts && opts.art, grav: 0, drag: 1, rot: opts && opts.rot || 0, spin: opts && opts.spin || 0 }); }
  pop(x, y, msg, opts) {
    const o = opts || {};
    const t = new text(msg === undefined ? '' : strt(msg), { x, y, size: o.size || 12, ink: o.ink || '#ffffff', edge: o.edge === undefined ? '#1b2233' : o.edge, edgew: o.edgew || 3, weight: o.weight || '800' });
    t.ax = 0.5;
    t.ay = 0.5;
    t.vx = o.vx === undefined ? 0 : o.vx;
    t.vy = o.vy === undefined ? -46 : o.vy;
    t.life = o.life || 0.8;
    t.t = 0;
    t.late = o.late || 0;
    t.pop = o.pop === undefined ? 1.3 : o.pop;
    t.mode = o.mode || 'float';
    t.z = o.z === undefined ? 60 : o.z;
    t.blend = o.blend || 'source-over';
    t.setscale = o.setscale;
    t.juice.sxx = t.pop;
    t.juice.syy = t.pop;
    t.jx.add('sxx', 1, 0.12, 'backout').add('syy', 1, 0.12, 'backout');
    this.pops.push(t);
    if (this.scene) this.scene.spawn(t, o.layer || this);
    return t;
  }
  number(x, y, n, opts) {
    const o = opts || {};
    const v = round(n);
    return this.pop(x, y, (o.sign && v > 0 ? '+' : '') + v, { ink: o.ink || (v < 0 ? '#ff8080' : '#ffe066'), size: o.size || 12, vy: o.vy === undefined ? -60 : o.vy, life: o.life || 0.7, edge: o.edge, edgew: o.edgew });
  }
  clear() { for (let i = 0; i < this.parts.length; i++) this.free(this.parts[i]); this.parts.length = 0; for (let i = 0; i < this.pops.length; i++) this.pops[i].kill(); this.pops.length = 0; this.tracks.length = 0; return this; }
  step(dt) {
    this.clock += dt;
    for (let i = this.parts.length - 1; i >= 0; i--) {
      const p = this.parts[i];
      p.t += dt;
      if (p.t >= p.life) { this.free(p); this.parts.splice(i, 1); continue; }
      if (p.follow) { const f = typeof p.follow === 'function' ? p.follow() : p.follow; if (f) { p.x = (f.x === undefined ? f.wx : f.x) + (p.foff ? p.foff.x : 0); p.y = (f.y === undefined ? f.wy : f.y) + (p.foff ? p.foff.y : 0); } }
      else {
        p.vx += this.gravity.x * p.grav * dt;
        p.vy += this.gravity.y * p.grav * dt;
        const dr = p.drag === 1 ? 1 : pow(clamp01(p.drag), dt * 60);
        p.vx *= dr;
        p.vy *= dr;
        if (p.wiggle) p.vx += cos(p.t * 14 + p.rot) * p.wiggle * dt * 60;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.floor && this.space && p.vy > 0 && this.space.solidat(p.x, p.y + 1)) {
          p.y -= 1;
          if (p.bounce > 0) { p.vy *= -0.4; p.bounce--; } else { p.vy = 0; p.vx *= 0.7; }
        }
      }
      p.rot += p.spin * dt;
    }
    for (let i = this.tracks.length - 1; i >= 0; i--) { const e = this.tracks[i]; e.step(dt); if (!e.live) this.tracks.splice(i, 1); }
    return this;
  }
  paint(p) {
    const n = this.parts.length;
    if (!n) return this;
    p.begin(this);
    const v = p.view;
    for (let i = 0; i < n; i++) {
      const q = this.parts[i];
      if (q.x < v.x - 64 || q.x > v.right + 64 || q.y < v.y - 64 || q.y > v.bottom + 64) continue;
      const f = q.t / q.life;
      const al = (q.fade === 0 ? 1 - f : q.fade === 1 ? f : f < 0.5 ? f * 2 : (1 - f) * 2) * q.alpha;
      if (al <= 0.002) continue;
      const size = lerp(q.size, q.size2 || q.size, ease.smooth(f));
      const ink = q.ink2 ? paint.mix(q.ink, q.ink2, f) : q.ink;
      if (q.shape === 0 || q.shape === 7) p.dot(q.x, q.y, size, size, ink, al, q.blend, q.glow);
      else if (q.shape === 1) p.box(q.x, q.y, size, size, ink, al, q.blend, q.rot);
      else if (q.shape === 2) p.ring(q.x, q.y, max(0.6, size), max(0.5, size * 0.16), ink, al, q.blend);
      else if (q.shape === 3) p.star(q.x, q.y, size, ink, al, q.blend, q.rot);
      else if (q.shape === 4) p.partart(q.art, q.frame, q.x, q.y, size, size, al, q.rot, q.blend);
      else if (q.shape === 5) p.line(q.x, q.y, q.x - cos(q.rot) * q.len, q.y - sin(q.rot) * q.len, max(0.4, size), ink, al, q.blend);
      else if (q.shape === 6) p.glow(q.x, q.y, size, ink, al, q.blend);
    }
    return this;
  }
}

class emitter {
  constructor(host, follow, opts) {
    const o = opts || {};
    this.host = host;
    this.follow = follow || null;
    this.foff = o.foff || { x: 0, y: 0 };
    this.rate = o.rate === undefined ? 40 : o.rate;
    this.left = 0;
    this.life = o.life === undefined ? 1 : o.life;
    this.t = 0;
    this.live = true;
    this.burstn = o.burst === 0 ? 0 : (o.burst || 0);
    this.settings = Object.assign({ life: [0.3, 0.6], size: [2, 4], speed: [30, 80], spread: pi * 2, dir: -pi / 2, grav: 1, drag: 0.9, ink: '#ffffff', shape: 'dot', blend: 'source-over', fade: 0, spin: [-2, 2], size2: 0 }, o);
    this.zone = o.zone || null;
    this.on = o.on !== false;
  }
  stop() { this.live = false; return this; }
  pause() { this.on = false; return this; }
  resume() { this.on = true; return this; }
  at() {
    if (this.follow) return { x: this.follow.x !== undefined ? this.follow.x + this.foff.x : 0, y: this.follow.y !== undefined ? this.follow.y + this.foff.y : 0 };
    return new vec(this.foff.x, this.foff.y);
  }
  step(dt) {
    if (!this.live) return this;
    this.t += dt;
    if (this.life > 0 && this.t >= this.life) { this.stop(); return this; }
    if (!this.on) return this;
    const s = this.settings;
    if (this.burstn > 0) {
      const pos = this.at();
      for (let i = 0; i < this.burstn; i++) this.host.spawn({ ...s, x: pos.x + rand(-(s.rx || 0), s.rx || 0), y: pos.y + rand(-(s.ry || 0), s.ry || 0) });
      this.burstn = 0;
    }
    this.left += this.rate * dt;
    const pos = this.at();
    while (this.left >= 1) {
      this.left -= 1;
      this.host.spawn({ ...s, x: pos.x + rand(-(s.rx || 0), s.rx || 0), y: pos.y + rand(-(s.ry || 0), s.ry || 0) });
    }
    return this;
  }
  onentity(n) { this.follow = n; return this; }
}
const keychar = (code, shift) => {
  if (code.slice(0, 3) === 'Key') { const c = code[3]; return shift ? c : c['toLowerCase'](); }
  if (code.slice(0, 5) === 'Digit') return code[5];
  const m = { Space: ' ', Minus: '-', Equal: '=', BracketLeft: '[', BracketRight: ']', Semicolon: ';', Quote: "'", Comma: ',', Period: '.', Slash: '/', Backslash: '\\', Backquote: '`' };
  if (m[code]) return shift && code === 'Minus' ? '_' : m[code];
  return '';
};

class theme {
  constructor(o) {
    const d = o || {};
    this.bg = paint.of(d.bg === undefined ? '#141a26' : d.bg);
    this.panel = paint.of(d.panel === undefined ? '#1e2637' : d.panel);
    this.panel2 = paint.of(d.panel2 === undefined ? '#28324a' : d.panel2);
    this.ink = paint.of(d.ink === undefined ? '#e8eefc' : d.ink);
    this.mute = paint.of(d.mute === undefined ? '#8b96ad' : d.mute);
    this.accent = paint.of(d.accent === undefined ? '#5fd0ff' : d.accent);
    this.accent2 = paint.of(d.accent2 === undefined ? '#ff9f5f' : d.accent2);
    this.ok = paint.of(d.ok === undefined ? '#66e08a' : d.ok);
    this.warn = paint.of(d.warn === undefined ? '#ffcb5f' : d.warn);
    this.bad = paint.of(d.bad === undefined ? '#ff6f8a' : d.bad);
    this.clear = paint.of(d.clear === undefined ? '#4b5670' : d.clear);
    this.face = d.face || 'sans';
    this.size = d.size || 15;
    this.radius = d.radius === undefined ? 10 : d.radius;
    this.gap = d.gap === undefined ? 8 : d.gap;
    this.pad = d.pad === undefined ? 10 : d.pad;
    this.linew = d.linew === undefined ? 2 : d.linew;
    this.shadow = d.shadow === undefined ? 0.35 : d.shadow;
    this.dur = d.dur === undefined ? 0.14 : d.dur;
    this.caps = d.caps !== false;
    this.sfx = d.sfx === undefined ? 'click' : d.sfx;
  }
  copy(o) { return new theme(Object.assign({ bg: paint.css(this.bg), panel: paint.css(this.panel), ink: paint.css(this.ink), mute: paint.css(this.mute), accent: paint.css(this.accent), face: this.face, size: this.size }, o || {})); }
}

class widget extends node {
  constructor(w = 0, h = 0, opts) {
    super(0, 0, w, h);
    this.place(opts);
    this.hover = false;
    this.press = false;
    this.focus = false;
    this.on = true;
    this.ink = null;
    this.hot = null;
    this.tip = null;
    this.onclick = null;
    this.onenter = null;
    this.onleave = null;
    this.ondown = null;
    this.onup = null;
    this.onfocus = null;
    this.sound = true;
    this.tab = 0;
    this.cursor = 'pointer';
    this.ui = null;
    this.live = true;
    this.dragging = false;
    this.hovered = 0;
  }
  place(o) {
    if (!o) return this;
    if (o.x !== undefined) this.x = o.x;
    if (o.y !== undefined) this.y = o.y;
    if (o.w !== undefined && !this.w) this.w = o.w;
    if (o.h !== undefined && !this.h) this.h = o.h;
    if (o.vis !== undefined) this.vis = o.vis;
    if (o.alpha !== undefined) this.alpha = o.alpha;
    if (o.z !== undefined) this.z = o.z;
    return this;
  }
  pick(x, y) {
    const b = this.bounds;
    if (!chainvis(this)) return false;
    return x >= b.x && x <= b.right && y >= b.y && y <= b.bottom && this.on && this.live;
  }
  fire(k, a, b, c) { const f = this[k]; if (f) f(this, a, b, c); return this; }
  get art() { return null; }
  listen(ui) { this.ui = ui; return this; }
  focusme() { if (this.ui) this.ui.focus(this); return this; }
  click() { if (!this.on) return this; if (this.ui) this.ui.click(this); this.fire('onclick'); return this; }
}

class panel extends node {
  constructor(w = 100, h = 60, opts) {
    const o = opts || {};
    super(o.x || 0, o.y || 0, o.w || w, o.h || h);
    this.fillc = o.fill === undefined ? null : paint.of(o.fill);
    this.strokec = o.stroke === undefined ? null : paint.of(o.stroke);
    this.radius = o.radius === undefined ? 10 : o.radius;
    this.linew = o.linew === undefined ? 2 : o.linew;
    this.shadowc = o.shadow === undefined ? null : paint.of(o.shadow);
    this.shadowy = o.shadowy === undefined ? 6 : o.shadowy;
    this.artp = o.art ? art.of(o.art) : null;
    this.slice = this.artp && this.artp.slice ? this.artp.slice : null;
    this.grad = o.grad ? paint.of(o.grad) : null;
    this.borderon = o.border !== false;
    this.clipk = !!o.clip;
  }
  paint(p) {
    if (p.cull(this)) return this;
    if (this.shadowc && p.gfx) {
      p.begin(this);
      p.rect(0, this.shadowy, this.w, this.h, { fill: paint.alpha(this.shadowc, this.shadowc.a * 0.5), radius: this.radius });
    }
    p.begin(this);
    if (this.artp) p.blit(this.artp, 0, 0, this.artp.w, this.artp.h, 0, 0, this.w, this.h, this);
    else if (this.grad) p.rect(0, 0, this.w, this.h, { grad: [this.fillc || this.grad, this.grad], radius: this.radius, vert: true });
    else if (this.fillc || this.strokec) p.rect(0, 0, this.w, this.h, { fill: this.fillc, stroke: this.strokec, linew: this.linew, radius: this.radius });
    if (this.clipk) this.clipkids(p);
    return this;
  }
  postdraw(p) { if (this.clipk) { p.begin(this); p.unclip(); } return this; }
}

class button extends widget {
  constructor(label = '', opts = {}) {
    super(opts.w || 0, opts.h || 34, opts);
    this.label = new text(label, { size: opts.size || 15, ink: opts.ink || '#e8eefc', align: 'center', valign: 'middle', weight: opts.weight || '700', face: opts.face });
    this.label.ax = 0;
    this.label.ay = 0;
    this.add(this.label);
    this.padx = opts.padx === undefined ? 14 : opts.padx;
    this.pady = opts.pady === undefined ? 8 : opts.pady;
    this.kind = opts.kind || 'solid';
    this.icon = opts.icon ? art.of(opts.icon) : null;
    this.autow = opts.autow !== false;
    this.squish = opts.squish === undefined ? 0.06 : opts.squish;
    this.down = false;
    this.toggled = !!opts.toggled;
    this.groupv = opts.group || null;
    this.onclick = opts.click || null;
    this.holddelay = opts.holddelay || 0;
    this.repeats = opts.repeat || 0;
    this.holdt = 0;
    this.labelink = opts.ink || null;
    this.reflow();
  }
  reflow() {
    const lw = this.label.measure(this.label.value) + this.padx * 2;
    if (this.autow && !this.w) this.w = max(24, lw);
    if (!this.h) this.h = 34;
    this.label.w = this.w;
    this.label.h = this.h;
    this.label.x = 0;
    this.label.y = this.h / 2 - this.label.size * 0.72;
    this.label.style({ ink: this.labelink || (this.on ? '#e8eefc' : '#7a8399') });
    return this;
  }
  setlabel(s) { this.label.set(s); this.reflow(); return this; }
  paint(p) {
    if (this.ink === null && this.ui) this.ink = this.ui.theme;
    const t = this.ink;
    const hot = this.on ? this.hover || this.focus : false;
    const down = this.on ? this.press : false;
    const fill = down ? (t ? t.panel2 : '#28324a') : this.toggled ? (t ? t.accent : '#5fd0ff') : hot ? (t ? paint.lite(t.panel, 0.08) : '#2a3448') : (t ? t.panel : '#1e2637');
    const stroke = this.focus ? (t ? t.accent : '#5fd0ff') : this.on ? null : (t ? paint.dark(t.panel, 0.2) : '#111');
    p.begin(this);
    p.rect(0, 0, this.w, this.h, { fill: this.toggled && this.kind === 'solid' ? fill : fill, stroke, linew: t ? t.linew : 2, radius: t ? t.radius : 10, shadow: t && t.shadow ? paint.alpha(paint.black, 0.4) : null, shadowy: 3 });
    if (this.icon) p.blit(this.icon, 0, 0, this.icon.w, this.icon.h, 4, this.h / 2 - this.icon.h / 2, this.icon.w, this.icon.h, this);
    if (this.toggled && t) this.label.style({ ink: paint.dark(t.bg, 0.1) });
    return this;
  }
  over(x, y) { return this.on && this.pick(x, y); }
}

class bar extends widget {
  constructor(opts = {}) {
    super(opts.w || 120, opts.h || 12, opts);
    this.value = opts.value === undefined ? 1 : opts.value;
    this.shown = this.value;
    this.min = opts.min === undefined ? 0 : opts.min;
    this.max = opts.max === undefined ? 1 : opts.max;
    this.fillc = opts.fill ? paint.of(opts.fill) : null;
    this.emptyc = opts.empty ? paint.of(opts.empty) : null;
    this.emitglow = opts.glow !== false;
    this.flash = 0;
    this.label = opts.label ? new text(opts.label, { size: opts.size || 12, ink: opts.ink || '#e8eefc', align: 'center', weight: '700' }) : null;
    if (this.label) { this.label.ax = 0; this.label.ay = 0; this.add(this.label); }
    this.radius = opts.radius === undefined ? 6 : opts.radius;
    this.vertical = !!opts.vertical;
    this.inkflash = 0;
  }
  set(v) {
    const nv = clamp(v, this.min, this.max);
    if (nv < this.value) this.flash = 0.35;
    this.value = nv;
    return this;
  }
  paint(p) {
    if (this.ink === null && this.ui) this.ink = this.ui.theme;
    const t = this.ink;
    const f = clamp01((this.shown - this.min) / max(0.0001, this.max - this.min));
    const fill = this.fillc || (t ? (f < 0.25 ? t.bad : f < 0.55 ? t.warn : t.ok) : '#66e08a');
    p.begin(this);
    p.rect(0, 0, this.w, this.h, { fill: this.emptyc || (t ? paint.dark(t.panel, 0.35) : '#10151f'), radius: this.radius, stroke: t ? paint.alpha(t.ink, 0.12) : null, linew: 1 });
    const w2 = this.w * f, h2 = this.h * f;
    if (f > 0) {
      if (this.vertical) p.rect(0, this.h - h2, this.w, h2, { fill, radius: this.radius });
      else p.rect(0, 0, w2, this.h, { fill, radius: this.radius });
    }
    if (this.flash > 0 && this.emitglow) p.rect(0, 0, this.vertical ? this.w : w2, this.vertical ? h2 : this.h, { stroke: paint.alpha(paint.white, this.flash * 2), linew: 2, radius: this.radius });
    if (this.label) {
      this.label.w = this.w;
      this.label.h = this.h;
      this.label.x = 0;
      this.label.y = this.h / 2 - this.label.size * 0.7;
    }
    return this;
  }
  step(dt) { this.shown = damp(this.shown, this.value, 12, dt); if (this.flash > 0) this.flash -= dt; return this; }
}

class slider extends widget {
  constructor(opts = {}) {
    super(opts.w || 160, opts.h || 20, opts);
    this.min = opts.min === undefined ? 0 : opts.min;
    this.max = opts.max === undefined ? 1 : opts.max;
    this.value = opts.value === undefined ? 0.5 : opts.value;
    this.lock = opts.lock || 0;
    this.onchange = opts.change || null;
    this.radius = opts.radius === undefined ? 8 : opts.radius;
    this.track = opts.track ? paint.of(opts.track) : null;
    this.fillc = opts.fill ? paint.of(opts.fill) : null;
    this.label = opts.label ? new text(opts.label, { size: 12, ink: opts.ink || '#e8eefc', weight: '700' }) : null;
    if (this.label) { this.label.ax = 0; this.label.ay = 0; this.add(this.label); }
    this.shown = this.get();
  }
  get() { return this.min + (this.max - this.min) * clamp01(this.value); }
  setfrac(f) { const v = clamp01(f); this.value = v; if (this.onchange) this.onchange(this, this.get()); return this; }
  paint(p) {
    if (this.ink === null && this.ui) this.ink = this.ui.theme;
    const t = this.ink;
    const f = clamp01(this.value);
    p.begin(this);
    const cy = this.h / 2;
    p.rect(0, cy - 3, this.w, 6, { fill: this.track || (t ? paint.dark(t.panel, 0.4) : '#10151f'), radius: 3 });
    p.rect(0, cy - 3, this.w * f, 6, { fill: this.fillc || (t ? t.accent : '#5fd0ff'), radius: 3 });
    const kb = this.h * 0.62;
    p.rect(clamp(this.w * f - kb / 2, 0, this.w - kb), cy - kb / 2, kb, kb, { fill: t ? t.ink : '#fff', radius: kb / 2, shadow: paint.alpha(paint.black, 0.4), shadowy: 2 });
    if (this.label) { this.label.y = -this.label.size - 4; this.label.x = 0; }
    return this;
  }
  dragto(x) {
    const b = this.bounds;
    const f = clamp01((x - b.x) / max(1, this.w));
    this.setfrac(f);
    return this;
  }
  paintlabel() { return this; }
}

class checked extends widget {
  constructor(opts = {}) {
    super(opts.w || 24, opts.h || 24, opts);
    this.value = !!opts.value;
    this.onchange = opts.change || null;
    this.size2 = opts.size || 18;
    this.inkoff = null;
  }
  set(v) { this.value = !!v; if (this.onchange) this.onchange(this, this.value); return this; }
  click() { if (!this.on) return this; this.set(!this.value); return super.click(); }
  paint(p) {
    if (this.ink === null && this.ui) this.ink = this.ui.theme;
    const t = this.ink;
    const s = this.size2;
    const x = (this.w - s) / 2, y = (this.h - s) / 2;
    p.begin(this);
    p.rect(x, y, s, s, { fill: this.value ? (t ? t.accent : '#5fd0ff') : (t ? paint.dark(t.panel, 0.2) : '#1e2637'), stroke: this.hover || this.focus ? (t ? t.ink : '#fff') : (t ? paint.alpha(t.ink, 0.25) : null), linew: 2, radius: 5 });
    if (this.value) {
      p.line(x + s * 0.22, y + s * 0.52, x + s * 0.44, y + s * 0.74, 2.6, t ? t.bg : '#111', 1);
      p.line(x + s * 0.44, y + s * 0.74, x + s * 0.8, y + s * 0.26, 2.6, t ? t.bg : '#111', 1);
    }
    return this;
  }
}

class field extends widget {
  constructor(opts = {}) {
    super(opts.w || 180, opts.h || 30, opts);
    this.value = opts.value || '';
    this.placeholder = opts.placeholder || '';
    this.mask = !!opts.mask;
    this.maxlen = opts.maxlen || 64;
    this.onchange = opts.change || null;
    this.onenter = opts.enter || null;
    this.cur = this.value.length;
    this.blink = 0;
    this.numeric = !!opts.numeric;
    this.fontsize = opts.size || 14;
    this.txt = new text('', { size: this.fontsize, ink: opts.ink || '#ffffff', weight: '500' });
    this.txt.ax = 0;
    this.txt.ay = 0;
    this.add(this.txt);
    this.refresh();
  }
  refresh() {
    const shown = this.mask ? strt(this.value).replace(/./g, '\u2022') : this.value;
    this.txt.set(shown.length ? shown : this.placeholder);
    this.txt.style({ ink: shown.length ? (this.ink ? this.ink.ink : '#ffffff') : (this.ink ? this.ink.mute : '#8892a6') });
    this.txt.x = 10;
    this.txt.y = this.h / 2 - this.fontsize * 0.72;
    return this;
  }
  type(ch) {
    if (ch === '\b') { if (this.cur > 0) { this.value = this.value.slice(0, this.cur - 1) + this.value.slice(this.cur); this.cur--; } }
    else if (ch === 'Del') { this.value = this.value.slice(0, this.cur) + this.value.slice(this.cur + 1); }
    else if (ch === 'ArrowLeft') this.cur = max(0, this.cur - 1);
    else if (ch === 'ArrowRight') this.cur = min(this.value.length, this.cur + 1);
    else if (ch === 'Home') this.cur = 0;
    else if (ch === 'End') this.cur = this.value.length;
    else if (ch && this.value.length < this.maxlen) {
      if (this.numeric && !(ch >= '0' && ch <= '9')) return this;
      this.value = this.value.slice(0, this.cur) + ch + this.value.slice(this.cur);
      this.cur++;
    }
    this.refresh();
    if (this.onchange) this.onchange(this, this.value);
    return this;
  }
  paint(p) {
    if (!this.ink && this.ui) this.ink = this.ui.theme;
    const t = this.ink;
    p.begin(this);
    p.rect(0, 0, this.w, this.h, { fill: t ? paint.dark(t.panel, 0.25) : '#161d29', stroke: this.focus ? (t ? t.accent : '#5fd0ff') : (t ? paint.alpha(t.ink, 0.2) : null), linew: 2, radius: t ? t.radius * 0.7 : 8 });
    if (this.focus && fract(this.blink * 1.4) < 0.6) {
      const shown = this.mask ? strt(this.value).replace(/./g, '\u2022') : this.value;
      const tw = this.txt.measure(shown.slice(0, this.cur));
      p.rect(10 + tw + 1, this.h * 0.2, 1.6, this.h * 0.6, { fill: t ? t.accent : '#5fd0ff' });
    }
    return this;
  }
  step(dt) { this.blink += dt; return this; }
  postdraw(p) { return this; }
}

const fthis = (t) => t;

class scroll extends widget {
  constructor(opts = {}) {
    super(opts.w || 200, opts.h || 200, opts);
    this.content = opts.content || null;
    this.offy = 0;
    this.offx = 0;
    this.vel = 0;
    this.scrollx = opts.scrollx !== false && opts.scrolly === false;
    this.scrolly = opts.scrolly !== false;
    this.clamp = !!opts.clamp;
    this.barthick = opts.barthick || 5;
    this.grab = false;
    this.gx = 0;
    this.gy = 0;
    this.grabbed = false;
    if (this.content) { this.add(this.content); this.content.scrollhost = this; }
    this.barink = opts.bar ? paint.of(opts.bar) : null;
  }
  inner() { const c = this.content; return c ? { w: c.w, h: c.h } : { w: this.w, h: this.h }; }
  maxy() { return max(0, this.inner().h - this.h); }
  maxx() { return max(0, this.inner().w - this.w); }
  move(y) { this.offy = clamp(y, 0, this.maxy()); return this; }
  paint(p) {
    if (this.ink === null && this.ui) this.ink = this.ui.theme;
    p.begin(this);
    p.clipset(this, this.w, this.h);
    if (this.content) {
      this.content.y = -this.offy;
      this.content.x = -this.offx;
    }
    return this;
  }
  postdraw(p) {
    p.begin(this);
    p.unclip();
    const t = this.ink;
    if (this.scrolly && this.maxy() > 0) {
      const f = this.h / max(1, this.inner().h);
      const bh = max(24, this.h * f);
      const by = (this.h - bh) * (this.offy / this.maxy());
      p.rect(this.w - this.barthick - 2, by, this.barthick, bh, { fill: this.barink || (t ? paint.alpha(t.mute, 0.55) : '#888'), radius: this.barthick / 2 });
    }
    return this;
  }
  wheel(d) { this.vel += d * 0.6; return this; }
  step(dt) {
    if (!this.grabbed) {
      this.offy = clamp(this.offy + this.vel * dt, 0, this.maxy());
      this.vel = damp(this.vel, 0, 8, dt);
    }
    return this;
  }
}

class tooltip extends node {
  constructor(txt = '', opts = {}) {
    super(0, 0, 0, 0);
    const o = opts || {};
    this.t = new text(txt, { size: o.size || 12, ink: o.ink || '#ffffff', weight: '600' });
    this.box = new panel(this.t.w + 16, this.t.h + 10, { fill: o.fill || 'rgba(12,16,24,0.94)', stroke: o.stroke || 'rgba(255,255,255,0.16)', radius: 7 });
    this.box.add(this.t);
    this.t.x = 8;
    this.t.y = 5;
    this.add(this.box);
    this.vis = false;
    this.life = 0;
    this.ax = 0;
    this.ay = 0;
  }
  set(txt) { this.t.set(txt); this.box.w = this.t.w + 16; this.box.h = this.t.h + 10; return this; }
  show(x, y) { this.x = x; this.y = y; this.vis = true; this.life = 0; return this; }
  hide() { this.vis = false; return this; }
}

class toast extends node {
  constructor(txt, opts = {}) {
    super(0, 0, 0, 0);
    const o = opts || {};
    this.t = new text(txt, { size: o.size || 14, ink: o.ink || '#ffffff', align: 'center', weight: '700' });
    this.box = new panel(this.t.w + 28, this.t.h + 16, { fill: o.fill || 'rgba(16,22,34,0.92)', stroke: o.stroke || 'rgba(255,255,255,0.14)', radius: 12 });
    this.t.x = 14;
    this.t.y = 8;
    this.box.add(this.t);
    this.add(this.box);
    this.ax = 0.5;
    this.ay = 1;
    this.life = o.life || 2.4;
    this.t2 = 0;
    this.juice.oy = 20;
    this.jx.add('oy', 0, 0.24, 'backout');
    this.juice.al = 0;
    this.jx.add('al', 1, 0.2, 'quadout');
    this.mode = o.mode || 'up';
  }
  step(dt) {
    this.t2 += dt;
    if (this.t2 > this.life - 0.4) this.alpha = clamp01((this.life - this.t2) / 0.4);
    if (this.t2 >= this.life) this.kill();
    return this;
  }
}

function chainvis(n) { let a = n; while (a) { if (!a.vis) return false; a = a.dad; } return true; }
function within(n, root) { let a = n; while (a) { if (a === root) return true; a = a.dad; } return false; }

class ui extends group {
  constructor(opts = {}) {
    super(0, 0);
    const o = opts || {};
    this.theme = o.theme instanceof theme ? o.theme : new theme(o.theme);
    this.depth = o.depth === undefined ? 10 : o.depth;
    this.z = o.z === undefined ? 1000 : o.z;
    this.layer = this.depth;
    this.widgets = [];
    this.focused = null;
    this.hovered = null;
    this.pressed = null;
    this.pointer = new vec();
    this.hotx = 0;
    this.clock = 0;
    this.game = null;
    this.enabled = true;
    this.toasts = [];
    this.x = 0;
    this.y = 0;
    this.input = null;
    this.tip = null;
    this.host = null;
    this.blocker = null;
    this.focusnav = [];
    this.wasany = false;
    this.ctx = new bus();
    this.dragging = null;
    this.openpanels = [];
  }
  pick() { return this; }
  topfull() {
    if (!this.fulls) return null;
    let top = null;
    for (let i = 0; i < this.fulls.length; i++) {
      const f = this.fulls[i];
      if (f && f.vis && (!top || f.z >= top.z)) top = f;
    }
    return top;
  }
  scan(n) {
    this.widgets = [];
    const walk = (a) => { if (a instanceof widget) this.widgets.push(a); if (a.kids) for (let i = 0; i < a.kids.length; i++) walk(a.kids[i]); };
    walk(n || this);
    this.widgets.sort((a, b) => b.z - a.z || b.layer - a.layer);
    return this;
  }
  add(a) {
    const r = super.add(a);
    if (a instanceof widget) { a.listen(this); this.scan(); }
    if (a instanceof widget && !a.ink) a.ink = this.theme;
    return r;
  }
  focus(w) {
    if (this.focused === w) return this;
    if (this.focused) { this.focused.focus = false; if (this.focused.onleave) this.focused.onleave(this.focused); }
    this.focused = w;
    if (w) { w.focus = true; if (w.onfocus) w.onfocus(w); }
    return this;
  }
  click(w) {
    this.ctx.fire('click', w);
    if (this.theme.sfx && this.audio) this.audio.play(this.theme.sfx);
    this.focus(w);
    return this;
  }
  pointerat(x, y) { return x >= 0 && y >= 0 && x <= this.w && y <= this.h; }
  consume() { if (this.input) this.input.mouse.used = true; return this; }
  button(label, opts) { const b = new button(label === undefined ? '' : label, opts || {}); b.ink = this.theme; this.add(b); return b; }
  label(txt, opts) { const o = opts || {}; const t = new text(txt, { size: o.size || this.theme.size, ink: o.ink || this.theme.ink, weight: o.weight || '600', align: o.align || 'left', maxw: o.maxw || 0, lineh: o.lineh || 1.3, edge: o.edge, edgew: o.edgew }); t.ink = this.theme; this.add(t); return t; }
  title(txt, opts) { const o = opts || {}; return this.label(txt, Object.assign({ size: this.theme.size * 1.5, weight: '800', ink: this.theme.accent }, o)); }
  pane(w, h, opts) { const o = opts || {}; const p2 = new panel(w, h, { fill: o.fill || this.theme.panel, stroke: o.stroke || paint.alpha(this.theme.ink, 0.14), radius: o.radius === undefined ? this.theme.radius * 1.4 : o.radius, shadow: o.shadow === undefined ? paint.alpha(paint.black, this.theme.shadow) : o.shadow, art: o.art, clip: o.clip, grad: o.grad }); p2.ink = this.theme; this.add(p2); return p2; }
  progress(opts) { const b = new bar(Object.assign({ fill: paint.css(this.theme.ok), empty: paint.css(paint.dark(this.theme.panel, 0.35)) }, opts || {})); b.ink = this.theme; this.add(b); return b; }
  barbar(opts) { return this.progress(opts); }
  slider(opts) { const s = new slider(opts || {}); s.ink = this.theme; this.add(s); return s; }
  sliderr(opts) { return this.slider(opts); }
  check(opts) { const c = new checked(opts || {}); c.ink = this.theme; this.add(c); return c; }
  checkbox(opts) { return this.check(opts); }
  textfield(opts) { const f = new field(opts || {}); f.ink = this.theme; this.add(f); return f; }
  field(opts) { return this.textfield(opts); }
  scroller(opts) {
    const s = new scroll(opts || {});
    s.ink = this.theme;
    s.content = s.content || new group(0, 0);
    s.add(s.content);
    this.add(s);
    return s;
  }
  scrollview(opts) { return this.scroller(opts); }
  listbox(items, opts) {
    const o = opts || {};
    const g = new group(0, 0);
    this.add(g);
    const bw = o.w || 180;
    const bh = o.h || 30;
    let y = 0;
    const list = [];
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const b = new button(it.label === undefined ? it : it.label, { w: bw, h: bh, click: it.click || (o.click ? (bb) => o.click(bb, it, i) : null), ink: paint.css(this.theme.ink) });
      b.ink = this.theme;
      b.y = y;
      y += bh + (o.gap === undefined ? this.theme.gap / 2 : o.gap);
      g.add(b);
      list.push(b);
    }
    g.w = bw;
    g.h = y;
    return { box: g, buttons: list };
  }
  toastup(txt, opts) {
    const t = new toast(txt, opts);
    t.x = (this.w || 640) / 2 + ((opts && opts.x) || 0);
    t.y = (opts && opts.y) || (this.h || 360) - 30 - this.toasts.length * 44;
    this.add(t);
    this.toasts.push(t);
    this.scan();
    return t;
  }
  tooltip(txt, x, y) {
    if (!this.tip) { this.tip = new tooltip(txt); this.add(this.tip); this.scan(); }
    this.tip.set(txt);
    this.tip.show(x === undefined ? this.pointer.x + 14 : x, y === undefined ? this.pointer.y + 16 : y);
    return this.tip;
  }
  hidetip() { if (this.tip) this.tip.hide(); return this; }
  hoveredsince() { return this.hovered ? this.hovered.hovered : 0; }
  nav(dir) {
    const l = this.widgets.filter((w) => w.on && w.live && w.tab >= 0 && chainvis(w) && !(this.topfull() && !within(w, this.topfull())));
    if (!l.length) return this;
    const i = l.indexOf(this.focused);
    const n = l.length;
    let j = i;
    if (dir === 'next' || dir > 0) j = (i + 1) % n;
    else if (dir === 'prev' || dir < 0) j = (i - 1 + n) % n;
    if (j !== i) this.focus(l[j]);
    return this;
  }
  step(dt) {
    this.clock += dt;
    if (this.fulls) this.layoutfull();
    if (this.scene && this.scene.uidirty) { this.scene.uidirty = false; this.scan(); }
    const scope = this.topfull();
    if (this.input) {
      const m = this.input.mouse;
      this.pointer.set(m.x, m.y);
      const t = this.input.touches;
      if (t.count) this.pointer.set(t.list[0].x, t.list[0].y);
    }
    const px = this.pointer.x, py = this.pointer.y;
    let top = null;
    for (let i = 0; i < this.widgets.length; i++) {
      const w = this.widgets[i];
      if (!w.on || !w.live) continue;
      if (scope && !within(w, scope)) continue;
      if (w.pick(px, py)) { top = w; break; }
    }
    if (top !== this.hovered) {
      if (this.hovered) { this.hovered.hover = false; this.hovered.fire('onleave'); }
      this.hovered = top;
      if (top) { top.hover = true; top.fire('onenter'); if (top.tip) this.tooltip(top.tip, px + 14, py + 18); else this.hidetip(); }
      else this.hidetip();
    }
    if (this.hovered && this.hovered.hovered !== undefined) this.hovered.hovered += dt;
    if (this.hovered && this.hovered.tip && this.hoveredsince() > 0.5) this.tooltip(this.hovered.tip, px + 14, py + 18);
    if (this.enabled && this.input) {
      const down = this.input.mouse.hits[0] || this.input.touches.just.length > 0;
      const up = this.input.mouse.lets[0] || this.input.touches.gone.length > 0;
      if (down) {
        if (this.hovered) {
          this.pressed = this.hovered;
          this.hovered.press = true;
          this.hovered.dragging = true;
          this.hovered.fire('ondown', px, py);
          this.consume();
          if (this.hovered.autow !== undefined) this.hovered.down = true;
          this.dragging = this.hovered;
        }
      }
      if (up) {
        if (this.pressed && this.pressed === this.hovered) { this.pressed.press = false; this.pressed.click(); }
        else if (this.pressed) { this.pressed.press = false; this.pressed.fire('onup'); }
        if (this.pressed) this.pressed.dragging = false;
        this.pressed = null;
        this.dragging = null;
      }
      if (this.pressed && this.pressed instanceof slider && this.input.mouse.is(0)) this.pressed.dragto(px);
      for (let i = 0; i < this.widgets.length; i++) {
        const w = this.widgets[i];
        if (w instanceof scroll && w.pick(px, py) && this.input.mouse.wheel) w.wheel(this.input.mouse.wheel);
      }
    }
    if (this.input) {
      const k = this.input.keys;
      if (k.hit('Tab') || k.hit('ArrowDown') || k.hit('ArrowUp')) {
        if (this.focused && this.focused instanceof field) { }
        else this.nav(k.hit('ArrowUp') ? -1 : 1);
      }
      if (k.typed) { if (this.focused instanceof field) for (let i = 0; i < k.typed.length; i++) this.focused.type(k.typed[i]); k.typed = ''; }
      if (this.focused) {
        const f = this.focused;
        if (f instanceof field) {
          if (k.hit('Backspace')) f.type('\b');
          if (k.hit('Delete')) f.type('Del');
          if (k.hit('ArrowLeft')) f.type('ArrowLeft');
          if (k.hit('ArrowRight')) f.type('ArrowRight');
          if (k.hit('Home')) f.type('Home');
          if (k.hit('End')) f.type('End');
          if (k.hit('Enter') && f.onenter) f.onenter(f, f.value);
        }
        if (k.hit('Enter') || k.hit('Space')) { if (f instanceof button || f instanceof checked) f.click(); }
      }
    }
    for (let i = 0; i < this.toasts.length; i++) if (!this.toasts[i].live) this.toasts.splice(i, 1);
    return this;
  }
  textype(ch) { if (this.focused instanceof field) this.focused.type(ch); return this; }
  modal(build, opts) {
    const o = opts || {};
    const back = new panel(this.w || 640, this.h || 360, { fill: o.back === undefined ? paint.alpha(paint.black, 0.55) : paint.of(o.back), radius: 0 });
    back.full = true;
    (this.fulls || (this.fulls = [])).push(back);
    back.z = 500;
    back.ax = 0;
    back.ay = 0;
    const holder = new group(0, 0);
    back.add(holder);
    this.add(back);
    const dialog = new panel(o.w || min(360, this.w - 40), o.h || 200, { fill: this.theme.panel, stroke: paint.alpha(this.theme.ink, 0.16), radius: this.theme.radius * 1.6, shadow: paint.alpha(paint.black, 0.5) });
    dialog.ink = this.theme;
    dialog.x = (this.w - dialog.w) / 2;
    dialog.y = (this.h - dialog.h) / 2;
    holder.add(dialog);
    const close = () => { holder.kill(); back.kill(); this.scan(); if (o.close) o.close(); };
    if (build) build(dialog, close, back);
    this.scan();
    this.layoutfull();
    return { back, dialog, holder, close };
  }
  layoutfull() {
    if (!this.fulls) return this;
    for (let i = 0; i < this.fulls.length; i++) {
      const b = this.fulls[i];
      if (!b.live) continue;
      if (this.w) b.w = this.w;
      if (this.h) b.h = this.h;
      const g2 = b.kids && b.kids[0];
      const d = g2 && g2.kids && g2.kids[0];
      if (d) { d.x = (b.w - d.w) / 2; d.y = (b.h - d.h) / 2; }
    }
    return this;
  }
  openpanel(p2) { p2.vis = true; this.openpanels.push(p2); this.scan(); return this; }
  closepanel(p2) { const i = this.openpanels.indexOf(p2); if (i >= 0) this.openpanels.splice(i, 1); p2.vis = false; this.scan(); return this; }
}
class brush {
  constructor(canvas, opts) {
    const o = opts || {};
    this.canvas = canvas;
    this.dpr = 1;
    this.cam = new mat();
    this.tmpm = new mat();
    this.tmpd = new mat();
    this.view = new box();
    this.alpha = 1;
    this.blend = 'source-over';
    this.clock = 0;
    this.stats = { ops: 0, quads: 0, textures: 0, flushes: 0, culled: 0 };
    this.showstats = false;
    this.smooth = o.smooth === undefined ? true : o.smooth;
    this.pixel = o.pixel || 0;
    this.hitstop = 0;
    this.slows = 1;
    this.clipd = 0;
    this.whoset = null;
    this.gpu = false;
    this.frame = 0;
    this.width = canvas ? canvas['width'] : 0;
    this.height = canvas ? canvas['height'] : 0;
    this.scale = 1;
    this.offx = 0;
    this.offy = 0;
    this.bakes = [];
    this.textcache = new mapc();
    this.tempcanvas = null;
  }
  get gfx() { return null; }
  resize(w, h, dpr) {
    this.dpr = dpr || 1;
    this.scale = this.dpr;
    if (this.canvas) {
      this.canvas['width'] = max(1, round(w * this.dpr));
      this.canvas['height'] = max(1, round(h * this.dpr));
      if (this.canvas['style']) { this.canvas['style']['width'] = w + 'px'; this.canvas['style']['height'] = h + 'px'; }
    }
    this.width = this.canvas ? this.canvas['width'] : w;
    this.height = this.canvas ? this.canvas['height'] : h;
    this.view.set(0, 0, w, h);
    this.dpr = this.dpr;
    return this;
  }
  setcam(cam) {
    if (this.dpr !== 1) { this.tmpd.pos(0, 0, 0, this.dpr, this.dpr).mul(cam); this.cam.setfrom(this.tmpd); }
    else this.cam.setfrom(cam);
    return this;
  }
  viewbox(b, cam) {
    const m = cam || this.cam;
    const v = this.view;
    if (!m) { v.set(0, 0, this.width / this.scale, this.height / this.scale); return v; }
    m.invert(this.tmpm);
    const p0 = this.tmpm.apply(0, 0, new vec());
    const p1 = this.tmpm.apply(this.width, this.height, new vec());
    v.x = min(p0.x, p1.x);
    v.y = min(p0.y, p1.y);
    v.w = abs(p1.x - p0.x);
    v.h = abs(p1.y - p0.y);
    return v;
  }
  cull(n, pad) {
    if (!n || n.w === 0 && n.h === 0 && !n.kids) return false;
    const p2 = pad === undefined ? 0 : pad;
    const b = n.bounds;
    const v = this.view;
    if (b.x - p2 > v.right || b.right + p2 < v.x || b.y - p2 > v.bottom || b.bottom + p2 < v.y) { this.stats.culled++; return true; }
    return false;
  }
  alphaof(n) { return clamp01((n ? n.alpha : 1) * (n && n.juice ? n.juice.al : 1)); }
  begin(n) { return null; }
  canbefore() { return this.gpu; }
  beginframe(bg) {
    this.frame++;
    this.stats.ops = 0;
    this.stats.quads = 0;
    this.stats.flushes = 0;
    this.stats.culled = 0;
    return this;
  }
  endframe() { return this; }
  blit() { return this; }
  nineblit() { return this; }
  rect() { return this; }
  line() { return this; }
  dot() { return this; }
  box() { return this; }
  ring() { return this; }
  star() { return this; }
  glow() { return this; }
  partart() { return this; }
  text() { return this; }
  clipset() { return this; }
  unclip() { return this; }
  raster() { return null; }
  bake() { return null; }
  pixellit() { return this; }
}

const blendmap = { 'source-over': 'source-over', lighter: 'lighter', multiply: 'multiply', screen: 'screen', overlay: 'overlay', soft: 'soft-light', hard: 'hard-light', darken: 'darken', lighten: 'lighten', inset: 'source-in', out: 'destination-out', atop: 'source-atop', xor: 'xor', add: 'lighter' };

class canvaspain extends brush {
  constructor(canvas, opts) {
    super(canvas, opts);
    this.c2 = canvas['getContext']('2d', { alpha: (opts && opts.alpha) !== false, desynchronized: true });
    if (opts && opts.alpha === false) { }
    this.gpu = false;
    this.hits = [];
  }
  static make(w, h, opts) {
    const c = elm('canvas');
    c.width = max(1, round(w));
    c.height = max(1, round(h));
    return new canvaspain(c, opts);
  }
  get gfx() { return this.c2; }
  beginframe(bg) {
    super.beginframe(bg);
    const g = this.c2;
    g['setTransform'](1, 0, 0, 1, 0, 0);
    if (bg) { g['fillStyle'] = paint.css(bg); g['fillRect'](0, 0, this.canvas['width'], this.canvas['height']); }
    else g['clearRect'](0, 0, this.canvas['width'], this.canvas['height']);
    this.smstate = undefined;
    this.clipd = 0;
    return this;
  }
  setstate(alpha, blend) {
    const g = this.c2;
    if (this.alpha !== alpha) { g['globalAlpha'] = alpha; this.alpha = alpha; }
    const bl = blendmap[blend] || blend || 'source-over';
    if (this.blend !== bl) { g['globalCompositeOperation'] = bl === 'source-in' ? 'source-in' : bl; this.blend = bl; }
    return this;
  }
  begin(n) {
    this.stats.ops++;
    if (n) {
      this.tmpm.setfrom(this.cam).mul(n.world);
      this.tmpm.write(this.c2);
      this.setstate(this.alphaof(n), n.blend);
    } else { this.cam.write(this.c2); this.setstate(1, 'source-over'); }
    return this.c2;
  }
  blit(a, sx, sy, sw, sh, dx, dy, dw, dh, n, opts) {
    const g = this.c2;
    if (!a || !a.canvas) return this;
    let aa = a;
    const jj = n ? n.juice : null;
    if (jj && jj.tint && jj.ta > 0.01) aa = a.tint(paint.mix({ r: 255, g: 255, b: 255, a: 1 }, jj.tint, clamp01(jj.ta)));
    const o = opts || {};
    const fx = n && n.flipx;
    const fy = n && n.flipy;
    let smv = o.smooth === undefined ? (aa.smooth === true ? true : aa.smooth === false ? false : this.smooth) : o.smooth;
    if (this.smoothforce) smv = this.smoothforce > 0;
    if (this.smstate !== smv) { g['imageSmoothingEnabled'] = smv; this.smstate = smv; }
    this.stats.quads++;
    if (fx || fy) {
      g['save']();
      g['translate'](dx + (fx ? dw : 0), dy + (fy ? dh : 0));
      g['scale'](fx ? -1 : 1, fy ? -1 : 1);
      g['drawImage'](aa.canvas, sx, sy, sw, sh, 0, 0, dw, dh);
      g['restore']();
    } else {
      g['drawImage'](aa.canvas, sx, sy, sw, sh, dx, dy, dw, dh);
    }
    return this;
  }
  nineblit(a, sx, sy, sw, sh, l, tp, r, b, dx, dy, dw, dh, n) {
    const g = this.c2;
    this.stats.quads++;
    const ix = max(0, dw - l - r), iy = max(0, dh - tp - b);
    const mx = max(1, sw - l - r), my = max(1, sh - tp - b);
    const dr = [dx, dx + l, dx + dw - r], drw = [l, ix, r];
    const dy2 = [dy, dy + tp, dy + dh - b], dh2 = [tp, iy, b];
    const sr = [sx, sx + l, sx + sw - r], srw = [l, mx, r];
    const sy2 = [sy, sy + tp, sy + sh - b], sh2 = [tp, my, b];
    for (let i = 0; i < 3; i++) for (let k = 0; k < 3; k++) {
      if (drw[i] <= 0 || dh2[k] <= 0) continue;
      g['drawImage'](a.canvas, sr[i], sy2[k], srw[i], sh2[k], dr[i], dy2[k], drw[i], dh2[k]);
    }
    return this;
  }
  rect(dx, dy, w, h, opts) {
    const g = this.c2;
    const o = opts || {};
    if (o.shadow && o.shadowy) {
      g['save']();
      g['shadowColor'] = paint.css(o.shadow);
      g['shadowBlur'] = o.shadowy;
      g['shadowOffsetY'] = o.shadowy;
      g['fillStyle'] = paint.css(o.fill || paint.black);
      if (o.radius) { g.beginPath(); rrpath(g, dx, dy, w, h, o.radius); g.fill(); } else g['fillRect'](dx, dy, w, h);
      g['restore']();
    }
    if (o.grad) {
      g['save']();
      const gr = paint.grad(g, new box(dx, dy, w, h), o.grad, o.vert);
      g['fillStyle'] = gr;
      if (o.radius) { g.beginPath(); rrpath(g, dx, dy, w, h, o.radius); g.fill(); } else g['fillRect'](dx, dy, w, h);
      g['restore']();
    } else if (o.fill) {
      g['fillStyle'] = paint.css(o.fill);
      if (o.radius) { g.beginPath(); rrpath(g, dx, dy, w, h, o.radius); g.fill(); } else g['fillRect'](dx, dy, w, h);
    }
    if (o.stroke) {
      g['strokeStyle'] = paint.css(o.stroke);
      g['lineWidth'] = o.linew || 1;
      if (o.radius) { g.beginPath(); rrpath(g, dx + 0.5, dy + 0.5, w - 1, h - 1, o.radius); g.stroke(); }
      else g['strokeRect'](dx + 0.5, dy + 0.5, w - 1, h - 1);
    }
    this.stats.quads++;
    return this;
  }
  line(x1, y1, x2, y2, w, ink, alpha, blend) {
    const g = this.c2;
    g['save']();
    g['globalAlpha'] = clamp01((alpha === undefined ? 1 : alpha) * this.alpha);
    if (blend) g['globalCompositeOperation'] = blendmap[blend] || blend;
    g['strokeStyle'] = paint.css(ink);
    g['lineWidth'] = w;
    g['lineCap'] = 'round';
    g.beginPath();
    g['moveTo'](x1, y1);
    g['lineTo'](x2, y2);
    g.stroke();
    g['restore']();
    return this;
  }
  dot(x, y, w, h, ink, alpha, blend, glow) {
    const g = this.c2;
    g['save']();
    g['globalAlpha'] = clamp01((alpha === undefined ? 1 : alpha) * this.alpha);
    if (blend) g['globalCompositeOperation'] = blendmap[blend] || blend;
    g['fillStyle'] = paint.css(ink);
    if (glow) g['shadowBlur'] = max(w, h) * 1.4, g['shadowColor'] = paint.css(ink);
    g['fillRect'](x - w / 2, y - h / 2, w, h);
    g['restore']();
    return this;
  }
  box(x, y, w, h, ink, alpha, blend, rot) {
    const g = this.c2;
    g['save']();
    g['globalAlpha'] = clamp01((alpha === undefined ? 1 : alpha) * this.alpha);
    if (blend) g['globalCompositeOperation'] = blendmap[blend] || blend;
    g['fillStyle'] = paint.css(ink);
    if (rot) { g['translate'](x, y); g['rotate'](rot); g['fillRect'](-w / 2, -h / 2, w, h); }
    else g['fillRect'](x - w / 2, y - h / 2, w, h);
    g['restore']();
    return this;
  }
  ring(x, y, r, lw, ink, alpha, blend) {
    const g = this.c2;
    g['save']();
    g['globalAlpha'] = clamp01((alpha === undefined ? 1 : alpha) * this.alpha);
    if (blend) g['globalCompositeOperation'] = blendmap[blend] || blend;
    g['strokeStyle'] = paint.css(ink);
    g['lineWidth'] = lw;
    g.beginPath();
    g['arc'](x, y, r, 0, tau);
    g.stroke();
    g['restore']();
    return this;
  }
  star(x, y, r, ink, alpha, blend, rot) {
    const g = this.c2;
    g['save']();
    g['globalAlpha'] = clamp01((alpha === undefined ? 1 : alpha) * this.alpha);
    if (blend) g['globalCompositeOperation'] = blendmap[blend] || blend;
    g['fillStyle'] = paint.css(ink);
    g['translate'](x, y);
    g['rotate'](rot || 0);
    g.beginPath();
    for (let k = 0; k < 10; k++) {
      const a = (k / 10) * tau;
      const rr = k % 2 ? r * 0.45 : r;
      const xx = cos(a) * rr, yy = sin(a) * rr;
      if (k === 0) g['moveTo'](xx, yy); else g['lineTo'](xx, yy);
    }
    g.closePath();
    g.fill();
    g['restore']();
    return this;
  }
  glow(x, y, r, ink, alpha, blend) {
    const g = this.c2;
    g['save']();
    g['globalAlpha'] = clamp01((alpha === undefined ? 1 : alpha) * this.alpha);
    g['globalCompositeOperation'] = blendmap[blend || 'lighter'] || 'lighter';
    const gr = paint.radial(g, x, y, 0, r, [paint.alpha(ink, 0.9), paint.alpha(ink, 0)]);
    g['fillStyle'] = gr;
    g['fillRect'](x - r, y - r, r * 2, r * 2);
    g['restore']();
    return this;
  }
  partart(a, frame, x, y, w, h, alpha, rot, blend) {
    if (!a) return this;
    const g = this.c2;
    const fr = a.at(frame || '0');
    g['save']();
    g['globalAlpha'] = clamp01((alpha === undefined ? 1 : alpha) * this.alpha);
    if (blend) g['globalCompositeOperation'] = blendmap[blend] || blend;
    g['translate'](x, y);
    if (rot) g['rotate'](rot);
    g['drawImage'](a.canvas, fr.x, fr.y, fr.w, fr.h, -w / 2, -h / 2, w, h);
    g['restore']();
    return this;
  }
  clipset(n, w, h) {
    const g = this.c2;
    g['save']();
    this.begin(n);
    g.beginPath();
    g['rect'](0, 0, w, h);
    g.clip();
    this.clipd++;
    return this;
  }
  unclip() {
    if (this.clipd > 0) { this.c2['restore'](); this.clipd--; }
    return this;
  }
  raster(w, h, fn, opts) {
    const a = art.make(w, h);
    const back = this.c2;
    const np = new canvaspain(a.canvas, opts);
    np.smooth = this.smooth;
    np.beginframe(null);
    fn(np.gfx, np, a);
    return a;
  }
  textbox(t) {
    const w = max(1, ceil(t.w + 12));
    const h = max(1, ceil(t.h + 12));
    const padres = 2;
    const a = art.make(w * padres, h * padres);
    const g = a.ctx;
    const sc = padres;
    g['save']();
    g['setTransform'](sc, 0, 0, sc, sc * 6, sc * 6);
    const np = this;
    const old = this.c2;
    this.c2 = g;
    t.inkstyle(g, this);
    this.c2 = old;
    g['restore']();
    a.smooth = true;
    a.pad = 6;
    a.res = sc;
    return a;
  }
  text(t) {
    const g = this.c2;
    if (this.cull(t)) return this;
    this.begin(t);
    if (t.anim || !t.bakedp || t.bakedp.res !== this.dpr) {
      if (t.anim) t.rebake();
      t.bakedp = this.textbox(t);
    }
    const a = t.bakedp;
    if (!a) { t.inkstyle(g, this); return this; }
    this.stats.quads++;
    const fx = t.flipx;
    g['save']();
    g['globalAlpha'] = this.alphaof(t);
    g['imageSmoothingEnabled'] = true;
    g['drawImage'](a.canvas, 0, 0, a.w, a.h, -a.pad, -a.pad, a.w / a.res, a.h / a.res);
    g['restore']();
    return this;
  }
  pixellit(x, y, w, h, dpr) { return this; }
  bake(n, w, h, res, mode) {
    const r = res || 1;
    const a = art.make(max(1, round(w * r)), max(1, round(h * r)));
    const np = new canvaspain(a.canvas);
    np.smooth = this.smooth;
    np.cam.pos(0, 0, 0, r, r);
    np.view.set(0, 0, w, h);
    np.dpr = r;
    np.beginframe(null);
    np.alpha = 1;
    if (mode === 'self') {
      if (n.ax !== undefined && n.ay !== undefined) {
        this.bakes.push(n.ax);
        const ax = n.ax, ay = n.ay;
        n.ax = 0;
        n.ay = 0;
        np.begin(n);
        n.paint(np);
        n.ax = ax;
        n.ay = ay;
        this.bakes.pop();
      } else { np.begin(null); n.paint(np); }
    } else if (n.kids) {
      for (let i = 0; i < n.kids.length; i++) n.kids[i].draw(np);
    }
    return a;
  }
  destroy() { this.c2 = null; return this; }
}
const quadverts = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);
const quaduvs = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);
const instfloats = 14;
const quadvert = `
attribute vec2 aCorner;
attribute vec2 aUV;
attribute vec2 aPos;
attribute vec2 aEx;
attribute vec2 aEy;
attribute vec4 aUVr;
attribute vec4 aTint;
uniform vec2 uRes;
varying vec2 vUV;
varying vec4 vTint;
void main() {
  vec2 c = (aCorner - 0.5) * 2.0;
  vec2 screen = aPos + aEx * c.x + aEy * c.y;
  vec2 clip = (screen / uRes) * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  vUV = aUVr.xy + aUV * aUVr.zw;
  vTint = aTint;
}
`;
const quadfrag = `
precision mediump float;
uniform sampler2D uTex;
varying vec2 vUV;
varying vec4 vTint;
void main() {
  vec4 c = texture2D(uTex, vUV);
  gl_FragColor = vec4(c.rgb * vTint.rgb, c.a * vTint.a);
}
`;
const postfrag = `
precision mediump float;
uniform sampler2D uTex;
uniform sampler2D uTex2;
uniform vec2 uRes;
uniform vec4 uAmount;
uniform vec4 uColor;
uniform float uTime;
uniform float uKind;
varying vec2 vUV;
float rnd(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main() {
  vec2 uv = vUV;
  vec4 c;
  float k = uKind;
  if (k < 0.5) { c = texture2D(uTex, uv); }
  else if (k < 1.5) { vec4 b = texture2D(uTex, uv); c = vec4(mix(b.rgb, uColor.rgb, clamp(uColor.a * uAmount.x, 0.0, 1.0)), b.a); }
  else if (k < 2.5) { vec2 d = (uv - 0.5); float v = smoothstep(0.75, 0.25, length(d) * 1.4); c = texture2D(uTex, uv); c.rgb *= mix(1.0 - uAmount.x, 1.0, v); }
  else if (k < 3.5) { float o = uAmount.x * 0.006; c.r = texture2D(uTex, uv + vec2(o, 0.0)).r; c.g = texture2D(uTex, uv).g; c.b = texture2D(uTex, uv - vec2(o, 0.0)).b; c.a = texture2D(uTex, uv).a; }
  else if (k < 4.5) { vec4 b = texture2D(uTex, uv); float s = sin(uv.y * uRes.y * 1.6) * 0.5 + 0.5; c = b * (1.0 - uAmount.x * s * 0.6); c.a = b.a; }
  else if (k < 5.5) { vec4 b = texture2D(uTex, uv); float g = dot(b.rgb, vec3(0.299, 0.587, 0.114)); c = vec4(mix(vec3(g), b.rgb, uAmount.x), b.a); }
  else if (k < 6.5) { vec2 px = uAmount.xy * uRes; vec2 q = floor(uv * px) / px + 0.5 / px; c = texture2D(uTex, q); }
  else if (k < 7.5) { vec2 w = vec2(sin(uv.y * uAmount.y * 6.283 + uTime * 3.0) * uAmount.x, cos(uv.x * uAmount.y * 6.283 + uTime * 3.0) * uAmount.x); c = texture2D(uTex, uv + w * 0.01); }
  else if (k < 8.5) { vec4 s = texture2D(uTex, uv); vec4 g = texture2D(uTex2, uv); c = vec4(s.rgb + g.rgb * uAmount.x * g.a, s.a); }
  else if (k < 9.5) { vec2 d = uAmount.xy; vec4 s = vec4(0.0); float w = 0.0; for (int i = -4; i <= 4; i++) { float f = 1.0 - abs(float(i)) / 5.0; s += texture2D(uTex, uv + d * float(i) * 1.5 / uRes) * f; w += f; } c = s / w; c.a = texture2D(uTex, uv).a; }
  else if (k < 10.5) { vec4 b = texture2D(uTex, uv); float l = dot(b.rgb, vec3(0.299, 0.587, 0.114)); float m = smoothstep(uAmount.x, uAmount.x + 0.25, l); c = vec4(b.rgb, b.a) * m; }
  else if (k < 11.5) { vec2 d = uv - 0.5; float l = length(d); float a = atan(d.y, d.x); float w = sin(a * uAmount.y * 8.0 + uTime * 4.0) * uAmount.x * 0.02 * l; c = texture2D(uTex, uv + vec2(w * d.y, -w * d.x)); }
  else { vec4 b = texture2D(uTex, uv); float l = dot(b.rgb, vec3(0.299, 0.587, 0.114)); float g = rnd(floor(uv * uRes / max(1.0, uAmount.y))) * uAmount.x; c = vec4(mix(b.rgb, vec3(l) + g, uAmount.z), b.a); }
  gl_FragColor = c;
}
`;
const postvert = `
attribute vec2 aCorner;
uniform vec2 uRes;
varying vec2 vUV;
void main() {
  vUV = aCorner;
  vec2 clip = aCorner * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
}
`;

const shader = (gl, kind, src) => {
  const s = gl['createShader'](kind);
  gl['shaderSource'](s, src);
  gl['compileShader'](s);
  if (!gl['getShaderParameter'](s, gl['COMPILE_STATUS'])) { warn('PoxamelJs shader error: ' + gl['getShaderInfoLog'](s)); return null; }
  return s;
};
const program = (gl, vsrc, fsrc) => {
  const v = shader(gl, gl['VERTEX_SHADER'], vsrc);
  const f = shader(gl, gl['FRAGMENT_SHADER'], fsrc);
  if (!v || !f) return null;
  const p = gl['createProgram']();
  gl['attachShader'](p, v);
  gl['attachShader'](p, f);
  gl['linkProgram'](p);
  if (!gl['getProgramParameter'](p, gl['LINK_STATUS'])) { warn('PoxamelJs link error: ' + gl['getProgramInfoLog'](p)); return null; }
  return p;
};

class square extends brush {
  constructor(canvas, opts) {
    super(canvas, opts);
    const o = opts || {};
    const attrs = { alpha: o.alpha !== false, antialias: o.antialias !== false, premultipliedAlpha: false, depth: false, stencil: false, preserveDrawingBuffer: o.preserve === true, powerPreference: 'high-performance' };
    const gl = canvas['getContext']('webgl2', attrs) || canvas['getContext']('webgl', attrs) || canvas['getContext']('experimental-webgl', attrs);
    if (!gl) throw new errc('PoxamelJs: WebGL unavailable');
    this.gl = gl;
    this.webgl2 = !!gl['drawArraysInstanced'];
    this.inst = gl['getExtension']('ANGLE_instanced_arrays');
    this.cls = gl['getExtension']('OES_element_index_uint');
    this.lose = gl['getExtension']('WEBGL_lose_context');
    this.gpu = true;
    this.prog = program(gl, quadvert, quadfrag);
    this.post = program(gl, postvert, postfrag);
    this.customs = {};
    if (!this.prog) throw new errc('PoxamelJs: shader build failed');
    this.locs = {};
    for (const k of ['aCorner', 'aUV', 'aPos', 'aEx', 'aEy', 'aUVr', 'aTint']) this.locs[k] = gl['getAttribLocation'](this.prog, k);
    for (const k of ['uRes', 'uTex']) this.locs[k] = gl['getUniformLocation'](this.prog, k);
    this.plocs = {};
    for (const k of ['uTex', 'uTex2', 'uRes', 'uAmount', 'uColor', 'uTime', 'uKind']) this.plocs[k] = gl['getUniformLocation'](this.post, k);
    this.pointerloc = { aCorner: gl['getAttribLocation'](this.post, 'aCorner') };
    this.cap = o.cap || 8192;
    this.instbuf = gl['createBuffer']();
    gl['bindBuffer'](gl['ARRAY_BUFFER'], this.instbuf);
    gl['bufferData'](gl['ARRAY_BUFFER'], this.cap * instfloats * 4, gl['DYNAMIC_DRAW']);
    this.instdata = new Float32Array(this.cap * instfloats);
    this.ni = 0;
    this.cornerbuf = gl['createBuffer']();
    gl['bindBuffer'](gl['ARRAY_BUFFER'], this.cornerbuf);
    gl['bufferData'](gl['ARRAY_BUFFER'], quadverts, gl['STATIC_DRAW']);
    this.uvbuf = gl['createBuffer']();
    gl['bindBuffer'](gl['ARRAY_BUFFER'], this.uvbuf);
    gl['bufferData'](gl['ARRAY_BUFFER'], quaduvs, gl['STATIC_DRAW']);
    this.ptbuf = gl['createBuffer']();
    gl['bindBuffer'](gl['ARRAY_BUFFER'], this.ptbuf);
    gl['bufferData'](gl['ARRAY_BUFFER'], quaduvs, gl['STATIC_DRAW']);
    this.texmap = new mapc();
    this.white = this.maketex(1, 1, (g) => { g['fillStyle'] = '#fff'; g['fillRect'](0, 0, 1, 1); });
    this.shapes = {};
    this.curtex = null;
    this.curblend = 'source-over';
    this.blendon = false;
    this.postlist = [];
    this.fbos = [];
    this.setupstate();
    this.resize(canvas['width'] || 640, canvas['height'] || 360, o.dpr || 1);
    return this;
  }
  setupstate() {
    const gl = this.gl;
    gl['disable'](gl['DEPTH_TEST']);
    gl['disable'](gl['CULL_FACE']);
    gl['enable'](gl['BLEND']);
    gl['blendFunc'](gl['SRC_ALPHA'], gl['ONE_MINUS_SRC_ALPHA']);
    gl['pixelStorei'](gl['UNPACK_PREMULTIPLY_ALPHA_WEBGL'], 0);
    gl['pixelStorei'](gl['UNPACK_FLIP_Y_WEBGL'], 0);
    return this;
  }
  maketex(w, h, draw) {
    const c = elm('canvas');
    c.width = w;
    c.height = h;
    const g = c['getContext']('2d');
    if (draw) draw(g, c);
    const gl = this.gl;
    const t = gl['createTexture']();
    gl['bindTexture'](gl['TEXTURE_2D'], t);
    gl['texImage2D'](gl['TEXTURE_2D'], 0, gl['RGBA'], gl['RGBA'], gl['UNSIGNED_BYTE'], c);
    gl['texParameteri'](gl['TEXTURE_2D'], gl['TEXTURE_WRAP_S'], gl['CLAMP_TO_EDGE']);
    gl['texParameteri'](gl['TEXTURE_2D'], gl['TEXTURE_WRAP_T'], gl['CLAMP_TO_EDGE']);
    gl['texParameteri'](gl['TEXTURE_2D'], gl['TEXTURE_MIN_FILTER'], gl['NEAREST']);
    gl['texParameteri'](gl['TEXTURE_2D'], gl['TEXTURE_MAG_FILTER'], gl['NEAREST']);
    return { tex: t, canvas: c, w, h, src: -1, smooth: false };
  }
  shapetex(kind) {
    if (this.shapes[kind]) return this.shapes[kind];
    const s = 64;
    let t;
    if (kind === 'ring') t = this.maketex(s, s, (g) => { g['strokeStyle'] = '#fff'; g['lineWidth'] = 8; g['beginPath'](); g['arc'](s / 2, s / 2, s / 2 - 5, 0, tau); g.stroke(); });
    else if (kind === 'star') t = this.maketex(s, s, (g) => { g['fillStyle'] = '#fff'; g['beginPath'](); for (let k = 0; k < 10; k++) { const a = (k / 10) * tau - pi / 2; const r = k % 2 ? s * 0.22 : s * 0.48; const x = s / 2 + cos(a) * r, y = s / 2 + sin(a) * r; if (k === 0) g['moveTo'](x, y); else g['lineTo'](x, y); } g.closePath(); g.fill(); });
    else t = this.maketex(s, s, (g) => { const gr = g['createRadialGradient'](s / 2, s / 2, 0, s / 2, s / 2, s / 2); gr['addColorStop'](0, 'rgba(255,255,255,1)'); gr['addColorStop'](1, 'rgba(255,255,255,0)'); g['fillStyle'] = gr; g['fillRect'](0, 0, s, s); });
    t.smooth = true;
    this.shapes[kind] = t;
    return t;
  }
  texof(a) {
    if (!a) return this.white;
    if (a.texr && a.texr.src === a.src && a.texr.w === a.canvas['width']) return a.texr;
    const gl = this.gl;
    let r = this.texmap.get(a.canvas);
    if (!r) {
      const t = gl['createTexture']();
      r = { tex: t, canvas: a.canvas, w: a.canvas['width'], src: -1, smooth: a.smooth, data: null };
      this.texmap.set(a.canvas, r);
    }
    if (r.src !== a.src || r.w !== a.canvas['width'] || r.h !== a.canvas['height']) {
      gl['bindTexture'](gl['TEXTURE_2D'], r.tex);
      gl['texImage2D'](gl['TEXTURE_2D'], 0, gl['RGBA'], gl['RGBA'], gl['UNSIGNED_BYTE'], a.canvas);
      gl['texParameteri'](gl['TEXTURE_2D'], gl['TEXTURE_WRAP_S'], gl['CLAMP_TO_EDGE']);
      gl['texParameteri'](gl['TEXTURE_2D'], gl['TEXTURE_WRAP_T'], gl['CLAMP_TO_EDGE']);
      r.src = a.src;
      r.w = a.canvas['width'];
      r.h = a.canvas['height'];
      r.smooth = undefined;
      this.stats.textures++;
    }
    const sm = a.smooth === true;
    if (r.smooth !== sm) {
      gl['bindTexture'](gl['TEXTURE_2D'], r.tex);
      gl['texParameteri'](gl['TEXTURE_2D'], gl['TEXTURE_MIN_FILTER'], sm ? gl['LINEAR'] : gl['NEAREST']);
      gl['texParameteri'](gl['TEXTURE_2D'], gl['TEXTURE_MAG_FILTER'], sm ? gl['LINEAR'] : gl['NEAREST']);
      r.smooth = sm;
    }
    a.texr = r;
    return r;
  }
  beginframe(bg) {
    super.beginframe(bg);
    this.gl['bindFramebuffer'](this.gl['FRAMEBUFFER'], null);
    this.gl['viewport'](0, 0, this.canvas['width'], this.canvas['height']);
    this.gl['disable'](this.gl['SCISSOR_TEST']);
    this.curtex = null;
    this.curblend = 'source-over';
    this.blendon = false;
    this.gl['clearColor'](0, 0, 0, 0);
    this.gl['clear'](this.gl['COLOR_BUFFER_BIT']);
    this.ni = 0;
    return this;
  }
  endframe() {
    this.flush();
    this.applypost();
    return this;
  }
  setstate(alpha, blend) {
    this.alpha = alpha;
    const bl = blend || 'source-over';
    if (this.curblend !== bl) {
      this.flush();
      this.curblend = bl;
      const add = bl === 'lighter' || bl === 'add' || bl === 'screen' || bl === 'glow';
      this.gl['blendFunc'](this.gl['SRC_ALPHA'], add ? this.gl['ONE'] : this.gl['ONE_MINUS_SRC_ALPHA']);
    }
    return this;
  }
  begin(n) {
    this.stats.ops++;
    if (n) {
      this.tmpm.setfrom(this.cam).mul(n.world);
      this.setstate(this.alphaof(n), n.blend);
    } else {
      this.tmpm.setfrom(this.cam);
      this.setstate(1, 'source-over');
    }
    this.m = this.tmpm;
    return this.m;
  }
  pushquad(r, x, y, w, h, rot, u0, v0, uw, uh, tint, alpha, blend, opaque) {
    if (this.ni >= this.cap) this.flush();
    if (alpha <= 0.002 || w === 0 || h === 0) return this;
    if (blend) this.setstate(this.alpha, blend);
    const cur = r.tex;
    if (this.curtex !== cur) { this.flush(); this.curtex = cur; }
    const d = this.instdata;
    let i = this.ni * instfloats;
    const m = this.m || this.cam;
    const hw = w * 0.5, hh = h * 0.5;
    const cc = rot ? cos(rot) : 1, ss = rot ? sin(rot) : 0;
    const ex = hw * cc, ey = hw * ss;
    const fx = -hh * ss, fy = hh * cc;
    d[i] = m.a * x + m.c * y + m.e;
    d[i + 1] = m.b * x + m.d * y + m.f;
    d[i + 2] = m.a * ex + m.c * ey;
    d[i + 3] = m.b * ex + m.d * ey;
    d[i + 4] = m.a * fx + m.c * fy;
    d[i + 5] = m.b * fx + m.d * fy;
    d[i + 6] = u0; d[i + 7] = v0; d[i + 8] = uw; d[i + 9] = uh;
    d[i + 10] = tint.r / 255; d[i + 11] = tint.g / 255; d[i + 12] = tint.b / 255; d[i + 13] = alpha * tint.a;
    this.ni++;
    this.stats.quads++;
    return this;
  }
  flush() {
    if (this.ni <= 0 || !this.curtex) { this.ni = 0; return this; }
    const gl = this.gl;
    const p = this.prog;
    gl['useProgram'](p);
    const stride = instfloats * 4;
    gl['bindBuffer'](gl['ARRAY_BUFFER'], this.cornerbuf);
    gl['enableVertexAttribArray'](this.locs.aCorner);
    gl['vertexAttribPointer'](this.locs.aCorner, 2, gl['FLOAT'], false, 0, 0);
    if (this.inst) this.inst['vertexAttribDivisorANGLE'](this.locs.aCorner, 0);
    gl['bindBuffer'](gl['ARRAY_BUFFER'], this.uvbuf);
    gl['enableVertexAttribArray'](this.locs.aUV);
    gl['vertexAttribPointer'](this.locs.aUV, 2, gl['FLOAT'], false, 0, 0);
    if (this.inst) this.inst['vertexAttribDivisorANGLE'](this.locs.aUV, 0);
    gl['bindBuffer'](gl['ARRAY_BUFFER'], this.instbuf);
    gl['bufferSubData'](gl['ARRAY_BUFFER'], 0, this.instdata['subarray'](0, this.ni * instfloats));
    const at = (name, size, off) => {
      const l = this.locs[name];
      if (l < 0) return;
      gl['enableVertexAttribArray'](l);
      gl['vertexAttribPointer'](l, size, gl['FLOAT'], false, stride, off * 4);
      if (this.inst) this.inst['vertexAttribDivisorANGLE'](l, 1);
      else if (this.webgl2) gl['vertexAttribDivisor'](l, 1);
    };
    at('aPos', 2, 0);
    at('aEx', 2, 2);
    at('aEy', 2, 4);
    at('aUVr', 4, 6);
    at('aTint', 4, 10);
    gl['uniform2f'](this.locs.uRes, this.canvas['width'], this.canvas['height']);
    gl['activeTexture'](gl['TEXTURE0']);
    gl['bindTexture'](gl['TEXTURE_2D'], this.curtex);
    gl['uniform1i'](this.locs.uTex, 0);
    if (this.inst) this.inst['drawArraysInstancedANGLE'](gl['TRIANGLES'], 0, 6, this.ni);
    else if (this.webgl2) gl['drawArraysInstanced'](gl['TRIANGLES'], 0, 6, this.ni);
    else this.slowdraw();
    this.stats.flushes++;
    this.ni = 0;
    return this;
  }
  slowdraw() {
    const gl = this.gl;
    const expanded = new Float32Array(this.ni * 6 * 18);
    let o = 0;
    for (let q = 0; q < this.ni; q++) {
      const base = q * instfloats;
      const px = this.instdata[base], py = this.instdata[base + 1];
      const exx = this.instdata[base + 2], exy = this.instdata[base + 3];
      const eyx = this.instdata[base + 4], eyy = this.instdata[base + 5];
      const u0 = this.instdata[base + 6], v0 = this.instdata[base + 7], uw = this.instdata[base + 8], uh = this.instdata[base + 9];
      const tr = this.instdata[base + 10], tg = this.instdata[base + 11], tb = this.instdata[base + 12], ta = this.instdata[base + 13];
      for (let v = 0; v < 6; v++) {
        const cxx = quadverts[v * 2], cyy = quadverts[v * 2 + 1];
        const uuu = quaduvs[v * 2], vvv = quaduvs[v * 2 + 1];
        expanded[o] = cxx; expanded[o + 1] = cyy;
        expanded[o + 2] = uuu; expanded[o + 3] = vvv;
        expanded[o + 4] = px; expanded[o + 5] = py;
        expanded[o + 6] = exx; expanded[o + 7] = exy;
        expanded[o + 8] = eyx; expanded[o + 9] = eyy;
        expanded[o + 10] = u0; expanded[o + 11] = v0; expanded[o + 12] = uw; expanded[o + 13] = uh;
        expanded[o + 14] = tr; expanded[o + 15] = tg; expanded[o + 16] = tb; expanded[o + 17] = ta;
        o += 18;
      }
    }
    const buf = gl['createBuffer']();
    gl['bindBuffer'](gl['ARRAY_BUFFER'], buf);
    gl['bufferData'](gl['ARRAY_BUFFER'], expanded, gl['DYNAMIC_DRAW']);
    const stride = 18 * 4;
    const set = (name, size, off) => { const l = this.locs[name]; if (l < 0) return; gl['enableVertexAttribArray'](l); gl['vertexAttribPointer'](l, size, gl['FLOAT'], false, stride, off * 4); if (this.webgl2) gl['vertexAttribDivisor'](l, 0); else if (this.inst) this.inst['vertexAttribDivisorANGLE'](l, 0); };
    set('aCorner', 2, 0);
    set('aUV', 2, 2);
    set('aPos', 2, 4);
    set('aEx', 2, 6);
    set('aEy', 2, 8);
    set('aUVr', 4, 10);
    set('aTint', 4, 14);
    gl['drawArrays'](gl['TRIANGLES'], 0, this.ni * 6);
    gl['deleteBuffer'](buf);
    return this;
  }
  blit(a, sx, sy, sw, sh, dx, dy, dw, dh, n, opts) {
    if (!a) return this;
    const jj = n ? n.juice : null;
    let tint = paint.white;
    if (jj && jj.tint && jj.ta > 0.01) tint = paint.mix(paint.white, jj.tint, clamp01(jj.ta));
    const r = this.texof(a);
    const W = a.canvas['width'], H = a.canvas['height'];
    let u0 = sx / W, v0 = sy / H, uw = sw / W, uh = sh / H;
    if (n && n.flipx) { u0 += uw; uw = -uw; }
    if (n && n.flipy) { v0 += uh; uh = -uh; }
    const alpha = n ? this.alphaof(n) : this.alpha;
    return this.pushquad(r, dx + dw / 2, dy + dh / 2, dw, dh, 0, u0, v0, uw, uh, tint, alpha, null);
  }
  nineblit(a, sx, sy, sw, sh, l, tp, r, b, dx, dy, dw, dh, n) {
    const W = a.canvas['width'], H = a.canvas['height'];
    const ix = max(0.001, dw - l - r), iy = max(0.001, dh - tp - b);
    const mx = max(0.001, sw - l - r), my = max(0.001, sh - tp - b);
    const rtex = this.texof(a);
    const alpha = n ? this.alphaof(n) : this.alpha;
    const jj = n ? n.juice : null;
    const tint = jj && jj.tint && jj.ta > 0.01 ? paint.mix(paint.white, jj.tint, clamp01(jj.ta)) : paint.white;
    const dr = [dx, dx + l, dx + dw - r], drw = [l, ix, r];
    const dy2 = [dy, dy + tp, dy + dh - b], dh2 = [tp, iy, b];
    const sr = [sx, sx + l, sx + sw - r], srw = [l, mx, r];
    const sy2 = [sy, sy + tp, sy + sh - b], sh2 = [tp, my, b];
    for (let i = 0; i < 3; i++) for (let k = 0; k < 3; k++) {
      if (drw[i] <= 0 || dh2[k] <= 0) continue;
      this.pushquad(rtex, dr[i] + drw[i] / 2, dy2[k] + dh2[k] / 2, drw[i], dh2[k], 0, sr[i] / W, sy2[k] / H, srw[i] / W, sh2[k] / H, tint, alpha, null);
    }
    return this;
  }
  rect(dx, dy, w, h, opts) {
    const o = opts || {};
    const r = this.white;
    const wu = this.wuv || (this.wuv = [0.5, 0.5, 0, 0]);
    if (o.fill) this.pushquad(r, dx + w / 2, dy + h / 2, w, h, 0, wu[0], wu[1], wu[2], wu[3], paint.of(o.fill), this.alpha * (o.fill.a === undefined ? 1 : o.fill.a), null);
    if (o.grad) {
      const c = this.canvas;
      const key = 'grad' + o.grad.length + paint.css(o.grad[0]) + paint.css(o.grad[o.grad.length - 1]) + (o.vert ? 'v' : 'h');
      const a = this.gradart(key, o.grad, o.vert);
      this.blit(a, 0, 0, a.w, a.h, dx, dy, w, h, null);
    }
    if (o.stroke) {
      const lw = o.linew || 1;
      const ink = paint.of(o.stroke);
      const aa = this.alpha * ink.a;
      this.pushquad(r, dx + w / 2, dy + lw / 2, w, lw, 0, wu[0], wu[1], wu[2], wu[3], ink, aa, null);
      this.pushquad(r, dx + w / 2, dy + h - lw / 2, w, lw, 0, wu[0], wu[1], wu[2], wu[3], ink, aa, null);
      this.pushquad(r, dx + lw / 2, dy + h / 2, lw, h, 0, wu[0], wu[1], wu[2], wu[3], ink, aa, null);
      this.pushquad(r, dx + w - lw / 2, dy + h / 2, lw, h, 0, wu[0], wu[1], wu[2], wu[3], ink, aa, null);
    }
    return this;
  }
  gradart(key, list, vert) {
    if (!this.grads) this.grads = {};
    if (this.grads[key]) return this.grads[key];
    const n = 64;
    const a = art.make(vert ? 4 : n, vert ? n : 4);
    a.ctx['fillStyle'] = paint.grad(a.ctx, a.newbox(), list, vert);
    a.ctx['fillRect'](0, 0, a.w, a.h);
    a.smooth = true;
    a.src = 2;
    this.grads[key] = a;
    return a;
  }
  line(x1, y1, x2, y2, w, ink, alpha, blend) {
    const a = atan2(y2 - y1, x2 - x1);
    const l = hypot(x2 - x1, y2 - y1);
    const r = this.white;
    const wu = this.wuv || (this.wuv = [0.5, 0.5, 0, 0]);
    return this.pushquad(r, (x1 + x2) / 2, (y1 + y2) / 2, l, w, a, wu[0], wu[1], wu[2], wu[3], paint.of(ink), (alpha === undefined ? 1 : alpha) * this.alpha, blend);
  }
  dot(x, y, w, h, ink, alpha, blend, glow) {
    if (glow) { this.glow(x, y, max(w, h) * 1.6, ink, (alpha === undefined ? 1 : alpha) * 0.8, blend || 'lighter'); }
    const t = paint.of(ink);
    const wu = this.wuv || (this.wuv = [0.5, 0.5, 0, 0]);
    return this.pushquad(this.white, x, y, w, h, 0, wu[0], wu[1], wu[2], wu[3], t, (alpha === undefined ? 1 : alpha) * this.alpha, blend);
  }
  box(x, y, w, h, ink, alpha, blend, rot) {
    const t = paint.of(ink);
    const wu = this.wuv || (this.wuv = [0.5, 0.5, 0, 0]);
    return this.pushquad(this.white, x, y, w, h, rot || 0, wu[0], wu[1], wu[2], wu[3], t, (alpha === undefined ? 1 : alpha) * this.alpha, blend);
  }
  ring(x, y, r, lw, ink, alpha, blend) {
    const s = this.shapetex('ring');
    const t = paint.of(ink);
    this.setstate(this.alpha, blend || 'source-over');
    return this.pushquad(s, x, y, r * 2, r * 2, 0, 0, 0, 1, 1, t, (alpha === undefined ? 1 : alpha) * this.alpha, blend);
  }
  star(x, y, r, ink, alpha, blend, rot) {
    const s = this.shapetex('star');
    const t = paint.of(ink);
    return this.pushquad(s, x, y, r * 2, r * 2, rot || 0, 0, 0, 1, 1, t, (alpha === undefined ? 1 : alpha) * this.alpha, blend || 'source-over');
  }
  glow(x, y, r, ink, alpha, blend) {
    const s = this.shapetex('glow');
    const t = paint.of(ink);
    return this.pushquad(s, x, y, r * 2, r * 2, 0, 0, 0, 1, 1, t, (alpha === undefined ? 1 : alpha) * this.alpha, blend || 'lighter');
  }
  partart(a, frame, x, y, w, h, alpha, rot, blend) {
    if (!a) return this;
    const r = this.texof(a);
    const fr = a.at(frame || '0');
    const W = a.canvas['width'], H = a.canvas['height'];
    return this.pushquad(r, x, y, w, h, rot || 0, fr.x / W, fr.y / H, fr.w / W, fr.h / H, paint.white, alpha === undefined ? this.alpha : alpha * this.alpha, blend);
  }
  clipset(n, w, h) {
    this.flush();
    const gl = this.gl;
    const m = n ? (this.begin(n), this.m) : this.cam;
    const p0 = m.apply(0, 0, new vec()), p1 = m.apply(w, h, new vec());
    const x = min(p0.x, p1.x) * this.dpr, y = min(p0.y, p1.y) * this.dpr;
    const x2 = max(p0.x, p1.x) * this.dpr, y2 = max(p0.y, p1.y) * this.dpr;
    gl['enable'](gl['SCISSOR_TEST']);
    gl['scissor'](round(x), round(this.canvas['height'] - y2), max(0, round(x2 - x)), max(0, round(y2 - y)));
    this.clipd++;
    return this;
  }
  unclip() {
    if (this.clipd > 0) { this.clipd--; if (this.clipd === 0) this.gl['disable'](this.gl['SCISSOR_TEST']); }
    return this;
  }
  raster(w, h, fn, opts) {
    const a = art.make(w, h);
    const np = new canvaspain(a.canvas, opts);
    np.smooth = this.smooth;
    np.beginframe(null);
    fn(np.gfx, np, a);
    return a;
  }
  text(t) {
    if (this.cull(t)) return this;
    this.begin(t);
    if (t.anim || !t.bakedp || t.bakedp.res !== this.dpr * 2) {
      if (t.anim) t.rebake();
      const w = max(1, ceil(t.w + 12)), h = max(1, ceil(t.h + 12));
      const sc = 2;
      const a = art.make(w * sc, h * sc);
      const np = new canvaspain(a.canvas);
      np.smooth = true;
      const g = a.ctx;
      g['setTransform'](sc, 0, 0, sc, sc * 6, sc * 6);
      t.inkstyle(g, this);
      a.smooth = true;
      a.pad = 6;
      a.res = sc;
      t.bakedp = a;
    }
    const a = t.bakedp;
    const r = this.texof(a);
    const W = a.canvas['width'], H = a.canvas['height'];
    return this.pushquad(r, -a.pad + a.w / a.res / 2 - 6 + 6, -a.pad + a.h / a.res / 2, a.w / a.res, a.h / a.res, 0, 0, 0, 1, 1, paint.white, this.alphaof(t), null);
  }
  bake(n, w, h, res, mode) {
    const r = res || 1;
    const a = art.make(max(1, round(w * r)), max(1, round(h * r)));
    const np = new canvaspain(a.canvas);
    np.smooth = this.smooth;
    np.cam.pos(0, 0, 0, r, r);
    np.view.set(0, 0, w, h);
    np.dpr = r;
    np.beginframe(null);
    np.alpha = 1;
    if (mode === 'self') { np.begin(null); n.paint(np); }
    else if (n.kids) for (let i = 0; i < n.kids.length; i++) n.kids[i].draw(np);
    a.src = fract(now() * 0.001) * 1e6;
    return a;
  }
  framebuffer(w, h) {
    const gl = this.gl;
    const tex = gl['createTexture']();
    gl['bindTexture'](gl['TEXTURE_2D'], tex);
    gl['texImage2D'](gl['TEXTURE_2D'], 0, gl['RGBA'], w, h, 0, gl['RGBA'], gl['UNSIGNED_BYTE'], null);
    gl['texParameteri'](gl['TEXTURE_2D'], gl['TEXTURE_WRAP_S'], gl['CLAMP_TO_EDGE']);
    gl['texParameteri'](gl['TEXTURE_2D'], gl['TEXTURE_WRAP_T'], gl['CLAMP_TO_EDGE']);
    gl['texParameteri'](gl['TEXTURE_2D'], gl['TEXTURE_MIN_FILTER'], gl['LINEAR']);
    gl['texParameteri'](gl['TEXTURE_2D'], gl['TEXTURE_MAG_FILTER'], gl['LINEAR']);
    const fb = gl['createFramebuffer']();
    gl['bindFramebuffer'](gl['FRAMEBUFFER'], fb);
    gl['framebufferTexture2D'](gl['FRAMEBUFFER'], gl['COLOR_ATTACHMENT0'], gl['TEXTURE_2D'], tex, 0);
    gl['bindFramebuffer'](gl['FRAMEBUFFER'], null);
    return { fb, tex, w, h };
  }
  resize(w, h, dpr) {
    super.resize(w, h, dpr);
    if (!this.gl) return this;
    this.fbos = [];
    const W = this.canvas['width'], H = this.canvas['height'];
    const a = this.framebuffer(W, H);
    const b = this.framebuffer(W, H);
    const hw = max(1, floor(W / 2)), hh = max(1, floor(H / 2));
    const c = this.framebuffer(hw, hh);
    const d = this.framebuffer(hw, hh);
    this.fbos = [a, b, c, d];
    this.gl['viewport'](0, 0, W, H);
    return this;
  }
  passto(from, to, kind, amount, color, tex2) {
    const gl = this.gl;
    gl['bindFramebuffer'](gl['FRAMEBUFFER'], to ? to.fb : null);
    gl['viewport'](0, 0, to ? to.w : this.canvas['width'], to ? to.h : this.canvas['height']);
    gl['useProgram'](this.post);
    const l = this.plocs;
    gl['bindBuffer'](gl['ARRAY_BUFFER'], this.ptbuf);
    gl['enableVertexAttribArray'](this.pointerloc.aCorner);
    gl['vertexAttribPointer'](this.pointerloc.aCorner, 2, gl['FLOAT'], false, 0, 0);
    gl['activeTexture'](gl['TEXTURE0']);
    gl['bindTexture'](gl['TEXTURE_2D'], from.tex);
    gl['uniform1i'](l.uTex, 0);
    if (tex2) { gl['activeTexture'](gl['TEXTURE1']); gl['bindTexture'](gl['TEXTURE_2D'], tex2.tex); gl['uniform1i'](l.uTex2, 1); gl['activeTexture'](gl['TEXTURE0']); }
    gl['uniform2f'](l.uRes, from.w, from.h);
    gl['uniform4f'](l.uAmount, amount ? amount[0] || 0 : 0, amount ? amount[1] || 0 : 0, amount ? amount[2] || 0 : 0, amount ? amount[3] || 0 : 0);
    const col = color ? paint.of(color) : paint.black;
    gl['uniform4f'](l.uColor, col.r / 255, col.g / 255, col.b / 255, col.a === undefined ? 1 : col.a);
    gl['uniform1f'](l.uTime, this.clock);
    gl['uniform1f'](l.uKind, kind);
    gl['drawArrays'](gl['TRIANGLES'], 0, 6);
    return this;
  }
  addpost(e) { this.postlist.push(e); return this; }
  clearpost() { this.postlist.length = 0; return this; }
  postkind(k) {
    const m = this.pmap || (this.pmap = {
      blit: 0, copy: 0, tint: 1, flash: 1, fade: 1, color: 1, vignette: 2, vig: 2, chroma: 3, chromatic: 3, scanline: 4, scan: 4,
      desat: 5, grayscale: 5, gray: 5, pixelate: 6, crunch: 6, wave: 7, ripple: 7, heat: 7, bloom: 8, additive: 8, glowpost: 8, blur: 9, bright: 10, threshold: 10, grain: 11, noise: 11, film: 11
    });
    return m[k];
  }
  applypost() {
    if (!this.postlist.length || !this.fbos.length) return this;
    const gl = this.gl;
    let src = this.fbos[0];
    let next = this.fbos[1];
    let used = false;
    for (let i = 0; i < this.postlist.length; i++) {
      const e = this.postlist[i];
      if (e.kind === 'bloom') {
        const half1 = this.fbos[2], half2 = this.fbos[3];
        this.passto(src, half1, 10, [e.threshold === undefined ? 0.62 : e.threshold, 0.25, 0, 0]);
        this.passto(half1, half2, 9, [1, 0, 0, 0]);
        this.passto(half2, half1, 9, [0, 1, 0, 0]);
        this.passto(src, next, 8, [e.strength === undefined ? 1.1 : e.strength, 0, 0, 0], null, half1);
        const t = src; src = next; next = t;
        used = true;
      } else if (e.kind === 'blur') {
        const half1 = this.fbos[2];
        this.passto(src, half1, 9, [1, 0, 0, 0]);
        this.passto(half1, next, 9, [0, 1, 0, 0]);
        const t = src; src = next; next = t;
        used = true;
      } else {
        const k = this.postkind(e.kind);
        if (k === undefined) continue;
        const amt = e.kind === 'grain' || e.kind === 'noise' || e.kind === 'film'
          ? [e.amount === undefined ? 0.12 : e.amount, e.size || 1, e.tone === undefined ? 0.35 : e.tone, 0]
          : e.kind === 'pixelate' || e.kind === 'crunch'
            ? [max(1, e.size || 2), 0, 0, 0]
            : e.kind === 'wave' || e.kind === 'ripple' || e.kind === 'heat'
              ? [e.amount === undefined ? 0.02 : e.amount, e.freq === undefined ? 3 : e.freq, 0, 0]
              : k === 2
                ? [e.amount === undefined ? 0.5 : e.amount, 0, 0, 0]
                : k === 1
                  ? [(e.amount === undefined ? 0.6 : e.amount) * (e.color ? paint.of(e.color).a : 1), 0, 0, 0]
                  : [e.amount === undefined ? 0.13 : e.amount, 0, 0, 0];
        this.passto(src, k === 0 || k === 1 ? next : (used ? next : next), k, amt, e.color || null);
        const t = src; src = next; next = t;
        used = true;
      }
    }
    this.passto(src, null, 1, [0], paint.black);
    gl['bindFramebuffer'](gl['FRAMEBUFFER'], null);
    this.gl['viewport'](0, 0, this.canvas['width'], this.canvas['height']);
    return this;
  }
  sceneinto() {
    if (!this.fbos.length) return false;
    const gl = this.gl;
    this.flush();
    gl['bindFramebuffer'](gl['FRAMEBUFFER'], this.fbos[0].fb);
    gl['viewport'](0, 0, this.fbos[0].w, this.fbos[0].h);
    gl['clearColor'](0, 0, 0, 0);
    gl['clear'](gl['COLOR_BUFFER_BIT']);
    this.curtex = null;
    this.ni = 0;
    return true;
  }
}
class camera {
  constructor(x = 0, y = 0, w = 320, h = 180, opts) {
    const o = opts || {};
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.zoom = o.zoom || 1;
    this.zoomto = this.zoom;
    this.rot = 0;
    this.target = null;
    this.mat = new mat();
    this.tm = new mat();
    this.bounds = o.bounds ? new box(o.bounds.x, o.bounds.y, o.bounds.w, o.bounds.h) : null;
    this.dead = new box(0, 0, o.deadx || 0, o.deady || 0);
    this.smoothx = o.smoothx === undefined ? 12 : o.smoothx;
    this.smoothy = o.smoothy === undefined ? 12 : o.smoothy;
    this.smoothz = o.smoothz === undefined ? 6 : o.smoothz;
    this.lead = o.lead === undefined ? 0.12 : o.lead;
    this.leady = o.leady === undefined ? 0 : o.leady;
    this.look = new vec();
    this.leadx = 0;
    this.leady2 = 0;
    this.pixel = o.pixel !== false;
    this.offx = 0;
    this.offy = 0;
    this.shakeamp = 0;
    this.shaket = 0;
    this.shakedur = 0;
    this.shakex = 0;
    this.shakey = 0;
    this.rotz = 0;
    this.trauma = 0;
    this.angle = 0;
    this.seed = 0;
    this.locked = false;
    this.manual = false;
    this.flipy = false;
    this.tintcolor = null;
    this.scene = null;
    this.vsmx = 0;
    this.vsmy = 0;
    this.velx = 0;
    this.vely = 0;
  }
  follow(n, opts) {
    if (n && n.rig) { this.target = n; }
    else this.target = n;
    if (opts) {
      if (opts.smooth !== undefined) this.smoothx = this.smoothy = opts.smooth;
      if (opts.zoom !== undefined) this.zoom = this.zoomto = opts.zoom;
      if (opts.lead !== undefined) this.lead = opts.lead;
      if (opts.deadx !== undefined) { this.dead.w = opts.deadx; this.dead.h = opts.deady || opts.deadx; }
      if (opts.bounds) this.bounds = new box(opts.bounds.x, opts.bounds.y, opts.bounds.w, opts.bounds.h);
      if (opts.pixel !== undefined) this.pixel = opts.pixel;
      if (opts.x !== undefined) this.offx = opts.x;
      if (opts.y !== undefined) this.offy = opts.y;
      if (opts.locked !== undefined) this.locked = opts.locked;
    }
    return this;
  }
  lookat(x, y) { this.manual = true; this.xt = x; this.yt = y; return this; }
  at(x, y) { this.x = x; this.y = y; this.xt = x; this.yt = y; this.manual = true; return this; }
  boxat(b) { this.manual = true; this.x = b.cx; this.y = b.cy; return this; }
  size(w, h) {
    if (this.fixed && this.w) return this;
    const ow = this.w;
    this.w = w;
    if (h) this.h = h;
    if (!this.manual && !this.target && ow) { this.x += (this.w - ow) / 2; }
    if (this.bounds) { this.clamp(); }
    return this;
  }
  clamp() {
    if (!this.bounds) return this;
    const hw = this.w / (2 * this.zoom), hh = this.h / (2 * this.zoom);
    if (this.bounds.w <= hw * 2) this.x = this.bounds.cx;
    else this.x = clamp(this.x, this.bounds.x + hw, this.bounds.right - hw);
    if (this.bounds.h <= hh * 2) this.y = this.bounds.cy;
    else this.y = clamp(this.y, this.bounds.y + hh, this.bounds.bottom - hh);
    return this;
  }
  zoomer(z) { this.zoomto = z; return this; }
  zoomnow(z) { this.zoom = this.zoomto = z; return this; }
  shake(amp, sec = 0.25) {
    this.shakeamp = max(this.shakeamp, amp);
    this.shakedur = max(this.shakedur, sec);
    this.shaket = max(this.shaket, sec);
    return this;
  }
  punch(z, sec) { this.pzoom = z; this.ptime = sec; return this; }
  freeze(ms) { this.frozet = ms; return this; }
  aim(n) { if (n) this.target = n; return this; }
  frame(target, opts) { return this.follow(target, opts); }
  update(dt) {
    if (this.disabled) return this;
    const t = this.target;
    if (t && !this.manual) {
      let tx = t.wx + t.w * 0.5 + this.offx;
      let ty = t.wy + t.h * 0.5 + this.offy;
      const spd = t.rig ? t.rig.vx : 0;
      const spdy = t.rig ? t.rig.vy : 0;
      this.leadx = damp(this.leadx, spd * this.lead, 4, dt);
      this.leady2 = damp(this.leady2, spdy * this.leady, 2, dt);
      tx += this.leadx;
      ty += this.leady2;
      if (this.dead.w > 0) {
        const dx = tx - this.x, dy = ty - this.y;
        const hx = max(0, abs(dx) - this.dead.w / 2) * sign(dx);
        const hy = max(0, abs(dy) - this.dead.h / 2) * sign(dy);
        this.x = damp(this.x, this.x + hx, this.smoothx, dt);
        this.y = damp(this.y, this.y + hy, this.smoothy, dt);
      } else {
        this.x = damp(this.x, tx, this.smoothx, dt);
        this.y = damp(this.y, ty, this.smoothy, dt);
      }
    } else if (this.xt !== undefined && !this.locked) {
      this.x = damp(this.x, this.xt, this.smoothx, dt);
      this.y = damp(this.y, this.yt, this.smoothy, dt);
    }
    this.zoom = damp(this.zoom, this.zoomto, this.smoothz, dt);
    if (this.pzoom !== undefined && this.ptime !== undefined && this.ptime > 0) {
      this.ptime -= dt;
      if (this.ptime <= 0) { this.pzoom = undefined; this.ptime = undefined; }
    }
    if (this.shaket > 0) {
      this.shaket -= dt;
      const f = clamp01(this.shaket / max(0.0001, this.shakedur));
      const a = this.shakeamp * f * f;
      this.seed += dt * 60;
      this.shakex = (hash(floor(this.seed), 7) * 2 - 1) * a;
      this.shakey = (hash(floor(this.seed), 13) * 2 - 1) * a;
      if (this.shaket <= 0) { this.shakeamp = 0; this.shakex = 0; this.shakey = 0; }
    } else { this.shakex = 0; this.shakey = 0; }
    this.clamp();
    return this;
  }
  clamp() {
    if (!this.bounds) return this;
    const hw = this.w / (2 * this.zoom), hh = this.h / (2 * this.zoom);
    const b = this.bounds;
    if (b.w <= hw * 2) this.x = b.cx;
    else this.x = clamp(this.x, b.x + hw, b.right - hw);
    if (b.h <= hh * 2) this.y = b.cy;
    else this.y = clamp(this.y, b.y + hh, b.bottom - hh);
    return this;
  }
  matrix() {
    const pz = this.ptime > 0 && this.pzoom ? lerp(1, this.pzoom, clamp01(this.ptime / 0.14)) : 1;
    const z = this.zoom * pz;
    const hx = this.w / 2, hy = this.h / 2;
    let sx = hx + this.shakex;
    let sy = hy + this.shakey;
    let cx = this.x, cy = this.y;
    if (this.pixel && z >= 1) {
      const q = round(z);
      sx = round(sx);
      sy = round(sy);
      cx = round(cx * q) / q;
      cy = round(cy * q) / q;
    }
    this.mat.pos(sx, sy, this.rot + this.rotz, z, z).mul(this.tm.pos(-cx, -cy, 0, 1, 1));
    return this.mat;
  }
  viewbox(out) { return (out || this.vb || (this.vb = new box())).set(this.x - this.w / (2 * this.zoom), this.y - this.h / (2 * this.zoom), this.w / this.zoom, this.h / this.zoom); }
  screen(sx, sy, out) {
    out = out || new vec();
    this.matrix().invert(this.tsc || (this.tsc = new mat()));
    return this.tsc.apply(sx, sy, out);
  }
  worldof(wx, wy, out) {
    out = out || new vec();
    const m = this.matrix();
    out.x = m.appx(wx, wy);
    out.y = m.appy(wx, wy);
    return out;
  }
  inside(b, pad = 0) {
    const v = this.viewbox();
    return b.right + pad >= v.x && b.x - pad <= v.right && b.bottom + pad >= v.y && b.y - pad <= v.bottom;
  }
  trace(n) { this.target = n; return this; }
}

class scene extends node {
  constructor(opts = {}) {
    super(0, 0, 0, 0);
    const o = opts;
    this.name = o.name || 'scene';
    this.layers = {};
    this.bus = new bus();
    this.clock = new clock();
    this.uidirty = false;
    this.space = o.space === null ? null : new space(o.space || {});
    this.fx = new fx(o.fx || {});
    this.ui = new ui(o.ui || {});
    const vw = o.w || 320, vh = o.h || 180;
    this.cam = new camera(vw / 2, vh / 2, vw, vh, o.cam || {});
    this.hero = null;
    this.map = null;
    this.hitstopv = 0;
    this.hitstopf = 0.06;
    this.slowv = 0;
    this.slowf = 1;
    this.flasht = 0;
    this.flashc = paint.white;
    this.fadet = 0;
    this.fadec = paint.black;
    this.fadedir = 0;
    this.camw = o.w || 320;
    this.camh = o.h || 180;
    this.time = 0;
    this.game = null;
    this.p = null;
    this.music = o.music || null;
    this.death = 0;
    this.paused = false;
    this.started = false;
    this.warmup = o.warmup || 0;
    this.gravity = this.space ? this.space.gravity : new vec(0, 900);
    this.buildlayers();
    if (this.space) this.space.scene = this;
    this.build();
  }
  buildlayers() {
    const d = this.layers;
    d.back = new group(0, 0);
    d.back.layer = -20;
    d.main = new group(0, 0);
    d.main.layer = 0;
    d.top = new group(0, 0);
    d.top.layer = 20;
    this.add(d.back);
    this.add(d.main);
    this.add(d.top);
    this.fx.layer = 40;
    this.add(this.fx);
    this.ui.layer = 100;
    this.ui.z = 1000;
    this.add(this.ui);
  }
  build() { return this; }
  enter() { return this; }
  leave() { return this; }
  reindex() { this.uidirty = true; return this; }
  on(k, f) { this.bus.on(k, f); return this; }
  off(k, f) { this.bus.off(k, f); return this; }
  fire(k, a, b, c) { return this.bus.fire(k, a, b, c); }
  spawn(n, layer) {
    const l = layer || this.layers.main;
    l.add(n);
    n.scene = this;
    n.game = this.game;
    if (this.space) {
      this.space.add(n);
      if (n instanceof tilemap && !this.map) this.map = n;
    }
    if (n instanceof hero) this.hero = n;
    return n;
  }
  makehero(x, y, opts) {
    const h = new hero(x, y, opts);
    const l = (opts && opts.layer) || this.layers.main;
    this.spawn(h, l);
    if (this.space) this.space.add(h);
    this.hero = h;
    if (h.input === null && this.game) h.input = this.game.input;
    this.cam.follow(h, (opts && opts.cam) || {});
    return h;
  }
  makemap(set, rows, opts) {
    const m = new tilemap(set, rows, opts);
    this.spawn(m, (opts && opts.layer) || this.layers.back);
    this.map = m;
    if (this.cam && !(opts && opts.nocam)) {
      this.cam.bounds = new box(0, 0, m.w, m.h);
      if (!this.cam.target && !this.cam.manual) {
        this.cam.x = m.w / 2;
        this.cam.y = m.h / 2;
      }
      this.cam.clamp();
    }
    return m;
  }
  bind() { return this; }
  realdt(dt) { return dt; }
  step(dt) {
    const p = this.p;
    let d = dt;
    if (this.paused) return this;
    if (this.hero === null && this.space) this.hero = this.find('hero');
    if (this.hero && this.hero.input === null && this.game) this.hero.input = this.game.input;
    if (this.hitstopv > 0) { this.hitstopv -= dt; if (this.hitstopv > 0) d = dt * this.hitstopf; }
    if (this.slowv > 0) { this.slowv -= dt; d = dt * this.slowf; if (this.slowv <= 0) this.slowf = 1; }
    this.time += d;
    if (this.space) this.space.step(d);
    this.clock.step(d);
    this.cam.update(d);
    this.clocky = d;
    this.warmup = this.warmup > 0 ? this.warmup - d : 0;
    this.updateworld(d);
    if (this.update) this.update(d);
    this.stepped = true;
    if (this.fx && this.fx.space === undefined) this.fx.space = this.space;
    return this;
  }
  updateworld(dt) {
    const id = scene.ident;
    if (this.kids) {
      this.sort();
      for (let i = 0; i < this.kids.length; i++) {
        const k = this.kids[i];
        if (!k.live) continue;
        k.walk(dt, id);
      }
      for (let i = this.kids.length - 1; i >= 0; i--) if (!this.kids[i].live) this.kids.splice(i, 1);
    }
    return this;
  }
  draw(p) {
    this.p = p;
    const cam = this.cam;
    if (p.view) cam.size(p.view.w, p.view.h);
    if (!cam.target) cam.clamp();
    const m = cam.matrix();
    p.setcam(m);
    if (p.sceneinto && p.postlist && p.postlist.length) p.sceneinto();
    p.viewbox(null, p.cam);
    for (let i = 0; i < this.kids.length; i++) {
      const k = this.kids[i];
      if (k === this.ui) continue;
      k.draw(p);
    }
    if (this.ui) {
      const sm = this.ui.w;
      this.ui.w = p.width / p.scale;
      this.ui.h = p.height / p.scale;
      if (sm !== this.ui.w) this.ui.scan();
      const camsave = p.cam.copy();
      p.cam.pos(0, 0, 0, p.dpr, p.dpr);
      p.viewbox(null, p.cam);
      this.ui.draw(p);
      p.cam.setfrom(camsave);
    }
    if (p.renderpost) p.renderpost(this);
    return this;
  }
  shake(a, t) { this.cam.shake(a, t); return this; }
  hitstop(sec, f) { this.hitstopv = max(this.hitstopv, sec); this.hitstopf = f === undefined ? 0.06 : f; return this; }
  slowmo(sec, f) { this.slowv = sec; this.slowf = f; return this; }
  flash(c, sec = 0.12) { this.flashc = paint.of(c); this.flasht = sec; return this; }
  fadeto(c, sec = 0.4, dir = 0) { this.fadec = paint.of(c); this.fadedir = dir; this.fadet = sec; return this; }
  zoomto(z, sec) { this.cam.zoomer(z); if (sec) this.cam.punch(z, sec); return this; }
  addpost(e) { if (this.p && this.p.addpost) this.p.addpost(e); return this; }
  clearpost() { if (this.p && this.p.clearpost) this.p.clearpost(); return this; }
  paint(cb) { return this; }
  static ident = new mat();
}
class game {
  constructor(opts = {}) {
    const o = opts;
    this.canvas = null;
    this.view = { w: o.w || 320, h: o.h || 180 };
    this.pixelart = o.pixelart !== false;
    this.smooth = o.smooth === undefined ? !this.pixelart : o.smooth;
    this.dpr = o.dpr === undefined ? 1 : o.dpr;
    this.dprmax = o.dprmax || 2;
    this.mode = o.mode || 'fit';
    this.integer = o.integer !== false;
    this.fixed = o.fixed || 0;
    this.maxdt = o.maxdt || 0.05;
    this.speed = 1;
    this.time = 0;
    this.frames = 0;
    this.fps = 60;
    this.acc = 0;
    this.last = 0;
    this.running = false;
    this.paused = false;
    this.lock = false;
    this.scenes = {};
    this.scene = null;
    this.next = null;
    this.trans = null;
    this.bus = new bus();
    this.debug = { on: o.debug === true, bounds: false, grid: false, stats: false, log: [] };
    this.input = new input();
    this.audio = null;
    this.steps = o.steps || 0;
    this.titles = {};
    this.time0 = 0;
    this.hidden = false;
    this.container = null;
    this.realw = 0;
    this.realh = 0;
    this.autostart = o.autostart !== false;
    this.rafid = 0;
    this.boundsels = {};
    this.el = null;
    this.onloop = null;
    this.capturestream = null;
    this.p = null;
    this.posts = [];
    this.ready = false;
    this.metrics = { update: 0, draw: 0 };
    this.manual = o.manual === true;
    this.scalev = 1;
    this.offx = 0;
    this.offy = 0;
    this.err = null;
    this.fixedsteps = o.fixedsteps || 5;
    this.makecanvas(o);
    this.makepainter(o);
    this.bind();
    this.input.attach(this.canvas);
    this.audio = o.audio === false ? null : new audio(o.sound || {});
    this.save = o.save === false ? null : new store(o.savename || 'poxamel', o.save || {});
    if (this.audio && this.audio.ready) this.input.audio = this.audio;
    if (o.autoenter !== false) this.ready = true;
  }
  sizecanvas(w, h, ox, oy) {
    const s = this.canvas && this.canvas['style'];
    if (!s) return this;
    s['width'] = w + 'px';
    s['height'] = h + 'px';
    s['marginLeft'] = ox + 'px';
    s['marginTop'] = oy + 'px';
    return this;
  }
  makecanvas(o) {
    let c = o.canvas || o.el;
    if (typeof c === 'string') c = getel(c);
    if (!c) {
      c = elm('canvas');
      c['width'] = this.view.w;
      c['height'] = this.view.h;
      const holder = typeof o.parent === 'string' ? getel(o.parent) : (o.parent || null);
      if (holder && holder['appendChild']) holder['appendChild'](c);
      else if (env['document'] && env['document']['body'] && o.attach !== false) env['document']['body']['appendChild'](c);
    }
    this.canvas = c;
    if (c['style']) {
      c['style']['display'] = o.inline ? 'inline-block' : 'block';
      c['style']['imageRendering'] = this.smooth ? 'auto' : 'pixelated';
      if (o.css) for (const k in o.css) c['style'][k] = o.css[k];
    }
    this.container = o.parentel || c['parentElement'] || null;
    return this;
  }
  makepainter(o) {
    let p = null;
    const want = o.renderer || 'auto';
    if (want !== 'canvas') {
      try { p = new square(this.canvas, { alpha: o.alpha === true, antialias: this.smooth, dpr: this.dpr, smooth: this.smooth, preserve: o.preserve }); }
      catch (e) { if (want === 'gpu') throw e; p = null; }
    }
    if (!p) p = new canvaspain(this.canvas, { alpha: o.alpha === true });
    this.p = p;
    p.smooth = this.smooth;
    p.smoothforce = 0;
    p.pixel = this.pixelart ? 1 : 0;
    this.resize();
    return this;
  }
  bind() {
    const w = env;
    this.handlers = [];
    const add = (a, b) => { const h = (e) => b(e); w['addEventListener'](a, h); this.handlers.push([a, h]); };
    this.handlers = this.handlers || [];
    add('resize', () => this.resize());
    if (env['document']) {
      const doc = env['document'];
      doc['addEventListener']('visibilitychange', () => { this.hidden = !!doc['hidden']; if (this.hidden) this.fire('hidden'); else this.fire('shown'); });
      if (this.autostart) doc['addEventListener']('DOMContentLoaded', () => { if (!this.running && this.autostart) this.start(); });
    }
    if (env['ResizeObserver'] && this.container) {
      const ro = new env['ResizeObserver'](() => this.resize());
      ro['observe'](this.container);
      this.ro = ro;
    }
    this.canvas['addEventListener']('contextlost', (e) => { e['preventDefault'] && e['preventDefault'](); this.fire('contextlost'); });
    return this;
  }
  on(k, f) { this.bus.on(k, f); return this; }
  fire(k, a, b, c) { return this.bus.fire(k, a, b, c); }
  resize() {
    const v = this.view;
    const holder = this.container;
    let aw = v.w, ah = v.h;
    if (holder && holder['clientWidth']) { aw = holder['clientWidth']; ah = holder['clientHeight'] || v.h; }
    else if (env['innerWidth']) { aw = env['innerWidth']; ah = env['innerHeight']; }
    let scale = 1;
    if (this.mode === 'fit') scale = min(aw / v.w, ah / v.h);
    else if (this.mode === 'fill') scale = max(aw / v.w, ah / v.h);
    else if (this.mode === 'stretch') scale = 0;
    if (this.integer && scale > 1) scale = floor(scale);
    if (scale <= 0) {
      this.scalev = 1;
      this.offx = 0;
      this.offy = 0;
      this.realw = aw;
      this.realh = ah;
      this.p.resize(aw, ah, this.dpr);
      this.sizecanvas(aw, ah, 0, 0);
    }
    else {
      const cw = round(v.w * scale), ch = round(v.h * scale);
      this.scalev = scale;
      this.offx = round((aw - cw) / 2);
      this.offy = round((ah - ch) / 2);
      this.realw = cw;
      this.realh = ch;
      this.p.resize(v.w, v.h, this.dpr);
      this.sizecanvas(cw, ch, this.offx, this.offy);
    }
    this.input.xform = { sx: v.w / max(1, this.realw || v.w), sy: v.h / max(1, this.realh || v.h) };
    this.p.pixel = this.pixelart ? 1 : 0;
    this.fire('resize', this);
    return this;
  }
  add(name, cls, opts) { this.scenes[name] = { cls, opts }; return this; }
  makescene(name, opts) {
    const s = this.scenes[name];
    if (!s) return null;
    const sc = new s.cls(Object.assign({ name: name, w: this.view.w, h: this.view.h }, s.opts || {}, opts || {}));
    return sc;
  }
  goto(name, opts) {
    const sc = this.makescene(name, opts);
    if (!sc) { warn('PoxamelJs: no scene ' + name); return null; }
    return this.startscene(sc, opts);
  }
  startscene(sc, opts) {
    const o = opts || {};
    if (this.scene) { this.scene.leave(); }
    sc.game = this;
    sc.p = this.p;
    sc.w = this.view.w;
    sc.h = this.view.h;
    sc.ui.game = this;
    sc.ui.input = this.input;
    sc.ui.w = this.view.w;
    sc.ui.h = this.view.h;
    sc.cam.size(this.view.w, this.view.h);
    sc.ui.theme && (sc.ui.audio = this.audio);
    if (this.p && this.p.clearpost) this.p.clearpost();
    this.scene = sc;
    if (this.p && sc.posts && sc.posts.length) for (let i = 0; i < sc.posts.length; i++) this.p.addpost(sc.posts[i]);
    this.fire('scene', sc, o);
    sc.enter();
    if (this.audio && sc.music) this.audio.music(sc.music);
    sc.bind();
    return sc;
  }
  restart() { if (!this.scene) return this; const name = this.scene.name; const sc = this.makescene(name, { name }); return this.startscene(sc); }
  start() {
    if (this.running) return this;
    this.running = true;
    this.last = now();
    if (this.audio && this.audio.boot) this.audio.boot();
    if (!this.scene && objt['keys'](this.scenes).length) {
      const first = objt['keys'](this.scenes)[0];
      this.goto(first);
    }
    const loopf = (t) => {
      this.rafid = rafx(loopf);
      try { this.tick(t); } catch (e) { this.err = e; this.running = false; if (env['console']) env['console']['error'](e); else throw e; }
    };
    this.rafid = rafx(loopf);
    this.fire('start');
    return this;
  }
  stop() { this.running = false; if (this.rafid) cafx(this.rafid); this.fire('stop'); return this; }
  pause(v = true) { this.paused = v; this.fire(v ? 'pause' : 'resume'); return this; }
  step(t) { this.tick(t === undefined ? now() : t); return this; }
  tick(t) {
    const t0 = now();
    let dt = (t - this.last) / 1000;
    this.last = t;
    if (!isbad(dt)) this.fps = lerp(this.fps, 1 / max(0.0001, dt), 0.08);
    dt = min(max(dt, 0), this.maxdt);
    this.frames++;
    this.lastdt = dt;
    this.bus.fire('tick', dt, this);
    if (!this.paused) {
      if (this.fixed > 0) {
        this.acc += dt;
        let n = 0;
        while (this.acc >= this.fixed && n < this.fixedsteps) {
          this.input.step(this.fixed);
          if (this.scene && !this.hidden) this.scene.step(this.fixed * this.speed);
          this.acc -= this.fixed;
          n++;
          this.input.flush();
        }
        if (n === this.fixedsteps) this.acc = 0;
      } else {
        this.input.step(dt);
        if (this.scene && !this.hidden) this.scene.step(dt * this.speed);
        this.input.flush();
      }
      this.time += dt;
      this.steps++;
    }
    if (this.audio) this.audio.walk(dt);
    if (this.save) this.save.walk(dt);
    this.metrics.update = now() - t0;
    const t1 = now();
    if (this.scene) this.render();
    this.metrics.draw = now() - t1;
    if (this.debug.on && this.debug.stats) this.drawstats();
    if (this.onloop) this.onloop(dt);
    return this;
  }
  render() {
    const p = this.p;
    p.clock = this.time;
    p.beginframe(this.scene.bg === undefined ? null : this.scene.bg);
    this.scene.draw(p);
    this.drawoverlay(p);
    if (p.endframe) p.endframe();
    if (this.trans) this.drawtrans(p);
    if (this.debug.on) this.drawdebug(p);
    return this;
  }
  drawoverlay(p) {
    const sc = this.scene;
    if (!sc) return this;
    if (sc.flasht > 0 || sc.fadet > 0) {
      p.cam.pos(0, 0, 0, p.dpr, p.dpr);
      p.viewbox(null, p.cam);
      const W = p.width / p.scale, H = p.height / p.scale;
      if (sc.flasht > 0) {
        p.rect(0, 0, W, H, { fill: paint.alpha(sc.flashc, clamp01(sc.flasht * 6)) });
        sc.flasht -= this.lastdt || 0;
      }
      if (sc.fadet > 0) {
        p.rect(0, 0, W, H, { fill: paint.alpha(sc.fadec, clamp01(sc.fadedir >= 0 ? 1 - sc.fadet * 4 : sc.fadet * 4)) });
        sc.fadet -= this.lastdt || 0;
      }
    }
    return this;
  }
  drawtrans(p) {
    const tr = this.trans;
    tr.t += this.lastdt || 0;
    p.cam.pos(0, 0, 0, p.dpr, p.dpr);
    p.viewbox(null, p.cam);
    const f = clamp01(tr.t / tr.dur);
    const a = tr.dir > 0 ? f : 1 - f;
    p.begin(null);
    if (tr.kind === 'wipe') {
      p.rect(0, 0, p.width / p.scale, (p.height / p.scale) * a, { fill: tr.ink });
    } else if (tr.kind === 'iris') {
      const s = max(p.width / p.scale, p.height / p.scale);
      p.glow(p.width / p.scale / 2, p.height / p.scale / 2, s * (1 - a) * 0.75, tr.ink, 1, 'source-over');
      p.dot(p.width / p.scale / 2, p.height / p.scale / 2, s * (1 - a) * 1.5, s * (1 - a) * 1.5, tr.ink, 1, 'source-over');
    } else {
      p.rect(0, 0, p.width / p.scale, p.height / p.scale, { fill: paint.alpha(tr.ink, a) });
    }
    if (f >= 1) {
      const cb = tr.cb;
      this.trans = null;
      if (cb) cb(this);
    }
    return this;
  }
  drawdebug(p) {
    const d = this.debug;
    p.cam.pos(0, 0, 0, p.dpr, p.dpr);
    p.viewbox(null, p.cam);
    const W = p.width / p.scale, H = p.height / p.scale;
    if (d.grid) {
      const step2 = d.grid === true ? 32 : d.grid;
      for (let x = 0; x < W; x += step2) p.rect(x, 0, 1 / p.scale, H, { fill: 'rgba(120,200,255,0.14)' });
      for (let y = 0; y < H; y += step2) p.rect(0, y, W, 1 / p.scale, { fill: 'rgba(120,200,255,0.14)' });
    }
    if (d.bounds && this.scene) {
      const cam = this.scene.cam;
      const m = cam.matrix();
      const l = this.scene.where(() => true);
      for (let i = 0; i < l.length; i++) {
        const n = l[i];
        const b = n.bounds;
        p.rect(m.appx(b.x, b.y), m.appy(b.x, b.y), b.w * m.scale, b.h * m.scale, { stroke: n.live ? 'rgba(102,255,153,0.8)' : 'rgba(255,85,85,0.8)', linew: 1 });
      }
      if (this.scene.space) {
        const sp = this.scene.space;
        for (let i = 0; i < sp.blocks.length; i++) {
          const b = sp.blocks[i];
          p.rect(m.e + b.x, m.f + b.y, b.w, b.h, { stroke: 'rgba(255,210,102,0.9)', linew: 1 });
        }
        for (let i = 0; i < sp.lifts.length; i++) {
          const b = sp.lifts[i];
          p.rect(m.appx(b.x, b.y), m.appy(b.x, b.y), b.w * m.scale, b.h * m.scale, { stroke: 'rgba(255,140,220,0.9)', linew: 1 });
        }
      }
      const hero = this.scene.hero;
      if (hero) {
        const b = hero.rig.box();
        p.rect(m.appx(b.x, b.y), m.appy(b.x, b.y), b.w * m.scale, b.h * m.scale, { stroke: 'rgba(90,240,255,1)', linew: 1 });
        p.rect(m.appx(b.x, b.y), m.appy(b.x, b.y) - 14, max(1, abs(hero.rig.vx) / 3), 4, { fill: 'rgba(255,255,255,0.7)' });
      }
    }
    return this;
  }
  drawstats() {
    const p = this.p;
    p.begin(null);
    const t = 'fps ' + round(this.fps) + '  up ' + round(this.metrics.update * 10) / 10 + 'ms  draw ' + round(this.metrics.draw * 10) / 10 + 'ms  nodes ' + (this.scene ? this.scene.tally() : 0) + '  draw ' + p.stats.quads;
    p.rect(4, 4, t.length * 6.4 + 10, 18, { fill: 'rgba(0,0,0,0.55)', radius: 4 });
    const tx = new text(t, { size: 12, ink: '#9ef7c0', weight: '600' });
    tx.x = 9;
    tx.y = 6;
    p.begin(null);
    tx.inkstyle(p.gfx, p);
    return this;
  }
  transition(kind, color, dur, cb) {
    this.trans = { kind: kind || 'fade', ink: paint.of(color === undefined ? '#000000' : color), dur: dur === undefined ? 0.4 : dur, t: 0, dir: 1, cb };
    this.fire('transition', kind, color);
    return this;
  }
  transitionout(kind, color, dur, cb) {
    const tr = { kind: kind || 'fade', ink: paint.of(color === undefined ? '#000000' : color), dur: dur === undefined ? 0.4 : dur, t: 0, dir: -1, cb, start: 1 };
    this.trans = tr;
    return this;
  }
  snapshot(type) {
    if (this.p.gpu) return this.canvas['toDataURL'](type || 'image/png');
    return this.canvas['toDataURL'](type || 'image/png');
  }
  record(ms, opts) {
    const o = opts || {};
    if (!this.canvas['captureStream']) return null;
    let stream = o.stream || this.canvas['captureStream'](o.fps || 60);
    const rec = new env['MediaRecorder'](stream, o.mime ? { mimeType: o.mime } : undefined);
    const chunks = [];
    rec['ondataavailable'] = (e) => { if (e['data'] && e['data']['size']) chunks.push(e['data']); };
    const done = new plug((res) => {
      rec['onstop'] = () => {
        const blob = new env['Blob'](chunks, { type: o.mime || 'video/webm' });
        const url = env['URL'] ? env['URL']['createObjectURL'](blob) : null;
        if (o.download && env['document'] && url) {
          const a = elm('a');
          a['href'] = url;
          a['download'] = o.download === true ? 'poxamel.webm' : o.download;
          a.click();
        }
        res(url);
      };
    });
    rec.start();
    if (ms) later(() => rec.stop(), ms);
    this.rec = rec;
    return { rec, done };
  }
  focus() { if (this.canvas['focus']) this.canvas['focus'](); return this; }
  lockpointer(v) { this.input.lockpointer(v); return this; }
  destroy() {
    this.stop();
    for (let i = 0; i < (this.handlers || []).length; i++) { const h = this.handlers[i]; env['removeEventListener'](h[0], h[1]); }
    this.input.detach();
    if (this.audio) this.audio.close();
    return this;
  }
  layout() { return this.resize(); }
  setpixelart(v) { this.pixelart = !!v; this.smooth = !v; this.canvas['style'] && (this.canvas['style']['imageRendering'] = this.smooth ? 'auto' : 'pixelated'); this.p.smooth = this.smooth; return this; }
}

const later = (f, ms) => env['setTimeout'](f, ms);
const notes = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const notehz = (name) => {
  if (!name || name === '.' || name === '-') return 0;
  const m = regxc('^([A-Ga-g])(#|b)?(-?[0-9])?$').exec(strt(name).trim());
  if (!m) { const v = numof(name); return isbad(v) ? 0 : v; }
  let n = notes[m[1].toUpperCase()];
  if (m[2] === '#') n += 1;
  if (m[2] === 'b') n -= 1;
  const oct = m[3] === undefined ? 4 : intof(m[3]);
  return 440 * pow(2, (n + (oct - 4) * 12 - 9) / 12);
};

class voice {
  constructor(a, src, gain, opts) {
    const o = opts || {};
    this.audio = a;
    this.src = src;
    this.gain = gain;
    this.opts = o;
    this.on = true;
    this.t = 0;
    this.dur = o.dur || 0;
    this.fadev = o.fade || 0.02;
    this.loops = !!o.loop;
  }
  vol(v) { if (this.gain) this.gain.gain['setValueAtTime'](v, this.audio.now()); return this; }
  rate(r) { if (this.src && this.src['playbackRate']) this.src['playbackRate']['setValueAtTime'](r, this.audio.now()); return this; }
  stop(fade) {
    if (!this.on) return this;
    this.on = false;
    const t = this.audio.now();
    const f = fade === undefined ? this.fadev : fade;
    try {
      this.gain.gain['cancelScheduledValues'](t);
      this.gain.gain['setValueAtTime'](this.gain.gain['value'] || 0, t);
      this.gain.gain['linearRampToValueAtTime'](0.0001, t + f);
      this.src.stop(t + f + 0.01);
    } catch (e) { }
    return this;
  }
  step(dt) { if (this.dur) { this.t += dt; if (this.t >= this.dur) this.stop(); } return this; }
}

class audio {
  constructor(opts = {}) {
    const o = opts;
    this.opts = o;
    this.ctx = null;
    this.on = o.on !== false;
    this.mastervol = o.volume === undefined ? 0.9 : o.volume;
    this.sfxvol = o.sfx === undefined ? 1 : o.sfx;
    this.musvol = o.music === undefined ? 0.8 : o.music;
    this.buffers = {};
    this.defs = {};
    this.live = [];
    this.mus = null;
    this.musname = '';
    this.seqs = [];
    this.locked = true;
    this.ready = false;
    this.lastsec = 0;
    this.duckt = 0;
    this.defpatch();
    if (o.force) this.boot();
  }
  boot() {
    if (this.ctx) return this;
    const AC = env['AudioContext'] || env['webkitAudioContext'];
    if (!AC) { this.on = false; return this; }
    this.ctx = new AC(o0(this.opts));
    this.master = this.ctx['createGain']();
    this.master.gain['value'] = this.mastervol;
    this.comp = this.opts.comp === false ? null : this.ctx['createDynamicsCompressor']();
    this.sfxbus = this.ctx['createGain']();
    this.sfxbus.gain['value'] = this.sfxvol;
    this.musbus = this.ctx['createGain']();
    this.musbus.gain['value'] = this.musvol;
    if (this.comp) { this.sfxbus['connect'](this.comp); this.musbus['connect'](this.comp); this.comp['connect'](this.master); }
    else { this.sfxbus['connect'](this.master); this.musbus['connect'](this.master); }
    this.master['connect'](this.ctx['destination']);
    this.ready = true;
    const unlock = () => { if (this.ctx && this.ctx['state'] === 'suspended') this.ctx['resume'](); this.locked = false; };
    unlock();
    if (env['addEventListener']) { on('pointerdown', unlock); on('keydown', unlock); on('touchstart', unlock); }
    return this;
  }
  now() { return this.ctx ? this.ctx['currentTime'] : 0; }
  close() { if (this.ctx) { try { this.ctx['close'](); } catch (e) { } this.ctx = null; } return this; }
  mute(v = true) { this.on = !v; if (this.master) this.master.gain['value'] = v ? 0 : this.mastervol; return this; }
  volume(master, sfx, music) {
    if (master !== undefined) { this.mastervol = master; if (this.master) this.master.gain['value'] = master; }
    if (sfx !== undefined) { this.sfxvol = sfx; if (this.sfxbus) this.sfxbus.gain['value'] = sfx; }
    if (music !== undefined) { this.musvol = music; if (this.musbus) this.musbus.gain['value'] = music; }
    return this;
  }
  duck(sec = 0.4) { this.duckt = sec; return this; }
  defpatch() {
    const d = this.defs;
    d['click'] = { wave: 'square', freq: 880, freqto: 660, dur: 0.05, vol: 0.3, attack: 0.002, release: 0.04 };
    d['blip'] = { wave: 'square', freq: 1200, freqto: 1600, dur: 0.04, vol: 0.22 };
    d['jump'] = { wave: 'square', freq: 300, freqto: 720, dur: 0.16, vol: 0.3, attack: 0.005 };
    d['djump'] = { wave: 'triangle', freq: 420, freqto: 980, dur: 0.2, vol: 0.32 };
    d['land'] = { wave: 'triangle', freq: 160, freqto: 70, dur: 0.14, vol: 0.28, noise: 0.25 };
    d['dash'] = { wave: 'sawtooth', freq: 900, freqto: 180, dur: 0.22, vol: 0.3, filter: { type: 'lowpass', freq: 2400, freqto: 400, q: 6 }, noise: 0.2 };
    d['hurt'] = { wave: 'sawtooth', freq: 320, freqto: 90, dur: 0.28, vol: 0.36, filter: { type: 'lowpass', freq: 1400, q: 3 } };
    d['coin'] = { wave: 'square', freq: 988, freqto: 1319, dur: 0.16, vol: 0.3, release: 0.12 };
    d['powerup'] = { wave: 'square', freq: 523, freqto: 1568, dur: 0.4, vol: 0.3, release: 0.2 };
    d['shoot'] = { wave: 'sawtooth', freq: 1400, freqto: 200, dur: 0.12, vol: 0.24, filter: { type: 'bandpass', freq: 1800, q: 4 } };
    d['hit'] = { wave: 'square', freq: 220, freqto: 110, dur: 0.1, vol: 0.34, noise: 0.4, filter: { type: 'lowpass', freq: 2000, q: 2 } };
    d['slash'] = { wave: 'sawtooth', freq: 1800, freqto: 420, dur: 0.14, vol: 0.28, filter: { type: 'highpass', freq: 900, freqto: 300, q: 3 }, noise: 0.3 };
    d['explode'] = { wave: 'triangle', freq: 200, freqto: 30, dur: 0.5, vol: 0.4, noise: 0.85, filter: { type: 'lowpass', freq: 1200, freqto: 200, q: 4 } };
    d['die'] = { wave: 'sawtooth', freq: 400, freqto: 60, dur: 0.7, vol: 0.4, noise: 0.2, filter: { type: 'lowpass', freq: 900, q: 2 } };
    d['checkpoint'] = { wave: 'triangle', freq: 660, freqto: 990, dur: 0.35, vol: 0.3, release: 0.25 };
    d['step'] = { wave: 'triangle', freq: 180, freqto: 120, dur: 0.05, vol: 0.16, noise: 0.5, filter: { type: 'lowpass', freq: 900, q: 1 } };
    d['door'] = { wave: 'sine', freq: 240, freqto: 180, dur: 0.3, vol: 0.3, noise: 0.3, filter: { type: 'lowpass', freq: 600, q: 1 } };
    d['error'] = { wave: 'square', freq: 200, freqto: 150, dur: 0.2, vol: 0.3 };
    return this;
  }
  patch(name, def) { this.defs[name] = def; return this; }
  sfx(name, opts) {
    const def = this.defs[name];
    if (!def) return null;
    return this.tone(Object.assign({}, def, opts || {}));
  }
  tone(o) {
    if (!this.on) return null;
    if (!this.ctx) this.boot();
    if (!this.ctx) return null;
    const ctx = this.ctx;
    const t0 = ctx['currentTime'] + (o.delay || 0);
    const dur = o.dur === undefined ? 0.2 : o.dur;
    const release = o.release === undefined ? 0.08 : o.release;
    const vol = o.vol === undefined ? 0.3 : o.vol;
    const out = ctx['createGain']();
    const bus = o.music ? this.musbus : this.sfxbus;
    out.gain['value'] = 1;
    let node = out;
    if (o.pan !== undefined && ctx['createStereoPanner']) { const pan = ctx['createStereoPanner'](); pan.pan['value'] = clamp(o.pan, -1, 1); out['connect'](pan); node = pan; }
    if (o.filter) {
      const f = ctx['createBiquadFilter']();
      f['type'] = o.filter.type || 'lowpass';
      f.frequency['setValueAtTime'](o.filter.freq || 1200, t0);
      if (o.filter.freqto) f.frequency['exponentialRampToValueAtTime'](max(40, o.filter.freqto), t0 + dur);
      f.Q['value'] = o.filter.q === undefined ? 1 : o.filter.q;
      node['connect'](f);
      node = f;
    }
    if (o.reverb) {
      const conv = ctx['createConvolver']();
      conv.buffer = this.impulse(o.reverb === true ? 0.6 : o.reverb);
      node['connect'](conv);
      const wet = ctx['createGain']();
      wet.gain['value'] = o.reverbvol === undefined ? 0.35 : o.reverbvol;
      conv['connect'](wet);
      wet['connect'](bus);
    }
    node['connect'](bus);
    const env = ctx['createGain']();
    env.gain['value'] = 0.0001;
    const atk = o.attack === undefined ? 0.005 : o.attack;
    env.gain['setValueAtTime'](0.0001, t0);
    env.gain['linearRampToValueAtTime'](vol, t0 + atk);
    const dec = o.decay === undefined ? 0 : o.decay;
    const sus = o.sustain === undefined ? 1 : o.sustain;
    if (dec > 0) env.gain['linearRampToValueAtTime'](vol * sus, t0 + atk + dec);
    const off = max(0.01, dur);
    env.gain['setValueAtTime'](vol * (dec > 0 ? sus : 1), t0 + off);
    env.gain['linearRampToValueAtTime'](0.0001, t0 + off + release);
    env['connect'](out);
    const srcs = [];
    const mkosc = (wave, f, ft, det) => {
      const osc = ctx['createOscillator']();
      osc['type'] = wave || 'square';
      osc['frequency']['setValueAtTime'](max(1, f), t0);
      if (ft && ft !== f) osc['frequency']['exponentialRampToValueAtTime'](max(1, ft), t0 + (o.glide === undefined ? off : o.glide));
      if (det) osc['detune']['value'] = det;
      if (o.vibrato) {
        const lfo = ctx['createOscillator']();
        const lg = ctx['createGain']();
        lfo['frequency']['value'] = o.vibrato.rate || 5;
        lg.gain['value'] = o.vibrato.depth || 6;
        lfo['connect'](lg);
        lg['connect'](osc['frequency']);
        lfo['start'](t0);
        lfo['stop'](t0 + off + release + 0.02);
      }
      osc['connect'](env);
      osc['start'](t0);
      osc['stop'](t0 + off + release + 0.02);
      srcs.push(osc);
      return osc;
    };
    const f0 = o.freq === undefined ? 440 : o.freq;
    if (o.noise) {
      const nb = this.noisebuf(1);
      const ns = ctx['createBufferSource']();
      ns.buffer = nb;
      ns['loop'] = true;
      const ng = ctx['createGain']();
      ng.gain['value'] = o.noise;
      ns['connect'](ng);
      ng['connect'](env);
      ns['start'](t0);
      ns['stop'](t0 + off + release + 0.02);
      srcs.push(ns);
    }
    if (o.wave !== 'none') {
      if (o.wave2) mkosc(o.wave2, f0 * 2, (o.freqto || f0) * 2, o.detune2 || 7);
      mkosc(o.wave || 'square', f0, o.freqto, o.detune || 0);
    }
    const v = new voice(this, { stop: (t) => { for (let i = 0; i < srcs.length; i++) try { srcs[i]['stop'](t); } catch (e) { } } }, env, { dur: off + release, fade: 0.02 });
    this.live.push(v);
    return v;
  }
  impulse(sec) {
    if (!this.ctx) return null;
    const rate = this.ctx['sampleRate'];
    const len = max(1, floor(rate * sec));
    const buf = this.ctx['createBuffer'](2, len, rate);
    for (let c = 0; c < 2; c++) {
      const d = buf['getChannelData'](c);
      for (let i = 0; i < len; i++) d[i] = (hash(i, c) * 2 - 1) * pow(1 - i / len, 2.6);
    }
    return buf;
  }
  noisebuf(sec) {
    if (!this.ctx) return null;
    const rate = this.ctx['sampleRate'];
    const len = max(1, floor(rate * sec));
    const buf = this.ctx['createBuffer'](1, len, rate);
    const d = buf['getChannelData'](0);
    for (let i = 0; i < len; i++) d[i] = hash(i, 3) * 2 - 1;
    return buf;
  }
  load(name, url, opts) {
    if (!this.ctx) this.boot();
    if (!this.ctx) return plug['resolve'] ? plug['resolve'](null) : null;
    const f = (env['fetch'] || env['XMLHttpRequest']) && env['fetch'];
    if (!f) return null;
    return f(url)['then']((r) => r['arrayBuffer']())['then']((ab) => new plug((res) => {
      this.ctx['decodeAudioData'](ab, (buf) => { this.buffers[name] = buf; res(buf); }, () => res(null));
    }));
  }
  add(name, buf) { this.buffers[name] = buf; return this; }
  play(name, opts) {
    const o = opts || {};
    if (!this.on) return null;
    if (!this.ctx) this.boot();
    const buf = this.buffers[name];
    if (!this.ctx || !buf) return null;
    const ctx = this.ctx;
    const src = ctx['createBufferSource']();
    src.buffer = buf;
    src['loop'] = !!o.loop;
    src['playbackRate']['value'] = o.rate === undefined ? 1 : o.rate;
    const g = ctx['createGain']();
    g.gain['value'] = o.vol === undefined ? 1 : o.vol;
    let node = g;
    if (o.pan !== undefined && ctx['createStereoPanner']) { const p = ctx['createStereoPanner'](); p.pan['value'] = clamp(o.pan, -1, 1); g['connect'](p); node = p; }
    node['connect'](o.music ? this.musbus : this.sfxbus);
    src['connect'](g);
    src.start(ctx['currentTime'] + (o.delay || 0));
    const v = new voice(this, src, g, o);
    this.live.push(v);
    return v;
  }
  music(name, opts) {
    const o = opts || {};
    if (this.musname === name && this.mus) return this.mus;
    this.musicstop(o.fade === undefined ? 0.4 : o.fade);
    const v = this.play(name, { loop: true, vol: o.vol === undefined ? 1 : o.vol, music: true, loopsec: o.loopsec, rate: o.rate });
    this.mus = v;
    this.musname = name;
    if (v && o.fadein) { v.gain.gain['value'] = 0.001; v.gain.gain['linearRampToValueAtTime'](1, this.now() + o.fadein); }
    return v;
  }
  musicstop(fade = 0.5) { if (this.mus) { this.mus.stop(fade); this.mus = null; this.musname = ''; } return this; }
  track(def) {
    const s = new seq(this, def);
    this.seqs.push(s);
    s.start();
    return s;
  }
  stopall() { for (let i = 0; i < this.live.length; i++) this.live[i].stop(0.03); this.live.length = 0; for (let i = 0; i < this.seqs.length; i++) this.seqs[i].stop(); this.seqs.length = 0; return this; }
  walk(dt) {
    for (let i = this.live.length - 1; i >= 0; i--) { const v = this.live[i]; v.step(dt); if (!v.on && v.t > 0.05) this.live.splice(i, 1); else if (!v.on) this.live.splice(i, 1); }
    if (this.duckt > 0) { this.duckt -= dt; if (this.musbus) this.musbus.gain['value'] = this.musvol * 0.45; }
    else if (this.musbus && abs(this.musbus.gain['value'] - this.musvol) > 0.001) this.musbus.gain['value'] = this.musvol;
    for (let i = 0; i < this.seqs.length; i++) this.seqs[i].pump();
    return this;
  }
}
const o0 = (opts) => (opts && opts.latency ? { latencyHint: opts.latency } : { latencyHint: 'interactive' });

class seq {
  constructor(a, def) {
    const d = def || {};
    this.a = a;
    this.bpm = d.bpm || 132;
    this.steps = d.steps || 16;
    this.bars = d.bars || 4;
    this.lead = (d.lead || '').trim().split(/\s+/).filter((s) => s.length);
    this.bass = (d.bass || '').trim().split(/\s+/).filter((s) => s.length);
    this.chords = (d.chords || '').trim().split(/\s+/).filter((s) => s.length);
    this.drums = (d.drums || '').split('');
    this.leadwave = d.leadwave || 'square';
    this.basswave = d.basswave || 'triangle';
    this.vol = d.vol === undefined ? 0.22 : d.vol;
    this.bassvol = d.bassvol === undefined ? 0.28 : d.bassvol;
    this.drumvol = d.drumvol === undefined ? 0.3 : d.drumvol;
    this.idx = 0;
    this.t0 = 0;
    this.look = 0.18;
    this.timer = null;
    this.on = false;
    this.loop = d.loop !== false;
    this.reverb = d.reverb;
    this.timer = null;
  }
  stepdur() { return 60 / max(1, this.bpm) / 4; }
  start() {
    if (this.on) return this;
    this.a.boot();
    if (!this.a.ctx) return this;
    this.on = true;
    this.t0 = this.a.now() + 0.1;
    this.idx = 0;
    const pump = () => { if (this.on) this.pump(); };
    this.timer = env['setInterval'](pump, 40);
    return this;
  }
  stop() { this.on = false; if (this.timer) { env['clearInterval'](this.timer); this.timer = null; } return this; }
  pump() {
    if (!this.on || !this.a.ctx) return this;
    const now2 = this.a.now();
    const sd = this.stepdur();
    while (this.t0 + this.idx * sd < now2 + this.look) {
      this.hit(this.idx, this.t0 + this.idx * sd);
      this.idx++;
      if (this.idx >= this.steps * this.bars) {
        if (!this.loop) { this.stop(); return this; }
        this.idx = 0;
        this.t0 = now2 + 0.05;
      }
    }
    return this;
  }
  hit(i, t) {
    const a = this.a;
    const delay = max(0, t - a.now());
    const at = i % this.steps;
    const hz = (list, vol, wave, oct) => {
      const v = list[i % list.length];
      if (!v || v === '.' || v === '-') return;
      a.tone({ freq: notehz(v) * (oct || 1), wave, dur: this.stepdur() * 0.9, vol, delay, attack: 0.004, release: 0.06, filter: { type: 'lowpass', freq: 5200, q: 0.7 }, reverb: this.reverb ? 0.4 : 0, music: true });
    };
    if (this.lead.length) hz(this.lead, this.vol, this.leadwave);
    if (this.bass.length) hz(this.bass, this.bassvol, this.basswave, 0.5);
    if (this.chords.length && at % 4 === 0) {
      const v = this.chords[(i / 4) % this.chords.length | 0];
      if (v && v !== '.' && v !== '-') {
        const base = notehz(v);
        a.tone({ freq: base, wave: 'triangle', dur: this.stepdur() * 3.4, vol: this.vol * 0.5, delay, attack: 0.02, release: 0.2, music: true });
        a.tone({ freq: base * 1.26, wave: 'triangle', dur: this.stepdur() * 3.4, vol: this.vol * 0.35, delay, attack: 0.02, release: 0.2, music: true });
        a.tone({ freq: base * 1.5, wave: 'triangle', dur: this.stepdur() * 3.4, vol: this.vol * 0.35, delay, attack: 0.02, release: 0.2, music: true });
      }
    }
    const dr = this.drums.length ? this.drums[i % this.drums.length] : '';
    if (dr === 'k' || dr === 'K') a.tone({ freq: 120, freqto: 45, wave: 'sine', dur: 0.14, vol: this.drumvol, delay, attack: 0.002, release: 0.05, music: true });
    else if (dr === 's' || dr === 'S') a.tone({ freq: 200, freqto: 140, wave: 'none', noise: 0.9, dur: 0.12, vol: this.drumvol * 0.8, delay, filter: { type: 'highpass', freq: 900, q: 0.7 }, release: 0.06, music: true });
    else if (dr === 'h' || dr === 't') a.tone({ freq: 6000, wave: 'none', noise: 0.4, dur: 0.04, vol: this.drumvol * 0.4, delay, filter: { type: 'highpass', freq: 5000, q: 0.5 }, release: 0.03, music: true });
    else if (dr === 'o') a.tone({ freq: 4000, wave: 'none', noise: 0.5, dur: 0.09, vol: this.drumvol * 0.45, delay, filter: { type: 'highpass', freq: 3000, q: 0.5 }, release: 0.05, music: true });
    return this;
  }
}
const pixels = (rows, palette, opts = {}) => {
  const r = typeof rows === 'string' ? rows.split('\n') : rows;
  const scale = opts.scale || 1;
  let w = 0;
  for (let i = 0; i < r.length; i++) w = max(w, r[i].length);
  const h = r.length;
  const a = art.make(w * scale, h * scale);
  const g = a.ctx;
  const pal = palette || {};
  const colr = (ch) => {
    if (typeof pal === 'function') return pal(ch);
    if (arrt['isArray'](pal)) return pal[intof(ch, 36) % pal.length];
    return pal[ch] || null;
  };
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < r[y].length; x++) {
      const ch = r[y][x];
      if (ch === ' ' || ch === '.') continue;
      const c = colr(ch);
      if (!c) continue;
      g['fillStyle'] = paint.css(c);
      g['fillRect'](x * scale, y * scale, scale, scale);
    }
  }
  a.smooth = false;
  a.src = 2;
  a.auto();
  return a;
};

const drect = (g, x, y, w, h, c) => { g['fillStyle'] = paint.css(c); g['fillRect'](round(x), round(y), round(w), round(h)); return g; };
const dcirc = (g, x, y, r, c) => { g['fillStyle'] = paint.css(c); g['beginPath'](); g['arc'](x, y, r, 0, tau); g.fill(); return g; };

const gen = {
  hero(opts = {}) {
    const o = opts;
    const pal = {
      skin: o.skin || '#ffd9b0',
      hair: o.hair || '#e5484d',
      body: o.body || '#4a5ac4',
      body2: o.body2 || '#333d8f',
      leg: o.leg || '#2b2f4a',
      leg2: o.leg2 || '#1d2035',
      cap: o.cap || '#e5484d',
      eye: o.eye || '#151a2a',
      sc: o.scarf || '#f0e6d2',
      blade: o.blade || '#dfe6f2'
    };
    const w = 22, h = 30;
    const a = art.make(w, h);
    const g = a.ctx;
    const frame = (name, i, n) => {
      const t = n > 1 ? i / n : 0;
      a.frame(name + i, 0, 0, w, h);
      return t;
    };
    const body = (fy, lean, lega, legb, arma, armB, sc) => {
      g['clearRect'](0, 0, w, h);
      const bx = 6 + lean;
      drect(g, bx + 1, 12 + fy, 8, 11, pal.body);
      drect(g, bx + 1, 12 + fy, 8, 4, pal.body2);
      drect(g, bx, 20 + fy, 10, 3, pal.body2);
      drect(g, bx + 2, 23 + fy + max(0, lega), 3, 6 - max(0, -lega), pal.leg);
      drect(g, bx + 6, 23 + fy + max(0, legb), 3, 6 - max(0, -legb), pal.leg2);
      drect(g, bx + 2, 27 + fy + max(0, lega), 4, 2, pal.leg2);
      drect(g, bx + 6, 27 + fy + max(0, legb), 4, 2, pal.leg2);
      const ayy = 13 + fy + arma;
      drect(g, bx - 1, ayy, 3, 6, pal.body);
      drect(g, bx + 8, ayy + armB, 3, 6, pal.body2);
      dcirc(g, bx + 4.5, 6 + fy, 5, pal.skin);
      drect(g, bx, 1 + fy, 10, 6, pal.hair);
      drect(g, bx - 1, 5 + fy, 12, 3, pal.hair);
      drect(g, bx + 2, 1 + fy, 2, 2, pal.cap);
      drect(g, bx + 3, 7 + fy, 2, 2, pal.eye);
      drect(g, bx + 7, 7 + fy, 2, 2, pal.eye);
      drect(g, bx + 4, 11 + fy, 3, 1, pal.skin);
      if (sc) { drect(g, bx - 3, 10 + fy + sc, 6, 3, pal.scarf); drect(g, bx - 5, 11 + fy + sc, 4, 2, pal.scarf); }
    };
    const clips = { idle: [], run: [], jump: [], fall: [], dash: [], attack: [], hurt: [], dead: [], land: [], wall: [], grab: [], rise: [] };
    for (let i = 0; i < 4; i++) { body(sin((i / 4) * tau) * 0.5, 0, sin((i / 4) * tau), -sin((i / 4) * tau), 0, sin((i / 4) * tau + 1), i % 2); clips.idle.push(frame('idle', i)); }
    for (let i = 0; i < 6; i++) { const s = sin((i / 6) * tau); body(-abs(s) * 0.8, 0, s * 2.2, -s * 2.2, -s * 1.6, s * 1.6, (i % 3) - 1); clips.run.push(frame('run', i)); }
    body(-1, 0, -2, 1, -3, 2, 1); clips.jump.push(frame('jump', 0));
    body(1, 0, -3, 1, -1, 3, 0); clips.jump.push(frame('jump', 1));
    body(1, 0, 2, -1, 2, -2, 1); clips.fall.push(frame('fall', 0));
    body(1, 0, 3, -2, 3, -1, 3); clips.fall.push(frame('fall', 1));
    body(0, 1, 2, -1, 4, -4, 2); clips.dash.push(frame('dash', 0));
    body(0, 1, 1, -2, 5, -5, -1); clips.dash.push(frame('dash', 1));
    body(0, 0, 0, 0, -2, 4, 0); clips.attack.push(frame('attack', 0));
    { body(0, 0, 0, 0, -1, 6, 1); drect(g, 15, 11, 7, 3, pal.blade); drect(g, 20, 10, 2, 5, pal.scarf); clips.attack.push(frame('attack', 1)); }
    { body(0, 0, 0, 0, 0, 7, 2); drect(g, 16, 12, 4, 2, pal.blade); clips.attack.push(frame('attack', 2)); }
    body(0, -1, 1, -1, -3, 3, -2); clips.hurt.push(frame('hurt', 0));
    body(0, -1, 2, -1, -4, 4, -2); clips.dead.push(frame('dead', 0));
    body(2, -2, 4, -3, -5, 5, -3); clips.dead.push(frame('dead', 1));
    body(1, 0, 1, 1, 2, -2, 2); clips.land.push(frame('land', 0));
    body(0, -1, -1, -1, 2, -3, 2); clips.wall.push(frame('wall', 0));
    body(0, -1, -2, -1, 3, -4, 1); clips.grab.push(frame('grab', 0));
    body(0, -1, -2, -1, 3, -4, 1); clips.grab.push(frame('grab', 1));
    body(-1, 0, -2, 1, -3, 2, 0); clips.rise.push(frame('rise', 0));
    a.clip('idle', clips.idle, 6, true);
    a.clip('run', clips.run, 12, true);
    a.clip('jump', clips.jump, 8, true);
    a.clip('fall', clips.fall, 6, true);
    a.clip('dash', clips.dash, 10, true);
    a.clip('attack', clips.attack, 16, false);
    a.clip('hurt', clips.hurt, 6, true);
    a.clip('dead', clips.dead, 5, true);
    a.clip('land', clips.land, 8, false);
    a.clip('wall', clips.wall, 6, true);
    a.clip('grab', clips.grab, 4, true);
    a.clip('rise', clips.rise, 8, true);
    a.smooth = false;
    a.src = 2;
    return a;
  },
  creature(kind = 'slime', opts = {}) {
    const o = opts;
    const pal = { body: o.body || '#7bd389', body2: o.body2 || '#4ea764', eye: o.eye || '#12231a', dark: o.dark || '#2c3b53', leg: o.leg || '#5a4a7a', wing: o.wing || '#c8a6ff' };
    const sizes = { slime: [24, 18], walker: [20, 26], flyer: [26, 18], brute: [30, 30], blob: [26, 22], bat: [26, 14], spiky: [22, 20] };
    const [w, h] = sizes[kind] || sizes.slime;
    const a = art.make(w, h);
    const g = a.ctx;
    const fr = (n) => { a.frame(strt(n), 0, 0, w, h); return strt(n); };
    const clips = { idle: [], walk: [], attack: [], hurt: [], dead: [] };
    if (kind === 'slime' || kind === 'blob') {
      const bw = w - 4, bh0 = h - 4;
      for (let i = 0; i < 2; i++) {
        g['clearRect'](0, 0, w, h);
        const sq = i ? 1 : 0;
        const bh = bh0 - sq;
        drect(g, 2, h - 3 - bh, bw, 2, pal.body2);
        dcirc(g, w / 2, h - 2 - bh / 2 - 1, bw / 2, pal.body);
        drect(g, 2, h - 2 - bh / 2, bw, bh / 2 + 1, pal.body);
        drect(g, w / 2 - 5, h - bh + 2, 3, 3, pal.eye);
        drect(g, w / 2 + 2, h - bh + 2, 3, 3, pal.eye);
        drect(g, w / 2 - 2, h - bh + 6, 4, 2, pal.body2);
        clips.idle.push(fr('s' + i));
        clips.walk.push(fr('s' + i));
      }
      for (let i = 0; i < 2; i++) {
        g['clearRect'](0, 0, w, h);
        dcirc(g, w / 2, h - 5, (w - 4) / 2, pal.body);
        drect(g, 2, h - 8, bw, 6, pal.body);
        drect(g, w / 2 - 6, h / 2, 4, 4, pal.eye);
        drect(g, w / 2 + 3, h / 2, 4, 4, pal.eye);
        drect(g, w / 2 - 3, h - 9, 6, 3, pal.eye);
        clips.attack.push(fr('a' + i));
      }
    } else if (kind === 'walker' || kind === 'brute') {
      const bw = kind === 'brute' ? 20 : 12, bhh = kind === 'brute' ? 14 : 12;
      for (let i = 0; i < 4; i++) {
        g['clearRect'](0, 0, w, h);
        const s = i < 2 ? 1 : -1;
        const bx = (w - bw) / 2;
        drect(g, bx, h - 20, bw, bhh, pal.body);
        drect(g, bx, h - 20, bw, 4, pal.body2);
        drect(g, bx - s * 2, h - 8 + (i % 2) * 2, 4, 8 - (i % 2) * 2, pal.leg);
        drect(g, bx + bw - 2 + s * 2, h - 8 + (1 - (i % 2)) * 2, 4, 8 - (1 - (i % 2)) * 2, pal.leg);
        dcirc(g, bx + bw / 2, h - 22, bw * 0.42, pal.body);
        drect(g, bx + bw / 2 - 4, h - 24, 3, 3, pal.eye);
        drect(g, bx + bw / 2 + 1, h - 24, 3, 3, pal.eye);
        if (kind === 'brute') { drect(g, bx - 3, h - 18, bw + 6, 4, pal.dark); drect(g, bx + bw / 2 - 2, h - 28, 4, 6, pal.dark); }
        clips.idle.push(fr('w' + i));
        clips.walk.push(fr('w' + i));
      }
      for (let i = 0; i < 2; i++) {
        g['clearRect'](0, 0, w, h);
        const bx = (w - bw) / 2;
        drect(g, bx + i * 2, h - 18, bw, bhh, pal.body);
        dcirc(g, bx + bw / 2 + i * 2, h - 20, bw * 0.42, pal.body);
        drect(g, bx + bw / 2 - 4 + i * 2, h - 22, 3, 3, pal.eye);
        drect(g, bx + bw / 2 + 1 + i * 2, h - 22, 3, 3, pal.eye);
        drect(g, bx - 4 + i * 3, h - 14, 6, 4, pal.dark);
        drect(g, bx + bw - 2 + i * 3, h - 14, 8, 3, pal.body2);
        clips.attack.push(fr('wa' + i));
      }
    } else if (kind === 'flyer' || kind === 'bat') {
      for (let i = 0; i < 2; i++) {
        g['clearRect'](0, 0, w, h);
        const up = i === 0;
        dcirc(g, w / 2, h / 2 + 1, w * 0.22, pal.body);
        drect(g, w / 2 - 4, h / 2 - 2, 3, 3, pal.eye);
        drect(g, w / 2 + 2, h / 2 - 2, 3, 3, pal.eye);
        const wy = up ? -3 : 3;
        g['fillStyle'] = paint.css(pal.wing);
        g['beginPath']();
        g['moveTo'](w / 2 - 3, h / 2);
        g['lineTo'](2, h / 2 + wy);
        g['lineTo'](6, h / 2 + 4);
        g.closePath();
        g.fill();
        g['beginPath']();
        g['moveTo'](w / 2 + 3, h / 2);
        g['lineTo'](w - 2, h / 2 + wy);
        g['lineTo'](w - 6, h / 2 + 4);
        g.closePath();
        g.fill();
        clips.idle.push(fr('f' + i));
        clips.walk.push(fr('f' + i));
      }
      for (let i = 0; i < 2; i++) {
        g['clearRect'](0, 0, w, h);
        dcirc(g, w / 2, h / 2, w * 0.26, pal.body);
        drect(g, w / 2 - 5, h / 2 - 3, 4, 4, pal.eye);
        drect(g, w / 2 + 2, h / 2 - 3, 4, 4, pal.eye);
        drect(g, w / 2 - 2, h / 2 + 4, 5, 3, pal.eye);
        clips.attack.push(fr('fa' + i));
      }
    } else {
      for (let i = 0; i < 2; i++) {
        g['clearRect'](0, 0, w, h);
        dcirc(g, w / 2, h / 2, w / 2 - 2, pal.body);
        for (let k = 0; k < 8; k++) { const an = (k / 8) * tau; drect(g, w / 2 + cos(an) * (w / 2 - 1) - 1, h / 2 + sin(an) * (w / 2 - 1) - 1, 3, 3, pal.dark); }
        drect(g, w / 2 - 5, h / 2 - 2, 3, 3, pal.eye);
        drect(g, w / 2 + 2, h / 2 - 2, 3, 3, pal.eye);
        clips.idle.push(fr('k' + i));
        clips.walk.push(fr('k' + i));
      }
    }
    a.clip('idle', clips.idle, 3, true);
    a.clip('walk', clips.walk, 7, true);
    a.clip('run', clips.walk, 10, true);
    a.clip('jump', clips.walk.slice(0, 1), 6, true);
    a.clip('fall', clips.idle.slice(0, 1), 6, true);
    a.clip('attack', clips.attack, 9, false);
    a.clip('hurt', clips.idle.slice(0, 1), 6, true);
    a.clip('dead', clips.idle.slice(0, 1), 6, true);
    a.smooth = false;
    a.src = 2;
    return a;
  },
  pickups(opts = {}) {
    const o = opts;
    const coin = art.make(10, 10);
    const g = coin.ctx;
    for (let i = 0; i < 6; i++) {
      g['clearRect'](0, 0, 10, 10);
      const wid = 8 - abs(3 - i) * 2;
      dcirc(g, 5, 5, wid / 2 + 1, o.coin2 || '#c98a12');
      dcirc(g, 5, 5, wid / 2, o.coin || '#ffd166');
      if (wid > 3) drect(g, 4, 3, 2, 4, o.coin2 || '#c98a12');
      coin.frame(strt(i), 0, 0, 10, 10);
    }
    coin.clip('spin', ['0', '1', '2', '3', '4', '5'], 10, true);
    coin.smooth = false;
    coin.src = 2;
    const heart = art.make(12, 12);
    const hg = heart.ctx;
    const hp = o.heart || '#ff6f8a';
    const hp2 = o.heart2 || '#b8374f';
    hg['fillStyle'] = paint.css(hp);
    hg['beginPath']();
    hg['moveTo'](6, 11);
    hg['bezierCurveTo'](-2, 5, 1, -1, 6, 4);
    hg['bezierCurveTo'](11, -1, 14, 5, 6, 11);
    hg.fill();
    drect(hg, 4, 3, 2, 2, hp2);
    heart.auto();
    heart.smooth = false;
    heart.src = 2;
    const gem = art.make(12, 14);
    const gg = gem.ctx;
    const gc = o.gem || '#8ef3ff';
    const gc2 = o.gem2 || '#3b8fbf';
    gg['fillStyle'] = paint.css(gc);
    gg['beginPath']();
    gg['moveTo'](6, 0);
    gg['lineTo'](12, 5);
    gg['lineTo'](6, 14);
    gg['lineTo'](0, 5);
    gg.closePath();
    gg.fill();
    drect(gg, 4, 3, 3, 6, gc2);
    gem.auto();
    gem.smooth = false;
    gem.src = 2;
    const star = art.make(12, 12);
    const sg = star.ctx;
    sg['fillStyle'] = paint.css(o.star || '#fff2a8');
    sg['beginPath']();
    for (let k = 0; k < 10; k++) { const a2 = (k / 10) * tau - pi / 2; const r = k % 2 ? 2.6 : 6; const x = 6 + cos(a2) * r, y = 6 + sin(a2) * r; if (k === 0) sg['moveTo'](x, y); else sg['lineTo'](x, y); }
    sg.closePath();
    sg.fill();
    star.auto();
    star.smooth = false;
    star.src = 2;
    const key = art.make(12, 12);
    const kg = key.ctx;
    dcirc(kg, 4, 4, 3, o.key || '#ffe066');
    dcirc(kg, 4, 4, 1.4, '#1a1a24');
    drect(kg, 5, 6, 2, 6, o.key || '#ffe066');
    drect(kg, 7, 9, 3, 2, o.key || '#ffe066');
    key.auto();
    key.smooth = false;
    key.src = 2;
    return { coin, heart, gem, star, key };
  },
  terrain(opts = {}) {
    const o = opts;
    const ts = o.tile || 16;
    const cols = 4, rows = 4;
    const a = art.make(cols * ts, rows * ts + ts * 4);
    const g = a.ctx;
    const top = o.top || '#6bbf59';
    const top2 = o.top2 || '#4d9440';
    const fill = o.fill || '#6b5636';
    const fill2 = o.fill2 || '#54432a';
    const edge = o.edge || '#3d3020';
    const hl = o.hl || '#84694a';
    const rock = o.rock || '#8a7452';
    for (let m = 0; m < 16; m++) {
      const x = (m % cols) * ts, y = floor(m / cols) * ts;
      drect(g, x, y, ts, ts, fill);
      g['fillStyle'] = paint.css(fill2);
      for (let i = 0; i < 5; i++) { const hx = hash(i + m * 31, 1), hy = hash(i + m * 31, 2); g['fillRect'](x + floor(hx * (ts - 4)) + 2, y + floor(hy * (ts - 4)) + 2, 3, 3); }
      if (!(m & 1)) drect(g, x, y, ts, 5, top);
      if (!(m & 1)) drect(g, x, y + 4, ts, 2, top2);
      if (!(m & 2)) drect(g, x + ts - 3, y, 3, ts, edge);
      if (!(m & 8)) drect(g, x, y, 3, ts, edge);
      if (!(m & 4)) drect(g, x, y + ts - 3, ts, 3, edge);
      if (m & 1) drect(g, x, y, ts, 2, rock);
      drect(g, x + 2, y + ts - 6, 3, 2, hl);
      a.frame(strt(m), x, y, ts, ts);
    }
    const py = rows * ts;
    drect(g, 0, py, ts, ts, fill2);
    drect(g, 0, py, ts, 6, top);
    a.frame('oneway', 0, py, ts, ts);
    drect(g, 0, py + 6, ts, 3, top2);
    drect(g, 0, py + ts - 3, ts, 3, edge);
    a.frame('plat', 0, py, ts, ts);
    const sy = py + ts;
    g['clearRect'](0, sy, ts, ts);
    g['fillStyle'] = paint.css(o.spike || '#cfd8e8');
    for (let i = 0; i < 4; i++) {
      g['beginPath']();
      g['moveTo'](i * 4, sy + ts);
      g['lineTo'](i * 4 + 2, sy + 4);
      g['lineTo'](i * 4 + 4, sy + ts);
      g.closePath();
      g.fill();
    }
    drect(g, 0, sy + ts - 3, ts, 3, o.spike2 || '#8c98ad');
    a.frame('spike', 0, sy, ts, ts);
    a.frame('slope', 0, py + ts * 2, ts, ts);
    g['clearRect'](0, py + ts * 3, ts, ts);
    a.smooth = false;
    a.src = 2;
    const set = new tileset(a, ts, ts, { cols: cols });
    for (let m = 0; m < 16; m++) set.def(strt(m), m, { solid: true });
    set.def('A', 0, { solid: true, auto: true });
    set.def('B', 0, { solid: true, auto: true });
    set.def('C', 0, { solid: true, auto: true });
    set.def('P', 16, { oneway: true });
    set.def('X', 17, { hazard: 1 });
    set.def('S', 18, { solid: true, slope: 1 });
    set.def('Z', 18, { solid: true, slope: -1 });
    set.def('>', 18, { solid: true, slope: 1 });
    set.def('<', 18, { solid: true, slope: -1 });
    set.def('/', 18, { solid: true, slope: 1 });
    set.def('#', 0, { solid: true, auto: true });
    set.def('@', 19, {});
    set.def('!', 19, {});
    set.def('?', 19, {});
    set.blank = 19;
    set.tilecount = 16;
    return set;
  },
  parallax(opts = {}) {
    const o = opts;
    const w = o.w || 480, h = o.h || 200;
    const a = art.make(w, h);
    const g = a.ctx;
    const layers = o.layers || [
      { y: 0.72, c: o.far || '#2a3550', amp: 26, seed: 3 },
      { y: 0.82, c: o.mid || '#1f2a42', amp: 40, seed: 7 },
      { y: 0.92, c: o.near || '#161f33', amp: 60, seed: 11 }
    ];
    for (let i = 0; i < layers.length; i++) {
      const l = layers[i];
      g['fillStyle'] = paint.css(l.c);
      g['beginPath']();
      g['moveTo'](0, h);
      const base = h * l.y;
      for (let x = 0; x <= w; x += 8) {
        const yy = base - fbm(x / (90 - i * 18) + l.seed, 0, 3) * l.amp - sin(x / 60) * 6;
        g['lineTo'](x, yy);
      }
      g['lineTo'](w, h);
      g.closePath();
      g.fill();
      for (let k = 0; k < 26; k++) {
        const tx = hash(k * 13 + i * 7, 1) * w;
        const ty = base - fbm(tx / (90 - i * 18) + l.seed, 0, 3) * l.amp;
        drect(g, tx, ty - 10 - (i * 2), 5, 12 + i * 2, paint.dark(l.c, 0.15));
      }
    }
    a.smooth = true;
    a.src = 2;
    a.auto();
    return a;
  },
  sky(opts = {}) {
    const o = opts;
    const w = o.w || 8, h = o.h || 256;
    const a = art.make(w, h);
    const g = a.ctx;
    const list = o.colors || ['#0b1020', '#1b2a52', '#3b4d8a', '#7a86c9', '#c9a3c9'];
    const gr = paint.grad(g, a.newbox(), list, true);
    g['fillStyle'] = gr;
    g['fillRect'](0, 0, w, h);
    for (let i = 0; i < 90; i++) {
      const x = hash(i, 5) * w, y = hash(i, 9) * h * 0.6;
      const s = hash(i, 13) > 0.85 ? 2 : 1;
      g['fillStyle'] = paint.css(paint.alpha(paint.white, 0.25 + hash(i, 17) * 0.7));
      g['fillRect'](floor(x), floor(y), s, s);
    }
    a.smooth = true;
    a.src = 2;
    a.auto();
    return a;
  },
  panel(opts = {}) {
    const o = opts;
    const s = o.slice || 8;
    const a = art.make(s * 3, s * 3);
    const g = a.ctx;
    const fill = o.fill || '#1e2637';
    const edge = o.edge || 'rgba(232,238,252,0.16)';
    const hl = o.hl || 'rgba(255,255,255,0.06)';
    drect(g, 0, 0, s * 3, s * 3, fill);
    drect(g, 0, 0, s * 3, 2, hl);
    g['strokeStyle'] = paint.css(edge);
    g['lineWidth'] = 2;
    g['strokeRect'](1, 1, s * 3 - 2, s * 3 - 2);
    a.nine(s, s, s, s);
    a.smooth = true;
    a.src = 2;
    a.auto();
    return a;
  },
  tileset(opts = {}) { return gen.terrain(opts); },
  stars(n = 24, opts = {}) {
    const o = opts || {};
    const s = o.size || 3;
    const a = art.make(s * 4, s * 4);
    const g = a.ctx;
    const ink = o.ink || '#ffffff';
    for (let i = 0; i < 4; i++) {
      g['clearRect'](0, 0, s * 4, s * 4);
      const k = 1 + (i % 3) * 0.5;
      drect(g, s * 4 / 2 - s / 2, s * 4 / 2 - s / 2 * k, s, s * k, ink);
      drect(g, s * 4 / 2 - s / 2 * k, s * 4 / 2 - s / 2, s * k, s, ink);
      a.frame(strt(i), 0, 0, s * 4, s * 4);
    }
    a.clip('twinkle', ['0', '1', '2', '3'], 8, true);
    a.smooth = true;
    a.src = 2;
    return a;
  },
  solid(w, h, c) { return art.flat(w, h, c); }
};

class loader {
  constructor(game2) {
    this.game = game2 || null;
    this.assets = {};
    this.total = 0;
    this.done = 0;
    this.bus = new bus();
    this.failed = [];
  }
  get progress() { return this.total ? clamp01(this.done / this.total) : 1; }
  on(k, f) { this.bus.on(k, f); return this; }
  fire(k, a) { return this.bus.fire(k, a, this); }
  get(name) { return this.assets[name] === undefined ? null : this.assets[name]; }
  has(name) { return this.assets[name] !== undefined; }
  pixels(name, rows, palette, opts) { const a = pixels(rows, palette, opts); this.assets[name] = a; return a; }
  make(name, art2) { this.assets[name] = art2; return art2; }
  image(name, src, opts) {
    const o = opts || {};
    this.total++;
    const img = new imgc();
    const p = new plug((res, rej) => {
      img['onload'] = () => {
        const a = new art(img);
        a.smooth = o.smooth === undefined ? true : o.smooth;
        if (o.grid) a.grid(o.grid[0], o.grid[1], o.grid[2], o.grid[3], o);
        else if (o.frames) for (const k in o.frames) { const f = o.frames[k]; a.frame(k, f[0], f[1], f[2], f[3]); }
        else a.auto();
        if (o.clips) for (const k in o.clips) { const c = o.clips[k]; a.clip(k, c[0], c[1] === undefined ? 8 : c[1], c[2] !== false); }
        if (o.nine) a.nine(o.nine[0], o.nine[1], o.nine[2], o.nine[3]);
        a.src = 2;
        this.assets[name] = a;
        this.done++;
        this.fire('one', name);
        this.fire('progress', this.progress);
        res(a);
      };
      img['onerror'] = () => { this.failed.push(name); this.done++; rej(new errc('load failed: ' + src)); };
      img['src'] = src;
    });
    return p;
  }
  atlas(name, src, def, opts) {
    const o = opts || {};
    return this.image(name, src, Object.assign({ frames: def.frames, clips: def.clips, smooth: o.smooth, nine: o.nine }, o));
  }
  audio(name, src) {
    const a = this.game && this.game.audio;
    if (!a) return null;
    this.total++;
    return a.load(name, src)['then']((b) => { this.assets[name] = b; this.done++; this.fire('progress', this.progress); return b; });
  }
  json(name, src) {
    this.total++;
    return env['fetch'](src)['then']((r) => r['json']())['then']((j) => { this.assets[name] = j; this.done++; this.fire('progress', this.progress); return j; });
  }
  group(list) {
    const ps = [];
    for (let i = 0; i < list.length; i++) {
      const it = list[i];
      const p = it[0] === 'image' ? this.image(it[1], it[2], it[3]) : it[0] === 'audio' ? this.audio(it[1], it[2]) : it[0] === 'json' ? this.json(it[1], it[2]) : null;
      if (p) ps.push(p);
    }
    return plug['all'](ps);
  }
  run(fn) { this.fire('begin'); return fn(this).then ? fn(this).then((v) => { this.fire('done'); return v; }) : (this.fire('done'), fn(this)); }
}

class store {
  constructor(name = 'poxamel', opts = {}) {
    this.key = name;
    this.opts = opts;
    this.data = {};
    this.slots = {};
    this.version = opts.version || 1;
    this.auto = opts.auto === undefined ? 0.5 : opts.auto;
    this.t = 0;
    this.dirty = false;
    this.mem = {};
    this.load();
  }
  ls() { try { return env['localStorage'] || null; } catch (e) { return null; } }
  load(slot = 'main') {
    const ls = this.ls();
    const k = this.key + '.' + slot;
    let raw = null;
    if (ls) raw = ls['getItem'](k);
    else raw = this.mem[k] === undefined ? null : this.mem[k];
    if (!raw) { this.data = {}; return this; }
    try { this.data = jsonc['parse'](raw) || {}; } catch (e) { this.data = {}; }
    return this;
  }
  save(slot = 'main') {
    const ls = this.ls();
    const k = this.key + '.' + slot;
    const raw = jsonc['stringify'](this.data);
    if (ls) { try { ls['setItem'](k, raw); } catch (e) { } }
    else this.mem[k] = raw;
    this.dirty = false;
    return this;
  }
  get(k, d) { return this.data[k] === undefined ? (d === undefined ? null : d) : this.data[k]; }
  set(k, v) { this.data[k] = v; this.dirty = true; if (this.auto === 0) this.save(); return this; }
  del(k) { delete this.data[k]; this.dirty = true; return this; }
  inc(k, n = 1) { return this.set(k, (this.get(k, 0) || 0) + n); }
  push(k, v, maxlen = 0) { const l = this.get(k, []); l.push(v); if (maxlen > 0 && l.length > maxlen) l.splice(0, l.length - maxlen); return this.set(k, l); }
  has(k) { return this.data[k] !== undefined; }
  clear(slot) { this.data = {}; this.save(slot); return this; }
  keys() { return objt['keys'](this.data); }
  walk(dt) { if (this.auto > 0 && this.dirty) { this.t += dt; if (this.t > this.auto) { this.t = 0; this.save(); } } return this; }
}

const debug = {
  inspect(game2) {
    game2.on('tick', () => {
      const inp = game2.input;
      if (!inp.mouse.hits[0] || !game2.scene) return;
      const w = inp.wpoint;
      game2.scene.cam.screen(inp.mouse.x, inp.mouse.y, w);
      const l = game2.scene.where((n) => n.bounds.has(w.x, w.y));
      if (env['console']) env['console']['log']('PoxamelJs inspect @', round(w.x), round(w.y), l.map((n) => n.constructor.name + (n.tag ? '#' + n.tag : '') + ' z' + n.z));
    });
    return debug;
  },
  watch(game2, sec = 3) {
    let t = 0, n = 0, u = 0, d = 0, fps = 0;
    game2.on('tick', () => {
      t += game2.lastdt || 0; n++;
      u += game2.metrics.update; d += game2.metrics.draw; fps += game2.fps;
      if (t >= sec) {
        if (env['console']) env['console']['log']('PoxamelJs stats  fps:' + round(fps / n) + '  update:' + round(u / n * 100) / 100 + 'ms  draw:' + round(d / n * 100) / 100 + 'ms  nodes:' + (game2.scene ? game2.scene.tally() : 0) + '  quads:' + game2.p.stats.quads + '  flushes:' + game2.p.stats.flushes);
        t = 0; n = 0; u = 0; d = 0; fps = 0;
      }
    });
    return debug;
  },
  god(game2, hero) { hero.god = true; return debug; },
  warp(hero, x, y) { hero.spawn(x, y); return debug; },
  help() {
    if (env['console']) env['console']['log']('PoxamelJs: docs in README. Try: new PoxamelJs.game({w,h}).add("main", MyScene).start()');
    return debug;
  }
};

const quick = (opts, build) => {
  const g2 = new game(opts || {});
  const S = class extends scene {
    build() { if (build) build(this, g2); return this; }
  };
  g2.add('main', S);
  g2.goto('main');
  if ((opts && opts.autostart) !== false) g2.start();
  return g2;
};

const PoxamelJs = {
  version: '1.0.0',
  name: 'PoxamelJs',
  env,
  vec, box, mat, dice, rng, rand, randint, chance, pick, shuffle, jitter,
  clamp, clamp01, lerp, smooth, smoother, wrap, ping, mapr, snap, approach, move, damp, fract, dist, distsq, angleof, angdiff, polar, hash, noise, fbm, ridge, quant, ease01, springv,
  pi, tau, eul, inf, nan, ease, paint,
  art, sprite, text, cache, nine, panel, node, group, scene, camera, game, ui, theme, widget, button, bar, slider, checked, field, scroll, toast, tooltip,
  fx, emitter, ghost, space, block, lift, zone, rig, hero, mob, shot, hit, pickup,
  tilemap, tileset, brush, canvaspain, square, painter: canvaspain, gpu: square,
  audio, seq, loader, store, debug, gen, pixels, drect, dcirc, keychar, notes, notehz, quick, clock, tune, timer, coro, machine, spring, jux, bus, pool,
  input, keys, mouse, touch, pads, stickzone, gestures,
  randcol: () => paint.rand(), boot: (o) => new game(o), make: (o) => new game(o)
};

env['PoxamelJs'] = PoxamelJs;
env['pox'] = PoxamelJs;
if (typeof module !== 'undefined' && module.exports) module.exports = PoxamelJs;
})();
