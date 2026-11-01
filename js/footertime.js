// 本站运行时间
(() => {
  const startTime = new Date('2022-07-25T00:00:00')

  const showRunTime = () => {
    const footer = document.querySelector('.framework-info')
    if (!footer) return

    footer.innerHTML = '本站已运行<span id="span_dt_dt" style="color: #fff;"></span>'

    const elapsedSeconds = Math.floor((Date.now() - startTime.getTime()) / 1000)
    const days = Math.floor(elapsedSeconds / 86400)
    const hours = Math.floor((elapsedSeconds % 86400) / 3600)
    const minutes = Math.floor((elapsedSeconds % 3600) / 60)
    const seconds = elapsedSeconds % 60
    const target = document.getElementById('span_dt_dt')

    if (target) {
      target.innerHTML = `<font style="color:#2d85f0; font-size: 20px;">${days}</font> 天 `
        + `<font style="color:#f4433c; font-size: 20px;">${hours}</font> 时 `
        + `<font style="color:#ffbc32; font-size: 20px;">${minutes}</font> 分 `
        + `<font style="color:#0aa858; font-size: 20px;">${seconds}</font> 秒`
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showRunTime, { once: true })
  } else {
    showRunTime()
  }

  window.setInterval(showRunTime, 1000)
})()
