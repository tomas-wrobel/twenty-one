import {customElement, queryAssignedElements} from "lit/decorators.js";
import {LitElement, html, css} from "lit";
import PlayingCard from "./playing-card";

@customElement("player-cards")
class PlayerCards extends LitElement {
    static styles = css`
        :host {
            display: grid;
			align-content: center;
            gap: 20px;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        }

        ::slotted(playing-card) {
            aspect-ratio: 2 / 3;
        }
    `;

    @queryAssignedElements({
        selector: "playing-card",
        flatten: true,
    })
    cards!: PlayingCard[];

    override render() {
        return html`<slot></slot>`;
    }

    valueOf() {
        return this.cards.reduce((a, b) => a + b.valueOf(), 0);
    }
}

export default PlayerCards;
