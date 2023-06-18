const { Regex } = require('@companion-module/base')

module.exports = {
	
	/**
	 * Creates the configuration fields for web config.
	 *
	 * @returns {Array} the config fields
	 * @access public
	 * @since 1.0.0
	 */
	getConfigFields() {
		return [
            {
                id: 'info',
				type: 'static-text',
                width: 12,
                label: 'Information',
                value: 'This module will connect to a Blackmagic Design Audiomonitor Device.'
            },
			{
				id: 'ip',
				type: 'textinput',
				label: 'Device IP',
				tooltip: 'Enter the Device IP Address',
				width: 8,
				regex: Regex.IP,
                default: '192.168.0.1',
                required: true,
			},
			{
				id: 'port',
				type: 'textinput',
				label: 'Device Port',
				tooltip: 'Enter the Device Port Address - Default is 9996',		
				width: 4,
				regex: Regex.PORT,
				default: 9996,
                required: true,
			},
		]
	},
}