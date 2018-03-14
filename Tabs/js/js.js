// $('.tabs').each(function(i,ele){
//     $(ele).children('.tabs-bar').children('li').eq(0).addClass('active');
//     $(ele).children('.tabs-content').children('li').eq(0).addClass('active');
// })
// $('.tabs > .tabs-bar > li').on('click', function(e){
// //$('.tabs').on('click', '.tabs-bar > li', function(e){
//     var $li = $(e.currentTarget);
//     $li.addClass('active').siblings('li').removeClass('active');
//     var index = $li.index();
//     var $content = $li.closest('.tabs').find('.tabs-content > li').eq(index);
//     $content.addClass('active').siblings('li').removeClass('active');
// })



// function Tabs(c) {
//     this.ele = $(c);
//     this.init();
//     this.bindEvents();
// }
// Tabs.prototype.init = function() {
//     this.ele.each(function(i,ele){
//         $(ele).children('.tabs-bar').children('li').eq(0).addClass('active');
//         $(ele).children('.tabs-content').children('li').eq(0).addClass('active');
//     })
// }
// Tabs.prototype.bindEvents = function() {
//     this.ele.on('click', '.tabs-bar > li', function(e){
//         var $li = $(e.currentTarget);
//         $li.addClass('active').siblings('li').removeClass('active');
//         var index = $li.index();
//         var $content = $li.closest('.tabs').find('.tabs-content > li').eq(index);
//         $content.addClass('active').siblings('li').removeClass('active');
//     })
// }



class Tabs {
    constructor(c) {
        this.ele = $(c);
        this.init();
        this.bindEvents();
    }
    init() {
        this.ele.each(function(i,ele){
            $(ele).children('.tabs-bar').children('li').eq(0).addClass('active');
            $(ele).children('.tabs-content').children('li').eq(0).addClass('active');
        })
    }
    bindEvents() {
        this.ele.on('click', '.tabs-bar > li', function(e){
            var $li = $(e.currentTarget);
            $li.addClass('active').siblings('li').removeClass('active');
            var index = $li.index();
            var $content = $li.closest('.tabs').find('.tabs-content > li').eq(index);
            $content.addClass('active').siblings('li').removeClass('active');
        })
    }
}
var tabs = new Tabs('.tabs');