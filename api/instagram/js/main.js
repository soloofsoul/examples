let insta = {
    access_token: '1465794022.578220b.93a55c6689f14c5593aa96fbc25ccd21',
    user_id: '1459318362',
    // Ira ID - 1459318362
    // Ira token - 0d148b1989b2485b817e140872e23657 - not needed
    // Grisha ID - 1465794022
    // Grisha token - 1465794022.578220b.93a55c6689f14c5593aa96fbc25ccd21
    apiBase: '',
    apiMediaUrl: '',
    init: function(){
        this.apiBase = 'https://api.instagram.com/v1';
        this.apiMediaUrl = `${this.apiBase}/users/${this.user_id}/media/recent/?access_token=${this.access_token}&count=5`;
        this.$instHolder = $('#instHolder');

        this.loadData();
    },
    loadData: function(){
        let instPageObj = {
            url: this.apiMediaUrl,
            method: 'GET',
            dataType: 'jsonp',
            success: $.proxy(this.handleInstagramResponse, this)
        };
        $(document).ready(function(){
            $.ajax(instPageObj);
        });
    },
    handleInstagramResponse: function(resp) {
        let posts = resp.data;

        if(posts.length > 0) {
            let username = posts[0].user.username;
            let topHtml = `
                <img class="userImg" src="${posts[0].user.profile_picture}" alt="irynagavaleshko" />
                <h2><a target="_blank" href="https://instagram.com/' + username + '">Instagram: ${username}</a></h2>
                <div id="instaBio"></div>
            `;
            this.$instHolder.fadeIn().html(topHtml);

            for(key in posts) {
                if(posts.hasOwnProperty(key)) {
                    let post = posts[key];

                    let instHtml = `
                        <div class="inst">
                            <p id="text_${post.id}" class="text">${post.caption.text}</p>
                            <span class="showMoreInst" id="showMore_${post.id}">Показати весь текст...</span>
                            <img alt="" src="${post.images.thumbnail.url}" />
                            <p>
                                <span class="heart"></span>
                                <span class="likesCount">${post.likes.count}</span>
                            </p>
                        </div>
                    `;
                    this.$instHolder.append(instHtml);
                }
            }

            let showMores = document.getElementsByClassName('showMoreInst');
            for(let i=0; i<showMores.length; i++) {
                showMores[i].addEventListener('click', this.toggleText);
            }
        }
        this.loadUserInfo();
    },
    toggleText: function(){
        let p = this.previousSibling.previousSibling;

        p.classList.toggle('visible');

        this.innerHTML = p.classList.contains('visible') ? 'Сховати частину тексту...' : 'Показати весь текст...';
    },
    loadUserInfo: function(){
        let instPageObj = {
            url: `https://api.instagram.com/v1/users/${this.user_id}/?access_token=${this.access_token}`,
            method: 'GET',
            dataType: 'jsonp',
            success: function(resp) {
                let $instaBioEl = $('#instaBio');
                let bioHtml = `<p>${resp.data.bio}</p>`;
                $instaBioEl.fadeIn().html(bioHtml);
            }
        };
        $(document).ready(function(){
            $.ajax(instPageObj);
        });
    }
};

// https://api.instagram.com/oauth/authorize/?client_id=578220bedf4843d595d9a5987f0bbecf&redirect_uri=http://localhost/soc/results.html&response_type=code

insta.init();