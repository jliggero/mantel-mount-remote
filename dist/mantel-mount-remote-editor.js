import { html } from "https://unpkg.com/lit-html?module";

class MantelMountRemoteEditor extends HTMLElement {
  static getConfigElement() {
    return document.createElement('mm-remote-editor');
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
      // Shallow copy to avoid mutation of the input config
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
		    <img class="logo" src="/hacsfiles/mantel-mount-remote/mantelmount-logo.png" alt="MantelMount Logo" />
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
        </div>
      </ha-card>
	  </div>
      <style>
	    .editor {
		  min-width: 420px;
		  overflow-x: auto;
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
		  max-width: 100%
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
    // Programmatically set input values after rendering
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

if (!customElements.get('mm-remote-editor')) {
  customElements.define('mm-remote-editor', MantelMountRemoteEditor);
}
