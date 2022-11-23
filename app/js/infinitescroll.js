
const autoPager = {
    page: 1,

    hostname: location.hostname,

    init() {
        if (!window.blog) {
            window.blog = [];
        }

        autoPager.watch_scroll();
    },

    watch_scroll() {
        if (autoPager.page + 1 > window.blog.navigation.total_pages) return;

        var target = document.compatMode == "BackCompat" ? document.body : document.documentElement;

        if (target.scrollTop >= (target.scrollHeight / 2)) {
            autoPager.page++;
            autoPager.load_posts(`https://${autoPager.hostname}/page/${autoPager.page}`, autoPager.process_page);
            setTimeout(autoPager.watch_scroll, 1000);
        } else {
            setTimeout(autoPager.watch_scroll, 200);
        }
    },

    load_posts(url, callback) {
        fetch(url)
            .then(resp => resp.text())
            .then(body => callback(body));
    },

    process_page(body) {
        const element = document.createElement("div");
        element.innerHTML = body;

        const injectorScript = element.querySelector("[data-blog-posts]");
        eval(injectorScript.innerHTML);
        
        getPosts().forEach(post => {
            window.blog.posts.push(post);
        });

        element.remove();
    }
};

if (window.addEventListener) {
    window.addEventListener('load', autoPager.init, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", autoPager.init);
} else {
    window.onload = autoPager.init;
}