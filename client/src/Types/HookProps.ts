import { ComicsProps } from "Types";

export type HookProps<T> = {
	isLoading: boolean;
	error: unknown;
	data: T | undefined;
	isFetching?: boolean;
};

export type UseGetComicsListProps = HookProps<ComicsProps[]>;

export type UseGetComicsItemProps = HookProps<ComicsProps>;
