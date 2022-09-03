import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { setupStore } from "Store";
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

	const store = setupStore();

	return (
		<HashRouter>
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<Layout />
				</Provider>
			</QueryClientProvider>
		</HashRouter>
	);
};
