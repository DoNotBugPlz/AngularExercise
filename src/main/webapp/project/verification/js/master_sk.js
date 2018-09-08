$(function(){
    leftMenu();
    titleTab();
    sheetTab();
    popupMenu();
    topNav();
    popup();
});

//顶部菜单
function topNav(){
    $(".btn_enter p").on("click", function(){
        if($(".btn_enter ul").is(':hidden')){
            $(".btn_enter ul").fadeIn(100);
        }else{
            $(".btn_enter ul").fadeOut(100);
        }
    });
    $(".func_icon.ulShow").on("click", function(){
        if($(".func_ullist").is(':hidden')){
            $(".func_ullist").fadeIn(100);
        }else{
            $(".func_ullist").fadeOut(100);
        }
    })
}

//左侧菜单栏
function leftMenu(){
    $(".menu_icon a").on("click", function(){
        $(this).addClass("active").siblings().removeClass("active");
    });

    $(".second_list li").on("click", function(){
        $(".second_list li").removeClass("active");
        $(this).addClass("active").siblings().removeClass("active");
    });

    $(".leftSide_menu ul li p").on("click", function(){
        var _this = $(this);
        _this.parent().addClass("active");
        _this.parent().siblings().removeClass("active");
        if(_this.parent().hasClass("show")){
            _this.siblings(".second_list").slideUp(300);
            setTimeout(function(){
                _this.parent().removeClass("show");
            }, 300);
        }else{
            _this.siblings(".second_list").slideDown(300);
            _this.parent().siblings().children(".second_list").slideUp(300);
            setTimeout(function(){
                _this.parent().addClass("show");
                _this.parent().siblings().removeClass("show");
            }, 300);
        }
    });

    $(".swiper_btn").on("click", function(){
        if($(".leftSide_menu").css("width") == "57px"){
            $(".leftSide_menu ul").stop(true, true).animate({left: "0px"}, "swing");
            $(".rightMenuBox").stop(true, true).animate({left: "140px"}, "swing");
            $(".leftSide_menu").stop(true, true).animate({width: "140px"}, "swing");
            $(".rightSide_area").stop(true, true).animate({left: "140px"}, "swing", function(){
                $(".arrow_btn").css({
                    margin: "0 0 0 10px",
                    float: "left"
                });
                $(".swiper_btn").html("收起").css({
                    "width": "auto",
                    "float": "left",
                    "margin": "0",
                    "padding": "0 30px 0 14px",
                    "background": "url('../images/green/icon_arrow_swiper.png') 52px center no-repeat"
                });
            });
        }else{
            $(".leftSide_menu ul").stop(true, true).animate({left: "-140px"}, "swing");
            $(".rightMenuBox").stop(true, true).animate({left: "0px"}, "swing");
            $(".leftSide_menu").stop(true, true).animate({width: "57px"}, "swing");
            $(".rightSide_area").stop(true, true).animate({left: "57px"}, "swing");
            $(".arrow_btn").css({
                margin: "0 auto 2px",
                float: "none"
            });
            $(".swiper_btn").html("").css({
                "width": "24px",
                "float": "none",
                "margin": "0 auto",
                "padding": "0",
                "background": "url('../images/green/icon_arrow.png') center center no-repeat"
            });
        }
    });


    $(".btn_down").on("click", function(){
        var lh = $(".leftSide_menu ul").height();
        var rh = $(".menu_icon").height();
        var sh = $(".leftSide_menu ul").height() - 570;
        var sh2 = $(".menu_icon").height() - 570;
        var lt = parseInt($(".leftSide_menu ul").css("top"));
        var rt = parseInt($(".menu_icon").css("top"));
        if($(".leftSide_menu ul").is(":animated") || $(".menu_icon").is(":animated")){

        }else{
            if($(".leftSide_menu ul").css("left") == "0px"){
                if(lh > 570 && lt > -sh){
                    $(".leftSide_menu ul").stop(true, true).animate({top: (lt - 570) + "px"}, 300, "swing");
                }
            }else{
                if(rh > $(".rightMenuBox").height() && rt > -sh2){
                    $(".menu_icon").stop(true, true).animate({top: (lt - 570) + "px"}, 300, "swing");
                }
            }
        }
    });

    $(".btn_up").on("click", function(){
        var slt = parseInt($(".leftSide_menu ul").css("top"));
        var srt = parseInt($(".menu_icon").css("top"));
        if($(".leftSide_menu ul").is(":animated") || $(".menu_icon").is(":animated")){

        }else{
            if($(".leftSide_menu ul").css("left") == "0px"){
                if(slt < 0){
                    $(".leftSide_menu ul").animate({top: (slt + 570) + "px"}, 300, "swing");
                }
            }else{
                if(srt < 0){
                    $(".menu_icon").animate({top: (srt + 570) + "px"}, 300, "swing");
                }
            }
        }
    });
}


//内容区头部切换
function titleTab(){
    $(".title_tag.reSet").on("click", function(){
        $(this).addClass("active").siblings().removeClass("active");
    });

    $(".title_tab").on("click", function(){
        $(this).addClass("active").siblings().removeClass("active");
    });

    $(".subTit_tabs li").on("click", function(){
        $(this).addClass("active").siblings().removeClass("active");
    });
}

//内容区图表切换
function sheetTab(){
    $(".rightSide_box_leftTab li").on("click", function(){
        $(this).addClass("active").siblings().removeClass("active");
    })
}

//弹出菜单
function popupMenu(){
    $(".popup_button").on("click", function(){
        //$(".hp_container_content").animate({right: "0px"});
        $(".hp_popupBox").stop(true, true).animate({right: "-268px"}, function(){});
        $(".popup_button").hide();
        $(".swiperMenus").css("display", "table").show();
    });


    $(".swiperMenus").on("click", function(){
        //$(".hp_container_content").animate({right: "268px"});
        $(".hp_popupBox").stop(true, true).animate({right: "15px"}, function(){
            $(".swiperMenus").hide();
            $(".popup_button").show();
        });
    })
}

//弹出框
function popup(){
    $(".popup_close").on("click", function(){
        $(".popupBg").hide();
    });
}