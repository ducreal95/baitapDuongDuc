function toast({
    title = '',
    message = '',
    type = 'info',
    duration = 3000,
}) {
    const main = document.querySelector('#toast');
    if (main) {
        const icons = {
            success: 'fa-regular fa-circle-check',
            error: 'fa-solid fa-circle-exclamation',
        }
        const icon = icons[type];
        const toast = document.createElement('div');
        const autoToast =  setTimeout(function () {
            main.removeChild(toast);
        }, 3000);
        toast.onclick = function (e) {
            if (e.target.closest('.toast__close')) {
                main.removeChild(toast);
                clearTimeout(autoToast)
            }
        }
        toast.classList.add('toast', `${type}`);
        toast.style.animation = `fadeInToast ease 0.3s, fadeOutToast linear 5s 0.1s forwards`
        toast.innerHTML = `
        <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__mess">
                    ${message}
                </p>
            </div>
            <div class="toast__close">
                <i class="fa-solid fa-xmark"></i>
        </div>
    `;
        main.appendChild(toast);
    }
}
