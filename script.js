const btn = document.getElementById("img_btn")
const container = document.getElementById("container_img_transition")

btn.addEventListener('click', (e) => {
    var i = 0
    container.style.zIndex = 999
    container.style.opacity = 1
    document.getElementById("transition").style.zIndex = 999
    document.getElementById("transition").style.opacity = 1

    setInterval(() => {
        i++
        if (i===10) {
            document.location.href='./page.html'
        }
    }, 100);
})