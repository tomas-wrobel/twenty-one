import {property, customElement} from "lit/decorators.js";
import {classMap} from "lit/directives/class-map.js";
import {LitElement, html, css} from "lit";

@customElement("playing-card")
class PlayingCard extends LitElement {
    @property({type: String}) value = "";
    @property({type: String}) symbol = "";
    @property({type: Boolean}) shown = false;

    static styles = css`
        .card {
            background-color: transparent;
			font-size: 20px;
            perspective: 1000px;
			text-align: center;
            width: 100%;
            height: 100%;
        }

		.value {
            display: flex;
            height: 100%;
            align-content: center;
            flex-wrap: wrap;
            justify-content: center;
		}

		.symbol {
			position: absolute;
			font-size: 16px;
		}

		.symbol:first-child {
			top: 3px;
			left: 3px;
		}

		.symbol:last-child {
			bottom: 3px;
			right: 3px;
		}

        .card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.8s;
            transform-style: preserve-3d;
        }

        .card:not(.shown) > .card-inner {
            transform: rotateY(180deg);
        }

        .card-front,
        .card-back {
			border-radius: 5px;
            position: absolute;
            width: 100%;
            height: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
        }

		.card-front {
            border: 1px solid #d3d3d3;
		}

        .red {
            color: red;
        }

        .card-back {
            background-color: dodgerblue;
            color: white;
            transform: rotateY(180deg);
        }
    `;

    override render() {
        return html`
            <div class=${classMap({shown: this.shown, card: true})}>
                <div class="card-inner">
					<div class=${classMap({red: this.symbol === "♢" || this.symbol === "♡", "card-front": true})}>
						<span class="symbol">${this.symbol}</span>
						<span class="value">${this.value}</span>
						<span class="symbol">${this.symbol}</span>
					</div>
					<div class="card-back"></div>
				</div>
            </div>
        `;
    }

	valueOf() {
		switch (this.value) {
			case "J":
			case "Q":
				return 1;
			case "K":
				return 2;
			case "7":
				return 7;
			case "8":
				return 8;
			case "9":
				return 9;
			case "10":
				return 10;
			case "A": 
				return 11;
			default:
				return NaN;
		}
	}
}

declare global {
    interface HTMLElementTagNameMap {
        "playing-card": PlayingCard;
    }
}

export default PlayingCard;
