
function slide(id) {
    var ul = document.getElementById('article_ul');
    ul.style.transform = 'translateX(-' + ul.clientWidth / 2 * id + 'px)';
}
