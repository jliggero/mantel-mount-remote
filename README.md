# MantelMount Remote Dashboard Card

This project provides a Lovelace dashboard card to control MantelMount lift systems inside Home Assistant.  
Requires the [MantelMount Remote Integration](https://github.com/jliggero/mantel-mount-remote-integration) to function.

---

## Features
- **Directional controls**: Up, down, left, right, and stop.
- **Home position** button.
- **Preset and Save** position buttons.
- Clean and responsive layout for Home Assistant dashboards.

---

## Installation
1. Add this repository to HACS:
   - Go to HACS → Frontend → Three Dots Menu → **Custom Repositories**.
   - URL: `https://github.com/jliggero/mantel-mount-remote-dashboard`
   - Category: **Dashboard**
2. Install the **MantelMount Remote Dashboard**.
3. Add `/hacsfiles/mantel-mount-remote-dashboard/mantel-mount-remote.js` as a Lovelace **resource**:
   ```yaml
   - url: /hacsfiles/mantel-mount-remote-dashboard/mantel-mount-remote.js
     type: module
