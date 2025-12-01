// divのフロントとバックの各要素を定義
const front = document.getElementById('editor-front');
const back = document.getElementById('editor-back');

export function divClick() {
    back.focus();
    front.style.backgroundColor = 'silver';
}

export function showInputText() {
    front.textContent = back.value;
}

// フォーカスが外れたら色を戻す
back.addEventListener('blur', () => {
    front.style.backgroundColor = '';
});


// イベントリスナー
front.addEventListener('click', divClick);
back.addEventListener('input', showInputText);
