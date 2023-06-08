  d3 = function () {
    function n(n) {
      return null != n && !isNaN(n)
    }

    function t(n) {
      return n.length
    }

    function e(n) {
      for (var t = 1; n * t % 1;) t *= 10;
      return t
    }

    function r(n, t) {
      try {
        for (var e in t) Object.defineProperty(n.prototype, e, {
          value: t[e],
          enumerable: !1
        })
      } catch (r) {
        n.prototype = t
      }
    }

    function i() {}

    function u() {}

    function a(n, t, e) {
      return function () {
        var r = e.apply(t, arguments);
        return r === t ? n : r
      }
    }

    function o() {}

    function c(n) {
      function t() {
        for (var t, r = e, i = -1, u = r.length; ++i < u;)(t = r[i].on) && t.apply(this, arguments);
        return n
      }
      var e = [],
        r = new i;
      return t.on = function (t, i) {
        var u, a = r.get(t);
        return arguments.length < 2 ? a && a.on : (a && (a.on = null, e = e.slice(0, u = e.indexOf(a)).concat(e.slice(u + 1)), r.remove(t)), i && e.push(r.set(t, {
          on: i
        })), n)
      }, t
    }

    function l() {
      ua.event.stopPropagation(), ua.event.preventDefault()
    }

    function f() {
      for (var n, t = ua.event; n = t.sourceEvent;) t = n;
      return t
    }

    function s(n, t) {
      function e() {
        n.on(t, null)
      }
      n.on(t, function () {
        l(), e()
      }, !0), setTimeout(e, 0)
    }

    function h(n) {
      for (var t = new o, e = 0, r = arguments.length; ++e < r;) t[arguments[e]] = c(t);
      return t.of = function (e, r) {
        return function (i) {
          try {
            var u = i.sourceEvent = ua.event;
            i.target = n, ua.event = i, t[i.type].apply(e, r)
          } finally {
            ua.event = u
          }
        }
      }, t
    }

    function g(n, t) {
      var e = n.ownerSVGElement || n;
      if (e.createSVGPoint) {
        var r = e.createSVGPoint();
        if (0 > pa && (oa.scrollX || oa.scrollY)) {
          e = ua.select(aa.body).append("svg").style("position", "absolute").style("top", 0).style("left", 0);
          var i = e[0][0].getScreenCTM();
          pa = !(i.f || i.e), e.remove()
        }
        return pa ? (r.x = t.pageX, r.y = t.pageY) : (r.x = t.clientX, r.y = t.clientY), r = r.matrixTransform(n.getScreenCTM().inverse()), [r.x, r.y]
      }
      var u = n.getBoundingClientRect();
      return [t.clientX - u.left - n.clientLeft, t.clientY - u.top - n.clientTop]
    }

    function p(n) {
      for (var t = -1, e = n.length, r = []; ++t < e;) r.push(n[t]);
      return r
    }

    function d(n) {
      return Array.prototype.slice.call(n)
    }

    function m(n) {
      return va(n, wa), n
    }

    function v(n) {
      return function () {
        return ya(n, this)
      }
    }

    function y(n) {
      return function () {
        return Ma(n, this)
      }
    }

    function M(n, t) {
      function e() {
        this.removeAttribute(n)
      }

      function r() {
        this.removeAttributeNS(n.space, n.local)
      }

      function i() {
        this.setAttribute(n, t)
      }

      function u() {
        this.setAttributeNS(n.space, n.local, t)
      }

      function a() {
        var e = t.apply(this, arguments);
        null == e ? this.removeAttribute(n) : this.setAttribute(n, e)
      }

      function o() {
        var e = t.apply(this, arguments);
        null == e ? this.removeAttributeNS(n.space, n.local) : this.setAttributeNS(n.space, n.local, e)
      }
      return n = ua.ns.qualify(n), null == t ? n.local ? r : e : "function" == typeof t ? n.local ? o : a : n.local ? u : i
    }

    function x(n) {
      return n.trim().replace(/\s+/g, " ")
    }

    function _(n) {
      return RegExp("(?:^|\\s+)" + ua.requote(n) + "(?:\\s+|$)", "g")
    }

    function w(n, t) {
      function e() {
        for (var e = -1; ++e < i;) n[e](this, t)
      }

      function r() {
        for (var e = -1, r = t.apply(this, arguments); ++e < i;) n[e](this, r)
      }
      n = n.trim().split(/\s+/).map(S);
      var i = n.length;
      return "function" == typeof t ? r : e
    }

    function S(n) {
      var t = _(n);
      return function (e, r) {
        if (i = e.classList) return r ? i.add(n) : i.remove(n);
        var i = e.getAttribute("class") || "";
        r ? (t.lastIndex = 0, t.test(i) || e.setAttribute("class", x(i + " " + n))) : e.setAttribute("class", x(i.replace(t, " ")))
      }
    }

    function E(n, t, e) {
      function r() {
        this.style.removeProperty(n)
      }

      function i() {
        this.style.setProperty(n, t, e)
      }

      function u() {
        var r = t.apply(this, arguments);
        null == r ? this.style.removeProperty(n) : this.style.setProperty(n, r, e)
      }
      return null == t ? r : "function" == typeof t ? u : i
    }

    function k(n, t) {
      function e() {
        delete this[n]
      }

      function r() {
        this[n] = t
      }

      function i() {
        var e = t.apply(this, arguments);
        null == e ? delete this[n] : this[n] = e
      }
      return null == t ? e : "function" == typeof t ? i : r
    }

    function A(n) {
      return {
        __data__: n
      }
    }

    function N(n) {
      return function () {
        return _a(this, n)
      }
    }

    function q(n) {
      return arguments.length || (n = ua.ascending),
        function (t, e) {
          return !t - !e || n(t.__data__, e.__data__)
        }
    }

    function T() {}

    function C(n, t, e) {
      function r() {
        var t = this[a];
        t && (this.removeEventListener(n, t, t.$), delete this[a])
      }

      function i() {
        var i = c(t, da(arguments));
        r.call(this), this.addEventListener(n, this[a] = i, i.$ = e), i._ = t
      }

      function u() {
        var t, e = RegExp("^__on([^.]+)" + ua.requote(n) + "$");
        for (var r in this)
          if (t = r.match(e)) {
            var i = this[r];
            this.removeEventListener(t[1], i, i.$), delete this[r]
          }
      }
      var a = "__on" + n,
        o = n.indexOf("."),
        c = z;
      o > 0 && (n = n.substring(0, o));
      var l = ka.get(n);
      return l && (n = l, c = D), o ? t ? i : r : t ? T : u
    }

    function z(n, t) {
      return function (e) {
        var r = ua.event;
        ua.event = e, t[0] = this.__data__;
        try {
          n.apply(this, t)
        } finally {
          ua.event = r
        }
      }
    }

    function D(n, t) {
      var e = z(n, t);
      return function (n) {
        var t = this,
          r = n.relatedTarget;
        r && (r === t || r.compareDocumentPosition(t) & 8) || e.call(t, n)
      }
    }

    function j(n, t) {
      for (var e = 0, r = n.length; r > e; e++)
        for (var i, u = n[e], a = 0, o = u.length; o > a; a++)(i = u[a]) && t(i, a, e);
      return n
    }

    function L(n) {
      return va(n, Aa), n
    }

    function F() {}

    function H(n, t, e) {
      return new P(n, t, e)
    }

    function P(n, t, e) {
      this.h = n, this.s = t, this.l = e
    }

    function R(n, t, e) {
      function r(n) {
        return n > 360 ? n -= 360 : 0 > n && (n += 360), 60 > n ? u + (a - u) * n / 60 : 180 > n ? a : 240 > n ? u + (a - u) * (240 - n) / 60 : u
      }

      function i(n) {
        return Math.round(r(n) * 255)
      }
      var u, a;
      return n = isNaN(n) ? 0 : (n %= 360) < 0 ? n + 360 : n, t = isNaN(t) ? 0 : 0 > t ? 0 : t > 1 ? 1 : t, e = 0 > e ? 0 : e > 1 ? 1 : e, a = .5 >= e ? e * (1 + t) : e + t - e * t, u = 2 * e - a, et(i(n + 120), i(n), i(n - 120))
    }

    function O(n) {
      return n > 0 ? 1 : 0 > n ? -1 : 0
    }

    function Y(n) {
      return Math.acos(Math.max(-1, Math.min(1, n)))
    }

    function U(n) {
      return n > 1 ? Da / 2 : -1 > n ? -Da / 2 : Math.asin(n)
    }

    function I(n) {
      return (Math.exp(n) - Math.exp(-n)) / 2
    }

    function V(n) {
      return (Math.exp(n) + Math.exp(-n)) / 2
    }

    function X(n) {
      return (n = Math.sin(n / 2)) * n
    }

    function Z(n, t, e) {
      return new B(n, t, e)
    }

    function B(n, t, e) {
      this.h = n, this.c = t, this.l = e
    }

    function $(n, t, e) {
      return isNaN(n) && (n = 0), isNaN(t) && (t = 0), J(e, Math.cos(n *= La) * t, Math.sin(n) * t)
    }

    function J(n, t, e) {
      return new G(n, t, e)
    }

    function G(n, t, e) {
      this.l = n, this.a = t, this.b = e
    }

    function K(n, t, e) {
      var r = (n + 16) / 116,
        i = r + t / 500,
        u = r - e / 200;
      return i = Q(i) * Ra, r = Q(r) * Oa, u = Q(u) * Ya, et(tt(3.2404542 * i - 1.5371385 * r - .4985314 * u), tt(-.969266 * i + 1.8760108 * r + .041556 * u), tt(.0556434 * i - .2040259 * r + 1.0572252 * u))
    }

    function W(n, t, e) {
      return n > 0 ? Z(Math.atan2(e, t) * Fa, Math.sqrt(t * t + e * e), n) : Z(0 / 0, 0 / 0, n)
    }

    function Q(n) {
      return n > .206893034 ? n * n * n : (n - 4 / 29) / 7.787037
    }

    function nt(n) {
      return n > .008856 ? Math.pow(n, 1 / 3) : 7.787037 * n + 4 / 29
    }

    function tt(n) {
      return Math.round(255 * (.00304 >= n ? 12.92 * n : 1.055 * Math.pow(n, 1 / 2.4) - .055))
    }

    function et(n, t, e) {
      return new rt(n, t, e)
    }

    function rt(n, t, e) {
      this.r = n, this.g = t, this.b = e
    }

    function it(n) {
      return 16 > n ? "0" + Math.max(0, n).toString(16) : Math.min(255, n).toString(16)
    }

    function ut(n, t, e) {
      var r, i, u, a = 0,
        o = 0,
        c = 0;
      if (r = /([a-z]+)\((.*)\)/i.exec(n)) switch (i = r[2].split(","), r[1]) {
        case "hsl":
          return e(parseFloat(i[0]), parseFloat(i[1]) / 100, parseFloat(i[2]) / 100);
        case "rgb":
          return t(lt(i[0]), lt(i[1]), lt(i[2]))
      }
      return (u = Va.get(n)) ? t(u.r, u.g, u.b) : (null != n && n.charAt(0) === "#" && (n.length === 4 ? (a = n.charAt(1), a += a, o = n.charAt(2), o += o, c = n.charAt(3), c += c) : n.length === 7 && (a = n.substring(1, 3), o = n.substring(3, 5), c = n.substring(5, 7)), a = parseInt(a, 16), o = parseInt(o, 16), c = parseInt(c, 16)), t(a, o, c))
    }

    function at(n, t, e) {
      var r, i, u = Math.min(n /= 255, t /= 255, e /= 255),
        a = Math.max(n, t, e),
        o = a - u,
        c = (a + u) / 2;
      return o ? (i = .5 > c ? o / (a + u) : o / (2 - a - u), r = n == a ? (t - e) / o + (e > t ? 6 : 0) : t == a ? (e - n) / o + 2 : (n - t) / o + 4, r *= 60) : (r = 0 / 0, i = c > 0 && 1 > c ? 0 : r), H(r, i, c)
    }

    function ot(n, t, e) {
      n = ct(n), t = ct(t), e = ct(e);
      var r = nt((.4124564 * n + .3575761 * t + .1804375 * e) / Ra),
        i = nt((.2126729 * n + .7151522 * t + .072175 * e) / Oa),
        u = nt((.0193339 * n + .119192 * t + .9503041 * e) / Ya);
      return J(116 * i - 16, 500 * (r - i), 200 * (i - u))
    }

    function ct(n) {
      return (n /= 255) <= .04045 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4)
    }

    function lt(n) {
      var t = parseFloat(n);
      return n.charAt(n.length - 1) === "%" ? Math.round(2.55 * t) : t
    }

    function ft(n) {
      return "function" == typeof n ? n : function () {
        return n
      }
    }

    function st(n) {
      return n
    }

    function ht(n) {
      return n.length === 1 ? function (t, e) {
        n(null == t ? e : null)
      } : n
    }

    function gt(n, t) {
      function e(n, e, u) {
        arguments.length < 3 && (u = e, e = null);
        var a = ua.xhr(n, t, u);
        return a.row = function (n) {
          return arguments.length ? a.response((e = n) == null ? r : i(n)) : e
        }, a.row(e)
      }

      function r(n) {
        return e.parse(n.responseText)
      }

      function i(n) {
        return function (t) {
          return e.parse(t.responseText, n)
        }
      }

      function a(t) {
        return t.map(o).join(n)
      }

      function o(n) {
        return c.test(n) ? '"' + n.replace(/\"/g, '""') + '"' : n
      }
      var c = RegExp('["' + n + "\n]"),
        l = n.charCodeAt(0);
      return e.parse = function (n, t) {
        var r;
        return e.parseRows(n, function (n, e) {
          if (r) return r(n, e - 1);
          var i = Function("d", "return {" + n.map(function (n, t) {
            return JSON.stringify(n) + ": d[" + t + "]"
          }).join(",") + "}");
          r = t ? function (n, e) {
            return t(i(n), e)
          } : i
        })
      }, e.parseRows = function (n, t) {
        function e() {
          if (f >= c) return a;
          if (i) return i = !1, u;
          var t = f;
          if (n.charCodeAt(t) === 34) {
            for (var e = t; e++ < c;)
              if (n.charCodeAt(e) === 34) {
                if (n.charCodeAt(e + 1) !== 34) break;
                ++e
              } f = e + 2;
            var r = n.charCodeAt(e + 1);
            return 13 === r ? (i = !0, n.charCodeAt(e + 2) === 10 && ++f) : 10 === r && (i = !0), n.substring(t + 1, e).replace(/""/g, '"')
          }
          for (; c > f;) {
            var r = n.charCodeAt(f++),
              o = 1;
            if (10 === r) i = !0;
            else if (13 === r) i = !0, n.charCodeAt(f) === 10 && (++f, ++o);
            else if (r !== l) continue;
            return n.substring(t, f - o)
          }
          return n.substring(t)
        }
        for (var r, i, u = {}, a = {}, o = [], c = n.length, f = 0, s = 0;
          (r = e()) !== a;) {
          for (var h = []; r !== u && r !== a;) h.push(r), r = e();
          (!t || (h = t(h, s++))) && o.push(h)
        }
        return o
      }, e.format = function (t) {
        if (Array.isArray(t[0])) return e.formatRows(t);
        var r = new u,
          i = [];
        return t.forEach(function (n) {
          for (var t in n) r.has(t) || i.push(r.add(t))
        }), [i.map(o).join(n)].concat(t.map(function (t) {
          return i.map(function (n) {
            return o(t[n])
          }).join(n)
        })).join("\n")
      }, e.formatRows = function (n) {
        return n.map(a).join("\n")
      }, e
    }

    function pt() {
      for (var n, t = Date.now(), e = Ja; e;) n = t - e.then, n >= e.delay && (e.flush = e.callback(n)), e = e.next;
      var r = dt() - t;
      r > 24 ? (isFinite(r) && (clearTimeout(Za), Za = setTimeout(pt, r)), Xa = 0) : (Xa = 1, Ga(pt))
    }

    function dt() {
      for (var n = null, t = Ja, e = 1 / 0; t;) t.flush ? (delete $a[t.callback.id], t = n ? n.next = t.next : Ja = t.next) : (e = Math.min(e, t.then + t.delay), t = (n = t).next);
      return e
    }

    function mt(n, t) {
      var e = Math.pow(10, Math.abs(8 - t) * 3);
      return {
        scale: t > 8 ? function (n) {
          return n / e
        } : function (n) {
          return n * e
        },
        symbol: n
      }
    }

    function vt(n, t) {
      return t - (n ? Math.ceil(Math.log(n) / Math.LN10) : 1)
    }

    function yt(n) {
      return n + ""
    }

    function Mt(n, t) {
      n && ao.hasOwnProperty(n.type) && ao[n.type](n, t)
    }

    function xt(n, t, e) {
      var r, i = -1,
        u = n.length - e;
      for (t.lineStart(); ++i < u;) r = n[i], t.point(r[0], r[1]);
      t.lineEnd()
    }

    function bt(n, t) {
      var e = -1,
        r = n.length;
      for (t.polygonStart(); ++e < r;) xt(n[e], t, 1);
      t.polygonEnd()
    }

    function _t() {
      function n(n, t) {
        n *= La, t = t * La / 2 + Da / 4;
        var e = n - r,
          a = Math.cos(t),
          o = Math.sin(t),
          c = u * o,
          l = i * a + c * Math.cos(e),
          f = c * Math.sin(e);
        co += Math.atan2(f, l), r = n, i = a, u = o
      }
      var t, e, r, i, u;
      lo.point = function (a, o) {
        lo.point = n, r = (t = a) * La, i = Math.cos(o = (e = o) * La / 2 + Da / 4), u = Math.sin(o)
      }, lo.lineEnd = function () {
        n(t, e)
      }
    }

    function wt(n) {
      var t = n[0],
        e = n[1],
        r = Math.cos(e);
      return [r * Math.cos(t), r * Math.sin(t), Math.sin(e)]
    }

    function St(n, t) {
      return n[0] * t[0] + n[1] * t[1] + n[2] * t[2]
    }

    function Et(n, t) {
      return [n[1] * t[2] - n[2] * t[1], n[2] * t[0] - n[0] * t[2], n[0] * t[1] - n[1] * t[0]]
    }

    function kt(n, t) {
      n[0] += t[0], n[1] += t[1], n[2] += t[2]
    }

    function At(n, t) {
      return [n[0] * t, n[1] * t, n[2] * t]
    }

    function Nt(n) {
      var t = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
      n[0] /= t, n[1] /= t, n[2] /= t
    }

    function qt(n) {
      return [Math.atan2(n[1], n[0]), Math.asin(Math.max(-1, Math.min(1, n[2])))]
    }

    function Tt(n, t) {
      return Math.abs(n[0] - t[0]) < ja && Math.abs(n[1] - t[1]) < ja
    }

    function Ct(n, t) {
      if (!fo) {
        ++so, n *= La;
        var e = Math.cos(t *= La);
        ho += (e * Math.cos(n) - ho) / so, go += (e * Math.sin(n) - go) / so, po += (Math.sin(t) - po) / so
      }
    }

    function zt() {
      var n, t;
      fo = 1, Dt(), fo = 2;
      var e = mo.point;
      mo.point = function (r, i) {
        e(n = r, t = i)
      }, mo.lineEnd = function () {
        mo.point(n, t), jt(), mo.lineEnd = jt
      }
    }

    function Dt() {
      function n(n, i) {
        n *= La;
        var u = Math.cos(i *= La),
          a = u * Math.cos(n),
          o = u * Math.sin(n),
          c = Math.sin(i),
          l = Math.atan2(Math.sqrt((l = e * c - r * o) * l + (l = r * a - t * c) * l + (l = t * o - e * a) * l), t * a + e * o + r * c);
        so += l, ho += l * (t + (t = a)), go += l * (e + (e = o)), po += l * (r + (r = c))
      }
      var t, e, r;
      fo > 1 || (1 > fo && (fo = 1, so = ho = go = po = 0), mo.point = function (i, u) {
        i *= La;
        var a = Math.cos(u *= La);
        t = a * Math.cos(i), e = a * Math.sin(i), r = Math.sin(u), mo.point = n
      })
    }

    function jt() {
      mo.point = Ct
    }

    function Lt() {
      return !0
    }

    function Ft(n, t, e, r, i) {
      var u = [],
        a = [];
      if (n.forEach(function (n) {
          if (!((t = n.length - 1) <= 0)) {
            var t, e = n[0],
              r = n[t];
            if (Tt(e, r)) {
              i.lineStart();
              for (var o = 0; t > o; ++o) i.point((e = n[o])[0], e[1]);
              return i.lineEnd(), void 0
            }
            var c = {
                point: e,
                points: n,
                other: null,
                visited: !1,
                entry: !0,
                subject: !0
              },
              l = {
                point: e,
                points: [e],
                other: c,
                visited: !1,
                entry: !1,
                subject: !1
              };
            c.other = l, u.push(c), a.push(l), c = {
              point: r,
              points: [r],
              other: null,
              visited: !1,
              entry: !1,
              subject: !0
            }, l = {
              point: r,
              points: [r],
              other: c,
              visited: !1,
              entry: !0,
              subject: !1
            }, c.other = l, u.push(c), a.push(l)
          }
        }), a.sort(t), Ht(u), Ht(a), u.length) {
        if (e)
          for (var o = 1, c = !e(a[0].point), l = a.length; l > o; ++o) a[o].entry = c = !c;
        for (var f, s, h, g = u[0];;) {
          for (f = g; f.visited;)
            if ((f = f.next) === g) return;
          s = f.points, i.lineStart();
          do {
            if (f.visited = f.other.visited = !0, f.entry) {
              if (f.subject)
                for (var o = 0; o < s.length; o++) i.point((h = s[o])[0], h[1]);
              else r(f.point, f.next.point, 1, i);
              f = f.next
            } else {
              if (f.subject) {
                s = f.prev.points;
                for (var o = s.length; --o >= 0;) i.point((h = s[o])[0], h[1])
              } else r(f.point, f.prev.point, -1, i);
              f = f.prev
            }
            f = f.other, s = f.points
          } while (!f.visited);
          i.lineEnd()
        }
      }
    }

    function Ht(n) {
      if (t = n.length) {
        for (var t, e, r = 0, i = n[0]; ++r < t;) i.next = e = n[r], e.prev = i, i = e;
        i.next = e = n[0], e.prev = i
      }
    }

    function Pt(n, t, e) {
      return function (r) {
        function i(t, e) {
          n(t, e) && r.point(t, e)
        }

        function u(n, t) {
          m.point(n, t)
        }

        function a() {
          v.point = u, m.lineStart()
        }

        function o() {
          v.point = i, m.lineEnd()
        }

        function c(n, t) {
          M.point(n, t), d.push([n, t])
        }

        function l() {
          M.lineStart(), d = []
        }

        function f() {
          c(d[0][0], d[0][1]), M.lineEnd();
          var n, t = M.clean(),
            e = y.buffer(),
            i = e.length;
          if (!i) return p = !0, g += Yt(d, -1), d = null, void 0;
          if (d = null, 1 & t) {
            n = e[0], h += Yt(n, 1);
            var u, i = n.length - 1,
              a = -1;
            for (r.lineStart(); ++a < i;) r.point((u = n[a])[0], u[1]);
            return r.lineEnd(), void 0
          }
          i > 1 && 2 & t && e.push(e.pop().concat(e.shift())), s.push(e.filter(Rt))
        }
        var s, h, g, p, d, m = t(r),
          v = {
            point: i,
            lineStart: a,
            lineEnd: o,
            polygonStart: function () {
              v.point = c, v.lineStart = l, v.lineEnd = f, p = !1, g = h = 0, s = [], r.polygonStart()
            },
            polygonEnd: function () {
              v.point = i, v.lineStart = a, v.lineEnd = o, s = ua.merge(s), s.length ? Ft(s, Ut, null, e, r) : (-ja > h || p && -ja > g) && (r.lineStart(), e(null, null, 1, r), r.lineEnd()), r.polygonEnd(), s = null
            },
            sphere: function () {
              r.polygonStart(), r.lineStart(), e(null, null, 1, r), r.lineEnd(), r.polygonEnd()
            }
          },
          y = Ot(),
          M = t(y);
        return v
      }
    }

    function Rt(n) {
      return n.length > 1
    }

    function Ot() {
      var n, t = [];
      return {
        lineStart: function () {
          t.push(n = [])
        },
        point: function (t, e) {
          n.push([t, e])
        },
        lineEnd: T,
        buffer: function () {
          var e = t;
          return t = [], n = null, e
        },
        rejoin: function () {
          t.length > 1 && t.push(t.pop().concat(t.shift()))
        }
      }
    }

    function Yt(n, t) {
      if (!(e = n.length)) return 0;
      for (var e, r, i, u = 0, a = 0, o = n[0], c = o[0], l = o[1], f = Math.cos(l), s = Math.atan2(t * Math.sin(c) * f, Math.sin(l)), h = 1 - t * Math.cos(c) * f, g = s; ++u < e;) o = n[u], f = Math.cos(l = o[1]), r = Math.atan2(t * Math.sin(c = o[0]) * f, Math.sin(l)), i = 1 - t * Math.cos(c) * f, Math.abs(h - 2) < ja && Math.abs(i - 2) < ja || (Math.abs(i) < ja || Math.abs(h) < ja || (Math.abs(Math.abs(r - s) - Da) < ja ? i + h > 2 && (a += 4 * (r - s)) : a += Math.abs(h - 2) < ja ? 4 * (r - g) : ((3 * Da + r - s) % (2 * Da) - Da) * (h + i)), g = s, s = r, h = i);
      return a
    }

    function Ut(n, t) {
      return ((n = n.point)[0] < 0 ? n[1] - Da / 2 - ja : Da / 2 - n[1]) - ((t = t.point)[0] < 0 ? t[1] - Da / 2 - ja : Da / 2 - t[1])
    }

    function It(n) {
      var t, e = 0 / 0,
        r = 0 / 0,
        i = 0 / 0;
      return {
        lineStart: function () {
          n.lineStart(), t = 1
        },
        point: function (u, a) {
          var o = u > 0 ? Da : -Da,
            c = Math.abs(u - e);
          Math.abs(c - Da) < ja ? (n.point(e, r = (r + a) / 2 > 0 ? Da / 2 : -Da / 2), n.point(i, r), n.lineEnd(), n.lineStart(), n.point(o, r), n.point(u, r), t = 0) : i !== o && c >= Da && (Math.abs(e - i) < ja && (e -= i * ja), Math.abs(u - o) < ja && (u -= o * ja), r = Vt(e, r, u, a), n.point(i, r), n.lineEnd(), n.lineStart(), n.point(o, r), t = 0), n.point(e = u, r = a), i = o
        },
        lineEnd: function () {
          n.lineEnd(), e = r = 0 / 0
        },
        clean: function () {
          return 2 - t
        }
      }
    }

    function Vt(n, t, e, r) {
      var i, u, a = Math.sin(n - e);
      return Math.abs(a) > ja ? Math.atan((Math.sin(t) * (u = Math.cos(r)) * Math.sin(e) - Math.sin(r) * (i = Math.cos(t)) * Math.sin(n)) / (i * u * a)) : (t + r) / 2
    }

    function Xt(n, t, e, r) {
      var i;
      if (null == n) i = e * Da / 2, r.point(-Da, i), r.point(0, i), r.point(Da, i), r.point(Da, 0), r.point(Da, -i), r.point(0, -i), r.point(-Da, -i), r.point(-Da, 0), r.point(-Da, i);
      else if (Math.abs(n[0] - t[0]) > ja) {
        var u = (n[0] < t[0] ? 1 : -1) * Da;
        i = e * u / 2, r.point(-u, i), r.point(0, i), r.point(u, i)
      } else r.point(t[0], t[1])
    }

    function Zt(n) {
      function t(n, t) {
        return Math.cos(n) * Math.cos(t) > u
      }

      function e(n) {
        var e, u, c, l, f;
        return {
          lineStart: function () {
            l = c = !1, f = 1
          },
          point: function (s, h) {
            var g, p = [s, h],
              d = t(s, h),
              m = a ? d ? 0 : i(s, h) : d ? i(s + (0 > s ? Da : -Da), h) : 0;
            if (!e && (l = c = d) && n.lineStart(), d !== c && (g = r(e, p), (Tt(e, g) || Tt(p, g)) && (p[0] += ja, p[1] += ja, d = t(p[0], p[1]))), d !== c) f = 0, d ? (n.lineStart(), g = r(p, e), n.point(g[0], g[1])) : (g = r(e, p), n.point(g[0], g[1]), n.lineEnd()), e = g;
            else if (o && e && a ^ d) {
              var v;
              m & u || !(v = r(p, e, !0)) || (f = 0, a ? (n.lineStart(), n.point(v[0][0], v[0][1]), n.point(v[1][0], v[1][1]), n.lineEnd()) : (n.point(v[1][0], v[1][1]), n.lineEnd(), n.lineStart(), n.point(v[0][0], v[0][1])))
            }!d || e && Tt(e, p) || n.point(p[0], p[1]), e = p, c = d, u = m
          },
          lineEnd: function () {
            c && n.lineEnd(), e = null
          },
          clean: function () {
            return f | (l && c) << 1
          }
        }
      }

      function r(n, t, e) {
        var r = wt(n),
          i = wt(t),
          a = [1, 0, 0],
          o = Et(r, i),
          c = St(o, o),
          l = o[0],
          f = c - l * l;
        if (!f) return !e && n;
        var s = u * c / f,
          h = -u * l / f,
          g = Et(a, o),
          p = At(a, s),
          d = At(o, h);
        kt(p, d);
        var m = g,
          v = St(p, m),
          y = St(m, m),
          M = v * v - y * (St(p, p) - 1);
        if (!(0 > M)) {
          var x = Math.sqrt(M),
            b = At(m, (-v - x) / y);
          if (kt(b, p), b = qt(b), !e) return b;
          var _, w = n[0],
            S = t[0],
            E = n[1],
            k = t[1];
          w > S && (_ = w, w = S, S = _);
          var A = S - w,
            N = Math.abs(A - Da) < ja,
            q = N || ja > A;
          if (!N && E > k && (_ = E, E = k, k = _), q ? N ? E + k > 0 ^ b[1] < (Math.abs(b[0] - w) < ja ? E : k) : E <= b[1] && b[1] <= k : A > Da ^ (w <= b[0] && b[0] <= S)) {
            var T = At(m, (-v + x) / y);
            return kt(T, p), [b, qt(T)]
          }
        }
      }

      function i(t, e) {
        var r = a ? n : Da - n,
          i = 0;
        return -r > t ? i |= 1 : t > r && (i |= 2), -r > e ? i |= 4 : e > r && (i |= 8), i
      }
      var u = Math.cos(n),
        a = u > 0,
        o = Math.abs(u) > ja,
        c = ue(n, 6 * La);
      return Pt(t, e, c)
    }

    function Bt(n, t, e, r) {
      function i(r, i) {
        return Math.abs(r[0] - n) < ja ? i > 0 ? 0 : 3 : Math.abs(r[0] - e) < ja ? i > 0 ? 2 : 1 : Math.abs(r[1] - t) < ja ? i > 0 ? 1 : 0 : i > 0 ? 3 : 2
      }

      function u(n, t) {
        return a(n.point, t.point)
      }

      function a(n, t) {
        var e = i(n, 1),
          r = i(t, 1);
        return e !== r ? e - r : 0 === e ? t[1] - n[1] : 1 === e ? n[0] - t[0] : 2 === e ? n[1] - t[1] : t[0] - n[0]
      }

      function o(i, u) {
        var a = u[0] - i[0],
          o = u[1] - i[1],
          c = [0, 1];
        return Math.abs(a) < ja && Math.abs(o) < ja ? n <= i[0] && i[0] <= e && t <= i[1] && i[1] <= r : $t(n - i[0], a, c) && $t(i[0] - e, -a, c) && $t(t - i[1], o, c) && $t(i[1] - r, -o, c) ? (c[1] < 1 && (u[0] = i[0] + c[1] * a, u[1] = i[1] + c[1] * o), c[0] > 0 && (i[0] += c[0] * a, i[1] += c[0] * o), !0) : !1
      }
      return function (c) {
        function l(u) {
          var a = i(u, -1),
            o = f([0 === a || 3 === a ? n : e, a > 1 ? r : t]);
          return o
        }

        function f(n) {
          for (var t = 0, e = M.length, r = n[1], i = 0; e > i; ++i)
            for (var u = 1, a = M[i], o = a.length, c = a[0]; o > u; ++u) b = a[u], c[1] <= r ? b[1] > r && s(c, b, n) > 0 && ++t : b[1] <= r && s(c, b, n) < 0 && --t, c = b;
          return 0 !== t
        }

        function s(n, t, e) {
          return (t[0] - n[0]) * (e[1] - n[1]) - (e[0] - n[0]) * (t[1] - n[1])
        }

        function h(u, o, c, l) {
          var f = 0,
            s = 0;
          if (null == u || (f = i(u, c)) !== (s = i(o, c)) || a(u, o) < 0 ^ c > 0) {
            do l.point(0 === f || 3 === f ? n : e, f > 1 ? r : t); while ((f = (f + c + 4) % 4) !== s)
          } else l.point(o[0], o[1])
        }

        function g(i, u) {
          return i >= n && e >= i && u >= t && r >= u
        }

        function p(n, t) {
          g(n, t) && c.point(n, t)
        }

        function d() {
          C.point = v, M && M.push(x = []), N = !0, A = !1, E = k = 0 / 0
        }

        function m() {
          y && (v(_, w), S && A && T.rejoin(), y.push(T.buffer())), C.point = p, A && c.lineEnd()
        }

        function v(n, t) {
          n = Math.max(-yo, Math.min(yo, n)), t = Math.max(-yo, Math.min(yo, t));
          var e = g(n, t);
          if (M && x.push([n, t]), N) _ = n, w = t, S = e, N = !1, e && (c.lineStart(), c.point(n, t));
          else if (e && A) c.point(n, t);
          else {
            var r = [E, k],
              i = [n, t];
            o(r, i) ? (A || (c.lineStart(), c.point(r[0], r[1])), c.point(i[0], i[1]), e || c.lineEnd()) : e && (c.lineStart(), c.point(n, t))
          }
          E = n, k = t, A = e
        }
        var y, M, x, _, w, S, E, k, A, N, q = c,
          T = Ot(),
          C = {
            point: p,
            lineStart: d,
            lineEnd: m,
            polygonStart: function () {
              c = T, y = [], M = []
            },
            polygonEnd: function () {
              c = q, (y = ua.merge(y)).length ? (c.polygonStart(), Ft(y, u, l, h, c), c.polygonEnd()) : f([n, t]) && (c.polygonStart(), c.lineStart(), h(null, null, 1, c), c.lineEnd(), c.polygonEnd()), y = M = x = null
            }
          };
        return C
      }
    }

    function $t(n, t, e) {
      if (Math.abs(t) < ja) return 0 >= n;
      var r = n / t;
      if (t > 0) {
        if (r > e[1]) return !1;
        r > e[0] && (e[0] = r)
      } else {
        if (r < e[0]) return !1;
        r < e[1] && (e[1] = r)
      }
      return !0
    }

    function Jt(n, t) {
      function e(e, r) {
        return e = n(e, r), t(e[0], e[1])
      }
      return n.invert && t.invert && (e.invert = function (e, r) {
        return e = t.invert(e, r), e && n.invert(e[0], e[1])
      }), e
    }

    function Gt(n) {
      function t(t) {
        function r(e, r) {
          e = n(e, r), t.point(e[0], e[1])
        }

        function u() {
          f = 0 / 0, d.point = a, t.lineStart()
        }

        function a(r, u) {
          var a = wt([r, u]),
            o = n(r, u);
          e(f, s, l, h, g, p, f = o[0], s = o[1], l = r, h = a[0], g = a[1], p = a[2], i, t), t.point(f, s)
        }

        function o() {
          d.point = r, t.lineEnd()
        }

        function c() {
          var n, r, c, m, v, y, M;
          u(), d.point = function (t, e) {
            a(n = t, r = e), c = f, m = s, v = h, y = g, M = p, d.point = a
          }, d.lineEnd = function () {
            e(f, s, l, h, g, p, c, m, n, v, y, M, i, t), d.lineEnd = o, o()
          }
        }
        var l, f, s, h, g, p, d = {
          point: r,
          lineStart: u,
          lineEnd: o,
          polygonStart: function () {
            t.polygonStart(), d.lineStart = c
          },
          polygonEnd: function () {
            t.polygonEnd(), d.lineStart = u
          }
        };
        return d
      }

      function e(t, i, u, a, o, c, l, f, s, h, g, p, d, m) {
        var v = l - t,
          y = f - i,
          M = v * v + y * y;
        if (M > 4 * r && d--) {
          var x = a + h,
            b = o + g,
            _ = c + p,
            w = Math.sqrt(x * x + b * b + _ * _),
            S = Math.asin(_ /= w),
            E = Math.abs(Math.abs(_) - 1) < ja ? (u + s) / 2 : Math.atan2(b, x),
            k = n(E, S),
            A = k[0],
            N = k[1],
            q = A - t,
            T = N - i,
            C = y * q - v * T;
          (C * C / M > r || Math.abs((v * q + y * T) / M - .5) > .3) && (e(t, i, u, a, o, c, A, N, E, x /= w, b /= w, _, d, m), m.point(A, N), e(A, N, E, x, b, _, l, f, s, h, g, p, d, m))
        }
      }
      var r = .5,
        i = 16;
      return t.precision = function (n) {
        return arguments.length ? (i = (r = n * n) > 0 && 16, t) : Math.sqrt(r)
      }, t
    }

    function Kt(n) {
      return Wt(function () {
        return n
      })()
    }

    function Wt(n) {
      function t(n) {
        return n = a(n[0] * La, n[1] * La), [n[0] * f + o, c - n[1] * f]
      }

      function e(n) {
        return n = a.invert((n[0] - o) / f, (c - n[1]) / f), n && [n[0] * Fa, n[1] * Fa]
      }

      function r() {
        a = Jt(u = te(d, m, v), i);
        var n = i(g, p);
        return o = s - n[0] * f, c = h + n[1] * f, t
      }
      var i, u, a, o, c, l = Gt(function (n, t) {
          return n = i(n, t), [n[0] * f + o, c - n[1] * f]
        }),
        f = 150,
        s = 480,
        h = 250,
        g = 0,
        p = 0,
        d = 0,
        m = 0,
        v = 0,
        y = vo,
        M = st,
        x = null,
        b = null;
      return t.stream = function (n) {
          return Qt(u, y(l(M(n))))
        }, t.clipAngle = function (n) {
          return arguments.length ? (y = null == n ? (x = n, vo) : Zt((x = +n) * La), t) : x
        }, t.clipExtent = function (n) {
          return arguments.length ? (b = n, M = null == n ? st : Bt(n[0][0], n[0][1], n[1][0], n[1][1]), t) : b
        }, t.scale = function (n) {
          return arguments.length ? (f = +n, r()) : f
        }, t.translate = function (n) {
          return arguments.length ? (s = +n[0], h = +n[1], r()) : [s, h]
        }, t.center = function (n) {
          return arguments.length ? (g = n[0] % 360 * La, p = n[1] % 360 * La, r()) : [g * Fa, p * Fa]
        }, t.rotate = function (n) {
          return arguments.length ? (d = n[0] % 360 * La, m = n[1] % 360 * La, v = n.length > 2 ? n[2] % 360 * La : 0, r()) : [d * Fa, m * Fa, v * Fa]
        }, ua.rebind(t, l, "precision"),
        function () {
          return i = n.apply(this, arguments), t.invert = i.invert && e, r()
        }
    }

    function Qt(n, t) {
      return {
        point: function (e, r) {
          r = n(e * La, r * La), e = r[0], t.point(e > Da ? e - 2 * Da : -Da > e ? e + 2 * Da : e, r[1])
        },
        sphere: function () {
          t.sphere()
        },
        lineStart: function () {
          t.lineStart()
        },
        lineEnd: function () {
          t.lineEnd()
        },
        polygonStart: function () {
          t.polygonStart()
        },
        polygonEnd: function () {
          t.polygonEnd()
        }
      }
    }

    function ne(n, t) {
      return [n, t]
    }

    function te(n, t, e) {
      return n ? t || e ? Jt(re(n), ie(t, e)) : re(n) : t || e ? ie(t, e) : ne
    }

    function ee(n) {
      return function (t, e) {
        return t += n, [t > Da ? t - 2 * Da : -Da > t ? t + 2 * Da : t, e]
      }
    }

    function re(n) {
      var t = ee(n);
      return t.invert = ee(-n), t
    }

    function ie(n, t) {
      function e(n, t) {
        var e = Math.cos(t),
          o = Math.cos(n) * e,
          c = Math.sin(n) * e,
          l = Math.sin(t),
          f = l * r + o * i;
        return [Math.atan2(c * u - f * a, o * r - l * i), Math.asin(Math.max(-1, Math.min(1, f * u + c * a)))]
      }
      var r = Math.cos(n),
        i = Math.sin(n),
        u = Math.cos(t),
        a = Math.sin(t);
      return e.invert = function (n, t) {
        var e = Math.cos(t),
          o = Math.cos(n) * e,
          c = Math.sin(n) * e,
          l = Math.sin(t),
          f = l * u - c * a;
        return [Math.atan2(c * u + l * a, o * r + f * i), Math.asin(Math.max(-1, Math.min(1, f * r - o * i)))]
      }, e
    }

    function ue(n, t) {
      var e = Math.cos(n),
        r = Math.sin(n);
      return function (i, u, a, o) {
        null != i ? (i = ae(e, i), u = ae(e, u), (a > 0 ? u > i : i > u) && (i += 2 * a * Da)) : (i = n + 2 * a * Da, u = n);
        for (var c, l = a * t, f = i; a > 0 ? f > u : u > f; f -= l) o.point((c = qt([e, -r * Math.cos(f), -r * Math.sin(f)]))[0], c[1])
      }
    }

    function ae(n, t) {
      var e = wt(t);
      e[0] -= n, Nt(e);
      var r = Y(-e[1]);
      return ((-e[2] < 0 ? -r : r) + 2 * Math.PI - ja) % (2 * Math.PI)
    }

    function oe(n, t, e) {
      var r = ua.range(n, t - ja, e).concat(t);
      return function (n) {
        return r.map(function (t) {
          return [n, t]
        })
      }
    }

    function ce(n, t, e) {
      var r = ua.range(n, t - ja, e).concat(t);
      return function (n) {
        return r.map(function (t) {
          return [t, n]
        })
      }
    }

    function le(n) {
      return n.source
    }

    function fe(n) {
      return n.target
    }

    function se(n, t, e, r) {
      var i = Math.cos(t),
        u = Math.sin(t),
        a = Math.cos(r),
        o = Math.sin(r),
        c = i * Math.cos(n),
        l = i * Math.sin(n),
        f = a * Math.cos(e),
        s = a * Math.sin(e),
        h = 2 * Math.asin(Math.sqrt(X(r - t) + i * a * X(e - n))),
        g = 1 / Math.sin(h),
        p = h ? function (n) {
          var t = Math.sin(n *= h) * g,
            e = Math.sin(h - n) * g,
            r = e * c + t * f,
            i = e * l + t * s,
            a = e * u + t * o;
          return [Math.atan2(i, r) * Fa, Math.atan2(a, Math.sqrt(r * r + i * i)) * Fa]
        } : function () {
          return [n * Fa, t * Fa]
        };
      return p.distance = h, p
    }

    function he() {
      function n(n, i) {
        var u = Math.sin(i *= La),
          a = Math.cos(i),
          o = Math.abs((n *= La) - t),
          c = Math.cos(o);
        Mo += Math.atan2(Math.sqrt((o = a * Math.sin(o)) * o + (o = r * u - e * a * c) * o), e * u + r * a * c), t = n, e = u, r = a
      }
      var t, e, r;
      xo.point = function (i, u) {
        t = i * La, e = Math.sin(u *= La), r = Math.cos(u), xo.point = n
      }, xo.lineEnd = function () {
        xo.point = xo.lineEnd = T
      }
    }

    function ge(n) {
      var t = 0,
        e = Da / 3,
        r = Wt(n),
        i = r(t, e);
      return i.parallels = function (n) {
        return arguments.length ? r(t = n[0] * Da / 180, e = n[1] * Da / 180) : [180 * (t / Da), 180 * (e / Da)]
      }, i
    }

    function pe(n, t) {
      function e(n, t) {
        var e = Math.sqrt(u - 2 * i * Math.sin(t)) / i;
        return [e * Math.sin(n *= i), a - e * Math.cos(n)]
      }
      var r = Math.sin(n),
        i = (r + Math.sin(t)) / 2,
        u = 1 + r * (2 * i - r),
        a = Math.sqrt(u) / i;
      return e.invert = function (n, t) {
        var e = a - t;
        return [Math.atan2(n, e) / i, U((u - (n * n + e * e) * i * i) / (2 * i))]
      }, e
    }

    function de() {
      function n(n, t) {
        _o += i * n - r * t, r = n, i = t
      }
      var t, e, r, i;
      Ao.point = function (u, a) {
        Ao.point = n, t = r = u, e = i = a
      }, Ao.lineEnd = function () {
        n(t, e)
      }
    }

    function me(n, t) {
      wo > n && (wo = n), n > Eo && (Eo = n), So > t && (So = t), t > ko && (ko = t)
    }

    function ve() {
      function n(n, t) {
        a.push("M", n, ",", t, u)
      }

      function t(n, t) {
        a.push("M", n, ",", t), o.point = e
      }

      function e(n, t) {
        a.push("L", n, ",", t)
      }

      function r() {
        o.point = n
      }

      function i() {
        a.push("Z")
      }
      var u = ye(4.5),
        a = [],
        o = {
          point: n,
          lineStart: function () {
            o.point = t
          },
          lineEnd: r,
          polygonStart: function () {
            o.lineEnd = i
          },
          polygonEnd: function () {
            o.lineEnd = r, o.point = n
          },
          pointRadius: function (n) {
            return u = ye(n), o
          },
          result: function () {
            if (a.length) {
              var n = a.join("");
              return a = [], n
            }
          }
        };
      return o
    }

    function ye(n) {
      return "m0," + n + "a" + n + "," + n + " 0 1,1 0," + -2 * n + "a" + n + "," + n + " 0 1,1 0," + 2 * n + "z"
    }

    function Me(n, t) {
      fo || (ho += n, go += t, ++po)
    }

    function xe() {
      function n(n, r) {
        var i = n - t,
          u = r - e,
          a = Math.sqrt(i * i + u * u);
        ho += a * (t + n) / 2, go += a * (e + r) / 2, po += a, t = n, e = r
      }
      var t, e;
      if (1 !== fo) {
        if (!(1 > fo)) return;
        fo = 1, ho = go = po = 0
      }
      qo.point = function (r, i) {
        qo.point = n, t = r, e = i
      }
    }

    function be() {
      qo.point = Me
    }

    function _e() {
      function n(n, t) {
        var e = i * n - r * t;
        ho += e * (r + n), go += e * (i + t), po += 3 * e, r = n, i = t
      }
      var t, e, r, i;
      2 > fo && (fo = 2, ho = go = po = 0), qo.point = function (u, a) {
        qo.point = n, t = r = u, e = i = a
      }, qo.lineEnd = function () {
        n(t, e)
      }
    }

    function we(n) {
      function t(t, e) {
        n.moveTo(t, e), n.arc(t, e, a, 0, 2 * Da)
      }

      function e(t, e) {
        n.moveTo(t, e), o.point = r
      }

      function r(t, e) {
        n.lineTo(t, e)
      }

      function i() {
        o.point = t
      }

      function u() {
        n.closePath()
      }
      var a = 4.5,
        o = {
          point: t,
          lineStart: function () {
            o.point = e
          },
          lineEnd: i,
          polygonStart: function () {
            o.lineEnd = u
          },
          polygonEnd: function () {
            o.lineEnd = i, o.point = t
          },
          pointRadius: function (n) {
            return a = n, o
          },
          result: T
        };
      return o
    }

    function Se(n) {
      var t = Gt(function (t, e) {
        return n([t * Fa, e * Fa])
      });
      return function (n) {
        return n = t(n), {
          point: function (t, e) {
            n.point(t * La, e * La)
          },
          sphere: function () {
            n.sphere()
          },
          lineStart: function () {
            n.lineStart()
          },
          lineEnd: function () {
            n.lineEnd()
          },
          polygonStart: function () {
            n.polygonStart()
          },
          polygonEnd: function () {
            n.polygonEnd()
          }
        }
      }
    }

    function Ee(n, t) {
      function e(t, e) {
        var r = Math.cos(t),
          i = Math.cos(e),
          u = n(r * i);
        return [u * i * Math.sin(t), u * Math.sin(e)]
      }
      return e.invert = function (n, e) {
        var r = Math.sqrt(n * n + e * e),
          i = t(r),
          u = Math.sin(i),
          a = Math.cos(i);
        return [Math.atan2(n * u, r * a), Math.asin(r && e * u / r)]
      }, e
    }

    function ke(n, t) {
      function e(n, t) {
        var e = Math.abs(Math.abs(t) - Da / 2) < ja ? 0 : a / Math.pow(i(t), u);
        return [e * Math.sin(u * n), a - e * Math.cos(u * n)]
      }
      var r = Math.cos(n),
        i = function (n) {
          return Math.tan(Da / 4 + n / 2)
        },
        u = n === t ? Math.sin(n) : Math.log(r / Math.cos(t)) / Math.log(i(t) / i(n)),
        a = r * Math.pow(i(n), u) / u;
      return u ? (e.invert = function (n, t) {
        var e = a - t,
          r = O(u) * Math.sqrt(n * n + e * e);
        return [Math.atan2(n, e) / u, 2 * Math.atan(Math.pow(a / r, 1 / u)) - Da / 2]
      }, e) : Ne
    }

    function Ae(n, t) {
      function e(n, t) {
        var e = u - t;
        return [e * Math.sin(i * n), u - e * Math.cos(i * n)]
      }
      var r = Math.cos(n),
        i = n === t ? Math.sin(n) : (r - Math.cos(t)) / (t - n),
        u = r / i + n;
      return Math.abs(i) < ja ? ne : (e.invert = function (n, t) {
        var e = u - t;
        return [Math.atan2(n, e) / i, u - O(i) * Math.sqrt(n * n + e * e)]
      }, e)
    }

    function Ne(n, t) {
      return [n, Math.log(Math.tan(Da / 4 + t / 2))]
    }

    function qe(n) {
      var t, e = Kt(n),
        r = e.scale,
        i = e.translate,
        u = e.clipExtent;
      return e.scale = function () {
        var n = r.apply(e, arguments);
        return n === e ? t ? e.clipExtent(null) : e : n
      }, e.translate = function () {
        var n = i.apply(e, arguments);
        return n === e ? t ? e.clipExtent(null) : e : n
      }, e.clipExtent = function (n) {
        var a = u.apply(e, arguments);
        if (a === e) {
          if (t = null == n) {
            var o = Da * r(),
              c = i();
            u([
              [c[0] - o, c[1] - o],
              [c[0] + o, c[1] + o]
            ])
          }
        } else t && (a = null);
        return a
      }, e.clipExtent(null)
    }

    function Te(n, t) {
      var e = Math.cos(t) * Math.sin(n);
      return [Math.log((1 + e) / (1 - e)) / 2, Math.atan2(Math.tan(t), Math.cos(n))]
    }

    function Ce(n) {
      function t(t) {
        function a() {
          l.push("M", u(n(f), o))
        }
        for (var c, l = [], f = [], s = -1, h = t.length, g = ft(e), p = ft(r); ++s < h;) i.call(this, c = t[s], s) ? f.push([+g.call(this, c, s), +p.call(this, c, s)]) : f.length && (a(), f = []);
        return f.length && a(), l.length ? l.join("") : null
      }
      var e = ze,
        r = De,
        i = Lt,
        u = je,
        a = u.key,
        o = .7;
      return t.x = function (n) {
        return arguments.length ? (e = n, t) : e
      }, t.y = function (n) {
        return arguments.length ? (r = n, t) : r
      }, t.defined = function (n) {
        return arguments.length ? (i = n, t) : i
      }, t.interpolate = function (n) {
        return arguments.length ? (a = "function" == typeof n ? u = n : (u = Lo.get(n) || je).key, t) : a
      }, t.tension = function (n) {
        return arguments.length ? (o = n, t) : o
      }, t
    }

    function ze(n) {
      return n[0]
    }

    function De(n) {
      return n[1]
    }

    function je(n) {
      return n.join("L")
    }

    function Le(n) {
      return je(n) + "Z"
    }

    function Fe(n) {
      for (var t = 0, e = n.length, r = n[0], i = [r[0], ",", r[1]]; ++t < e;) i.push("V", (r = n[t])[1], "H", r[0]);
      return i.join("")
    }

    function He(n) {
      for (var t = 0, e = n.length, r = n[0], i = [r[0], ",", r[1]]; ++t < e;) i.push("H", (r = n[t])[0], "V", r[1]);
      return i.join("")
    }

    function Pe(n, t) {
      return n.length < 4 ? je(n) : n[1] + Ye(n.slice(1, n.length - 1), Ue(n, t))
    }

    function Re(n, t) {
      return n.length < 3 ? je(n) : n[0] + Ye((n.push(n[0]), n), Ue([n[n.length - 2]].concat(n, [n[1]]), t))
    }

    function Oe(n, t) {
      return n.length < 3 ? je(n) : n[0] + Ye(n, Ue(n, t))
    }

    function Ye(n, t) {
      if (t.length < 1 || n.length != t.length && n.length != t.length + 2) return je(n);
      var e = n.length != t.length,
        r = "",
        i = n[0],
        u = n[1],
        a = t[0],
        o = a,
        c = 1;
      if (e && (r += "Q" + (u[0] - a[0] * 2 / 3) + "," + (u[1] - a[1] * 2 / 3) + "," + u[0] + "," + u[1], i = n[1], c = 2), t.length > 1) {
        o = t[1], u = n[c], c++, r += "C" + (i[0] + a[0]) + "," + (i[1] + a[1]) + "," + (u[0] - o[0]) + "," + (u[1] - o[1]) + "," + u[0] + "," + u[1];
        for (var l = 2; l < t.length; l++, c++) u = n[c], o = t[l], r += "S" + (u[0] - o[0]) + "," + (u[1] - o[1]) + "," + u[0] + "," + u[1]
      }
      if (e) {
        var f = n[c];
        r += "Q" + (u[0] + o[0] * 2 / 3) + "," + (u[1] + o[1] * 2 / 3) + "," + f[0] + "," + f[1]
      }
      return r
    }

    function Ue(n, t) {
      for (var e, r = [], i = (1 - t) / 2, u = n[0], a = n[1], o = 1, c = n.length; ++o < c;) e = u, u = a, a = n[o], r.push([i * (a[0] - e[0]), i * (a[1] - e[1])]);
      return r
    }

    function Ie(n) {
      if (n.length < 3) return je(n);
      var t = 1,
        e = n.length,
        r = n[0],
        i = r[0],
        u = r[1],
        a = [i, i, i, (r = n[1])[0]],
        o = [u, u, u, r[1]],
        c = [i, ",", u];
      for ($e(c, a, o); ++t < e;) r = n[t], a.shift(), a.push(r[0]), o.shift(), o.push(r[1]), $e(c, a, o);
      for (t = -1; ++t < 2;) a.shift(), a.push(r[0]), o.shift(), o.push(r[1]), $e(c, a, o);
      return c.join("")
    }

    function Ve(n) {
      if (n.length < 4) return je(n);
      for (var t, e = [], r = -1, i = n.length, u = [0], a = [0]; ++r < 3;) t = n[r], u.push(t[0]), a.push(t[1]);
      for (e.push(Be(Po, u) + "," + Be(Po, a)), --r; ++r < i;) t = n[r], u.shift(), u.push(t[0]), a.shift(), a.push(t[1]), $e(e, u, a);
      return e.join("")
    }

    function Xe(n) {
      for (var t, e, r = -1, i = n.length, u = i + 4, a = [], o = []; ++r < 4;) e = n[r % i], a.push(e[0]), o.push(e[1]);
      for (t = [Be(Po, a), ",", Be(Po, o)], --r; ++r < u;) e = n[r % i], a.shift(), a.push(e[0]), o.shift(), o.push(e[1]), $e(t, a, o);
      return t.join("")
    }

    function Ze(n, t) {
      var e = n.length - 1;
      if (e)
        for (var r, i, u = n[0][0], a = n[0][1], o = n[e][0] - u, c = n[e][1] - a, l = -1; ++l <= e;) r = n[l], i = l / e, r[0] = t * r[0] + (1 - t) * (u + i * o), r[1] = t * r[1] + (1 - t) * (a + i * c);
      return Ie(n)
    }

    function Be(n, t) {
      return n[0] * t[0] + n[1] * t[1] + n[2] * t[2] + n[3] * t[3]
    }

    function $e(n, t, e) {
      n.push("C", Be(Fo, t), ",", Be(Fo, e), ",", Be(Ho, t), ",", Be(Ho, e), ",", Be(Po, t), ",", Be(Po, e))
    }

    function Je(n, t) {
      return (t[1] - n[1]) / (t[0] - n[0])
    }

    function Ge(n) {
      for (var t = 0, e = n.length - 1, r = [], i = n[0], u = n[1], a = r[0] = Je(i, u); ++t < e;) r[t] = (a + (a = Je(i = u, u = n[t + 1]))) / 2;
      return r[t] = a, r
    }

    function Ke(n) {
      for (var t, e, r, i, u = [], a = Ge(n), o = -1, c = n.length - 1; ++o < c;) t = Je(n[o], n[o + 1]), Math.abs(t) < 1e-6 ? a[o] = a[o + 1] = 0 : (e = a[o] / t, r = a[o + 1] / t, i = e * e + r * r, i > 9 && (i = 3 * t / Math.sqrt(i), a[o] = i * e, a[o + 1] = i * r));
      for (o = -1; ++o <= c;) i = (n[Math.min(c, o + 1)][0] - n[Math.max(0, o - 1)][0]) / (6 * (1 + a[o] * a[o])), u.push([i || 0, a[o] * i || 0]);
      return u
    }

    function We(n) {
      return n.length < 3 ? je(n) : n[0] + Ye(n, Ke(n))
    }

    function Qe(n, t, e, r) {
      var i, u, a, o, c, l, f;
      return i = r[n], u = i[0], a = i[1], i = r[t], o = i[0], c = i[1], i = r[e], l = i[0], f = i[1], (f - a) * (o - u) - (c - a) * (l - u) > 0
    }

    function nr(n, t, e) {
      return (e[0] - t[0]) * (n[1] - t[1]) < (e[1] - t[1]) * (n[0] - t[0])
    }

    function tr(n, t, e, r) {
      var i = n[0],
        u = e[0],
        a = t[0] - i,
        o = r[0] - u,
        c = n[1],
        l = e[1],
        f = t[1] - c,
        s = r[1] - l,
        h = (o * (c - l) - s * (i - u)) / (s * a - o * f);
      return [i + h * a, c + h * f]
    }

    function er(n, t) {
      var e = {
          list: n.map(function (n, t) {
            return {
              index: t,
              x: n[0],
              y: n[1]
            }
          }).sort(function (n, t) {
            return n.y < t.y ? -1 : n.y > t.y ? 1 : n.x < t.x ? -1 : n.x > t.x ? 1 : 0
          }),
          bottomSite: null
        },
        r = {
          list: [],
          leftEnd: null,
          rightEnd: null,
          init: function () {
            r.leftEnd = r.createHalfEdge(null, "l"), r.rightEnd = r.createHalfEdge(null, "l"), r.leftEnd.r = r.rightEnd, r.rightEnd.l = r.leftEnd, r.list.unshift(r.leftEnd, r.rightEnd)
          },
          createHalfEdge: function (n, t) {
            return {
              edge: n,
              side: t,
              vertex: null,
              l: null,
              r: null
            }
          },
          insert: function (n, t) {
            t.l = n, t.r = n.r, n.r.l = t, n.r = t
          },
          leftBound: function (n) {
            var t = r.leftEnd;
            do t = t.r; while (t != r.rightEnd && i.rightOf(t, n));
            return t = t.l
          },
          del: function (n) {
            n.l.r = n.r, n.r.l = n.l, n.edge = null
          },
          right: function (n) {
            return n.r
          },
          left: function (n) {
            return n.l
          },
          leftRegion: function (n) {
            return n.edge == null ? e.bottomSite : n.edge.region[n.side]
          },
          rightRegion: function (n) {
            return n.edge == null ? e.bottomSite : n.edge.region[Ro[n.side]]
          }
        },
        i = {
          bisect: function (n, t) {
            var e = {
                region: {
                  l: n,
                  r: t
                },
                ep: {
                  l: null,
                  r: null
                }
              },
              r = t.x - n.x,
              i = t.y - n.y,
              u = r > 0 ? r : -r,
              a = i > 0 ? i : -i;
            return e.c = n.x * r + n.y * i + .5 * (r * r + i * i), u > a ? (e.a = 1, e.b = i / r, e.c /= r) : (e.b = 1, e.a = r / i, e.c /= i), e
          },
          intersect: function (n, t) {
            var e = n.edge,
              r = t.edge;
            if (!e || !r || e.region.r == r.region.r) return null;
            var i = e.a * r.b - e.b * r.a;
            if (Math.abs(i) < 1e-10) return null;
            var u, a, o = (e.c * r.b - r.c * e.b) / i,
              c = (r.c * e.a - e.c * r.a) / i,
              l = e.region.r,
              f = r.region.r;
            l.y < f.y || l.y == f.y && l.x < f.x ? (u = n, a = e) : (u = t, a = r);
            var s = o >= a.region.r.x;
            return s && u.side === "l" || !s && u.side === "r" ? null : {
              x: o,
              y: c
            }
          },
          rightOf: function (n, t) {
            var e = n.edge,
              r = e.region.r,
              i = t.x > r.x;
            if (i && n.side === "l") return 1;
            if (!i && n.side === "r") return 0;
            if (e.a === 1) {
              var u = t.y - r.y,
                a = t.x - r.x,
                o = 0,
                c = 0;
              if (!i && e.b < 0 || i && e.b >= 0 ? c = o = u >= e.b * a : (c = t.x + t.y * e.b > e.c, e.b < 0 && (c = !c), c || (o = 1)), !o) {
                var l = r.x - e.region.l.x;
                c = e.b * (a * a - u * u) < l * u * (1 + 2 * a / l + e.b * e.b), e.b < 0 && (c = !c)
              }
            } else {
              var f = e.c - e.a * t.x,
                s = t.y - f,
                h = t.x - r.x,
                g = f - r.y;
              c = s * s > h * h + g * g
            }
            return n.side === "l" ? c : !c
          },
          endPoint: function (n, e, r) {
            n.ep[e] = r, n.ep[Ro[e]] && t(n)
          },
          distance: function (n, t) {
            var e = n.x - t.x,
              r = n.y - t.y;
            return Math.sqrt(e * e + r * r)
          }
        },
        u = {
          list: [],
          insert: function (n, t, e) {
            n.vertex = t, n.ystar = t.y + e;
            for (var r = 0, i = u.list, a = i.length; a > r; r++) {
              var o = i[r];
              if (!(n.ystar > o.ystar || n.ystar == o.ystar && t.x > o.vertex.x)) break
            }
            i.splice(r, 0, n)
          },
          del: function (n) {
            for (var t = 0, e = u.list, r = e.length; r > t && e[t] != n; ++t);
            e.splice(t, 1)
          },
          empty: function () {
            return u.list.length === 0
          },
          nextEvent: function (n) {
            for (var t = 0, e = u.list, r = e.length; r > t; ++t)
              if (e[t] == n) return e[t + 1];
            return null
          },
          min: function () {
            var n = u.list[0];
            return {
              x: n.vertex.x,
              y: n.ystar
            }
          },
          extractMin: function () {
            return u.list.shift()
          }
        };
      r.init(), e.bottomSite = e.list.shift();
      for (var a, o, c, l, f, s, h, g, p, d, m, v, y, M = e.list.shift();;)
        if (u.empty() || (a = u.min()), M && (u.empty() || M.y < a.y || M.y == a.y && M.x < a.x)) o = r.leftBound(M), c = r.right(o), h = r.rightRegion(o), v = i.bisect(h, M), s = r.createHalfEdge(v, "l"), r.insert(o, s), d = i.intersect(o, s), d && (u.del(o), u.insert(o, d, i.distance(d, M))), o = s, s = r.createHalfEdge(v, "r"), r.insert(o, s), d = i.intersect(s, c), d && u.insert(s, d, i.distance(d, M)), M = e.list.shift();
        else {
          if (u.empty()) break;
          o = u.extractMin(), l = r.left(o), c = r.right(o), f = r.right(c), h = r.leftRegion(o), g = r.rightRegion(c), m = o.vertex, i.endPoint(o.edge, o.side, m), i.endPoint(c.edge, c.side, m), r.del(o), u.del(c), r.del(c), y = "l", h.y > g.y && (p = h, h = g, g = p, y = "r"), v = i.bisect(h, g), s = r.createHalfEdge(v, y), r.insert(l, s), i.endPoint(v, Ro[y], m), d = i.intersect(l, s), d && (u.del(l), u.insert(l, d, i.distance(d, h))), d = i.intersect(s, f), d && u.insert(s, d, i.distance(d, h))
        } for (o = r.right(r.leftEnd); o != r.rightEnd; o = r.right(o)) t(o.edge)
    }

    function rr(n) {
      return n.x
    }

    function ir(n) {
      return n.y
    }

    function ur() {
      return {
        leaf: !0,
        nodes: [],
        point: null,
        x: null,
        y: null
      }
    }

    function ar(n, t, e, r, i, u) {
      if (!n(t, e, r, i, u)) {
        var a = .5 * (e + i),
          o = .5 * (r + u),
          c = t.nodes;
        c[0] && ar(n, c[0], e, r, a, o), c[1] && ar(n, c[1], a, r, i, o), c[2] && ar(n, c[2], e, o, a, u), c[3] && ar(n, c[3], a, o, i, u)
      }
    }

    function or(n, t) {
      n = ua.rgb(n), t = ua.rgb(t);
      var e = n.r,
        r = n.g,
        i = n.b,
        u = t.r - e,
        a = t.g - r,
        o = t.b - i;
      return function (n) {
        return "#" + it(Math.round(e + u * n)) + it(Math.round(r + a * n)) + it(Math.round(i + o * n))
      }
    }

    function cr(n) {
      var t = [n.a, n.b],
        e = [n.c, n.d],
        r = fr(t),
        i = lr(t, e),
        u = fr(sr(e, t, -i)) || 0;
      t[0] * e[1] < e[0] * t[1] && (t[0] *= -1, t[1] *= -1, r *= -1, i *= -1), this.rotate = (r ? Math.atan2(t[1], t[0]) : Math.atan2(-e[0], e[1])) * Fa, this.translate = [n.e, n.f], this.scale = [r, u], this.skew = u ? Math.atan2(i, u) * Fa : 0
    }

    function lr(n, t) {
      return n[0] * t[0] + n[1] * t[1]
    }

    function fr(n) {
      var t = Math.sqrt(lr(n, n));
      return t && (n[0] /= t, n[1] /= t), t
    }

    function sr(n, t, e) {
      return n[0] += e * t[0], n[1] += e * t[1], n
    }

    function hr(n, t) {
      return t -= n = +n,
        function (e) {
          return n + t * e
        }
    }

    function gr(n, t) {
      var e, r = [],
        i = [],
        u = ua.transform(n),
        a = ua.transform(t),
        o = u.translate,
        c = a.translate,
        l = u.rotate,
        f = a.rotate,
        s = u.skew,
        h = a.skew,
        g = u.scale,
        p = a.scale;
      return o[0] != c[0] || o[1] != c[1] ? (r.push("translate(", null, ",", null, ")"), i.push({
          i: 1,
          x: hr(o[0], c[0])
        }, {
          i: 3,
          x: hr(o[1], c[1])
        })) : c[0] || c[1] ? r.push("translate(" + c + ")") : r.push(""), l != f ? (l - f > 180 ? f += 360 : f - l > 180 && (l += 360), i.push({
          i: r.push(r.pop() + "rotate(", null, ")") - 2,
          x: hr(l, f)
        })) : f && r.push(r.pop() + "rotate(" + f + ")"), s != h ? i.push({
          i: r.push(r.pop() + "skewX(", null, ")") - 2,
          x: hr(s, h)
        }) : h && r.push(r.pop() + "skewX(" + h + ")"), g[0] != p[0] || g[1] != p[1] ? (e = r.push(r.pop() + "scale(", null, ",", null, ")"), i.push({
          i: e - 4,
          x: hr(g[0], p[0])
        }, {
          i: e - 2,
          x: hr(g[1], p[1])
        })) : (p[0] != 1 || p[1] != 1) && r.push(r.pop() + "scale(" + p + ")"), e = i.length,
        function (n) {
          for (var t, u = -1; ++u < e;) r[(t = i[u]).i] = t.x(n);
          return r.join("")
        }
    }

    function pr(n, t) {
      var e, r = {},
        i = {};
      for (e in n) e in t ? r[e] = vr(e)(n[e], t[e]) : i[e] = n[e];
      for (e in t) e in n || (i[e] = t[e]);
      return function (n) {
        for (e in r) i[e] = r[e](n);
        return i
      }
    }

    function dr(n, t) {
      var e, r, i, u, a, o = 0,
        c = 0,
        l = [],
        f = [];
      for (n += "", t += "", Yo.lastIndex = 0, r = 0; e = Yo.exec(t); ++r) e.index && l.push(t.substring(o, c = e.index)), f.push({
        i: l.length,
        x: e[0]
      }), l.push(null), o = Yo.lastIndex;
      for (o < t.length && l.push(t.substring(o)), r = 0, u = f.length;
        (e = Yo.exec(n)) && u > r; ++r)
        if (a = f[r], a.x == e[0]) {
          if (a.i)
            if (l[a.i + 1] == null)
              for (l[a.i - 1] += a.x, l.splice(a.i, 1), i = r + 1; u > i; ++i) f[i].i--;
            else
              for (l[a.i - 1] += a.x + l[a.i + 1], l.splice(a.i, 2), i = r + 1; u > i; ++i) f[i].i -= 2;
          else if (l[a.i + 1] == null) l[a.i] = a.x;
          else
            for (l[a.i] = a.x + l[a.i + 1], l.splice(a.i + 1, 1), i = r + 1; u > i; ++i) f[i].i--;
          f.splice(r, 1), u--, r--
        } else a.x = hr(parseFloat(e[0]), parseFloat(a.x));
      for (; u > r;) a = f.pop(), l[a.i + 1] == null ? l[a.i] = a.x : (l[a.i] = a.x + l[a.i + 1], l.splice(a.i + 1, 1)), u--;
      return l.length === 1 ? l[0] == null ? (a = f[0].x, function (n) {
        return a(n) + ""
      }) : function () {
        return t
      } : function (n) {
        for (r = 0; u > r; ++r) l[(a = f[r]).i] = a.x(n);
        return l.join("")
      }
    }

    function mr(n, t) {
      for (var e, r = ua.interpolators.length; --r >= 0 && !(e = ua.interpolators[r](n, t)););
      return e
    }

    function vr(n) {
      return "transform" == n ? gr : mr
    }

    function yr(n, t) {
      var e, r = [],
        i = [],
        u = n.length,
        a = t.length,
        o = Math.min(n.length, t.length);
      for (e = 0; o > e; ++e) r.push(mr(n[e], t[e]));
      for (; u > e; ++e) i[e] = n[e];
      for (; a > e; ++e) i[e] = t[e];
      return function (n) {
        for (e = 0; o > e; ++e) i[e] = r[e](n);
        return i
      }
    }

    function Mr(n) {
      return function (t) {
        return 0 >= t ? 0 : t >= 1 ? 1 : n(t)
      }
    }

    function xr(n) {
      return function (t) {
        return 1 - n(1 - t)
      }
    }

    function br(n) {
      return function (t) {
        return .5 * (.5 > t ? n(2 * t) : 2 - n(2 - 2 * t))
      }
    }

    function _r(n) {
      return n * n
    }

    function wr(n) {
      return n * n * n
    }

    function Sr(n) {
      if (0 >= n) return 0;
      if (n >= 1) return 1;
      var t = n * n,
        e = t * n;
      return 4 * (.5 > n ? e : 3 * (n - t) + e - .75)
    }

    function Er(n) {
      return function (t) {
        return Math.pow(t, n)
      }
    }

    function kr(n) {
      return 1 - Math.cos(n * Da / 2)
    }

    function Ar(n) {
      return Math.pow(2, 10 * (n - 1))
    }

    function Nr(n) {
      return 1 - Math.sqrt(1 - n * n)
    }

    function qr(n, t) {
      var e;
      return arguments.length < 2 && (t = .45), arguments.length ? e = t / (2 * Da) * Math.asin(1 / n) : (n = 1, e = t / 4),
        function (r) {
          return 1 + n * Math.pow(2, 10 * -r) * Math.sin(2 * (r - e) * Da / t)
        }
    }

    function Tr(n) {
      return n || (n = 1.70158),
        function (t) {
          return t * t * ((n + 1) * t - n)
        }
    }

    function Cr(n) {
      return 1 / 2.75 > n ? 7.5625 * n * n : 2 / 2.75 > n ? 7.5625 * (n -= 1.5 / 2.75) * n + .75 : 2.5 / 2.75 > n ? 7.5625 * (n -= 2.25 / 2.75) * n + .9375 : 7.5625 * (n -= 2.625 / 2.75) * n + .984375
    }

    function zr(n, t) {
      n = ua.hcl(n), t = ua.hcl(t);
      var e = n.h,
        r = n.c,
        i = n.l,
        u = t.h - e,
        a = t.c - r,
        o = t.l - i;
      return isNaN(a) && (a = 0, r = isNaN(r) ? t.c : r), isNaN(u) ? (u = 0, e = isNaN(e) ? t.h : e) : u > 180 ? u -= 360 : -180 > u && (u += 360),
        function (n) {
          return $(e + u * n, r + a * n, i + o * n) + ""
        }
    }

    function Dr(n, t) {
      n = ua.hsl(n), t = ua.hsl(t);
      var e = n.h,
        r = n.s,
        i = n.l,
        u = t.h - e,
        a = t.s - r,
        o = t.l - i;
      return isNaN(a) && (a = 0, r = isNaN(r) ? t.s : r), isNaN(u) ? (u = 0, e = isNaN(e) ? t.h : e) : u > 180 ? u -= 360 : -180 > u && (u += 360),
        function (n) {
          return R(e + u * n, r + a * n, i + o * n) + ""
        }
    }

    function jr(n, t) {
      n = ua.lab(n), t = ua.lab(t);
      var e = n.l,
        r = n.a,
        i = n.b,
        u = t.l - e,
        a = t.a - r,
        o = t.b - i;
      return function (n) {
        return K(e + u * n, r + a * n, i + o * n) + ""
      }
    }

    function Lr(n, t) {
      return t -= n,
        function (e) {
          return Math.round(n + t * e)
        }
    }

    function Fr(n, t) {
      return t = t - (n = +n) ? 1 / (t - n) : 0,
        function (e) {
          return (e - n) * t
        }
    }

    function Hr(n, t) {
      return t = t - (n = +n) ? 1 / (t - n) : 0,
        function (e) {
          return Math.max(0, Math.min(1, (e - n) * t))
        }
    }

    function Pr(n) {
      for (var t = n.source, e = n.target, r = Or(t, e), i = [t]; t !== r;) t = t.parent, i.push(t);
      for (var u = i.length; e !== r;) i.splice(u, 0, e), e = e.parent;
      return i
    }

    function Rr(n) {
      for (var t = [], e = n.parent; null != e;) t.push(n), n = e, e = e.parent;
      return t.push(n), t
    }

    function Or(n, t) {
      if (n === t) return n;
      for (var e = Rr(n), r = Rr(t), i = e.pop(), u = r.pop(), a = null; i === u;) a = i, i = e.pop(), u = r.pop();
      return a
    }

    function Yr(n) {
      n.fixed |= 2
    }

    function Ur(n) {
      n.fixed &= -7
    }

    function Ir(n) {
      n.fixed |= 4, n.px = n.x, n.py = n.y
    }

    function Vr(n) {
      n.fixed &= -5
    }

    function Xr(n, t, e) {
      var r = 0,
        i = 0;
      if (n.charge = 0, !n.leaf)
        for (var u, a = n.nodes, o = a.length, c = -1; ++c < o;) u = a[c], null != u && (Xr(u, t, e), n.charge += u.charge, r += u.charge * u.cx, i += u.charge * u.cy);
      if (n.point) {
        n.leaf || (n.point.x += Math.random() - .5, n.point.y += Math.random() - .5);
        var l = t * e[n.point.index];
        n.charge += n.pointCharge = l, r += l * n.point.x, i += l * n.point.y
      }
      n.cx = r / n.charge, n.cy = i / n.charge
    }

    function Zr(n, t) {
      return ua.rebind(n, t, "sort", "children", "value"), n.nodes = n, n.links = Gr, n
    }

    function Br(n) {
      return n.children
    }

    function $r(n) {
      return n.value
    }

    function Jr(n, t) {
      return t.value - n.value
    }

    function Gr(n) {
      return ua.merge(n.map(function (n) {
        return (n.children || []).map(function (t) {
          return {
            source: n,
            target: t
          }
        })
      }))
    }

    function Kr(n) {
      return n.x
    }

    function Wr(n) {
      return n.y
    }

    function Qr(n, t, e) {
      n.y0 = t, n.y = e
    }

    function ni(n) {
      return ua.range(n.length)
    }

    function ti(n) {
      for (var t = -1, e = n[0].length, r = []; ++t < e;) r[t] = 0;
      return r
    }

    function ei(n) {
      for (var t, e = 1, r = 0, i = n[0][1], u = n.length; u > e; ++e)(t = n[e][1]) > i && (r = e, i = t);
      return r
    }

    function ri(n) {
      return n.reduce(ii, 0)
    }

    function ii(n, t) {
      return n + t[1]
    }

    function ui(n, t) {
      return ai(n, Math.ceil(Math.log(t.length) / Math.LN2 + 1))
    }

    function ai(n, t) {
      for (var e = -1, r = +n[0], i = (n[1] - r) / t, u = []; ++e <= t;) u[e] = i * e + r;
      return u
    }

    function oi(n) {
      return [ua.min(n), ua.max(n)]
    }

    function ci(n, t) {
      return n.parent == t.parent ? 1 : 2
    }

    function li(n) {
      var t = n.children;
      return t && t.length ? t[0] : n._tree.thread
    }

    function fi(n) {
      var t, e = n.children;
      return e && (t = e.length) ? e[t - 1] : n._tree.thread
    }

    function si(n, t) {
      var e = n.children;
      if (e && (i = e.length))
        for (var r, i, u = -1; ++u < i;) t(r = si(e[u], t), n) > 0 && (n = r);
      return n
    }

    function hi(n, t) {
      return n.x - t.x
    }

    function gi(n, t) {
      return t.x - n.x
    }

    function pi(n, t) {
      return n.depth - t.depth
    }

    function di(n, t) {
      function e(n, r) {
        var i = n.children;
        if (i && (a = i.length))
          for (var u, a, o = null, c = -1; ++c < a;) u = i[c], e(u, o), o = u;
        t(n, r)
      }
      e(n, null)
    }

    function mi(n) {
      for (var t, e = 0, r = 0, i = n.children, u = i.length; --u >= 0;) t = i[u]._tree, t.prelim += e, t.mod += e, e += t.shift + (r += t.change)
    }

    function vi(n, t, e) {
      n = n._tree, t = t._tree;
      var r = e / (t.number - n.number);
      n.change += r, t.change -= r, t.shift += e, t.prelim += e, t.mod += e
    }

    function yi(n, t, e) {
      return n._tree.ancestor.parent == t.parent ? n._tree.ancestor : e
    }

    function Mi(n, t) {
      return n.value - t.value
    }

    function xi(n, t) {
      var e = n._pack_next;
      n._pack_next = t, t._pack_prev = n, t._pack_next = e, e._pack_prev = t
    }

    function bi(n, t) {
      n._pack_next = t, t._pack_prev = n
    }

    function _i(n, t) {
      var e = t.x - n.x,
        r = t.y - n.y,
        i = n.r + t.r;
      return i * i - e * e - r * r > .001
    }

    function wi(n) {
      function t(n) {
        f = Math.min(n.x - n.r, f), s = Math.max(n.x + n.r, s), h = Math.min(n.y - n.r, h), g = Math.max(n.y + n.r, g)
      }
      if ((e = n.children) && (l = e.length)) {
        var e, r, i, u, a, o, c, l, f = 1 / 0,
          s = -1 / 0,
          h = 1 / 0,
          g = -1 / 0;
        if (e.forEach(Si), r = e[0], r.x = -r.r, r.y = 0, t(r), l > 1 && (i = e[1], i.x = i.r, i.y = 0, t(i), l > 2))
          for (u = e[2], Ai(r, i, u), t(u), xi(r, u), r._pack_prev = u, xi(u, i), i = r._pack_next, a = 3; l > a; a++) {
            Ai(r, i, u = e[a]);
            var p = 0,
              d = 1,
              m = 1;
            for (o = i._pack_next; o !== i; o = o._pack_next, d++)
              if (_i(o, u)) {
                p = 1;
                break
              } if (1 == p)
              for (c = r._pack_prev; c !== o._pack_prev && !_i(c, u); c = c._pack_prev, m++);
            p ? (m > d || d == m && i.r < r.r ? bi(r, i = o) : bi(r = c, i), a--) : (xi(r, u), i = u, t(u))
          }
        var v = (f + s) / 2,
          y = (h + g) / 2,
          M = 0;
        for (a = 0; l > a; a++) u = e[a], u.x -= v, u.y -= y, M = Math.max(M, u.r + Math.sqrt(u.x * u.x + u.y * u.y));
        n.r = M, e.forEach(Ei)
      }
    }

    function Si(n) {
      n._pack_next = n._pack_prev = n
    }

    function Ei(n) {
      delete n._pack_next, delete n._pack_prev
    }

    function ki(n, t, e, r) {
      var i = n.children;
      if (n.x = t += r * n.x, n.y = e += r * n.y, n.r *= r, i)
        for (var u = -1, a = i.length; ++u < a;) ki(i[u], t, e, r)
    }

    function Ai(n, t, e) {
      var r = n.r + e.r,
        i = t.x - n.x,
        u = t.y - n.y;
      if (r && (i || u)) {
        var a = t.r + e.r,
          o = i * i + u * u;
        a *= a, r *= r;
        var c = .5 + (r - a) / (2 * o),
          l = Math.sqrt(Math.max(0, 2 * a * (r + o) - (r -= o) * r - a * a)) / (2 * o);
        e.x = n.x + c * i + l * u, e.y = n.y + c * u - l * i
      } else e.x = n.x + r, e.y = n.y
    }

    function Ni(n) {
      return 1 + ua.max(n, function (n) {
        return n.y
      })
    }

    function qi(n) {
      return n.reduce(function (n, t) {
        return n + t.x
      }, 0) / n.length
    }

    function Ti(n) {
      var t = n.children;
      return t && t.length ? Ti(t[0]) : n
    }

    function Ci(n) {
      var t, e = n.children;
      return e && (t = e.length) ? Ci(e[t - 1]) : n
    }

    function zi(n) {
      return {
        x: n.x,
        y: n.y,
        dx: n.dx,
        dy: n.dy
      }
    }

    function Di(n, t) {
      var e = n.x + t[3],
        r = n.y + t[0],
        i = n.dx - t[1] - t[3],
        u = n.dy - t[0] - t[2];
      return 0 > i && (e += i / 2, i = 0), 0 > u && (r += u / 2, u = 0), {
        x: e,
        y: r,
        dx: i,
        dy: u
      }
    }

    function ji(n) {
      var t = n[0],
        e = n[n.length - 1];
      return e > t ? [t, e] : [e, t]
    }

    function Li(n) {
      return n.rangeExtent ? n.rangeExtent() : ji(n.range())
    }

    function Fi(n, t, e, r) {
      var i = e(n[0], n[1]),
        u = r(t[0], t[1]);
      return function (n) {
        return u(i(n))
      }
    }

    function Hi(n, t) {
      var e, r = 0,
        i = n.length - 1,
        u = n[r],
        a = n[i];
      return u > a && (e = r, r = i, i = e, e = u, u = a, a = e), (t = t(a - u)) && (n[r] = t.floor(u), n[i] = t.ceil(a)), n
    }

    function Pi(n, t, e, r) {
      var i = [],
        u = [],
        a = 0,
        o = Math.min(n.length, t.length) - 1;
      for (n[o] < n[0] && (n = n.slice().reverse(), t = t.slice().reverse()); ++a <= o;) i.push(e(n[a - 1], n[a])), u.push(r(t[a - 1], t[a]));
      return function (t) {
        var e = ua.bisect(n, t, 1, o) - 1;
        return u[e](i[e](t))
      }
    }

    function Ri(n, t, e, r) {
      function i() {
        var i = Math.min(n.length, t.length) > 2 ? Pi : Fi,
          c = r ? Hr : Fr;
        return a = i(n, t, c, e), o = i(t, n, c, mr), u
      }

      function u(n) {
        return a(n)
      }
      var a, o;
      return u.invert = function (n) {
        return o(n)
      }, u.domain = function (t) {
        return arguments.length ? (n = t.map(Number), i()) : n
      }, u.range = function (n) {
        return arguments.length ? (t = n, i()) : t
      }, u.rangeRound = function (n) {
        return u.range(n).interpolate(Lr)
      }, u.clamp = function (n) {
        return arguments.length ? (r = n, i()) : r
      }, u.interpolate = function (n) {
        return arguments.length ? (e = n, i()) : e
      }, u.ticks = function (t) {
        return Ii(n, t)
      }, u.tickFormat = function (t, e) {
        return Vi(n, t, e)
      }, u.nice = function () {
        return Hi(n, Yi), i()
      }, u.copy = function () {
        return Ri(n, t, e, r)
      }, i()
    }

    function Oi(n, t) {
      return ua.rebind(n, t, "range", "rangeRound", "interpolate", "clamp")
    }

    function Yi(n) {
      return n = Math.pow(10, Math.round(Math.log(n) / Math.LN10) - 1), n && {
        floor: function (t) {
          return Math.floor(t / n) * n
        },
        ceil: function (t) {
          return Math.ceil(t / n) * n
        }
      }
    }

    function Ui(n, t) {
      var e = ji(n),
        r = e[1] - e[0],
        i = Math.pow(10, Math.floor(Math.log(r / t) / Math.LN10)),
        u = t / r * i;
      return .15 >= u ? i *= 10 : .35 >= u ? i *= 5 : .75 >= u && (i *= 2), e[0] = Math.ceil(e[0] / i) * i, e[1] = Math.floor(e[1] / i) * i + .5 * i, e[2] = i, e
    }

    function Ii(n, t) {
      return ua.range.apply(ua, Ui(n, t))
    }

    function Vi(n, t, e) {
      var r = -Math.floor(Math.log(Ui(n, t)[2]) / Math.LN10 + .01);
      return ua.format(e ? e.replace(to, function (n, t, e, i, u, a, o, c, l, f) {
        return [t, e, i, u, a, o, c, l || "." + (r - 2 * ("%" === f)), f].join("")
      }) : ",." + r + "f")
    }

    function Xi(n, t, e, r, i) {
      function u(t) {
        return n(e(t))
      }

      function a() {
        return e === Zi ? {
          floor: o,
          ceil: c
        } : {
          floor: function (n) {
            return -c(-n)
          },
          ceil: function (n) {
            return -o(-n)
          }
        }
      }

      function o(n) {
        return Math.pow(t, Math.floor(Math.log(n) / Math.log(t)))
      }

      function c(n) {
        return Math.pow(t, Math.ceil(Math.log(n) / Math.log(t)))
      }
      return u.invert = function (t) {
        return r(n.invert(t))
      }, u.domain = function (t) {
        return arguments.length ? (t[0] < 0 ? (e = $i, r = Ji) : (e = Zi, r = Bi), n.domain((i = t.map(Number)).map(e)), u) : i
      }, u.base = function (n) {
        return arguments.length ? (t = +n, u) : t
      }, u.nice = function () {
        return n.domain(Hi(i, a).map(e)), u
      }, u.ticks = function () {
        var i = ji(n.domain()),
          u = [];
        if (i.every(isFinite)) {
          var a = Math.log(t),
            o = Math.floor(i[0] / a),
            c = Math.ceil(i[1] / a),
            l = r(i[0]),
            f = r(i[1]),
            s = t % 1 ? 2 : t;
          if (e === $i)
            for (u.push(-Math.pow(t, -o)); o++ < c;)
              for (var h = s - 1; h > 0; h--) u.push(-Math.pow(t, -o) * h);
          else {
            for (; c > o; o++)
              for (var h = 1; s > h; h++) u.push(Math.pow(t, o) * h);
            u.push(Math.pow(t, o))
          }
          for (o = 0; u[o] < l; o++);
          for (c = u.length; u[c - 1] > f; c--);
          u = u.slice(o, c)
        }
        return u
      }, u.tickFormat = function (n, i) {
        if (arguments.length < 2 && (i = Go), !arguments.length) return i;
        var a, o = Math.log(t),
          c = Math.max(.1, n / u.ticks().length),
          l = e === $i ? (a = -1e-12, Math.floor) : (a = 1e-12, Math.ceil);
        return function (n) {
          return n / r(o * l(e(n) / o + a)) <= c ? i(n) : ""
        }
      }, u.copy = function () {
        return Xi(n.copy(), t, e, r, i)
      }, Oi(u, n)
    }

    function Zi(n) {
      return Math.log(0 > n ? 0 : n)
    }

    function Bi(n) {
      return Math.exp(n)
    }

    function $i(n) {
      return -Math.log(n > 0 ? 0 : -n)
    }

    function Ji(n) {
      return -Math.exp(-n)
    }

    function Gi(n, t, e) {
      function r(t) {
        return n(i(t))
      }
      var i = Ki(t),
        u = Ki(1 / t);
      return r.invert = function (t) {
        return u(n.invert(t))
      }, r.domain = function (t) {
        return arguments.length ? (n.domain((e = t.map(Number)).map(i)), r) : e
      }, r.ticks = function (n) {
        return Ii(e, n)
      }, r.tickFormat = function (n, t) {
        return Vi(e, n, t)
      }, r.nice = function () {
        return r.domain(Hi(e, Yi))
      }, r.exponent = function (a) {
        return arguments.length ? (i = Ki(t = a), u = Ki(1 / t), n.domain(e.map(i)), r) : t
      }, r.copy = function () {
        return Gi(n.copy(), t, e)
      }, Oi(r, n)
    }

    function Ki(n) {
      return function (t) {
        return 0 > t ? -Math.pow(-t, n) : Math.pow(t, n)
      }
    }

    function Wi(n, t) {
      function e(t) {
        return a[((u.get(t) || u.set(t, n.push(t))) - 1) % a.length]
      }

      function r(t, e) {
        return ua.range(n.length).map(function (n) {
          return t + e * n
        })
      }
      var u, a, o;
      return e.domain = function (r) {
        if (!arguments.length) return n;
        n = [], u = new i;
        for (var a, o = -1, c = r.length; ++o < c;) u.has(a = r[o]) || u.set(a, n.push(a));
        return e[t.t].apply(e, t.a)
      }, e.range = function (n) {
        return arguments.length ? (a = n, o = 0, t = {
          t: "range",
          a: arguments
        }, e) : a
      }, e.rangePoints = function (i, u) {
        arguments.length < 2 && (u = 0);
        var c = i[0],
          l = i[1],
          f = (l - c) / (Math.max(1, n.length - 1) + u);
        return a = r(n.length < 2 ? (c + l) / 2 : c + f * u / 2, f), o = 0, t = {
          t: "rangePoints",
          a: arguments
        }, e
      }, e.rangeBands = function (i, u, c) {
        arguments.length < 2 && (u = 0), arguments.length < 3 && (c = u);
        var l = i[1] < i[0],
          f = i[l - 0],
          s = i[1 - l],
          h = (s - f) / (n.length - u + 2 * c);
        return a = r(f + h * c, h), l && a.reverse(), o = h * (1 - u), t = {
          t: "rangeBands",
          a: arguments
        }, e
      }, e.rangeRoundBands = function (i, u, c) {
        arguments.length < 2 && (u = 0), arguments.length < 3 && (c = u);
        var l = i[1] < i[0],
          f = i[l - 0],
          s = i[1 - l],
          h = Math.floor((s - f) / (n.length - u + 2 * c)),
          g = s - f - (n.length - u) * h;
        return a = r(f + Math.round(g / 2), h), l && a.reverse(), o = Math.round(h * (1 - u)), t = {
          t: "rangeRoundBands",
          a: arguments
        }, e
      }, e.rangeBand = function () {
        return o
      }, e.rangeExtent = function () {
        return ji(t.a[0])
      }, e.copy = function () {
        return Wi(n, t)
      }, e.domain(n)
    }

    function Qi(n, t) {
      function e() {
        var e = 0,
          u = t.length;
        for (i = []; ++e < u;) i[e - 1] = ua.quantile(n, e / u);
        return r
      }

      function r(n) {
        return isNaN(n = +n) ? 0 / 0 : t[ua.bisect(i, n)]
      }
      var i;
      return r.domain = function (t) {
        return arguments.length ? (n = t.filter(function (n) {
          return !isNaN(n)
        }).sort(ua.ascending), e()) : n
      }, r.range = function (n) {
        return arguments.length ? (t = n, e()) : t
      }, r.quantiles = function () {
        return i
      }, r.copy = function () {
        return Qi(n, t)
      }, e()
    }

    function nu(n, t, e) {
      function r(t) {
        return e[Math.max(0, Math.min(a, Math.floor(u * (t - n))))]
      }

      function i() {
        return u = e.length / (t - n), a = e.length - 1, r
      }
      var u, a;
      return r.domain = function (e) {
        return arguments.length ? (n = +e[0], t = +e[e.length - 1], i()) : [n, t]
      }, r.range = function (n) {
        return arguments.length ? (e = n, i()) : e
      }, r.copy = function () {
        return nu(n, t, e)
      }, i()
    }

    function tu(n, t) {
      function e(e) {
        return t[ua.bisect(n, e)]
      }
      return e.domain = function (t) {
        return arguments.length ? (n = t, e) : n
      }, e.range = function (n) {
        return arguments.length ? (t = n, e) : t
      }, e.copy = function () {
        return tu(n, t)
      }, e
    }

    function eu(n) {
      function t(n) {
        return +n
      }
      return t.invert = t, t.domain = t.range = function (e) {
        return arguments.length ? (n = e.map(t), t) : n
      }, t.ticks = function (t) {
        return Ii(n, t)
      }, t.tickFormat = function (t, e) {
        return Vi(n, t, e)
      }, t.copy = function () {
        return eu(n)
      }, t
    }

    function ru(n) {
      return n.innerRadius
    }

    function iu(n) {
      return n.outerRadius
    }

    function uu(n) {
      return n.startAngle
    }

    function au(n) {
      return n.endAngle
    }

    function ou(n) {
      for (var t, e, r, i = -1, u = n.length; ++i < u;) t = n[i], e = t[0], r = t[1] + tc, t[0] = e * Math.cos(r), t[1] = e * Math.sin(r);
      return n
    }

    function cu(n) {
      function t(t) {
        function c() {
          d.push("M", o(n(v), s), f, l(n(m.reverse()), s), "Z")
        }
        for (var h, g, p, d = [], m = [], v = [], y = -1, M = t.length, x = ft(e), b = ft(i), _ = e === r ? function () {
            return g
          } : ft(r), w = i === u ? function () {
            return p
          } : ft(u); ++y < M;) a.call(this, h = t[y], y) ? (m.push([g = +x.call(this, h, y), p = +b.call(this, h, y)]), v.push([+_.call(this, h, y), +w.call(this, h, y)])) : m.length && (c(), m = [], v = []);
        return m.length && c(), d.length ? d.join("") : null
      }
      var e = ze,
        r = ze,
        i = 0,
        u = De,
        a = Lt,
        o = je,
        c = o.key,
        l = o,
        f = "L",
        s = .7;
      return t.x = function (n) {
        return arguments.length ? (e = r = n, t) : r
      }, t.x0 = function (n) {
        return arguments.length ? (e = n, t) : e
      }, t.x1 = function (n) {
        return arguments.length ? (r = n, t) : r
      }, t.y = function (n) {
        return arguments.length ? (i = u = n, t) : u
      }, t.y0 = function (n) {
        return arguments.length ? (i = n, t) : i
      }, t.y1 = function (n) {
        return arguments.length ? (u = n, t) : u
      }, t.defined = function (n) {
        return arguments.length ? (a = n, t) : a
      }, t.interpolate = function (n) {
        return arguments.length ? (c = "function" == typeof n ? o = n : (o = Lo.get(n) || je).key, l = o.reverse || o, f = o.closed ? "M" : "L", t) : c
      }, t.tension = function (n) {
        return arguments.length ? (s = n, t) : s
      }, t
    }

    function lu(n) {
      return n.radius
    }

    function fu(n) {
      return [n.x, n.y]
    }

    function su(n) {
      return function () {
        var t = n.apply(this, arguments),
          e = t[0],
          r = t[1] + tc;
        return [e * Math.cos(r), e * Math.sin(r)]
      }
    }

    function hu() {
      return 64
    }

    function gu() {
      return "circle"
    }

    function pu(n) {
      var t = Math.sqrt(n / Da);
      return "M0," + t + "A" + t + "," + t + " 0 1,1 0," + -t + "A" + t + "," + t + " 0 1,1 0," + t + "Z"
    }

    function du(n, t) {
      return va(n, oc), n.id = t, n
    }

    function mu(n, t, e, r) {
      var i = n.id;
      return j(n, "function" == typeof e ? function (n, u, a) {
        n.__transition__[i].tween.set(t, r(e.call(n, n.__data__, u, a)))
      } : (e = r(e), function (n) {
        n.__transition__[i].tween.set(t, e)
      }))
    }

    function vu(n) {
      return null == n && (n = ""),
        function () {
          this.textContent = n
        }
    }

    function yu(n, t, e, r) {
      var u = n.__transition__ || (n.__transition__ = {
          active: 0,
          count: 0
        }),
        a = u[e];
      if (!a) {
        var o = r.time;
        return a = u[e] = {
          tween: new i,
          event: ua.dispatch("start", "end"),
          time: o,
          ease: r.ease,
          delay: r.delay,
          duration: r.duration
        }, ++u.count, ua.timer(function (r) {
          function i(r) {
            return u.active > e ? l() : (u.active = e, h.start.call(n, f, t), a.tween.forEach(function (e, r) {
              (r = r.call(n, f, t)) && d.push(r)
            }), c(r) || ua.timer(c, 0, o), 1)
          }

          function c(r) {
            if (u.active !== e) return l();
            for (var i = (r - g) / p, a = s(i), o = d.length; o > 0;) d[--o].call(n, a);
            return i >= 1 ? (l(), h.end.call(n, f, t), 1) : void 0
          }

          function l() {
            return --u.count ? delete u[e] : delete n.__transition__, 1
          }
          var f = n.__data__,
            s = a.ease,
            h = a.event,
            g = a.delay,
            p = a.duration,
            d = [];
          return r >= g ? i(r) : ua.timer(i, g, o), 1
        }, 0, o), a
      }
    }

    function Mu(n, t) {
      n.attr("transform", function (n) {
        return "translate(" + t(n) + ",0)"
      })
    }

    function xu(n, t) {
      n.attr("transform", function (n) {
        return "translate(0," + t(n) + ")"
      })
    }

    function bu(n, t, e) {
      if (r = [], e && t.length > 1) {
        for (var r, i, u, a = ji(n.domain()), o = -1, c = t.length, l = (t[1] - t[0]) / ++e; ++o < c;)
          for (i = e; --i > 0;)(u = +t[o] - i * l) >= a[0] && r.push(u);
        for (--o, i = 0; ++i < e && (u = +t[o] + i * l) < a[1];) r.push(u)
      }
      return r
    }

    function _u() {
      this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0])
    }

    function wu(n, t, e) {
      function r(t) {
        var e = n(t),
          r = u(e, 1);
        return r - t > t - e ? e : r
      }

      function i(e) {
        return t(e = n(new pc(e - 1)), 1), e
      }

      function u(n, e) {
        return t(n = new pc(+n), e), n
      }

      function a(n, r, u) {
        var a = i(n),
          o = [];
        if (u > 1)
          for (; r > a;) e(a) % u || o.push(new Date(+a)), t(a, 1);
        else
          for (; r > a;) o.push(new Date(+a)), t(a, 1);
        return o
      }

      function o(n, t, e) {
        try {
          pc = _u;
          var r = new _u;
          return r._ = n, a(r, t, e)
        } finally {
          pc = Date
        }
      }
      n.floor = n, n.round = r, n.ceil = i, n.offset = u, n.range = a;
      var c = n.utc = Su(n);
      return c.floor = c, c.round = Su(r), c.ceil = Su(i), c.offset = Su(u), c.range = o, n
    }

    function Su(n) {
      return function (t, e) {
        try {
          pc = _u;
          var r = new _u;
          return r._ = t, n(r, e)._
        } finally {
          pc = Date
        }
      }
    }

    function Eu(n, t, e, r) {
      for (var i, u, a = 0, o = t.length, c = e.length; o > a;) {
        if (r >= c) return -1;
        if (i = t.charCodeAt(a++), 37 === i) {
          if (u = zc[t.charAt(a++)], !u || (r = u(n, e, r)) < 0) return -1
        } else if (i != e.charCodeAt(r++)) return -1
      }
      return r
    }

    function ku(n) {
      return RegExp("^(?:" + n.map(ua.requote).join("|") + ")", "i")
    }

    function Au(n) {
      for (var t = new i, e = -1, r = n.length; ++e < r;) t.set(n[e].toLowerCase(), e);
      return t
    }

    function Nu(n, t, e) {
      n += "";
      var r = n.length;
      return e > r ? Array(e - r + 1).join(t) + n : n
    }

    function qu(n, t, e) {
      Ec.lastIndex = 0;
      var r = Ec.exec(t.substring(e));
      return r ? e += r[0].length : -1
    }

    function Tu(n, t, e) {
      Sc.lastIndex = 0;
      var r = Sc.exec(t.substring(e));
      return r ? e += r[0].length : -1
    }

    function Cu(n, t, e) {
      Nc.lastIndex = 0;
      var r = Nc.exec(t.substring(e));
      return r ? (n.m = qc.get(r[0].toLowerCase()), e += r[0].length) : -1
    }

    function zu(n, t, e) {
      kc.lastIndex = 0;
      var r = kc.exec(t.substring(e));
      return r ? (n.m = Ac.get(r[0].toLowerCase()), e += r[0].length) : -1
    }

    function Du(n, t, e) {
      return Eu(n, "" + Cc.c, t, e)
    }

    function ju(n, t, e) {
      return Eu(n, "" + Cc.x, t, e)
    }

    function Lu(n, t, e) {
      return Eu(n, "" + Cc.X, t, e)
    }

    function Fu(n, t, e) {
      Dc.lastIndex = 0;
      var r = Dc.exec(t.substring(e, e + 4));
      return r ? (n.y = +r[0], e += r[0].length) : -1
    }

    function Hu(n, t, e) {
      Dc.lastIndex = 0;
      var r = Dc.exec(t.substring(e, e + 2));
      return r ? (n.y = Pu(+r[0]), e += r[0].length) : -1
    }

    function Pu(n) {
      return n + (n > 68 ? 1900 : 2e3)
    }

    function Ru(n, t, e) {
      Dc.lastIndex = 0;
      var r = Dc.exec(t.substring(e, e + 2));
      return r ? (n.m = r[0] - 1, e += r[0].length) : -1
    }

    function Ou(n, t, e) {
      Dc.lastIndex = 0;
      var r = Dc.exec(t.substring(e, e + 2));
      return r ? (n.d = +r[0], e += r[0].length) : -1
    }

    function Yu(n, t, e) {
      Dc.lastIndex = 0;
      var r = Dc.exec(t.substring(e, e + 2));
      return r ? (n.H = +r[0], e += r[0].length) : -1
    }

    function Uu(n, t, e) {
      Dc.lastIndex = 0;
      var r = Dc.exec(t.substring(e, e + 2));
      return r ? (n.M = +r[0], e += r[0].length) : -1
    }

    function Iu(n, t, e) {
      Dc.lastIndex = 0;
      var r = Dc.exec(t.substring(e, e + 2));
      return r ? (n.S = +r[0], e += r[0].length) : -1
    }

    function Vu(n, t, e) {
      Dc.lastIndex = 0;
      var r = Dc.exec(t.substring(e, e + 3));
      return r ? (n.L = +r[0], e += r[0].length) : -1
    }

    function Xu(n, t, e) {
      var r = jc.get(t.substring(e, e += 2).toLowerCase());
      return null == r ? -1 : (n.p = r, e)
    }

    function Zu(n) {
      var t = n.getTimezoneOffset(),
        e = t > 0 ? "-" : "+",
        r = ~~(Math.abs(t) / 60),
        i = Math.abs(t) % 60;
      return e + Nu(r, "0", 2) + Nu(i, "0", 2)
    }

    function Bu(n) {
      return n.toISOString()
    }

    function $u(n, t, e) {
      function r(t) {
        return n(t)
      }
      return r.invert = function (t) {
        return Ju(n.invert(t))
      }, r.domain = function (t) {
        return arguments.length ? (n.domain(t), r) : n.domain().map(Ju)
      }, r.nice = function (n) {
        return r.domain(Hi(r.domain(), function () {
          return n
        }))
      }, r.ticks = function (e, i) {
        var u = ji(r.domain());
        if ("function" != typeof e) {
          var a = u[1] - u[0],
            o = a / e,
            c = ua.bisect(Fc, o);
          if (c == Fc.length) return t.year(u, e);
          if (!c) return n.ticks(e).map(Ju);
          Math.log(o / Fc[c - 1]) < Math.log(Fc[c] / o) && --c, e = t[c], i = e[1], e = e[0].range
        }
        return e(u[0], new Date(+u[1] + 1), i)
      }, r.tickFormat = function () {
        return e
      }, r.copy = function () {
        return $u(n.copy(), t, e)
      }, Oi(r, n)
    }

    function Ju(n) {
      return new Date(n)
    }

    function Gu(n) {
      return function (t) {
        for (var e = n.length - 1, r = n[e]; !r[1](t);) r = n[--e];
        return r[0](t)
      }
    }

    function Ku(n) {
      var t = new Date(n, 0, 1);
      return t.setFullYear(n), t
    }

    function Wu(n) {
      var t = n.getFullYear(),
        e = Ku(t),
        r = Ku(t + 1);
      return t + (n - e) / (r - e)
    }

    function Qu(n) {
      var t = new Date(Date.UTC(n, 0, 1));
      return t.setUTCFullYear(n), t
    }

    function na(n) {
      var t = n.getUTCFullYear(),
        e = Qu(t),
        r = Qu(t + 1);
      return t + (n - e) / (r - e)
    }

    function ta(n) {
      return n.responseText
    }

    function ea(n) {
      return JSON.parse(n.responseText)
    }

    function ra(n) {
      var t = aa.createRange();
      return t.selectNode(aa.body), t.createContextualFragment(n.responseText)
    }

    function ia(n) {
      return n.responseXML
    }
    var ua = {
      version: "3.1.9"
    };
    Date.now || (Date.now = function () {
      return +new Date
    });
    var aa = document,
      oa = window;
    try {
      aa.createElement("div").style.setProperty("opacity", 0, "")
    } catch (ca) {
      var la = oa.CSSStyleDeclaration.prototype,
        fa = la.setProperty;
      la.setProperty = function (n, t, e) {
        fa.call(this, n, t + "", e)
      }
    }
    ua.ascending = function (n, t) {
      return t > n ? -1 : n > t ? 1 : n >= t ? 0 : 0 / 0
    }, ua.descending = function (n, t) {
      return n > t ? -1 : t > n ? 1 : t >= n ? 0 : 0 / 0
    }, ua.min = function (n, t) {
      var e, r, i = -1,
        u = n.length;
      if (arguments.length === 1) {
        for (; ++i < u && ((e = n[i]) == null || e != e);) e = void 0;
        for (; ++i < u;)(r = n[i]) != null && e > r && (e = r)
      } else {
        for (; ++i < u && ((e = t.call(n, n[i], i)) == null || e != e);) e = void 0;
        for (; ++i < u;)(r = t.call(n, n[i], i)) != null && e > r && (e = r)
      }
      return e
    }, ua.max = function (n, t) {
      var e, r, i = -1,
        u = n.length;
      if (arguments.length === 1) {
        for (; ++i < u && ((e = n[i]) == null || e != e);) e = void 0;
        for (; ++i < u;)(r = n[i]) != null && r > e && (e = r)
      } else {
        for (; ++i < u && ((e = t.call(n, n[i], i)) == null || e != e);) e = void 0;
        for (; ++i < u;)(r = t.call(n, n[i], i)) != null && r > e && (e = r)
      }
      return e
    }, ua.extent = function (n, t) {
      var e, r, i, u = -1,
        a = n.length;
      if (arguments.length === 1) {
        for (; ++u < a && ((e = i = n[u]) == null || e != e);) e = i = void 0;
        for (; ++u < a;)(r = n[u]) != null && (e > r && (e = r), r > i && (i = r))
      } else {
        for (; ++u < a && ((e = i = t.call(n, n[u], u)) == null || e != e);) e = void 0;
        for (; ++u < a;)(r = t.call(n, n[u], u)) != null && (e > r && (e = r), r > i && (i = r))
      }
      return [e, i]
    }, ua.sum = function (n, t) {
      var e, r = 0,
        i = n.length,
        u = -1;
      if (arguments.length === 1)
        for (; ++u < i;) isNaN(e = +n[u]) || (r += e);
      else
        for (; ++u < i;) isNaN(e = +t.call(n, n[u], u)) || (r += e);
      return r
    }, ua.mean = function (t, e) {
      var r, i = t.length,
        u = 0,
        a = -1,
        o = 0;
      if (arguments.length === 1)
        for (; ++a < i;) n(r = t[a]) && (u += (r - u) / ++o);
      else
        for (; ++a < i;) n(r = e.call(t, t[a], a)) && (u += (r - u) / ++o);
      return o ? u : void 0
    }, ua.quantile = function (n, t) {
      var e = (n.length - 1) * t + 1,
        r = Math.floor(e),
        i = +n[r - 1],
        u = e - r;
      return u ? i + u * (n[r] - i) : i
    }, ua.median = function (t, e) {
      return arguments.length > 1 && (t = t.map(e)), t = t.filter(n), t.length ? ua.quantile(t.sort(ua.ascending), .5) : void 0
    }, ua.bisector = function (n) {
      return {
        left: function (t, e, r, i) {
          for (arguments.length < 3 && (r = 0), arguments.length < 4 && (i = t.length); i > r;) {
            var u = r + i >>> 1;
            n.call(t, t[u], u) < e ? r = u + 1 : i = u
          }
          return r
        },
        right: function (t, e, r, i) {
          for (arguments.length < 3 && (r = 0), arguments.length < 4 && (i = t.length); i > r;) {
            var u = r + i >>> 1;
            e < n.call(t, t[u], u) ? i = u : r = u + 1
          }
          return r
        }
      }
    };
    var sa = ua.bisector(function (n) {
      return n
    });
    ua.bisectLeft = sa.left, ua.bisect = ua.bisectRight = sa.right, ua.shuffle = function (n) {
      for (var t, e, r = n.length; r;) e = Math.random() * r-- | 0, t = n[r], n[r] = n[e], n[e] = t;
      return n
    }, ua.permute = function (n, t) {
      for (var e = [], r = -1, i = t.length; ++r < i;) e[r] = n[t[r]];
      return e
    }, ua.zip = function () {
      if (!(i = arguments.length)) return [];
      for (var n = -1, e = ua.min(arguments, t), r = Array(e); ++n < e;)
        for (var i, u = -1, a = r[n] = Array(i); ++u < i;) a[u] = arguments[u][n];
      return r
    }, ua.transpose = function (n) {
      return ua.zip.apply(ua, n)
    }, ua.keys = function (n) {
      var t = [];
      for (var e in n) t.push(e);
      return t
    }, ua.values = function (n) {
      var t = [];
      for (var e in n) t.push(n[e]);
      return t
    }, ua.entries = function (n) {
      var t = [];
      for (var e in n) t.push({
        key: e,
        value: n[e]
      });
      return t
    }, ua.merge = function (n) {
      return Array.prototype.concat.apply([], n)
    }, ua.range = function (n, t, r) {
      if (arguments.length < 3 && (r = 1, arguments.length < 2 && (t = n, n = 0)), 1 / 0 === (t - n) / r) throw Error("infinite range");
      var i, u = [],
        a = e(Math.abs(r)),
        o = -1;
      if (n *= a, t *= a, r *= a, 0 > r)
        for (;
          (i = n + r * ++o) > t;) u.push(i / a);
      else
        for (;
          (i = n + r * ++o) < t;) u.push(i / a);
      return u
    }, ua.map = function (n) {
      var t = new i;
      for (var e in n) t.set(e, n[e]);
      return t
    }, r(i, {
      has: function (n) {
        return ha + n in this
      },
      get: function (n) {
        return this[ha + n]
      },
      set: function (n, t) {
        return this[ha + n] = t
      },
      remove: function (n) {
        return n = ha + n, n in this && delete this[n]
      },
      keys: function () {
        var n = [];
        return this.forEach(function (t) {
          n.push(t)
        }), n
      },
      values: function () {
        var n = [];
        return this.forEach(function (t, e) {
          n.push(e)
        }), n
      },
      entries: function () {
        var n = [];
        return this.forEach(function (t, e) {
          n.push({
            key: t,
            value: e
          })
        }), n
      },
      forEach: function (n) {
        for (var t in this) t.charCodeAt(0) === ga && n.call(this, t.substring(1), this[t])
      }
    });
    var ha = "\0",
      ga = ha.charCodeAt(0);
    ua.nest = function () {
      function n(t, o, c) {
        if (c >= a.length) return r ? r.call(u, o) : e ? o.sort(e) : o;
        for (var l, f, s, h, g = -1, p = o.length, d = a[c++], m = new i; ++g < p;)(h = m.get(l = d(f = o[g]))) ? h.push(f) : m.set(l, [f]);
        return t ? (f = t(), s = function (e, r) {
          f.set(e, n(t, r, c))
        }) : (f = {}, s = function (e, r) {
          f[e] = n(t, r, c)
        }), m.forEach(s), f
      }

      function t(n, e) {
        if (e >= a.length) return n;
        var r = [],
          i = o[e++];
        return n.forEach(function (n, i) {
          r.push({
            key: n,
            values: t(i, e)
          })
        }), i ? r.sort(function (n, t) {
          return i(n.key, t.key)
        }) : r
      }
      var e, r, u = {},
        a = [],
        o = [];
      return u.map = function (t, e) {
        return n(e, t, 0)
      }, u.entries = function (e) {
        return t(n(ua.map, e, 0), 0)
      }, u.key = function (n) {
        return a.push(n), u
      }, u.sortKeys = function (n) {
        return o[a.length - 1] = n, u
      }, u.sortValues = function (n) {
        return e = n, u
      }, u.rollup = function (n) {
        return r = n, u
      }, u
    }, ua.set = function (n) {
      var t = new u;
      if (n)
        for (var e = 0; e < n.length; e++) t.add(n[e]);
      return t
    }, r(u, {
      has: function (n) {
        return ha + n in this
      },
      add: function (n) {
        return this[ha + n] = !0, n
      },
      remove: function (n) {
        return n = ha + n, n in this && delete this[n]
      },
      values: function () {
        var n = [];
        return this.forEach(function (t) {
          n.push(t)
        }), n
      },
      forEach: function (n) {
        for (var t in this) t.charCodeAt(0) === ga && n.call(this, t.substring(1))
      }
    }), ua.behavior = {}, ua.rebind = function (n, t) {
      for (var e, r = 1, i = arguments.length; ++r < i;) n[e = arguments[r]] = a(n, t, t[e]);
      return n
    }, ua.dispatch = function () {
      for (var n = new o, t = -1, e = arguments.length; ++t < e;) n[arguments[t]] = c(n);
      return n
    }, o.prototype.on = function (n, t) {
      var e = n.indexOf("."),
        r = "";
      if (e >= 0 && (r = n.substring(e + 1), n = n.substring(0, e)), n) return arguments.length < 2 ? this[n].on(r) : this[n].on(r, t);
      if (arguments.length === 2) {
        if (null == t)
          for (n in this) this.hasOwnProperty(n) && this[n].on(r, null);
        return this
      }
    }, ua.event = null, ua.mouse = function (n) {
      return g(n, f())
    };
    var pa = /WebKit/.test(oa.navigator.userAgent) ? -1 : 0,
      da = d;
    try {
      da(aa.documentElement.childNodes)[0].nodeType
    } catch (ma) {
      da = p
    }
    var va = [].__proto__ ? function (n, t) {
      n.__proto__ = t
    } : function (n, t) {
      for (var e in t) n[e] = t[e]
    };
    ua.touches = function (n, t) {
      return arguments.length < 2 && (t = f().touches), t ? da(t).map(function (t) {
        var e = g(n, t);
        return e.identifier = t.identifier, e
      }) : []
    }, ua.behavior.drag = function () {
      function n() {
        this.on("mousedown.drag", t).on("touchstart.drag", t)
      }

      function t() {
        function n() {
          var n = a.parentNode;
          return null != f ? ua.touches(n).filter(function (n) {
            return n.identifier === f
          })[0] : ua.mouse(n)
        }

        function t() {
          if (!a.parentNode) return i();
          var t = n(),
            e = t[0] - h[0],
            r = t[1] - h[1];
          g |= e | r, h = t, l(), o({
            type: "drag",
            x: t[0] + u[0],
            y: t[1] + u[1],
            dx: e,
            dy: r
          })
        }

        function i() {
          o({
            type: "dragend"
          }), g && (l(), ua.event.target === c && s(p, "click")), p.on(null != f ? "touchmove.drag-" + f : "mousemove.drag", null).on(null != f ? "touchend.drag-" + f : "mouseup.drag", null)
        }
        var u, a = this,
          o = e.of(a, arguments),
          c = ua.event.target,
          f = ua.event.touches ? ua.event.changedTouches[0].identifier : null,
          h = n(),
          g = 0,
          p = ua.select(oa).on(null != f ? "touchmove.drag-" + f : "mousemove.drag", t).on(null != f ? "touchend.drag-" + f : "mouseup.drag", i, !0);
        r ? (u = r.apply(a, arguments), u = [u.x - h[0], u.y - h[1]]) : u = [0, 0], null == f && l(), o({
          type: "dragstart"
        })
      }
      var e = h(n, "drag", "dragstart", "dragend"),
        r = null;
      return n.origin = function (t) {
        return arguments.length ? (r = t, n) : r
      }, ua.rebind(n, e, "on")
    };
    var ya = function (n, t) {
        return t.querySelector(n)
      },
      Ma = function (n, t) {
        return t.querySelectorAll(n)
      },
      xa = aa.documentElement,
      ba = xa.matchesSelector || xa.webkitMatchesSelector || xa.mozMatchesSelector || xa.msMatchesSelector || xa.oMatchesSelector,
      _a = function (n, t) {
        return ba.call(n, t)
      };
    "function" == typeof Sizzle && (ya = function (n, t) {
      return Sizzle(n, t)[0] || null
    }, Ma = function (n, t) {
      return Sizzle.uniqueSort(Sizzle(n, t))
    }, _a = Sizzle.matchesSelector), ua.selection = function () {
      return Na
    };
    var wa = ua.selection.prototype = [];
    wa.select = function (n) {
      var t, e, r, i, u = [];
      "function" != typeof n && (n = v(n));
      for (var a = -1, o = this.length; ++a < o;) {
        u.push(t = []), t.parentNode = (r = this[a]).parentNode;
        for (var c = -1, l = r.length; ++c < l;)(i = r[c]) ? (t.push(e = n.call(i, i.__data__, c)), e && "__data__" in i && (e.__data__ = i.__data__)) : t.push(null)
      }
      return m(u)
    }, wa.selectAll = function (n) {
      var t, e, r = [];
      "function" != typeof n && (n = y(n));
      for (var i = -1, u = this.length; ++i < u;)
        for (var a = this[i], o = -1, c = a.length; ++o < c;)(e = a[o]) && (r.push(t = da(n.call(e, e.__data__, o))), t.parentNode = e);
      return m(r)
    };
    var Sa = {
      svg: "http://www.w3.org/2000/svg",
      xhtml: "http://www.w3.org/1999/xhtml",
      xlink: "http://www.w3.org/1999/xlink",
      xml: "http://www.w3.org/XML/1998/namespace",
      xmlns: "http://www.w3.org/2000/xmlns/"
    };
    ua.ns = {
      prefix: Sa,
      qualify: function (n) {
        var t = n.indexOf(":"),
          e = n;
        return t >= 0 && (e = n.substring(0, t), n = n.substring(t + 1)), Sa.hasOwnProperty(e) ? {
          space: Sa[e],
          local: n
        } : n
      }
    }, wa.attr = function (n, t) {
      if (arguments.length < 2) {
        if ("string" == typeof n) {
          var e = this.node();
          return n = ua.ns.qualify(n), n.local ? e.getAttributeNS(n.space, n.local) : e.getAttribute(n)
        }
        for (t in n) this.each(M(t, n[t]));
        return this
      }
      return this.each(M(n, t))
    }, ua.requote = function (n) {
      return n.replace(Ea, "\\$&")
    };
    var Ea = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
    wa.classed = function (n, t) {
      if (arguments.length < 2) {
        if ("string" == typeof n) {
          var e = this.node(),
            r = (n = n.trim().split(/^|\s+/g)).length,
            i = -1;
          if (t = e.classList) {
            for (; ++i < r;)
              if (!t.contains(n[i])) return !1
          } else
            for (t = e.getAttribute("class"); ++i < r;)
              if (!_(n[i]).test(t)) return !1;
          return !0
        }
        for (t in n) this.each(w(t, n[t]));
        return this
      }
      return this.each(w(n, t))
    }, wa.style = function (n, t, e) {
      var r = arguments.length;
      if (3 > r) {
        if ("string" != typeof n) {
          2 > r && (t = "");
          for (e in n) this.each(E(e, n[e], t));
          return this
        }
        if (2 > r) return oa.getComputedStyle(this.node(), null).getPropertyValue(n);
        e = ""
      }
      return this.each(E(n, t, e))
    }, wa.property = function (n, t) {
      if (arguments.length < 2) {
        if ("string" == typeof n) return this.node()[n];
        for (t in n) this.each(k(t, n[t]));
        return this
      }
      return this.each(k(n, t))
    }, wa.text = function (n) {
      return arguments.length ? this.each("function" == typeof n ? function () {
        var t = n.apply(this, arguments);
        this.textContent = null == t ? "" : t
      } : null == n ? function () {
        this.textContent = ""
      } : function () {
        this.textContent = n
      }) : this.node().textContent
    }, wa.html = function (n) {
      return arguments.length ? this.each("function" == typeof n ? function () {
        var t = n.apply(this, arguments);
        this.innerHTML = null == t ? "" : t
      } : null == n ? function () {
        this.innerHTML = ""
      } : function () {
        this.innerHTML = n
      }) : this.node().innerHTML
    }, wa.append = function (n) {
      function t() {
        return this.appendChild(aa.createElementNS(this.namespaceURI, n))
      }

      function e() {
        return this.appendChild(aa.createElementNS(n.space, n.local))
      }
      return n = ua.ns.qualify(n), this.select(n.local ? e : t)
    }, wa.insert = function (n, t) {
      function e(e, r) {
        return this.insertBefore(aa.createElementNS(this.namespaceURI, n), t.call(this, e, r))
      }

      function r(e, r) {
        return this.insertBefore(aa.createElementNS(n.space, n.local), t.call(this, e, r))
      }
      return n = ua.ns.qualify(n), "function" != typeof t && (t = v(t)), this.select(n.local ? r : e)
    }, wa.remove = function () {
      return this.each(function () {
        var n = this.parentNode;
        n && n.removeChild(this)
      })
    }, wa.data = function (n, t) {
      function e(n, e) {
        var r, u, a, o = n.length,
          s = e.length,
          h = Math.min(o, s),
          g = Array(s),
          p = Array(s),
          d = Array(o);
        if (t) {
          var m, v = new i,
            y = new i,
            M = [];
          for (r = -1; ++r < o;) m = t.call(u = n[r], u.__data__, r), v.has(m) ? d[r] = u : v.set(m, u), M.push(m);
          for (r = -1; ++r < s;) m = t.call(e, a = e[r], r), (u = v.get(m)) ? (g[r] = u, u.__data__ = a) : y.has(m) || (p[r] = A(a)), y.set(m, a), v.remove(m);
          for (r = -1; ++r < o;) v.has(M[r]) && (d[r] = n[r])
        } else {
          for (r = -1; ++r < h;) u = n[r], a = e[r], u ? (u.__data__ = a, g[r] = u) : p[r] = A(a);
          for (; s > r; ++r) p[r] = A(e[r]);
          for (; o > r; ++r) d[r] = n[r]
        }
        p.update = g, p.parentNode = g.parentNode = d.parentNode = n.parentNode, c.push(p), l.push(g), f.push(d)
      }
      var r, u, a = -1,
        o = this.length;
      if (!arguments.length) {
        for (n = Array(o = (r = this[0]).length); ++a < o;)(u = r[a]) && (n[a] = u.__data__);
        return n
      }
      var c = L([]),
        l = m([]),
        f = m([]);
      if ("function" == typeof n)
        for (; ++a < o;) e(r = this[a], n.call(r, r.parentNode.__data__, a));
      else
        for (; ++a < o;) e(r = this[a], n);
      return l.enter = function () {
        return c
      }, l.exit = function () {
        return f
      }, l
    }, wa.datum = function (n) {
      return arguments.length ? this.property("__data__", n) : this.property("__data__")
    }, wa.filter = function (n) {
      var t, e, r, i = [];
      "function" != typeof n && (n = N(n));
      for (var u = 0, a = this.length; a > u; u++) {
        i.push(t = []), t.parentNode = (e = this[u]).parentNode;
        for (var o = 0, c = e.length; c > o; o++)(r = e[o]) && n.call(r, r.__data__, o) && t.push(r)
      }
      return m(i)
    }, wa.order = function () {
      for (var n = -1, t = this.length; ++n < t;)
        for (var e, r = this[n], i = r.length - 1, u = r[i]; --i >= 0;)(e = r[i]) && (u && u !== e.nextSibling && u.parentNode.insertBefore(e, u), u = e);
      return this
    }, wa.sort = function (n) {
      n = q.apply(this, arguments);
      for (var t = -1, e = this.length; ++t < e;) this[t].sort(n);
      return this.order()
    }, wa.on = function (n, t, e) {
      var r = arguments.length;
      if (3 > r) {
        if ("string" != typeof n) {
          2 > r && (t = !1);
          for (e in n) this.each(C(e, n[e], t));
          return this
        }
        if (2 > r) return (r = this.node()["__on" + n]) && r._;
        e = !1
      }
      return this.each(C(n, t, e))
    };
    var ka = ua.map({
      mouseenter: "mouseover",
      mouseleave: "mouseout"
    });
    ka.forEach(function (n) {
      "on" + n in aa && ka.remove(n)
    }), wa.each = function (n) {
      return j(this, function (t, e, r) {
        n.call(t, t.__data__, e, r)
      })
    }, wa.call = function (n) {
      var t = da(arguments);
      return n.apply(t[0] = this, t), this
    }, wa.empty = function () {
      return !this.node()
    }, wa.node = function () {
      for (var n = 0, t = this.length; t > n; n++)
        for (var e = this[n], r = 0, i = e.length; i > r; r++) {
          var u = e[r];
          if (u) return u
        }
      return null
    };
    var Aa = [];
    ua.selection.enter = L, ua.selection.enter.prototype = Aa, Aa.append = wa.append, Aa.insert = wa.insert, Aa.empty = wa.empty, Aa.node = wa.node, Aa.select = function (n) {
      for (var t, e, r, i, u, a = [], o = -1, c = this.length; ++o < c;) {
        r = (i = this[o]).update, a.push(t = []), t.parentNode = i.parentNode;
        for (var l = -1, f = i.length; ++l < f;)(u = i[l]) ? (t.push(r[l] = e = n.call(i.parentNode, u.__data__, l)), e.__data__ = u.__data__) : t.push(null)
      }
      return m(a)
    }, wa.transition = function () {
      var n, t, e = ic || ++cc,
        r = [],
        i = Object.create(lc);
      i.time = Date.now();
      for (var u = -1, a = this.length; ++u < a;) {
        r.push(n = []);
        for (var o = this[u], c = -1, l = o.length; ++c < l;)(t = o[c]) && yu(t, c, e, i), n.push(t)
      }
      return du(r, e)
    }, ua.select = function (n) {
      var t = ["string" == typeof n ? ya(n, aa) : n];
      return t.parentNode = xa, m([t])
    }, ua.selectAll = function (n) {
      var t = da("string" == typeof n ? Ma(n, aa) : n);
      return t.parentNode = xa, m([t])
    };
    var Na = ua.select(xa);
    ua.behavior.zoom = function () {
      function n() {
        this.on("mousedown.zoom", o).on("mousemove.zoom", f).on(Ca + ".zoom", c).on("dblclick.zoom", g).on("touchstart.zoom", p).on("touchmove.zoom", d).on("touchend.zoom", p)
      }

      function t(n) {
        return [(n[0] - w[0]) / S, (n[1] - w[1]) / S]
      }

      function e(n) {
        return [n[0] * S + w[0], n[1] * S + w[1]]
      }

      function r(n) {
        S = Math.max(E[0], Math.min(E[1], n))
      }

      function i(n, t) {
        t = e(t), w[0] += n[0] - t[0], w[1] += n[1] - t[1]
      }

      function u() {
        M && M.domain(y.range().map(function (n) {
          return (n - w[0]) / S
        }).map(y.invert)), b && b.domain(x.range().map(function (n) {
          return (n - w[1]) / S
        }).map(x.invert))
      }

      function a(n) {
        u(), ua.event.preventDefault(), n({
          type: "zoom",
          scale: S,
          translate: w
        })
      }

      function o() {
        function n() {
          c = 1, i(ua.mouse(r), h), a(u)
        }

        function e() {
          c && l(), f.on("mousemove.zoom", null).on("mouseup.zoom", null), c && ua.event.target === o && s(f, "click.zoom")
        }
        var r = this,
          u = k.of(r, arguments),
          o = ua.event.target,
          c = 0,
          f = ua.select(oa).on("mousemove.zoom", n).on("mouseup.zoom", e),
          h = t(ua.mouse(r));
        oa.focus(), l()
      }

      function c() {
        m || (m = t(ua.mouse(this))), r(Math.pow(2, qa() * .002) * S), i(ua.mouse(this), m), a(k.of(this, arguments))
      }

      function f() {
        m = null
      }

      function g() {
        var n = ua.mouse(this),
          e = t(n),
          u = Math.log(S) / Math.LN2;
        r(Math.pow(2, ua.event.shiftKey ? Math.ceil(u) - 1 : Math.floor(u) + 1)), i(n, e), a(k.of(this, arguments))
      }

      function p() {
        var n = ua.touches(this),
          e = Date.now();
        if (v = S, m = {}, n.forEach(function (n) {
            m[n.identifier] = t(n)
          }), l(), n.length === 1) {
          if (500 > e - _) {
            var u = n[0],
              o = t(n[0]);
            r(2 * S), i(u, o), a(k.of(this, arguments))
          }
          _ = e
        }
      }

      function d() {
        var n = ua.touches(this),
          t = n[0],
          e = m[t.identifier];
        if (u = n[1]) {
          var u, o = m[u.identifier];
          t = [(t[0] + u[0]) / 2, (t[1] + u[1]) / 2], e = [(e[0] + o[0]) / 2, (e[1] + o[1]) / 2], r(ua.event.scale * v)
        }
        i(t, e), _ = null, a(k.of(this, arguments))
      }
      var m, v, y, M, x, b, _, w = [0, 0],
        S = 1,
        E = Ta,
        k = h(n, "zoom");
      return n.translate = function (t) {
        return arguments.length ? (w = t.map(Number), u(), n) : w
      }, n.scale = function (t) {
        return arguments.length ? (S = +t, u(), n) : S
      }, n.scaleExtent = function (t) {
        return arguments.length ? (E = null == t ? Ta : t.map(Number), n) : E
      }, n.x = function (t) {
        return arguments.length ? (M = t, y = t.copy(), w = [0, 0], S = 1, n) : M
      }, n.y = function (t) {
        return arguments.length ? (b = t, x = t.copy(), w = [0, 0], S = 1, n) : b
      }, ua.rebind(n, k, "on")
    };
    var qa, Ta = [0, 1 / 0],
      Ca = "onwheel" in aa ? (qa = function () {
        return -ua.event.deltaY * (ua.event.deltaMode ? 120 : 1)
      }, "wheel") : "onmousewheel" in aa ? (qa = function () {
        return ua.event.wheelDelta
      }, "mousewheel") : (qa = function () {
        return -ua.event.detail
      }, "MozMousePixelScroll");
    F.prototype.toString = function () {
      return this.rgb() + ""
    }, ua.hsl = function (n, t, e) {
      return arguments.length === 1 ? n instanceof P ? H(n.h, n.s, n.l) : ut("" + n, at, H) : H(+n, +t, +e)
    };
    var za = P.prototype = new F;
    za.brighter = function (n) {
      return n = Math.pow(.7, arguments.length ? n : 1), H(this.h, this.s, this.l / n)
    }, za.darker = function (n) {
      return n = Math.pow(.7, arguments.length ? n : 1), H(this.h, this.s, n * this.l)
    }, za.rgb = function () {
      return R(this.h, this.s, this.l)
    };
    var Da = Math.PI,
      ja = 1e-6,
      La = Da / 180,
      Fa = 180 / Da;
    ua.hcl = function (n, t, e) {
      return arguments.length === 1 ? n instanceof B ? Z(n.h, n.c, n.l) : n instanceof G ? W(n.l, n.a, n.b) : W((n = ot((n = ua.rgb(n)).r, n.g, n.b)).l, n.a, n.b) : Z(+n, +t, +e)
    };
    var Ha = B.prototype = new F;
    Ha.brighter = function (n) {
      return Z(this.h, this.c, Math.min(100, this.l + Pa * (arguments.length ? n : 1)))
    }, Ha.darker = function (n) {
      return Z(this.h, this.c, Math.max(0, this.l - Pa * (arguments.length ? n : 1)))
    }, Ha.rgb = function () {
      return $(this.h, this.c, this.l).rgb()
    }, ua.lab = function (n, t, e) {
      return arguments.length === 1 ? n instanceof G ? J(n.l, n.a, n.b) : n instanceof B ? $(n.l, n.c, n.h) : ot((n = ua.rgb(n)).r, n.g, n.b) : J(+n, +t, +e)
    };
    var Pa = 18,
      Ra = .95047,
      Oa = 1,
      Ya = 1.08883,
      Ua = G.prototype = new F;
    Ua.brighter = function (n) {
      return J(Math.min(100, this.l + Pa * (arguments.length ? n : 1)), this.a, this.b)
    }, Ua.darker = function (n) {
      return J(Math.max(0, this.l - Pa * (arguments.length ? n : 1)), this.a, this.b)
    }, Ua.rgb = function () {
      return K(this.l, this.a, this.b)
    }, ua.rgb = function (n, t, e) {
      return arguments.length === 1 ? n instanceof rt ? et(n.r, n.g, n.b) : ut("" + n, et, R) : et(~~n, ~~t, ~~e)
    };
    var Ia = rt.prototype = new F;
    Ia.brighter = function (n) {
      n = Math.pow(.7, arguments.length ? n : 1);
      var t = this.r,
        e = this.g,
        r = this.b,
        i = 30;
      return t || e || r ? (t && i > t && (t = i), e && i > e && (e = i), r && i > r && (r = i), et(Math.min(255, Math.floor(t / n)), Math.min(255, Math.floor(e / n)), Math.min(255, Math.floor(r / n)))) : et(i, i, i)
    }, Ia.darker = function (n) {
      return n = Math.pow(.7, arguments.length ? n : 1), et(Math.floor(n * this.r), Math.floor(n * this.g), Math.floor(n * this.b))
    }, Ia.hsl = function () {
      return at(this.r, this.g, this.b)
    }, Ia.toString = function () {
      return "#" + it(this.r) + it(this.g) + it(this.b)
    };
    var Va = ua.map({
      aliceblue: "#f0f8ff",
      antiquewhite: "#faebd7",
      aqua: "#00ffff",
      aquamarine: "#7fffd4",
      azure: "#f0ffff",
      beige: "#f5f5dc",
      bisque: "#ffe4c4",
      black: "#000000",
      blanchedalmond: "#ffebcd",
      blue: "#0000ff",
      blueviolet: "#8a2be2",
      brown: "#a52a2a",
      burlywood: "#deb887",
      cadetblue: "#5f9ea0",
      chartreuse: "#7fff00",
      chocolate: "#d2691e",
      coral: "#ff7f50",
      cornflowerblue: "#6495ed",
      cornsilk: "#fff8dc",
      crimson: "#dc143c",
      cyan: "#00ffff",
      darkblue: "#00008b",
      darkcyan: "#008b8b",
      darkgoldenrod: "#b8860b",
      darkgray: "#a9a9a9",
      darkgreen: "#006400",
      darkgrey: "#a9a9a9",
      darkkhaki: "#bdb76b",
      darkmagenta: "#8b008b",
      darkolivegreen: "#556b2f",
      darkorange: "#ff8c00",
      darkorchid: "#9932cc",
      darkred: "#8b0000",
      darksalmon: "#e9967a",
      darkseagreen: "#8fbc8f",
      darkslateblue: "#483d8b",
      darkslategray: "#2f4f4f",
      darkslategrey: "#2f4f4f",
      darkturquoise: "#00ced1",
      darkviolet: "#9400d3",
      deeppink: "#ff1493",
      deepskyblue: "#00bfff",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1e90ff",
      firebrick: "#b22222",
      floralwhite: "#fffaf0",
      forestgreen: "#228b22",
      fuchsia: "#ff00ff",
      gainsboro: "#dcdcdc",
      ghostwhite: "#f8f8ff",
      gold: "#ffd700",
      goldenrod: "#daa520",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#adff2f",
      grey: "#808080",
      honeydew: "#f0fff0",
      hotpink: "#ff69b4",
      indianred: "#cd5c5c",
      indigo: "#4b0082",
      ivory: "#fffff0",
      khaki: "#f0e68c",
      lavender: "#e6e6fa",
      lavenderblush: "#fff0f5",
      lawngreen: "#7cfc00",
      lemonchiffon: "#fffacd",
      lightblue: "#add8e6",
      lightcoral: "#f08080",
      lightcyan: "#e0ffff",
      lightgoldenrodyellow: "#fafad2",
      lightgray: "#d3d3d3",
      lightgreen: "#90ee90",
      lightgrey: "#d3d3d3",
      lightpink: "#ffb6c1",
      lightsalmon: "#ffa07a",
      lightseagreen: "#20b2aa",
      lightskyblue: "#87cefa",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#b0c4de",
      lightyellow: "#ffffe0",
      lime: "#00ff00",
      limegreen: "#32cd32",
      linen: "#faf0e6",
      magenta: "#ff00ff",
      maroon: "#800000",
      mediumaquamarine: "#66cdaa",
      mediumblue: "#0000cd",
      mediumorchid: "#ba55d3",
      mediumpurple: "#9370db",
      mediumseagreen: "#3cb371",
      mediumslateblue: "#7b68ee",
      mediumspringgreen: "#00fa9a",
      mediumturquoise: "#48d1cc",
      mediumvioletred: "#c71585",
      midnightblue: "#191970",
      mintcream: "#f5fffa",
      mistyrose: "#ffe4e1",
      moccasin: "#ffe4b5",
      navajowhite: "#ffdead",
      navy: "#000080",
      oldlace: "#fdf5e6",
      olive: "#808000",
      olivedrab: "#6b8e23",
      orange: "#ffa500",
      orangered: "#ff4500",
      orchid: "#da70d6",
      palegoldenrod: "#eee8aa",
      palegreen: "#98fb98",
      paleturquoise: "#afeeee",
      palevioletred: "#db7093",
      papayawhip: "#ffefd5",
      peachpuff: "#ffdab9",
      peru: "#cd853f",
      pink: "#ffc0cb",
      plum: "#dda0dd",
      powderblue: "#b0e0e6",
      purple: "#800080",
      red: "#ff0000",
      rosybrown: "#bc8f8f",
      royalblue: "#4169e1",
      saddlebrown: "#8b4513",
      salmon: "#fa8072",
      sandybrown: "#f4a460",
      seagreen: "#2e8b57",
      seashell: "#fff5ee",
      sienna: "#a0522d",
      silver: "#c0c0c0",
      skyblue: "#87ceeb",
      slateblue: "#6a5acd",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#fffafa",
      springgreen: "#00ff7f",
      steelblue: "#4682b4",
      tan: "#d2b48c",
      teal: "#008080",
      thistle: "#d8bfd8",
      tomato: "#ff6347",
      turquoise: "#40e0d0",
      violet: "#ee82ee",
      wheat: "#f5deb3",
      white: "#ffffff",
      whitesmoke: "#f5f5f5",
      yellow: "#ffff00",
      yellowgreen: "#9acd32"
    });
    Va.forEach(function (n, t) {
      Va.set(n, ut(t, et, R))
    }), ua.functor = ft, ua.xhr = function (n, t, e) {
      function r() {
        var n = c.status;
        !n && c.responseText || n >= 200 && 300 > n || 304 === n ? u.load.call(i, o.call(i, c)) : u.error.call(i, c)
      }
      var i = {},
        u = ua.dispatch("progress", "load", "error"),
        a = {},
        o = st,
        c = new(oa.XDomainRequest && /^(http(s)?:)?\/\//.test(n) ? XDomainRequest : XMLHttpRequest);
      return "onload" in c ? c.onload = c.onerror = r : c.onreadystatechange = function () {
        c.readyState > 3 && r()
      }, c.onprogress = function (n) {
        var t = ua.event;
        ua.event = n;
        try {
          u.progress.call(i, c)
        } finally {
          ua.event = t
        }
      }, i.header = function (n, t) {
        return n = (n + "").toLowerCase(), arguments.length < 2 ? a[n] : (null == t ? delete a[n] : a[n] = t + "", i)
      }, i.mimeType = function (n) {
        return arguments.length ? (t = null == n ? null : n + "", i) : t
      }, i.response = function (n) {
        return o = n, i
      }, ["get", "post"].forEach(function (n) {
        i[n] = function () {
          return i.send.apply(i, [n].concat(da(arguments)))
        }
      }), i.send = function (e, r, u) {
        if (arguments.length === 2 && "function" == typeof r && (u = r, r = null), c.open(e, n, !0), null == t || "accept" in a || (a.accept = t + ",*/*"), c.setRequestHeader)
          for (var o in a) c.setRequestHeader(o, a[o]);
        return null != t && c.overrideMimeType && c.overrideMimeType(t), null != u && i.on("error", u).on("load", function (n) {
          u(null, n)
        }), c.send(null == r ? null : r), i
      }, i.abort = function () {
        return c.abort(), i
      }, ua.rebind(i, u, "on"), arguments.length === 2 && "function" == typeof t && (e = t, t = null), null == e ? i : i.get(ht(e))
    }, ua.csv = gt(",", "text/csv"), ua.tsv = gt("	", "text/tab-separated-values");
    var Xa, Za, Ba = 0,
      $a = {},
      Ja = null;
    ua.timer = function (n, t, e) {
      if (arguments.length < 3) {
        if (arguments.length < 2) t = 0;
        else if (!isFinite(t)) return;
        e = Date.now()
      }
      var r = $a[n.id];
      r && r.callback === n ? (r.then = e, r.delay = t) : $a[n.id = ++Ba] = Ja = {
        callback: n,
        then: e,
        delay: t,
        next: Ja
      }, Xa || (Za = clearTimeout(Za), Xa = 1, Ga(pt))
    }, ua.timer.flush = function () {
      for (var n, t = Date.now(), e = Ja; e;) n = t - e.then, e.delay || (e.flush = e.callback(n)), e = e.next;
      dt()
    };
    var Ga = oa.requestAnimationFrame || oa.webkitRequestAnimationFrame || oa.mozRequestAnimationFrame || oa.oRequestAnimationFrame || oa.msRequestAnimationFrame || function (n) {
        setTimeout(n, 17)
      },
      Ka = ".",
      Wa = ",",
      Qa = [3, 3],
      no = ["y", "z", "a", "f", "p", "n", "Âµ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(mt);
    ua.formatPrefix = function (n, t) {
      var e = 0;
      return n && (0 > n && (n *= -1), t && (n = ua.round(n, vt(n, t))), e = 1 + Math.floor(1e-12 + Math.log(n) / Math.LN10), e = Math.max(-24, Math.min(24, Math.floor((0 >= e ? e + 1 : e - 1) / 3) * 3))), no[8 + e / 3]
    }, ua.round = function (n, t) {
      return t ? Math.round(n * (t = Math.pow(10, t))) / t : Math.round(n)
    }, ua.format = function (n) {
      var t = to.exec(n),
        e = t[1] || " ",
        r = t[2] || ">",
        i = t[3] || "",
        u = t[4] || "",
        a = t[5],
        o = +t[6],
        c = t[7],
        l = t[8],
        f = t[9],
        s = 1,
        h = "",
        g = !1;
      switch (l && (l = +l.substring(1)), (a || "0" === e && "=" === r) && (a = e = "0", r = "=", c && (o -= Math.floor((o - 1) / 4))), f) {
        case "n":
          c = !0, f = "g";
          break;
        case "%":
          s = 100, h = "%", f = "f";
          break;
        case "p":
          s = 100, h = "%", f = "r";
          break;
        case "b":
        case "o":
        case "x":
        case "X":
          u && (u = "0" + f.toLowerCase());
        case "c":
        case "d":
          g = !0, l = 0;
          break;
        case "s":
          s = -1, f = "r"
      }
      "#" === u && (u = ""), "r" != f || l || (f = "g"), null != l && ("g" == f ? l = Math.max(1, Math.min(21, l)) : ("e" == f || "f" == f) && (l = Math.max(0, Math.min(20, l)))), f = eo.get(f) || yt;
      var p = a && c;
      return function (n) {
        if (g && n % 1) return "";
        var t = 0 > n || 0 === n && 0 > 1 / n ? (n = -n, "-") : i;
        if (0 > s) {
          var d = ua.formatPrefix(n, l);
          n = d.scale(n), h = d.symbol
        } else n *= s;
        n = f(n, l), !a && c && (n = ro(n));
        var m = u.length + n.length + (p ? 0 : t.length),
          v = o > m ? Array(m = o - m + 1).join(e) : "";
        return p && (n = ro(v + n)), Ka && n.replace(".", Ka), t += u, ("<" === r ? t + n + v : ">" === r ? v + t + n : "^" === r ? v.substring(0, m >>= 1) + t + n + v.substring(m) : t + (p ? n : v + n)) + h
      }
    };
    var to = /(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,
      eo = ua.map({
        b: function (n) {
          return n.toString(2)
        },
        c: function (n) {
          return String.fromCharCode(n)
        },
        o: function (n) {
          return n.toString(8)
        },
        x: function (n) {
          return n.toString(16)
        },
        X: function (n) {
          return n.toString(16).toUpperCase()
        },
        g: function (n, t) {
          return n.toPrecision(t)
        },
        e: function (n, t) {
          return n.toExponential(t)
        },
        f: function (n, t) {
          return n.toFixed(t)
        },
        r: function (n, t) {
          return (n = ua.round(n, vt(n, t))).toFixed(Math.max(0, Math.min(20, vt(n * (1 + 1e-15), t))))
        }
      }),
      ro = st;
    if (Qa) {
      var io = Qa.length;
      ro = function (n) {
        for (var t = n.lastIndexOf("."), e = t >= 0 ? "." + n.substring(t + 1) : (t = n.length, ""), r = [], i = 0, u = Qa[0]; t > 0 && u > 0;) r.push(n.substring(t -= u, t + u)), u = Qa[i = (i + 1) % io];
        return r.reverse().join(Wa || "") + e
      }
    }
    ua.geo = {}, ua.geo.stream = function (n, t) {
      n && uo.hasOwnProperty(n.type) ? uo[n.type](n, t) : Mt(n, t)
    };
    var uo = {
        Feature: function (n, t) {
          Mt(n.geometry, t)
        },
        FeatureCollection: function (n, t) {
          for (var e = n.features, r = -1, i = e.length; ++r < i;) Mt(e[r].geometry, t)
        }
      },
      ao = {
        Sphere: function (n, t) {
          t.sphere()
        },
        Point: function (n, t) {
          var e = n.coordinates;
          t.point(e[0], e[1])
        },
        MultiPoint: function (n, t) {
          for (var e, r = n.coordinates, i = -1, u = r.length; ++i < u;) e = r[i], t.point(e[0], e[1])
        },
        LineString: function (n, t) {
          xt(n.coordinates, t, 0)
        },
        MultiLineString: function (n, t) {
          for (var e = n.coordinates, r = -1, i = e.length; ++r < i;) xt(e[r], t, 0)
        },
        Polygon: function (n, t) {
          bt(n.coordinates, t)
        },
        MultiPolygon: function (n, t) {
          for (var e = n.coordinates, r = -1, i = e.length; ++r < i;) bt(e[r], t)
        },
        GeometryCollection: function (n, t) {
          for (var e = n.geometries, r = -1, i = e.length; ++r < i;) Mt(e[r], t)
        }
      };
    ua.geo.area = function (n) {
      return oo = 0, ua.geo.stream(n, lo), oo
    };
    var oo, co, lo = {
      sphere: function () {
        oo += 4 * Da
      },
      point: T,
      lineStart: T,
      lineEnd: T,
      polygonStart: function () {
        co = 0, lo.lineStart = _t
      },
      polygonEnd: function () {
        var n = 2 * co;
        oo += 0 > n ? 4 * Da + n : n, lo.lineStart = lo.lineEnd = lo.point = T
      }
    };
    ua.geo.bounds = function () {
      function n(n, t) {
        M.push(x = [f = n, h = n]), s > t && (s = t), t > g && (g = t)
      }

      function t(t, e) {
        var r = wt([t * La, e * La]);
        if (v) {
          var i = Et(v, r),
            u = [i[1], -i[0], 0],
            a = Et(u, i);
          Nt(a), a = qt(a);
          var c = t - p,
            l = c > 0 ? 1 : -1,
            d = a[0] * Fa * l,
            m = Math.abs(c) > 180;
          if (m ^ (d > l * p && l * t > d)) {
            var y = a[1] * Fa;
            y > g && (g = y)
          } else if (d = (d + 360) % 360 - 180, m ^ (d > l * p && l * t > d)) {
            var y = -a[1] * Fa;
            s > y && (s = y)
          } else s > e && (s = e), e > g && (g = e);
          m ? p > t ? o(f, t) > o(f, h) && (h = t) : o(t, h) > o(f, h) && (f = t) : h >= f ? (f > t && (f = t), t > h && (h = t)) : t > p ? o(f, t) > o(f, h) && (h = t) : o(t, h) > o(f, h) && (f = t)
        } else n(t, e);
        v = r, p = t
      }

      function e() {
        b.point = t
      }

      function r() {
        x[0] = f, x[1] = h, b.point = n, v = null
      }

      function i(n, e) {
        if (v) {
          var r = n - p;
          y += Math.abs(r) > 180 ? r + (r > 0 ? 360 : -360) : r
        } else d = n, m = e;
        lo.point(n, e), t(n, e)
      }

      function u() {
        lo.lineStart()
      }

      function a() {
        i(d, m), lo.lineEnd(), Math.abs(y) > ja && (f = -(h = 180)), x[0] = f, x[1] = h, v = null
      }

      function o(n, t) {
        return (t -= n) < 0 ? t + 360 : t
      }

      function c(n, t) {
        return n[0] - t[0]
      }

      function l(n, t) {
        return t[0] <= t[1] ? t[0] <= n && n <= t[1] : n < t[0] || t[1] < n
      }
      var f, s, h, g, p, d, m, v, y, M, x, b = {
        point: n,
        lineStart: e,
        lineEnd: r,
        polygonStart: function () {
          b.point = i, b.lineStart = u, b.lineEnd = a, y = 0, lo.polygonStart()
        },
        polygonEnd: function () {
          lo.polygonEnd(), b.point = n, b.lineStart = e, b.lineEnd = r, 0 > co ? (f = -(h = 180), s = -(g = 90)) : y > ja ? g = 90 : -ja > y && (s = -90), x[0] = f, x[1] = h
        }
      };
      return function (n) {
        g = h = -(f = s = 1 / 0), M = [], ua.geo.stream(n, b), M.sort(c);
        for (var t, e = 1, r = M.length, i = M[0], u = [i]; r > e; ++e) t = M[e], l(t[0], i) || l(t[1], i) ? (o(i[0], t[1]) > o(i[0], i[1]) && (i[1] = t[1]), o(t[0], i[1]) > o(i[0], i[1]) && (i[0] = t[0])) : u.push(i = t);
        for (var a, t, p = -1 / 0, r = u.length - 1, e = 0, i = u[r]; r >= e; i = t, ++e) t = u[e], (a = o(i[1], t[0])) > p && (p = a, f = t[0], h = i[1]);
        return M = x = null, [
          [f, s],
          [h, g]
        ]
      }
    }(), ua.geo.centroid = function (n) {
      fo = so = ho = go = po = 0, ua.geo.stream(n, mo);
      var t;
      return so && Math.abs(t = Math.sqrt(ho * ho + go * go + po * po)) > ja ? [Math.atan2(go, ho) * Fa, Math.asin(Math.max(-1, Math.min(1, po / t))) * Fa] : void 0
    };
    var fo, so, ho, go, po, mo = {
        sphere: function () {
          2 > fo && (fo = 2, so = ho = go = po = 0)
        },
        point: Ct,
        lineStart: Dt,
        lineEnd: jt,
        polygonStart: function () {
          2 > fo && (fo = 2, so = ho = go = po = 0), mo.lineStart = zt
        },
        polygonEnd: function () {
          mo.lineStart = Dt
        }
      },
      vo = Pt(Lt, It, Xt),
      yo = 1e9;
    ua.geo.projection = Kt, ua.geo.projectionMutator = Wt, (ua.geo.equirectangular = function () {
      return Kt(ne)
    }).raw = ne.invert = ne, ua.geo.rotation = function (n) {
      function t(t) {
        return t = n(t[0] * La, t[1] * La), t[0] *= Fa, t[1] *= Fa, t
      }
      return n = te(n[0] % 360 * La, n[1] * La, n.length > 2 ? n[2] * La : 0), t.invert = function (t) {
        return t = n.invert(t[0] * La, t[1] * La), t[0] *= Fa, t[1] *= Fa, t
      }, t
    }, ua.geo.circle = function () {
      function n() {
        var n = "function" == typeof r ? r.apply(this, arguments) : r,
          t = te(-n[0] * La, -n[1] * La, 0).invert,
          i = [];
        return e(null, null, 1, {
          point: function (n, e) {
            i.push(n = t(n, e)), n[0] *= Fa, n[1] *= Fa
          }
        }), {
          type: "Polygon",
          coordinates: [i]
        }
      }
      var t, e, r = [0, 0],
        i = 6;
      return n.origin = function (t) {
        return arguments.length ? (r = t, n) : r
      }, n.angle = function (r) {
        return arguments.length ? (e = ue((t = +r) * La, i * La), n) : t
      }, n.precision = function (r) {
        return arguments.length ? (e = ue(t * La, (i = +r) * La), n) : i
      }, n.angle(90)
    }, ua.geo.distance = function (n, t) {
      var e, r = (t[0] - n[0]) * La,
        i = n[1] * La,
        u = t[1] * La,
        a = Math.sin(r),
        o = Math.cos(r),
        c = Math.sin(i),
        l = Math.cos(i),
        f = Math.sin(u),
        s = Math.cos(u);
      return Math.atan2(Math.sqrt((e = s * a) * e + (e = l * f - c * s * o) * e), c * f + l * s * o)
    }, ua.geo.graticule = function () {
      function n() {
        return {
          type: "MultiLineString",
          coordinates: t()
        }
      }

      function t() {
        return ua.range(Math.ceil(u / m) * m, i, m).map(h).concat(ua.range(Math.ceil(l / v) * v, c, v).map(g)).concat(ua.range(Math.ceil(r / p) * p, e, p).filter(function (n) {
          return Math.abs(n % m) > ja
        }).map(f)).concat(ua.range(Math.ceil(o / d) * d, a, d).filter(function (n) {
          return Math.abs(n % v) > ja
        }).map(s))
      }
      var e, r, i, u, a, o, c, l, f, s, h, g, p = 10,
        d = p,
        m = 90,
        v = 360,
        y = 2.5;
      return n.lines = function () {
        return t().map(function (n) {
          return {
            type: "LineString",
            coordinates: n
          }
        })
      }, n.outline = function () {
        return {
          type: "Polygon",
          coordinates: [h(u).concat(g(c).slice(1), h(i).reverse().slice(1), g(l).reverse().slice(1))]
        }
      }, n.extent = function (t) {
        return arguments.length ? n.majorExtent(t).minorExtent(t) : n.minorExtent()
      }, n.majorExtent = function (t) {
        return arguments.length ? (u = +t[0][0], i = +t[1][0], l = +t[0][1], c = +t[1][1], u > i && (t = u, u = i, i = t), l > c && (t = l, l = c, c = t), n.precision(y)) : [
          [u, l],
          [i, c]
        ]
      }, n.minorExtent = function (t) {
        return arguments.length ? (r = +t[0][0], e = +t[1][0], o = +t[0][1], a = +t[1][1], r > e && (t = r, r = e, e = t), o > a && (t = o, o = a, a = t), n.precision(y)) : [
          [r, o],
          [e, a]
        ]
      }, n.step = function (t) {
        return arguments.length ? n.majorStep(t).minorStep(t) : n.minorStep()
      }, n.majorStep = function (t) {
        return arguments.length ? (m = +t[0], v = +t[1], n) : [m, v]
      }, n.minorStep = function (t) {
        return arguments.length ? (p = +t[0], d = +t[1], n) : [p, d]
      }, n.precision = function (t) {
        return arguments.length ? (y = +t, f = oe(o, a, 90), s = ce(r, e, y), h = oe(l, c, 90), g = ce(u, i, y), n) : y
      }, n.majorExtent([
        [-180, -90 + ja],
        [180, 90 - ja]
      ]).minorExtent([
        [-180, -80 - ja],
        [180, 80 + ja]
      ])
    }, ua.geo.greatArc = function () {
      function n() {
        return {
          type: "LineString",
          coordinates: [t || r.apply(this, arguments), e || i.apply(this, arguments)]
        }
      }
      var t, e, r = le,
        i = fe;
      return n.distance = function () {
        return ua.geo.distance(t || r.apply(this, arguments), e || i.apply(this, arguments))
      }, n.source = function (e) {
        return arguments.length ? (r = e, t = "function" == typeof e ? null : e, n) : r
      }, n.target = function (t) {
        return arguments.length ? (i = t, e = "function" == typeof t ? null : t, n) : i
      }, n.precision = function () {
        return arguments.length ? n : 0
      }, n
    }, ua.geo.interpolate = function (n, t) {
      return se(n[0] * La, n[1] * La, t[0] * La, t[1] * La)
    }, ua.geo.length = function (n) {
      return Mo = 0, ua.geo.stream(n, xo), Mo
    };
    var Mo, xo = {
      sphere: T,
      point: T,
      lineStart: he,
      lineEnd: T,
      polygonStart: T,
      polygonEnd: T
    };
    (ua.geo.conicEqualArea = function () {
      return ge(pe)
    }).raw = pe, ua.geo.albers = function () {
      return ua.geo.conicEqualArea().rotate([96, 0]).center([-.6, 38.7]).parallels([29.5, 45.5]).scale(1070)
    }, ua.geo.albersUsa = function () {
      function n(n) {
        var u = n[0],
          a = n[1];
        return t = null, e(u, a), t || (r(u, a), t) || i(u, a), t
      }
      var t, e, r, i, u = ua.geo.albers(),
        a = ua.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
        o = ua.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
        c = {
          point: function (n, e) {
            t = [n, e]
          }
        };
      return n.invert = function (n) {
        var t = u.scale(),
          e = u.translate(),
          r = (n[0] - e[0]) / t,
          i = (n[1] - e[1]) / t;
        return (i >= .12 && .234 > i && r >= -.425 && -.214 > r ? a : i >= .166 && .234 > i && r >= -.214 && -.115 > r ? o : u).invert(n)
      }, n.stream = function (n) {
        var t = u.stream(n),
          e = a.stream(n),
          r = o.stream(n);
        return {
          point: function (n, i) {
            t.point(n, i), e.point(n, i), r.point(n, i)
          },
          sphere: function () {
            t.sphere(), e.sphere(), r.sphere()
          },
          lineStart: function () {
            t.lineStart(), e.lineStart(), r.lineStart()
          },
          lineEnd: function () {
            t.lineEnd(), e.lineEnd(), r.lineEnd()
          },
          polygonStart: function () {
            t.polygonStart(), e.polygonStart(), r.polygonStart()
          },
          polygonEnd: function () {
            t.polygonEnd(), e.polygonEnd(), r.polygonEnd()
          }
        }
      }, n.precision = function (t) {
        return arguments.length ? (u.precision(t), a.precision(t), o.precision(t), n) : u.precision()
      }, n.scale = function (t) {
        return arguments.length ? (u.scale(t), a.scale(.35 * t), o.scale(t), n.translate(u.translate())) : u.scale()
      }, n.translate = function (t) {
        if (!arguments.length) return u.translate();
        var l = u.scale(),
          f = +t[0],
          s = +t[1];
        return e = u.translate(t).clipExtent([
          [f - .455 * l, s - .238 * l],
          [f + .455 * l, s + .238 * l]
        ]).stream(c).point, r = a.translate([f - .307 * l, s + .201 * l]).clipExtent([
          [f - .425 * l + ja, s + .12 * l + ja],
          [f - .214 * l - ja, s + .234 * l - ja]
        ]).stream(c).point, i = o.translate([f - .205 * l, s + .212 * l]).clipExtent([
          [f - .214 * l + ja, s + .166 * l + ja],
          [f - .115 * l - ja, s + .234 * l - ja]
        ]).stream(c).point, n
      }, n.scale(1070)
    };
    var bo, _o, wo, So, Eo, ko, Ao = {
        point: T,
        lineStart: T,
        lineEnd: T,
        polygonStart: function () {
          _o = 0, Ao.lineStart = de
        },
        polygonEnd: function () {
          Ao.lineStart = Ao.lineEnd = Ao.point = T, bo += Math.abs(_o / 2)
        }
      },
      No = {
        point: me,
        lineStart: T,
        lineEnd: T,
        polygonStart: T,
        polygonEnd: T
      },
      qo = {
        point: Me,
        lineStart: xe,
        lineEnd: be,
        polygonStart: function () {
          qo.lineStart = _e
        },
        polygonEnd: function () {
          qo.point = Me, qo.lineStart = xe, qo.lineEnd = be
        }
      };
    ua.geo.path = function () {
      function n(n) {
        return n && ua.geo.stream(n, r(i.pointRadius("function" == typeof u ? +u.apply(this, arguments) : u))), i.result()
      }
      var t, e, r, i, u = 4.5;
      return n.area = function (n) {
        return bo = 0, ua.geo.stream(n, r(Ao)), bo
      }, n.centroid = function (n) {
        return fo = ho = go = po = 0, ua.geo.stream(n, r(qo)), po ? [ho / po, go / po] : void 0
      }, n.bounds = function (n) {
        return Eo = ko = -(wo = So = 1 / 0), ua.geo.stream(n, r(No)), [
          [wo, So],
          [Eo, ko]
        ]
      }, n.projection = function (e) {
        return arguments.length ? (r = (t = e) ? e.stream || Se(e) : st, n) : t
      }, n.context = function (t) {
        return arguments.length ? (i = (e = t) == null ? new ve : new we(t), n) : e
      }, n.pointRadius = function (t) {
        return arguments.length ? (u = "function" == typeof t ? t : +t, n) : u
      }, n.projection(ua.geo.albersUsa()).context(null)
    };
    var To = Ee(function (n) {
      return Math.sqrt(2 / (1 + n))
    }, function (n) {
      return 2 * Math.asin(n / 2)
    });
    (ua.geo.azimuthalEqualArea = function () {
      return Kt(To)
    }).raw = To;
    var Co = Ee(function (n) {
      var t = Math.acos(n);
      return t && t / Math.sin(t)
    }, st);
    (ua.geo.azimuthalEquidistant = function () {
      return Kt(Co)
    }).raw = Co, (ua.geo.conicConformal = function () {
      return ge(ke)
    }).raw = ke, (ua.geo.conicEquidistant = function () {
      return ge(Ae)
    }).raw = Ae;
    var zo = Ee(function (n) {
      return 1 / n
    }, Math.atan);
    (ua.geo.gnomonic = function () {
      return Kt(zo)
    }).raw = zo, Ne.invert = function (n, t) {
      return [n, 2 * Math.atan(Math.exp(t)) - Da / 2]
    }, (ua.geo.mercator = function () {
      return qe(Ne)
    }).raw = Ne;
    var Do = Ee(function () {
      return 1
    }, Math.asin);
    (ua.geo.orthographic = function () {
      return Kt(Do)
    }).raw = Do;
    var jo = Ee(function (n) {
      return 1 / (1 + n)
    }, function (n) {
      return 2 * Math.atan(n)
    });
    (ua.geo.stereographic = function () {
      return Kt(jo)
    }).raw = jo, Te.invert = function (n, t) {
      return [Math.atan2(I(n), Math.cos(t)), U(Math.sin(t) / V(n))]
    }, (ua.geo.transverseMercator = function () {
      return qe(Te)
    }).raw = Te, ua.geom = {}, ua.svg = {}, ua.svg.line = function () {
      return Ce(st)
    };
    var Lo = ua.map({
      linear: je,
      "linear-closed": Le,
      "step-before": Fe,
      "step-after": He,
      basis: Ie,
      "basis-open": Ve,
      "basis-closed": Xe,
      bundle: Ze,
      cardinal: Oe,
      "cardinal-open": Pe,
      "cardinal-closed": Re,
      monotone: We
    });
    Lo.forEach(function (n, t) {
      t.key = n, t.closed = /-closed$/.test(n)
    });
    var Fo = [0, 2 / 3, 1 / 3, 0],
      Ho = [0, 1 / 3, 2 / 3, 0],
      Po = [0, 1 / 6, 2 / 3, 1 / 6];
    ua.geom.hull = function (n) {
      function t(n) {
        if (n.length < 3) return [];
        var t, i, u, a, o, c, l, f, s, h, g, p, d = ft(e),
          m = ft(r),
          v = n.length,
          y = v - 1,
          M = [],
          x = [],
          b = 0;
        if (d === ze && r === De) t = n;
        else
          for (u = 0, t = []; v > u; ++u) t.push([+d.call(this, i = n[u], u), +m.call(this, i, u)]);
        for (u = 1; v > u; ++u)(t[u][1] < t[b][1] || t[u][1] == t[b][1] && t[u][0] < t[b][0]) && (b = u);
        for (u = 0; v > u; ++u) u !== b && (c = t[u][1] - t[b][1], o = t[u][0] - t[b][0], M.push({
          angle: Math.atan2(c, o),
          index: u
        }));
        for (M.sort(function (n, t) {
            return n.angle - t.angle
          }), g = M[0].angle, h = M[0].index, s = 0, u = 1; y > u; ++u) {
          if (a = M[u].index, g == M[u].angle) {
            if (o = t[h][0] - t[b][0], c = t[h][1] - t[b][1], l = t[a][0] - t[b][0], f = t[a][1] - t[b][1], o * o + c * c >= l * l + f * f) {
              M[u].index = -1;
              continue
            }
            M[s].index = -1
          }
          g = M[u].angle, s = u, h = a
        }
        for (x.push(b), u = 0, a = 0; 2 > u; ++a) M[a].index > -1 && (x.push(M[a].index), u++);
        for (p = x.length; y > a; ++a)
          if (!(M[a].index < 0)) {
            for (; !Qe(x[p - 2], x[p - 1], M[a].index, t);) --p;
            x[p++] = M[a].index
          } var _ = [];
        for (u = p - 1; u >= 0; --u) _.push(n[x[u]]);
        return _
      }
      var e = ze,
        r = De;
      return arguments.length ? t(n) : (t.x = function (n) {
        return arguments.length ? (e = n, t) : e
      }, t.y = function (n) {
        return arguments.length ? (r = n, t) : r
      }, t)
    }, ua.geom.polygon = function (n) {
      return n.area = function () {
        for (var t = 0, e = n.length, r = n[e - 1][1] * n[0][0] - n[e - 1][0] * n[0][1]; ++t < e;) r += n[t - 1][1] * n[t][0] - n[t - 1][0] * n[t][1];
        return .5 * r
      }, n.centroid = function (t) {
        var e, r, i = -1,
          u = n.length,
          a = 0,
          o = 0,
          c = n[u - 1];
        for (arguments.length || (t = -1 / (6 * n.area())); ++i < u;) e = c, c = n[i], r = e[0] * c[1] - c[0] * e[1], a += (e[0] + c[0]) * r, o += (e[1] + c[1]) * r;
        return [a * t, o * t]
      }, n.clip = function (t) {
        for (var e, r, i, u, a, o, c = -1, l = n.length, f = n[l - 1]; ++c < l;) {
          for (e = t.slice(), t.length = 0, u = n[c], a = e[(i = e.length) - 1], r = -1; ++r < i;) o = e[r], nr(o, f, u) ? (nr(a, f, u) || t.push(tr(a, o, f, u)), t.push(o)) : nr(a, f, u) && t.push(tr(a, o, f, u)), a = o;
          f = u
        }
        return t
      }, n
    }, ua.geom.delaunay = function (n) {
      var t = n.map(function () {
          return []
        }),
        e = [];
      return er(n, function (e) {
        t[e.region.l.index].push(n[e.region.r.index])
      }), t.forEach(function (t, r) {
        var i = n[r],
          u = i[0],
          a = i[1];
        t.forEach(function (n) {
          n.angle = Math.atan2(n[0] - u, n[1] - a)
        }), t.sort(function (n, t) {
          return n.angle - t.angle
        });
        for (var o = 0, c = t.length - 1; c > o; o++) e.push([i, t[o], t[o + 1]])
      }), e
    }, ua.geom.voronoi = function (n) {
      function t(n) {
        var t, r, a, o = n.map(function () {
            return []
          }),
          c = ft(i),
          l = ft(u),
          f = n.length,
          s = 1e6;
        if (c === ze && l === De) t = n;
        else
          for (t = [], a = 0; f > a; ++a) t.push([+c.call(this, r = n[a], a), +l.call(this, r, a)]);
        if (er(t, function (n) {
            var t, e, r, i, u, a;
            n.a === 1 && n.b >= 0 ? (t = n.ep.r, e = n.ep.l) : (t = n.ep.l, e = n.ep.r), n.a === 1 ? (u = t ? t.y : -s, r = n.c - n.b * u, a = e ? e.y : s, i = n.c - n.b * a) : (r = t ? t.x : -s, u = n.c - n.a * r, i = e ? e.x : s, a = n.c - n.a * i);
            var c = [r, u],
              l = [i, a];
            o[n.region.l.index].push(c, l), o[n.region.r.index].push(c, l)
          }), o = o.map(function (n, e) {
            var r = t[e][0],
              i = t[e][1],
              u = n.map(function (n) {
                return Math.atan2(n[0] - r, n[1] - i)
              }),
              a = ua.range(n.length).sort(function (n, t) {
                return u[n] - u[t]
              });
            return a.filter(function (n, t) {
              return !t || u[n] - u[a[t - 1]] > ja
            }).map(function (t) {
              return n[t]
            })
          }), o.forEach(function (n, e) {
            var r = n.length;
            if (!r) return n.push([-s, -s], [-s, s], [s, s], [s, -s]);
            if (!(r > 2)) {
              var i = t[e],
                u = n[0],
                a = n[1],
                o = i[0],
                c = i[1],
                l = u[0],
                f = u[1],
                h = a[0],
                g = a[1],
                p = Math.abs(h - l),
                d = g - f;
              if (Math.abs(d) < ja) {
                var m = f > c ? -s : s;
                n.push([-s, m], [s, m])
              } else if (ja > p) {
                var v = l > o ? -s : s;
                n.push([v, -s], [v, s])
              } else {
                var m = (l - o) * (g - f) > (h - l) * (f - c) ? s : -s,
                  y = Math.abs(d) - p;
                Math.abs(y) < ja ? n.push([0 > d ? m : -m, m]) : (y > 0 && (m *= -1), n.push([-s, m], [s, m]))
              }
            }
          }), e)
          for (a = 0; f > a; ++a) e(o[a]);
        for (a = 0; f > a; ++a) o[a].point = n[a];
        return o
      }
      var e, r = null,
        i = ze,
        u = De;
      return arguments.length ? t(n) : (t.x = function (n) {
        return arguments.length ? (i = n, t) : i
      }, t.y = function (n) {
        return arguments.length ? (u = n, t) : u
      }, t.size = function (n) {
        return arguments.length ? (null == n ? e = null : (r = [+n[0], +n[1]], e = ua.geom.polygon([
          [0, 0],
          [0, r[1]], r, [r[0], 0]
        ]).clip), t) : r
      }, t.links = function (n) {
        var t, e, r, a = n.map(function () {
            return []
          }),
          o = [],
          c = ft(i),
          l = ft(u),
          f = n.length;
        if (c === ze && l === De) t = n;
        else
          for (r = 0; f > r; ++r) t.push([+c.call(this, e = n[r], r), +l.call(this, e, r)]);
        return er(t, function (t) {
          var e = t.region.l.index,
            r = t.region.r.index;
          a[e][r] || (a[e][r] = a[r][e] = !0, o.push({
            source: n[e],
            target: n[r]
          }))
        }), o
      }, t.triangles = function (n) {
        if (i === ze && u === De) return ua.geom.delaunay(n);
        var t, e, r, a, o, c = ft(i),
          l = ft(u);
        for (a = 0, t = [], o = n.length; o > a; ++a) e = [+c.call(this, r = n[a], a), +l.call(this, r, a)], e.data = r, t.push(e);
        return ua.geom.delaunay(t).map(function (n) {
          return n.map(function (n) {
            return n.data
          })
        })
      }, t)
    };
    var Ro = {
      l: "r",
      r: "l"
    };
    ua.geom.quadtree = function (n, t, e, r, i) {
      function u(n) {
        function u(n, t, e, r, i, u, a, o) {
          if (!isNaN(e) && !isNaN(r))
            if (n.leaf) {
              var c = n.x,
                f = n.y;
              if (null != c)
                if (Math.abs(c - e) + Math.abs(f - r) < .01) l(n, t, e, r, i, u, a, o);
                else {
                  var s = n.point;
                  n.x = n.y = n.point = null, l(n, s, c, f, i, u, a, o), l(n, t, e, r, i, u, a, o)
                }
              else n.x = e, n.y = r, n.point = t
            } else l(n, t, e, r, i, u, a, o)
        }

        function l(n, t, e, r, i, a, o, c) {
          var l = .5 * (i + o),
            f = .5 * (a + c),
            s = e >= l,
            h = r >= f,
            g = (h << 1) + s;
          n.leaf = !1, n = n.nodes[g] || (n.nodes[g] = ur()), s ? i = l : o = l, h ? a = f : c = f, u(n, t, e, r, i, a, o, c)
        }
        var f, s, h, g, p, d, m, v, y, M = ft(o),
          x = ft(c);
        if (null != t) d = t, m = e, v = r, y = i;
        else if (v = y = -(d = m = 1 / 0), s = [], h = [], p = n.length, a)
          for (g = 0; p > g; ++g) f = n[g], f.x < d && (d = f.x), f.y < m && (m = f.y), f.x > v && (v = f.x), f.y > y && (y = f.y), s.push(f.x), h.push(f.y);
        else
          for (g = 0; p > g; ++g) {
            var b = +M(f = n[g], g),
              _ = +x(f, g);
            d > b && (d = b), m > _ && (m = _), b > v && (v = b), _ > y && (y = _), s.push(b), h.push(_)
          }
        var w = v - d,
          S = y - m;
        w > S ? y = m + w : v = d + S;
        var E = ur();
        if (E.add = function (n) {
            u(E, n, +M(n, ++g), +x(n, g), d, m, v, y)
          }, E.visit = function (n) {
            ar(n, E, d, m, v, y)
          }, g = -1, null == t) {
          for (; ++g < p;) u(E, n[g], s[g], h[g], d, m, v, y);
          --g
        } else n.forEach(E.add);
        return s = h = n = f = null, E
      }
      var a, o = ze,
        c = De;
      return (a = arguments.length) ? (o = rr, c = ir, 3 === a && (i = e, r = t, e = t = 0), u(n)) : (u.x = function (n) {
        return arguments.length ? (o = n, u) : o
      }, u.y = function (n) {
        return arguments.length ? (c = n, u) : c
      }, u.size = function (n) {
        return arguments.length ? (null == n ? t = e = r = i = null : (t = e = 0, r = +n[0], i = +n[1]), u) : null == t ? null : [r, i]
      }, u)
    }, ua.interpolateRgb = or, ua.transform = function (n) {
      var t = aa.createElementNS(ua.ns.prefix.svg, "g");
      return (ua.transform = function (n) {
        if (null != n) {
          t.setAttribute("transform", n);
          var e = t.transform.baseVal.consolidate()
        }
        return new cr(e ? e.matrix : Oo)
      })(n)
    }, cr.prototype.toString = function () {
      return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"
    };
    var Oo = {
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      e: 0,
      f: 0
    };
    ua.interpolateNumber = hr, ua.interpolateTransform = gr, ua.interpolateObject = pr, ua.interpolateString = dr;
    var Yo = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
    ua.interpolate = mr, ua.interpolators = [function (n, t) {
      var e = typeof t;
      return ("string" === e ? Va.has(t) || /^(#|rgb\(|hsl\()/.test(t) ? or : dr : t instanceof F ? or : "object" === e ? Array.isArray(t) ? yr : pr : hr)(n, t)
    }], ua.interpolateArray = yr;
    var Uo = function () {
        return st
      },
      Io = ua.map({
        linear: Uo,
        poly: Er,
        quad: function () {
          return _r
        },
        cubic: function () {
          return wr
        },
        sin: function () {
          return kr
        },
        exp: function () {
          return Ar
        },
        circle: function () {
          return Nr
        },
        elastic: qr,
        back: Tr,
        bounce: function () {
          return Cr
        }
      }),
      Vo = ua.map({
        "in": st,
        out: xr,
        "in-out": br,
        "out-in": function (n) {
          return br(xr(n))
        }
      });
    ua.ease = function (n) {
      var t = n.indexOf("-"),
        e = t >= 0 ? n.substring(0, t) : n,
        r = t >= 0 ? n.substring(t + 1) : "in";
      return e = Io.get(e) || Uo, r = Vo.get(r) || st, Mr(r(e.apply(null, Array.prototype.slice.call(arguments, 1))))
    }, ua.interpolateHcl = zr, ua.interpolateHsl = Dr, ua.interpolateLab = jr, ua.interpolateRound = Lr, ua.layout = {}, ua.layout.bundle = function () {
      return function (n) {
        for (var t = [], e = -1, r = n.length; ++e < r;) t.push(Pr(n[e]));
        return t
      }
    }, ua.layout.chord = function () {
      function n() {
        var n, l, s, h, g, p = {},
          d = [],
          m = ua.range(u),
          v = [];
        for (e = [], r = [], n = 0, h = -1; ++h < u;) {
          for (l = 0, g = -1; ++g < u;) l += i[h][g];
          d.push(l), v.push(ua.range(u)), n += l
        }
        for (a && m.sort(function (n, t) {
            return a(d[n], d[t])
          }), o && v.forEach(function (n, t) {
            n.sort(function (n, e) {
              return o(i[t][n], i[t][e])
            })
          }), n = (2 * Da - f * u) / n, l = 0, h = -1; ++h < u;) {
          for (s = l, g = -1; ++g < u;) {
            var y = m[h],
              M = v[y][g],
              x = i[y][M],
              b = l,
              _ = l += x * n;
            p[y + "-" + M] = {
              index: y,
              subindex: M,
              startAngle: b,
              endAngle: _,
              value: x
            }
          }
          r[y] = {
            index: y,
            startAngle: s,
            endAngle: l,
            value: (l - s) / n
          }, l += f
        }
        for (h = -1; ++h < u;)
          for (g = h - 1; ++g < u;) {
            var w = p[h + "-" + g],
              S = p[g + "-" + h];
            (w.value || S.value) && e.push(w.value < S.value ? {
              source: S,
              target: w
            } : {
              source: w,
              target: S
            })
          }
        c && t()
      }

      function t() {
        e.sort(function (n, t) {
          return c((n.source.value + n.target.value) / 2, (t.source.value + t.target.value) / 2)
        })
      }
      var e, r, i, u, a, o, c, l = {},
        f = 0;
      return l.matrix = function (n) {
        return arguments.length ? (u = (i = n) && i.length, e = r = null, l) : i
      }, l.padding = function (n) {
        return arguments.length ? (f = n, e = r = null, l) : f
      }, l.sortGroups = function (n) {
        return arguments.length ? (a = n, e = r = null, l) : a
      }, l.sortSubgroups = function (n) {
        return arguments.length ? (o = n, e = null, l) : o
      }, l.sortChords = function (n) {
        return arguments.length ? (c = n, e && t(), l) : c
      }, l.chords = function () {
        return e || n(), e
      }, l.groups = function () {
        return r || n(), r
      }, l
    }, ua.layout.force = function () {
      function n(n) {
        return function (t, e, r, i) {
          if (t.point !== n) {
            var u = t.cx - n.x,
              a = t.cy - n.y,
              o = 1 / Math.sqrt(u * u + a * a);
            if (d > (i - e) * o) {
              var c = t.charge * o * o;
              return n.px -= u * c, n.py -= a * c, !0
            }
            if (t.point && isFinite(o)) {
              var c = t.pointCharge * o * o;
              n.px -= u * c, n.py -= a * c
            }
          }
          return !t.charge
        }
      }

      function t(n) {
        n.px = ua.event.x, n.py = ua.event.y, o.resume()
      }
      var e, r, i, u, a, o = {},
        c = ua.dispatch("start", "tick", "end"),
        l = [1, 1],
        f = .9,
        s = Xo,
        h = Zo,
        g = -30,
        p = .1,
        d = .8,
        m = [],
        v = [];
      return o.tick = function () {
        if ((r *= .99) < .005) return c.end({
          type: "end",
          alpha: r = 0
        }), !0;
        var t, e, o, s, h, d, y, M, x, b = m.length,
          _ = v.length;
        for (e = 0; _ > e; ++e) o = v[e], s = o.source, h = o.target, M = h.x - s.x, x = h.y - s.y, (d = M * M + x * x) && (d = r * u[e] * ((d = Math.sqrt(d)) - i[e]) / d, M *= d, x *= d, h.x -= M * (y = s.weight / (h.weight + s.weight)), h.y -= x * y, s.x += M * (y = 1 - y), s.y += x * y);
        if ((y = r * p) && (M = l[0] / 2, x = l[1] / 2, e = -1, y))
          for (; ++e < b;) o = m[e], o.x += (M - o.x) * y, o.y += (x - o.y) * y;
        if (g)
          for (Xr(t = ua.geom.quadtree(m), r, a), e = -1; ++e < b;)(o = m[e]).fixed || t.visit(n(o));
        for (e = -1; ++e < b;) o = m[e], o.fixed ? (o.x = o.px, o.y = o.py) : (o.x -= (o.px - (o.px = o.x)) * f, o.y -= (o.py - (o.py = o.y)) * f);
        c.tick({
          type: "tick",
          alpha: r
        })
      }, o.nodes = function (n) {
        return arguments.length ? (m = n, o) : m
      }, o.links = function (n) {
        return arguments.length ? (v = n, o) : v
      }, o.size = function (n) {
        return arguments.length ? (l = n, o) : l
      }, o.linkDistance = function (n) {
        return arguments.length ? (s = "function" == typeof n ? n : +n, o) : s
      }, o.distance = o.linkDistance, o.linkStrength = function (n) {
        return arguments.length ? (h = "function" == typeof n ? n : +n, o) : h
      }, o.friction = function (n) {
        return arguments.length ? (f = +n, o) : f
      }, o.charge = function (n) {
        return arguments.length ? (g = "function" == typeof n ? n : +n, o) : g
      }, o.gravity = function (n) {
        return arguments.length ? (p = +n, o) : p
      }, o.theta = function (n) {
        return arguments.length ? (d = +n, o) : d
      }, o.alpha = function (n) {
        return arguments.length ? (n = +n, r ? r = n > 0 ? n : 0 : n > 0 && (c.start({
          type: "start",
          alpha: r = n
        }), ua.timer(o.tick)), o) : r
      }, o.start = function () {
        function n(n, r) {
          for (var i, u = t(e), a = -1, o = u.length; ++a < o;)
            if (!isNaN(i = u[a][n])) return i;
          return Math.random() * r
        }

        function t() {
          if (!c) {
            for (c = [], r = 0; p > r; ++r) c[r] = [];
            for (r = 0; d > r; ++r) {
              var n = v[r];
              c[n.source.index].push(n.target), c[n.target.index].push(n.source)
            }
          }
          return c[e]
        }
        var e, r, c, f, p = m.length,
          d = v.length,
          y = l[0],
          M = l[1];
        for (e = 0; p > e; ++e)(f = m[e]).index = e, f.weight = 0;
        for (e = 0; d > e; ++e) f = v[e], typeof f.source == "number" && (f.source = m[f.source]), typeof f.target == "number" && (f.target = m[f.target]), ++f.source.weight, ++f.target.weight;
        for (e = 0; p > e; ++e) f = m[e], isNaN(f.x) && (f.x = n("x", y)), isNaN(f.y) && (f.y = n("y", M)), isNaN(f.px) && (f.px = f.x), isNaN(f.py) && (f.py = f.y);
        if (i = [], "function" == typeof s)
          for (e = 0; d > e; ++e) i[e] = +s.call(this, v[e], e);
        else
          for (e = 0; d > e; ++e) i[e] = s;
        if (u = [], "function" == typeof h)
          for (e = 0; d > e; ++e) u[e] = +h.call(this, v[e], e);
        else
          for (e = 0; d > e; ++e) u[e] = h;
        if (a = [], "function" == typeof g)
          for (e = 0; p > e; ++e) a[e] = +g.call(this, m[e], e);
        else
          for (e = 0; p > e; ++e) a[e] = g;
        return o.resume()
      }, o.resume = function () {
        return o.alpha(.1)
      }, o.stop = function () {
        return o.alpha(0)
      }, o.drag = function () {
        return e || (e = ua.behavior.drag().origin(st).on("dragstart.force", Yr).on("drag.force", t).on("dragend.force", Ur)), arguments.length ? (this.on("mouseover.force", Ir).on("mouseout.force", Vr).call(e), void 0) : e
      }, ua.rebind(o, c, "on")
    };
    var Xo = 20,
      Zo = 1;
    ua.layout.hierarchy = function () {
      function n(t, a, o) {
        var c = i.call(e, t, a);
        if (t.depth = a, o.push(t), c && (l = c.length)) {
          for (var l, f, s = -1, h = t.children = [], g = 0, p = a + 1; ++s < l;) f = n(c[s], p, o), f.parent = t, h.push(f), g += f.value;
          r && h.sort(r), u && (t.value = g)
        } else u && (t.value = +u.call(e, t, a) || 0);
        return t
      }

      function t(n, r) {
        var i = n.children,
          a = 0;
        if (i && (o = i.length))
          for (var o, c = -1, l = r + 1; ++c < o;) a += t(i[c], l);
        else u && (a = +u.call(e, n, r) || 0);
        return u && (n.value = a), a
      }

      function e(t) {
        var e = [];
        return n(t, 0, e), e
      }
      var r = Jr,
        i = Br,
        u = $r;
      return e.sort = function (n) {
        return arguments.length ? (r = n, e) : r
      }, e.children = function (n) {
        return arguments.length ? (i = n, e) : i
      }, e.value = function (n) {
        return arguments.length ? (u = n, e) : u
      }, e.revalue = function (n) {
        return t(n, 0), n
      }, e
    }, ua.layout.partition = function () {
      function n(t, e, r, i) {
        var u = t.children;
        if (t.x = e, t.y = t.depth * i, t.dx = r, t.dy = i, u && (a = u.length)) {
          var a, o, c, l = -1;
          for (r = t.value ? r / t.value : 0; ++l < a;) n(o = u[l], e, c = o.value * r, i), e += c
        }
      }

      function t(n) {
        var e = n.children,
          r = 0;
        if (e && (i = e.length))
          for (var i, u = -1; ++u < i;) r = Math.max(r, t(e[u]));
        return 1 + r
      }

      function e(e, u) {
        var a = r.call(this, e, u);
        return n(a[0], 0, i[0], i[1] / t(a[0])), a
      }
      var r = ua.layout.hierarchy(),
        i = [1, 1];
      return e.size = function (n) {
        return arguments.length ? (i = n, e) : i
      }, Zr(e, r)
    }, ua.layout.pie = function () {
      function n(u) {
        var a = u.map(function (e, r) {
            return +t.call(n, e, r)
          }),
          o = +("function" == typeof r ? r.apply(this, arguments) : r),
          c = (("function" == typeof i ? i.apply(this, arguments) : i) - o) / ua.sum(a),
          l = ua.range(u.length);
        null != e && l.sort(e === Bo ? function (n, t) {
          return a[t] - a[n]
        } : function (n, t) {
          return e(u[n], u[t])
        });
        var f = [];
        return l.forEach(function (n) {
          var t;
          f[n] = {
            data: u[n],
            value: t = a[n],
            startAngle: o,
            endAngle: o += t * c
          }
        }), f
      }
      var t = Number,
        e = Bo,
        r = 0,
        i = 2 * Da;
      return n.value = function (e) {
        return arguments.length ? (t = e, n) : t
      }, n.sort = function (t) {
        return arguments.length ? (e = t, n) : e
      }, n.startAngle = function (t) {
        return arguments.length ? (r = t, n) : r
      }, n.endAngle = function (t) {
        return arguments.length ? (i = t, n) : i
      }, n
    };
    var Bo = {};
    ua.layout.stack = function () {
      function n(o, c) {
        var l = o.map(function (e, r) {
            return t.call(n, e, r)
          }),
          f = l.map(function (t) {
            return t.map(function (t, e) {
              return [u.call(n, t, e), a.call(n, t, e)]
            })
          }),
          s = e.call(n, f, c);
        l = ua.permute(l, s), f = ua.permute(f, s);
        var h, g, p, d = r.call(n, f, c),
          m = l.length,
          v = l[0].length;
        for (g = 0; v > g; ++g)
          for (i.call(n, l[0][g], p = d[g], f[0][g][1]), h = 1; m > h; ++h) i.call(n, l[h][g], p += f[h - 1][g][1], f[h][g][1]);
        return o
      }
      var t = st,
        e = ni,
        r = ti,
        i = Qr,
        u = Kr,
        a = Wr;
      return n.values = function (e) {
        return arguments.length ? (t = e, n) : t
      }, n.order = function (t) {
        return arguments.length ? (e = "function" == typeof t ? t : $o.get(t) || ni, n) : e
      }, n.offset = function (t) {
        return arguments.length ? (r = "function" == typeof t ? t : Jo.get(t) || ti, n) : r
      }, n.x = function (t) {
        return arguments.length ? (u = t, n) : u
      }, n.y = function (t) {
        return arguments.length ? (a = t, n) : a
      }, n.out = function (t) {
        return arguments.length ? (i = t, n) : i
      }, n
    };
    var $o = ua.map({
        "inside-out": function (n) {
          var t, e, r = n.length,
            i = n.map(ei),
            u = n.map(ri),
            a = ua.range(r).sort(function (n, t) {
              return i[n] - i[t]
            }),
            o = 0,
            c = 0,
            l = [],
            f = [];
          for (t = 0; r > t; ++t) e = a[t], c > o ? (o += u[e], l.push(e)) : (c += u[e], f.push(e));
          return f.reverse().concat(l)
        },
        reverse: function (n) {
          return ua.range(n.length).reverse()
        },
        "default": ni
      }),
      Jo = ua.map({
        silhouette: function (n) {
          var t, e, r, i = n.length,
            u = n[0].length,
            a = [],
            o = 0,
            c = [];
          for (e = 0; u > e; ++e) {
            for (t = 0, r = 0; i > t; t++) r += n[t][e][1];
            r > o && (o = r), a.push(r)
          }
          for (e = 0; u > e; ++e) c[e] = (o - a[e]) / 2;
          return c
        },
        wiggle: function (n) {
          var t, e, r, i, u, a, o, c, l, f = n.length,
            s = n[0],
            h = s.length,
            g = [];
          for (g[0] = c = l = 0, e = 1; h > e; ++e) {
            for (t = 0, i = 0; f > t; ++t) i += n[t][e][1];
            for (t = 0, u = 0, o = s[e][0] - s[e - 1][0]; f > t; ++t) {
              for (r = 0, a = (n[t][e][1] - n[t][e - 1][1]) / (2 * o); t > r; ++r) a += (n[r][e][1] - n[r][e - 1][1]) / o;
              u += a * n[t][e][1]
            }
            g[e] = c -= i ? u / i * o : 0, l > c && (l = c)
          }
          for (e = 0; h > e; ++e) g[e] -= l;
          return g
        },
        expand: function (n) {
          var t, e, r, i = n.length,
            u = n[0].length,
            a = 1 / i,
            o = [];
          for (e = 0; u > e; ++e) {
            for (t = 0, r = 0; i > t; t++) r += n[t][e][1];
            if (r)
              for (t = 0; i > t; t++) n[t][e][1] /= r;
            else
              for (t = 0; i > t; t++) n[t][e][1] = a
          }
          for (e = 0; u > e; ++e) o[e] = 0;
          return o
        },
        zero: ti
      });
    ua.layout.histogram = function () {
      function n(n, u) {
        for (var a, o, c = [], l = n.map(e, this), f = r.call(this, l, u), s = i.call(this, f, l, u), u = -1, h = l.length, g = s.length - 1, p = t ? 1 : 1 / h; ++u < g;) a = c[u] = [], a.dx = s[u + 1] - (a.x = s[u]), a.y = 0;
        if (g > 0)
          for (u = -1; ++u < h;) o = l[u], o >= f[0] && o <= f[1] && (a = c[ua.bisect(s, o, 1, g) - 1], a.y += p, a.push(n[u]));
        return c
      }
      var t = !0,
        e = Number,
        r = oi,
        i = ui;
      return n.value = function (t) {
        return arguments.length ? (e = t, n) : e
      }, n.range = function (t) {
        return arguments.length ? (r = ft(t), n) : r
      }, n.bins = function (t) {
        return arguments.length ? (i = "number" == typeof t ? function (n) {
          return ai(n, t)
        } : ft(t), n) : i
      }, n.frequency = function (e) {
        return arguments.length ? (t = !!e, n) : t
      }, n
    }, ua.layout.tree = function () {
      function n(n, i) {
        function u(n, t) {
          var r = n.children,
            i = n._tree;
          if (r && (a = r.length)) {
            for (var a, c, l, f = r[0], s = f, h = -1; ++h < a;) l = r[h], u(l, c), s = o(l, c, s), c = l;
            mi(n);
            var g = .5 * (f._tree.prelim + l._tree.prelim);
            t ? (i.prelim = t._tree.prelim + e(n, t), i.mod = i.prelim - g) : i.prelim = g
          } else t && (i.prelim = t._tree.prelim + e(n, t))
        }

        function a(n, t) {
          n.x = n._tree.prelim + t;
          var e = n.children;
          if (e && (r = e.length)) {
            var r, i = -1;
            for (t += n._tree.mod; ++i < r;) a(e[i], t)
          }
        }

        function o(n, t, r) {
          if (t) {
            for (var i, u = n, a = n, o = t, c = n.parent.children[0], l = u._tree.mod, f = a._tree.mod, s = o._tree.mod, h = c._tree.mod; o = fi(o), u = li(u), o && u;) c = li(c), a = fi(a), a._tree.ancestor = n, i = o._tree.prelim + s - u._tree.prelim - l + e(o, u), i > 0 && (vi(yi(o, n, r), n, i), l += i, f += i), s += o._tree.mod, l += u._tree.mod, h += c._tree.mod, f += a._tree.mod;
            o && !fi(a) && (a._tree.thread = o, a._tree.mod += s - f), u && !li(c) && (c._tree.thread = u, c._tree.mod += l - h, r = n)
          }
          return r
        }
        var c = t.call(this, n, i),
          l = c[0];
        di(l, function (n, t) {
          n._tree = {
            ancestor: n,
            prelim: 0,
            mod: 0,
            change: 0,
            shift: 0,
            number: t ? t._tree.number + 1 : 0
          }
        }), u(l), a(l, -l._tree.prelim);
        var f = si(l, gi),
          s = si(l, hi),
          h = si(l, pi),
          g = f.x - e(f, s) / 2,
          p = s.x + e(s, f) / 2,
          d = h.depth || 1;
        return di(l, function (n) {
          n.x = (n.x - g) / (p - g) * r[0], n.y = n.depth / d * r[1], delete n._tree
        }), c
      }
      var t = ua.layout.hierarchy().sort(null).value(null),
        e = ci,
        r = [1, 1];
      return n.separation = function (t) {
        return arguments.length ? (e = t, n) : e
      }, n.size = function (t) {
        return arguments.length ? (r = t, n) : r
      }, Zr(n, t)
    }, ua.layout.pack = function () {
      function n(n, i) {
        var u = t.call(this, n, i),
          a = u[0];
        a.x = 0, a.y = 0, di(a, function (n) {
          n.r = Math.sqrt(n.value)
        }), di(a, wi);
        var o = r[0],
          c = r[1],
          l = Math.max(2 * a.r / o, 2 * a.r / c);
        if (e > 0) {
          var f = e * l / 2;
          di(a, function (n) {
            n.r += f
          }), di(a, wi), di(a, function (n) {
            n.r -= f
          }), l = Math.max(2 * a.r / o, 2 * a.r / c)
        }
        return ki(a, o / 2, c / 2, 1 / l), u
      }
      var t = ua.layout.hierarchy().sort(Mi),
        e = 0,
        r = [1, 1];
      return n.size = function (t) {
        return arguments.length ? (r = t, n) : r
      }, n.padding = function (t) {
        return arguments.length ? (e = +t, n) : e
      }, Zr(n, t)
    }, ua.layout.cluster = function () {
      function n(n, i) {
        var u, a = t.call(this, n, i),
          o = a[0],
          c = 0;
        di(o, function (n) {
          var t = n.children;
          t && t.length ? (n.x = qi(t), n.y = Ni(t)) : (n.x = u ? c += e(n, u) : 0, n.y = 0, u = n)
        });
        var l = Ti(o),
          f = Ci(o),
          s = l.x - e(l, f) / 2,
          h = f.x + e(f, l) / 2;
        return di(o, function (n) {
          n.x = (n.x - s) / (h - s) * r[0], n.y = (1 - (o.y ? n.y / o.y : 1)) * r[1]
        }), a
      }
      var t = ua.layout.hierarchy().sort(null).value(null),
        e = ci,
        r = [1, 1];
      return n.separation = function (t) {
        return arguments.length ? (e = t, n) : e
      }, n.size = function (t) {
        return arguments.length ? (r = t, n) : r
      }, Zr(n, t)
    }, ua.layout.treemap = function () {
      function n(n, t) {
        for (var e, r, i = -1, u = n.length; ++i < u;) r = (e = n[i]).value * (0 > t ? 0 : t), e.area = isNaN(r) || 0 >= r ? 0 : r
      }

      function t(e) {
        var u = e.children;
        if (u && u.length) {
          var a, o, c, l = s(e),
            f = [],
            h = u.slice(),
            p = 1 / 0,
            d = "slice" === g ? l.dx : "dice" === g ? l.dy : "slice-dice" === g ? e.depth & 1 ? l.dy : l.dx : Math.min(l.dx, l.dy);
          for (n(h, l.dx * l.dy / e.value), f.area = 0;
            (c = h.length) > 0;) f.push(a = h[c - 1]), f.area += a.area, "squarify" !== g || (o = r(f, d)) <= p ? (h.pop(), p = o) : (f.area -= f.pop().area, i(f, d, l, !1), d = Math.min(l.dx, l.dy), f.length = f.area = 0, p = 1 / 0);
          f.length && (i(f, d, l, !0), f.length = f.area = 0), u.forEach(t)
        }
      }

      function e(t) {
        var r = t.children;
        if (r && r.length) {
          var u, a = s(t),
            o = r.slice(),
            c = [];
          for (n(o, a.dx * a.dy / t.value), c.area = 0; u = o.pop();) c.push(u), c.area += u.area, u.z != null && (i(c, u.z ? a.dx : a.dy, a, !o.length), c.length = c.area = 0);
          r.forEach(e)
        }
      }

      function r(n, t) {
        for (var e, r = n.area, i = 0, u = 1 / 0, a = -1, o = n.length; ++a < o;)(e = n[a].area) && (u > e && (u = e), e > i && (i = e));
        return r *= r, t *= t, r ? Math.max(t * i * p / r, r / (t * u * p)) : 1 / 0
      }

      function i(n, t, e, r) {
        var i, u = -1,
          a = n.length,
          o = e.x,
          l = e.y,
          f = t ? c(n.area / t) : 0;
        if (t == e.dx) {
          for ((r || f > e.dy) && (f = e.dy); ++u < a;) i = n[u], i.x = o, i.y = l, i.dy = f, o += i.dx = Math.min(e.x + e.dx - o, f ? c(i.area / f) : 0);
          i.z = !0, i.dx += e.x + e.dx - o, e.y += f, e.dy -= f
        } else {
          for ((r || f > e.dx) && (f = e.dx); ++u < a;) i = n[u], i.x = o, i.y = l, i.dx = f, l += i.dy = Math.min(e.y + e.dy - l, f ? c(i.area / f) : 0);
          i.z = !1, i.dy += e.y + e.dy - l, e.x += f, e.dx -= f
        }
      }

      function u(r) {
        var i = a || o(r),
          u = i[0];
        return u.x = 0, u.y = 0, u.dx = l[0], u.dy = l[1], a && o.revalue(u), n([u], u.dx * u.dy / u.value), (a ? e : t)(u), h && (a = i), i
      }
      var a, o = ua.layout.hierarchy(),
        c = Math.round,
        l = [1, 1],
        f = null,
        s = zi,
        h = !1,
        g = "squarify",
        p = .5 * (1 + Math.sqrt(5));
      return u.size = function (n) {
        return arguments.length ? (l = n, u) : l
      }, u.padding = function (n) {
        function t(t) {
          var e = n.call(u, t, t.depth);
          return null == e ? zi(t) : Di(t, "number" == typeof e ? [e, e, e, e] : e)
        }

        function e(t) {
          return Di(t, n)
        }
        if (!arguments.length) return f;
        var r;
        return s = (f = n) == null ? zi : (r = typeof n) == "function" ? t : "number" === r ? (n = [n, n, n, n], e) : e, u
      }, u.round = function (n) {
        return arguments.length ? (c = n ? Math.round : Number, u) : c != Number
      }, u.sticky = function (n) {
        return arguments.length ? (h = n, a = null, u) : h
      }, u.ratio = function (n) {
        return arguments.length ? (p = n, u) : p
      }, u.mode = function (n) {
        return arguments.length ? (g = n + "", u) : g
      }, Zr(u, o)
    }, ua.random = {
      normal: function (n, t) {
        var e = arguments.length;
        return 2 > e && (t = 1), 1 > e && (n = 0),
          function () {
            var e, r, i;
            do e = Math.random() * 2 - 1, r = Math.random() * 2 - 1, i = e * e + r * r; while (!i || i > 1);
            return n + t * e * Math.sqrt(-2 * Math.log(i) / i)
          }
      },
      logNormal: function () {
        var n = ua.random.normal.apply(ua, arguments);
        return function () {
          return Math.exp(n())
        }
      },
      irwinHall: function (n) {
        return function () {
          for (var t = 0, e = 0; n > e; e++) t += Math.random();
          return t / n
        }
      }
    }, ua.scale = {}, ua.scale.linear = function () {
      return Ri([0, 1], [0, 1], mr, !1)
    }, ua.scale.log = function () {
      return Xi(ua.scale.linear().domain([0, Math.LN10]), 10, Zi, Bi, [1, 10])
    };
    var Go = ua.format(".0e");
    ua.scale.pow = function () {
      return Gi(ua.scale.linear(), 1, [0, 1])
    }, ua.scale.sqrt = function () {
      return ua.scale.pow().exponent(.5)
    }, ua.scale.ordinal = function () {
      return Wi([], {
        t: "range",
        a: [
          []
        ]
      })
    }, ua.scale.category10 = function () {
      return ua.scale.ordinal().range(Ko)
    }, ua.scale.category20 = function () {
      return ua.scale.ordinal().range(Wo)
    }, ua.scale.category20b = function () {
      return ua.scale.ordinal().range(Qo)
    }, ua.scale.category20c = function () {
      return ua.scale.ordinal().range(nc)
    };
    var Ko = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"],
      Wo = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"],
      Qo = ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"],
      nc = ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd", "#d9d9d9"];
    ua.scale.quantile = function () {
      return Qi([], [])
    }, ua.scale.quantize = function () {
      return nu(0, 1, [0, 1])
    }, ua.scale.threshold = function () {
      return tu([.5], [0, 1])
    }, ua.scale.identity = function () {
      return eu([0, 1])
    }, ua.svg.arc = function () {
      function n() {
        var n = t.apply(this, arguments),
          u = e.apply(this, arguments),
          a = r.apply(this, arguments) + tc,
          o = i.apply(this, arguments) + tc,
          c = (a > o && (c = a, a = o, o = c), o - a),
          l = Da > c ? "0" : "1",
          f = Math.cos(a),
          s = Math.sin(a),
          h = Math.cos(o),
          g = Math.sin(o);
        return c >= ec ? n ? "M0," + u + "A" + u + "," + u + " 0 1,1 0," + -u + "A" + u + "," + u + " 0 1,1 0," + u + "M0," + n + "A" + n + "," + n + " 0 1,0 0," + -n + "A" + n + "," + n + " 0 1,0 0," + n + "Z" : "M0," + u + "A" + u + "," + u + " 0 1,1 0," + -u + "A" + u + "," + u + " 0 1,1 0," + u + "Z" : n ? "M" + u * f + "," + u * s + "A" + u + "," + u + " 0 " + l + ",1 " + u * h + "," + u * g + "L" + n * h + "," + n * g + "A" + n + "," + n + " 0 " + l + ",0 " + n * f + "," + n * s + "Z" : "M" + u * f + "," + u * s + "A" + u + "," + u + " 0 " + l + ",1 " + u * h + "," + u * g + "L0,0" + "Z"
      }
      var t = ru,
        e = iu,
        r = uu,
        i = au;
      return n.innerRadius = function (e) {
        return arguments.length ? (t = ft(e), n) : t
      }, n.outerRadius = function (t) {
        return arguments.length ? (e = ft(t), n) : e
      }, n.startAngle = function (t) {
        return arguments.length ? (r = ft(t), n) : r
      }, n.endAngle = function (t) {
        return arguments.length ? (i = ft(t), n) : i
      }, n.centroid = function () {
        var n = (t.apply(this, arguments) + e.apply(this, arguments)) / 2,
          u = (r.apply(this, arguments) + i.apply(this, arguments)) / 2 + tc;
        return [Math.cos(u) * n, Math.sin(u) * n]
      }, n
    };
    var tc = -Da / 2,
      ec = 2 * Da - 1e-6;
    ua.svg.line.radial = function () {
      var n = Ce(ou);
      return n.radius = n.x, delete n.x, n.angle = n.y, delete n.y, n
    }, Fe.reverse = He, He.reverse = Fe, ua.svg.area = function () {
      return cu(st)
    }, ua.svg.area.radial = function () {
      var n = cu(ou);
      return n.radius = n.x, delete n.x, n.innerRadius = n.x0, delete n.x0, n.outerRadius = n.x1, delete n.x1, n.angle = n.y, delete n.y, n.startAngle = n.y0, delete n.y0, n.endAngle = n.y1, delete n.y1, n
    }, ua.svg.chord = function () {
      function n(n, o) {
        var c = t(this, u, n, o),
          l = t(this, a, n, o);
        return "M" + c.p0 + r(c.r, c.p1, c.a1 - c.a0) + (e(c, l) ? i(c.r, c.p1, c.r, c.p0) : i(c.r, c.p1, l.r, l.p0) + r(l.r, l.p1, l.a1 - l.a0) + i(l.r, l.p1, c.r, c.p0)) + "Z"
      }

      function t(n, t, e, r) {
        var i = t.call(n, e, r),
          u = o.call(n, i, r),
          a = c.call(n, i, r) + tc,
          f = l.call(n, i, r) + tc;
        return {
          r: u,
          a0: a,
          a1: f,
          p0: [u * Math.cos(a), u * Math.sin(a)],
          p1: [u * Math.cos(f), u * Math.sin(f)]
        }
      }

      function e(n, t) {
        return n.a0 == t.a0 && n.a1 == t.a1
      }

      function r(n, t, e) {
        return "A" + n + "," + n + " 0 " + +(e > Da) + ",1 " + t
      }

      function i(n, t, e, r) {
        return "Q 0,0 " + r
      }
      var u = le,
        a = fe,
        o = lu,
        c = uu,
        l = au;
      return n.radius = function (t) {
        return arguments.length ? (o = ft(t), n) : o
      }, n.source = function (t) {
        return arguments.length ? (u = ft(t), n) : u
      }, n.target = function (t) {
        return arguments.length ? (a = ft(t), n) : a
      }, n.startAngle = function (t) {
        return arguments.length ? (c = ft(t), n) : c
      }, n.endAngle = function (t) {
        return arguments.length ? (l = ft(t), n) : l
      }, n
    }, ua.svg.diagonal = function () {
      function n(n, i) {
        var u = t.call(this, n, i),
          a = e.call(this, n, i),
          o = (u.y + a.y) / 2,
          c = [u, {
            x: u.x,
            y: o
          }, {
            x: a.x,
            y: o
          }, a];
        return c = c.map(r), "M" + c[0] + "C" + c[1] + " " + c[2] + " " + c[3]
      }
      var t = le,
        e = fe,
        r = fu;
      return n.source = function (e) {
        return arguments.length ? (t = ft(e), n) : t
      }, n.target = function (t) {
        return arguments.length ? (e = ft(t), n) : e
      }, n.projection = function (t) {
        return arguments.length ? (r = t, n) : r
      }, n
    }, ua.svg.diagonal.radial = function () {
      var n = ua.svg.diagonal(),
        t = fu,
        e = n.projection;
      return n.projection = function (n) {
        return arguments.length ? e(su(t = n)) : t
      }, n
    }, ua.svg.symbol = function () {
      function n(n, r) {
        return (rc.get(t.call(this, n, r)) || pu)(e.call(this, n, r))
      }
      var t = gu,
        e = hu;
      return n.type = function (e) {
        return arguments.length ? (t = ft(e), n) : t
      }, n.size = function (t) {
        return arguments.length ? (e = ft(t), n) : e
      }, n
    };
    var rc = ua.map({
      circle: pu,
      cross: function (n) {
        var t = Math.sqrt(n / 5) / 2;
        return "M" + -3 * t + "," + -t + "H" + -t + "V" + -3 * t + "H" + t + "V" + -t + "H" + 3 * t + "V" + t + "H" + t + "V" + 3 * t + "H" + -t + "V" + t + "H" + -3 * t + "Z"
      },
      diamond: function (n) {
        var t = Math.sqrt(n / (2 * ac)),
          e = t * ac;
        return "M0," + -t + "L" + e + ",0" + " 0," + t + " " + -e + ",0" + "Z"
      },
      square: function (n) {
        var t = Math.sqrt(n) / 2;
        return "M" + -t + "," + -t + "L" + t + "," + -t + " " + t + "," + t + " " + -t + "," + t + "Z"
      },
      "triangle-down": function (n) {
        var t = Math.sqrt(n / uc),
          e = t * uc / 2;
        return "M0," + e + "L" + t + "," + -e + " " + -t + "," + -e + "Z"
      },
      "triangle-up": function (n) {
        var t = Math.sqrt(n / uc),
          e = t * uc / 2;
        return "M0," + -e + "L" + t + "," + e + " " + -t + "," + e + "Z"
      }
    });
    ua.svg.symbolTypes = rc.keys();
    var ic, uc = Math.sqrt(3),
      ac = Math.tan(30 * La),
      oc = [],
      cc = 0,
      lc = {
        ease: Sr,
        delay: 0,
        duration: 250
      };
    oc.call = wa.call, oc.empty = wa.empty, oc.node = wa.node, ua.transition = function (n) {
      return arguments.length ? ic ? n.transition() : n : Na.transition()
    }, ua.transition.prototype = oc, oc.select = function (n) {
      var t, e, r, i = this.id,
        u = [];
      "function" != typeof n && (n = v(n));
      for (var a = -1, o = this.length; ++a < o;) {
        u.push(t = []);
        for (var c = this[a], l = -1, f = c.length; ++l < f;)(r = c[l]) && (e = n.call(r, r.__data__, l)) ? ("__data__" in r && (e.__data__ = r.__data__), yu(e, l, i, r.__transition__[i]), t.push(e)) : t.push(null)
      }
      return du(u, i)
    }, oc.selectAll = function (n) {
      var t, e, r, i, u, a = this.id,
        o = [];
      "function" != typeof n && (n = y(n));
      for (var c = -1, l = this.length; ++c < l;)
        for (var f = this[c], s = -1, h = f.length; ++s < h;)
          if (r = f[s]) {
            u = r.__transition__[a], e = n.call(r, r.__data__, s), o.push(t = []);
            for (var g = -1, p = e.length; ++g < p;) yu(i = e[g], g, a, u), t.push(i)
          } return du(o, a)
    }, oc.filter = function (n) {
      var t, e, r, i = [];
      "function" != typeof n && (n = N(n));
      for (var u = 0, a = this.length; a > u; u++) {
        i.push(t = []);
        for (var e = this[u], o = 0, c = e.length; c > o; o++)(r = e[o]) && n.call(r, r.__data__, o) && t.push(r)
      }
      return du(i, this.id, this.time).ease(this.ease())
    }, oc.tween = function (n, t) {
      var e = this.id;
      return arguments.length < 2 ? this.node().__transition__[e].tween.get(n) : j(this, null == t ? function (t) {
        t.__transition__[e].tween.remove(n)
      } : function (r) {
        r.__transition__[e].tween.set(n, t)
      })
    }, oc.attr = function (n, t) {
      function e() {
        this.removeAttribute(o)
      }

      function r() {
        this.removeAttributeNS(o.space, o.local)
      }

      function i(n) {
        return null == n ? e : (n += "", function () {
          var t, e = this.getAttribute(o);
          return e !== n && (t = a(e, n), function (n) {
            this.setAttribute(o, t(n))
          })
        })
      }

      function u(n) {
        return null == n ? r : (n += "", function () {
          var t, e = this.getAttributeNS(o.space, o.local);
          return e !== n && (t = a(e, n), function (n) {
            this.setAttributeNS(o.space, o.local, t(n))
          })
        })
      }
      if (arguments.length < 2) {
        for (t in n) this.attr(t, n[t]);
        return this
      }
      var a = vr(n),
        o = ua.ns.qualify(n);
      return mu(this, "attr." + n, t, o.local ? u : i)
    }, oc.attrTween = function (n, t) {
      function e(n, e) {
        var r = t.call(this, n, e, this.getAttribute(i));
        return r && function (n) {
          this.setAttribute(i, r(n))
        }
      }

      function r(n, e) {
        var r = t.call(this, n, e, this.getAttributeNS(i.space, i.local));
        return r && function (n) {
          this.setAttributeNS(i.space, i.local, r(n))
        }
      }
      var i = ua.ns.qualify(n);
      return this.tween("attr." + n, i.local ? r : e)
    }, oc.style = function (n, t, e) {
      function r() {
        this.style.removeProperty(n)
      }

      function i(t) {
        return null == t ? r : (t += "", function () {
          var r, i = oa.getComputedStyle(this, null).getPropertyValue(n);
          return i !== t && (r = a(i, t), function (t) {
            this.style.setProperty(n, r(t), e)
          })
        })
      }
      var u = arguments.length;
      if (3 > u) {
        if ("string" != typeof n) {
          2 > u && (t = "");
          for (e in n) this.style(e, n[e], t);
          return this
        }
        e = ""
      }
      var a = vr(n);
      return mu(this, "style." + n, t, i)
    }, oc.styleTween = function (n, t, e) {
      function r(r, i) {
        var u = t.call(this, r, i, oa.getComputedStyle(this, null).getPropertyValue(n));
        return u && function (t) {
          this.style.setProperty(n, u(t), e)
        }
      }
      return arguments.length < 3 && (e = ""), this.tween("style." + n, r)
    }, oc.text = function (n) {
      return mu(this, "text", n, vu)
    }, oc.remove = function () {
      return this.each("end.transition", function () {
        var n;
        !this.__transition__ && (n = this.parentNode) && n.removeChild(this)
      })
    }, oc.ease = function (n) {
      var t = this.id;
      return arguments.length < 1 ? this.node().__transition__[t].ease : ("function" != typeof n && (n = ua.ease.apply(ua, arguments)), j(this, function (e) {
        e.__transition__[t].ease = n
      }))
    }, oc.delay = function (n) {
      var t = this.id;
      return j(this, "function" == typeof n ? function (e, r, i) {
        e.__transition__[t].delay = n.call(e, e.__data__, r, i) | 0
      } : (n |= 0, function (e) {
        e.__transition__[t].delay = n
      }))
    }, oc.duration = function (n) {
      var t = this.id;
      return j(this, "function" == typeof n ? function (e, r, i) {
        e.__transition__[t].duration = Math.max(1, n.call(e, e.__data__, r, i) | 0)
      } : (n = Math.max(1, 0 | n), function (e) {
        e.__transition__[t].duration = n
      }))
    }, oc.each = function (n, t) {
      var e = this.id;
      if (arguments.length < 2) {
        var r = lc,
          i = ic;
        ic = e, j(this, function (t, r, i) {
          lc = t.__transition__[e], n.call(t, t.__data__, r, i)
        }), lc = r, ic = i
      } else j(this, function (r) {
        r.__transition__[e].event.on(n, t)
      });
      return this
    }, oc.transition = function () {
      for (var n, t, e, r, i = this.id, u = ++cc, a = [], o = 0, c = this.length; c > o; o++) {
        a.push(n = []);
        for (var t = this[o], l = 0, f = t.length; f > l; l++)(e = t[l]) && (r = Object.create(e.__transition__[i]), r.delay += r.duration, yu(e, l, u, r)), n.push(e)
      }
      return du(a, u)
    }, ua.svg.axis = function () {
      function n(n) {
        n.each(function () {
          var n, s = ua.select(this),
            h = null == l ? e.ticks ? e.ticks.apply(e, c) : e.domain() : l,
            g = null == t ? e.tickFormat ? e.tickFormat.apply(e, c) : String : t,
            p = bu(e, h, f),
            d = s.selectAll(".tick.minor").data(p, String),
            m = d.enter().insert("line", ".tick").attr("class", "tick minor").style("opacity", 1e-6),
            v = ua.transition(d.exit()).style("opacity", 1e-6).remove(),
            y = ua.transition(d).style("opacity", 1),
            M = s.selectAll(".tick.major").data(h, String),
            x = M.enter().insert("g", "path").attr("class", "tick major").style("opacity", 1e-6),
            b = ua.transition(M.exit()).style("opacity", 1e-6).remove(),
            _ = ua.transition(M).style("opacity", 1),
            w = Li(e),
            S = s.selectAll(".domain").data([0]),
            E = (S.enter().append("path").attr("class", "domain"), ua.transition(S)),
            k = e.copy(),
            A = this.__chart__ || k;
          this.__chart__ = k, x.append("line"), x.append("text");
          var N = x.select("line"),
            q = _.select("line"),
            T = M.select("text").text(g),
            C = x.select("text"),
            z = _.select("text");
          switch (r) {
            case "bottom":
              n = Mu, m.attr("y2", u), y.attr("x2", 0).attr("y2", u), N.attr("y2", i), C.attr("y", Math.max(i, 0) + o), q.attr("x2", 0).attr("y2", i), z.attr("x", 0).attr("y", Math.max(i, 0) + o), T.attr("dy", ".71em").style("text-anchor", "middle"), E.attr("d", "M" + w[0] + "," + a + "V0H" + w[1] + "V" + a);
              break;
            case "top":
              n = Mu, m.attr("y2", -u), y.attr("x2", 0).attr("y2", -u), N.attr("y2", -i), C.attr("y", -(Math.max(i, 0) + o)), q.attr("x2", 0).attr("y2", -i), z.attr("x", 0).attr("y", -(Math.max(i, 0) + o)), T.attr("dy", "0em").style("text-anchor", "middle"), E.attr("d", "M" + w[0] + "," + -a + "V0H" + w[1] + "V" + -a);
              break;
            case "left":
              n = xu, m.attr("x2", -u), y.attr("x2", -u).attr("y2", 0), N.attr("x2", -i), C.attr("x", -(Math.max(i, 0) + o)), q.attr("x2", -i).attr("y2", 0), z.attr("x", -(Math.max(i, 0) + o)).attr("y", 0), T.attr("dy", ".32em").style("text-anchor", "end"), E.attr("d", "M" + -a + "," + w[0] + "H0V" + w[1] + "H" + -a);
              break;
            case "right":
              n = xu, m.attr("x2", u), y.attr("x2", u).attr("y2", 0), N.attr("x2", i), C.attr("x", Math.max(i, 0) + o), q.attr("x2", i).attr("y2", 0), z.attr("x", Math.max(i, 0) + o).attr("y", 0), T.attr("dy", ".32em").style("text-anchor", "start"), E.attr("d", "M" + a + "," + w[0] + "H0V" + w[1] + "H" + a)
          }
          if (e.ticks) x.call(n, A), _.call(n, k), b.call(n, k), m.call(n, A), y.call(n, k), v.call(n, k);
          else {
            var D = k.rangeBand() / 2,
              j = function (n) {
                return k(n) + D
              };
            x.call(n, j), _.call(n, j)
          }
        })
      }
      var t, e = ua.scale.linear(),
        r = fc,
        i = 6,
        u = 6,
        a = 6,
        o = 3,
        c = [10],
        l = null,
        f = 0;
      return n.scale = function (t) {
        return arguments.length ? (e = t, n) : e
      }, n.orient = function (t) {
        return arguments.length ? (r = t in sc ? t + "" : fc, n) : r
      }, n.ticks = function () {
        return arguments.length ? (c = arguments, n) : c
      }, n.tickValues = function (t) {
        return arguments.length ? (l = t, n) : l
      }, n.tickFormat = function (e) {
        return arguments.length ? (t = e, n) : t
      }, n.tickSize = function (t, e) {
        if (!arguments.length) return i;
        var r = arguments.length - 1;
        return i = +t, u = r > 1 ? +e : i, a = r > 0 ? +arguments[r] : i, n
      }, n.tickPadding = function (t) {
        return arguments.length ? (o = +t, n) : o
      }, n.tickSubdivide = function (t) {
        return arguments.length ? (f = +t, n) : f
      }, n
    };
    var fc = "bottom",
      sc = {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1
      };
    ua.svg.brush = function () {
      function n(u) {
        u.each(function () {
          var u, a = ua.select(this),
            l = a.selectAll(".background").data([0]),
            s = a.selectAll(".extent").data([0]),
            h = a.selectAll(".resize").data(f, String);
          a.style("pointer-events", "all").on("mousedown.brush", i).on("touchstart.brush", i), l.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair"), s.enter().append("rect").attr("class", "extent").style("cursor", "move"), h.enter().append("g").attr("class", function (n) {
            return "resize " + n
          }).style("cursor", function (n) {
            return hc[n]
          }).append("rect").attr("x", function (n) {
            return /[ew]$/.test(n) ? -3 : null
          }).attr("y", function (n) {
            return /^[ns]/.test(n) ? -3 : null
          }).attr("width", 6).attr("height", 6).style("visibility", "hidden"), h.style("display", n.empty() ? "none" : null), h.exit().remove(), o && (u = Li(o), l.attr("x", u[0]).attr("width", u[1] - u[0]), e(a)), c && (u = Li(c), l.attr("y", u[0]).attr("height", u[1] - u[0]), r(a)), t(a)
        })
      }

      function t(n) {
        n.selectAll(".resize").attr("transform", function (n) {
          return "translate(" + s[+/e$/.test(n)][0] + "," + s[+/^s/.test(n)][1] + ")"
        })
      }

      function e(n) {
        n.select(".extent").attr("x", s[0][0]), n.selectAll(".extent,.n>rect,.s>rect").attr("width", s[1][0] - s[0][0])
      }

      function r(n) {
        n.select(".extent").attr("y", s[0][1]), n.selectAll(".extent,.e>rect,.w>rect").attr("height", s[1][1] - s[0][1])
      }

      function i() {
        function i() {
          var n = ua.event.changedTouches;
          return n ? ua.touches(y, n)[0] : ua.mouse(y)
        }

        function f() {
          ua.event.keyCode == 32 && (E || (m = null, k[0] -= s[1][0], k[1] -= s[1][1], E = 2), l())
        }

        function h() {
          ua.event.keyCode == 32 && 2 == E && (k[0] += s[1][0], k[1] += s[1][1], E = 0, l())
        }

        function g() {
          var n = i(),
            u = !1;
          v && (n[0] += v[0], n[1] += v[1]), E || (ua.event.altKey ? (m || (m = [(s[0][0] + s[1][0]) / 2, (s[0][1] + s[1][1]) / 2]), k[0] = s[+(n[0] < m[0])][0], k[1] = s[+(n[1] < m[1])][1]) : m = null), w && p(n, o, 0) && (e(b), u = !0), S && p(n, c, 1) && (r(b), u = !0), u && (t(b), x({
            type: "brush",
            mode: E ? "move" : "resize"
          }))
        }

        function p(n, t, e) {
          var r, i, a = Li(t),
            o = a[0],
            c = a[1],
            l = k[e],
            f = s[1][e] - s[0][e];
          return E && (o -= l, c -= f + l), r = Math.max(o, Math.min(c, n[e])), E ? i = (r += l) + f : (m && (l = Math.max(o, Math.min(c, 2 * m[e] - r))), r > l ? (i = r, r = l) : i = l), s[0][e] !== r || s[1][e] !== i ? (u = null, s[0][e] = r, s[1][e] = i, !0) : void 0
        }

        function d() {
          g(), b.style("pointer-events", "all").selectAll(".resize").style("display", n.empty() ? "none" : null), ua.select("body").style("cursor", null), A.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null), x({
            type: "brushend"
          }), l()
        }
        var m, v, y = this,
          M = ua.select(ua.event.target),
          x = a.of(y, arguments),
          b = ua.select(y),
          _ = M.datum(),
          w = !/^(n|s)$/.test(_) && o,
          S = !/^(e|w)$/.test(_) && c,
          E = M.classed("extent"),
          k = i(),
          A = ua.select(oa).on("mousemove.brush", g).on("mouseup.brush", d).on("touchmove.brush", g).on("touchend.brush", d).on("keydown.brush", f).on("keyup.brush", h);
        if (E) k[0] = s[0][0] - k[0], k[1] = s[0][1] - k[1];
        else if (_) {
          var N = +/w$/.test(_),
            q = +/^n/.test(_);
          v = [s[1 - N][0] - k[0], s[1 - q][1] - k[1]], k[0] = s[N][0], k[1] = s[q][1]
        } else ua.event.altKey && (m = k.slice());
        b.style("pointer-events", "none").selectAll(".resize").style("display", null), ua.select("body").style("cursor", M.style("cursor")), x({
          type: "brushstart"
        }), g(), l()
      }
      var u, a = h(n, "brushstart", "brush", "brushend"),
        o = null,
        c = null,
        f = gc[0],
        s = [
          [0, 0],
          [0, 0]
        ];
      return n.x = function (t) {
        return arguments.length ? (o = t, f = gc[!o << 1 | !c], n) : o
      }, n.y = function (t) {
        return arguments.length ? (c = t, f = gc[!o << 1 | !c], n) : c
      }, n.extent = function (t) {
        var e, r, i, a, l;
        return arguments.length ? (u = [
          [0, 0],
          [0, 0]
        ], o && (e = t[0], r = t[1], c && (e = e[0], r = r[0]), u[0][0] = e, u[1][0] = r, o.invert && (e = o(e), r = o(r)), e > r && (l = e, e = r, r = l), s[0][0] = 0 | e, s[1][0] = 0 | r), c && (i = t[0], a = t[1], o && (i = i[1], a = a[1]), u[0][1] = i, u[1][1] = a, c.invert && (i = c(i), a = c(a)), i > a && (l = i, i = a, a = l), s[0][1] = 0 | i, s[1][1] = 0 | a), n) : (t = u || s, o && (e = t[0][0], r = t[1][0], u || (e = s[0][0], r = s[1][0], o.invert && (e = o.invert(e), r = o.invert(r)), e > r && (l = e, e = r, r = l))), c && (i = t[0][1], a = t[1][1], u || (i = s[0][1], a = s[1][1], c.invert && (i = c.invert(i), a = c.invert(a)), i > a && (l = i, i = a, a = l))), o && c ? [
          [e, i],
          [r, a]
        ] : o ? [e, r] : c && [i, a])
      }, n.clear = function () {
        return u = null, s[0][0] = s[0][1] = s[1][0] = s[1][1] = 0, n
      }, n.empty = function () {
        return o && s[0][0] === s[1][0] || c && s[0][1] === s[1][1]
      }, ua.rebind(n, a, "on")
    };
    var hc = {
        n: "ns-resize",
        e: "ew-resize",
        s: "ns-resize",
        w: "ew-resize",
        nw: "nwse-resize",
        ne: "nesw-resize",
        se: "nwse-resize",
        sw: "nesw-resize"
      },
      gc = [
        ["n", "e", "s", "w", "nw", "ne", "se", "sw"],
        ["e", "w"],
        ["n", "s"],
        []
      ];
    ua.time = {};
    var pc = Date,
      dc = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    _u.prototype = {
      getDate: function () {
        return this._.getUTCDate()
      },
      getDay: function () {
        return this._.getUTCDay()
      },
      getFullYear: function () {
        return this._.getUTCFullYear()
      },
      getHours: function () {
        return this._.getUTCHours()
      },
      getMilliseconds: function () {
        return this._.getUTCMilliseconds()
      },
      getMinutes: function () {
        return this._.getUTCMinutes()
      },
      getMonth: function () {
        return this._.getUTCMonth()
      },
      getSeconds: function () {
        return this._.getUTCSeconds()
      },
      getTime: function () {
        return this._.getTime()
      },
      getTimezoneOffset: function () {
        return 0
      },
      valueOf: function () {
        return this._.valueOf()
      },
      setDate: function () {
        mc.setUTCDate.apply(this._, arguments)
      },
      setDay: function () {
        mc.setUTCDay.apply(this._, arguments)
      },
      setFullYear: function () {
        mc.setUTCFullYear.apply(this._, arguments)
      },
      setHours: function () {
        mc.setUTCHours.apply(this._, arguments)
      },
      setMilliseconds: function () {
        mc.setUTCMilliseconds.apply(this._, arguments)
      },
      setMinutes: function () {
        mc.setUTCMinutes.apply(this._, arguments)
      },
      setMonth: function () {
        mc.setUTCMonth.apply(this._, arguments)
      },
      setSeconds: function () {
        mc.setUTCSeconds.apply(this._, arguments)
      },
      setTime: function () {
        mc.setTime.apply(this._, arguments)
      }
    };
    var mc = Date.prototype,
      vc = "%a %b %e %X %Y",
      yc = "%m/%d/%Y",
      Mc = "%H:%M:%S",
      xc = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      bc = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      _c = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      wc = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    ua.time.year = wu(function (n) {
      return n = ua.time.day(n), n.setMonth(0, 1), n
    }, function (n, t) {
      n.setFullYear(n.getFullYear() + t)
    }, function (n) {
      return n.getFullYear()
    }), ua.time.years = ua.time.year.range, ua.time.years.utc = ua.time.year.utc.range, ua.time.day = wu(function (n) {
      var t = new pc(1970, 0);
      return t.setFullYear(n.getFullYear(), n.getMonth(), n.getDate()), t
    }, function (n, t) {
      n.setDate(n.getDate() + t)
    }, function (n) {
      return n.getDate() - 1
    }), ua.time.days = ua.time.day.range, ua.time.days.utc = ua.time.day.utc.range, ua.time.dayOfYear = function (n) {
      var t = ua.time.year(n);
      return Math.floor((n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * 6e4) / 864e5)
    }, dc.forEach(function (n, t) {
      n = n.toLowerCase(), t = 7 - t;
      var e = ua.time[n] = wu(function (n) {
        return (n = ua.time.day(n)).setDate(n.getDate() - (n.getDay() + t) % 7), n
      }, function (n, t) {
        n.setDate(n.getDate() + Math.floor(t) * 7)
      }, function (n) {
        var e = ua.time.year(n).getDay();
        return Math.floor((ua.time.dayOfYear(n) + (e + t) % 7) / 7) - (e !== t)
      });
      ua.time[n + "s"] = e.range, ua.time[n + "s"].utc = e.utc.range, ua.time[n + "OfYear"] = function (n) {
        var e = ua.time.year(n).getDay();
        return Math.floor((ua.time.dayOfYear(n) + (e + t) % 7) / 7)
      }
    }), ua.time.week = ua.time.sunday, ua.time.weeks = ua.time.sunday.range, ua.time.weeks.utc = ua.time.sunday.utc.range, ua.time.weekOfYear = ua.time.sundayOfYear, ua.time.format = function (n) {
      function t(t) {
        for (var r, i, u, a = [], o = -1, c = 0; ++o < e;) n.charCodeAt(o) === 37 && (a.push(n.substring(c, o)), (i = Tc[r = n.charAt(++o)]) != null && (r = n.charAt(++o)), (u = Cc[r]) && (r = u(t, null == i ? "e" === r ? " " : "0" : i)), a.push(r), c = o + 1);
        return a.push(n.substring(c, o)), a.join("")
      }
      var e = n.length;
      return t.parse = function (t) {
        var e = {
            y: 1900,
            m: 0,
            d: 1,
            H: 0,
            M: 0,
            S: 0,
            L: 0
          },
          r = Eu(e, n, t, 0);
        if (r != t.length) return null;
        "p" in e && (e.H = e.H % 12 + e.p * 12);
        var i = new pc;
        return i.setFullYear(e.y, e.m, e.d), i.setHours(e.H, e.M, e.S, e.L), i
      }, t.toString = function () {
        return n
      }, t
    };
    var Sc = ku(xc),
      Ec = ku(bc),
      kc = ku(_c),
      Ac = Au(_c),
      Nc = ku(wc),
      qc = Au(wc),
      Tc = {
        "-": "",
        _: " ",
        0: "0"
      },
      Cc = {
        a: function (n) {
          return bc[n.getDay()]
        },
        A: function (n) {
          return xc[n.getDay()]
        },
        b: function (n) {
          return wc[n.getMonth()]
        },
        B: function (n) {
          return _c[n.getMonth()]
        },
        c: ua.time.format(vc),
        d: function (n, t) {
          return Nu(n.getDate(), t, 2)
        },
        e: function (n, t) {
          return Nu(n.getDate(), t, 2)
        },
        H: function (n, t) {
          return Nu(n.getHours(), t, 2)
        },
        I: function (n, t) {
          return Nu(n.getHours() % 12 || 12, t, 2)
        },
        j: function (n, t) {
          return Nu(1 + ua.time.dayOfYear(n), t, 3)
        },
        L: function (n, t) {
          return Nu(n.getMilliseconds(), t, 3)
        },
        m: function (n, t) {
          return Nu(n.getMonth() + 1, t, 2)
        },
        M: function (n, t) {
          return Nu(n.getMinutes(), t, 2)
        },
        p: function (n) {
          return n.getHours() >= 12 ? "PM" : "AM"
        },
        S: function (n, t) {
          return Nu(n.getSeconds(), t, 2)
        },
        U: function (n, t) {
          return Nu(ua.time.sundayOfYear(n), t, 2)
        },
        w: function (n) {
          return n.getDay()
        },
        W: function (n, t) {
          return Nu(ua.time.mondayOfYear(n), t, 2)
        },
        x: ua.time.format(yc),
        X: ua.time.format(Mc),
        y: function (n, t) {
          return Nu(n.getFullYear() % 100, t, 2)
        },
        Y: function (n, t) {
          return Nu(n.getFullYear() % 1e4, t, 4)
        },
        Z: Zu,
        "%": function () {
          return "%"
        }
      },
      zc = {
        a: qu,
        A: Tu,
        b: Cu,
        B: zu,
        c: Du,
        d: Ou,
        e: Ou,
        H: Yu,
        I: Yu,
        L: Vu,
        m: Ru,
        M: Uu,
        p: Xu,
        S: Iu,
        x: ju,
        X: Lu,
        y: Hu,
        Y: Fu
      },
      Dc = /^\s*\d+/,
      jc = ua.map({
        am: 0,
        pm: 1
      });
    ua.time.format.utc = function (n) {
      function t(n) {
        try {
          pc = _u;
          var t = new pc;
          return t._ = n, e(t)
        } finally {
          pc = Date
        }
      }
      var e = ua.time.format(n);
      return t.parse = function (n) {
        try {
          pc = _u;
          var t = e.parse(n);
          return t && t._
        } finally {
          pc = Date
        }
      }, t.toString = e.toString, t
    };
    var Lc = ua.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");
    ua.time.format.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? Bu : Lc, Bu.parse = function (n) {
      var t = new Date(n);
      return isNaN(t) ? null : t
    }, Bu.toString = Lc.toString, ua.time.second = wu(function (n) {
      return new pc(Math.floor(n / 1e3) * 1e3)
    }, function (n, t) {
      n.setTime(n.getTime() + Math.floor(t) * 1e3)
    }, function (n) {
      return n.getSeconds()
    }), ua.time.seconds = ua.time.second.range, ua.time.seconds.utc = ua.time.second.utc.range, ua.time.minute = wu(function (n) {
      return new pc(Math.floor(n / 6e4) * 6e4)
    }, function (n, t) {
      n.setTime(n.getTime() + Math.floor(t) * 6e4)
    }, function (n) {
      return n.getMinutes()
    }), ua.time.minutes = ua.time.minute.range, ua.time.minutes.utc = ua.time.minute.utc.range, ua.time.hour = wu(function (n) {
      var t = n.getTimezoneOffset() / 60;
      return new pc((Math.floor(n / 36e5 - t) + t) * 36e5)
    }, function (n, t) {
      n.setTime(n.getTime() + Math.floor(t) * 36e5)
    }, function (n) {
      return n.getHours()
    }), ua.time.hours = ua.time.hour.range, ua.time.hours.utc = ua.time.hour.utc.range, ua.time.month = wu(function (n) {
      return n = ua.time.day(n), n.setDate(1), n
    }, function (n, t) {
      n.setMonth(n.getMonth() + t)
    }, function (n) {
      return n.getMonth()
    }), ua.time.months = ua.time.month.range, ua.time.months.utc = ua.time.month.utc.range;
    var Fc = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6],
      Hc = [
        [ua.time.second, 1],
        [ua.time.second, 5],
        [ua.time.second, 15],
        [ua.time.second, 30],
        [ua.time.minute, 1],
        [ua.time.minute, 5],
        [ua.time.minute, 15],
        [ua.time.minute, 30],
        [ua.time.hour, 1],
        [ua.time.hour, 3],
        [ua.time.hour, 6],
        [ua.time.hour, 12],
        [ua.time.day, 1],
        [ua.time.day, 2],
        [ua.time.week, 1],
        [ua.time.month, 1],
        [ua.time.month, 3],
        [ua.time.year, 1]
      ],
      Pc = [
        [ua.time.format("%Y"), Lt],
        [ua.time.format("%B"), function (n) {
          return n.getMonth()
        }],
        [ua.time.format("%b %d"), function (n) {
          return n.getDate() != 1
        }],
        [ua.time.format("%a %d"), function (n) {
          return n.getDay() && n.getDate() != 1
        }],
        [ua.time.format("%I %p"), function (n) {
          return n.getHours()
        }],
        [ua.time.format("%I:%M"), function (n) {
          return n.getMinutes()
        }],
        [ua.time.format(":%S"), function (n) {
          return n.getSeconds()
        }],
        [ua.time.format(".%L"), function (n) {
          return n.getMilliseconds()
        }]
      ],
      Rc = ua.scale.linear(),
      Oc = Gu(Pc);
    Hc.year = function (n, t) {
      return Rc.domain(n.map(Wu)).ticks(t).map(Ku)
    }, ua.time.scale = function () {
      return $u(ua.scale.linear(), Hc, Oc)
    };
    var Yc = Hc.map(function (n) {
        return [n[0].utc, n[1]]
      }),
      Uc = [
        [ua.time.format.utc("%Y"), Lt],
        [ua.time.format.utc("%B"), function (n) {
          return n.getUTCMonth()
        }],
        [ua.time.format.utc("%b %d"), function (n) {
          return n.getUTCDate() != 1
        }],
        [ua.time.format.utc("%a %d"), function (n) {
          return n.getUTCDay() && n.getUTCDate() != 1
        }],
        [ua.time.format.utc("%I %p"), function (n) {
          return n.getUTCHours()
        }],
        [ua.time.format.utc("%I:%M"), function (n) {
          return n.getUTCMinutes()
        }],
        [ua.time.format.utc(":%S"), function (n) {
          return n.getUTCSeconds()
        }],
        [ua.time.format.utc(".%L"), function (n) {
          return n.getUTCMilliseconds()
        }]
      ],
      Ic = Gu(Uc);
    return Yc.year = function (n, t) {
      return Rc.domain(n.map(na)).ticks(t).map(Qu)
    }, ua.time.scale.utc = function () {
      return $u(ua.scale.linear(), Yc, Ic)
    }, ua.text = function () {
      return ua.xhr.apply(ua, arguments).response(ta)
    }, ua.json = function (n, t) {
      return ua.xhr(n, "application/json", t).response(ea)
    }, ua.html = function (n, t) {
      return ua.xhr(n, "text/html", t).response(ra)
    }, ua.xml = function () {
      return ua.xhr.apply(ua, arguments).response(ia)
    }, ua
  }();