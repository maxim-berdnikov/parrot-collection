import { ComicsProps } from "Types";

export type HookProps<T> = {
  isLoading: boolean;
  error: any;
  data: T | undefined;
};

export type UseGetComicsListProps = HookProps<ComicsProps[]>;

export type UseGetComicsItemProps = HookProps<ComicsProps>;
