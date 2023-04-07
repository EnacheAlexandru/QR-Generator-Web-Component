import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './styles.js';

@customElement('qr-generator')
export class QrGenerator extends LitElement {
  static override styles = styles;

  @state()
  isError: boolean = false;

  @property()
  hide: string = "false";

  @property()
  text: string = "Hello";

  @property()
  size: string = "256";

  @property()
  pattern: string = "#000000";

  @property()
  background: string = "#ffffff";

  @property()
  qzone: string = "0";

  @property()
  ecc: string = "L";

  @state()
  qrUrl: string = "";

  @property()
  format: string = "jpg";

  override firstUpdated() {
    if (!this.areFieldsLegal()) {
      this.setDefault();
    }

    fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${this.text}&size=${this.size}x${this.size}&color=${this.pattern.slice(1)}&bgcolor=${this.background.slice(1)}&qzone=${this.qzone}&ecc=${this.ecc}&format=${this.format}`)
      .then(response => response.blob())
      .then(imageBlob => this.qrUrl = URL.createObjectURL(imageBlob));
  }  
  
  private areFieldsLegal() {
    const regex = new RegExp('^#[0-9a-f]{6}$');
    if (!this.text || 
      this.text.length > 800 || 
      isNaN(parseInt(this.size)) || 
      parseInt(this.size) < 100 || 
      parseInt(this.size) > 1000 ||
      isNaN(parseInt(this.qzone)) || 
      parseInt(this.qzone) < 0 || 
      parseInt(this.qzone) > 10 ||
      !regex.test(this.pattern) ||
      !regex.test(this.background) ||
      (this.ecc !== 'L' && this.ecc !== 'M' && this.ecc !== 'Q' && this.ecc !== 'H') ||
      (this.format !== 'jpg' && this.format !== 'png' && this.format !== 'svg')
    ) {
      return false;
    }
    return true;
  }

  private setDefault() {
    this.text = "Hello";
    this.size = "256";
    this.pattern = "#000000";
    this.background = "#ffffff";
    this.qzone = "0";
    this.ecc = "L";
    this.format = "jpg";
  }

  private changeText(event: Event) {
    const input = event.target as HTMLTextAreaElement;
    this.text = input.value;
  }

  private changeSize(event: Event) {
    const input = event.target as HTMLInputElement;
    this.size = input.value;
  }

  private changePattern(event: Event) {
    const input = event.target as HTMLInputElement;
    this.pattern = input.value;
  }

  private changeBackground(event: Event) {
    const input = event.target as HTMLInputElement;
    this.background = input.value;
  }

  private changeQZone(event: Event) {
    const input = event.target as HTMLInputElement;
    this.qzone = input.value;
  }

  private changeEcc(event: Event) {
    const input = event.target as HTMLSelectElement;
    this.ecc = input.value;
  }

  private generateHandler(format: string) {
    if (!this.areFieldsLegal() || (format !== 'jpg' && format !== 'png' && format !== 'svg')) {
      this.isError = true;
      setTimeout(() => {
        this.isError = false;
      }, 1000);
      return;
    }

    this.qrUrl = "";
    fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${this.text}&size=${this.size}x${this.size}&color=${this.pattern.slice(1)}&bgcolor=${this.background.slice(1)}&qzone=${this.qzone}&ecc=${this.ecc}&format=${format}`)
      .then(response => response.blob())
      .then(imageBlob => {
        this.qrUrl = URL.createObjectURL(imageBlob);
      });
  }

  override render() {
    const loadingComp = html`<div class="flex flex-align-center flex-justify-center" style="margin-left: 2%; margin-right: 2%; width: 200px; height: 200px;"><div class="loader"></div></div>`;
    const qrComp = html`<div style="margin-left: 2%; margin-right: 2%;"><img width=200px height=200px src=${this.qrUrl} alt="qr_error"></div>`;
    if (this.hide === "true") {
      return html`
        <div style="padding: 0;"><img width=200px height=200px src=${this.qrUrl} alt="qr_error"></div>
      `;
    }
    return html`
      <div class="flex flex-col" style="background-color: var(--color3); padding: 0;">
        <div class="flex flex-col flex-align-center">
          <div>Enter a text or a link to generate a QR code (1-800)</div>
          <div style="width: 400px"><textarea @input=${this.changeText} class="round-border" maxlength="800" .value=${this.text}></textarea></div>
          <div class="flex">
            <div>QR code size (100-1000)</div>
            <div style="width: 60px"><input @input=${this.changeSize} type="number" class="round-border" min="100" max="1000" value=${this.size} style="width: 100%"></div>
            <div>px</div>
          </div>
        </div>
        <div class="flex flex-align-center flex-justify-center">
          <div class="flex flex-col flex-align-center flex-justify-center">
            <div>Pattern</div>
            <div><input @input=${this.changePattern} type="color" value=${this.pattern}></div>
            <div>Background</div>
            <div><input @input=${this.changeBackground} type="color" value=${this.background}></div>
            <div>Error correction</div>
            <div>
              <select @change=${this.changeEcc} class="round-border">
                <option value="L" ?selected=${this.ecc === "L"}>Low</option>
                <option value="M" ?selected=${this.ecc === "M"}>Medium</option>
                <option value="Q" ?selected=${this.ecc === "Q"}>High</option>
                <option value="H" ?selected=${this.ecc === "H"}>Very High</option>
              </select>
            </div>
          </div>
          ${!this.qrUrl ? loadingComp : qrComp } 
          <div class="flex flex-col flex-align-center flex-justify-center">
            <div>Generate as:</div>
            <div><button @click=${() => this.generateHandler('jpg')} class="custom-btn btn-color2 ${this.isError ? "custom-btn-err" : ""}">JPG</button></div>
            <div><button @click=${() => this.generateHandler('png')} class="custom-btn btn-color2 ${this.isError ? "custom-btn-err" : ""}">PNG</button></div>
            <div><button @click=${() => this.generateHandler('svg')} class="custom-btn btn-color2 ${this.isError ? "custom-btn-err" : ""}">SVG</button></div>
          </div>
        </div>
        <div class="flex flex-col flex-align-center">
          <div class="flex">
            <div>Quiet zone size (0-10)</div>
            <div style="width: 60px"><input @input=${this.changeQZone} type="number" class="round-border" min="0" max="10" value=${this.qzone} style="width: 100%"></div>
            <div>QR px</div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'qr-generator': QrGenerator;
  }
}
