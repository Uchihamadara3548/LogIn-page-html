document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('show-register').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('div2').style.display = 'none';
        document.getElementById('div3').style.display = 'block';
    });

    document.getElementById('show-login').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('div3').style.display = 'none';
        document.getElementById('div2').style.display = 'block';
    });
});