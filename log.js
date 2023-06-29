let clogStyles = document.createElement("style");
clogStyles.innerHTML = `
    #c_floatingButton {
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

    #c_logWindow {
        position: relative;
        display: none;
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        background-color: #fff;
        border-radius: 8px;
        width: 600px;
        padding: 20px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    }

    #c_logWindow h3 {
        margin-top: 0px;
        background-color: #fff;
        font-family: "Microsoft YaHei", sans-serif; /* 使用微软雅黑字体 */
    }

    #c_closeButton {
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

    #c_logContent {
        line-height: 1.25;
        margin-top: 14px;
        font-family: "JetBrains Mono", Consolas, Arial, sans-serif;
        font-size: 14px;
        color: #333;
        max-height: 60vh; /* 设置最大高度为60% */
        overflow: auto; /* 当内容超过最大高度时出现滚动条 */
    }
`;
document.head.appendChild(clogStyles);

let floatingButton;

function openLog() {

  if (floatingButton) {
    floatingButton.style.display = "block";
    return;
  }
  // 创建 floatingButton 元素
  floatingButton = document.createElement("button");
  floatingButton.id = "c_floatingButton";
  floatingButton.textContent = "日志";
  document.body.appendChild(floatingButton);

  // 设置按钮的拖拽功能
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

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

  // 创建 logWindow 元素
  let logWindow = document.createElement("div");
  logWindow.id = "c_logWindow";
  logWindow.style.display = "none";
  logWindow.innerHTML = `
        <h3>日志记录</h3>
        <button id="c_closeButton">✖</button>
        <div id="c_logContent">暂无内容</div>
    `;
  document.body.appendChild(logWindow);

  // 点击按钮显示/隐藏日志窗口
  floatingButton.addEventListener("click", function () {
    if (logWindow.style.display == "block") {
      console.log("关");
      logWindow.style.display = "none";
    } else {
      console.log("开");
      logWindow.style.display = "block";
    }
  });

  const closeButton = document.getElementById('c_closeButton');
  closeButton.addEventListener("click", function () {
    logWindow.style.display = "none";
  });

  //使用示例
  for (let i = 0; i < 500; ++i) {
    addLog(`Log entry ${i}`);
  }
  addLog("Log entry 2");
}

function closeLog() {
  if (floatingButton) {
    floatingButton.style.display = "none";
  }
}

function setLogWindowPosition(position) {
  const logWindow = document.getElementById('c_logWindow'); // 替换为实际的元素 ID

  switch (position) {
    case 'center':
      logWindow.style.top = '50%';
      logWindow.style.left = '50%';
      logWindow.style.transform = 'translate(-50%, -50%)';
      break;
    case 'right':
      logWindow.style.top = '50%';
      logWindow.style.right = '20px';
      logWindow.style.transform = 'translate(0, -50%)';
      break;
    case 'top-right':
      logWindow.style.top = '100px';
      logWindow.style.right = '20px';
      logWindow.style.transform = 'none';
      break;
    // 可根据需要添加其他位置选项
    default:
      // 默认居中
      logWindow.style.top = '50%';
      logWindow.style.left = '50%';
      logWindow.style.transform = 'translate(-50%, -50%)';
      break;
  }
}


let logIsEmpty = true;
// 示例：添加一条日志
function addLog(message) {
  if (logIsEmpty) {
    setLog(message);
    logIsEmpty = false;
    return;
  }
  let logContent = document.getElementById("c_logContent");
  if (!logContent) {
    console.log(`logContent为空`);
    return;
  }
  let logItem = document.createElement("span");
  logItem.innerHTML = `<span style="color: #7788ee;">[${formatDate("hh:mm:ss")}]</span>${message}<br>`;
  logContent.appendChild(logItem);
}

function setLog(message) {
  let logContent = document.getElementById("c_logContent");
  if (!logContent) {
    console.log(`logContent为空`);
    return;
  }
  logIsEmpty = false;
  logContent.innerHTML = `<span style="color: #7788ee;">[${formatDate("hh:mm:ss")}]</span>${message}<br>`;
}

function formatDate(format) {
  let currentDate = new Date();

  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();

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
