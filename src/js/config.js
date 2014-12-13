app.run(function($rootScope) {
	$rootScope.config = {
		title: "Comfy Screen",

		services: {
			yts: {
				name: "yts",
				url: "https://yts.re/api/"
			},
			trakt: {
				name: "trakt",
				url: "http://api.trakt.tv/",
				key: "d3fb0fd720efdbc488aed5adb7c726d8"
			}
		},

		api: {
			movies: {
				meta: "trakt",
				list: "yts"
			},
			shows: {}
		},

		genres: {
			movie: [
				"All",
				"Action",
				"Adventure",
				"Animation",
				"Biography",
				"Comedy",
				"Crime",
				"Documentary",
				"Drama",
				"Family",
				"Fantasy",
				"Film-Noir",
				"History",
				"Horror",
				"Music",
				"Musical",
				"Mystery",
				"Romance",
				"Sci-Fi",
				"Short",
				"Sport",
				"Thriller",
				"War",
				"Western"
			],
			tv: [
				"All",
				"Action",
				"Adventure",
				"Animation",
				"Children",
				"Comedy",
				"Crime",
				"Documentary",
				"Drama",
				"Family",
				"Fantasy",
				"Game Show",
				"Home and Garden",
				"Horror",
				"Mini Series",
				"Mystery",
				"News",
				"Reality",
				"Romance",
				"Science Fiction",
				"Soap",
				"Special Interest",
				"Sport",
				"Suspense",
				"Talk Show",
				"Thriller",
				"Western"
			]
		}
	}
});