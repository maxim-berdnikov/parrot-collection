import axios from "axios";
import { useQuery } from "react-query";
import { UseGetComicsListProps } from "Types";

export const useGetComicsList = (): UseGetComicsListProps => {
  const getAllComics = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_REQUEST_URL || ""}/api/comics/list`
    );
    return data;
  };

  const { isLoading, error, data } = useQuery("comics", getAllComics);

  return { isLoading, error, data };
};
