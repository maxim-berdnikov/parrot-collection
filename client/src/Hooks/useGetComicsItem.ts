import axios from "axios";
import { ROUTES } from "Helpers";
import { useQuery } from "react-query";
import { ComicsProps, UseGetComicsItemProps } from "Types";

export const useGetComicsItem = (
	id: string | undefined
): UseGetComicsItemProps => {
	const getComicsItem = async () => {
		const { data } = await axios.get<ComicsProps>(
			ROUTES.api.getComicsById(id),
			{ params: { id } }
		);
		return data;
	};

	const { isLoading, error, data } = useQuery("comicsItem", getComicsItem);

	return { isLoading, error, data };
};
