import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import GoogleAuth from './GoogleAuth';

const Header = ({ userInfo }) => {
	let renderUserImg = userInfo && (
		<img
			className="ui avatar image"
			alt={userInfo.name}
			src={userInfo.img}
			data-title={userInfo.name}
			data-content={userInfo.email}
		/>
	);

	return (
		<div className="ui pointing secondary menu">
			<Link to="/" className="item">
				StreamTV
			</Link>
			<NavLink to="/streams/edit" exact className="item">
				Edit
			</NavLink>
			<div className="right menu">
				<NavLink to="/" exact className="ui item">
					All Streams
				</NavLink>
				<div className="ui item">{renderUserImg}</div>
				<div className="ui item">
					<GoogleAuth />
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	console.log(state);
	return { userInfo: state.auth.userInfo };
};

export default connect(mapStateToProps)(Header);
