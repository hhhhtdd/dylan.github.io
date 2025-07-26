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
                    // 根据类型使用不同类名
                    div.className = type === 'movies' ? 'movie-item' : 'image-item';
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
        ${item.year ? `<p>: ${item.year}</p>` : ''}
        ${item.author ? `<p>: ${item.author}</p>` : ''}
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
// 在initStyles函数中修改CSS部分
function initStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* 豆瓣链接样式 */
        .douban-link {
            position: fixed;
            top: 20px;
            right: 20px;
            color: #fff;
            background: rgba(22, 184, 68, 0.25);
            padding: 8px 15px;
            border-radius: 4px;
            text-decoration: none;
            z-index: 1000;
            transition: background 0.3s;
        }
        .douban-link:hover {
            background: #33c45cff;
        }
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
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));  /* 响应式布局 */
            gap: 20px;
            padding: 20px;
            justify-items: center;
        }

        /* 电影专用样式 */
        .movie-item {
            width: 100%;                /* 容器宽度自适应 */
            aspect-ratio: 1/1.5;        /* 电影海报比例 */
            cursor: pointer;
            position: relative;         /* 为图片定位准备 */
            background: transparent !important;
        }

        .movie-item img {
            position: absolute;         /* 绝对定位填充容器 */
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 6px;
        }

        /* 音乐保持原有样式 */
        .image-item {
            width: 180px;               /* 固定宽度 */
            height: 180px;              /* 固定高度 */
            cursor: pointer;
            background: transparent !important;
        }

        .image-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 6px;
        }
        .info-modal {
            position: fixed;            /* 固定定位 */
            top: 50%;                   /* 距离顶部50% */
            left: 50%;                  /* 距离左侧50% */
            transform: translate(-50%, -50%);  /* 居中定位 */
            background: rgba(255, 255, 255, 0.2);  /* 半透明背景 */
            color: white;               /* 白色文字 */
            padding: 20px;              /* 内边距 */
            border-radius: 6px;         /* 圆角 */
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

// 在loadContent函数中修改容器类名分配
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
                    // 根据类型使用不同类名
                    div.className = type === 'movies' ? 'movie-item' : 'image-item';
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