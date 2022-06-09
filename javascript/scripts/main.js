// ボタン
const rm = document.querySelector('.rm');
const add = document.querySelector('.add');

// <ul/>タグ 
let codeList = document.querySelector('.code-list');

//10sかけてsvg描画 
function rotatePerTen() {
    let n = 0;
    const pie = document.querySelectorAll('.fake__pie__after');
    setInterval(() => {
        n += 0.5;
        if (n > 145) {
            clearInterval();
        } else {
            pie.forEach((el) => {
                el.style.strokeDasharray = `${n} 145`;
            });
        }
    }, 10000 / (145 * 2));
}
// 疑似乱数を3桁区切りで生成 
const createFakeCodes = () => {
    const randomNum = Math.floor(Math.random() * 1000000);
    const organizedNum = ("000000" + randomNum).slice(-6);
    return organizedNum.slice(0, 3) + " " + organizedNum.slice(3, 6);
};
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
        const newLi = document.createElement('li');
        newLi.className = "code-list__item";
        newLi.innerHTML = template;
        codeList.appendChild(newLi);
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
rotatePerTen();

setInterval(() => {
    rotatePerTen();
    const eachFakeCodes = document.querySelectorAll('.fake__num');
    eachFakeCodes.forEach((el) => el.textContent = createFakeCodes());
}, 10000);