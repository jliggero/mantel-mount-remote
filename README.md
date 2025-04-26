MantelMount Remote
A Home Assistant integration and Lovelace custom card for controlling a MantelMount via UDP commands.
Features

Integration: Provides switch entities (e.g., switch.mantel_mount_up) to control your MantelMount via UDP.
Lovelace Card: A 12-button interface to control your MantelMount: Up, Down, Left, Right, Stop, Home, Preset 1-3, Save 1-3.
Customizable button labels in the Lovelace card.
Sleek design with centered buttons and a house icon (🏠).

Installation via HACS

Ensure you have HACS installed in Home Assistant.
Go to HACS > Integrations and click the three dots (⋮) in the top-right corner.
Select Custom repositories.
Add the repository URL: https://github.com/jliggero/mantel-mount-remote.
Set the category to Integration and click Add.
Search for "MantelMount Remote" in HACS and click Install.
Restart Home Assistant (ha core restart).

Manual Installation

Download the repository and place the custom_components/mantel_mount_remote/ folder into your Home Assistant's custom_components/ directory (e.g., /config/custom_components/).

No need to move files manually — the integration automatically places mm-remote.js and mm-remote-editor.js in the correct location (/hacsfiles/mantel_mount_remote/).

Add Lovelace Resources:

Go to Settings > Dashboards > Resources.

Add the following URLs:

url: /hacsfiles/mantel-mount-remote/mm-remote.js
type: module

url: /hacsfiles/mantel-mount-remote/mm-remote-editor.js
type: module

Reload resources: Go to Settings > Dashboards > Menu (⋮) > Reload Resources.

Restart Home Assistant.



Configuration

Set Up the Integration:

Go to Settings > Devices & Services > Add Integration.
Search for "MantelMount Remote" and add it.
Enter the UDP IP and port for your MantelMount device (e.g., 192.168.1.100 and 81).
If the device is reachable, the integration will set up and create switch entities like switch.mantel_mount_up, switch.mantel_mount_down, etc.
To change the IP or port later, go to Settings > Devices & Services, find "MantelMount Remote," click Configure, and update the settings.


Add the Lovelace Card:

Edit your dashboard, click Add Card, and select Custom: MantelMount Remote.
Or, manually add to your YAML:type: custom:mm-remote
labels:
  preset_1: "Preset 1"
  preset_2: "Preset 2"
  preset_3: "Preset 3"
  save_1: "Save 1"
  save_2: "Save 2"
  save_3: "Save 3"




Customize the button labels as needed.

Save and test the buttons to control your mount.


Configuration Options (Lovelace Card)



Option
Type
Default
Description



labels
Object
See default above
Custom labels for Preset and Save buttons.


Troubleshooting

Integration setup fails with "Cannot connect" error?
Ensure the IP and port are correct and the MantelMount device is powered on and reachable on your network.
Check your network firewall settings to allow UDP traffic.


Buttons not working?
Verify the MantelMount Remote integration is set up correctly and the switch entities are available (e.g., switch.mantel_mount_up).
Check that your MantelMount device is reachable on the network.


Card not loading?Clear your browser cache (Ctrl+Shift+R) and restart Home Assistant.
Logs:Check for errors:cat /homeassistant/home-assistant.log | grep mantel_mount



Credits
Developed by jliggero.
License
This project is licensed under the MIT License - see the LICENSE file for details.
