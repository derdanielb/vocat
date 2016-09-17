/**
 * Created by markus on 27.05.16.
 */
ccm.component( {
    name: 'vocab-trainer',
    config: {
        key: 'vocab',
        html: [ccm.store, {local: 'http://derdanielb.github.io/vocat/ccm_vocab/templates.json'}],
        style: [ccm.load, 'http://derdanielb.github.io/vocat/vocat/ccm_vocab/style.css'],
        //store: [ccm.store, {local: 'json/vocab.json'}],
        store: [ ccm.store, { url: 'ws://ccm2.inf.h-brs.de/index.js', store: 'vokabeltrainer' }],
        user: [ccm.instance, 'http://kaul.inf.h-brs.de/ccm/components/user2.js']
    },
    Instance: function () {
        var self = this;

        self.render = function(callback) {
            var element = ccm.helper.element(self);


            //self.user.login(function() {
            if(self.vocfield){
                self.key = self.vocfield;
            }
            console.log(self.key);
                self.store.get(self.key, function (dataset) { // Ab hier this == window, deshalb self!!!

                    if (dataset === null) {
                        self.store.set({key: self.key, pairs: []}, proceed); // Falls store leer
                    }
                    else {
                        proceed(dataset);
                    }
                    function proceed(dataset) {

                        // self.html.get('main') holt das
                        // json Objekt 'main' aus dem lokalen store. ccm.helper.html wandelt dieses in HTML-Form um.
                        // element.html übergibt diese dann schließlich an die Website

                        // Anlegen des Main-Containers
                        var div_main = ccm.helper.html(self.html.get('main'));
                        element.html(div_main);
                        element.find('div#currcat').html("Current category: "+self.vocfield);

                        // Div-Module vorbereiten
                        var div_content = ccm.helper.html(self.html.get('content'));
                        var div_nav = ccm.helper.html(self.html.get('nav'));
                        var div_nav_add = ccm.helper.html(self.html.get('nav-add'));
                        var div_nav_train = ccm.helper.html(self.html.get('nav-train'));
                        var div_nav_show = ccm.helper.html(self.html.get('nav-show'));
                        var div_nav_reset = ccm.helper.html(self.html.get('nav-reset'));
                        var div_nav_delete = ccm.helper.html(self.html.get('nav-delete'));
                        var div_subnav_add = ccm.helper.html(self.html.get('subnav-add'));
                        var div_subnav_card = ccm.helper.html(self.html.get('subnav-card'));
                        var div_card = ccm.helper.html(self.html.get('card'));
                        var div_show = ccm.helper.html(self.html.get('show'));
                        var div_reset_text = ccm.helper.html(self.html.get('reset-text'));

                        // Form-Funktionen vorbereiten
                        var form_nav_add = div_nav_add.find('form')[0];
                        var form_nav_train = div_nav_train.find('form')[0];
                        var form_nav_show = div_nav_show.find('form')[0];
                        var form_nav_reset = div_nav_reset.find('form')[0];
                        var form_nav_delete = div_nav_delete.find('form')[0];
                        var form_subnav_add = div_subnav_add.find('form')[0];
                        var form_subnav_card = div_subnav_card.find('form')[0];

                        // Text-Inputs vorbereiten
                        var input_subnav_add_word1 = div_subnav_add.find('input')[0];
                        var input_subnav_add_word2 = div_subnav_add.find('input')[1];
                        var input_subnav_card_word = div_subnav_card.find('input')[0];

                        // Listen vorbereiten
                        var ol_show = $(div_show.find('ol')[0]);

                        // HTML-Aufbau generieren
                        div_main.append(div_nav);
                        div_main.append(div_content);
                        div_nav.append(div_nav_add);
                        div_nav.append(div_nav_train);
                        div_nav.append(div_nav_show);
                        div_nav.append(div_nav_reset);
                        div_nav.append(div_nav_delete);

                        //dataset.pairs = []; // Alle Wortpaare löschen
                        //self.store.set(dataset, function () {}); // Speichern des Dataset im Store

                        data = dataset;

                        // Buttonsteuerung definieren
                        form_nav_add.onsubmit = function nav_add_button() {
                            div_content.empty();
                            div_content.append(div_subnav_add);

                            form_subnav_add.onsubmit = function subnav_add_button() {
                                if (input_subnav_add_word1.value == "")
                                    input_subnav_add_word1.nextSibling.style.display = "block";
                                else
                                    input_subnav_add_word1.nextSibling.style.display = "none";
                                if (input_subnav_add_word2.value == "")
                                    input_subnav_add_word2.nextSibling.style.display = "block";
                                else
                                    input_subnav_add_word2.nextSibling.style.display = "none";

                                if (input_subnav_add_word1.value != "" && input_subnav_add_word2.value != "") {
                                    dataset.pairs[dataset.pairs.length] =
                                    {
                                        "word": input_subnav_add_word1.value,
                                        "translation": input_subnav_add_word2.value,
                                        //"user": self.user.data().key,
                                        "known": false
                                    };
                                    input_subnav_add_word1.value = "";
                                    input_subnav_add_word2.value = "";
                                }

                                self.store.set(dataset, function () {
                                }); // Speichern des Dataset im Store

                                return false;
                            };

                            return false;
                        };

                        form_nav_train.onsubmit = function nav_train_button() {
                            div_content.empty();
                            div_content.append(div_card);
                            div_content.append(div_subnav_card);

                            div_card.empty();

                            var div_word;
                            var pair;
                            var not_known_vocab = dataset.pairs.filter(function (index) {
                                return index.known == false
                            }); // Alle nicht gewussten Vokabeln
                            if (not_known_vocab.length > 0) {
                                var rand = Math.floor((Math.random() * not_known_vocab.length));

                                pair = not_known_vocab[rand];
                                div_word = ccm.helper.html(self.html.get('word'), {
                                    word: ccm.helper.val(pair.word)
                                });
                                $(form_subnav_card).show();
                            }
                            else {
                                div_word = ccm.helper.html(self.html.get('no_unknown_words'));
                                $(form_subnav_card).hide();
                            }

                            div_card.append(div_word);

                            form_subnav_card.onsubmit = function subnav_train_check_button() {
                                var warning_text = input_subnav_card_word.nextSibling.nextSibling;

                                if (input_subnav_card_word.value == "") {
                                    warning_text.style.display = "block";
                                    warning_text.style.margin = "0";
                                }
                                else {
                                    warning_text.style.display = "none";

                                    pair.known = input_subnav_card_word.value == pair.translation;
                                    input_subnav_card_word.value = "";
                                    warning_text.style.display = "none";
                                    self.store.set(dataset, function () {
                                        nav_train_button(); // Muss hier rein wegen dem Callback
                                    });
                                }

                                return false;
                            };

                            return false;
                        };

                        form_nav_show.onsubmit = function nav_show_button() {
                            div_content.empty();
                            div_content.append(div_show);

                            ol_show.empty();

                            for (var i = 0; i < dataset.pairs.length; i++) {
                                var pair = dataset.pairs[i];
                                var div_word_pair = ccm.helper.html(self.html.get('word-pair'), {
                                    word: ccm.helper.val(pair.word),
                                    translation: ccm.helper.val(pair.translation)
                                });
                                ol_show.append(div_word_pair);
                            }
                            return false;
                        };

                        form_nav_reset.onsubmit = function nav_reset_button() {
                            div_content.empty();

                            for (var i = 0; i < dataset.pairs.length; i++) {
                                dataset.pairs[i].known = false;
                            }
                            self.store.set(dataset, function () {
                            }); // Speichern des Dataset im Store

                            div_content.append(div_reset_text);

                            return false;
                        };

                        form_nav_delete.onsubmit = function nav_delete_button() {
                            div_content.empty();
                            div_content.append(div_show);

                            ol_show.empty();

                            for (var i = 0; i < dataset.pairs.length; i++) {
                                var pair = dataset.pairs[i];
                                var div_word_pair = ccm.helper.html(self.html.get('word-pair-delete'), {
                                    word: ccm.helper.val(pair.word),
                                    translation: ccm.helper.val(pair.translation)
                                });
                                ol_show.append(div_word_pair);

                                var form_delete = div_word_pair.find('form')[0];

                                $(form_delete).append(ccm.helper.html(self.html.get('identifier'), {
                                    hidden: i
                                }));

                                form_delete.onsubmit = function delete_button() {
                                    var e = this;
                                    var id = e.childNodes.item(1).textContent;

                                    var tmpdataset = dataset.pairs.filter(function (index) {
                                        return index.word != dataset.pairs[id].word;
                                    });
                                    dataset.pairs = tmpdataset;

                                    self.store.set(dataset, function () {
                                        nav_delete_button(); // Muss hier rein wegen dem Callback
                                    });

                                    return false;
                                }

                            }
                            return false;
                        };

                        if (callback) {
                            callback();
                        }

                    }
                });

            //});


        }
    }
} );