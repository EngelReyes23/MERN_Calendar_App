import React from "react";

export const Navbar = () => {
	return (
		<div className={"navbar navbar-dark bg-dark mb-4 sticky-top"}>
			<span className={"navbar-brand"}>Logo</span>

			<button className={"btn btn-outline-danger"}>
				<i className={"fa fa-sign-out"}></i>
				<span className="ml-1">Salir</span>
			</button>
		</div>
	);
};
