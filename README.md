# MantelMount Remote Dashboard

A Lovelace card for controlling your MantelMount lift system in Home Assistant.

## Installation

1. In HACS, go to **Frontend** and add `https://github.com/jliggero/mantel-mount-remote-dashboard` as a custom repository (type: Frontend).
2. Install the `MantelMount Remote Card`.
3. Restart Home Assistant (`ha core restart`).
4. In Lovelace, add a new card and select `MantelMount Remote`.
5. Configure the card to use entities from the `mantel_mount_remote` integration (e.g., `switch.mantel_mount_up`).

## Prerequisites

- Install the [MantelMount Remote Integration](https://github.com/jliggero/mantel-mount-remote-integration) for switch entities.

## Notes

- The card logo is embedded, so no additional files are needed.
- Requires Home Assistant 2023.9.0 or later.
