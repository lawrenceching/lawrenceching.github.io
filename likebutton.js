// $(function(){
//     $(document).one('click', '.like-review', function(e) {
//         $(this).html('<i class="fa fa-heart" aria-hidden="true"></i> You liked this');
//         $(this).children('.fa-heart').addClass('animate-like');
//     });
// });

document.addEventListener('DOMContentLoaded', function () {

    function setCount(count) {
        document.querySelector("div.like-content button").innerHTML = `<i class="fa fa-heart" aria-hidden="true"></i> <span class="like-count"></span> ${count} Likes`;
    }

    async function sendLikeToServer() {
        return fetch('https://like.imlc.me/api/v1/likes', {
            method: 'POST'
        });
    }


    fetch('https://like.imlc.me/api/v1/likes')
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            const count = json.data;
            setCount(count);

            document.querySelector("div.like-content button").addEventListener('click', function() {
                sendLikeToServer();
                document.querySelector("div.like-content button").innerHTML = `<i class="fa fa-heart" aria-hidden="true"></i> ${count + 1} Likes`;
                document.querySelector("div.like-content button .fa-heart").classList.add('animate-like');
            })
        });

});