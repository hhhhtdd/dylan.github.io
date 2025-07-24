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
    if (!container) return;
    
    const html = !items || !Array.isArray(items) || items.length === 0 
        ? '<div style="color: white; text-align: center; grid-column: 1/-1; background: rgba(0,0,0,0.3); padding: 20px; border-radius: 10px; margin: 20px;">暂无内容</div>'
        : items.map(item => {
            const imagePath = `data/${type}/${item.image || 'placeholder.jpg'}`;
            return `
                <div class="content-item" style="padding: 10px; margin: 5px;">
                    <img src="${imagePath}" alt="${item.title || '无标题'}" class="content-image" 
                        style="width: 100px; height: auto;" 
                        onerror="this.onerror=null; this.parentElement.innerHTML+='<p style=text-align:center;padding:10px;>图片加载失败</p>';this.remove()">
                    <div class="content-info" style="font-size: 0.9em;">
                        <h3>${item.title || '无标题'}</h3>
                        ${item.description ? `<p>${item.description}</p>` : ''}
                        ${item.year ? `<p><strong>发行时间:</strong> ${item.year}</p>` : ''}
                        ${item.author ? `<p><strong>音乐人:</strong> ${item.author}</p>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    
    container.innerHTML = html;
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