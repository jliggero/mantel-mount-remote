"""MantelMount Remote integration."""
DOMAIN = "mantel_mount_remote"

async def async_setup(hass, config):
    """Set up the MantelMount Remote integration."""
    return True

async def async_setup_entry(hass, config_entry):
    """Set up MantelMount Remote from a config entry."""
    await hass.config_entries.async_forward_entry_setups(config_entry, ["switch"])
    return True