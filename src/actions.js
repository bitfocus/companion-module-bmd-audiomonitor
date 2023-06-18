const { getValue, Fields } = require('./constants')

module.exports = {

	initActions() {

		let actions = {}

		actions['audio_meter'] = {
			name: 'Audio Meter',
            options: [Fields.AudioMeter],
			callback: ({ options }) => {
				this.queueCommand(`AUDIO METER:\nMeter Mode: ${options.val}`)
			}
		}
		
		actions['audio_input'] = {
			name: 'Audio Input',
            options: [Fields.AudioInput],
			callback: ({ options }) => {
				this.queueCommand(`AUDIO INPUT:\nRouting: ${options.val}`)
			}
		}

		actions['mute'] = {
			name: 'Mute',
            options: [Fields.Mute],
 			callback: ({ options }) => {
				this.queueCommand(`AUDIO OUTPUT:\nMute: ${options.val}`)
			}
		}

		actions['solo'] = {
			name: 'Solo',
            options: [Fields.Solo],
			callback: ({ options }) => {
				this.queueCommand(`AUDIO OUTPUT:\nSolo: ${options.val}`)
			}
		}

		actions['headphone_volume'] = {
			name: 'Headphone Volume',
			options: [Fields.Level(0)],
			callback: ({ options }) => {
				this.queueCommand(`AUDIO OUTPUT:\nGain: Headphone Stereo ${options.val}`)
			},
		}

		actions['headphone_volume_up'] = {
			name: 'Headphone Volume (Up)',
			options: [Fields.Increase],
			callback: ({ options }) => {
				volume = getValue(this.getVariableValue('monitor_headphone_volume'), options.val)
				this.queueCommand(`AUDIO OUTPUT:\nGain: Headphone Stereo ${volume}`)
			},
		}

		actions['headphone_volume_down'] = {
			name: 'Headphone Volume (Down)',
			options: [Fields.Decrease],
			callback: ({ options }) => {
				volume  = getValue(this.getVariableValue('monitor_headphone_volume'), 0 - options.val)
				this.queueCommand(`AUDIO OUTPUT:\nGain: Headphone Stereo ${volume}`)
			},
		}

		actions['speaker_volume'] = {
			name: 'Speaker Volume',
			options: [Fields.Level(0)],
			callback: ({ options }) => {
				this.queueCommand(`AUDIO OUTPUT:\nGain: Speaker Stereo ${options.val}`)
			},
		}

		actions['speaker_volume_up'] = {
			name: 'Speaker Volume (Up)',
			options: [Fields.Increase],
			callback: ({ options }) => {
				volume  = getValue(this.getVariableValue('monitor_speaker_volume'), options.val)
				this.queueCommand(`AUDIO OUTPUT:\nGain: Speaker Stereo ${volume}`)
			},
		}

		actions['speaker_volume_down'] = {
			name: 'Speaker Volume (Down)',
			options: [Fields.Decrease],
			callback: ({ options }) => {
				volume  = getValue(this.getVariableValue('monitor_speaker_volume'), 0 - options.val)
				this.queueCommand(`AUDIO OUTPUT:\nGain: Speaker Stereo ${volume}`)
			},
		} 

		this.setActionDefinitions(actions)

	},
}