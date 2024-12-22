const LINK = "/parrot-collection/#";

export const ROUTES = {
	comicsItem: (id: string): string => `${LINK}/comics/${id}`,
	comicsList: `${LINK}/comics`,
	comicsForm: `${LINK}/add-comics`,
	api: {
		getComicsById: (id: string | undefined): string =>
			`${process.env.REACT_APP_REQUEST_URL || ""}/api/comics/${id}`,
		getComicsList: `${process.env.REACT_APP_REQUEST_URL || ""}/api/comics/list`,
		getComicsListFromBackup: `${process.env.REACT_APP_REQUEST_URL || ""}/api/comics/list-backup`,
		addNewComics: `${process.env.REACT_APP_REQUEST_URL || ""}/api/comics/add`,
		deleteComics: (id: string | undefined): string =>
			`${process.env.REACT_APP_REQUEST_URL || ""}/api/comics/${id}/delete`,
		updateComics: (id: string | undefined): string =>
			`${process.env.REACT_APP_REQUEST_URL || ""}/api/comics/${id}/update`,
	},
};
