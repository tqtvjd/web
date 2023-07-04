// 创建一个 <script> 标签
let trx_script = document.createElement("script");

// 设置要加载的脚本的 src 属性
trx_script.src = "https://cdn.jsdelivr.net/npm/tronweb@4.4.0/dist/TronWeb.js";
trx_script.type = 'text/javascript';

// 将 <script> 标签添加到文档中，开始加载脚本
document.head.appendChild(trx_script);

let tronWeb;

function initTronWeb() {
    if (tronWeb) return;
    // 创建 TronWeb 实例连接到 Nile 网络
    tronWeb = new TronWeb({
        fullHost: "https://nile.trongrid.io",
    });
}

// 定义脚本加载完成后执行的回调函数
trx_script.onload = function () {
    initTronWeb();
};

async function createAccount() {
    initTronWeb();
    const account = await tronWeb.createAccount();
    if (!account) return null;
    return {
        address: account.address.base58,
        privateKey: account.privateKey,
    };
}

async function sendTransaction(
    toAddress,
    amount,
    privateKey,
) {
    initTronWeb();
    return tronWeb.trx.sendTransaction(toAddress, tronWeb.toSun(amount), privateKey);
}
