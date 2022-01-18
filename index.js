// BlackMagic Design Audio Monitor

var tcp = require('../../tcp')
var instance_skel = require('../../instance_skel')
var debug
var log

function instance(system) {
	var self = this

	// super-constructor
	instance_skel.apply(this, arguments)

	self.stash = []
	self.command = null

	self.audio_meter = [
		{ id: 'VU (-20dBFS Ref)', label: 'VU (-20dBFS Ref)' },
		{ id: 'VU (-18dBFS Ref)', label: 'VU (-18dBFS Ref)' },
		{ id: 'PPM EBU (-20dBFS Ref)', label: 'PPM EBU (-20dBFS Ref)' },
		{ id: 'PPM EBU (-18dBFS Ref)', label: 'PPM EBU (-18dBFS Ref)' },
		{ id: 'PPM BBC (-20dBFS Ref)', label: 'PPM BBC (-20dBFS Ref)' },
		{ id: 'PPM BBC (-18dBFS Ref)', label: 'PPM BBC (-18dBFS Ref)' },
		{ id: 'Loudness (EBU +9 scale)', label: 'Loudness (EBU +9 scale)' },
		{ id: 'Loudness (EBU +18 scale)', label: 'Loudness (EBU +18 scale)' },
	]

	self.audio_input = [
		{ id: 'Speaker Stereo SDI Stereo 1-2', label: 'SDI Stereo 1-2' },
		{ id: 'Speaker Stereo SDI Stereo 3-4', label: 'SDI Stereo 3-4' },
		{ id: 'Speaker Stereo SDI Stereo 5-6', label: 'SDI Stereo 5-6' },
		{ id: 'Speaker Stereo SDI Stereo 7-8', label: 'SDI Stereo 7-8' },
		{ id: 'Speaker Stereo SDI Stereo 9-10', label: 'SDI Stereo 9-10' },
		{ id: 'Speaker Stereo SDI Stereo 11-12', label: 'SDI Stereo 11-12' },
		{ id: 'Speaker Stereo SDI Stereo 13-14', label: 'SDI Stereo 13-14' },
		{ id: 'Speaker Stereo SDI Stereo 15-16', label: 'SDI Stereo 15-16' },
		{ id: 'Speaker Stereo XLR AES/EBU Stereo 1-2', label: 'XLR AES/EBU Stereo' },
		{ id: 'Speaker Stereo XLR Analog Stereo', label: 'XLR Analogue Stereo' },
		{ id: 'Speaker Stereo RCA Stereo', label: 'RCA Stereo' },
	]

	self.actions() // export actions

	return self
}

instance.prototype.deviceInformation = function (key, data) {
	var self = this
	var oldHasData = (self.has_data = true)

	self.log('debug', 'device information process key: ' + key)

	// Initial data from device
	if (oldHasData != self.has_data && self.has_data) {
		self.checkFeedbacks()
	}
}

instance.prototype.updateConfig = function (config) {
	var self = this

	self.config = config
	self.init_tcp()
}

instance.prototype.init = function () {
	var self = this

	debug = self.debug
	log = self.log

	self.init_tcp()

	self.update_variables() // export variables
	self.init_presets()
}

instance.prototype.init_tcp = function () {
	var self = this
	var receivebuffer = ''

	if (self.socket !== undefined) {
		self.socket.destroy()
		delete self.socket
	}

	self.has_data = false

	if (self.config.host) {
		self.socket = new tcp(self.config.host, self.config.port)

		self.socket.on('status_change', function (status, message) {
			self.status(status, message)
		})

		self.socket.on('error', function (err) {
			debug('Network error', err)
			self.log('error', 'Network error: ' + err.message)
		})

		self.socket.on('connect', function () {
			debug('Connected')
		})

		// separate buffered stream into lines with responses
		self.socket.on('data', function (chunk) {
			self.log('debug', 'data received')
			var i = 0,
				line = '',
				offset = 0
			receivebuffer += chunk

			while ((i = receivebuffer.indexOf('\n', offset)) !== -1) {
				line = receivebuffer.substr(offset, i - offset)
				offset = i + 1
				self.socket.emit('receiveline', line.toString())
				self.log('debug', line.toString())
			}

			receivebuffer = receivebuffer.substr(offset)
		})

		self.socket.on('receiveline', function (line) {
			if (self.command === null && line.match(/:/)) {
				self.command = line
				self.log('debug', 'command: ' + line)
			} else if (self.command !== null && line.length > 0) {
				self.stash.push(line.trim())
			} else if (line.length === 0 && self.command !== null) {
				var cmd = self.command.trim().split(/:/)[0]

				self.log('debug', 'COMMAND: ' + cmd)

				var obj = {}
				self.stash.forEach(function (val) {
					var info = val.split(/\s*:\s*/)
					obj[info.shift()] = info.join(':')
				})

				self.deviceInformation(cmd, obj)

				self.stash = []
				self.command = null
			} else {
				self.log('debug', 'weird response from device', line, line.length)
			}
		})
	}
}

// Return config fields for web config
instance.prototype.config_fields = function () {
	var self = this

	return [
		{
			type: 'text',
			id: 'info',
			width: 12,
			label: 'Information',
			value: 'This module will allow you to control the Blackmagic Audio Monitor.',
		},
		{
			type: 'textinput',
			id: 'host',
			label: 'Device IP',
			width: 6,
			regex: self.REGEX_IP,
		},
		{
			type: 'textinput',
			id: 'port',
			label: 'Device Port',
			width: 6,
			default: '9996',
			regex: self.REGEX_PORT,
		},
	]
}

// When module gets deleted
instance.prototype.destroy = function () {
	var self = this

	if (self.socket !== undefined) {
		self.socket.destroy()
	}

	debug('destroy', self.id)
}

instance.prototype.update_variables = function (system) {
	var self = this
	var variables = []

	// feedbacks
	var feedbacks = {}

	self.setFeedbackDefinitions(feedbacks)
}

instance.prototype.feedback = function (feedback, bank) {
	var self = this
}

instance.prototype.init_presets = function () {
	var self = this
	var presets = []

	for (i = 0; i < self.audio_meter.length; ++i) {
		presets.push({
			category: 'Audio Meters',
			label: self.audio_meter[i].label,
			bank: {
				style: 'text',
				text: self.audio_meter[i].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0),
			},
			actions: [
				{
					action: 'audio_meter',
					options: {
						audio_meter: self.audio_meter[i].id,
					},
				},
			],
		})
	}

	for (i = 0; i < self.audio_input.length; ++i) {
		presets.push({
			category: 'Audio Input',
			label: self.audio_input[i].label,
			bank: {
				style: 'text',
				text: self.audio_input[i].label,
				size: 'auto',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0),
			},
			actions: [
				{
					action: 'audio_input',
					options: {
						audio_input: self.audio_input[i].id,
					},
				},
			],
		})
	}

	self.setPresetDefinitions(presets)
}

instance.prototype.actions = function () {
	var self = this

	self.system.emit('instance_actions', self.id, {
		audio_meter: {
			label: 'Audio Meter Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Type',
					id: 'audio_meter',
					default: 'VU (-20dBFS Ref)',
					choices: self.audio_meter,
				},
			],
		},
		audio_input: {
			label: 'Audio Input',
			options: [
				{
					type: 'dropdown',
					label: 'Input',
					id: 'audio_input',
					default: 'Speaker Stereo SDI Stereo 1-2',
					choices: self.audio_input,
				},
			],
		},
		speaker: {
			label: 'Speaker Volume',
			options: [
				{
					type: 'number',
					label: 'Volume',
					id: 'speaker',
					default: 128,
					min: 0,
					max: 255,
				},
			],
		},
		headphone: {
			label: 'Headphone Volume',
			options: [
				{
					type: 'number',
					label: 'Volume',
					id: 'headphone',
					default: 128,
					min: 0,
					max: 255,
				},
			],
		},
		mute: {
			label: 'Mute',
			options: [
				{
					type: 'dropdown',
					label: 'Mute',
					id: 'mute',
					default: 'false',
					choices: [
						{ id: 'true', label: 'On' },
						{ id: 'false', label: 'Off' },
					],
				},
			],
		},
		solo: {
			label: 'Solo',
			options: [
				{
					type: 'dropdown',
					label: 'Solo',
					id: 'solo',
					default: 'Off',
					choices: [
						{ id: 'Off', label: 'Off' },
						{ id: 'Left', label: 'Left' },
						{ id: 'Right', label: 'Right' },
					],
				},
			],
		},
	})
}

instance.prototype.action = function (action) {
	var self = this
	var cmd

	if (action.action === 'audio_meter') {
		cmd = 'AUDIO METER:\nMeter Mode: ' + action.options.audio_meter + '\n\n'
		self.log('debug', cmd)
	}

	if (action.action === 'audio_input') {
		cmd = 'AUDIO INPUT:\nRouting: ' + action.options.audio_input + '\n\n'
		self.log('debug', cmd)
	}

	if (action.action === 'speaker') {
		cmd = 'AUDIO OUTPUT:\nGain: Speaker Stereo ' + action.options.speaker + '\n\n'
		self.log('debug', cmd)
	}

	if (action.action === 'headphone') {
		cmd = 'AUDIO OUTPUT:\nGain: Headphone Stereo ' + action.options.headphone + '\n\n'
		self.log('debug', cmd)
	}

	if (action.action === 'mute') {
		cmd = 'AUDIO OUTPUT:\nMute: ' + action.options.mute + '\n\n'
		self.log('debug', cmd)
	}

	if (action.action === 'solo') {
		cmd = 'AUDIO OUTPUT:\nSolo: ' + action.options.solo + '\n\n'
		self.log('debug', cmd)
	}

	console.log(cmd)

	if (cmd !== undefined) {
		if (self.socket !== undefined && self.socket.connected) {
			self.socket.send(cmd)
		} else {
			debug('Socket not connected :(')
		}
	}
}

instance_skel.extendedBy(instance)
exports = module.exports = instance
