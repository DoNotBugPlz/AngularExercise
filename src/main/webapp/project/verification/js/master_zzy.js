$(function(){

});

function page_tit_zzy2(){
    $(".page_tit_zzy2 li a").click(function(){
        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");
    })
}

function super_sel(){
    $(".super_sel").click(function(){
        if(!$(this).hasClass("up")){
            $(this).addClass("up");
            $(".leftSel_table_zzy").removeClass("over_hide2");
        }else{
            $(this).removeClass("up");
            $(".leftSel_table_zzy").addClass("over_hide2");
        }

    })
}

function ipt_check(){
    $(".ipt_check").click(function(){
        if(!$(this).hasClass("checked")){
            $(this).addClass("checked")
        }else{
            $(this).removeClass("checked")
        }

    })
}

function sel_check(){
    $(".sel_check").click(function(){
        if(!$(this).hasClass("checked")){
            $(this).addClass("checked")
        }else{
            $(this).removeClass("checked")
        }

    })
}
// 动态获取input框大小
function ipt_size(){
    var w1=$(".sel_ipt_zzy_c").outerWidth();
    $(".sel_ipt_zzy_size").css("width",w1+"px");
}