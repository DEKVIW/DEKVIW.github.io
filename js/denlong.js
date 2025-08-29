function shouldShowDenlong() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // JavaScript 月份从 0 开始
    const day = now.getDate();
    
    // 12月28日到12月31日
    if (month === 12 && day >= 28) return true;
    
    // 1月1日到2月28日
    if (month === 1 || (month === 2 && day <= 28)) return true;
    
    return false;
}

function toggleDenlong() {
    const denglong = document.querySelectorAll('.deng-box-left, .deng-box-left1, .deng-box-right, .deng-box-right1');
    if (shouldShowDenlong()) {
        denglong.forEach(el => el.style.display = 'block');
    } else {
        denglong.forEach(el => el.style.display = 'none');
    }
}

// 页面加载时检查
document.addEventListener('DOMContentLoaded', toggleDenlong);

// 每天凌晨检查一次（可选）
setInterval(() => {
    toggleDenlong();
}, 24 * 60 * 60 * 1000); 