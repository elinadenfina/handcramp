import styled from "styled-components";

import { slideDown, slideUp, fadeOut, fadeIn } from "animations";
import media from "../../helpers/mediaQuery";
import fontSizes from "tokens/fontSizes.mjs";

const ResultTitleStyled = styled.div`
	position: absolute;
	top: 1rem;
	text-align: center;
	z-index: 1;

	h1 {
		margin-top: 0;
		animation: ${slideUp} 0.4s ease forwards, ${fadeOut} 0.4s ease forwards;
		font-size: 2.5rem;
		margin-bottom: 0.27rem;

		${media.maxMobile`
			margin-bottom: 0.6rem;
			font-size: ${fontSizes.h1};
		`}
	}

	h5 {
		animation: ${slideDown} 0.4s ease forwards, ${fadeOut} 0.4s ease forwards;
		margin-top: 1rem;

		${media.maxMobile`
			margin-top: 1.6rem:
		`}
	}

	${media.maxMobile`
		top: -2rem;
	`}

	${props =>
		props.show &&
		`
			h1 {
				margin-top: 0;
				opacity: 0;
				animation: ${slideDown} 0.4s ease forwards, ${fadeIn} 0.4s ease forwards;
			}

			h5 {
				opacity: 0;
				animation: ${slideUp} 0.4s ease forwards, ${fadeIn} 0.4s ease forwards;
			}
		`}
`;

export default ResultTitleStyled;