const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base')

const configs = require('./config')
const actions = require('./actions')
const feedbacks = require('./feedbacks')
const presets = require('./presets')
const variables = require('./variables')
const device = require('./device')

class BMDAudioMonitorInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		Object.assign(this, {
			...configs,
			...actions,
			...feedbacks,
			...presets,
			...variables,
			...device
		})
	}

	async init(config) {

		this.config = config

		this.stash = []
		this.command = null
		this.commandQueue = []
		this.cts = false

		this.store = {
			variables: {},
		}

		if (!this.config.ip) {
			this.updateStatus(InstanceStatus.Disconnected)
			return
		}

		if (this.config.ip && this.config.port) {
			this.updateStatus(InstanceStatus.Connecting)

			this.initActions()		
			this.initFeedbacks()		
			this.initVariables()
			this.initPresets()
			this.initDevice()

			this.updateStatus(InstanceStatus.Ok)
		} else {
			this.updateStatus(InstanceStatus.BadConfig)
		}

	}

	async configUpdated(config) {

		this.config = config

		if (this.config.ip && this.config.port) {
			this.updateStatus(InstanceStatus.Connecting)

			this.initActions()		
			this.initFeedbacks()		
			this.initVariables()
			this.initPresets()
			this.initDevice()

			this.updateStatus(InstanceStatus.Ok)
		} else {
			this.updateStatus(InstanceStatus.BadConfig)
		}

	}

	async destroy() {
		if (this.socket !== undefined) {
			this.socket.destroy()
		}
	}

}

runEntrypoint(BMDAudioMonitorInstance, [])