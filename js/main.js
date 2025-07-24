// 加载内容的函数
function loadContent(type) {
    // 对于GitHub Pages，使用相对路径
    const basePath = window.location.pathname.includes('github.io') ? '/personal-website/' : '/';
    const jsonPath = `data/${type}/${type}.json`;
    
    console.log('尝试加载:', jsonPath);
    
    fetch(jsonPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const contentDiv = document.getElementById('content');
            if (type === 'essays') {
                displayEssays(contentDiv, data);
            } else {
                displayMedia(contentDiv, data, type);
            }
        })
        .catch(error => {
            console.error('加载数据失败:', error);
            const contentDiv = document.getElementById('content');
            if (contentDiv) {
                contentDiv.innerHTML = `
                    <div style="color: white; text-align: center; padding: 20px; background: rgba(0,0,0,0.5); border-radius: 10px; margin: 20px;">
                        <h3>❌ 加载失败</h3>
                        <p>错误信息: ${error.message}</p>
                        <p>请稍后重试或检查数据文件</p>
                    </div>
                `;
            }
        });
}

// 显示媒体内容
function displayMedia(container, items, type) {
    // 样式配置对象
    const contentStyles = {
        container: { // 网格容器样式
            display: 'grid', // 使用CSS网格布局
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', // 自适应列宽（最小320px）
            gap: '20px',     // 网格项间距
            padding: '20px'  // 容器内边距
        },
        item: {      // 修改为flex横向布局
            display: 'flex',        // 启用flex布局
            gap: '15px',            // 图片和文字间距
            padding: '15px',
            margin: '10px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '8px'
        },
        image: {     // 调整图片容器比例
            width: '120px',         // 固定图片宽度
            minWidth: '120px',      // 防止图片被压缩
            height: '180px',        // 固定高度
            objectFit: 'cover',     // 保持图片比例
            borderRadius: '4px'
        },
        info: {      // 文字区域自适应
            flex: 1,                // 占据剩余空间
            fontSize: '0.9em',
            padding: '0 10px'       // 左右内边距
        },
        empty: `/* 保持原有空白提示样式不变 */`
    };

    const html = !items || !Array.isArray(items) || items.length === 0 
        ? contentStyles.empty 
        : `<div style="${cssToString(contentStyles.container)}">${items.map(item => {
            const imagePath = `data/${type}/${item.image || 'placeholder.jpg'}`;
            return `
                <div class="content-item" style="${cssToString(contentStyles.item)}">
                    <img src="${imagePath}" 
                         alt="${item.title || '无标题'}" 
                         style="${cssToString(contentStyles.image)}"
                         onerror="handleImageError(this)">
                    <div class="content-info" style="${cssToString(contentStyles.info)}">
                        <h3>${item.title || '无标题'}</h3>
                        ${item.description ? `<p>${item.description}</p>` : ''}
                        ${item.year ? `<p><strong>发行时间:</strong> ${item.year}</p>` : ''}
                        ${item.author ? `<p><strong>By:</strong> ${item.author}</p>` : ''}
                    </div>
                </div>
            `;
        }).join('')}</div>`;
    
    container.innerHTML = html;

    // 新增样式处理函数
    function cssToString(styleObj) {
        return Object.entries(styleObj)
            .map(([key, value]) => `${key}:${value}`)
            .join(';');
    }

    // 图片错误处理统一方法
    function handleImageError(img) {
        img.onerror = null;
        const errorMsg = document.createElement('p');
        errorMsg.style = 'text-align:center; padding:10px; color:#ff9999;';
        errorMsg.textContent = '图片加载失败';
        img.parentElement.appendChild(errorMsg);
        img.remove();
    }
}

// 显示随笔内容
function displayEssays(container, essays) {
    if (!container) return;
    
    let html = '';
    if (essays && Array.isArray(essays) && essays.length > 0) {
        essays.forEach(essay => {
            html += `
                <div class="essay-item">
                    <h3 class="essay-title">${essay.title || '无标题'}</h3>
                    <div class="essay-date">${essay.date || '未知日期'}</div>
                    <div class="essay-content">${essay.content || '暂无内容'}</div>
                </div>
            `;
        });
    } else {
        html = '<p style="color: white; text-align: center; background: rgba(0,0,0,0.3); padding: 20px; border-radius: 10px; margin: 20px;">暂无随笔</p>';
    }
    container.innerHTML = html;
}