(function () {

    'use strict';

    // GLOBAL Variables
    const userUid = CONFIG.uid;
    const baseURL = CONFIG.baseUrl;

    // Start Program
    getArtistsPosts();

    // All Functions
    function getArtistsPosts() {
        $.get(baseURL + '/getArtistsPosts?uid=' + userUid,function(data, status) {
            createPosts(data);
        });
    }

    function createPosts(posts) {
        let postsHTML = '';
            
        for(let key in posts) {

            let post = posts[key];
            // console.log(post)


            let postImgUrl = post['imgUrls'][
                Object.keys(post['imgUrls'])[0]
            ];

            let postHTML = '<div class="portfolio all ' + post.category + '" data-cat="logo">' +
                '<a href="/portfolio?id=' + key + '" class="portfolio-wrapper">' +
                    '<img src="' + postImgUrl + '" alt="" />' +
                '</a>' +
            '</div>';


            postsHTML += postHTML;
        }

        $("#portfoliolist").html(postsHTML);

    }

}());