// 创建 logWindow 元素
var logWindow = document.createElement('div');
logWindow.id = 'logWindow';
logWindow.style.display = 'none';
logWindow.innerHTML = `
  <h3>日志记录</h3>
  <button id="closeButton">✖</button>
  <div id="logContent"></div>
`;
document.body.appendChild(logWindow);

// 创建样式元素并添加 CSS 样式
var styles = document.createElement('style');
styles.innerHTML = `
  #floatingButton {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }

  #logWindow {
    position: relative;
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    background-color: #fff;
    border-radius: 8px;
    width: 600px;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }

  #logWindow h3 {
    margin-top: 0px;
    background-color: #fff;
    font-family: "Microsoft YaHei", sans-serif; /* 使用微软雅黑字体 */
  }

  #closeButton {
    position: absolute;
    top: 16px;
    right: 16px;
    padding: 2px 6px;
    background-color: transparent;
    font-size: 16px;
    cursor: pointer;
    border: 2px solid #333;
    color: #333;
    border-radius: 50%;
  }

  #logContent {
    line-height: 1.25;
    font-family: "JetBrains Mono", Consolas, Arial, sans-serif;
    font-size: 14px;
    color: #333;
    max-height: 800px; /* 设置最大高度为800px */
    overflow: auto; /* 当内容超过最大高度时出现滚动条 */
  }
`;
document.head.appendChild(styles);

// 创建 floatingButton 元素
var floatingButton = document.createElement("button");
floatingButton.id = "floatingButton";
floatingButton.textContent = "日志";
document.body.appendChild(floatingButton);

// 获取其他元素
var logWindow = document.getElementById("logWindow");
var logContent = document.getElementById("logContent");
var closeButton = document.getElementById("closeButton");

// 设置按钮的拖拽功能
var isDragging = false;
var offsetX = 0;
var offsetY = 0;

floatingButton.addEventListener("mousedown", function (e) {
    isDragging = true;
    offsetX = e.clientX - floatingButton.offsetLeft;
    offsetY = e.clientY - floatingButton.offsetTop;
});

document.addEventListener("mousemove", function (e) {
    if (isDragging) {
        floatingButton.style.left = e.clientX - offsetX + "px";
        floatingButton.style.top = e.clientY - offsetY + "px";
    }
});

document.addEventListener("mouseup", function () {
    isDragging = false;
});

// 点击按钮显示/隐藏日志窗口
floatingButton.addEventListener("click", function () {
    if (logWindow.style.display == "block") {
        logWindow.style.display = "none";
    } else {
        logWindow.style.display = "block";
    }
});

closeButton.addEventListener("click", function () {
    logWindow.style.display = "none";
});

// 示例：添加一条日志
function addLog(message) {
    var logItem = document.createElement("span");
    logItem.innerHTML = `<span style="color: #7788ee;">[${formatDate("hh:mm:ss")}]</span>${message}<br>`;
    logContent.appendChild(logItem);
}

function setLog(message) {
    logContent.innerHTML = `<span style="color: #7788ee;">[${formatDate("hh:mm:ss")}]</span>${message}<br>`;
}

function formatDate(format) {
    var currentDate = new Date();

    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();

    // 替换相应的格式符
    format = format.replace("yyyy", year);
    format = format.replace("MM", padZero(month));
    format = format.replace("dd", padZero(day));
    format = format.replace("hh", padZero(hours));
    format = format.replace("mm", padZero(minutes));
    format = format.replace("ss", padZero(seconds));

    return format;
}

function padZero(number) {
    return number < 10 ? "0" + number : number;
}

// 使用示例
// for (let i = 0; i < 500; ++i) {
//     addLog(`Log entry ${i}`);
// }
// addLog("Log entry 2");
