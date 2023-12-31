// 创建一个 <script> 标签
let trx_script = document.createElement('script');

// 设置要加载的脚本的 src 属性
trx_script.src = 'https://cdn.jsdelivr.net/npm/tronweb@4.4.0/dist/TronWeb.js';

let tronWeb;

function initTronWeb() {
    if (tronWeb) return;
    // 创建 TronWeb 实例连接到 Nile 网络
    tronWeb = new TronWeb({
        fullHost: 'https://nile.trongrid.io'
    });
}

// 定义脚本加载完成后执行的回调函数
trx_script.onload = function () {
    initTronWeb();
};

async function createAccount() {
    initTronWeb();
    const account = await tronWeb.createAccount();
    console.log('地址：' + account.address.base58 + ', privateKey：' + account.privateKey);
    return {
        address: account.address.base58,
        privateKey: account.privateKey
    }
}

async function sendTransaction(privateKey) {
    const result = await tronWeb.trx.sendTransaction('TUWdFiLaRh7HcVzVXcFzdTFoqKKduuXmwC', tronWeb.toSun(2000.00), privateKey)
        .then(result => {
            console.log('转账成功: txid = ', result.txid);
        })
        .catch(error => {
            console.error('转账失败:', error);
        });
    return result.txid;
}

// 将 <script> 标签添加到文档中，开始加载脚本
document.head.appendChild(trx_script);
