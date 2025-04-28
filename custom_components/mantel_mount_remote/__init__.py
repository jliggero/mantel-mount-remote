import logging
from homeassistant.components.frontend import add_extra_js_url
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)

DOMAIN = "mantel_mount_remote"

async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Set up the MantelMount Remote integration."""
    add_extra_js_url(hass, "/local/community/mantel-mount-remote/mantel-mount-remote.js")
    _LOGGER.info("MantelMount Remote resources registered")
    return True

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up MantelMount Remote from a config entry."""
    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN][entry.entry_id] = {
        "ip_address": entry.data["ip_address"],
        "port": entry.data["port"]
    }
    await hass.config_entries.async_forward_entry_setups(entry, ["switch"])
    return True