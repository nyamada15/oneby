import './style.scss';
import "core-js/stable";
import "regenerator-runtime/runtime";

'use strict';


/**
 * Oneby
 * テキストを1文字ずつ表示する
 * @param {string} selector 
 * @returns Object
 */ 
// function Oneby(selector) {
    
//     jQuery(selector).each(function(i) {
//         var $this = jQuery(this);
//         var delay = $this.data('delay') ? $this.data('delay') : 0;
//         var interval = $this.data('interval') ? $this.data('interval') : 0;
        
//         $this.addClass("one_by_one").html(getHtml($this.html(), delay, interval));
        
        
//     });
//     return {
//         runEffect: function($elm) {
//             if ($elm) {
//                 $elm.addClass("is_show");
//             } else {
//                 jQuery(selector).addClass("is_show");
//             }
            
//         }
//     }
// }
window.Oneby = (selector) => {
    
    jQuery(selector).each(function(i) {
        var $this = jQuery(this);
        var delay = $this.data('oneby-delay') ? $this.data('oneby-delay') : 0;
        var interval = $this.data('oneby-interval') ? $this.data('oneby-interval') : 0;
        var duration = $this.data('oneby-duration') ? $this.data('oneby-duration') : null;
        
        $this.addClass("one_by_one").html(getHtml($this.html(), delay, interval, duration));
        
        
    });
    return {
        runEffect: function($elm) {
            if ($elm) {
                $elm.addClass("is_show");
            } else {
                jQuery(selector).addClass("is_show");
            }
            
        }
    }
};

/**
 * 1文字ずつ<span>でくくったHTMLを返す
 * @param {String} text 
 * @param {float} delay 
 * @param {float} interval 
 * @returns 
 */
function getHtml(text, delay, interval, duration) {
    var charObjArray = addRundomOrder(text.split(""));
    var html = "";
    charObjArray.forEach(function(obj) {
        var tDelay = Math.round((delay + interval * obj.order) * 100) / 100;
        if (duration) {
            html += '<span class="oneby_char" style="transition-delay:' + tDelay + 's;transition-duration:' + duration + 's, ' + duration + 's;">' + obj.char + '</span>';
        } else {
            html += '<span class="oneby_char" style="transition-delay:' + tDelay + 's">' + obj.char + '</span>';
        }
        
    });
    return html;
}

/**
 * 1文字配列とランダム順を持つオブジェクト配列を返す
 * @param {string[]} array 
 * @returns {obj[]}
 */
function addRundomOrder(array) {
    var tArray = [], rArray = [];

    // 仮配列（0 ~)を作成
    for(var i = 0; i < array.length; i++) {
        tArray[i] = i;
    }
    tArray = arrayShuffle(tArray);
    
    // シャッフル
    for(var i = 0; i < array.length; i++) {
        rArray[i] = {
            char: array[i],
            order: tArray[i]
        };
    }
    return rArray;
}

/**
 * 配列をシャッフル
 * @param {*} array 
 * @returns number[]
 */
function arrayShuffle(array) {
    for(var i = (array.length - 1); 0 < i; i--){

        // 0〜(i+1)の範囲で値を取得
        var r = Math.floor(Math.random() * (i + 1));

        // 要素の並び替えを実行
        var tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
    }
    return array;
}


// 実行
// $(function() {
// 	var kvCopy = new Oneby('#demo_oneby');
//     setTimeout(function() {
//         kvCopy.runEffect();
//     }, 500);
    
    
// });
	
