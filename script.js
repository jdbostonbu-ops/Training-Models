/* ========================================
   PORTFOLIO ANIMATIONS
   Maya Chen — ML Research Engineer

   All canvas animations live in this file.
   Each animation draws onto a <canvas> element
   in the HTML using its id.
   ======================================== */

(function() {

    // Check if the user prefers reduced motion (accessibility setting).
    // If true, animations will run once and stop, rather than looping.
    var reduced = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;


    /* ========================================
       HELPER: setup
       Sets up a canvas with proper retina/HiDPI scaling.
       Returns an object with the context and dimensions.
       ======================================== */
    function setup(id) {
        var c = document.getElementById(id);
        if (!c) return null;
        var ctx = c.getContext('2d');
        var dpr = window.devicePixelRatio || 1;
        var rect = c.getBoundingClientRect();
        c.width = rect.width * dpr;
        c.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        return { c: c, ctx: ctx, w: rect.width, h: rect.height };
    }


    /* ========================================
       HERO ANIMATION
       Full-page neural network with pulses traveling
       through random paths from input to output layer.
       ======================================== */
    var hero = setup('nn-hero');
    if (hero) {
        var heroLayers = [
            { count: 6, x: 0.12 },
            { count: 10, x: 0.38 },
            { count: 10, x: 0.62 },
            { count: 5, x: 0.88 }
        ];
        var heroNodes = [];
        heroLayers.forEach(function(layer, layerIdx) {
            var spacing = hero.h / (layer.count + 1);
            for (var i = 0; i < layer.count; i++) {
                heroNodes.push({
                    layer: layerIdx,
                    x: layer.x * hero.w,
                    y: spacing * (i + 1),
                    glow: 0
                });
            }
        });
        var heroConns = [];
        for (var l = 0; l < heroLayers.length - 1; l++) {
            var fromN = heroNodes.filter(function(n) { return n.layer === l; });
            var toN = heroNodes.filter(function(n) { return n.layer === l + 1; });
            fromN.forEach(function(f) {
                toN.forEach(function(t) {
                    heroConns.push({ from: f, to: t });
                });
            });
        }
        var heroPulses = [];

        function spawnHero() {
            var starts = heroNodes.filter(function(n) { return n.layer === 0; });
            var path = [starts[Math.floor(Math.random() * starts.length)]];
            for (var l = 1; l < heroLayers.length; l++) {
                var nl = heroNodes.filter(function(n) { return n.layer === l; });
                path.push(nl[Math.floor(Math.random() * nl.length)]);
            }
            heroPulses.push({
                path: path, segment: 0, t: 0,
                speed: 0.012 + Math.random() * 0.008
            });
        }

        var heroLastSpawn = 0;
        function heroTick(now) {
            hero.ctx.clearRect(0, 0, hero.w, hero.h);
            hero.ctx.strokeStyle = 'rgba(255,255,255,0.08)';
            hero.ctx.lineWidth = 0.5;
            heroConns.forEach(function(c) {
                hero.ctx.beginPath();
                hero.ctx.moveTo(c.from.x, c.from.y);
                hero.ctx.lineTo(c.to.x, c.to.y);
                hero.ctx.stroke();
            });
            if (!reduced && now - heroLastSpawn > 280) {
                spawnHero();
                heroLastSpawn = now;
            }
            heroPulses.forEach(function(p) {
                p.t += p.speed;
                if (p.t >= 1) {
                    p.t = 0;
                    p.segment++;
                    if (p.segment < p.path.length - 1) {
                        p.path[p.segment].glow = 1;
                    }
                }
                if (p.segment < p.path.length - 1) {
                    var f = p.path[p.segment];
                    var t = p.path[p.segment + 1];
                    var x = f.x + (t.x - f.x) * p.t;
                    var y = f.y + (t.y - f.y) * p.t;
                    hero.ctx.strokeStyle = 'rgba(245,158,11,0.5)';
                    hero.ctx.lineWidth = 1.2;
                    hero.ctx.beginPath();
                    hero.ctx.moveTo(f.x, f.y);
                    hero.ctx.lineTo(x, y);
                    hero.ctx.stroke();
                    hero.ctx.fillStyle = 'rgba(245,158,11,1)';
                    hero.ctx.beginPath();
                    hero.ctx.arc(x, y, 3, 0, Math.PI * 2);
                    hero.ctx.fill();
                    hero.ctx.fillStyle = 'rgba(245,158,11,0.25)';
                    hero.ctx.beginPath();
                    hero.ctx.arc(x, y, 8, 0, Math.PI * 2);
                    hero.ctx.fill();
                }
            });
            heroPulses = heroPulses.filter(function(p) {
                return p.segment < p.path.length - 1;
            });
            heroNodes.forEach(function(n) {
                n.glow *= 0.94;
                if (n.glow > 0.05) {
                    hero.ctx.fillStyle = 'rgba(245,158,11,' + (n.glow * 0.3) + ')';
                    hero.ctx.beginPath();
                    hero.ctx.arc(n.x, n.y, 3.5 + 8 * n.glow, 0, Math.PI * 2);
                    hero.ctx.fill();
                }
                hero.ctx.fillStyle = n.glow > 0.05
                    ? 'rgba(255,220,160,1)'
                    : 'rgba(255,255,255,0.85)';
                hero.ctx.beginPath();
                hero.ctx.arc(n.x, n.y, 3.5, 0, Math.PI * 2);
                hero.ctx.fill();
            });
            requestAnimationFrame(heroTick);
        }

        if (!reduced) requestAnimationFrame(heroTick);
        else heroTick(0);
    }


    /* ========================================
       MINI ANN DIAGRAM
       Smaller labeled neural network shown in the
       education section, with input/hidden/output labels.
       ======================================== */
    var ann = setup('ann-mini');
    if (ann) {
        var aLayers = [
            { count: 4, x: 0.15 },
            { count: 6, x: 0.4 },
            { count: 6, x: 0.6 },
            { count: 3, x: 0.85 }
        ];
        var aNodes = [];
        aLayers.forEach(function(layer, idx) {
            var sp = ann.h / (layer.count + 1);
            for (var i = 0; i < layer.count; i++) {
                aNodes.push({ layer: idx, x: layer.x * ann.w, y: sp * (i + 1), glow: 0 });
            }
        });
        var aConns = [];
        for (var l = 0; l < aLayers.length - 1; l++) {
            var f = aNodes.filter(function(n) { return n.layer === l; });
            var t = aNodes.filter(function(n) { return n.layer === l + 1; });
            f.forEach(function(a) {
                t.forEach(function(b) {
                    aConns.push({ from: a, to: b });
                });
            });
        }
        var aPulses = [];
        function aSpawn() {
            var st = aNodes.filter(function(n) { return n.layer === 0; });
            var path = [st[Math.floor(Math.random() * st.length)]];
            for (var l = 1; l < aLayers.length; l++) {
                var nl = aNodes.filter(function(n) { return n.layer === l; });
                path.push(nl[Math.floor(Math.random() * nl.length)]);
            }
            aPulses.push({ path: path, seg: 0, t: 0, sp: 0.018 });
        }
        var aLs = 0;
        function aTick(now) {
            ann.ctx.clearRect(0, 0, ann.w, ann.h);
            ann.ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ann.ctx.font = '11px sans-serif';
            ann.ctx.fillText('input', 0.15 * ann.w - 14, ann.h - 6);
            ann.ctx.fillText('hidden', 0.4 * ann.w - 16, ann.h - 6);
            ann.ctx.fillText('hidden', 0.6 * ann.w - 16, ann.h - 6);
            ann.ctx.fillText('output', 0.85 * ann.w - 18, ann.h - 6);
            ann.ctx.strokeStyle = 'rgba(255,255,255,0.07)';
            ann.ctx.lineWidth = 0.5;
            aConns.forEach(function(c) {
                ann.ctx.beginPath();
                ann.ctx.moveTo(c.from.x, c.from.y);
                ann.ctx.lineTo(c.to.x, c.to.y);
                ann.ctx.stroke();
            });
            if (!reduced && now - aLs > 320) { aSpawn(); aLs = now; }
            aPulses.forEach(function(p) {
                p.t += p.sp;
                if (p.t >= 1) {
                    p.t = 0; p.seg++;
                    if (p.seg < p.path.length - 1) p.path[p.seg].glow = 1;
                }
                if (p.seg < p.path.length - 1) {
                    var f = p.path[p.seg], t = p.path[p.seg + 1];
                    var x = f.x + (t.x - f.x) * p.t, y = f.y + (t.y - f.y) * p.t;
                    ann.ctx.fillStyle = '#f59e0b';
                    ann.ctx.beginPath();
                    ann.ctx.arc(x, y, 2.5, 0, Math.PI * 2);
                    ann.ctx.fill();
                }
            });
            aPulses = aPulses.filter(function(p) { return p.seg < p.path.length - 1; });
            aNodes.forEach(function(n) {
                n.glow *= 0.94;
                ann.ctx.fillStyle = n.glow > 0.05
                    ? 'rgba(255,220,160,1)'
                    : 'rgba(255,255,255,0.85)';
                ann.ctx.beginPath();
                ann.ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
                ann.ctx.fill();
            });
            if (!reduced) requestAnimationFrame(aTick);
        }
        if (reduced) aTick(0);
        else requestAnimationFrame(aTick);
    }


    /* ========================================
       CNN VISUALIZATION
       Convolutional filter (orange box) sweeping
       across a grid of activation cells.
       ======================================== */
    var cnn = setup('vis-cnn');
    if (cnn) {
        var phase = 0;
        var grid = [];
        for (var i = 0; i < 8; i++)
            for (var j = 0; j < 12; j++)
                grid.push({ i: i, j: j, v: Math.random() });
        function cnnTick() {
            cnn.ctx.clearRect(0, 0, cnn.w, cnn.h);
            phase += 0.02;
            var cw = cnn.w / 12, ch = cnn.h / 8;
            grid.forEach(function(g) {
                var v = g.v * (0.4 + 0.6 * Math.sin(phase + g.i * 0.3 + g.j * 0.2));
                cnn.ctx.fillStyle = 'rgba(245,158,11,' + (v * 0.7).toFixed(3) + ')';
                cnn.ctx.fillRect(g.j * cw + 1, g.i * ch + 1, cw - 2, ch - 2);
            });
            var fx = (Math.sin(phase * 0.5) * 0.5 + 0.5) * (cnn.w - cw * 3);
            var fy = (Math.cos(phase * 0.7) * 0.5 + 0.5) * (cnn.h - ch * 3);
            cnn.ctx.strokeStyle = '#f59e0b';
            cnn.ctx.lineWidth = 1.2;
            cnn.ctx.strokeRect(fx, fy, cw * 3, ch * 3);
            if (!reduced) requestAnimationFrame(cnnTick);
        }
        cnnTick();
    }


    /* ========================================
       RNN VISUALIZATION
       Sequential nodes lighting up one at a time,
       showing how RNNs process inputs in order.
       ======================================== */
    var rnn = setup('vis-rnn');
    if (rnn) {
        var t0 = 0;
        function rnnTick() {
            rnn.ctx.clearRect(0, 0, rnn.w, rnn.h);
            t0 += 0.02;
            var nodes = 6;
            var spacing = rnn.w / (nodes + 1);
            var cy = rnn.h / 2;
            for (var i = 0; i < nodes - 1; i++) {
                rnn.ctx.strokeStyle = 'rgba(255,255,255,0.15)';
                rnn.ctx.lineWidth = 0.5;
                rnn.ctx.beginPath();
                rnn.ctx.moveTo(spacing * (i + 1), cy);
                rnn.ctx.lineTo(spacing * (i + 2), cy);
                rnn.ctx.stroke();
            }
            var active = Math.floor(t0 % nodes);
            for (var i = 0; i < nodes; i++) {
                var isActive = i <= active;
                rnn.ctx.fillStyle = isActive ? '#f59e0b' : 'rgba(255,255,255,0.3)';
                rnn.ctx.beginPath();
                rnn.ctx.arc(spacing * (i + 1), cy, isActive ? 4 : 3, 0, Math.PI * 2);
                rnn.ctx.fill();
                if (isActive && i === active) {
                    rnn.ctx.fillStyle = 'rgba(245,158,11,0.25)';
                    rnn.ctx.beginPath();
                    rnn.ctx.arc(spacing * (i + 1), cy, 9, 0, Math.PI * 2);
                    rnn.ctx.fill();
                }
            }
            if (!reduced) requestAnimationFrame(rnnTick);
        }
        rnnTick();
    }


    /* ========================================
       TRANSFORMER VISUALIZATION
       One token "attending to" all others with
       weights shown by line thickness.
       ======================================== */
    var tx = setup('vis-tx');
    if (tx) {
        var t1 = 0;
        function txTick() {
            tx.ctx.clearRect(0, 0, tx.w, tx.h);
            t1 += 0.018;
            var tokens = 5;
            var sp = tx.w / (tokens + 1);
            var cy = tx.h / 2;
            var query = Math.floor((Math.sin(t1) * 0.5 + 0.5) * (tokens - 0.01));
            for (var i = 0; i < tokens; i++) {
                if (i !== query) {
                    var weight = 0.3 + 0.7 * Math.abs(Math.sin(t1 + i));
                    tx.ctx.strokeStyle = 'rgba(245,158,11,' + (weight * 0.6).toFixed(3) + ')';
                    tx.ctx.lineWidth = weight * 2;
                    tx.ctx.beginPath();
                    tx.ctx.moveTo(sp * (query + 1), cy);
                    tx.ctx.lineTo(sp * (i + 1), cy);
                    tx.ctx.stroke();
                }
            }
            for (var i = 0; i < tokens; i++) {
                tx.ctx.fillStyle = i === query ? '#f59e0b' : 'rgba(255,255,255,0.6)';
                tx.ctx.beginPath();
                tx.ctx.arc(sp * (i + 1), cy, i === query ? 4 : 3, 0, Math.PI * 2);
                tx.ctx.fill();
            }
            if (!reduced) requestAnimationFrame(txTick);
        }
        txTick();
    }


    /* ========================================
       GRADIENT DESCENT VISUALIZATION
       A ball rolls down a wavy loss surface,
       finding low points (minima).
       ======================================== */
    var gd = setup('vis-gd');
    if (gd) {
        var ballX = 30, ballY = 0, vx = 0;
        function surface(x) {
            var nx = (x - gd.w / 2) / 30;
            return Math.sin(nx) * 18 + Math.cos(nx * 0.7) * 12 + gd.h * 0.55;
        }
        function gdTick() {
            gd.ctx.clearRect(0, 0, gd.w, gd.h);
            gd.ctx.strokeStyle = 'rgba(245,158,11,0.5)';
            gd.ctx.lineWidth = 1.2;
            gd.ctx.beginPath();
            for (var x = 0; x <= gd.w; x += 2) {
                var y = surface(x);
                if (x === 0) gd.ctx.moveTo(x, y);
                else gd.ctx.lineTo(x, y);
            }
            gd.ctx.stroke();
            var slope = (surface(ballX + 1) - surface(ballX - 1)) / 2;
            vx -= slope * 0.04;
            vx *= 0.92;
            ballX += vx;
            if (ballX > gd.w - 8) { ballX = 30; vx = 0; }
            if (ballX < 8) ballX = 8;
            ballY = surface(ballX) - 5;
            gd.ctx.fillStyle = 'rgba(245,158,11,0.3)';
            gd.ctx.beginPath();
            gd.ctx.arc(ballX, ballY, 9, 0, Math.PI * 2);
            gd.ctx.fill();
            gd.ctx.fillStyle = '#f59e0b';
            gd.ctx.beginPath();
            gd.ctx.arc(ballX, ballY, 4, 0, Math.PI * 2);
            gd.ctx.fill();
            if (!reduced) requestAnimationFrame(gdTick);
        }
        gdTick();
    }


    /* ========================================
       ATTENTION HEATMAP
       Grid of cells with shifting brightness,
       resembling real attention patterns.
       ======================================== */
    var att = setup('vis-att');
    if (att) {
        var aRows = 6, aCols = 6;
        var aCellW = att.w / aCols, aCellH = att.h / aRows;
        var weights = [];
        for (var i = 0; i < aRows; i++) {
            weights[i] = [];
            for (var j = 0; j < aCols; j++) weights[i][j] = Math.random();
        }
        var aPhase = 0;
        function attTick() {
            att.ctx.clearRect(0, 0, att.w, att.h);
            aPhase += 0.015;
            for (var i = 0; i < aRows; i++) {
                for (var j = 0; j < aCols; j++) {
                    var w = weights[i][j] * (0.5 + 0.5 * Math.sin(aPhase + i * 0.5 + j * 0.3));
                    att.ctx.fillStyle = 'rgba(245,158,11,' + (w * 0.85).toFixed(3) + ')';
                    att.ctx.fillRect(j * aCellW + 1, i * aCellH + 1, aCellW - 2, aCellH - 2);
                }
            }
            if (!reduced) requestAnimationFrame(attTick);
        }
        attTick();
    }


    /* ========================================
       LATENT SPACE CLUSTERING
       Points drift toward three cluster centers
       and continually re-organize.
       ======================================== */
    var cl = setup('vis-cluster');
    if (cl) {
        var pts = [];
        var centers = [
            { x: cl.w * 0.28, y: cl.h * 0.38 },
            { x: cl.w * 0.72, y: cl.h * 0.42 },
            { x: cl.w * 0.5, y: cl.h * 0.75 }
        ];
        for (var i = 0; i < 60; i++) {
            var c = centers[i % 3];
            pts.push({
                cx: c.x, cy: c.y,
                x: Math.random() * cl.w, y: Math.random() * cl.h,
                tx: c.x + (Math.random() - 0.5) * 32,
                ty: c.y + (Math.random() - 0.5) * 32,
                startX: 0, startY: 0,
                t: 0
            });
        }
        pts.forEach(function(p) { p.startX = p.x; p.startY = p.y; });
        function clTick() {
            cl.ctx.clearRect(0, 0, cl.w, cl.h);
            pts.forEach(function(p) {
                if (p.t < 1) p.t += 0.008;
                else {
                    p.startX = p.x; p.startY = p.y;
                    p.tx = p.cx + (Math.random() - 0.5) * 32;
                    p.ty = p.cy + (Math.random() - 0.5) * 32;
                    p.t = 0;
                }
                var ease = p.t < 0.5
                    ? 2 * p.t * p.t
                    : 1 - Math.pow(-2 * p.t + 2, 2) / 2;
                p.x = p.startX + (p.tx - p.startX) * ease;
                p.y = p.startY + (p.ty - p.startY) * ease;
                cl.ctx.fillStyle = 'rgba(245,158,11,0.7)';
                cl.ctx.beginPath();
                cl.ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                cl.ctx.fill();
            });
            if (!reduced) requestAnimationFrame(clTick);
        }
        clTick();
    }


    /* ========================================
       LOSS CURVE
       Real-time training loss line that drops
       over time, simulating a training run.
       ======================================== */
    var ls = setup('vis-loss');
    if (ls) {
        var history = [];
        var step = 0;
        var loss = 2.4;
        function lsTick() {
            ls.ctx.clearRect(0, 0, ls.w, ls.h);
            step += 1;
            var noise = (Math.random() - 0.5) * 0.15;
            loss = Math.max(0.15, loss * 0.992 + noise * 0.08);
            history.push(loss);
            if (history.length > 80) history.shift();
            ls.ctx.strokeStyle = 'rgba(255,255,255,0.06)';
            ls.ctx.lineWidth = 0.5;
            for (var g = 0; g < 4; g++) {
                var gy = (ls.h / 4) * g + 10;
                ls.ctx.beginPath();
                ls.ctx.moveTo(0, gy);
                ls.ctx.lineTo(ls.w, gy);
                ls.ctx.stroke();
            }
            if (history.length > 1) {
                var maxL = 2.5;
                ls.ctx.strokeStyle = '#f59e0b';
                ls.ctx.lineWidth = 1.5;
                ls.ctx.beginPath();
                history.forEach(function(v, i) {
                    var x = (i / (history.length - 1)) * ls.w;
                    var y = ls.h - 14 - (v / maxL) * (ls.h - 24);
                    if (i === 0) ls.ctx.moveTo(x, y);
                    else ls.ctx.lineTo(x, y);
                });
                ls.ctx.stroke();
                var lastY = ls.h - 14 - (loss / maxL) * (ls.h - 24);
                ls.ctx.fillStyle = '#f59e0b';
                ls.ctx.beginPath();
                ls.ctx.arc(ls.w - 2, lastY, 3, 0, Math.PI * 2);
                ls.ctx.fill();
                ls.ctx.fillStyle = 'rgba(255,255,255,0.5)';
                ls.ctx.font = '11px sans-serif';
                ls.ctx.fillText('loss: ' + loss.toFixed(3), 8, 16);
                ls.ctx.fillText('step: ' + step, ls.w - 70, 16);
            }
            if (!reduced) requestAnimationFrame(lsTick);
        }
        lsTick();
    }


    /* ========================================
       RESPONSIVE: rebuild canvases on resize
       Reloads the page when the window is resized
       so all canvases redraw at the new size.
       ======================================== */
    var resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            location.reload();
        }, 250);
    });

})();


/* ========================================
   BOOKING FLOW LOGIC
   Wires up the calendar, time slots, form, and success state.
   Lives outside the IIFE above so onclick handlers can find
   these functions in the global scope.
   ======================================== */

var pickedDay = null;
var pickedTime = null;

function showBooking(event) {
    if (event) event.preventDefault();
    goToBookingStage(2);
    setTimeout(function() {
        var cal = document.getElementById('cal');
        if (cal) cal.classList.add('assembled');
    }, 50);
    var stage2 = document.getElementById('booking-stage-2');
    if (stage2) {
        stage2.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function goToBookingStage(stage) {
    for (var i = 2; i <= 4; i++) {
        var el = document.getElementById('booking-stage-' + i);
        if (!el) continue;
        if (i === stage) {
            el.classList.remove('gone');
        } else {
            el.classList.add('gone');
        }
    }

    if (stage === 4) {
        var path = document.querySelector('.checkmark-path');
        if (path) {
            path.style.animation = 'none';
            void path.offsetWidth;
            path.style.animation = '';
        }
    }

    if (stage === 1) {
        var allStages = document.querySelectorAll('.booking-flow');
        allStages.forEach(function(el) { el.classList.add('gone'); });
        var cal = document.getElementById('cal');
        if (cal) cal.classList.remove('assembled');
        var times = document.getElementById('times-section');
        if (times) times.classList.remove('visible');
        document.querySelectorAll('.cal-day').forEach(function(d) {
            d.classList.remove('selected');
        });
        document.querySelectorAll('.time-slot').forEach(function(s) {
            s.classList.remove('selected');
        });
        document.querySelectorAll('.tag').forEach(function(t) {
            t.classList.remove('selected');
        });
        var cb = document.getElementById('continue-btn');
        if (cb) cb.disabled = true;
        pickedDay = null;
        pickedTime = null;
    }
}

function selectDay(el, day) {
    document.querySelectorAll('.cal-day').forEach(function(d) {
        d.classList.remove('selected');
    });
    el.classList.add('selected');
    pickedDay = day;
    var dayOut = document.getElementById('day-out');
    if (dayOut) dayOut.textContent = day;
    var times = document.getElementById('times-section');
    if (times) times.classList.add('visible');
    pickedTime = null;
    document.querySelectorAll('.time-slot').forEach(function(s) {
        s.classList.remove('selected');
    });
    var cb = document.getElementById('continue-btn');
    if (cb) cb.disabled = true;
}

function selectTime(el, time) {
    document.querySelectorAll('.time-slot').forEach(function(s) {
        s.classList.remove('selected');
    });
    el.classList.add('selected');
    pickedTime = time;
    var cd = document.getElementById('confirm-day');
    var ct = document.getElementById('confirm-time');
    var sd = document.getElementById('success-day');
    var st = document.getElementById('success-time');
    if (cd) cd.textContent = pickedDay;
    if (ct) ct.textContent = time;
    if (sd) sd.textContent = pickedDay;
    if (st) st.textContent = time;
    var cb = document.getElementById('continue-btn');
    if (cb) cb.disabled = false;
}
