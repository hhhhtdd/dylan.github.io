// 加载内容
function loadContent(type) {
    const jsonPath = `data/${type}/${type}.json`;
    
    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('content');
            container.innerHTML = '';
            container.className = type === 'essays' ? 'essay-container' : 'gallery-container';
            
            // 随机排序数据
            data.sort(() => Math.random() - 0.5);
            
            if (type === 'essays') {
                data.forEach(essay => {
                    const div = document.createElement('div');
                    div.className = 'essay-item';
                    div.innerHTML = `
                        <h3>${essay.title || '无标题'}</h3>
                        <div class="essay-date">${essay.date || '未知日期'}</div>
                        <div class="essay-content">${essay.content || '暂无内容'}</div>
                    `;
                    container.appendChild(div);
                });
            } else {
                data.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'image-item';
                    div.innerHTML = `<img src="data/${type}/${item.image}" alt="${item.title || '无标题'}">`;
                    div.onclick = () => showItemInfo(item);
                    container.appendChild(div);
                });
            }
        })
        .catch(error => {
            console.error('加载失败:', error);
            document.getElementById('content').innerHTML = '<div class="error">数据加载失败</div>';
        });
}

// 显示详细信息弹窗
function showItemInfo(item) {
    const modal = document.getElementById('info-modal') || createInfoModal();
    modal.innerHTML = `
        <h3>${item.title || '无标题'}</h3>
        ${item.description ? `<p>${item.description}</p>` : ''}
        ${item.year ? `<p>发行年份: ${item.year}</p>` : ''}
        ${item.author ? `<p>作者: ${item.author}</p>` : ''}
        <button onclick="this.parentElement.style.display='none'">关闭</button>
    `;
    modal.style.display = 'block';
}

// 创建信息弹窗元素
function createInfoModal() {
    const modal = document.createElement('div');
    modal.id = 'info-modal';
    modal.className = 'info-modal';
    document.body.appendChild(modal);
    return modal;
}

// 初始化CSS样式
function initStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .essay-container {
            max-width: 800px;           /* 随笔容器最大宽度 */
            margin: 0 auto;             /* 居中显示 */
            padding: 30px;              /* 内边距 */
            background: rgba(255,255,255,0.4);  /* 半透明白色背景 */
            border-radius: 12px;        /* 圆角边框 */
        }
        .essay-item {
            margin-bottom: 30px;        /* 随笔项底部间距 */
            padding: 20px;              /* 内边距 */
            border-bottom: 1px solid #eee;  /* 底部分割线 */
        }
        .gallery-container {
            display: grid;                          /* 网格布局 */
            grid-template-columns: repeat(6, 1fr);  /* 6列等宽网格 */
            gap: 20px;                              /* 网格间距20px */
            padding: 20px;                          /* 容器内边距 */
            justify-items: center;                  /* 网格项水平居中 */
        }
        .image-item {
            width: 120px;               /* 固定宽度120px */
            height: 120px;              /* 固定高度120px */
            cursor: pointer;            /* 鼠标悬停手势 */
            background: transparent !important;  /* 透明背景 */
        }
        .image-item img {
            width: 100%;                /* 图片占满容器宽度 */
            height: 100%;               /* 图片占满容器高度 */
            object-fit: cover;          /* 保持比例裁剪填充 */
            border-radius: 20px;         /* 图片圆角 */
        }
        .info-modal {
            position: fixed;            /* 固定定位 */
            top: 50%;                   /* 距离顶部50% */
            left: 50%;                  /* 距离左侧50% */
            transform: translate(-50%, -50%);  /* 居中定位 */
            background: rgba(255, 255, 255, 0.2);  /* 半透明背景 */
            color: white;               /* 白色文字 */
            padding: 20px;              /* 内边距 */
            border-radius: 20px;         /* 圆角 */
            max-width: 400px;           /* 最大宽度 */
            display: none;              /* 默认隐藏 */
        }
        .error {
            color: white; 
            text-align: center; 
            background: rgba(0,0,0,0.3); 
            padding: 20px; 
            border-radius: 10px; 
            margin: 20px;
        }
    `;
    document.head.appendChild(style);
}

// 初始化
initStyles();