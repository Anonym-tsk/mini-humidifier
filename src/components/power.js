import { css, html, LitElement } from 'lit';
import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import sharedStyle from '../sharedStyle';
import buildElementDefinitions from '../utils/buildElementDefinitions';
import HumidifierButton from './button';
import globalElementLoader from '../utils/globalElementLoader';

export default class HumidifierPower extends ScopedRegistryHost(LitElement) {
  static get defineId() { return 'mh-power'; }

  static get elementDefinitions() {
    return buildElementDefinitions([
      HumidifierButton,
      globalElementLoader('ha-entity-toggle'),
    ], HumidifierPower);
  }

  constructor() {
    super();
    this._isOn = false;
  }

  static get properties() {
    return {
      power: { type: Object },
    };
  }

  render() {
    if (this.power.hide)
      return '';

    if (this.power.type === 'toggle') {
      return html`
          <ha-entity-toggle
            .stateObj=${this.power.entity}
            .hass=${this.power.hass}>
          </ha-entity-toggle>
      `;
    }

    return html`
       <mh-button
         class="power-button"
         .button=${this.power}>
        </mh-button>
    `;
  }

  updated(changedProps) {
    if (changedProps.has('power')) {
      this._isOn = this.power.isOn;
    }
  }

  static get styles() {
    return [
      sharedStyle,
      css`
     :host {
        position: relative;
        box-sizing: border-box;
        min-width: 0;
        font-weight: var(--mh-info-font-weight);
      }
    `];
  }
}
