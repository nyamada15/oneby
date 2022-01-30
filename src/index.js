import './style.scss';
import "core-js/stable";
import "regenerator-runtime/runtime";

'use strict';

const CLASS_SET = "one_by_one";
const CLASS_EXE = "is_show";

/**
 * Oneby
 * テキストを1文字ずつ表示する
 * @param {string} selector 
 * @returns Object
 */ 

window.Oneby = (selector) => {
    const elm = document.querySelectorAll(selector);  // Nodelist
    let isOneElement = true;
    if (elm.length > 1) {
        isOneElement = false;
    }
    for(let element of elm) {
        exeOneby(element);
    }
    
    return {
        runEffect: function(element) {
            try {
                if (element) {
                    if (element.length > 1) {
                        throw new Error("Invalid parameter.");
                    } else {
                        element.classList.add(CLASS_EXE);
                    }
                    
                } else {
                    if (isOneElement) {
                        elm.item(0).classList.add(CLASS_EXE);
                    } else {
                        throw new Error("Prameter(Element Object) is needed.");
                    }
                    
                }
            } catch (e) {
                console.error(e.message);
            }
            
            
        }
    }
};

/**
 * Set effect.
 * @param {Element} elm 
 */
function exeOneby(elm) {

    // Data属性取得
    const text = elm.innerHTML;
    const delay = elm.dataset.onebyDelay ? parseFloat(elm.dataset.onebyDelay) : 0;
    const interval = elm.dataset.onebyInterval ? parseFloat(elm.dataset.onebyInterval) : 0;
    const duration = elm.dataset.onebyDuration ? elm.dataset.onebyDuration : null;


    // elmにクラス（one_by_one）設定
    elm.classList.add(CLASS_SET);

    elm.innerHTML = getHtml(text, delay, interval, duration);
}

/**
 * 1文字ずつ<span>でくくったHTMLを返す
 * @param {String} text 
 * @param {float} delay 
 * @param {float} interval 
 * @returns 
 */
function getHtml(text, delay, interval, duration) {
    const charObjArray = addRundomOrder(text.split(""));
    let html = "";
    // charObjArray.forEach((obj) => {
    //     const tDelay = Math.round((delay + interval * obj.order) * 100) / 100;
    //     if (duration) {
    //         html += `<span class="oneby_char" style="transition-delay: ${tDelay}s;transition-duration: ${duration}s;">${obj.char}</span>`;
    //     } else {
    //         html += `<span class="oneby_char" style="transition-delay: ${tDelay}s">${obj.char}</span>`;
    //     }
        
    // });
    for(let obj of charObjArray) {
        
        const tDelay = Math.round((delay + interval * obj.order) * 100) / 100;
        if (duration) {
            html += `<span class="oneby_char" style="transition-delay: ${tDelay}s;transition-duration: ${duration}s;">${obj.char}</span>`;
        } else {
            html += `<span class="oneby_char" style="transition-delay: ${tDelay}s">${obj.char}</span>`;
        }
        
    };
    return html;
}

/**
 * 1文字配列とランダム順を持つオブジェクト配列を返す
 * @param {string[]} array 
 * @returns {obj[]}
 */
function addRundomOrder(array) {
    let tArray = [], rArray = [];

    // 仮配列（0 ~)を作成
    for(let i = 0; i < array.length; i++) {
        tArray[i] = i;
    }
    tArray = arrayShuffle(tArray);
    
    // シャッフル
    for(let i = 0; i < array.length; i++) {
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
    for(let i = (array.length - 1); 0 < i; i--){

        // 0〜(i+1)の範囲で値を取得
        const r = Math.floor(Math.random() * (i + 1));

        // 要素の並び替えを実行
        const tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
    }
    return array;
}

