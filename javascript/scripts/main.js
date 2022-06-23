// ボタン
const rm = document.querySelector('.rm');
const add = document.querySelector('.add');

// <ul/>タグ 
let codeList = document.querySelector('.code-list');


// 疑似乱数を3桁区切りで生成 
const fakeCodeFactory = () => {
    const randomNum = Math.floor(Math.random() * 1000000);
    const to6Digits = ("000000" + randomNum).slice(-6);
    return to6Digits.slice(0, 3) + " " + to6Digits.slice(3, 6);
};
//10sかけてsvg描画&コード生成 
function rotateIn10s() {
    let num = 0;
    const interval = setInterval(() => {
        num += 0.5;
        const circles = document.querySelectorAll('.fake__pie__after');
        circles.forEach((el) => {
            el.style.strokeDasharray = `${num} 145`;
        });
    }, 10000 / (145 * 2));
    setTimeout(() => {
        clearInterval(interval);
        rotateIn10s();
        const eachFakeCodes = document.querySelectorAll('.fake__num');
        eachFakeCodes.forEach((el) => el.textContent = fakeCodeFactory());
    }, 10000);
}
rotateIn10s();

// 雛形生成
function codeTemplate() {
    const newCode = fakeCodeFactory();
    return `
    <p class="code-number">Fake code No.${codeList.childElementCount + 1}</p>
    <div class="fake">
        <p class="fake__num">${newCode}</p>
        <div class="fake__pie">
            <svg class="fake__pie__svg" viewBox="0 0 90 90">
                <circle cx="50%" cy="50%" r="22.5" class="fake__pie__after"></circle>
            </svg>
        </div>
    </div>
    `;
}
// clickでnodeを追加
const addNewCode = () => {
        const newTemplate = codeTemplate();
        const newList = document.createElement('li');
        newList.className = "code-list__item";
        newList.innerHTML = newTemplate;
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