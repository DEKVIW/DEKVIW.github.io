function initLocation() {
    // 确保元素存在
    const locationElement = document.getElementById('location');
    if (!locationElement) {
        console.error('Location element not found');
        return;
    }

    // 添加加载中的提示
    locationElement.innerHTML = "正在获取位置信息...";
    
    fetch('https://qifu-api.baidubce.com/ip/local/geo/v1/district')
        .then(response => response.json())
        .then(data => {
            if (data.code === "Success") {
                const locationInfo = data.data;
                // 只使用省市区信息
                const location = [
                    locationInfo.prov,
                    locationInfo.city,
                    locationInfo.district
                ].filter(Boolean).join(''); // filter(Boolean) 移除空值
                
                locationElement.innerHTML = location ? `您当前位置：${location}` : "位置获取失败";
            } else {
                locationElement.innerHTML = "位置获取失败";
            }
        })
        .catch(err => {
            console.error('获取位置信息失败:', err);
            locationElement.innerHTML = "位置获取失败";
        });
}

// 使用 window.onload 确保所有资源都加载完成
window.onload = function() {
    // 延迟一小段时间执行，确保DOM完全准备好
    setTimeout(initLocation, 100);
}; 