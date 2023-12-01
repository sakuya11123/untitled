// inputScript.js

// ユーザーアイコンを作成し、ユーザーアイコンの要素を返す関数
function createAndAppendUserIcon(username) {
    const userIcon = document.createElement("div");
    userIcon.classList.add("user-icon");

    // ユーザーアイコンの画像要素を作成し追加
    const iconImage = document.createElement("img");
    iconImage.src = "path/to/your/user-icon.jpg";
    userIcon.appendChild(iconImage);

    // ユーザー名の要素を作成し追加
    const usernameElement = document.createElement("div");
    usernameElement.classList.add("username");
    usernameElement.innerText = username || "ユーザネーム"; //innerTextは入力されたものがテキストとして出力されるためサニタイジングに繋がる
    userIcon.appendChild(usernameElement);

    return userIcon;
}

// タイトルとリンクから投稿内容を作成する関数
function createPostContentWithTitleLink(title, link) {
    const postContentDiv = document.createElement("div");
    postContentDiv.classList.add("post-content");

    const titleElement = document.createElement("h2");

    // Notionのリンクの場合、リンク付きの要素を作成
    if (link.startsWith("https://") && link.includes("notion.site")) {
        const linkElement = document.createElement("a");
        linkElement.href = link;
        linkElement.target = "_blank";
        linkElement.textContent = title || "タイトルなし";
        titleElement.appendChild(linkElement);
    } else {
        // それ以外の場合、通常のテキスト要素を作成
        titleElement.innerText = title || "タイトルなし";
    }

    postContentDiv.appendChild(titleElement);

    return postContentDiv;
}

// ユーザーアイコン、投稿内容、投稿画像を含む投稿アイテムを作成する関数
function createPostItemWithTitleLink(username, title, link) {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post-item");

    // ユーザーアイコンを作成し追加
    const userIcon = createAndAppendUserIcon(username);
    postDiv.appendChild(userIcon);

    // タイトルとリンクから投稿内容を作成し追加
    const postContentDiv = createPostContentWithTitleLink(title, link);
    const postImageDiv = document.createElement("div");
    postImageDiv.classList.add("post-image");

    postDiv.appendChild(postContentDiv);
    postDiv.appendChild(postImageDiv);

    return postDiv;
}

//
function prependPostWithTitleLink(username, title, link) {
    const postContainer = document.getElementById("post-container");
    const postItem = createPostItemWithTitleLink(username, title, link);
    postContainer.insertBefore(postItem, postContainer.firstChild);//投稿の都度、一番上の要素に追加
}　　


// 入力内容を制御する関数
function inputContentControl() {
    const inputTitleElement = document.getElementById("input-title");
    const inputLinkElement = document.getElementById("input-link");

    const title = inputTitleElement.value.trim();//trimは空白文字改行を削除するメソッド
    const link = inputLinkElement.value.trim();

    if (!title && !link) {
        window.alert("タイトルとリンクが未入力です");
        return;
    }

    if (!title) {
        window.alert("タイトルが空です");
        return;
    }

    if (!link) {
        window.alert("リンクが未入力です");
        return;
    }

    if (!link.startsWith("https://") || !link.includes("notion.site")) {//includesは文字列内に指定した要素が含まれているか確認するメソッド
        window.alert('有効なNotionのURLを入力してください。');
        return;
    }

    if (title && link) {
        prependPostWithTitleLink("ユーザネーム", title, link);
        inputTitleElement.value = "";//投稿フォーム内の情報を削除
        inputLinkElement.value = "";
        closeInputArea();
    }
}

// 入力フォームの表示・非表示を切り替える関数
function toggleInputArea(displayValue) {
    const inputForm = document.getElementById('input-form');
    const overlay = document.getElementById('overlay');

    inputForm.style.display = displayValue;
    overlay.style.display = displayValue;
}

// 入力フォームを表示する関数
function openInputArea() {
    toggleInputArea('flex');
    document.body.style.overflow = 'hidden';
}

// 入力フォームを非表示にする関数
function closeInputArea() {
    toggleInputArea('none');
    document.body.style.overflow = 'auto';
}

// 戻るボタンが押されたときの処理を行う関数
function goBack() {
    const inputTitleElement = document.getElementById("input-title");
    const inputLinkElement = document.getElementById("input-link");

    const confirmation = confirm('入力内容が破棄されます');

    if (confirmation) {
        inputTitleElement.value = "";
        inputLinkElement.value = "";
        closeInputArea();
    } else {
        // キャンセルが押された場合の処理を追加する場合はここに記述
    }
}

document.getElementById("input-title").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        // エンターキーが押された場合
        document.getElementById("input-link").focus(); // 次の入力フィールドにフォーカスを移動（オプション）
    }
});

document.getElementById("input-link").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        // エンターキーが押された場合
        inputControl(); // inputControl関数を呼び出す
    }
});
