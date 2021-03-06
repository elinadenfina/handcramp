import styled from "styled-components";

import colors from "tokens/colors";
import media from "../../helpers/mediaQuery";

const BackgroundPatternStyled = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	margin: 0 auto;
	display: none;
	pointer-events: none;

	> div {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;

		svg {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translateY(-50%) translateX(-50%);
			width: 2000px;
			height: 1279px;

			${media.maxMobile`
				
			`}

			.icon {
				/* transition: 0.1s ease; */
			}
		}
	}

	${media.maxMobile`
		pointer-events: all;
		display: block;			
	`}
`;

export const IconStyled = styled.div`
	top: ${props => props.y}px;
	left: ${props => props.x}px;
	position: absolute;
	width: 20px;
	height: 20px;
	/* top: 0; */
	background-color: black;
`;

export default BackgroundPatternStyled;
