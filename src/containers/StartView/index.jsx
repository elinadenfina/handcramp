import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import View from "containers/View";
import Button from "components/Button/";
import Row from "components/Row";
import H2 from "components/H2";
import Col from "components/Col";
import socket from "socket";

import Container from "components/Container";
import BackButton from "../../components/BackButton/index";

class StartView extends React.Component {
	handleButtonClick = type => {
		if (type === "friend") {
			this.props.history.push({
				pathname: "friend"
			});
		} else {
			this.props.history.push({
				pathname: "game",
				type: "computer"
			});
		}
	};

	render() {
		return (
			<View title="Handcramp">
				<Container gridTemplate="1fr 1.8fr / 1fr" className="start-view">
					<BackButton handleClick={() => this.props.history.push("/")} />
					<Row>
						<Col justifyContent="flex-end">
							<H2> Choose your opponent </H2>
						</Col>
					</Row>
					<Row>
						<Col>
							<div className="button-wrapper">
								<Button
									onClick={() => this.handleButtonClick("computer")}
									routeChange={true}
									margin="2rem"
								>
									Computer
								</Button>
								<Button
									routeChange={true}
									margin="2rem"
									onClick={() => this.handleButtonClick("friend")}
								>
									friend
								</Button>
							</div>
						</Col>
					</Row>
				</Container>
			</View>
		);
	}
}

export default withRouter(StartView);

/*
SomeView.propTypes = {
	user: PropTypes.object
};

SomeView.defaultTypes = {
	user: {}
};
*/
