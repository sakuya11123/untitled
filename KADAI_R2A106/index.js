window.addEventListener('load', function () {
    if (!sessionStorage.getItem('data')) {
        sessionStorage.setItem('data', 'on');
        $("#loading").css("display", "block");
        //setTimeout(() => {
            const spinner = document.getElementById('loading');
            spinner.classList.add('loaded');
        //}, 3000);
    } else {
        $("#loading").css("display", "none");
    }
}, false);