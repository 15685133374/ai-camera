
window.onload = function() {
        let screenWidth = document.body.clientWidth;
        document.documentElement.style.fontSize = screenWidth / 120 + 'px';
        window.onresize = function () {
            return function () {
                screenWidth = document.body.clientWidth;
                document.documentElement.style.fontSize = screenWidth / 120 + 'px';
            }();
        };
    }

