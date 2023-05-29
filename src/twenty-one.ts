import {customElement, query, queryAll} from "lit/decorators.js";
import {LitElement, html, css} from "lit";
import PlayerCards from "./player-cards";
import prepareCards from "./prepare-cards";
import PlayingCard from "./playing-card";

@customElement("twenty-one")
class TwentyOne extends LitElement {
    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
        }

        .deck {
            align-content: center;
            display: grid;
            gap: 20px;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        }

        .deck playing-card {
            grid-area: 1 / 11;
            aspect-ratio: 2 / 3;
        }

        .deck .control {
            grid-column-start: 1;
            grid-column-end: 2;
			grid-row: 1 / 1;
        }

        player-cards,
        .deck {
            flex: 1;
        }
    `;

    @queryAll("player-cards")
    players!: NodeListOf<PlayerCards>;

    @query("div.deck")
    deck!: HTMLDivElement;

    @query("span.total")
    total!: HTMLSpanElement;

    override render() {
        return html`
            <player-cards></player-cards>
            <div class="deck" @click=${this.clicked}>
                <div class="control">
					Total: <span class="total">0</span>
					<br>
					<button @click=${this.complete}>Complete</button>
				</div>
                ${prepareCards()}
            </div>
            <player-cards></player-cards>
        `;
    }

    async clicked(e: MouseEvent) {
        if (e.target instanceof PlayingCard) {
			const [ai, player] = this.players;
			if (+ai < 15) {
				await this.dealTo(ai, false);
			}
            await this.dealTo(player, true);
        }
    }

    async dealTo(player: PlayerCards, show: boolean) {
        const card = player.appendChild(this.deck.querySelector("playing-card")!);
        if (show) {
			await new Promise(resolve => setTimeout(resolve, 100));
            this.total.innerHTML = `${+player}`
			card.shown = true;
		}
        if (+player > 21) {
            await this.complete();
        }
    }

	async complete() {
		const [ai, player] = this.players;
        
        for (const card of ai.querySelectorAll("playing-card")) {
            card.shown = true;
        }

        const message = `Computer had ${+ai} points.`

		if (+ai > 21 && +player > 21) {
			await Parley.fire({
                title: "Tie",
                input: "none",
                message
            });
		} else if (+ai > 21) {
            await Parley.fire({
                title: "Win",
                input: "none",
                message
            })
        } else if (+player > 21) {
            await Parley.fire({
                title: "Lose",
                input: "none",
                message
            })
        } else if (+player > +ai) {
            await Parley.fire({
                title: "Win",
                input: "none",
                message
            })
        } else if (+player < +ai) {
            await Parley.fire({
                title: "Lose",
                input: "none",
                message
            })
        } else {
            await Parley.fire({
                title: "Tie",
                input: "none",
                message
            });
        }

        this.replaceWith(document.createElement("twenty-one"));
	}
}

declare global {
    interface HTMLElementTagNameMap {
        "twenty-one": TwentyOne;
    }
}

export default TwentyOne;
