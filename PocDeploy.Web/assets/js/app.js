
(function () {

    "use strict";

    var UI = {

        Nav: {
            init: ()=>{
                $(".js-toggle-nav").on("click", function(e){
                    $("body").toggleClass("show-menu");
                    e.preventDefault();
                });
            }
        },

        Slider: {
            init: ()=>{
                $('.carousel').slick({
                    mobileFirst: true,
                    dots: true,
                    arrows: false,
                    autoplay: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });
            }                
        },

        Footer: {
            init: () => {
                $(".footer__header").on("click", function (e) {
                    $(this).closest(".footer__columns").toggleClass("is-open");
                    e.preventDefault();
                });
            }
        },

        Directlink: {
            
            $dl: $(".directlink:first"),

            init: function(){
                let self = this;

                 if (UI.Tools.hasStorage) {

                     if (typeof sessionStorage.directlinkShown === "undefined") {
                         self.show();
                         sessionStorage.directlinkShown = "true";
                     }
                 } else if (typeof UI.Tools.getCookie('directlinkShown') === "undefined") {

                     self.show();
                     UI.Tools.setCookie('directlinkShown', 'true', 1);
                 }

                self.$dl.find(".js-close").on("click", function(e){
                    e.preventDefault();
                    self.$dl.removeClass("directlink--active");
                });
            },

            show: function () {
                let self = this;

                setTimeout(function () {
                    self.$dl.addClass("directlink--active");
                    Foundation.Motion.animateIn(self.$dl.find('.directlink__entrance'), "hinge-in-from-middle-x");
                }, 1000);
            }
        },

        Video: {
            apiLoaded: false,
            player: null,
            video: {
                tagId: "",
                videoId: ""
            },

            init: function () {
                let self = this;
                $(".js-video-link").on("click", self.launch);
            },

            launch: function (e) {

                e.preventDefault();

                let self = UI.Video;
                self.video.tagId = $(this).attr("href").replace("#", "");
                self.video.videoId = $(this).data('video');
                $(this).closest(".video").addClass("video--loading");

                if (!self.apiLoaded) {
                    window.onYouTubeIframeAPIReady = self.loadVideo; // callback func
                    var tag = document.createElement('script');
                    tag.src = "https://www.youtube.com/iframe_api";
                    var firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                } else {
                    self.loadVideo();
                }
            },

            loadVideo: function () {
                let self = UI.Video;
                self.apiLoaded = true;

                self.player = new YT.Player(self.video.tagId, {
                    height: '500',
                    width: '100%',
                    videoId: self.video.videoId,
                    events: {
                        'onReady': self.playVideo
                        //,'onStateChange': onPlayerStateChange
                    }
                });
            },

            playVideo: function (event) {

                $(event.target.a).closest(".video").addClass("video--playing");

                setTimeout(function () {
                    event.target.playVideo();
                }, 800);
            }

        },

        CookieInfo: {
            
            $ci: $(".cookie:first"),

            init: function () {
                let self = this;

                if (UI.Tools.hasStorage) {

                    if (typeof localStorage.cookie_info === "undefined") {
                        self.show();
                        localStorage.cookie_info = "accepted";
                    }
                } else if (typeof UI.Tools.getCookie('cookie_info') === "undefined") {

                    self.show();
                    UI.Tools.setCookie('cookie_info', 'accepted', 365);
                }

                self.$ci.find(".js-close").on("click", function(e){
                    e.preventDefault();
                    self.$ci.removeClass("cookie--active");
                });

            },

            show: function () {
                let self = this;
                setTimeout(function () {
                    self.$ci.addClass("cookie--active");
                }, 800);
            }
        },

        Tools: {
            hasStorage: function () {
                try {
                    localStorage.setItem(mod, mod);
                    localStorage.removeItem(mod);
                    return true;
                } catch (exception) {
                    return false;
                }
            },
            getCookie: function (cname) {
                let name = cname + "=";
                let ca = document.cookie.split(';');
                //for (var i = 0; i < ca.length; i++) {
                for (let i of ca) {
                    let c = ca[i];
                    while (c.charAt(0) === ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) === 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            },
            setCookie: function (cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                //document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
                document.cookie = `${cname}=${cvalue};${expires};path=/";`;
            }
        }
    };

    $(document).foundation();

    var $drill = new Foundation.Drilldown($('.header__drill'), {
        backButton: '<li class="js-drilldown-back"><a tabindex="0">Tilbage</a></li>'
    });

    UI.CookieInfo.init();
    UI.Video.init();
    UI.Slider.init();
    UI.Nav.init();
    UI.Directlink.init();
    UI.Footer.init();

})();
