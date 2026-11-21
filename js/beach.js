// js/beach.js
//
// Procedural beach backdrop, a WebGL port of the game's ground.gdshader (sand, wet sand,
// shallow-to-deep water, drifting depth spots, sheen, foam band). Swaps the page's
// <img class="backdrop"> for a canvas; if WebGL isn't there the old starfield stays.
// Rendered at 1/PX resolution and upscaled pixelated so it reads as pixel art and stays cheap.
// New seed every load. The coast is biased left-to-right so there's always a beach on screen.
(function () {
  const PX = 3; // css px per art pixel
  const old = document.querySelector(".backdrop");
  if (!old) return;

  const canvas = document.createElement("canvas");
  canvas.className = "backdrop beach-canvas";
  const gl = canvas.getContext("webgl", { antialias: false });
  if (!gl) return;

  const vs = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;
  const fs = `
precision highp float;
uniform vec2 res;
uniform float time;
uniform vec2 seed;
uniform sampler2D sand_tex;
uniform float mode; // 1 = write the height map out instead, for placing props

const float PIXEL = 2.5; // world px per art pixel, same as the game
const float SHORE_SPAN = 0.12;
const vec3 WET = vec3(0.62, 0.5, 0.33);
const vec3 SHALLOW = vec3(0.19, 0.65, 0.67);
const vec3 DEEP = vec3(0.05, 0.32, 0.39);
const vec3 FOAM = vec3(0.85, 0.95, 0.95);

float hash21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash21(i), b = hash21(i + vec2(1.0, 0.0)), c = hash21(i + vec2(0.0, 1.0)), d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p){
  float t = 0.0, a = 0.55, n = 0.0;
  mat2 r = mat2(0.74, 0.67, -0.67, 0.74);
  for (int i = 0; i < 4; i++){ t += vnoise(p) * a; n += a; p = r * p * 2.13 + 7.0; a *= 0.5; }
  return t / n;
}
float fbm3(vec2 p){ // 3 octaves, signed, stands in for FastNoiseLite
  float t = 0.0, a = 0.55, n = 0.0;
  mat2 r = mat2(0.74, 0.67, -0.67, 0.74);
  for (int i = 0; i < 3; i++){ t += vnoise(p) * a; n += a; p = r * p * 2.13 + 7.0; a *= 0.5; }
  return (t / n) * 2.0 - 1.0;
}
float overlay(float b, float l){ return b < 0.5 ? 2.0 * b * l : 1.0 - 2.0 * (1.0 - b) * (1.0 - l); }

float height(vec2 cell){
  vec2 wp = cell * PIXEL + seed;
  vec2 u = cell / res;
  // Coast runs down the screen: sand on the left, sea on the right, wiggled like the game's coastline
  float h = (0.42 - (u.x * 0.8 + (1.0 - u.y) * 0.2)) * 1.6;
  h += fbm3(wp * 0.00125) * 0.55;
  h = min(h, (0.55 - fbm3(wp * 0.0012 + 31.0)) * 2.0); // lakes
  return clamp(0.5 + h * 0.5, 0.0, 1.0);
}

void main(){
  vec2 cell = floor(gl_FragCoord.xy);
  vec2 world = cell * PIXEL + seed;
  float h = height(cell);
  if (mode > 0.5) { gl_FragColor = vec4(vec3(h), 1.0); return; }
  vec3 col;
  if (h >= 0.5){
    col = texture2D(sand_tex, (mod(cell, 32.0) + 0.5) / 32.0).rgb;
    col *= 0.93 + 0.1 * fbm(world * 0.01);
    col = mix(col, WET, smoothstep(0.53, 0.5, h) * 0.6);
  } else {
    float shore = clamp((0.5 - h) / SHORE_SPAN, 0.0, 1.0);
    float t = time * 0.25;
    vec2 n_uv = world * 0.12 + t;
    float n0 = vnoise(n_uv), n1 = vnoise(n_uv + vec2(0.6, 0.0)), n2 = vnoise(n_uv + vec2(0.0, 0.6));
    vec2 flow = vec2(n1 - n0, n2 - n0) * 1.2 * 0.2;
    float spot = fbm(world * 0.015 + flow + t * 0.3);
    float depth_mix = clamp(mix(spot, 1.0 - shore, 0.6), 0.0, 1.0);
    col = mix(DEEP, SHALLOW, depth_mix);
    float dither = (hash21(world * 0.7) - 0.5) / 48.0;
    col = floor((col + dither) * 48.0) / 48.0;
    vec2 sh = world * 0.05;
    float sheen = overlay(fbm(sh + time * 0.3), fbm(sh - time * 0.21 + 5.0));
    col += smoothstep(0.77, 0.93, sheen) * 0.1;
    float wave_pos = 0.12 + 0.12 * sin(time * 0.6);
    col = mix(col, FOAM, smoothstep(0.08, 0.0, abs(shore - wave_pos)) * 0.35);
  }
  gl_FragColor = vec4(col, 1.0);
}`;

  function shader(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }

  let prog;
  try {
    prog = gl.createProgram();
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  } catch (e) {
    console.warn("beach backdrop off:", e);
    return;
  }
  gl.useProgram(prog);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const u = (n) => gl.getUniformLocation(prog, n);
  gl.uniform2f(u("seed"), Math.random() * 20000, Math.random() * 20000);

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([214, 180, 120, 255]));
  [gl.TEXTURE_MIN_FILTER, gl.TEXTURE_MAG_FILTER].forEach((p) => gl.texParameteri(gl.TEXTURE_2D, p, gl.NEAREST));
  [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach((p) => gl.texParameteri(gl.TEXTURE_2D, p, gl.CLAMP_TO_EDGE));
  const img = new Image();
  img.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    draw(performance.now());
  };
  img.src = "/img/sand.png";

  function resize() {
    canvas.width = Math.ceil(innerWidth / PX);
    canvas.height = Math.ceil(innerHeight / PX);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(u("res"), canvas.width, canvas.height);
  }

  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let last = 0;
  function draw(now) {
    gl.uniform1f(u("time"), now / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  // ---- Props: wrecks, crate huddles and shells, placed like the game's main.gd does it.
  // Positions are in art pixels ("cells"); the game's world px are 2.5 to a cell.
  // The shader's own height map is read back so props land on its exact sand and shore.
  const K = 5; // props canvas px per cell, so crates can sit at the game's smaller 1.5 scale
  const props = document.createElement("canvas");
  props.className = "backdrop beach-props";
  const pc = props.getContext("2d");
  const load = (n) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ok(null); i.src = "/img/props/" + n + ".png"; });
  const art = Promise.all(["sunken-pirate-ship", "crate1", "crate2", "crate3", "shells1", "shells2"].map(load));

  // Every separate blob of pixels in a shell tile, so each shell is dropped on its own
  function blobs(im) {
    const c = document.createElement("canvas");
    c.width = im.width; c.height = im.height;
    const x = c.getContext("2d");
    x.drawImage(im, 0, 0);
    const a = x.getImageData(0, 0, c.width, c.height).data;
    const seen = new Uint8Array(c.width * c.height), out = [];
    for (let i = 0; i < seen.length; i++) {
      if (seen[i] || !a[i * 4 + 3]) continue;
      let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
      const st = [i]; seen[i] = 1;
      while (st.length) {
        const j = st.pop(), px = j % c.width, py = (j / c.width) | 0;
        x0 = Math.min(x0, px); y0 = Math.min(y0, py); x1 = Math.max(x1, px); y1 = Math.max(y1, py);
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          const nx = px + dx, ny = py + dy, k = ny * c.width + nx;
          if (nx >= 0 && ny >= 0 && nx < c.width && ny < c.height && !seen[k] && a[k * 4 + 3]) { seen[k] = 1; st.push(k); }
        }
      }
      out.push([im, x0, y0, x1 - x0 + 1, y1 - y0 + 1]);
    }
    return out;
  }

  async function placeProps() {
    const W = canvas.width, H = canvas.height;
    gl.uniform1f(u("mode"), 1);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    const buf = new Uint8Array(W * H * 4);
    gl.readPixels(0, 0, W, H, gl.RGBA, gl.UNSIGNED_BYTE, buf);
    gl.uniform1f(u("mode"), 0);
    draw(still ? 0 : performance.now()); // put the beach back over the height map
    // GL rows run bottom-up, the 2D canvas top-down
    const dry = (x, y) => { x = Math.round(x); y = Math.round(y); return x >= 0 && y >= 0 && x < W && y < H && buf[((H - 1 - y) * W + x) * 4] >= 128; };
    const allDry = (x, y, offs) => offs.every(([dx, dy]) => dry(x + dx, y + dy));

    const [ship, c1, c2, c3, s1, s2] = await art;
    props.width = W * K; props.height = H * K;
    pc.imageSmoothingEnabled = false;
    const R = Math.random, rr = (a, b) => a + R() * (b - a), side = () => (R() < 0.5 ? 1 : -1);
    const placed = []; // [x, y, isShip]
    const clear = (x, y, gs, gc) => placed.every(([px, py, s]) => Math.hypot(px - x, py - y) >= (s ? gs : gc));

    // Sunk in the sand: only shownLo..shownHi of its height shows, always tilted a bit, maybe mirrored
    function sunk(im, x, y, scale, lo, hi, tilt) {
      const shown = Math.round(im.height * rr(lo, hi));
      pc.save();
      pc.translate(x * K, y * K);
      pc.rotate(rr(tilt * 0.4, tilt) * side());
      pc.scale((R() < 0.5 ? -1 : 1) * scale * K, scale * K);
      pc.drawImage(im, 0, 0, im.width, shown, -im.width / 2, -shown, im.width, shown);
      pc.restore();
    }

    if (ship && R() < 0.6) {
      for (let t = 0; t < 10; t++) {
        const x = Math.round(R() * W), y = Math.round(R() * H);
        if (allDry(x, y, [[-68, 0], [68, 0], [0, 12], [-36, -24], [36, -24]]) && clear(x, y, 400, 240)) {
          sunk(ship, x, y, 1, 0.75, 0.85, 0.03);
          placed.push([x, y, true]);
          break;
        }
      }
    }
    const crates = [c1, c2].filter(Boolean);
    if (crates.length) {
      for (let n = 0; n < 4; n++) {
        const bx = Math.round(R() * W), by = Math.round(R() * H);
        if (!dry(bx, by) || !clear(bx, by, 240, 240)) continue;
        const huddle = [];
        for (let i = 0, m = 2 + Math.floor(R() * 3); i < m; i++) {
          const im = c3 && R() < 0.25 ? c3 : crates[Math.floor(R() * crates.length)];
          const w = im.width * 0.6;
          for (let t = 0; t < 12; t++) {
            let x = bx, y = by;
            if (huddle.length) { const a = R() * Math.PI * 2, d = rr(14, 28); x += Math.cos(a) * d * 1.7; y += Math.sin(a) * d * 0.8; }
            x = Math.round(x); y = Math.round(y);
            if (allDry(x, y, [[-w / 2 - 4, 0], [w / 2 + 4, 0], [0, 8], [0, -16]]) &&
                huddle.every(([qx, qy, qw]) => Math.abs(qx - x) > (qw + w) / 2 + 2 || Math.abs(qy - y) > 17)) {
              huddle.push([x, y, w]);
              sunk(im, x, y, 0.6, 0.5, 0.75, 0.08);
              break;
            }
          }
        }
        if (huddle.length) placed.push([bx, by, false]);
      }
    }
    const bits = [s1, s2].filter(Boolean).flatMap(blobs);
    if (bits.length) {
      const near = [[12, 0], [-12, 0], [0, 12], [0, -12], [8, 8], [-8, 8], [8, -8], [-8, -8], [6, 0], [-6, 0], [0, 6], [0, -6]];
      const onShore = (x, y) => dry(x, y) && near.some(([dx, dy]) => { const X = x + dx, Y = y + dy; return X >= 0 && Y >= 0 && X < W && Y < H && !dry(X, Y); });
      const shells = [];
      for (let n = 0, tries = Math.round(960 * (W * H) / (480 * 480)) /* 3x the game's rate: a screen holds less shore than a chunk */; n < tries; n++) {
        const x = Math.round(R() * W), y = Math.round(R() * H);
        if (!onShore(x, y) || !shells.every(([sx, sy]) => Math.hypot(sx - x, sy - y) > 36)) continue;
        shells.push([x, y]);
        const [im, sx, sy, sw, sh] = bits[Math.floor(R() * bits.length)];
        pc.save();
        pc.globalAlpha = 0.75;
        pc.translate(x * K, y * K);
        pc.rotate(rr(0.25, 0.7) * side());
        pc.scale((R() < 0.5 ? -1 : 1) * K, K);
        pc.drawImage(im, sx, sy, sw, sh, -sw / 2, -sh / 2, sw, sh);
        pc.restore();
      }
    }
  }
  function loop(now) {
    if (now - last > 1000 / 30) { // 30fps is plenty for slow water
      last = now;
      draw(now);
    }
    requestAnimationFrame(loop);
  }

  old.replaceWith(canvas);
  canvas.after(props);
  resize();
  placeProps();
  let again;
  addEventListener("resize", () => {
    resize();
    draw(performance.now());
    clearTimeout(again);
    again = setTimeout(placeProps, 250); // the coast moves with the window size, so re-deal once it settles
  });
  if (still) draw(0);
  else requestAnimationFrame(loop);
})();
