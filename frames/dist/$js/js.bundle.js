/**
 * marked - a markdown parser
 * Copyright (c) 2011-2020, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */
!function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).marked = t();
}(this, function () {
  "use strict";

  function i(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }

  function s(e, t) {
    (null == t || t > e.length) && (t = e.length);

    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];

    return r;
  }

  function p(e, t) {
    var n;
    if ("undefined" != typeof Symbol && null != e[Symbol.iterator]) return (n = e[Symbol.iterator]()).next.bind(n);

    if (Array.isArray(e) || (n = function (e, t) {
      if (e) {
        if ("string" == typeof e) return s(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? s(e, t) : void 0;
      }
    }(e)) || t && e && "number" == typeof e.length) {
      n && (e = n);
      var r = 0;
      return function () {
        return r >= e.length ? {
          done: !0
        } : {
          done: !1,
          value: e[r++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function n(e) {
    return c[e];
  }

  var e,
      t = (function (t) {
    function e() {
      return {
        baseUrl: null,
        breaks: !1,
        gfm: !0,
        headerIds: !0,
        headerPrefix: "",
        highlight: null,
        langPrefix: "language-",
        mangle: !0,
        pedantic: !1,
        renderer: null,
        sanitize: !1,
        sanitizer: null,
        silent: !1,
        smartLists: !1,
        smartypants: !1,
        tokenizer: null,
        walkTokens: null,
        xhtml: !1
      };
    }

    t.exports = {
      defaults: e(),
      getDefaults: e,
      changeDefaults: function (e) {
        t.exports.defaults = e;
      }
    };
  }(e = {
    exports: {}
  }), e.exports),
      r = (t.defaults, t.getDefaults, t.changeDefaults, /[&<>"']/),
      l = /[&<>"']/g,
      a = /[<>"']|&(?!#?\w+;)/,
      o = /[<>"']|&(?!#?\w+;)/g,
      c = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  var u = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;

  function h(e) {
    return e.replace(u, function (e, t) {
      return "colon" === (t = t.toLowerCase()) ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : "";
    });
  }

  var g = /(^|[^\[])\^/g;
  var f = /[^\w:]/g,
      d = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
  var k = {},
      b = /^[^:]+:\/*[^/]*$/,
      m = /^([^:]+:)[\s\S]*$/,
      x = /^([^:]+:\/*[^/]*)[\s\S]*$/;

  function w(e, t) {
    k[" " + e] || (b.test(e) ? k[" " + e] = e + "/" : k[" " + e] = v(e, "/", !0));
    var n = -1 === (e = k[" " + e]).indexOf(":");
    return "//" === t.substring(0, 2) ? n ? t : e.replace(m, "$1") + t : "/" === t.charAt(0) ? n ? t : e.replace(x, "$1") + t : e + t;
  }

  function v(e, t, n) {
    var r = e.length;
    if (0 === r) return "";

    for (var i = 0; i < r;) {
      var s = e.charAt(r - i - 1);

      if (s !== t || n) {
        if (s === t || !n) break;
        i++;
      } else i++;
    }

    return e.substr(0, r - i);
  }

  var _ = function (e, t) {
    if (t) {
      if (r.test(e)) return e.replace(l, n);
    } else if (a.test(e)) return e.replace(o, n);

    return e;
  },
      y = h,
      z = function (n, e) {
    n = n.source || n, e = e || "";
    var r = {
      replace: function (e, t) {
        return t = (t = t.source || t).replace(g, "$1"), n = n.replace(e, t), r;
      },
      getRegex: function () {
        return new RegExp(n, e);
      }
    };
    return r;
  },
      S = function (e, t, n) {
    if (e) {
      var r;

      try {
        r = decodeURIComponent(h(n)).replace(f, "").toLowerCase();
      } catch (e) {
        return null;
      }

      if (0 === r.indexOf("javascript:") || 0 === r.indexOf("vbscript:") || 0 === r.indexOf("data:")) return null;
    }

    t && !d.test(n) && (n = w(t, n));

    try {
      n = encodeURI(n).replace(/%25/g, "%");
    } catch (e) {
      return null;
    }

    return n;
  },
      $ = {
    exec: function () {}
  },
      A = function (e) {
    for (var t, n, r = 1; r < arguments.length; r++) for (n in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);

    return e;
  },
      R = function (e, t) {
    var n = e.replace(/\|/g, function (e, t, n) {
      for (var r = !1, i = t; 0 <= --i && "\\" === n[i];) r = !r;

      return r ? "|" : " |";
    }).split(/ \|/),
        r = 0;
    if (n.length > t) n.splice(t);else for (; n.length < t;) n.push("");

    for (; r < n.length; r++) n[r] = n[r].trim().replace(/\\\|/g, "|");

    return n;
  },
      T = function (e, t) {
    if (-1 === e.indexOf(t[1])) return -1;

    for (var n = e.length, r = 0, i = 0; i < n; i++) if ("\\" === e[i]) i++;else if (e[i] === t[0]) r++;else if (e[i] === t[1] && --r < 0) return i;

    return -1;
  },
      I = function (e) {
    e && e.sanitize && !e.silent && console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
  },
      Z = function (e, t) {
    if (t < 1) return "";

    for (var n = ""; 1 < t;) 1 & t && (n += e), t >>= 1, e += e;

    return n + e;
  },
      q = t.defaults,
      O = v,
      C = R,
      U = _,
      j = T;

  function E(e, t, n) {
    var r = t.href,
        i = t.title ? U(t.title) : null,
        t = e[1].replace(/\\([\[\]])/g, "$1");
    return "!" !== e[0].charAt(0) ? {
      type: "link",
      raw: n,
      href: r,
      title: i,
      text: t
    } : {
      type: "image",
      raw: n,
      href: r,
      title: i,
      text: U(t)
    };
  }

  var D = function () {
    function e(e) {
      this.options = e || q;
    }

    var t = e.prototype;
    return t.space = function (e) {
      e = this.rules.block.newline.exec(e);
      if (e) return 1 < e[0].length ? {
        type: "space",
        raw: e[0]
      } : {
        raw: "\n"
      };
    }, t.code = function (e, t) {
      e = this.rules.block.code.exec(e);

      if (e) {
        t = t[t.length - 1];
        if (t && "paragraph" === t.type) return {
          raw: e[0],
          text: e[0].trimRight()
        };
        t = e[0].replace(/^ {4}/gm, "");
        return {
          type: "code",
          raw: e[0],
          codeBlockStyle: "indented",
          text: this.options.pedantic ? t : O(t, "\n")
        };
      }
    }, t.fences = function (e) {
      var t = this.rules.block.fences.exec(e);

      if (t) {
        var n = t[0],
            e = function (e, t) {
          if (null === (e = e.match(/^(\s+)(?:```)/))) return t;
          var n = e[1];
          return t.split("\n").map(function (e) {
            var t = e.match(/^\s+/);
            return null !== t && t[0].length >= n.length ? e.slice(n.length) : e;
          }).join("\n");
        }(n, t[3] || "");

        return {
          type: "code",
          raw: n,
          lang: t[2] && t[2].trim(),
          text: e
        };
      }
    }, t.heading = function (e) {
      var t = this.rules.block.heading.exec(e);

      if (t) {
        var n = t[2].trim();
        return /#$/.test(n) && (e = O(n, "#"), !this.options.pedantic && e && !/ $/.test(e) || (n = e.trim())), {
          type: "heading",
          raw: t[0],
          depth: t[1].length,
          text: n
        };
      }
    }, t.nptable = function (e) {
      e = this.rules.block.nptable.exec(e);

      if (e) {
        var t = {
          type: "table",
          header: C(e[1].replace(/^ *| *\| *$/g, "")),
          align: e[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
          cells: e[3] ? e[3].replace(/\n$/, "").split("\n") : [],
          raw: e[0]
        };

        if (t.header.length === t.align.length) {
          for (var n = t.align.length, r = 0; r < n; r++) /^ *-+: *$/.test(t.align[r]) ? t.align[r] = "right" : /^ *:-+: *$/.test(t.align[r]) ? t.align[r] = "center" : /^ *:-+ *$/.test(t.align[r]) ? t.align[r] = "left" : t.align[r] = null;

          for (n = t.cells.length, r = 0; r < n; r++) t.cells[r] = C(t.cells[r], t.header.length);

          return t;
        }
      }
    }, t.hr = function (e) {
      e = this.rules.block.hr.exec(e);
      if (e) return {
        type: "hr",
        raw: e[0]
      };
    }, t.blockquote = function (e) {
      var t = this.rules.block.blockquote.exec(e);

      if (t) {
        e = t[0].replace(/^ *> ?/gm, "");
        return {
          type: "blockquote",
          raw: t[0],
          text: e
        };
      }
    }, t.list = function (e) {
      e = this.rules.block.list.exec(e);

      if (e) {
        for (var t, n, r, i, s, l = e[0], a = e[2], o = 1 < a.length, c = {
          type: "list",
          raw: l,
          ordered: o,
          start: o ? +a.slice(0, -1) : "",
          loose: !1,
          items: []
        }, u = e[0].match(this.rules.block.item), p = !1, h = u.length, g = this.rules.block.listItemStart.exec(u[0]), f = 0; f < h; f++) {
          if (l = t = u[f], f !== h - 1) {
            if ((r = this.rules.block.listItemStart.exec(u[f + 1]))[1].length > g[0].length || 3 < r[1].length) {
              u.splice(f, 2, u[f] + "\n" + u[f + 1]), f--, h--;
              continue;
            }

            (!this.options.pedantic || this.options.smartLists ? r[2][r[2].length - 1] !== a[a.length - 1] : o == (1 === r[2].length)) && (n = u.slice(f + 1).join("\n"), c.raw = c.raw.substring(0, c.raw.length - n.length), f = h - 1), g = r;
          }

          r = t.length, ~(t = t.replace(/^ *([*+-]|\d+[.)]) ?/, "")).indexOf("\n ") && (r -= t.length, t = this.options.pedantic ? t.replace(/^ {1,4}/gm, "") : t.replace(new RegExp("^ {1," + r + "}", "gm"), "")), r = p || /\n\n(?!\s*$)/.test(t), f !== h - 1 && (p = "\n" === t.charAt(t.length - 1), r = r || p), r && (c.loose = !0), this.options.gfm && (s = void 0, (i = /^\[[ xX]\] /.test(t)) && (s = " " !== t[1], t = t.replace(/^\[[ xX]\] +/, ""))), c.items.push({
            type: "list_item",
            raw: l,
            task: i,
            checked: s,
            loose: r,
            text: t
          });
        }

        return c;
      }
    }, t.html = function (e) {
      e = this.rules.block.html.exec(e);
      if (e) return {
        type: this.options.sanitize ? "paragraph" : "html",
        raw: e[0],
        pre: !this.options.sanitizer && ("pre" === e[1] || "script" === e[1] || "style" === e[1]),
        text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(e[0]) : U(e[0]) : e[0]
      };
    }, t.def = function (e) {
      e = this.rules.block.def.exec(e);
      if (e) return e[3] && (e[3] = e[3].substring(1, e[3].length - 1)), {
        tag: e[1].toLowerCase().replace(/\s+/g, " "),
        raw: e[0],
        href: e[2],
        title: e[3]
      };
    }, t.table = function (e) {
      e = this.rules.block.table.exec(e);

      if (e) {
        var t = {
          type: "table",
          header: C(e[1].replace(/^ *| *\| *$/g, "")),
          align: e[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
          cells: e[3] ? e[3].replace(/\n$/, "").split("\n") : []
        };

        if (t.header.length === t.align.length) {
          t.raw = e[0];

          for (var n = t.align.length, r = 0; r < n; r++) /^ *-+: *$/.test(t.align[r]) ? t.align[r] = "right" : /^ *:-+: *$/.test(t.align[r]) ? t.align[r] = "center" : /^ *:-+ *$/.test(t.align[r]) ? t.align[r] = "left" : t.align[r] = null;

          for (n = t.cells.length, r = 0; r < n; r++) t.cells[r] = C(t.cells[r].replace(/^ *\| *| *\| *$/g, ""), t.header.length);

          return t;
        }
      }
    }, t.lheading = function (e) {
      e = this.rules.block.lheading.exec(e);
      if (e) return {
        type: "heading",
        raw: e[0],
        depth: "=" === e[2].charAt(0) ? 1 : 2,
        text: e[1]
      };
    }, t.paragraph = function (e) {
      e = this.rules.block.paragraph.exec(e);
      if (e) return {
        type: "paragraph",
        raw: e[0],
        text: "\n" === e[1].charAt(e[1].length - 1) ? e[1].slice(0, -1) : e[1]
      };
    }, t.text = function (e, t) {
      e = this.rules.block.text.exec(e);

      if (e) {
        t = t[t.length - 1];
        return t && "text" === t.type ? {
          raw: e[0],
          text: e[0]
        } : {
          type: "text",
          raw: e[0],
          text: e[0]
        };
      }
    }, t.escape = function (e) {
      e = this.rules.inline.escape.exec(e);
      if (e) return {
        type: "escape",
        raw: e[0],
        text: U(e[1])
      };
    }, t.tag = function (e, t, n) {
      e = this.rules.inline.tag.exec(e);
      if (e) return !t && /^<a /i.test(e[0]) ? t = !0 : t && /^<\/a>/i.test(e[0]) && (t = !1), !n && /^<(pre|code|kbd|script)(\s|>)/i.test(e[0]) ? n = !0 : n && /^<\/(pre|code|kbd|script)(\s|>)/i.test(e[0]) && (n = !1), {
        type: this.options.sanitize ? "text" : "html",
        raw: e[0],
        inLink: t,
        inRawBlock: n,
        text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(e[0]) : U(e[0]) : e[0]
      };
    }, t.link = function (e) {
      var t = this.rules.inline.link.exec(e);

      if (t) {
        var n = t[2].trim();

        if (!this.options.pedantic && /^</.test(n)) {
          if (!/>$/.test(n)) return;
          e = O(n.slice(0, -1), "\\");
          if ((n.length - e.length) % 2 == 0) return;
        } else {
          var r = j(t[2], "()");
          -1 < r && (s = (0 === t[0].indexOf("!") ? 5 : 4) + t[1].length + r, t[2] = t[2].substring(0, r), t[0] = t[0].substring(0, s).trim(), t[3] = "");
        }

        var i,
            r = t[2],
            s = "";
        return this.options.pedantic ? (i = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r), i && (r = i[1], s = i[3])) : s = t[3] ? t[3].slice(1, -1) : "", r = r.trim(), /^</.test(r) && (r = this.options.pedantic && !/>$/.test(n) ? r.slice(1) : r.slice(1, -1)), E(t, {
          href: r && r.replace(this.rules.inline._escapes, "$1"),
          title: s && s.replace(this.rules.inline._escapes, "$1")
        }, t[0]);
      }
    }, t.reflink = function (e, t) {
      if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
        e = (n[2] || n[1]).replace(/\s+/g, " ");
        if ((e = t[e.toLowerCase()]) && e.href) return E(n, e, n[0]);
        var n = n[0].charAt(0);
        return {
          type: "text",
          raw: n,
          text: n
        };
      }
    }, t.strong = function (e, t, n) {
      void 0 === n && (n = "");
      var r = this.rules.inline.strong.start.exec(e);

      if (r && (!r[1] || r[1] && ("" === n || this.rules.inline.punctuation.exec(n)))) {
        t = t.slice(-1 * e.length);
        var i,
            s = "**" === r[0] ? this.rules.inline.strong.endAst : this.rules.inline.strong.endUnd;

        for (s.lastIndex = 0; null != (r = s.exec(t));) if (i = this.rules.inline.strong.middle.exec(t.slice(0, r.index + 3))) return {
          type: "strong",
          raw: e.slice(0, i[0].length),
          text: e.slice(2, i[0].length - 2)
        };
      }
    }, t.em = function (e, t, n) {
      void 0 === n && (n = "");
      var r = this.rules.inline.em.start.exec(e);

      if (r && (!r[1] || r[1] && ("" === n || this.rules.inline.punctuation.exec(n)))) {
        t = t.slice(-1 * e.length);
        var i,
            s = "*" === r[0] ? this.rules.inline.em.endAst : this.rules.inline.em.endUnd;

        for (s.lastIndex = 0; null != (r = s.exec(t));) if (i = this.rules.inline.em.middle.exec(t.slice(0, r.index + 2))) return {
          type: "em",
          raw: e.slice(0, i[0].length),
          text: e.slice(1, i[0].length - 1)
        };
      }
    }, t.codespan = function (e) {
      var t = this.rules.inline.code.exec(e);

      if (t) {
        var n = t[2].replace(/\n/g, " "),
            r = /[^ ]/.test(n),
            e = /^ /.test(n) && / $/.test(n);
        return r && e && (n = n.substring(1, n.length - 1)), n = U(n, !0), {
          type: "codespan",
          raw: t[0],
          text: n
        };
      }
    }, t.br = function (e) {
      e = this.rules.inline.br.exec(e);
      if (e) return {
        type: "br",
        raw: e[0]
      };
    }, t.del = function (e) {
      e = this.rules.inline.del.exec(e);
      if (e) return {
        type: "del",
        raw: e[0],
        text: e[2]
      };
    }, t.autolink = function (e, t) {
      e = this.rules.inline.autolink.exec(e);

      if (e) {
        var n,
            t = "@" === e[2] ? "mailto:" + (n = U(this.options.mangle ? t(e[1]) : e[1])) : n = U(e[1]);
        return {
          type: "link",
          raw: e[0],
          text: n,
          href: t,
          tokens: [{
            type: "text",
            raw: n,
            text: n
          }]
        };
      }
    }, t.url = function (e, t) {
      var n, r, i, s;

      if (n = this.rules.inline.url.exec(e)) {
        if ("@" === n[2]) i = "mailto:" + (r = U(this.options.mangle ? t(n[0]) : n[0]));else {
          for (; s = n[0], n[0] = this.rules.inline._backpedal.exec(n[0])[0], s !== n[0];);

          r = U(n[0]), i = "www." === n[1] ? "http://" + r : r;
        }
        return {
          type: "link",
          raw: n[0],
          text: r,
          href: i,
          tokens: [{
            type: "text",
            raw: r,
            text: r
          }]
        };
      }
    }, t.inlineText = function (e, t, n) {
      e = this.rules.inline.text.exec(e);

      if (e) {
        n = t ? this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(e[0]) : U(e[0]) : e[0] : U(this.options.smartypants ? n(e[0]) : e[0]);
        return {
          type: "text",
          raw: e[0],
          text: n
        };
      }
    }, e;
  }(),
      R = $,
      T = z,
      $ = A,
      z = {
    newline: /^\n+/,
    code: /^( {4}[^\n]+\n*)+/,
    fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
    hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
    heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
    blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
    list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?! {0,3}bull )\n*|\s*$)/,
    html: "^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))",
    def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
    nptable: R,
    table: R,
    lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
    _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
    text: /^[^\n]+/,
    _label: /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,
    _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/
  };

  z.def = T(z.def).replace("label", z._label).replace("title", z._title).getRegex(), z.bullet = /(?:[*+-]|\d{1,9}[.)])/, z.item = /^( *)(bull) ?[^\n]*(?:\n(?! *bull ?)[^\n]*)*/, z.item = T(z.item, "gm").replace(/bull/g, z.bullet).getRegex(), z.listItemStart = T(/^( *)(bull)/).replace("bull", z.bullet).getRegex(), z.list = T(z.list).replace(/bull/g, z.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + z.def.source + ")").getRegex(), z._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", z._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/, z.html = T(z.html, "i").replace("comment", z._comment).replace("tag", z._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), z.paragraph = T(z._paragraph).replace("hr", z.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", z._tag).getRegex(), z.blockquote = T(z.blockquote).replace("paragraph", z.paragraph).getRegex(), z.normal = $({}, z), z.gfm = $({}, z.normal, {
    nptable: "^ *([^|\\n ].*\\|.*)\\n {0,3}([-:]+ *\\|[-| :]*)(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",
    table: "^ *\\|(.+)\\n {0,3}\\|?( *[-:]+[-| :]*)(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
  }), z.gfm.nptable = T(z.gfm.nptable).replace("hr", z.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", z._tag).getRegex(), z.gfm.table = T(z.gfm.table).replace("hr", z.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", z._tag).getRegex(), z.pedantic = $({}, z.normal, {
    html: T("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", z._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: R,
    paragraph: T(z.normal._paragraph).replace("hr", z.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", z.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
  });
  R = {
    escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
    url: R,
    tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
    link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
    reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
    nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
    reflinkSearch: "reflink|nolink(?!\\()",
    strong: {
      start: /^(?:(\*\*(?=[*punctuation]))|\*\*)(?![\s])|__/,
      middle: /^\*\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*\*$|^__(?![\s])((?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?)__$/,
      endAst: /[^punctuation\s]\*\*(?!\*)|[punctuation]\*\*(?!\*)(?:(?=[punctuation_\s]|$))/,
      endUnd: /[^\s]__(?!_)(?:(?=[punctuation*\s])|$)/
    },
    em: {
      start: /^(?:(\*(?=[punctuation]))|\*)(?![*\s])|_/,
      middle: /^\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*$|^_(?![_\s])(?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?_$/,
      endAst: /[^punctuation\s]\*(?!\*)|[punctuation]\*(?!\*)(?:(?=[punctuation_\s]|$))/,
      endUnd: /[^\s]_(?!_)(?:(?=[punctuation*\s])|$)/
    },
    code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
    br: /^( {2,}|\\)\n(?!\s*$)/,
    del: R,
    text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n)))/,
    punctuation: /^([\s*punctuation])/,
    _punctuation: "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~"
  };
  R.punctuation = T(R.punctuation).replace(/punctuation/g, R._punctuation).getRegex(), R._blockSkip = "\\[[^\\]]*?\\]\\([^\\)]*?\\)|`[^`]*?`|<[^>]*?>", R._overlapSkip = "__[^_]*?__|\\*\\*\\[^\\*\\]*?\\*\\*", R._comment = T(z._comment).replace("(?:--\x3e|$)", "--\x3e").getRegex(), R.em.start = T(R.em.start).replace(/punctuation/g, R._punctuation).getRegex(), R.em.middle = T(R.em.middle).replace(/punctuation/g, R._punctuation).replace(/overlapSkip/g, R._overlapSkip).getRegex(), R.em.endAst = T(R.em.endAst, "g").replace(/punctuation/g, R._punctuation).getRegex(), R.em.endUnd = T(R.em.endUnd, "g").replace(/punctuation/g, R._punctuation).getRegex(), R.strong.start = T(R.strong.start).replace(/punctuation/g, R._punctuation).getRegex(), R.strong.middle = T(R.strong.middle).replace(/punctuation/g, R._punctuation).replace(/overlapSkip/g, R._overlapSkip).getRegex(), R.strong.endAst = T(R.strong.endAst, "g").replace(/punctuation/g, R._punctuation).getRegex(), R.strong.endUnd = T(R.strong.endUnd, "g").replace(/punctuation/g, R._punctuation).getRegex(), R.blockSkip = T(R._blockSkip, "g").getRegex(), R.overlapSkip = T(R._overlapSkip, "g").getRegex(), R._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g, R._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/, R._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/, R.autolink = T(R.autolink).replace("scheme", R._scheme).replace("email", R._email).getRegex(), R._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/, R.tag = T(R.tag).replace("comment", R._comment).replace("attribute", R._attribute).getRegex(), R._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, R._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/, R._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/, R.link = T(R.link).replace("label", R._label).replace("href", R._href).replace("title", R._title).getRegex(), R.reflink = T(R.reflink).replace("label", R._label).getRegex(), R.reflinkSearch = T(R.reflinkSearch, "g").replace("reflink", R.reflink).replace("nolink", R.nolink).getRegex(), R.normal = $({}, R), R.pedantic = $({}, R.normal, {
    strong: {
      start: /^__|\*\*/,
      middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
      endAst: /\*\*(?!\*)/g,
      endUnd: /__(?!_)/g
    },
    em: {
      start: /^_|\*/,
      middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
      endAst: /\*(?!\*)/g,
      endUnd: /_(?!_)/g
    },
    link: T(/^!?\[(label)\]\((.*?)\)/).replace("label", R._label).getRegex(),
    reflink: T(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", R._label).getRegex()
  }), R.gfm = $({}, R.normal, {
    escape: T(R.escape).replace("])", "~|])").getRegex(),
    _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
    _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
  }), R.gfm.url = T(R.gfm.url, "i").replace("email", R.gfm._extended_email).getRegex(), R.breaks = $({}, R.gfm, {
    br: T(R.br).replace("{2,}", "*").getRegex(),
    text: T(R.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
  });
  var R = {
    block: z,
    inline: R
  },
      P = t.defaults,
      L = R.block,
      N = R.inline,
      B = Z;

  function F(e) {
    return e.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…");
  }

  function M(e) {
    for (var t, n = "", r = e.length, i = 0; i < r; i++) t = e.charCodeAt(i), .5 < Math.random() && (t = "x" + t.toString(16)), n += "&#" + t + ";";

    return n;
  }

  var X = function () {
    function n(e) {
      this.tokens = [], this.tokens.links = Object.create(null), this.options = e || P, this.options.tokenizer = this.options.tokenizer || new D(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options;
      e = {
        block: L.normal,
        inline: N.normal
      };
      this.options.pedantic ? (e.block = L.pedantic, e.inline = N.pedantic) : this.options.gfm && (e.block = L.gfm, this.options.breaks ? e.inline = N.breaks : e.inline = N.gfm), this.tokenizer.rules = e;
    }

    n.lex = function (e, t) {
      return new n(t).lex(e);
    }, n.lexInline = function (e, t) {
      return new n(t).inlineTokens(e);
    };
    var e,
        t,
        r = n.prototype;
    return r.lex = function (e) {
      return e = e.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    "), this.blockTokens(e, this.tokens, !0), this.inline(this.tokens), this.tokens;
    }, r.blockTokens = function (e, t, n) {
      var r, i, s, l;

      for (void 0 === t && (t = []), void 0 === n && (n = !0), e = e.replace(/^ +$/gm, ""); e;) if (r = this.tokenizer.space(e)) e = e.substring(r.raw.length), r.type && t.push(r);else if (r = this.tokenizer.code(e, t)) e = e.substring(r.raw.length), r.type ? t.push(r) : ((l = t[t.length - 1]).raw += "\n" + r.raw, l.text += "\n" + r.text);else if (r = this.tokenizer.fences(e)) e = e.substring(r.raw.length), t.push(r);else if (r = this.tokenizer.heading(e)) e = e.substring(r.raw.length), t.push(r);else if (r = this.tokenizer.nptable(e)) e = e.substring(r.raw.length), t.push(r);else if (r = this.tokenizer.hr(e)) e = e.substring(r.raw.length), t.push(r);else if (r = this.tokenizer.blockquote(e)) e = e.substring(r.raw.length), r.tokens = this.blockTokens(r.text, [], n), t.push(r);else if (r = this.tokenizer.list(e)) {
        for (e = e.substring(r.raw.length), s = r.items.length, i = 0; i < s; i++) r.items[i].tokens = this.blockTokens(r.items[i].text, [], !1);

        t.push(r);
      } else if (r = this.tokenizer.html(e)) e = e.substring(r.raw.length), t.push(r);else if (n && (r = this.tokenizer.def(e))) e = e.substring(r.raw.length), this.tokens.links[r.tag] || (this.tokens.links[r.tag] = {
        href: r.href,
        title: r.title
      });else if (r = this.tokenizer.table(e)) e = e.substring(r.raw.length), t.push(r);else if (r = this.tokenizer.lheading(e)) e = e.substring(r.raw.length), t.push(r);else if (n && (r = this.tokenizer.paragraph(e))) e = e.substring(r.raw.length), t.push(r);else if (r = this.tokenizer.text(e, t)) e = e.substring(r.raw.length), r.type ? t.push(r) : ((l = t[t.length - 1]).raw += "\n" + r.raw, l.text += "\n" + r.text);else if (e) {
        var a = "Infinite loop on byte: " + e.charCodeAt(0);

        if (this.options.silent) {
          console.error(a);
          break;
        }

        throw new Error(a);
      }

      return t;
    }, r.inline = function (e) {
      for (var t, n, r, i, s, l = e.length, a = 0; a < l; a++) switch ((s = e[a]).type) {
        case "paragraph":
        case "text":
        case "heading":
          s.tokens = [], this.inlineTokens(s.text, s.tokens);
          break;

        case "table":
          for (s.tokens = {
            header: [],
            cells: []
          }, r = s.header.length, t = 0; t < r; t++) s.tokens.header[t] = [], this.inlineTokens(s.header[t], s.tokens.header[t]);

          for (r = s.cells.length, t = 0; t < r; t++) for (i = s.cells[t], s.tokens.cells[t] = [], n = 0; n < i.length; n++) s.tokens.cells[t][n] = [], this.inlineTokens(i[n], s.tokens.cells[t][n]);

          break;

        case "blockquote":
          this.inline(s.tokens);
          break;

        case "list":
          for (r = s.items.length, t = 0; t < r; t++) this.inline(s.items[t].tokens);

      }

      return e;
    }, r.inlineTokens = function (e, t, n, r) {
      var i;
      void 0 === t && (t = []), void 0 === n && (n = !1), void 0 === r && (r = !1);
      var s,
          l,
          a,
          o = e;

      if (this.tokens.links) {
        var c = Object.keys(this.tokens.links);
        if (0 < c.length) for (; null != (s = this.tokenizer.rules.inline.reflinkSearch.exec(o));) c.includes(s[0].slice(s[0].lastIndexOf("[") + 1, -1)) && (o = o.slice(0, s.index) + "[" + B("a", s[0].length - 2) + "]" + o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
      }

      for (; null != (s = this.tokenizer.rules.inline.blockSkip.exec(o));) o = o.slice(0, s.index) + "[" + B("a", s[0].length - 2) + "]" + o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);

      for (; e;) if (l || (a = ""), l = !1, i = this.tokenizer.escape(e)) e = e.substring(i.raw.length), t.push(i);else if (i = this.tokenizer.tag(e, n, r)) e = e.substring(i.raw.length), n = i.inLink, r = i.inRawBlock, t.push(i);else if (i = this.tokenizer.link(e)) e = e.substring(i.raw.length), "link" === i.type && (i.tokens = this.inlineTokens(i.text, [], !0, r)), t.push(i);else if (i = this.tokenizer.reflink(e, this.tokens.links)) e = e.substring(i.raw.length), "link" === i.type && (i.tokens = this.inlineTokens(i.text, [], !0, r)), t.push(i);else if (i = this.tokenizer.strong(e, o, a)) e = e.substring(i.raw.length), i.tokens = this.inlineTokens(i.text, [], n, r), t.push(i);else if (i = this.tokenizer.em(e, o, a)) e = e.substring(i.raw.length), i.tokens = this.inlineTokens(i.text, [], n, r), t.push(i);else if (i = this.tokenizer.codespan(e)) e = e.substring(i.raw.length), t.push(i);else if (i = this.tokenizer.br(e)) e = e.substring(i.raw.length), t.push(i);else if (i = this.tokenizer.del(e)) e = e.substring(i.raw.length), i.tokens = this.inlineTokens(i.text, [], n, r), t.push(i);else if (i = this.tokenizer.autolink(e, M)) e = e.substring(i.raw.length), t.push(i);else if (n || !(i = this.tokenizer.url(e, M))) {
        if (i = this.tokenizer.inlineText(e, r, F)) e = e.substring(i.raw.length), a = i.raw.slice(-1), l = !0, t.push(i);else if (e) {
          var u = "Infinite loop on byte: " + e.charCodeAt(0);

          if (this.options.silent) {
            console.error(u);
            break;
          }

          throw new Error(u);
        }
      } else e = e.substring(i.raw.length), t.push(i);

      return t;
    }, e = n, t = [{
      key: "rules",
      get: function () {
        return {
          block: L,
          inline: N
        };
      }
    }], (r = null) && i(e.prototype, r), t && i(e, t), n;
  }(),
      G = t.defaults,
      V = S,
      H = _,
      J = function () {
    function e(e) {
      this.options = e || G;
    }

    var t = e.prototype;
    return t.code = function (e, t, n) {
      var r = (t || "").match(/\S*/)[0];
      return !this.options.highlight || null != (t = this.options.highlight(e, r)) && t !== e && (n = !0, e = t), r ? '<pre><code class="' + this.options.langPrefix + H(r, !0) + '">' + (n ? e : H(e, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? e : H(e, !0)) + "</code></pre>\n";
    }, t.blockquote = function (e) {
      return "<blockquote>\n" + e + "</blockquote>\n";
    }, t.html = function (e) {
      return e;
    }, t.heading = function (e, t, n, r) {
      return this.options.headerIds ? "<h" + t + ' id="' + this.options.headerPrefix + r.slug(n) + '">' + e + "</h" + t + ">\n" : "<h" + t + ">" + e + "</h" + t + ">\n";
    }, t.hr = function () {
      return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
    }, t.list = function (e, t, n) {
      var r = t ? "ol" : "ul";
      return "<" + r + (t && 1 !== n ? ' start="' + n + '"' : "") + ">\n" + e + "</" + r + ">\n";
    }, t.listitem = function (e) {
      return "<li>" + e + "</li>\n";
    }, t.checkbox = function (e) {
      return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
    }, t.paragraph = function (e) {
      return "<p>" + e + "</p>\n";
    }, t.table = function (e, t) {
      return "<table>\n<thead>\n" + e + "</thead>\n" + (t = t && "<tbody>" + t + "</tbody>") + "</table>\n";
    }, t.tablerow = function (e) {
      return "<tr>\n" + e + "</tr>\n";
    }, t.tablecell = function (e, t) {
      var n = t.header ? "th" : "td";
      return (t.align ? "<" + n + ' align="' + t.align + '">' : "<" + n + ">") + e + "</" + n + ">\n";
    }, t.strong = function (e) {
      return "<strong>" + e + "</strong>";
    }, t.em = function (e) {
      return "<em>" + e + "</em>";
    }, t.codespan = function (e) {
      return "<code>" + e + "</code>";
    }, t.br = function () {
      return this.options.xhtml ? "<br/>" : "<br>";
    }, t.del = function (e) {
      return "<del>" + e + "</del>";
    }, t.link = function (e, t, n) {
      if (null === (e = V(this.options.sanitize, this.options.baseUrl, e))) return n;
      e = '<a href="' + H(e) + '"';
      return t && (e += ' title="' + t + '"'), e += ">" + n + "</a>";
    }, t.image = function (e, t, n) {
      if (null === (e = V(this.options.sanitize, this.options.baseUrl, e))) return n;
      n = '<img src="' + e + '" alt="' + n + '"';
      return t && (n += ' title="' + t + '"'), n += this.options.xhtml ? "/>" : ">";
    }, t.text = function (e) {
      return e;
    }, e;
  }(),
      K = function () {
    function e() {}

    var t = e.prototype;
    return t.strong = function (e) {
      return e;
    }, t.em = function (e) {
      return e;
    }, t.codespan = function (e) {
      return e;
    }, t.del = function (e) {
      return e;
    }, t.html = function (e) {
      return e;
    }, t.text = function (e) {
      return e;
    }, t.link = function (e, t, n) {
      return "" + n;
    }, t.image = function (e, t, n) {
      return "" + n;
    }, t.br = function () {
      return "";
    }, e;
  }(),
      Q = function () {
    function e() {
      this.seen = {};
    }

    var t = e.prototype;
    return t.serialize = function (e) {
      return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
    }, t.getNextSafeSlug = function (e, t) {
      var n = e,
          r = 0;
      if (this.seen.hasOwnProperty(n)) for (r = this.seen[e]; n = e + "-" + ++r, this.seen.hasOwnProperty(n););
      return t || (this.seen[e] = r, this.seen[n] = 0), n;
    }, t.slug = function (e, t) {
      void 0 === t && (t = {});
      var n = this.serialize(e);
      return this.getNextSafeSlug(n, t.dryrun);
    }, e;
  }(),
      W = t.defaults,
      Y = y,
      ee = function () {
    function n(e) {
      this.options = e || W, this.options.renderer = this.options.renderer || new J(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new K(), this.slugger = new Q();
    }

    n.parse = function (e, t) {
      return new n(t).parse(e);
    }, n.parseInline = function (e, t) {
      return new n(t).parseInline(e);
    };
    var e = n.prototype;
    return e.parse = function (e, t) {
      void 0 === t && (t = !0);

      for (var n, r, i, s, l, a, o, c, u, p, h, g, f, d, k, b = "", m = e.length, x = 0; x < m; x++) switch ((c = e[x]).type) {
        case "space":
          continue;

        case "hr":
          b += this.renderer.hr();
          continue;

        case "heading":
          b += this.renderer.heading(this.parseInline(c.tokens), c.depth, Y(this.parseInline(c.tokens, this.textRenderer)), this.slugger);
          continue;

        case "code":
          b += this.renderer.code(c.text, c.lang, c.escaped);
          continue;

        case "table":
          for (a = u = "", i = c.header.length, n = 0; n < i; n++) a += this.renderer.tablecell(this.parseInline(c.tokens.header[n]), {
            header: !0,
            align: c.align[n]
          });

          for (u += this.renderer.tablerow(a), o = "", i = c.cells.length, n = 0; n < i; n++) {
            for (a = "", s = (l = c.tokens.cells[n]).length, r = 0; r < s; r++) a += this.renderer.tablecell(this.parseInline(l[r]), {
              header: !1,
              align: c.align[r]
            });

            o += this.renderer.tablerow(a);
          }

          b += this.renderer.table(u, o);
          continue;

        case "blockquote":
          o = this.parse(c.tokens), b += this.renderer.blockquote(o);
          continue;

        case "list":
          for (u = c.ordered, w = c.start, p = c.loose, i = c.items.length, o = "", n = 0; n < i; n++) f = (g = c.items[n]).checked, d = g.task, h = "", g.task && (k = this.renderer.checkbox(f), p ? 0 < g.tokens.length && "text" === g.tokens[0].type ? (g.tokens[0].text = k + " " + g.tokens[0].text, g.tokens[0].tokens && 0 < g.tokens[0].tokens.length && "text" === g.tokens[0].tokens[0].type && (g.tokens[0].tokens[0].text = k + " " + g.tokens[0].tokens[0].text)) : g.tokens.unshift({
            type: "text",
            text: k
          }) : h += k), h += this.parse(g.tokens, p), o += this.renderer.listitem(h, d, f);

          b += this.renderer.list(o, u, w);
          continue;

        case "html":
          b += this.renderer.html(c.text);
          continue;

        case "paragraph":
          b += this.renderer.paragraph(this.parseInline(c.tokens));
          continue;

        case "text":
          for (o = c.tokens ? this.parseInline(c.tokens) : c.text; x + 1 < m && "text" === e[x + 1].type;) o += "\n" + ((c = e[++x]).tokens ? this.parseInline(c.tokens) : c.text);

          b += t ? this.renderer.paragraph(o) : o;
          continue;

        default:
          var w = 'Token with "' + c.type + '" type was not found.';
          if (this.options.silent) return void console.error(w);
          throw new Error(w);
      }

      return b;
    }, e.parseInline = function (e, t) {
      t = t || this.renderer;

      for (var n, r = "", i = e.length, s = 0; s < i; s++) switch ((n = e[s]).type) {
        case "escape":
          r += t.text(n.text);
          break;

        case "html":
          r += t.html(n.text);
          break;

        case "link":
          r += t.link(n.href, n.title, this.parseInline(n.tokens, t));
          break;

        case "image":
          r += t.image(n.href, n.title, n.text);
          break;

        case "strong":
          r += t.strong(this.parseInline(n.tokens, t));
          break;

        case "em":
          r += t.em(this.parseInline(n.tokens, t));
          break;

        case "codespan":
          r += t.codespan(n.text);
          break;

        case "br":
          r += t.br();
          break;

        case "del":
          r += t.del(this.parseInline(n.tokens, t));
          break;

        case "text":
          r += t.text(n.text);
          break;

        default:
          var l = 'Token with "' + n.type + '" type was not found.';
          if (this.options.silent) return void console.error(l);
          throw new Error(l);
      }

      return r;
    }, n;
  }(),
      te = A,
      ne = I,
      re = _,
      _ = t.getDefaults,
      ie = t.changeDefaults,
      t = t.defaults;

  function se(e, n, r) {
    if (null == e) throw new Error("marked(): input parameter is undefined or null");
    if ("string" != typeof e) throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected");

    if ("function" == typeof n && (r = n, n = null), n = te({}, se.defaults, n || {}), ne(n), r) {
      var i,
          s = n.highlight;

      try {
        i = X.lex(e, n);
      } catch (e) {
        return r(e);
      }

      var l = function (t) {
        var e;
        if (!t) try {
          e = ee.parse(i, n);
        } catch (e) {
          t = e;
        }
        return n.highlight = s, t ? r(t) : r(null, e);
      };

      if (!s || s.length < 3) return l();
      if (delete n.highlight, !i.length) return l();
      var a = 0;
      return se.walkTokens(i, function (n) {
        "code" === n.type && (a++, setTimeout(function () {
          s(n.text, n.lang, function (e, t) {
            return e ? l(e) : (null != t && t !== n.text && (n.text = t, n.escaped = !0), void (0 === --a && l()));
          });
        }, 0));
      }), void (0 === a && l());
    }

    try {
      var t = X.lex(e, n);
      return n.walkTokens && se.walkTokens(t, n.walkTokens), ee.parse(t, n);
    } catch (e) {
      if (e.message += "\nPlease report this to https://github.com/markedjs/marked.", n.silent) return "<p>An error occurred:</p><pre>" + re(e.message + "", !0) + "</pre>";
      throw e;
    }
  }

  return se.options = se.setOptions = function (e) {
    return te(se.defaults, e), ie(se.defaults), se;
  }, se.getDefaults = _, se.defaults = t, se.use = function (a) {
    var t,
        n = te({}, a);
    a.renderer && function () {
      var e,
          l = se.defaults.renderer || new J();

      for (e in a.renderer) !function (i) {
        var s = l[i];

        l[i] = function () {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];

          var r = a.renderer[i].apply(l, t);
          return !1 === r && (r = s.apply(l, t)), r;
        };
      }(e);

      n.renderer = l;
    }(), a.tokenizer && function () {
      var e,
          l = se.defaults.tokenizer || new D();

      for (e in a.tokenizer) !function (i) {
        var s = l[i];

        l[i] = function () {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];

          var r = a.tokenizer[i].apply(l, t);
          return !1 === r && (r = s.apply(l, t)), r;
        };
      }(e);

      n.tokenizer = l;
    }(), a.walkTokens && (t = se.defaults.walkTokens, n.walkTokens = function (e) {
      a.walkTokens(e), t && t(e);
    }), se.setOptions(n);
  }, se.walkTokens = function (e, t) {
    for (var n, r = p(e); !(n = r()).done;) {
      var i = n.value;

      switch (t(i), i.type) {
        case "table":
          for (var s = p(i.tokens.header); !(l = s()).done;) {
            var l = l.value;
            se.walkTokens(l, t);
          }

          for (var a, o = p(i.tokens.cells); !(a = o()).done;) for (var c = p(a.value); !(u = c()).done;) {
            var u = u.value;
            se.walkTokens(u, t);
          }

          break;

        case "list":
          se.walkTokens(i.items, t);
          break;

        default:
          i.tokens && se.walkTokens(i.tokens, t);
      }
    }
  }, se.parseInline = function (e, t) {
    if (null == e) throw new Error("marked.parseInline(): input parameter is undefined or null");
    if ("string" != typeof e) throw new Error("marked.parseInline(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected");
    t = te({}, se.defaults, t || {}), ne(t);

    try {
      var n = X.lexInline(e, t);
      return t.walkTokens && se.walkTokens(n, t.walkTokens), ee.parseInline(n, t);
    } catch (e) {
      if (e.message += "\nPlease report this to https://github.com/markedjs/marked.", t.silent) return "<p>An error occurred:</p><pre>" + re(e.message + "", !0) + "</pre>";
      throw e;
    }
  }, se.Parser = ee, se.parser = ee.parse, se.Renderer = J, se.TextRenderer = K, se.Lexer = X, se.lexer = X.lex, se.Tokenizer = D, se.Slugger = Q, se.parse = se;
});
/*
  Highlight.js 10.5.0 (af20048d)
  License: BSD-3-Clause
  Copyright (c) 2006-2020, Ivan Sagalaev
*/

var hljs = function () {
  "use strict";

  function e(n) {
    return n instanceof Map ? n.clear = n.delete = n.set = () => {
      throw Error("map is read-only");
    } : n instanceof Set && (n.add = n.clear = n.delete = () => {
      throw Error("set is read-only");
    }), Object.freeze(n), Object.getOwnPropertyNames(n).forEach(t => {
      var a = n[t];
      "object" != typeof a || Object.isFrozen(a) || e(a);
    }), n;
  }

  var n = e,
      t = e;
  n.default = t;

  class a {
    constructor(e) {
      void 0 === e.data && (e.data = {}), this.data = e.data;
    }

    ignoreMatch() {
      this.ignore = !0;
    }

  }

  function s(e) {
    return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
  }

  function i(e, ...n) {
    const t = Object.create(null);

    for (const n in e) t[n] = e[n];

    return n.forEach(e => {
      for (const n in e) t[n] = e[n];
    }), t;
  }

  const r = e => !!e.kind;

  class l {
    constructor(e, n) {
      this.buffer = "", this.classPrefix = n.classPrefix, e.walk(this);
    }

    addText(e) {
      this.buffer += s(e);
    }

    openNode(e) {
      if (!r(e)) return;
      let n = e.kind;
      e.sublanguage || (n = `${this.classPrefix}${n}`), this.span(n);
    }

    closeNode(e) {
      r(e) && (this.buffer += "</span>");
    }

    value() {
      return this.buffer;
    }

    span(e) {
      this.buffer += `<span class="${e}">`;
    }

  }

  class o {
    constructor() {
      this.rootNode = {
        children: []
      }, this.stack = [this.rootNode];
    }

    get top() {
      return this.stack[this.stack.length - 1];
    }

    get root() {
      return this.rootNode;
    }

    add(e) {
      this.top.children.push(e);
    }

    openNode(e) {
      const n = {
        kind: e,
        children: []
      };
      this.add(n), this.stack.push(n);
    }

    closeNode() {
      if (this.stack.length > 1) return this.stack.pop();
    }

    closeAllNodes() {
      for (; this.closeNode(););
    }

    toJSON() {
      return JSON.stringify(this.rootNode, null, 4);
    }

    walk(e) {
      return this.constructor._walk(e, this.rootNode);
    }

    static _walk(e, n) {
      return "string" == typeof n ? e.addText(n) : n.children && (e.openNode(n), n.children.forEach(n => this._walk(e, n)), e.closeNode(n)), e;
    }

    static _collapse(e) {
      "string" != typeof e && e.children && (e.children.every(e => "string" == typeof e) ? e.children = [e.children.join("")] : e.children.forEach(e => {
        o._collapse(e);
      }));
    }

  }

  class c extends o {
    constructor(e) {
      super(), this.options = e;
    }

    addKeyword(e, n) {
      "" !== e && (this.openNode(n), this.addText(e), this.closeNode());
    }

    addText(e) {
      "" !== e && this.add(e);
    }

    addSublanguage(e, n) {
      const t = e.root;
      t.kind = n, t.sublanguage = !0, this.add(t);
    }

    toHTML() {
      return new l(this, this.options).value();
    }

    finalize() {
      return !0;
    }

  }

  function g(e) {
    return e ? "string" == typeof e ? e : e.source : null;
  }

  const u = "[a-zA-Z]\\w*",
        d = "[a-zA-Z_]\\w*",
        h = "\\b\\d+(\\.\\d+)?",
        b = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",
        f = "\\b(0b[01]+)",
        m = {
    begin: "\\\\[\\s\\S]",
    relevance: 0
  },
        p = {
    className: "string",
    begin: "'",
    end: "'",
    illegal: "\\n",
    contains: [m]
  },
        E = {
    className: "string",
    begin: '"',
    end: '"',
    illegal: "\\n",
    contains: [m]
  },
        _ = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  },
        N = (e, n, t = {}) => {
    const a = i({
      className: "comment",
      begin: e,
      end: n,
      contains: []
    }, t);
    return a.contains.push(_), a.contains.push({
      className: "doctag",
      begin: "(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):",
      relevance: 0
    }), a;
  },
        x = N("//", "$"),
        v = N("/\\*", "\\*/"),
        y = N("#", "$");

  var O = Object.freeze({
    __proto__: null,
    IDENT_RE: u,
    UNDERSCORE_IDENT_RE: d,
    NUMBER_RE: h,
    C_NUMBER_RE: b,
    BINARY_NUMBER_RE: f,
    RE_STARTERS_RE: "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
    SHEBANG: (e = {}) => {
      const n = /^#![ ]*\//;
      return e.binary && (e.begin = ((...e) => e.map(e => g(e)).join(""))(n, /.*\b/, e.binary, /\b.*/)), i({
        className: "meta",
        begin: n,
        end: /$/,
        relevance: 0,
        "on:begin": (e, n) => {
          0 !== e.index && n.ignoreMatch();
        }
      }, e);
    },
    BACKSLASH_ESCAPE: m,
    APOS_STRING_MODE: p,
    QUOTE_STRING_MODE: E,
    PHRASAL_WORDS_MODE: _,
    COMMENT: N,
    C_LINE_COMMENT_MODE: x,
    C_BLOCK_COMMENT_MODE: v,
    HASH_COMMENT_MODE: y,
    NUMBER_MODE: {
      className: "number",
      begin: h,
      relevance: 0
    },
    C_NUMBER_MODE: {
      className: "number",
      begin: b,
      relevance: 0
    },
    BINARY_NUMBER_MODE: {
      className: "number",
      begin: f,
      relevance: 0
    },
    CSS_NUMBER_MODE: {
      className: "number",
      begin: h + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
      relevance: 0
    },
    REGEXP_MODE: {
      begin: /(?=\/[^\/\n]*\/)/,
      contains: [{
        className: "regexp",
        begin: /\//,
        end: /\/[gimuy]*/,
        illegal: /\n/,
        contains: [m, {
          begin: /\[/,
          end: /\]/,
          relevance: 0,
          contains: [m]
        }]
      }]
    },
    TITLE_MODE: {
      className: "title",
      begin: u,
      relevance: 0
    },
    UNDERSCORE_TITLE_MODE: {
      className: "title",
      begin: d,
      relevance: 0
    },
    METHOD_GUARD: {
      begin: "\\.\\s*[a-zA-Z_]\\w*",
      relevance: 0
    },
    END_SAME_AS_BEGIN: e => Object.assign(e, {
      "on:begin": (e, n) => {
        n.data._beginMatch = e[1];
      },
      "on:end": (e, n) => {
        n.data._beginMatch !== e[1] && n.ignoreMatch();
      }
    })
  });

  function R(e, n) {
    "." === e.input[e.index - 1] && n.ignoreMatch();
  }

  function w(e, n) {
    n && e.beginKeywords && (e.begin = "\\b(" + e.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", e.__beforeBegin = R, e.keywords = e.keywords || e.beginKeywords, delete e.beginKeywords);
  }

  function M(e, n) {
    Array.isArray(e.illegal) && (e.illegal = ((...e) => "(" + e.map(e => g(e)).join("|") + ")")(...e.illegal));
  }

  function A(e, n) {
    if (e.match) {
      if (e.begin || e.end) throw Error("begin & end are not supported with match");
      e.begin = e.match, delete e.match;
    }
  }

  function S(e, n) {
    void 0 === e.relevance && (e.relevance = 1);
  }

  const T = ["of", "and", "for", "in", "not", "or", "if", "then", "parent", "list", "value"];

  function k(e, n) {
    return n ? Number(n) : (e => T.includes(e.toLowerCase()))(e) ? 0 : 1;
  }

  function I(e, {
    plugins: n
  }) {
    function t(n, t) {
      return RegExp(g(n), "m" + (e.case_insensitive ? "i" : "") + (t ? "g" : ""));
    }

    class a {
      constructor() {
        this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
      }

      addRule(e, n) {
        n.position = this.position++, this.matchIndexes[this.matchAt] = n, this.regexes.push([n, e]), this.matchAt += (e => RegExp(e.toString() + "|").exec("").length - 1)(e) + 1;
      }

      compile() {
        0 === this.regexes.length && (this.exec = () => null);
        const e = this.regexes.map(e => e[1]);
        this.matcherRe = t(((e, n = "|") => {
          const t = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
          let a = 0,
              s = "";

          for (let i = 0; i < e.length; i++) {
            const r = a += 1;
            let l = g(e[i]);

            for (i > 0 && (s += n), s += "("; l.length > 0;) {
              const e = t.exec(l);

              if (null == e) {
                s += l;
                break;
              }

              s += l.substring(0, e.index), l = l.substring(e.index + e[0].length), "\\" === e[0][0] && e[1] ? s += "\\" + (Number(e[1]) + r) : (s += e[0], "(" === e[0] && a++);
            }

            s += ")";
          }

          return s;
        })(e), !0), this.lastIndex = 0;
      }

      exec(e) {
        this.matcherRe.lastIndex = this.lastIndex;
        const n = this.matcherRe.exec(e);
        if (!n) return null;
        const t = n.findIndex((e, n) => n > 0 && void 0 !== e),
              a = this.matchIndexes[t];
        return n.splice(0, t), Object.assign(n, a);
      }

    }

    class s {
      constructor() {
        this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
      }

      getMatcher(e) {
        if (this.multiRegexes[e]) return this.multiRegexes[e];
        const n = new a();
        return this.rules.slice(e).forEach(([e, t]) => n.addRule(e, t)), n.compile(), this.multiRegexes[e] = n, n;
      }

      resumingScanAtSamePosition() {
        return 0 !== this.regexIndex;
      }

      considerAll() {
        this.regexIndex = 0;
      }

      addRule(e, n) {
        this.rules.push([e, n]), "begin" === n.type && this.count++;
      }

      exec(e) {
        const n = this.getMatcher(this.regexIndex);
        n.lastIndex = this.lastIndex;
        let t = n.exec(e);
        if (this.resumingScanAtSamePosition()) if (t && t.index === this.lastIndex) ;else {
          const n = this.getMatcher(0);
          n.lastIndex = this.lastIndex + 1, t = n.exec(e);
        }
        return t && (this.regexIndex += t.position + 1, this.regexIndex === this.count && this.considerAll()), t;
      }

    }

    if (e.compilerExtensions || (e.compilerExtensions = []), e.contains && e.contains.includes("self")) throw Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
    return e.classNameAliases = i(e.classNameAliases || {}), function n(a, r) {
      const l = a;
      if (a.compiled) return l;
      [A].forEach(e => e(a, r)), e.compilerExtensions.forEach(e => e(a, r)), a.__beforeBegin = null, [w, M, S].forEach(e => e(a, r)), a.compiled = !0;
      let o = null;
      if ("object" == typeof a.keywords && (o = a.keywords.$pattern, delete a.keywords.$pattern), a.keywords && (a.keywords = ((e, n) => {
        const t = {};
        return "string" == typeof e ? a("keyword", e) : Object.keys(e).forEach(n => {
          a(n, e[n]);
        }), t;

        function a(e, a) {
          n && (a = a.toLowerCase()), a.split(" ").forEach(n => {
            const a = n.split("|");
            t[a[0]] = [e, k(a[0], a[1])];
          });
        }
      })(a.keywords, e.case_insensitive)), a.lexemes && o) throw Error("ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) ");
      return o = o || a.lexemes || /\w+/, l.keywordPatternRe = t(o, !0), r && (a.begin || (a.begin = /\B|\b/), l.beginRe = t(a.begin), a.endSameAsBegin && (a.end = a.begin), a.end || a.endsWithParent || (a.end = /\B|\b/), a.end && (l.endRe = t(a.end)), l.terminatorEnd = g(a.end) || "", a.endsWithParent && r.terminatorEnd && (l.terminatorEnd += (a.end ? "|" : "") + r.terminatorEnd)), a.illegal && (l.illegalRe = t(a.illegal)), a.contains || (a.contains = []), a.contains = [].concat(...a.contains.map(e => (e => (e.variants && !e.cachedVariants && (e.cachedVariants = e.variants.map(n => i(e, {
        variants: null
      }, n))), e.cachedVariants ? e.cachedVariants : function e(n) {
        return !!n && (n.endsWithParent || e(n.starts));
      }(e) ? i(e, {
        starts: e.starts ? i(e.starts) : null
      }) : Object.isFrozen(e) ? i(e) : e))("self" === e ? a : e))), a.contains.forEach(e => {
        n(e, l);
      }), a.starts && n(a.starts, r), l.matcher = (e => {
        const n = new s();
        return e.contains.forEach(e => n.addRule(e.begin, {
          rule: e,
          type: "begin"
        })), e.terminatorEnd && n.addRule(e.terminatorEnd, {
          type: "end"
        }), e.illegal && n.addRule(e.illegal, {
          type: "illegal"
        }), n;
      })(l), l;
    }(e);
  }

  function D(e) {
    const n = {
      props: ["language", "code", "autodetect"],
      data: () => ({
        detectedLanguage: "",
        unknownLanguage: !1
      }),
      computed: {
        className() {
          return this.unknownLanguage ? "" : "hljs " + this.detectedLanguage;
        },

        highlighted() {
          if (!this.autoDetect && !e.getLanguage(this.language)) return console.warn(`The language "${this.language}" you specified could not be found.`), this.unknownLanguage = !0, s(this.code);
          let n = {};
          return this.autoDetect ? (n = e.highlightAuto(this.code), this.detectedLanguage = n.language) : (n = e.highlight(this.language, this.code, this.ignoreIllegals), this.detectedLanguage = this.language), n.value;
        },

        autoDetect() {
          return !(this.language && (e = this.autodetect, !e && "" !== e));
          var e;
        },

        ignoreIllegals: () => !0
      },

      render(e) {
        return e("pre", {}, [e("code", {
          class: this.className,
          domProps: {
            innerHTML: this.highlighted
          }
        })]);
      }

    };
    return {
      Component: n,
      VuePlugin: {
        install(e) {
          e.component("highlightjs", n);
        }

      }
    };
  }

  const L = {
    "after:highlightBlock": ({
      block: e,
      result: n,
      text: t
    }) => {
      const a = B(e);
      if (!a.length) return;
      const i = document.createElement("div");
      i.innerHTML = n.value, n.value = ((e, n, t) => {
        let a = 0,
            i = "";
        const r = [];

        function l() {
          return e.length && n.length ? e[0].offset !== n[0].offset ? e[0].offset < n[0].offset ? e : n : "start" === n[0].event ? e : n : e.length ? e : n;
        }

        function o(e) {
          i += "<" + C(e) + [].map.call(e.attributes, function (e) {
            return " " + e.nodeName + '="' + s(e.value) + '"';
          }).join("") + ">";
        }

        function c(e) {
          i += "</" + C(e) + ">";
        }

        function g(e) {
          ("start" === e.event ? o : c)(e.node);
        }

        for (; e.length || n.length;) {
          let n = l();

          if (i += s(t.substring(a, n[0].offset)), a = n[0].offset, n === e) {
            r.reverse().forEach(c);

            do {
              g(n.splice(0, 1)[0]), n = l();
            } while (n === e && n.length && n[0].offset === a);

            r.reverse().forEach(o);
          } else "start" === n[0].event ? r.push(n[0].node) : r.pop(), g(n.splice(0, 1)[0]);
        }

        return i + s(t.substr(a));
      })(a, B(i), t);
    }
  };

  function C(e) {
    return e.nodeName.toLowerCase();
  }

  function B(e) {
    const n = [];
    return function e(t, a) {
      for (let s = t.firstChild; s; s = s.nextSibling) 3 === s.nodeType ? a += s.nodeValue.length : 1 === s.nodeType && (n.push({
        event: "start",
        offset: a,
        node: s
      }), a = e(s, a), C(s).match(/br|hr|img|input/) || n.push({
        event: "stop",
        offset: a,
        node: s
      }));

      return a;
    }(e, 0), n;
  }

  const P = e => {
    console.error(e);
  },
        j = (e, ...n) => {
    console.log("WARN: " + e, ...n);
  },
        U = (e, n) => {
    console.log(`Deprecated as of ${e}. ${n}`);
  },
        $ = s,
        z = i,
        H = Symbol("nomatch");

  return (e => {
    const t = Object.create(null),
          s = Object.create(null),
          i = [];
    let r = !0;
    const l = /(^(<[^>]+>|\t|)+|\n)/gm,
          o = "Could not find the language '{}', did you forget to load/include a language module?",
          g = {
      disableAutodetect: !0,
      name: "Plain text",
      contains: []
    };
    let u = {
      noHighlightRe: /^(no-?highlight)$/i,
      languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
      classPrefix: "hljs-",
      tabReplace: null,
      useBR: !1,
      languages: null,
      __emitter: c
    };

    function d(e) {
      return u.noHighlightRe.test(e);
    }

    function h(e, n, t, a) {
      const s = {
        code: n,
        language: e
      };
      R("before:highlight", s);
      const i = s.result ? s.result : b(s.language, s.code, t, a);
      return i.code = s.code, R("after:highlight", i), i;
    }

    function b(e, n, s, l) {
      const c = n;

      function g(e, n) {
        const t = N.case_insensitive ? n[0].toLowerCase() : n[0];
        return Object.prototype.hasOwnProperty.call(e.keywords, t) && e.keywords[t];
      }

      function d() {
        null != O.subLanguage ? (() => {
          if ("" === M) return;
          let e = null;

          if ("string" == typeof O.subLanguage) {
            if (!t[O.subLanguage]) return void w.addText(M);
            e = b(O.subLanguage, M, !0, R[O.subLanguage]), R[O.subLanguage] = e.top;
          } else e = f(M, O.subLanguage.length ? O.subLanguage : null);

          O.relevance > 0 && (A += e.relevance), w.addSublanguage(e.emitter, e.language);
        })() : (() => {
          if (!O.keywords) return void w.addText(M);
          let e = 0;
          O.keywordPatternRe.lastIndex = 0;
          let n = O.keywordPatternRe.exec(M),
              t = "";

          for (; n;) {
            t += M.substring(e, n.index);
            const a = g(O, n);

            if (a) {
              const [e, s] = a;
              w.addText(t), t = "", A += s;
              const i = N.classNameAliases[e] || e;
              w.addKeyword(n[0], i);
            } else t += n[0];

            e = O.keywordPatternRe.lastIndex, n = O.keywordPatternRe.exec(M);
          }

          t += M.substr(e), w.addText(t);
        })(), M = "";
      }

      function h(e) {
        return e.className && w.openNode(N.classNameAliases[e.className] || e.className), O = Object.create(e, {
          parent: {
            value: O
          }
        });
      }

      function m(e, n, t) {
        let s = ((e, n) => {
          const t = e && e.exec(n);
          return t && 0 === t.index;
        })(e.endRe, t);

        if (s) {
          if (e["on:end"]) {
            const t = new a(e);
            e["on:end"](n, t), t.ignore && (s = !1);
          }

          if (s) {
            for (; e.endsParent && e.parent;) e = e.parent;

            return e;
          }
        }

        if (e.endsWithParent) return m(e.parent, n, t);
      }

      function p(e) {
        return 0 === O.matcher.regexIndex ? (M += e[0], 1) : (k = !0, 0);
      }

      let E = {};

      function _(n, t) {
        const i = t && t[0];
        if (M += n, null == i) return d(), 0;

        if ("begin" === E.type && "end" === t.type && E.index === t.index && "" === i) {
          if (M += c.slice(t.index, t.index + 1), !r) {
            const n = Error("0 width match regex");
            throw n.languageName = e, n.badRule = E.rule, n;
          }

          return 1;
        }

        if (E = t, "begin" === t.type) return function (e) {
          const n = e[0],
                t = e.rule,
                s = new a(t),
                i = [t.__beforeBegin, t["on:begin"]];

          for (const t of i) if (t && (t(e, s), s.ignore)) return p(n);

          return t && t.endSameAsBegin && (t.endRe = RegExp(n.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "m")), t.skip ? M += n : (t.excludeBegin && (M += n), d(), t.returnBegin || t.excludeBegin || (M = n)), h(t), t.returnBegin ? 0 : n.length;
        }(t);

        if ("illegal" === t.type && !s) {
          const e = Error('Illegal lexeme "' + i + '" for mode "' + (O.className || "<unnamed>") + '"');
          throw e.mode = O, e;
        }

        if ("end" === t.type) {
          const e = function (e) {
            const n = e[0],
                  t = c.substr(e.index),
                  a = m(O, e, t);
            if (!a) return H;
            const s = O;
            s.skip ? M += n : (s.returnEnd || s.excludeEnd || (M += n), d(), s.excludeEnd && (M = n));

            do {
              O.className && w.closeNode(), O.skip || O.subLanguage || (A += O.relevance), O = O.parent;
            } while (O !== a.parent);

            return a.starts && (a.endSameAsBegin && (a.starts.endRe = a.endRe), h(a.starts)), s.returnEnd ? 0 : n.length;
          }(t);

          if (e !== H) return e;
        }

        if ("illegal" === t.type && "" === i) return 1;
        if (T > 1e5 && T > 3 * t.index) throw Error("potential infinite loop, way more iterations than matches");
        return M += i, i.length;
      }

      const N = x(e);
      if (!N) throw P(o.replace("{}", e)), Error('Unknown language: "' + e + '"');
      const v = I(N, {
        plugins: i
      });
      let y = "",
          O = l || v;
      const R = {},
            w = new u.__emitter(u);

      (() => {
        const e = [];

        for (let n = O; n !== N; n = n.parent) n.className && e.unshift(n.className);

        e.forEach(e => w.openNode(e));
      })();

      let M = "",
          A = 0,
          S = 0,
          T = 0,
          k = !1;

      try {
        for (O.matcher.considerAll();;) {
          T++, k ? k = !1 : O.matcher.considerAll(), O.matcher.lastIndex = S;
          const e = O.matcher.exec(c);
          if (!e) break;

          const n = _(c.substring(S, e.index), e);

          S = e.index + n;
        }

        return _(c.substr(S)), w.closeAllNodes(), w.finalize(), y = w.toHTML(), {
          relevance: A,
          value: y,
          language: e,
          illegal: !1,
          emitter: w,
          top: O
        };
      } catch (n) {
        if (n.message && n.message.includes("Illegal")) return {
          illegal: !0,
          illegalBy: {
            msg: n.message,
            context: c.slice(S - 100, S + 100),
            mode: n.mode
          },
          sofar: y,
          relevance: 0,
          value: $(c),
          emitter: w
        };
        if (r) return {
          illegal: !1,
          relevance: 0,
          value: $(c),
          emitter: w,
          language: e,
          top: O,
          errorRaised: n
        };
        throw n;
      }
    }

    function f(e, n) {
      n = n || u.languages || Object.keys(t);

      const a = (e => {
        const n = {
          relevance: 0,
          emitter: new u.__emitter(u),
          value: $(e),
          illegal: !1,
          top: g
        };
        return n.emitter.addText(e), n;
      })(e),
            s = n.filter(x).filter(y).map(n => b(n, e, !1));

      s.unshift(a);
      const i = s.sort((e, n) => {
        if (e.relevance !== n.relevance) return n.relevance - e.relevance;

        if (e.language && n.language) {
          if (x(e.language).supersetOf === n.language) return 1;
          if (x(n.language).supersetOf === e.language) return -1;
        }

        return 0;
      }),
            [r, l] = i,
            o = r;
      return o.second_best = l, o;
    }

    const m = {
      "before:highlightBlock": ({
        block: e
      }) => {
        u.useBR && (e.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n"));
      },
      "after:highlightBlock": ({
        result: e
      }) => {
        u.useBR && (e.value = e.value.replace(/\n/g, "<br>"));
      }
    },
          p = /^(<[^>]+>|\t)+/gm,
          E = {
      "after:highlightBlock": ({
        result: e
      }) => {
        u.tabReplace && (e.value = e.value.replace(p, e => e.replace(/\t/g, u.tabReplace)));
      }
    };

    function _(e) {
      let n = null;

      const t = (e => {
        let n = e.className + " ";
        n += e.parentNode ? e.parentNode.className : "";
        const t = u.languageDetectRe.exec(n);

        if (t) {
          const n = x(t[1]);
          return n || (j(o.replace("{}", t[1])), j("Falling back to no-highlight mode for this block.", e)), n ? t[1] : "no-highlight";
        }

        return n.split(/\s+/).find(e => d(e) || x(e));
      })(e);

      if (d(t)) return;
      R("before:highlightBlock", {
        block: e,
        language: t
      });
      const a = (n = e).textContent,
            i = t ? h(t, a, !0) : f(a);
      R("after:highlightBlock", {
        block: e,
        result: i,
        text: a
      }), e.innerHTML = i.value, ((e, n, t) => {
        const a = n ? s[n] : t;
        e.classList.add("hljs"), a && e.classList.add(a);
      })(e, t, i.language), e.result = {
        language: i.language,
        re: i.relevance,
        relavance: i.relevance
      }, i.second_best && (e.second_best = {
        language: i.second_best.language,
        re: i.second_best.relevance,
        relavance: i.second_best.relevance
      });
    }

    const N = () => {
      N.called || (N.called = !0, document.querySelectorAll("pre code").forEach(_));
    };

    function x(e) {
      return e = (e || "").toLowerCase(), t[e] || t[s[e]];
    }

    function v(e, {
      languageName: n
    }) {
      "string" == typeof e && (e = [e]), e.forEach(e => {
        s[e] = n;
      });
    }

    function y(e) {
      const n = x(e);
      return n && !n.disableAutodetect;
    }

    function R(e, n) {
      const t = e;
      i.forEach(e => {
        e[t] && e[t](n);
      });
    }

    Object.assign(e, {
      highlight: h,
      highlightAuto: f,
      fixMarkup: e => {
        return U("10.2.0", "fixMarkup will be removed entirely in v11.0"), U("10.2.0", "Please see https://github.com/highlightjs/highlight.js/issues/2534"), n = e, u.tabReplace || u.useBR ? n.replace(l, e => "\n" === e ? u.useBR ? "<br>" : e : u.tabReplace ? e.replace(/\t/g, u.tabReplace) : e) : n;
        var n;
      },
      highlightBlock: _,
      configure: e => {
        e.useBR && (U("10.3.0", "'useBR' will be removed entirely in v11.0"), U("10.3.0", "Please see https://github.com/highlightjs/highlight.js/issues/2559")), u = z(u, e);
      },
      initHighlighting: N,
      initHighlightingOnLoad: () => {
        window.addEventListener("DOMContentLoaded", N, !1);
      },
      registerLanguage: (n, a) => {
        let s = null;

        try {
          s = a(e);
        } catch (e) {
          if (P("Language definition for '{}' could not be registered.".replace("{}", n)), !r) throw e;
          P(e), s = g;
        }

        s.name || (s.name = n), t[n] = s, s.rawDefinition = a.bind(null, e), s.aliases && v(s.aliases, {
          languageName: n
        });
      },
      listLanguages: () => Object.keys(t),
      getLanguage: x,
      registerAliases: v,
      requireLanguage: e => {
        U("10.4.0", "requireLanguage will be removed entirely in v11."), U("10.4.0", "Please see https://github.com/highlightjs/highlight.js/pull/2844");
        const n = x(e);
        if (n) return n;
        throw Error("The '{}' language is required, but not loaded.".replace("{}", e));
      },
      autoDetection: y,
      inherit: z,
      addPlugin: e => {
        i.push(e);
      },
      vuePlugin: D(e).VuePlugin
    }), e.debugMode = () => {
      r = !1;
    }, e.safeMode = () => {
      r = !0;
    }, e.versionString = "10.5.0";

    for (const e in O) "object" == typeof O[e] && n(O[e]);

    return Object.assign(e, O), e.addPlugin(m), e.addPlugin(L), e.addPlugin(E), e;
  })({});
}();

"object" == typeof exports && "undefined" != typeof module && (module.exports = hljs), hljs.registerLanguage("xml", (() => {
  "use strict";

  function e(e) {
    return e ? "string" == typeof e ? e : e.source : null;
  }

  function n(e) {
    return t("(?=", e, ")");
  }

  function t(...n) {
    return n.map(n => e(n)).join("");
  }

  function a(...n) {
    return "(" + n.map(n => e(n)).join("|") + ")";
  }

  return e => {
    const s = t(/[A-Z_]/, t("(", /[A-Z0-9_.-]+:/, ")?"), /[A-Z0-9_.-]*/),
          i = {
      className: "symbol",
      begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
    },
          r = {
      begin: /\s/,
      contains: [{
        className: "meta-keyword",
        begin: /#?[a-z_][a-z1-9_-]+/,
        illegal: /\n/
      }]
    },
          l = e.inherit(r, {
      begin: /\(/,
      end: /\)/
    }),
          o = e.inherit(e.APOS_STRING_MODE, {
      className: "meta-string"
    }),
          c = e.inherit(e.QUOTE_STRING_MODE, {
      className: "meta-string"
    }),
          g = {
      endsWithParent: !0,
      illegal: /</,
      relevance: 0,
      contains: [{
        className: "attr",
        begin: /[A-Za-z0-9._:-]+/,
        relevance: 0
      }, {
        begin: /=\s*/,
        relevance: 0,
        contains: [{
          className: "string",
          endsParent: !0,
          variants: [{
            begin: /"/,
            end: /"/,
            contains: [i]
          }, {
            begin: /'/,
            end: /'/,
            contains: [i]
          }, {
            begin: /[^\s"'=<>`]+/
          }]
        }]
      }]
    };
    return {
      name: "HTML, XML",
      aliases: ["html", "xhtml", "rss", "atom", "xjb", "xsd", "xsl", "plist", "wsf", "svg"],
      case_insensitive: !0,
      contains: [{
        className: "meta",
        begin: /<![a-z]/,
        end: />/,
        relevance: 10,
        contains: [r, c, o, l, {
          begin: /\[/,
          end: /\]/,
          contains: [{
            className: "meta",
            begin: /<![a-z]/,
            end: />/,
            contains: [r, l, c, o]
          }]
        }]
      }, e.COMMENT(/<!--/, /-->/, {
        relevance: 10
      }), {
        begin: /<!\[CDATA\[/,
        end: /\]\]>/,
        relevance: 10
      }, i, {
        className: "meta",
        begin: /<\?xml/,
        end: /\?>/,
        relevance: 10
      }, {
        className: "tag",
        begin: /<style(?=\s|>)/,
        end: />/,
        keywords: {
          name: "style"
        },
        contains: [g],
        starts: {
          end: /<\/style>/,
          returnEnd: !0,
          subLanguage: ["css", "xml"]
        }
      }, {
        className: "tag",
        begin: /<script(?=\s|>)/,
        end: />/,
        keywords: {
          name: "script"
        },
        contains: [g],
        starts: {
          end: /<\/script>/,
          returnEnd: !0,
          subLanguage: ["javascript", "handlebars", "xml"]
        }
      }, {
        className: "tag",
        begin: /<>|<\/>/
      }, {
        className: "tag",
        begin: t(/</, n(t(s, a(/\/>/, />/, /\s/)))),
        end: /\/?>/,
        contains: [{
          className: "name",
          begin: s,
          relevance: 0,
          starts: g
        }]
      }, {
        className: "tag",
        begin: t(/<\//, n(t(s, />/))),
        contains: [{
          className: "name",
          begin: s,
          relevance: 0
        }, {
          begin: />/,
          relevance: 0
        }]
      }]
    };
  };
})()), hljs.registerLanguage("css", (() => {
  "use strict";

  return e => {
    var n = "[a-zA-Z-][a-zA-Z0-9_-]*",
        t = {
      begin: /([*]\s?)?(?:[A-Z_.\-\\]+|--[a-zA-Z0-9_-]+)\s*(\/\*\*\/)?:/,
      returnBegin: !0,
      end: ";",
      endsWithParent: !0,
      contains: [{
        className: "attribute",
        begin: /\S/,
        end: ":",
        excludeEnd: !0,
        starts: {
          endsWithParent: !0,
          excludeEnd: !0,
          contains: [{
            begin: /[\w-]+\(/,
            returnBegin: !0,
            contains: [{
              className: "built_in",
              begin: /[\w-]+/
            }, {
              begin: /\(/,
              end: /\)/,
              contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.CSS_NUMBER_MODE]
            }]
          }, e.CSS_NUMBER_MODE, e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, e.C_BLOCK_COMMENT_MODE, {
            className: "number",
            begin: "#[0-9A-Fa-f]+"
          }, {
            className: "meta",
            begin: "!important"
          }]
        }
      }]
    };
    return {
      name: "CSS",
      case_insensitive: !0,
      illegal: /[=|'\$]/,
      contains: [e.C_BLOCK_COMMENT_MODE, {
        className: "selector-id",
        begin: /#[A-Za-z0-9_-]+/
      }, {
        className: "selector-class",
        begin: "\\." + n
      }, {
        className: "selector-attr",
        begin: /\[/,
        end: /\]/,
        illegal: "$",
        contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
      }, {
        className: "selector-pseudo",
        begin: /:(:)?[a-zA-Z0-9_+()"'.-]+/
      }, {
        begin: "@(page|font-face)",
        lexemes: "@[a-z-]+",
        keywords: "@page @font-face"
      }, {
        begin: "@",
        end: "[{;]",
        illegal: /:/,
        returnBegin: !0,
        contains: [{
          className: "keyword",
          begin: /@-?\w[\w]*(-\w+)*/
        }, {
          begin: /\s/,
          endsWithParent: !0,
          excludeEnd: !0,
          relevance: 0,
          keywords: "and or not only",
          contains: [{
            begin: /[a-z-]+:/,
            className: "attribute"
          }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.CSS_NUMBER_MODE]
        }]
      }, {
        className: "selector-tag",
        begin: n,
        relevance: 0
      }, {
        begin: /\{/,
        end: /\}/,
        illegal: /\S/,
        contains: [e.C_BLOCK_COMMENT_MODE, {
          begin: /;/
        }, t]
      }]
    };
  };
})()), hljs.registerLanguage("json", (() => {
  "use strict";

  return e => {
    const n = {
      literal: "true false null"
    },
          t = [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE],
          a = [e.QUOTE_STRING_MODE, e.C_NUMBER_MODE],
          s = {
      end: ",",
      endsWithParent: !0,
      excludeEnd: !0,
      contains: a,
      keywords: n
    },
          i = {
      begin: /\{/,
      end: /\}/,
      contains: [{
        className: "attr",
        begin: /"/,
        end: /"/,
        contains: [e.BACKSLASH_ESCAPE],
        illegal: "\\n"
      }, e.inherit(s, {
        begin: /:/
      })].concat(t),
      illegal: "\\S"
    },
          r = {
      begin: "\\[",
      end: "\\]",
      contains: [e.inherit(s)],
      illegal: "\\S"
    };
    return a.push(i, r), t.forEach(e => {
      a.push(e);
    }), {
      name: "JSON",
      contains: a,
      keywords: n,
      illegal: "\\S"
    };
  };
})()), hljs.registerLanguage("javascript", (() => {
  "use strict";

  const e = "[A-Za-z$_][0-9A-Za-z$_]*",
        n = ["as", "in", "of", "if", "for", "while", "finally", "var", "new", "function", "do", "return", "void", "else", "break", "catch", "instanceof", "with", "throw", "case", "default", "try", "switch", "continue", "typeof", "delete", "let", "yield", "const", "class", "debugger", "async", "await", "static", "import", "from", "export", "extends"],
        t = ["true", "false", "null", "undefined", "NaN", "Infinity"],
        a = [].concat(["setInterval", "setTimeout", "clearInterval", "clearTimeout", "require", "exports", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape"], ["arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global"], ["Intl", "DataView", "Number", "Math", "Date", "String", "RegExp", "Object", "Function", "Boolean", "Error", "Symbol", "Set", "Map", "WeakSet", "WeakMap", "Proxy", "Reflect", "JSON", "Promise", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "Uint16Array", "Uint32Array", "Float32Array", "Array", "Uint8Array", "Uint8ClampedArray", "ArrayBuffer"], ["EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"]);

  function s(e) {
    return i("(?=", e, ")");
  }

  function i(...e) {
    return e.map(e => {
      return (n = e) ? "string" == typeof n ? n : n.source : null;
      var n;
    }).join("");
  }

  return r => {
    const l = e,
          o = {
      begin: /<[A-Za-z0-9\\._:-]+/,
      end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
      isTrulyOpeningTag: (e, n) => {
        const t = e[0].length + e.index,
              a = e.input[t];
        "<" !== a ? ">" === a && (((e, {
          after: n
        }) => {
          const t = "</" + e[0].slice(1);
          return -1 !== e.input.indexOf(t, n);
        })(e, {
          after: t
        }) || n.ignoreMatch()) : n.ignoreMatch();
      }
    },
          c = {
      $pattern: e,
      keyword: n.join(" "),
      literal: t.join(" "),
      built_in: a.join(" ")
    },
          g = "\\.([0-9](_?[0-9])*)",
          u = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",
          d = {
      className: "number",
      variants: [{
        begin: `(\\b(${u})((${g})|\\.)?|(${g}))[eE][+-]?([0-9](_?[0-9])*)\\b`
      }, {
        begin: `\\b(${u})\\b((${g})\\b|\\.)?|(${g})\\b`
      }, {
        begin: "\\b(0|[1-9](_?[0-9])*)n\\b"
      }, {
        begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
      }, {
        begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
      }, {
        begin: "\\b0[oO][0-7](_?[0-7])*n?\\b"
      }, {
        begin: "\\b0[0-7]+n?\\b"
      }],
      relevance: 0
    },
          h = {
      className: "subst",
      begin: "\\$\\{",
      end: "\\}",
      keywords: c,
      contains: []
    },
          b = {
      begin: "html`",
      end: "",
      starts: {
        end: "`",
        returnEnd: !1,
        contains: [r.BACKSLASH_ESCAPE, h],
        subLanguage: "xml"
      }
    },
          f = {
      begin: "css`",
      end: "",
      starts: {
        end: "`",
        returnEnd: !1,
        contains: [r.BACKSLASH_ESCAPE, h],
        subLanguage: "css"
      }
    },
          m = {
      className: "string",
      begin: "`",
      end: "`",
      contains: [r.BACKSLASH_ESCAPE, h]
    },
          p = {
      className: "comment",
      variants: [r.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
        relevance: 0,
        contains: [{
          className: "doctag",
          begin: "@[A-Za-z]+",
          contains: [{
            className: "type",
            begin: "\\{",
            end: "\\}",
            relevance: 0
          }, {
            className: "variable",
            begin: l + "(?=\\s*(-)|$)",
            endsParent: !0,
            relevance: 0
          }, {
            begin: /(?=[^\n])\s/,
            relevance: 0
          }]
        }]
      }), r.C_BLOCK_COMMENT_MODE, r.C_LINE_COMMENT_MODE]
    },
          E = [r.APOS_STRING_MODE, r.QUOTE_STRING_MODE, b, f, m, d, r.REGEXP_MODE];
    h.contains = E.concat({
      begin: /\{/,
      end: /\}/,
      keywords: c,
      contains: ["self"].concat(E)
    });

    const _ = [].concat(p, h.contains),
          N = _.concat([{
      begin: /\(/,
      end: /\)/,
      keywords: c,
      contains: ["self"].concat(_)
    }]),
          x = {
      className: "params",
      begin: /\(/,
      end: /\)/,
      excludeBegin: !0,
      excludeEnd: !0,
      keywords: c,
      contains: N
    };

    return {
      name: "Javascript",
      aliases: ["js", "jsx", "mjs", "cjs"],
      keywords: c,
      exports: {
        PARAMS_CONTAINS: N
      },
      illegal: /#(?![$_A-z])/,
      contains: [r.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }), {
        label: "use_strict",
        className: "meta",
        relevance: 10,
        begin: /^\s*['"]use (strict|asm)['"]/
      }, r.APOS_STRING_MODE, r.QUOTE_STRING_MODE, b, f, m, p, d, {
        begin: i(/[{,\n]\s*/, s(i(/(((\/\/.*$)|(\/\*(\*[^\/]|[^*])*\*\/))\s*)*/, l + "\\s*:"))),
        relevance: 0,
        contains: [{
          className: "attr",
          begin: l + s("\\s*:"),
          relevance: 0
        }]
      }, {
        begin: "(" + r.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        contains: [p, r.REGEXP_MODE, {
          className: "function",
          begin: "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + r.UNDERSCORE_IDENT_RE + ")\\s*=>",
          returnBegin: !0,
          end: "\\s*=>",
          contains: [{
            className: "params",
            variants: [{
              begin: r.UNDERSCORE_IDENT_RE,
              relevance: 0
            }, {
              className: null,
              begin: /\(\s*\)/,
              skip: !0
            }, {
              begin: /\(/,
              end: /\)/,
              excludeBegin: !0,
              excludeEnd: !0,
              keywords: c,
              contains: N
            }]
          }]
        }, {
          begin: /,/,
          relevance: 0
        }, {
          className: "",
          begin: /\s/,
          end: /\s*/,
          skip: !0
        }, {
          variants: [{
            begin: "<>",
            end: "</>"
          }, {
            begin: o.begin,
            "on:begin": o.isTrulyOpeningTag,
            end: o.end
          }],
          subLanguage: "xml",
          contains: [{
            begin: o.begin,
            end: o.end,
            skip: !0,
            contains: ["self"]
          }]
        }],
        relevance: 0
      }, {
        className: "function",
        beginKeywords: "function",
        end: /[{;]/,
        excludeEnd: !0,
        keywords: c,
        contains: ["self", r.inherit(r.TITLE_MODE, {
          begin: l
        }), x],
        illegal: /%/
      }, {
        beginKeywords: "while if switch catch for"
      }, {
        className: "function",
        begin: r.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        returnBegin: !0,
        contains: [x, r.inherit(r.TITLE_MODE, {
          begin: l
        })]
      }, {
        variants: [{
          begin: "\\." + l
        }, {
          begin: "\\$" + l
        }],
        relevance: 0
      }, {
        className: "class",
        beginKeywords: "class",
        end: /[{;=]/,
        excludeEnd: !0,
        illegal: /[:"[\]]/,
        contains: [{
          beginKeywords: "extends"
        }, r.UNDERSCORE_TITLE_MODE]
      }, {
        begin: /\b(?=constructor)/,
        end: /[{;]/,
        excludeEnd: !0,
        contains: [r.inherit(r.TITLE_MODE, {
          begin: l
        }), "self", x]
      }, {
        begin: "(get|set)\\s+(?=" + l + "\\()",
        end: /\{/,
        keywords: "get set",
        contains: [r.inherit(r.TITLE_MODE, {
          begin: l
        }), {
          begin: /\(\)/
        }, x]
      }, {
        begin: /\$[(.]/
      }]
    };
  };
})());

(() => {
  const hash = window.location.hash.substring(1).split('%'),
        path = hash.length > 1 ? hash[0].split('/').filter(e => e.length != 0) : [],
        w_id = hash.pop();
  window.name = 'child#' + w_id;
  window.root = new Object();
  window.root.subloc = {
    get path() {
      return Array.from(path);
    }

  };

  window.root.call = (command, data) => {
    window.parent.postMessage({
      sender: w_id,
      command,
      data
    });
  };

  window.root.updateTitle = title => {
    window.root.call('update.title', title);
  };

  window.root.updateFav = fav => {
    window.root.call('update.fav', fav);
  };

  window.root.updateHash = hash => {
    window.location.hash = hash;
    window.root.call('update.hash', hash);
  };

  window.root.open = url => {
    window.root.call('open.link', url);
  };

  window.root.go = page_id => {
    window.root.call('update.location', page_id);
  };

  window.addEventListener('load', () => {
    const fav = document.querySelector('link[rel="shortcut icon"]'),
          title = document.querySelector('title');
    if (fav != null) window.root.updateFav(fav.href);
    if (title != null) window.root.updateTitle(title.innerText);
  }, {
    once: true
  });
  {
    window.root.utils = new Object();
    const dict = ['я,ю,э,ы,щ,ш,ч,ц,х,ф,у,т,с,р,п,о,н,м,л,к,й,и,з,ж,ё,е,д,г,в,б,а,-,ъ,ь'.split(','), 'ya,yu,eh,yi,sh,sh,ch,c,h,ph,u,t,s,r,p,o,n,m,l,k,y,i,z,zh,yo,e,d,g,v,b,a,-,,'.split(',')];

    window.root.utils.ruToUrlPure = npure => {
      let outp = new Array();

      for (let i = 0, leng = npure.length, cur; i < leng; i++) {
        if ((cur = dict[0].indexOf(npure[i])) != -1) {
          outp.push(dict[1][cur]);
        } else {
          outp.push(npure[i]);
        }
      }

      return outp.join('').toLocaleLowerCase();
    };
  } // Load config

  {
    let config = document.querySelector('script[type="page-config"]'),
        start = new Array();

    class Config {
      constructor() {
        this._logo = null;
        this.buttons = new Array();

        this.buttons.add = (display, tag) => {
          window.root.call('header.buttons.add', {
            display,
            tag
          });
          this.buttons.push([display, tag]);
        };
      }

      setStart(path, tag) {
        start[0] = path;
        start[1] = tag;
      }

      setTitle(title, url) {
        window.root.call('header.update.title', {
          title,
          url
        });
      }

      set logo(logo) {
        window.root.call('header.update.logo', logo);
        this._logo = logo;
      }

      get logo() {
        return this._logo;
      }

    }

    if (config != null) {
      new Function('config', '"use strict";' + config.innerText).call(new Config());
    } // При полной загрузке контента, загружаем переданный через location hash путь, или путь установленный в конфигурации


    window.addEventListener('DOMContentLoaded', () => {
      if (window.root.subloc.path.length === 0) {
        window.page.loadPage(start[0], start[1]);
      } else {
        window.page.loadPage(window.root.subloc.path[0], window.root.subloc.path[1]);
      }
    }, {
      once: true
    });
  } // Регистрирую слушатели

  {
    window.addEventListener('click', e => {
      if (e.target.tagName == 'A') {
        if (e.target.href.trim() != '') window.root.call('open.link', e.target.href);
        e.preventDefault();
      } else if (e.target.tagName == 'BUTTON') {
        e.preventDefault(); // Remove any old one

        const ripple = document.querySelectorAll('.ripple');

        if (ripple) {
          for (let i = 0, leng = ripple.length; i < leng; i++) ripple[i].remove();
        } // Setup


        let buttonWidth = e.target.offsetWidth,
            buttonHeight = e.target.offsetHeight; // Make it round!

        if (buttonWidth >= buttonHeight) {
          buttonHeight = buttonWidth;
        } else {
          buttonWidth = buttonHeight;
        } // Get the center of the element


        const x = e.offsetX == undefined ? e.layerX : e.offsetX - buttonWidth / 2,
              y = e.offsetY == undefined ? e.layerY : e.offsetY - buttonHeight / 2; // Add the element

        const span = document.createElement('span');
        span.className = 'ripple';
        const s = span.style;
        s.width = buttonWidth + 'px';
        s.height = buttonHeight + 'px';
        s.top = y + 'px';
        s.left = x + 'px';
        e.target.appendChild(span);
      }
    });
    window.addEventListener('page:ch-go', e => {
      window.root.call('doc.location.change.started', e.detail);
    });
    window.addEventListener('page:go', e => {
      // Показываем заголовок при переходе на другой документ
      window.root.call('header.show'); // Вызываем событие изменения текущей секции

      window.root.call('doc.section.change.started', e.detail);
    });
    window.addEventListener('page:ch-done', e => {
      // 
      window.root.call('doc.location.change.ended', { ...e.detail,
        headers: undefined
      });
    });
    window.addEventListener('page:done', e => {
      window.root.updateHash(e.detail.page_id + (e.detail.head != undefined ? '/' + e.detail.head : ''));
      window.root.call('doc.section.change.ended', { ...e.detail,
        headers: undefined
      });
    });
    window.addEventListener('scroll', e => {
      if (window.scrollY === 0) window.root.call('header.show');else window.root.call('header.hide');
    });
    window.addEventListener('message', message => {
      const data = message.data;
      if (data.receiver != w_id) return;

      switch (data.command) {
        case 'update.ui':
          {
            const container = document.querySelector('.container');

            if (container) {
              container.setAttribute('ui', data.data);
            }
          }
          break;

        case 'content.load':
          window.page.loadPage(data.data, null);
          break;
      }
    });
  }
})();

{
  window.page = new Object();
  const PAGES = new Map(),
        IGNORE = ['type', 'name'],
        CONTENT = document.querySelector('*[rendertarget="true"]'),
        HEAD = document.querySelector('.header');
  let last = '',
      load = false;
  const GO_EV = 'page:go',
        CHANGE_GO = 'page:ch-go',
        DONE_EV = 'page:done',
        CHANGE_DONE_EV = 'page:ch-done';
  const HEADERS = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
  marked.setOptions({
    highlight: (code, language) => {
      return hljs.highlight(language, code).value;
    }
  });

  const wait = tm => {
    return new Promise(res => setTimeout(res, tm));
  };

  const onAllLoaded = elems => {
    let load_c = 0,
        total_c = elems.length;
    if (total_c != 0) return new Promise(res => {
      function load() {
        load_c++;
        if (load_c >= total_c) res();
      }

      for (let i = 0; i < total_c; i++) {
        if (elems[i].complete || !(elems[i] instanceof HTMLImageElement)) {
          load();
          continue;
        }

        elems[i].addEventListener('load', load, {
          once: true
        });
        elems[i].addEventListener('error', load, {
          once: true
        });
      }
    });
  };

  const whell = to => {
    if (load) return;

    try {
      let head_d = element.querySelector('#' + to);

      if (head_d) {
        const rect = (HEADERS.includes(head_d.tagName) ? head_d : head_d.parentElement).getBoundingClientRect();
        const y = rect.top + window.pageYOffset - (HEAD && HEAD.offsetHeight || 0);
        document.documentElement.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        window.root.updateHash(last);
      }
    } catch (e) {
      window.root.updateHash(last);
    }
  };

  const loadPage = async (page_id, head) => {
    if (load) return;
    const chunck = PAGES.get(page_id),
          updated = last != page_id;

    if (chunck != null) {
      if (updated) window.dispatchEvent(new CustomEvent(CHANGE_GO, {
        detail: {
          page_id,
          head,
          header: chunck.header
        }
      }));
      window.dispatchEvent(new CustomEvent(GO_EV, {
        detail: {
          page_id,
          head,
          header: chunck.header
        }
      }));

      if (updated) {
        CONTENT.classList.add('transit');
        CONTENT.innerHTML = '';
        load = true; // Искуственная задержка, чтобы все выглядело плавно

        await wait(1000);
        element = document.createElement('div');

        for (let [key, value] in chunck.attrs) {
          if (key != 'class') element.setAttribute(key, value);else {
            element.classList = value;
          }
        }

        element.classList.add('wrap');
        element.innerHTML = marked(chunck.content);
        last = page_id;
        CONTENT.append(element);
        CONTENT.classList.remove('transit');
        await wait(200);
        load = false;
      } else {
        element = CONTENT.querySelector('.wrap');
      } // Ожидаем окончания загрузки


      await onAllLoaded(element.getElementsByTagName('img'));
      if (head) whell(head);
      if (updated) window.dispatchEvent(new CustomEvent(CHANGE_DONE_EV, {
        detail: {
          page_id,
          head,
          header: chunck.header,
          headers: element.querySelectorAll('h1, h2, h3, h4, h5, h6')
        }
      }));
      window.dispatchEvent(new CustomEvent(DONE_EV, {
        detail: {
          page_id,
          head,
          header: chunck.header,
          headers: element.querySelectorAll('h1, h2, h3, h4, h5, h6')
        }
      }));
    }
  };

  {
    const pages = document.querySelectorAll('script[type="page-pattern"]');

    for (let i = 0, leng = pages.length, tabw = 0, tabr; i < leng; i++) {
      tabw = pages[i].innerHTML.match(/^([\t ]+)/m)[0];
      tabr = new RegExp('^' + (tabw != null ? tabw : ''), 'gm');
      PAGES.set(pages[i].getAttribute('name'), {
        attrs: new Map(Array.from(pages[i].attributes).map(e => [e.name, e.value]).filter(e => !IGNORE.includes(e[0]))),
        content: pages[i].innerHTML.replace(tabr, '').replace(/^(#+)(.*)~\[([aA-zZаА-яЯёЁ_0-9]+)\]$/gm, "$1 <span id='$3' class='marker'></span>$2\n"),
        header: (pages[i].innerHTML.match(/^(?:\t| )*#+(?:\t| )*(.+)$/m) || [])[1]
      });
      pages[i].remove();
    }
  }
  {
    const links = document.querySelectorAll('*[type="c-link"');

    function drop(t, e) {
      e.preventDefault();
      const target = (t.getAttribute('target') || '').split('#');
      if (target.length > 0) loadPage(target[0], target[1]);
    }

    for (let i = 0, leng = links.length; i < leng; i++) {
      links[i].addEventListener('click', drop.bind(null, links[i]));
    }

    window.page.drop = drop;
  }
  window.page.loadPage = loadPage;
  window.page.whell = whell;
}
;