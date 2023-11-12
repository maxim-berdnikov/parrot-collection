export type ComicsProps = {
	_id: string;
	title: string;
	authors: string[];
	description: string;
	characters: string[];
	cover: string;
	edition: string;
	year: string;
	original: string;
	owned: string[];
	sell: string[];
	wishlist: string[];
	isRead: boolean;
	onShelf?: boolean;
	inWishlist?: boolean;
};
