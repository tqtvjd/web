const styleElement = document.createElement('style');
styleElement.textContent = `
    .loading {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.8);
        color: #fff;
        padding: 20px;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }
    
    .progress {
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
    
    .text {
        font-size: 16px;
    }
    
    .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.8);
        color: #fff;
        padding: 10px 20px;
        border-radius: 16px;
        z-index: 9999;
    }
`;
document.head.appendChild(styleElement);

// 创建全局变量用于存储loading和toast元素
let loadingElement;
let toastElement;

// showLoading方法用于显示loading界面
function showLoading(text) {
    // 如果loading元素已存在，则直接返回
    if (loadingElement) return;

    // 创建loading元素
    loadingElement = document.createElement('div');
    loadingElement.className = 'loading';

    // 创建progress元素
    const progressElement = document.createElement('div');
    progressElement.className = 'progress';

    // 将progress元素添加到loading元素中
    loadingElement.appendChild(progressElement);

    // 创建文本元素
    const textElement = document.createElement('div');
    textElement.className = 'text';
    textElement.innerText = text;

    // 将文本元素添加到loading元素中
    loadingElement.appendChild(textElement);

    // 将loading元素添加到body中
    document.body.appendChild(loadingElement);
}

// hideLoading方法用于隐藏loading界面
function hideLoading() {
    // 如果loading元素存在，则移除它
    if (loadingElement) {
        document.body.removeChild(loadingElement);
        loadingElement = null;
    }
}

// showToast方法用于显示toast消息
function showToast(text, duration = 2000) {
    // 如果toast元素已存在，则直接返回
    if (toastElement) return;

    // 创建toast元素
    toastElement = document.createElement('div');
    toastElement.className = 'toast';
    toastElement.innerText = text;

    // 将toast元素添加到body中
    document.body.appendChild(toastElement);

    // 2秒后隐藏toast
    setTimeout(() => {
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
