import { html } from "https://unpkg.com/lit-html?module";

// Main Card
class MantelMountRemoteCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement('mantel-mount-remote-editor');
  }

  static getStubConfig() {
    return {
      labels: {
        preset_1: "Preset 1",
        preset_2: "Preset 2",
        preset_3: "Preset 3",
        save_1: "Save 1",
        save_2: "Save 2",
        save_3: "Save 3",
      }
    };
  }

  constructor() {
    super();
    this._hass = null;
    this.config = { labels: {} };
    this.content = false;
  }

  setConfig(config) {
    try {
      const defaults = {
        preset_1: "Preset 1", preset_2: "Preset 2", preset_3: "Preset 3",
        save_1: "Save 1", save_2: "Save 2", save_3: "Save 3"
      };
      
      const userLabels = (config.labels && typeof config.labels === 'object') ? config.labels : {};
      const mergedLabels = { ...defaults, ...userLabels };
      
      this.config = { ...config, labels: mergedLabels };
      
      const isEditor = document.querySelector('hui-card-preview') instanceof HTMLElement;
      if (!isEditor) {
        this.render();
      }		
    } catch (e) {
      console.error("MantelMountRemoteCard: setConfig error", e);
    }
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  render() {
    if (!this._hass) return;
    this.innerHTML = `
      <ha-card>
        <div class="header">
          <div class="logo-wrapper">
            <img class="logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAAyHpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjabVDbDcMgDPz3FB0BPyAwDkmI1A06fu3YVEnUkzi/4LAN4/M+4GUgFJC81NJKSQpp0qirU5Ojn4xJTj5BUdL4lgecj0hTrJY9rCXuzzz+BNx09fJFqG5RWO+FJqFfH0LxEVtH1t4eQi2EmLyAIdB9rFRaXa4jrCPdUf2A0bFRs1xevfaMZdHt7Vn/YaLByEmZuXgDbCcDd3VEmbjoRVRrvjHyHFUX8m9PE/AFgAxaUNeGW54AAAGDaUNDUElDQyBwcm9maWxlAAB4nH2RPUjDQBzFX9NKRSoKZpDikKE62UWlOJYqFsFCaSu06mBy6Rc0sSQpLo6Ca8HBj8Wqg4uzrg6ugiD4AeIuOCm6SIn/SwotYjw47se7e4+7d4DQqjHNDMQBTbeMTDIh5QsrUvAVAYQxDBExmZn1VHYhB8/xdQ8fX++iPMv73J9jUC2aDPBJxHFWNyzideLYplXnvE8ssoqsEp8TTxp0QeJHrisuv3EuOyzwTNHIZeaIRWKp3MNKD7OKoRHPEEdUTad8Ie+yynmLs1ZrsM49+QtDRX05y3WaY0hiESmkIUFBA1XUYCFKq06KiQztJzz8YcefJpdCrioYOeaxAQ2y4wf/g9/dmqXpKTcplAD6Xmz7YxwI7gLtpm1/H9t2+wTwPwNXete/0QJmP0lvdrXIETC0DVxcdzVlD7jcAUaf6rIhO5KfplAqAe9n9E0FYOQWGFh1e+vs4/QByFFXSzfAwSEwUabsNY939/f29u+ZTn8/6/9y17BL9rIAABCIaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozMDQ3MmViMS0wOGU1LTgzNDctYTE2OC0zOGFlYzYxYmZmZGUiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTgzM2M3Y2UtYWQzMS00ZDFmLTg5NTUtYmZmMzEwNTQwZjllIgogICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MzA0NzJlYjEtMDhlNS04MzQ3LWExNjgtMzhhZWM2MWJmZmRlIgogICBkYzpmb3JtYXQ9ImltYWdlL3BuZyIKICAgR0lNUDpBUEk9IjIuMCIKICAgR0lNUDpQbGF0Zm9ybT0iV2luZG93cyIKICAgR0lNUDpUaW1lU3RhbXA9IjE3NDU2ODQ1MzY4NDcwNDAiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4zNiIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0ZURhdGU9IjIwMjItMTEtMDNUMTA6NDk6MjUtMDc6MDAiCiAgIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjEwIgogICB4bXA6TWV0YWRhdGFEYXRlPSIyMDI1OjA0OjI2VDEyOjIyOjE1LTA0OjAwIgogICB4bXA6TW9kaWZ5RGF0ZT0iMjAyNTowNDoyNlQxMjoyMjoxNS0wNDowMCI+CiAgIDx4bXBNTTpIaXN0b3J5PgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249ImNyZWF0ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MzA0NzJlYjEtMDhlNS04MzQ3LWExNjgtMzhhZWM2MWJmZmRlIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoV2luZG93cykiCiAgICAgIHN0RXZ0OndoZW49IjIwMjItMTEtMDNUMTA6NDk6MjUtMDc6MDAiLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZWFkNmRlNGItZDY1ZS00MzE1LWE2MjItOWZlMGY1YmYzOWVkIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKFdpbmRvd3MpIgogICAgICBzdEV2dDp3aGVuPSIyMDI1LTA0LTI2VDA4OjQ0OjIzIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjE1NTE5ZjFlLTE2MTItNGRjMi05OGYwLTg0ZGU0MzNkMDkzMSIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iR2ltcCAyLjEwIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNS0wNC0yNlQxMDoxODoxOCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3YjgyNzM5ZC0wNmUyLTQwY2ItOTM5NS1kMTY0ZGQ0MTU4YTIiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoV2luZG93cykiCiAgICAgIHN0RXZ0OndoZW49IjIwMjUtMDQtMjZUMTI6MjI6MTYiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+RlQ8XAAAAAZiS0dEAOsAFQAV0XfIwQAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+kEGhAWECqy9xIAAAQ+SURBVEjHtZZdbJNVGMd/fd9+rLUl67p3K40ZF1UuXHaBY3wEd7cEEwqSeqEzm1pZ3IXRGDNR70hwhJBxwbhBGQsiCUQkW8ArWFcXnOLSkmJCmr3SLimMrt3W0nar7dq+rxfqBPkQbXluTk7O8zznd/5PznOOyD/s+PHjpp07dzqvX79eKpVK3SaT6SWj0WhwOBzxVCpVosqmnZ2d1QIvx2IxHfBCIBCYBT4sl8uvFgqF13fv3v1cb29v040bN3KXL1/+8cKFC+MWi8UnSVJAluVixQCAHngFCAJrgTv3OlitVtrb22lvbzf19vZ2xOPxjnA4TCgUyoyNjV0ZGRkZN5vNPkmSfpmeni7/H4AnNo1Gg91ux263s23btjV79uzZkUgkdkQiEUKh0OLExMTE+fPnx00mk89qtYZkWVarCvAwoMbGRhobG9m6davN4/G4BwYG3OFwGFmW5yYnJ31nzpzxGY1GXyKRuFkVgGAwSDAYpLm5mZaWFmpqau4DkiQJSZLYsmWLvbu7u7O/v78zHA4TiUSiV69eHR8aGvJZLBZfPB6/BSD8V4Dl5WU8Hg+bNm1i7969ZDKZxypUX1/P5s2b6ezsbDpy5Mjb0Wj0q4sXL0aHhoZkSZIcFZXg6NGjZLNZDh8+TF1d3RPF2Gw2bDYbkiQ9XyqVTEKl1+jkyZP09PQwNzf3SJ9isYjf7ycSiVAs3n9zKwIYHh6moaGBkZERurq6iEajD/jMz8/T19dHW1sbTqeTmZmZ6gF0dHTg83rZuHEjXq8Xt9uNLMur69euXcPlcjE4OIgkSQ/NUXEJdFd+4NuzZ9m1axeBQACXy4Xf7+fUqVO0trYyNTWFx+PB6/VWvw8AJL8Y5pnZO3w5OIjD4eDYsWO0tbWtrh86dAiP200+n386ClBWWPpmlFj/QT7/5FP27dsHgMFgYHR0FM/27UTefY9idunpKKAW/3gg899PMhP/iPcHDtLU1MSLGzZQPxfn5mtvQll5ZHzlCqh/t/tS6FduvtWDq6UF008/c+uDjx+7eVUUuBcAQFlIEX7jnScOFyreXFUrSqGt5ulRVVBUEAXEZ9ciNNQj1tYirrFgsJg5cOAAZrO5MgCn08nU1BQ1NTXUSw3Ujn2HoNMh6HSIej2iwYCg16MRHhT3s+bmyhX460OyauvWPdJXURQURaFcLrOyskKhUKBQKLCysrLakv8V4O7du0xPT68myOfz5HI5crnc6jyfz7O0tEQ2myWdTjM/P08sFiOZTLKwsMDt27fvfaIVjUZTEkUxbbVai1qgAHwN6AAFyP85AnDu3DlOnz79QPV1Ot0ysKCqagrICoKQBpKCICSBRVVV00DWYDCkamtrF7VabVKv16f0ev3S+vXrc5cuXVISiQSah536xIkT+v379wuZTKYVqCuXy79pNJqkKIoZo9GYsdvtab/fX6jGt/x3pAXMvrKktgkAAAAASUVORK5CYII=" alt="MantelMount Logo" />
          </div>
          <div class="title">MantelMount Remote</div>
        </div>
        <div class="remote">
          <div class="row"><button class="btn" id="up">Up</button></div>
          <div class="row">
            <button class="btn" id="left">Left</button>
            <button class="btn" id="stop">Stop</button>
            <button class="btn" id="right">Right</button>
          </div>
          <div class="row"><button class="btn" id="down">Down</button></div>
          <div class="row"><button class="btn" id="home">Home</button></div>
          <div class="grid">
            <button class="btn" id="preset_1">${this.config.labels.preset_1}</button>
            <button class="btn" id="preset_2">${this.config.labels.preset_2}</button>
            <button class="btn" id="preset_3">${this.config.labels.preset_3}</button>
            <button class="btn" id="save_1">${this.config.labels.save_1}</button>
            <button class="btn" id="save_2">${this.config.labels.save_2}</button>
            <button class="btn" id="save_3">${this.config.labels.save_3}</button>
          </div>
        </div>
      </ha-card>
      <style>
        ha-card {
          background: linear-gradient(145deg, #a9a9a9, #4d4d4d);
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
          padding: 16px;
          max-width: 400px;
          margin: 0 auto;
          box-sizing: border-box;
        }
        .header {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
          padding: 0 8px;
          gap: 8px;
        }
        .logo-wrapper {          
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .logo img {
          width: 32px;
          height: 32px;
          object-fit: contain;
          display: block;
        }
        .title {
          font-size: 18px;
          font-weight: 500;
          color: #333;
        }
        .remote {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 0 8px 8px;
          box-sizing: border-box;
          width: 100%;
          overflow: hidden;
        }
        .row {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin: 0 auto;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 100px);
          gap: 12px;
          justify-content: center;
          margin: 0 auto;
        }
        .btn {
          width: 100px;
          padding: 10px 0;
          font-size: 16px;
          font-weight: 500;
          color: #333;
          background: linear-gradient(145deg, #f0f0f0, #d9d9d9);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s, box-shadow 0.2s;
          text-align: center;
        }
        .btn:hover {
          background: linear-gradient(145deg, #e6e6e6, #cccccc);
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15), 0 2px 5px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
        .btn:active {
          transform: translateY(1px);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        hui-card-preview mantel-mount-remote ha-card {
          transform: scale(0.85);
          transform-origin: top left;
          margin: 0;
          padding: 8px;
          max-width: unset;
        }
        hui-card-preview mantel-mount-remote .btn {
          width: 80px;
          font-size: 14px;
          padding: 6px 0;
        }
        hui-card-preview mantel-mount-remote .grid {
          grid-template-columns: repeat(3, 80px);
          gap: 8px;
        }
        :host {
          display: block;
          width: 100%;
          box-sizing: border-box;
          overflow-x: auto;
        }
        :host .grid {
          display: grid;
          grid-template-columns: repeat(3, 100px);
          gap: 10px;
        }
        :host .btn {
          width: 100px;
          font-size: 16px;
          padding: 8px 0;
        }
        ha-card {
          overflow: hidden;
        }
        @media screen and (max-width: 480px) {
          .grid {
            grid-template-columns: repeat(3, 80px) !important;
            gap: 8px !important;
          }
          .btn {
            width: 80px !important;
            font-size: 14px !important;
            padding: 6px 0 !important;
          }
        }
      </style>
    `;

    this._attachHandlers();
  }

  _attachHandlers() {
    if (!this._hass) return;
    const actions = [
      { id: 'up', type: 'hold' },
      { id: 'down', type: 'hold' },
      { id: 'left', type: 'hold' },
      { id: 'right', type: 'hold' },
      { id: 'stop', type: 'tap' },
      { id: 'home', type: 'tap' },
      { id: 'preset_1', type: 'tap' },
      { id: 'preset_2', type: 'tap' },
      { id: 'preset_3', type: 'tap' },
      { id: 'save_1', type: 'tap' },
      { id: 'save_2', type: 'tap' },
      { id: 'save_3', type: 'tap' }
    ];

    actions.forEach(({ id, type }) => {
      const el = this.querySelector(`#${id}`);
      const entity = `switch.mantel_mount_${id}`;
      if (!el) return;

      if (type === 'hold') {
        const startHold = () => {
          this._hass.callService('switch', 'turn_on', { entity_id: entity });
        };
        const stopHold = () => {
          this._hass.callService('switch', 'turn_off', { entity_id: entity });
        };
        el.addEventListener('mousedown', startHold);
        el.addEventListener('mouseup', stopHold);
        el.addEventListener('mouseleave', stopHold);
        el.addEventListener('touchstart', (e) => {
          e.preventDefault();
          startHold();
        });
        el.addEventListener('touchend', stopHold);
        el.addEventListener('touchcancel', stopHold);
      } else {
        el.addEventListener('click', () => {
          this._hass.callService('switch', 'turn_on', { entity_id: entity });
        });
      }
    });
  }

  getCardSize() { return 4; }
}

if (!customElements.get('mantel-mount-remote')) {
  customElements.define('mantel-mount-remote', MantelMountRemoteCard);
}
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'mantel-mount-remote',
  name: 'MantelMount Remote',
  description: '12-button MantelMount controller',
  preview: true,
});
window.customCardEditors = window.customCardEditors || {};
window.customCardEditors['mantel-mount-remote'] = 'mantel-mount-remote-editor';

// Editor
class MantelMountRemoteEditor extends HTMLElement {
  static getConfigElement() {
    return document.createElement('mantel-mount-remote-editor');
  }

  static getStubConfig() {
    return {
      labels: {
        preset_1: "Preset 1",
        preset_2: "Preset 2",
        preset_3: "Preset 3",
        save_1: "Save 1",
        save_2: "Save 2",
        save_3: "Save 3",
      }
    };
  }

  constructor() {
    super();
    this._hass = null;
    this.config = { labels: {} };
    this.content = false;
    this._debounceTimeout = null;
  }

  setConfig(config) {
    try {
      console.log("MantelMountRemoteEditor: setConfig called with config:", JSON.stringify(config));
      if (!config) config = {};
      const defaultLabels = {
        preset_1: "Preset 1",
        preset_2: "Preset 2",
        preset_3: "Preset 3",
        save_1: "Save 1",
        save_2: "Save 2",
        save_3: "Save 3",
      };
      
      this.config = {
        ...config,
        labels: {
          ...defaultLabels,
          ...(config.labels || {})
        }
      };
      console.log("MantelMountRemoteEditor: Config after applying defaults:", JSON.stringify(this.config));
      this._render(true);
    } catch (e) {
      console.error("MantelMountRemoteEditor: setConfig error", e);
    }
  }

  set hass(hass) {
    this._hass = hass;
    if (!this.content) {
      this._render(true);
    }
  }

  _render(force = false) {
    if (!this._hass) return;
    if (this.content && !force) return;
    
    this.innerHTML = `
      <div class="editor">
      <ha-card>
        <div class="header">
          <div class="logo-wrapper">
            <img class="logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAAyHpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjabVDbDcMgDPz3FB0BPyAwDkmI1A06fu3YVEnUkzi/4LAN4/M+4GUgFJC81NJKSQpp0qirU5Ojn4xJTj5BUdL4lgecj0hTrJY9rCXuzzz+BNx09fJFqG5RWO+FJqFfH0LxEVtH1t4eQi2EmLyAIdB9rFRaXa4jrCPdUf2A0bFRs1xevfaMZdHt7Vn/YaLByEmZuXgDbCcDd3VEmbjoRVRrvjHyHFUX8m9PE/AFgAxaUNeGW54AAAGDaUNDUElDQyBwcm9maWxlAAB4nH2RPUjDQBzFX9NKRSoKZpDikKE62UWlOJYqFsFCaSu06mBy6Rc0sSQpLo6Ca8HBj8Wqg4uzrg6ugiD4AeIuOCm6SIn/SwotYjw47se7e4+7d4DQqjHNDMQBTbeMTDIh5QsrUvAVAYQxDBExmZn1VHYhB8/xdQ8fX++iPMv73J9jUC2aDPBJxHFWNyzideLYplXnvE8ssoqsEp8TTxp0QeJHrisuv3EuOyzwTNHIZeaIRWKp3MNKD7OKoRHPEEdUTad8Ie+yynmLs1ZrsM49+QtDRX05y3WaY0hiESmkIUFBA1XUYCFKq06KiQztJzz8YcefJpdCrioYOeaxAQ2y4wf/g9/dmqXpKTcplAD6Xmz7YxwI7gLtpm1/H9t2+wTwPwNXete/0QJmP0lvdrXIETC0DVxcdzVlD7jcAUaf6rIhO5KfplAqAe9n9E0FYOQWGFh1e+vs4/QByFFXSzfAwSEwUabsNY939/f29u+ZTn8/6/9y17BL9rIAABCIaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozMDQ3MmViMS0wOGU1LTgzNDctYTE2OC0zOGFlYzYxYmZmZGUiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTgzM2M3Y2UtYWQzMS00ZDFmLTg5NTUtYmZmMzEwNTQwZjllIgogICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MzA0NzJlYjEtMDhlNS04MzQ3LWExNjgtMzhhZWM2MWJmZmRlIgogICBkYzpmb3JtYXQ9ImltYWdlL3BuZyIKICAgR0lNUDpBUEk9IjIuMCIKICAgR0lNUDpQbGF0Zm9ybT0iV2luZG93cyIKICAgR0lNUDpUaW1lU3RhbXA9IjE3NDU2ODQ1MzY4NDcwNDAiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4zNiIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0ZURhdGU9IjIwMjItMTEtMDNUMTA6NDk6MjUtMDc6MDAiCiAgIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjEwIgogICB4bXA6TWV0YWRhdGFEYXRlPSIyMDI1OjA0OjI2VDEyOjIyOjE1LTA0OjAwIgogICB4bXA6TW9kaWZ5RGF0ZT0iMjAyNTowNDoyNlQxMjoyMjoxNS0wNDowMCI+CiAgIDx4bXBNTTpIaXN0b3J5PgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249ImNyZWF0ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MzA0NzJlYjEtMDhlNS04MzQ3LWExNjgtMzhhZWM2MWJmZmRlIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoV2luZG93cykiCiAgICAgIHN0RXZ0OndoZW49IjIwMjItMTEtMDNUMTA6NDk6MjUtMDc6MDAiLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZWFkNmRlNGItZDY1ZS00MzE1LWE2MjItOWZlMGY1YmYzOWVkIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKFdpbmRvd3MpIgogICAgICBzdEV2dDp3aGVuPSIyMDI1LTA0LTI2VDA4OjQ0OjIzIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjE1NTE5ZjFlLTE2MTItNGRjMi05OGYwLTg0ZGU0MzNkMDkzMSIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iR2ltcCAyLjEwIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNS0wNC0yNlQxMDoxODoxOCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3YjgyNzM5ZC0wNmUyLTQwY2ItOTM5NS1kMTY0ZGQ0MTU4YTIiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoV2luZG93cykiCiAgICAgIHN0RXZ0OndoZW49IjIwMjUtMDQtMjZUMTI6MjI6MTYiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+RlQ8XAAAAAZiS0dEAOsAFQAV0XfIwQAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+kEGhAWECqy9xIAAAQ+SURBVEjHtZZdbJNVGMd/fd9+rLUl67p3K40ZF1UuXHaBY3wEd7cEEwqSeqEzm1pZ3IXRGDNR70hwhJBxwbhBGQsiCUQkW8ArWFcXnOLSkmJCmr3SLimMrt3W0nar7dq+rxfqBPkQbXluTk7O8zznd/5PznOOyD/s+PHjpp07dzqvX79eKpVK3SaT6SWj0WhwOBzxVCpVosqmnZ2d1QIvx2IxHfBCIBCYBT4sl8uvFgqF13fv3v1cb29v040bN3KXL1/+8cKFC+MWi8UnSVJAluVixQCAHngFCAJrgTv3OlitVtrb22lvbzf19vZ2xOPxjnA4TCgUyoyNjV0ZGRkZN5vNPkmSfpmeni7/H4AnNo1Gg91ux263s23btjV79uzZkUgkdkQiEUKh0OLExMTE+fPnx00mk89qtYZkWVarCvAwoMbGRhobG9m6davN4/G4BwYG3OFwGFmW5yYnJ31nzpzxGY1GXyKRuFkVgGAwSDAYpLm5mZaWFmpqau4DkiQJSZLYsmWLvbu7u7O/v78zHA4TiUSiV69eHR8aGvJZLBZfPB6/BSD8V4Dl5WU8Hg+bNm1i7969ZDKZxypUX1/P5s2b6ezsbDpy5Mjb0Wj0q4sXL0aHhoZkSZIcFZXg6NGjZLNZDh8+TF1d3RPF2Gw2bDYbkiQ9XyqVTEKl1+jkyZP09PQwNzf3SJ9isYjf7ycSiVAs3n9zKwIYHh6moaGBkZERurq6iEajD/jMz8/T19dHW1sbTqeTmZmZ6gF0dHTg83rZuHEjXq8Xt9uNLMur69euXcPlcjE4OIgkSQ/NUXEJdFd+4NuzZ9m1axeBQACXy4Xf7+fUqVO0trYyNTWFx+PB6/VWvw8AJL8Y5pnZO3w5OIjD4eDYsWO0tbWtrh86dAiP200+n386ClBWWPpmlFj/QT7/5FP27dsHgMFgYHR0FM/27UTefY9idunpKKAW/3gg899PMhP/iPcHDtLU1MSLGzZQPxfn5mtvQll5ZHzlCqh/t/tS6FduvtWDq6UF008/c+uDjx+7eVUUuBcAQFlIEX7jnScOFyreXFUrSqGt5ulRVVBUEAXEZ9ciNNQj1tYirrFgsJg5cOAAZrO5MgCn08nU1BQ1NTXUSw3Ujn2HoNMh6HSIej2iwYCg16MRHhT3s+bmyhX460OyauvWPdJXURQURaFcLrOyskKhUKBQKLCysrLakv8V4O7du0xPT68myOfz5HI5crnc6jyfz7O0tEQ2myWdTjM/P08sFiOZTLKwsMDt27fvfaIVjUZTEkUxbbVai1qgAHwN6AAFyP85AnDu3DlOnz79QPV1Ot0ysKCqagrICoKQBpKCICSBRVVV00DWYDCkamtrF7VabVKv16f0ev3S+vXrc5cuXVISiQSah536xIkT+v379wuZTKYVqCuXy79pNJqkKIoZo9GYsdvtab/fX6jGt/x3pAXMvrKktgkAAAAASUVORK5CYII=" alt="MantelMount Logo" />
          </div>
          <div class="title">MantelMount Remote Editor</div>
        </div>
        <div class="editor">
          <div class="form-group">
            <label for="preset_1">Preset 1 Label:</label>
            <input type="text" id="preset_1" />
          </div>
          <div class="form-group">
            <label for="preset_2">Preset 2 Label:</label>
            <input type="text" id="preset_2" />
          </div>
          <div class="form-group">
            <label for="preset_3">Preset 3 Label:</label>
            <input type="text" id="preset_3" />
          </div>
          <div class="form-group">
            <label for="save_1">Save 1 Label:</label>
            <input type="text" id="save_1" />
          </div>
          <div class="form-group">
            <label for="save_2">Save 2 Label:</label>
            <input type="text" id="save_2" />
          </div>
          <div class="form-group">
            <label for="save_3">Save 3 Label:</label>
            <input type="text" id="save_3" />
          </div>
        </div>
      </ha-card>
      </div>
      <style>
        .editor {
          min-width: 420px;
          overflow-x: auto;
        }
        * {
          box-sizing: border-box;
        }
        ha-card {
          background: linear-gradient(145deg, #a9a9a9, #4d4d4d);
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
          padding: 16px;
          max-width: 100%;
          width: 100%;
          box-sizing: border-box;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .header {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
          padding: 0 8px;
          gap: 8px;
        }
        .logo-wrapper {          
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .logo img {
          width: 32px;
          height: 32px;
          object-fit: contain;
          display: block;
        }
        .title {
          font-size: 18px;
          font-weight: 500;
          color: #333;
        }
        .editor {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 0 16px 8px;
          max-height: 400px;
          overflow-y: auto;
          flex-grow: 1;
          min-width: 420px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 100%;
          flex-grow: 1;
        }
        label {
          font-size: 14px;
          color: #333;
        }
        input {
          padding: 8px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background: #f9f9f9;
          color: #333;
          width: 100%;
          box-sizing: border-box;
          max-width: 100%;
        }
        input:focus {
          outline: 3px solid #4D90FE;
          border-color: #4D90FE;
        }
        .button-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          padding-top: 16px;
        }
        .button-container button {
          flex: 1 1 calc(33.333% - 10px);
          min-width: 120px;
          padding: 10px;
          font-size: 16px;
          border-radius: 6px;
          background: #4d4d4d;
          color: white;
          border: none;
          cursor: pointer;
          box-sizing: border-box;
        }
        .button-container button:hover {
          background-color: #666;
        }
        .button-container button:active {
          background-color: #888;
        }
      </style>
    `;
    this.content = true;
    const inputs = ['preset_1', 'preset_2', 'preset_3', 'save_1', 'save_2', 'save_3'];
    inputs.forEach(id => {
      const input = this.querySelector(`#${id}`);
      if (input) {
        input.value = this.config.labels[id] || '';
      }
    });

    this._attachEditorHandlers();
  }

  _attachEditorHandlers() {
    const inputs = ['preset_1', 'preset_2', 'preset_3', 'save_1', 'save_2', 'save_3'];
    inputs.forEach(id => {
      const input = this.querySelector(`#${id}`);
      if (input) {
        input.addEventListener('input', () => {
          if (this._debounceTimeout) {
            clearTimeout(this._debounceTimeout);
          }
          this._debounceTimeout = setTimeout(() => {
            this.config.labels[id] = input.value;
          }, 500);
        });
          
        input.addEventListener('blur', () => {
          this._fireConfigChanged();
        });
      }
    });
  }

  _fireConfigChanged() {
    this.dispatchEvent(new CustomEvent('config-changed', {
      bubbles: true,
      composed: true,
      detail: { config: this.config }
    }));
  }
}

if (!customElements.get('mantel-mount-remote-editor')) {
  customElements.define('mantel-mount-remote-editor', MantelMountRemoteEditor);
}