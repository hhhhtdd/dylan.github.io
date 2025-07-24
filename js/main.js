// 加载内容
function loadContent(type) {
    const jsonPath = `data/${type}/${type}.json`;
    
    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('content');
            container.innerHTML = '';
            container.className = type === 'essays' ? 'essay-container' : 'gallery-container';
            
            // 随机排序
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

// 显示详细信息
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

// 创建信息弹窗
function createInfoModal() {
    const modal = document.createElement('div');
    modal.id = 'info-modal';
    modal.className = 'info-modal';
    document.body.appendChild(modal);
    return modal;
}

// 初始化样式
function initStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .essay-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 30px;
            background: rgba(255,255,255,0.9);
            border-radius: 12px;
        }
        .essay-item {
            margin-bottom: 30px;
            padding: 20px;
            border-bottom: 1px solid #eee;
        }
        .gallery-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            padding: 20px;
            justify-items: center;
        }
        .image-item {
            width: 120px;
            height: 120px;
            cursor: pointer;
            background: transparent !important;
        }
        .image-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
        }
        .info-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.2);
            color: white;
            padding: 20px;
            border-radius: 8px;
            max-width: 400px;
            display: none;
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