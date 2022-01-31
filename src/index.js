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

    // childNodesを取得
    const charList = getCharInfoList([...elm.childNodes]);

    // Data属性取得
    const delay = elm.dataset.onebyDelay ? parseFloat(elm.dataset.onebyDelay) : 0;
    const interval = elm.dataset.onebyInterval ? parseFloat(elm.dataset.onebyInterval) : 0;
    const duration = elm.dataset.onebyDuration ? elm.dataset.onebyDuration : null;


    // elmにクラス（one_by_one）設定
    elm.classList.add(CLASS_SET);

    elm.innerHTML = getHtml(charList, delay, interval, duration);
}

/**
 * 子ノード配列を1文字ずつの情報（nodeType, data(char or tab)）の配列にして返す
 * @param {Node[]} nodeList 
 * @returns 
 */
function getCharInfoList(nodeList) {
    let resultArray = [];
    for (let node of nodeList) {
        let type = node.nodeType;
        if (type == 1) {
            resultArray.push({
                type: type,
                data: node.outerHTML
            })
        } else if (type == 3) {
            for (let char of node.textContent.split("")) {
                resultArray.push({
                    type: type,
                    data: char
                })
            }
        } else {
            throw new Error("Invalid Node is involved.");
        }
    }
    

    return resultArray;
}

/**
 * 1文字ずつ<span>でくくったHTMLを返す
 * @param {Object[]} charList 
 * @param {float} delay 
 * @param {float} interval 
 * @returns 
 */
function getHtml(charList, delay, interval, duration) {
    const charObjArray = addRundomOrder(charList);
    console.log(charObjArray);
    let html = "";
    for(let obj of charObjArray) {
        
        const tDelay = Math.round((delay + interval * obj.order) * 100) / 100;

        if (obj.type == 1) {
            html += obj.data;
        } else {
            if (duration) {
                html += `<span class="oneby_char" style="transition-delay: ${tDelay}s;transition-duration: ${duration}s;">${obj.data}</span>`;
            } else {
                html += `<span class="oneby_char" style="transition-delay: ${tDelay}s">${obj.data}</span>`;
            }
        }
        
    };
    return html;
}

/**
 * 1文字配列とランダム順を持つオブジェクト配列を返す
 * @param {Object[]} charList 
 * @returns {obj[]}
 */
function addRundomOrder(charList) {
    let tArray = [], rArray = [];

    // 文字数を取得
    let count = 0;
    for (let char of charList) {
        if (char.type == 3) {
            count += 1;
        }
    }

    // 仮配列（0 ~)を作成
    for(let i = 0; i < count; i++) {
        tArray[i] = i;
    }
    tArray = arrayShuffle(tArray);
    
    // シャッフル
    for(let i = 0; i < charList.length; i++) {
        if (charList[i].type == 3) {
            charList[i].order = tArray[i];
        } else {
            charList[i].order = -1;
        }
        
    }
    return charList;
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

