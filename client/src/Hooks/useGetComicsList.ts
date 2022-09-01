import axios from "axios";
import { ROUTES } from "Helpers";
import { useQuery } from "react-query";
import { UseGetComicsListProps } from "Types";

export const useGetComicsList = (): UseGetComicsListProps => {
	const getAllComics = async () => {
		const { data } = await axios.get(ROUTES.api.getComicsList);
		return data;
	};

	const { isLoading, isFetching, error, data } = useQuery(
		"comics",
		getAllComics
	);

	return { isLoading, isFetching, error, data };
};
