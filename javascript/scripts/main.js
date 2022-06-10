// ボタン
const rm = document.querySelector('.rm');
const add = document.querySelector('.add');

// <ul/>タグ 
let codeList = document.querySelector('.code-list');

// 疑似乱数を3桁区切りで生成 
const createFakeCodes = () => {
    const randomNum = Math.floor(Math.random() * 1000000);
    const organizedNum = ("000000" + randomNum).slice(-6);
    return organizedNum.slice(0, 3) + " " + organizedNum.slice(3, 6);
};
let n = 0;
/** 10sほどでsvgのストロークが一周する 
 * 問題点：クリックで要素が追加される度に回転速度が早まってしまう
 * 逆に削除すると遅くなる。↓
 * */
setInterval(() => {
    const pies = document.querySelectorAll('.fake__pie__after');
    pies.forEach((el) => {
        if (n < 145) { n += 0.25 } else {
            n = 0;
            const eachFakeCodes = document.querySelectorAll('.fake__num');
            eachFakeCodes.forEach((el) => el.textContent = createFakeCodes());
        }
        el.style.strokeDasharray = `${n} 145`;
    });
}, 65);

// 雛形生成するクラス 
class CodeTemplate {
    constructor() {
        this.initTemplate();
        this.code = createFakeCodes();
    }
    initTemplate() {
        return `
    <p class="code-number">Fake code No.${codeList.childElementCount + 1}</p>
    <div class="fake">
        <p class="fake__num">${this.code}</p>
        <div class="fake__pie">
            <svg class="fake__pie__svg" viewBox="0 0 90 90">
                <circle cx="50%" cy="50%" r="22.5" class="fake__pie__after"></circle>
            </svg>
        </div>
    </div>`;
    }
}
// clickでnodeを追加
const addNewCode = () => {
        const template = new CodeTemplate().initTemplate();
        const newList = document.createElement('li');
        newList.className = "code-list__item";
        newList.innerHTML = template;
        codeList.appendChild(newList);
    }
    // 削除
const rmCode = () => {
    codeList.removeChild(codeList.lastChild);
}

rm.addEventListener('click', () => {
    rmCode();
    rm.disabled = codeList.childElementCount ? false : true; // listが無くなったらbutton無効
});
add.addEventListener('click', () => {
    addNewCode();

    rm.disabled = false;
});

/** 初期状態 */
addNewCode();
addNewCode();
addNewCode();
Circle10s();