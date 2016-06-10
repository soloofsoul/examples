var main = {

    INST: {
        ROOT_URL: 'https://api.instagram.com/'
    },

    appState: {
        ACCESS_TOKEN: ''
    },

    holder: undefined,

    init: function() {
        this.appState.ACCESS_TOKEN = window.location.hash.split('=')[1];
        this.holder = document.getElementById('instaHolder');
    },

    getData: function(){
        var script = document.createElement('script');
        script.src = this.INST.ROOT_URL + 'v1/users/self/media/recent?&access_token=' + this.appState.ACCESS_TOKEN + '&callback=main.processUserRecentMedia';
        var header = document.getElementsByTagName('head');
        header[0].appendChild(script);
    },

    processUserRecentMedia: function(resp) {
        var content = '';
        if(resp.meta.code === 200) {
             resp.data.map(function(post){

                 if(post.type === 'image') {
                     console.log(post);
                     content += '<li><img src="' + post.images.thumbnail.url + '" /><span class="postText">' + post.caption.text + '</span></li>';
                 }

                 if(post.type === 'video') {

                 }
            });
            this.holder.innerHTML = '<h2><img src="' + resp.data[0].user.profile_picture + '" /> - ' + resp.data[0].user.username + '</h2>'
            this.holder.innerHTML += '<ul>' + content + '</ul>';
        }
    }
};

main.init();
main.getData();
