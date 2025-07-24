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

// // 显示媒体内容
// function displayMedia(container, items, type) {
//     // 样式配置对象
//     const contentStyles = {
//         container: { 
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
//             gap: '20px',
//             padding: '20px'
//         },
//         item: {
//             display: 'flex',
//             gap: '15px',
//             padding: '15px',
//             margin: '10px',
//             background: 'rgba(255,255,255,0.2)',
//             borderRadius: '8px'
//         },
//         image: { // 根据类型动态设置尺寸
//             width: type === 'music' ? '200px' : '120px',
//             minWidth: type === 'music' ? '200px' : '120px',
//             height: type === 'music' ? '200px' : '180px',
//             objectFit: 'cover',
//             borderRadius: '4px'
//         },
//         info: {
//             flex: 1,
//             fontSize: '0.9em',
//             padding: '0 10px'
//         },
//         empty: `/* 保持原有空白提示样式不变 */`
//     };

//     const html = !items || !Array.isArray(items) || items.length === 0 
//         ? contentStyles.empty 
//         : `<div style="${cssToString(contentStyles.container)}">${items.map(item => {
//             const imagePath = `data/${type}/${item.image || 'placeholder.jpg'}`;
//             return `
//                 <div class="content-item" style="${cssToString(contentStyles.item)}">
//                     <img src="${imagePath}" 
//                          alt="${item.title || '无标题'}" 
//                          style="${cssToString(contentStyles.image)}"
//                          onerror="handleImageError(this)">
//                     <div class="content-info" style="${cssToString(contentStyles.info)}">
//                         <h3>${item.title || '无标题'}</h3>
//                         ${item.description ? `<p>${item.description}</p>` : ''}
//                         ${item.year ? `<p><strong>发行时间:</strong> ${item.year}</p>` : ''}
//                         ${item.author ? `<p><strong>By:</strong> ${item.author}</p>` : ''}
//                     </div>
//                 </div>
//             `;
//         }).join('')}</div>`;
    
//     container.innerHTML = html;

//     // 新增样式处理函数
//     function cssToString(styleObj) {
//         return Object.entries(styleObj)
//             .map(([key, value]) => `${key}:${value}`)
//             .join(';');
//     }

//     // 图片错误处理统一方法
//     function handleImageError(img) {
//         img.onerror = null;
//         const errorMsg = document.createElement('p');
//         errorMsg.style = 'text-align:center; padding:10px; color:#ff9999;';
//         errorMsg.textContent = '图片加载失败';
//         img.parentElement.appendChild(errorMsg);
//         img.remove();
//     }
// }

// // 显示随笔内容
// function displayEssays(container, essays) {
//     if (!container) return;
    
//     let html = '';
//     if (essays && Array.isArray(essays) && essays.length > 0) {
//         essays.forEach(essay => {
//             html += `
//                 <div class="essay-item">
//                     <h3 class="essay-title">${essay.title || '无标题'}</h3>
//                     <div class="essay-date">${essay.date || '未知日期'}</div>
//                     <div class="essay-content">${essay.content || '暂无内容'}</div>
//                 </div>
//             `;
//         });
//     } else {
//         html = '<p style="color: white; text-align: center; background: rgba(0,0,0,0.3); padding: 20px; border-radius: 10px; margin: 20px;">暂无随笔</p>';
//     }
//     container.innerHTML = html;
// }

// 全局样式初始化
function initStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .gallery-container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            padding: 20px;
        }
        .image-item {
            cursor: pointer;
            transition: transform 0.2s;
            background: transparent !important;
        }
        .image-item.square {
            width: 240px;
            height: 240px;
        }
        .image-item.rectangle {
            height: 240px;
            width: auto;
        }
        .image-item img {
            height: 50%;
            width: 50%;
            object-fit: contain;
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
    `;
    document.head.appendChild(style);
}

// 创建图片容器
function createImageItem(item, type) {
    const container = document.createElement('div');
    const img = document.createElement('img');
    
    // 设置图片源
    img.src = `data/${type}/${item.image}`;
    img.alt = item.title || '无标题';

    // 图片加载后判断比例
    img.onload = function() {
        const isSquare = Math.abs(this.naturalWidth - this.naturalHeight) < 10;
        container.classList.add(isSquare ? 'square' : 'rectangle');
    };

    // 点击事件处理
    container.addEventListener('click', () => showItemInfo(item));
    container.appendChild(img);
    return container;
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
    modal.className = 'info-modal';
    document.body.appendChild(modal);
    return modal;
}

// 加载内容
function loadContent(type) {
    fetch(`data/${type}/${type}.json`)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('content');
            container.innerHTML = '';
            container.classList.add('gallery-container');

            // 随机排序并创建元素
            data.sort(() => Math.random() - 0.5)
               .forEach(item => {
                   container.appendChild(createImageItem(item, type));
               });
        })
        .catch(error => {
            console.error('加载失败:', error);
            document.getElementById('content').innerHTML = `
                <div class="error">数据加载失败，请刷新重试</div>
            `;
        });
}

// 初始化
initStyles();