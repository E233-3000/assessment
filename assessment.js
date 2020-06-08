'use strict';

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment-button');
const resultDivided　= document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

assessmentButton.onclick = () => {
    const userName = userNameInput.value; //名前をinputタグから受け取る
    if (userName.length === 0) { // 名前が空の時は処理を終了する
        return;
    }
    console.log(userName +'　ボタンが押されました。');

    /**
     * 指定したHTML要素の子供をすべて消去する
     * @param {HTMLElement} element HTMLの要素
     */
    function removeAllChildren(element) { // 子どもの要素があるかぎり削除
        while(element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    
    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided); //removeAllChildren関数を呼ぶ
    const header = document.createElement('h3'); //h3タグを作る
    header.innerText = '診断結果'; //h3タグに文字を入れる
    resultDivided.appendChild(header); //h3タグをdivに置く

    const paragraph = document.createElement('p'); //pタグを作る
    const result = assessment(userName); //assessment関数を呼ぶ
    paragraph.innerText = result; //pタグに文字を入れる
    resultDivided.appendChild(paragraph); //pタグをdivに置く

    //tweetエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a'); //aタグを作る
    const hrefValue = `https://twitter.com/intent/tweet?button_hashtag=${encodeURIComponent('あなたのいいところ')}&ref_src=twsrc%5Etfw`; //href属性の中身変数に代入する
    anchor.setAttribute('href', hrefValue);  //href属性にhrefValueを定義する
    anchor.className = 'twitter-hashtag-button'; //class属性を定義する
    anchor.setAttribute('data-size', 'large'); //data-size属性にサイズを定義する
    anchor.setAttribute('data-text', result); //date-text属性にresultを定義する
    anchor.innerText = 'Tweet #あなたのいいところ'; //テキストを挿入
    tweetDivided.appendChild(anchor); //aタグをdivに置く

    const script = document.createElement('script'); //scriptタグを作る
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js'); //src属性に定義する
    tweetDivided.appendChild(script); //scriptタグを置く
};

const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharcode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharcode += userName.charCodeAt(i);
    }
    // 文字のコード番号の合計を回答の数で割ってanswersの添字の数値を求める
    const index = sumOfCharcode % answers.length; //answersコレクションの添え字を求める
    let result = answers[index] //添え字を代入してanswersから一文を選ぶ
    result = result.replace(/\{userName\}/g, userName) //選ばれた文のuseraNameを入力されたuserNameに置き換える

    return result;
}

//Enterキーで動作するように設定
userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
        assessmentButton.onclick(); //assessmentButton関数を呼び出す
    }
};

console.assert(
    assessment('太郎') === assessment('太郎'),
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
