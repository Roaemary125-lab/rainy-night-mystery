// 雨夜迷局 - 游戏引擎

// 游戏状态
const gameState = {
    currentScene: 'opening',
    visitedScenes: [],
    unlockedCharacters: [],
    discoveredEvidence: [],
    deductions: [],
    inventory: [],
    flags: {}
};

// DOM元素
let sceneText, choicesContainer, evidenceList, characterList, notebookModal, characterModal;

// DOM加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
});

function initializeGame() {
    // 获取DOM元素
    sceneText = document.getElementById('sceneText');
    choicesContainer = document.getElementById('choices');
    evidenceList = document.getElementById('evidenceList');
    characterList = document.getElementById('characterList');
    notebookModal = document.getElementById('notebookModal');
    characterModal = document.getElementById('characterModal');

    // 设置事件监听器
    setupEventListeners();

    // 加载游戏或开始新游戏
    const savedGame = localStorage.getItem('rainyNightMystery_save');
    if (savedGame) {
        // Don't auto-load, let player choose
        loadScene('opening');
    } else {
        loadScene('opening');
    }
}

function setupEventListeners() {
    // 存档/读档按钮
    document.getElementById('saveBtn').addEventListener('click', saveGame);
    document.getElementById('loadBtn').addEventListener('click', loadGame);
    document.getElementById('notebookBtn').addEventListener('click', openNotebook);

    // 模态框关闭按钮
    document.querySelectorAll('.modal .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModals);
    });

    // 点击外部关闭模态框
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModals();
        }
    });

    // 笔记本标签页
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchNotebookTab(tabName);
        });
    });
}

function loadScene(sceneId) {
    const scene = story[sceneId];
    if (!scene) {
        console.error('Scene not found:', sceneId);
        return;
    }

    // 更新游戏状态
    gameState.currentScene = sceneId;
    if (!gameState.visitedScenes.includes(sceneId)) {
        gameState.visitedScenes.push(sceneId);
    }

    // 执行场景onEnter函数（如果存在）
    if (scene.onEnter) {
        scene.onEnter();
    }

    // 显示场景文本（带打字机效果）
    displaySceneText(scene);

    // 显示选项
    displayChoices(scene.choices);

    // 更新侧边栏
    updateSidebar();
}

function displaySceneText(scene) {
    // 用HTML格式化文本
    let formattedText = scene.text;
    
    // 转换对话为带样式的span
    formattedText = formattedText.replace(/"([^"]+)"/g, '<span class="dialogue">"$1"</span>');
    
    // 转换内心独白
    formattedText = formattedText.replace(/\*([^*]+)\*/g, '<span class="thought">$1</span>');
    
    // 转换换行为段落
    formattedText = formattedText.split('\n\n').map(para => `<p>${para}</p>`).join('');

    // 添加章节标题（如果存在）
    if (scene.chapter && scene.title) {
        formattedText = `<h2 style="color: var(--accent-gold); margin-bottom: 20px;">${scene.title}</h2>` + formattedText;
    }

    sceneText.innerHTML = formattedText;
    sceneText.scrollTop = 0;
}

function displayChoices(choices) {
    choicesContainer.innerHTML = '';

    if (!choices || choices.length === 0) {
        return;
    }

    choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        if (choice.type) {
            button.classList.add(choice.type);
        }
        button.textContent = choice.text;
        button.addEventListener('click', () => {
            if (choice.type === 'restart') {
                resetGame();
            }
            loadScene(choice.next);
        });
        choicesContainer.appendChild(button);
    });
}

function updateSidebar() {
    updateEvidenceList();
    updateCharacterList();
}

function updateEvidenceList() {
    if (gameState.discoveredEvidence.length === 0) {
        evidenceList.innerHTML = '<li class="empty">尚未收集证据</li>';
        return;
    }

    evidenceList.innerHTML = '';
    gameState.discoveredEvidence.forEach(evId => {
        const ev = evidence[evId];
        if (ev) {
            const li = document.createElement('li');
            li.textContent = ev.name || evId;
            li.addEventListener('click', () => showEvidenceDetail(ev));
            evidenceList.appendChild(li);
        }
    });
}

function updateCharacterList() {
    if (gameState.unlockedCharacters.length === 0) {
        characterList.innerHTML = '<li class="empty">尚未发现嫌疑人</li>';
        return;
    }

    characterList.innerHTML = '';
    gameState.unlockedCharacters.forEach(charId => {
        const char = characters[charId];
        if (char) {
            const li = document.createElement('li');
            li.textContent = char.name;
            li.addEventListener('click', () => showCharacterDetail(char));
            characterList.appendChild(li);
        }
    });
}

function showEvidenceDetail(evidenceItem) {
    const content = `
        <div class="character-profile">
            <h3>${evidenceItem.name}</h3>
            <p class="description">${evidenceItem.description}</p>
            <p style="margin-top: 15px; color: var(--accent-gold);">分类：${evidenceItem.category}</p>
        </div>
    `;
    
    document.getElementById('characterDetail').innerHTML = content;
    characterModal.classList.add('active');
}

function showCharacterDetail(character) {
    let content = `
        <div class="character-profile">
            <h3>${character.name}</h3>
            <p class="role">${character.role} | 年龄：${character.age}</p>
            <p class="description">${character.description}</p>
    `;

    if (character.background) {
        content += `<p class="description"><strong>背景：</strong> ${character.background}</p>`;
    }

    if (character.motive) {
        content += `<div class="motive"><strong>可能动机：</strong> ${character.motive}</div>`;
    }

    if (character.isVictim) {
        content += `<div class="motive" style="border-color: var(--accent-gold);"><strong style="color: var(--accent-gold);">状态：</strong> 受害者（已故）</div>`;
    }

    content += '</div>';
    
    document.getElementById('characterDetail').innerHTML = content;
    characterModal.classList.add('active');
}

function openNotebook() {
    notebookModal.classList.add('active');
    switchNotebookTab('clues');
}

function closeModals() {
    notebookModal.classList.remove('active');
    characterModal.classList.remove('active');
}

function switchNotebookTab(tabName) {
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        }
    });

    // Update content
    const contentDiv = document.getElementById('notebookContent');
    
    switch(tabName) {
        case 'clues':
            contentDiv.innerHTML = getCluesContent();
            break;
        case 'suspects':
            contentDiv.innerHTML = getSuspectsContent();
            break;
        case 'deductions':
            contentDiv.innerHTML = getDeductionsContent();
            break;
    }
}

function getCluesContent() {
    if (gameState.discoveredEvidence.length === 0) {
        return '<p style="color: var(--text-secondary); font-style: italic;">尚未收集证据。调查犯罪现场并询问嫌疑人以收集线索。</p>';
    }

    let html = '';
    gameState.discoveredEvidence.forEach(evId => {
        const ev = evidence[evId];
        if (ev) {
            html += `
                <div class="clue-item">
                    <h4>${ev.name}</h4>
                    <p>${ev.description}</p>
                </div>
            `;
        }
    });
    return html;
}

function getSuspectsContent() {
    if (gameState.unlockedCharacters.length === 0) {
        return '<p style="color: var(--text-secondary); font-style: italic;">尚未发现嫌疑人。</p>';
    }

    let html = '';
    gameState.unlockedCharacters.forEach(charId => {
        const char = characters[charId];
        if (char && !char.isVictim) {
            html += `
                <div class="clue-item" style="border-left-color: ${char.motive ? 'var(--accent-red)' : 'var(--accent-blue)'};">
                    <h4>${char.name}</h4>
                    <p>${char.role}</p>
                    ${char.motive ? `<p style="color: var(--accent-red);"><strong>动机：</strong> ${char.motive.substring(0, 100)}...</p>` : ''}
                </div>
            `;
        }
    });
    return html;
}

function getDeductionsContent() {
    if (gameState.deductions.length === 0) {
        return '<p style="color: var(--text-secondary); font-style: italic;">尚未进行推理。收集证据后，你的推理将显示在这里。</p>';
    }

    let html = '';
    gameState.deductions.forEach(ded => {
        html += `
            <div class="deduction-item">
                <h4>${ded.title}</h4>
                <p>${ded.text}</p>
            </div>
        `;
    });
    return html;
}

function saveGame() {
    const saveData = JSON.stringify(gameState);
    localStorage.setItem('rainyNightMystery_save', saveData);
    alert('游戏存档成功！');
}

function loadGame() {
    const savedData = localStorage.getItem('rainyNightMystery_save');
    if (savedData) {
        const loadedState = JSON.parse(savedData);
        Object.assign(gameState, loadedState);
        loadScene(gameState.currentScene);
        alert('游戏读档成功！');
    } else {
        alert('没有找到存档。');
    }
}

function resetGame() {
    gameState.currentScene = 'opening';
    gameState.visitedScenes = [];
    gameState.unlockedCharacters = [];
    gameState.discoveredEvidence = [];
    gameState.deductions = [];
    gameState.inventory = [];
    gameState.flags = {};
    
    // Reset evidence discovered status
    Object.keys(evidence).forEach(key => {
        evidence[key].discovered = false;
    });
    
    loadScene('opening');
}

// Helper functions for story events
function unlockCharacter(charId) {
    if (!gameState.unlockedCharacters.includes(charId)) {
        gameState.unlockedCharacters.push(charId);
        // 显示通知
        showNotification(`发现新嫌疑人：${characters[charId].name}`);
    }
}

function discoverEvidence(evId) {
    if (!gameState.discoveredEvidence.includes(evId)) {
        gameState.discoveredEvidence.push(evId);
        evidence[evId].discovered = true;
        showNotification(`发现证据：${evidence[evId].name || evId}`);
    }
}

function addDeduction(id, text) {
    const exists = gameState.deductions.find(d => d.id === id);
    if (!exists) {
        gameState.deductions.push({ id, title: '推理', text });
    }
}

function showNotification(message) {
    // 创建通知元素
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-gold);
        color: var(--bg-dark);
        padding: 15px 20px;
        border-radius: 6px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        font-weight: bold;
    `;
    notif.textContent = message;
    document.body.appendChild(notif);

    // 3秒后移除
    setTimeout(() => {
        notif.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// 添加淡出动画
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(20px); }
    }
`;
document.head.appendChild(style);

// 导出函数供story.js使用
window.unlockCharacter = unlockCharacter;
window.discoverEvidence = discoverEvidence;
window.addDeduction = addDeduction;
