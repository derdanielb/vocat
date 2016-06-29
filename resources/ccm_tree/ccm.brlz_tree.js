ccm.component({
    name: "brlz_tree",
    config: {
        html: [ccm.store, {local: "http://derdanielb.github.io/vocat/resources/ccm_tree/template.js"}],
        jquery_ui: [ccm.load, "https://code.jquery.com/ui/1.12.0-rc.2/jquery-ui.min.js"],
        style: [ccm.load, "http://derdanielb.github.io/vocat/resources/ccm_tree/tree.css"],
        tree: [ccm.load, this.dir]
    },
    Instance: function () {
        this.render = function () {
            console.log("tree");
            function e(e, t) {
                d.whatacall(e)
            }

            function t(e) {
                e.each(function (e, t) {
                    "http://derdanielb.github.io/vocat/resources/ccm_tree/img/folder_blank_file16.png" === g.find(t).attr("src") ? g.find(t).attr("src", "http://derdanielb.github.io/vocat/resources/ccm_tree/img/folder_blank_file16_folded.png") : "http://derdanielb.github.io/vocat/resources/ccm_tree/img/folder_blank_file16_folded.png" === g.find(t).attr("src") ? g.find(t).attr("src", "http://derdanielb.github.io/vocat/resources/ccm_tree/img/folder_blank_file16.png") : "http://derdanielb.github.io/vocat/resources/ccm_tree/img/c_middle.png" !== g.find(t).attr("src") && "http://derdanielb.github.io/vocat/resources/ccm_tree/img/c_last.png" !== g.find(t).attr("src") && "c_bridge.png" !== g.find(t).attr("src") && g.find(t).toggle("fast")
                })
            }

            function r(e) {
                e.preventDefault(), e.stopPropagation();
                var r = g.find(this).children();
                t(r)
            }

            function i(e, t, r) {
                Object.getOwnPropertyNames(t).forEach(function (i) {
                    "Folder" === i && c(e, t.Folder, r), "File" === i && n(e, t.File, r)
                })
            }

            function c(e, t, c) {
                function n(e, t) {
                    var r = t.draggable;
                    r.insertAfter($("#" + e.target.id).children()[0])
                }

                var a = 0;
                t.forEach(function (s) {
                    var h = JSON.parse(JSON.stringify(l)), m = JSON.parse(JSON.stringify(o)), f = JSON.parse(JSON.stringify(o)), u = !1, b = e.split("_").length - 1, _ = 20;
                    c && (h.style = "padding-left : " + _ + "px", p = !0, b--), Object.getOwnPropertyNames(s).forEach(function (c, l, o) {
                        "name" === c && (h.inner = s[c], h.id = e + "_" + a, a++, a < t.length ? f.src = "http://derdanielb.github.io/vocat/resources/ccm_tree/img/c_middle.png" : (f.src = "http://derdanielb.github.io/vocat/resources/ccm_tree/img/c_last.png", u = !0), u && b > 1 && b--, _ = "node" === e ? 0 : 20, h.style = "padding-left : " + _ + "px", ccm.helper.find(d, "#" + e).append(ccm.helper.html(h)), ccm.helper.find(d, "#" + h.id).append(ccm.helper.html(f)), ccm.helper.find(d, "#" + h.id).append(ccm.helper.html(m)), g.find("div#" + h.id).on("click", r), g.find("div#" + h.id).droppable({drop: n})), "content" === c && "" !== t[c] && i(h.id, s[c], u)
                    })
                })
            }

            function n(t, r, i) {
                var c = 0, n = t.split("_").length - 1;
                r.forEach(function (l) {
                    var o = JSON.parse(JSON.stringify(l)), p = JSON.parse(JSON.stringify(a)), h = JSON.parse(JSON.stringify(s)), m = JSON.parse(JSON.stringify(s));
                    o.id = t + "-" + c, p.onclick = e.bind(null, l.ref), p.inner = l.name, p.id = t + "-" + c + "ref", c++;
                    var f = "20px";
                    i && (o.style = "padding-left : " + f, n -= 1), c < r.length ? m.src = "http://derdanielb.github.io/vocat/resources/ccm_tree/img/c_middle.png" : m.src = "http://derdanielb.github.io/vocat/resources/ccm_tree/img/c_last.png", f = 20, o.style = "padding-left : " + f + "px", ccm.helper.find(d, "#" + t).append(ccm.helper.html(o));
                    var u = ccm.helper.find(d, "#" + o.id);
                    g.find("div#" + o.id).click(function (e) {
                        e.stopPropagation()
                    }), g.find("div#" + o.id).draggable({
                        cursor: "move",
                        helper: "clone",
                        revert: "invalid",
                        snap: ".folder"
                    }), ccm.helper.find(d, "#" + o.id).append(ccm.helper.html(m)), u.append(ccm.helper.html(h)), u.append(ccm.helper.html(p))
                })
            }

            var d = this, l = {tag: "div", "class": "folder", id: "%placeholder%", inner: "a folder"}, a = {
                tag: "div",
                href: "",
                target: "_blank",
                style: "text-decoration: none",
                inner: ""
            }, o = {
                tag: "img",
                src: "http://derdanielb.github.io/vocat/resources/ccm_tree/img/folder_blank_file16.png",
                align: "left",
                style: "margin-right: 4px;"
            }, s = {
                tag: "img",
                src: "http://derdanielb.github.io/vocat/resources/ccm_tree/img/new_document16resized.png",
                align: "left",
                "class": "FileImg",
                style: "margin-right: 4px;"
            }, p = !1, g = ccm.helper.element(this);
            g.html(ccm.helper.html(d.html.get("root")));
            var h;
            //$.getJSON(this.dir, function (e) {
            //e = ccm.load(this.dir);
            console.log(this.tree);
                h = this.tree, i("node", e.Root, !1)
            //})
        }
    }
});