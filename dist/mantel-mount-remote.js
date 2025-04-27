import { html } from "https://unpkg.com/lit-html?module";

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
		    <img class="logo" src="/hacsfiles/mantel-mount-remote/mantelmount-logo.png" alt="MantelMount Logo" />
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
        /* This part scales it down in the card picker/editor view */
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
		
		/* ------------ Main card styles ------------ */
		:host .btn {
		  width: 100px;
		  font-size: 16px;
		  padding: 8px 0;
		}
		
		ha-card {
		  overflow: hidden;
	    }
		
		/* ------------ Mobile scaling styles ------------ */
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
