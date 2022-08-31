import React from "react";
import "./style.css";

export const Loader = (): JSX.Element => {
	return (
		<div className="loader-wrapper">
			<div className="loader">
				<div className="inner">
					<div className="left"></div>
					<div className="middle"></div>
					<div className="right"></div>
				</div>
				<ul>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
		</div>
	);
};
