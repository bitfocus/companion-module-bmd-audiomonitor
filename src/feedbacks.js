const { FeedbackStyles, Fields } = require('./constants')

module.exports = {

	initFeedbacks() {

		let feedbacks = {}

		feedbacks['audio_meter'] = {
			type: 'boolean',
			name: 'Audio Meter',
			description: 'Change the style based on the selected audio meter',
            defaultStyle: FeedbackStyles.Yellow,
            options: [Fields.AudioMeter],
			callback: ({ options }) => {
				let currentValue = this.getVariableValue('audio_meter')
				return currentValue  === options.val
			},
		}

		feedbacks['audio_input'] = {
			type: 'boolean',
			name: 'Audio Input',
			description: 'Change the style based on the selected audio input',
            defaultStyle: FeedbackStyles.Yellow,
            options: [Fields.AudioInput],
			callback: ({ options }) => {
				let currentValue = this.getVariableValue('audio_input')
				return currentValue  === options.val
			},
		}

		feedbacks['mute'] = {
			type: 'boolean',
			name: 'Mute',
			description: 'Change the style based on the selected mute state',
            defaultStyle: FeedbackStyles.Yellow,
            options: [Fields.Mute],
			callback: ({ options }) => {
				let currentValue = this.getVariableValue('mute') == 'Off'?'false':'true'
				return currentValue  === options.val
			},	
		}

		feedbacks['solo'] = {
			type: 'boolean',
			name: 'Solo',
			description: 'Change the style based on the selected solo state',
            defaultStyle: FeedbackStyles.Yellow,
            options: [Fields.Solo],
			callback: ({ options }) => {
				let currentValue = this.getVariableValue('solo')
				return currentValue  === options.val
			},	
		}

		 feedbacks['speaker_volume'] = { 
			type: 'boolean',
			name: 'Speaker Volume',
			description: 'Change the style based on the selected sepaker volume',
            defaultStyle: FeedbackStyles.Yellow,
			options: [Fields.Level(128)],
			callback: ({ options }) => {
				let currentValue = this.getVariableValue('monitor_speaker_volume')
				return currentValue  === options.val
			},
		}

		feedbacks['headphone_volume'] = {
			type: 'boolean',
			name: 'Headphone Volume',
			description: 'Change the style based on the selected headphone volume',
            defaultStyle: FeedbackStyles.Yellow,
			options: [Fields.Level(128)],
			callback: ({ options }) => {
				let currentValue = this.getVariableValue('monitor_headphone_volume')
				return currentValue  === options.val
			},			
		} 

		this.setFeedbackDefinitions(feedbacks)

	}
}