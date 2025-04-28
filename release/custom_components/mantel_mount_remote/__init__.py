import logging
from homeassistant.components.frontend import add_extra_js_url

_LOGGER = logging.getLogger(__name__)

async def async_setup(hass, config):
    """Set up the MantelMount Remote integration."""
    add_extra_js_url(hass, "/local/community/mantel-mount-remote/mantel-mount-remote.js")
    _LOGGER.info("MantelMount Remote resources registered")
    return True