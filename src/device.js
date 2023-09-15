const { TCPHelper } = require('@companion-module/base')

module.exports = {

	initDevice() {

		this.receiveBuffer = ''

		if (this.socket !== undefined) {
			this.socket.destroy()
			delete this.socket
		}

		if (this.config.port === undefined) {
			this.config.port = 9996
		}

		if (this.config.ip) {

			this.socket = new TCPHelper(this.config.ip, this.config.port)

			this.socket.on('status_change', (status, message) => {
				this.updateStatus(status, message)
			})

			this.socket.on('error', (err) => {
				this.log('error', 'Network error: ' + err.message)
			})

			this.socket.on('connect', () => {
				console.log('Socket Connected')
			})

			// separate buffered stream into lines with responses
			this.socket.on('data', (chunk) => {
				let i = 0,
					line = '',
					offset = 0
				this.receiveBuffer += chunk

				while ((i = this.receiveBuffer.indexOf('\n', offset)) !== -1) {
					line = this.receiveBuffer.substr(offset, i - offset)
					offset = i + 1

					if (line.match(/Error/)) {

						this.commandQueue.shift()
						this.sendNextCommand()

					} else if (line.match(/ACK/)) {

						if (this.commandQueue.length > 0) {
							let echo = this.commandQueue.shift()
							echo = echo.split('\n')

							if (echo.length > 1) {
								let cmd = echo.shift().trim().split(/:/)[0]
								this.processDeviceInformation(cmd, echo)
							}
							this.sendNextCommand()
						}
					} else {
						this.socket.emit('receiveline', line.toString())
					}
				}

				this.receiveBuffer = this.receiveBuffer.substr(offset)
			})

			this.socket.on('receiveline', (line) => {
				if (this.command === null && line.match(/:/)) {
					this.command = line
				} else if (this.command !== null && line.length > 0) {
					this.stash.push(line.trim())
				} else if (line.length === 0 && this.command !== null) {
					let cmd = this.command.trim().split(/:/)[0]

					this.processDeviceInformation(cmd, this.stash)

					this.stash = []
					this.command = null
					this.sendNextCommand()
				} else if (line.length > 0) {
					console.log('weird response from device: ' + line.toString() + ' ' + line.length)
				}
			})
		}
	},

	processDeviceInformation(cmd, object) {

		for (let key in object) {
			let parsethis = object[key]
			let a = parsethis.split(/: /)
			let attribute = a.shift()
			let value = a.join(' ')

			switch (attribute) {
				case 'Meter Mode':
					this.updateVariableValues('audio_meter', value)
					break
				case 'Routing':
					this.updateVariableValues('audio_input', value)
					break
				case 'Mute':
					this.updateVariableValues('mute', (value  == 'false'?'Off':'On'))
					break	
				case 'Solo':
					this.updateVariableValues('solo', value)
					break	
				case 'Gain':

				let gain = value.split(' ')
				let level = gain.pop()
				let monitor_source = gain.join(' ')

				switch (monitor_source) {
					case 'Speaker Stereo':
						this.updateVariableValues('monitor_speaker_volume', level)
						break
					case 'Headphone Stereo':
						this.updateVariableValues('monitor_headphone_volume', level)
						break	
				}
				break	
			}
		}

	},

	queueCommand(cmd) {
		if (cmd !== undefined) {
			if (this.socket !== undefined) {
				this.commandQueue.push(`${cmd}\n\n`)

				if (this.cts === true) {
					this.sendNextCommand()
				}
			} else {
				this.log('debug', 'Socket not connected :(')
			}
		}
	},

	sendNextCommand() {
		if (this.commandQueue.length > 0) {
			this.socket.send(this.commandQueue[0])
			this.cts = false
		} else {
			this.cts = true
		}
	},
}