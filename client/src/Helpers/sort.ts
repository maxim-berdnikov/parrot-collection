import { ComicsProps } from "Types";
import { createNewSortInstance } from "fast-sort";

export const sorting = (
	comicsList: ComicsProps[]
): (ComicsProps | undefined)[] => {
	const titles = comicsList.map((item) => item.title);

	const naturalSort = createNewSortInstance({
		comparer: new Intl.Collator(undefined, {
			numeric: true,
			sensitivity: "base",
		}).compare,
	});

	const sortedTitles = naturalSort(titles).asc();

	const sotredList = sortedTitles.map((title) =>
		comicsList.find((item) => item.title === title)
	);

	return sotredList;
};
