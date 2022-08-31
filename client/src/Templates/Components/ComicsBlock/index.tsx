import React, { useState } from "react";
import { ComicsProps } from "Types";

export const ComicsBlock = (comics: ComicsProps): JSX.Element => {
	const [collection, setCollection] = useState(false);
	const [sell, setSell] = useState(false);
	const [wishlist, setWishlist] = useState(false);

	const handleClick = (type: "collection" | "read" | "wishlist") => {
		switch (type) {
			case "collection":
				if (collection === false && wishlist === true) {
					setWishlist(false);
				}
				setCollection(!collection);
				break;
			case "read":
				setSell(!sell);
				break;
			case "wishlist":
				setWishlist(!wishlist);
				break;
		}
	};

	return (
		<div className="book grid">
			{comics.cover ? (
				<a
					className="block w-full h-full"
					href={`/parrot-collection/comics/${comics._id}`}
				>
					<img
						className="book__img mx-auto mb-2 hover:cursor-pointer"
						src={comics.cover}
						alt={comics.title}
					/>
				</a>
			) : (
				<a
					className="block book__img book__img--mock mx-auto mb-2"
					href={`/parrot-collection/comics/${comics._id}`}
				>
					{" "}
				</a>
			)}
			<p className="book__title text-sm">{comics.title}</p>
			<div className="book__buttons mt-3 mx-auto flex justify-between">
				<div
					className="book__buttons-item bg-center bg-cover bg-no-repeat transition"
					data-type="collection"
					data-status={collection}
					onClick={() => handleClick("collection")}
				></div>
				<div
					className="book__buttons-item bg-center bg-cover bg-no-repeat transition"
					data-type="read"
					data-status={sell}
					onClick={() => handleClick("read")}
				></div>
				<div
					className="book__buttons-item bg-center bg-cover bg-no-repeat transition"
					data-type="wishlist"
					data-status={wishlist}
					onClick={() => handleClick("wishlist")}
				></div>
			</div>
		</div>
	);
};
