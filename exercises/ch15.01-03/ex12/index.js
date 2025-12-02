// 本当はやりたかったこと：teamsで録画した会議のトランスクリプトを、Gemini nanoを要約してtxtファイルに保存するブックマークレット
// Gemini nanoの環境セットアップがうまくできず、、、

javascript: (() => {
    const nodes = document.querySelectorAll('span[class^="itemDisplayName"]'); // teams streamの話者の名前が取れそうなクラス
    const names = [...nodes]
        .map(el => (el.textContent || '').trim())
        .filter(Boolean); // DOMの要素リストを展開し、textContentを取り出し、整える

    const uniq = [...new Set(names)];

    console.log('参加メンバー（話者）:');
    uniq.forEach((n, i) => console.log(`${i + 1}. ${n}`));
})();

