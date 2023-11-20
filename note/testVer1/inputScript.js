// inputScript.js

function createAndAppendUserIcon(username) {
    const userIcon = document.createElement("div");
    userIcon.classList.add("user-icon");

    const iconImage = document.createElement("img");
    iconImage.src = "path/to/your/user-icon.jpg";
    userIcon.appendChild(iconImage);

    const usernameElement = document.createElement("div");
    usernameElement.classList.add("username");
    usernameElement.innerText = username || "ユーザネーム";
    userIcon.appendChild(usernameElement);

    return userIcon;
}





// inputScript.js

// inputScript.js

// ... (Your existing code)

function createPostContentWithTitleLink(title, link) {
    const postContentDiv = document.createElement("div");
    postContentDiv.classList.add("post-content");

    const titleElement = document.createElement("h2");

    if (link && (link.startsWith("http://") || link.startsWith("https://"))) {
        const linkElement = document.createElement("a");
        linkElement.href = link;
        linkElement.target = "_blank";
        linkElement.textContent = title || "タイトルなし";
        titleElement.appendChild(linkElement);
    } else {
        titleElement.innerText = title || "タイトルなし";
    }

    postContentDiv.appendChild(titleElement);

    return postContentDiv;
}

function createPostItemWithTitleLink(username, title, link) {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post-item");

    const userIcon = createAndAppendUserIcon(username);
    postDiv.appendChild(userIcon);

    const postContentDiv = createPostContentWithTitleLink(title, link);
    const postImageDiv = document.createElement("div");
    postImageDiv.classList.add("post-image");

    postDiv.appendChild(postContentDiv);
    postDiv.appendChild(postImageDiv);

    return postDiv;
}

function prependPostWithTitleLink(username, title, link) {
    const postContainer = document.getElementById("post-container");
    const postItem = createPostItemWithTitleLink(username, title, link);
    postContainer.insertBefore(postItem, postContainer.firstChild);
}

function inputControl() {
    const inputTitleElement = document.getElementById("input-title");
    const inputLinkElement = document.getElementById("input-link");

    if (!inputTitleElement || !inputLinkElement) {
        console.error("Input elements not found.");
        return;
    }

    const title = inputTitleElement.value;
    const link = inputLinkElement.value;

    if (!title.trim()) {
        console.error("タイトルが空です");
        return;
    }

    prependPostWithTitleLink("ユーザネーム", title, link);
    inputTitleElement.value = "";
    inputLinkElement.value = "";

    closeInputArea();
}

// ... (Your existing code)





function toggleInputArea(displayValue) {
    const inputForm = document.getElementById('input-form');
    const overlay = document.getElementById('overlay');

    inputForm.style.display = displayValue;
    overlay.style.display = displayValue;
}

function openInputArea() {
    toggleInputArea('flex');
    document.body.style.overflow = 'hidden';
}

function closeInputArea() {
    toggleInputArea('none');
    document.body.style.overflow = 'auto';
}

function goBack() {
    const inputTitleElement = document.getElementById("input-title");
    const inputLinkElement = document.getElementById("input-link");

    if (!inputTitleElement || !inputLinkElement) {
        console.error("Input elements not found.");
        return;
    }

    inputTitleElement.value = "";
    inputLinkElement.value = "";

    const confirmation = confirm('入力内容が破棄されます');

    if (confirmation) {
        closeInputArea();
    }
}
