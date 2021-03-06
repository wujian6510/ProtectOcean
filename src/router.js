$(function(){
	
	router.start({
        view: '#ui-view',
        errorTemplateId: '#error', // 可选
        router: {
            'home':{
				templateUrl: './pages/home/home.html',
                controller: './pages/home/home.js',
                styles:'./pages/home/home.css',
            },
            'choice':{
				templateUrl: './pages/choice/choice.html',
                controller: './pages/choice/choice.js',
                styles:'./pages/choice/choice.css',
            },
            'poster':{
				templateUrl: './pages/poster/poster.html',
                controller: './pages/poster/poster.js',
                styles:'./pages/poster/poster.css',
			},
            'defaults': 'home' //默认路由
        }
    });

});
