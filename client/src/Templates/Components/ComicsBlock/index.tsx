import React, { useEffect, useState } from "react";
import { ROUTES } from "Helpers";
import { ComicsProps } from "Types";
import "Components/ComicsBlock/style.scss";
import axios from "axios";
import { useAppSelector } from "Store/hooks";

export const ComicsBlock = (comics: ComicsProps): JSX.Element => {
	const { adminMode } = useAppSelector((state) => state.user);
	const [collection, setCollection] = useState(false);
	const [read, setRead] = useState(false);
	const [wishlist, setWishlist] = useState(false);

	const handleClick = (type: "collection" | "read" | "wishlist") => {
		switch (type) {
			case "collection":
				axios
					.post<string>(ROUTES.api.updateComics(comics._id), {
						onShelf: !collection,
					})
					.then((response) =>
						response.data === "Ok" ? setCollection(!collection) : void 0
					);
				break;
			case "read":
				axios
					.post<string>(ROUTES.api.updateComics(comics._id), { isRead: !read })
					.then((response) =>
						response.data === "Ok" ? setRead(!read) : void 0
					);
				break;
			case "wishlist":
				axios
					.post<string>(ROUTES.api.updateComics(comics._id), {
						inWishlist: !wishlist,
					})
					.then((response) =>
						response.data === "Ok" ? setWishlist(!wishlist) : void 0
					);

				break;
		}
	};

	useEffect(() => {
		if (comics) {
			setRead(comics.isRead);
			setCollection(comics.onShelf || false);
			setWishlist(comics.inWishlist || false);
		}
	}, [comics]);

	return (
		<div className="book grid">
			{comics.cover ? (
				<a className="block w-full h-full" href={ROUTES.comicsItem(comics._id)}>
					<img
						className="book__img mx-auto mb-2 hover:cursor-pointer"
						src={comics.cover}
						alt={comics.title}
					/>
				</a>
			) : (
				<a
					className="block book__img book__img--mock mx-auto mb-2"
					href={ROUTES.comicsItem(comics._id)}
				></a>
			)}
			<p className="book__title mx-auto text-sm">{comics.title}</p>
			<div className="book__buttons mt-3 mx-auto flex justify-between">
				<div
					className="book__buttons-item bg-center bg-cover bg-no-repeat transition"
					data-type="collection"
					data-status={collection}
					data-disabled={!adminMode}
					onClick={() => handleClick("collection")}
				></div>
				<div
					className="book__buttons-item bg-center bg-cover bg-no-repeat transition"
					data-type="read"
					data-status={read}
					data-disabled={!adminMode}
					onClick={() => handleClick("read")}
				></div>
				<div
					className="book__buttons-item bg-center bg-cover bg-no-repeat transition"
					data-type="wishlist"
					data-status={wishlist}
					data-disabled={!adminMode}
					onClick={() => handleClick("wishlist")}
				></div>
			</div>
		</div>
	);
};
