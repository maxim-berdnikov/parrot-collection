import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter } from "react-router-dom";
import { Layout } from "./Templates/Layout";

export const App = (): JSX.Element => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				keepPreviousData: false,
			},
		},
	});

	return (
		<HashRouter>
			<QueryClientProvider client={queryClient}>
				<Layout />
			</QueryClientProvider>
		</HashRouter>
	);
};
