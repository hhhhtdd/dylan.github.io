// 加载内容的函数
function loadContent(type) {
    console.log('尝试加载类型:', type);
    console.log('请求路径:', `data/${type}/${type}.json`);
    
    fetch(`data/${type}/${type}.json`)
        .then(response => {
            console.log('响应状态:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('加载的数据:', data);
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
                    <div style="color: white; text-align: center; padding: 20px;">
                        <h3>加载失败</h3>
                        <p>错误信息: ${error.message}</p>
                        <p>请检查以下内容：</p>
                        <ul style="text-align: left; display: inline-block;">
                            <li>文件路径: data/${type}/${type}.json</li>
                            <li>JSON文件格式是否正确</li>
                            <li>图片文件是否存在</li>
                        </ul>
                    </div>
                `;
            }
        });
}

// 显示媒体内容（书籍、电影、音乐、照片）
function displayMedia(container, items, type) {
    if (!container) return;
    
    let html = '';
    if (items && items.length > 0) {
        items.forEach(item => {
            html += `
                <div class="content-item">
                    <img src="data/${type}/${item.image}" alt="${item.title}" class="content-image" onerror="this.src='data/placeholder.jpg'">
                    <div class="content-info">
                        <h3>${item.title || '无标题'}</h3>
                        <p>${item.description || '暂无描述'}</p>
                        ${item.year ? `<p><strong>年份:</strong> ${item.year}</p>` : ''}
                        ${item.author ? `<p><strong>作者:</strong> ${item.author}</p>` : ''}
                    </div>
                </div>
            `;
        });
    } else {
        html = '<p style="color: white; text-align: center; grid-column: 1/-1;">暂无内容</p>';
    }
    container.innerHTML = html;
}

// 显示随笔内容
function displayEssays(container, essays) {
    if (!container) return;
    
    let html = '';
    if (essays && essays.length > 0) {
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
        html = '<p style="color: white; text-align: center;">暂无随笔</p>';
    }
    container.innerHTML = html;
}