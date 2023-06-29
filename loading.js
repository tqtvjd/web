const cloadingStyle = document.createElement('style');
cloadingStyle.textContent = `
    .c-loading {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.75);
        color: #fff;
        padding: 20px 24px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }
    
    .c-progress {
        width: 40px;
        height: 40px;
        border: 3px solid #fff;
        border-top-color: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 10px;
    }
    
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
    
    .c-text {
        font-size: 16px;
    }
    
    .c-toast {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.75);
        color: #fff;
        padding: 10px 20px;
        border-radius: 16px;
        z-index: 9999;
    }
`;
document.head.appendChild(cloadingStyle);

// 创建全局变量用于存储loading和toast元素
let loadingElement;
let toastElement;

let loadingTimer;
let loadingSenconds = 0;

// showLoading方法用于显示loading界面
function showLoading(text) {
    // 如果loading元素已存在，则直接返回
    if (loadingElement) {
        textElement.innerText = text;
        return;
    }
    loadingSenconds = 0;

    // 创建loading元素
    loadingElement = document.createElement('div');
    loadingElement.className = 'c-loading';

    // 创建progress元素
    const progressElement = document.createElement('div');
    progressElement.className = 'c-progress';

    // 将progress元素添加到loading元素中
    loadingElement.appendChild(progressElement);

    // 创建文本元素
    const textElement = document.createElement('div');
    textElement.className = 'c-text';
    textElement.innerText = text;

    // 将文本元素添加到loading元素中
    loadingElement.appendChild(textElement);

    if (loadingTimer) {
        clearInterval(loadingTimer);
    }

    loadingTimer = setInterval(() => {
        loadingSenconds++;
        if (textElement) {
            textElement.innerHTML = `${text}[${loadingSenconds}秒]`;
        }
    }, 1000);

    // 将loading元素添加到body中
    document.body.appendChild(loadingElement);
}

// hideLoading方法用于隐藏loading界面
function hideLoading() {
    if (loadingTimer) {
        clearInterval(loadingTimer);
    }
    // 如果loading元素存在，则移除它
    if (loadingElement) {
        document.body.removeChild(loadingElement);
        loadingElement = null;
    }
}

let toastTimeoutId;

// showToast方法用于显示toast消息
function showToast(text, duration = 2000) {
    if(!toastElement) {
        // 创建toast元素
        toastElement = document.createElement('div');
        toastElement.className = 'c-toast';
        // 将toast元素添加到body中
        document.body.appendChild(toastElement);
    }
    toastElement.innerText = text;
    if(toastTimeoutId) {
        clearTimeout(toastTimeoutId);
    }
    // 2秒后隐藏toast
    toastTimeoutId = setTimeout(() => {
        hideToast();
    }, duration);
}

// hideToast方法用于隐藏toast消息
function hideToast() {
    // 如果toast元素存在，则移除它
    if (toastElement) {
        document.body.removeChild(toastElement);
        toastElement = null;
    }
}
