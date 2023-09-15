module.exports = {

	variableDefinitions: [],

	initVariables() {

		this.variableDefinitions.push({
			name: 'Selected Audio Meter',
			variableId: 'audio_meter',
			storeId: 'selectedAudioMeter',
			feedbackId: 'audio_meter',
			defaultValue: 'VU (-20dBFS Ref)',
		})

		this.variableDefinitions.push({
			name: 'Selected Audio Input',
			variableId: 'audio_input',
			storeId: 'selectedAudioInput',
			feedbackId: 'audio_input',
			defaultValue: 'Speaker Stereo SDI Stereo 1-2', 
		})

		this.variableDefinitions.push({
			name: 'Selected Mute State',
			variableId: 'mute',
			storeId: 'selectedMuteState',
			feedbackId: 'mute',
			defaultValue: 'Off',
		})

		this.variableDefinitions.push({
			name: 'Selected Solo State',
			variableId: 'solo',
			storeId: 'selectedSoloState',
			feedbackId: 'solo',
			defaultValue: 'Off',
		})	

		this.variableDefinitions.push({
			name: 'Selected Speaker Volume',
			variableId: 'monitor_speaker_volume',
			storeId: 'selectedSpeakerVolume',
			feedbackId: 'speaker_volume',
			defaultValue: 0,
		})

		this.variableDefinitions.push({
			name: 'Selected Headphone Volume',
			variableId: 'monitor_headphone_volume',
			storeId: 'selectedHeadphoneVolume',
			feedbackId: 'headphone_volume',
			defaultValue: 0,
		}) 

		// Configure variables
		this.setVariableDefinitions(this.variableDefinitions)

		// Set initial values
		// TODO: Optimise by setting all at once
		this.variableDefinitions.forEach(({ variableId, defaultValue }) => {
			this.updateVariableValues(variableId, defaultValue)
		})
	},

	updateVariableValues(variableId, value) {
		const { storeId, feedbackId } = this.variableDefinitions.find((item) => item.variableId === variableId) || {}

		this.setVariableValues({ [variableId]: value })

		if (storeId) {
			this.store.variables[storeId] = value
		}
		if (feedbackId) {
			this.checkFeedbacks(feedbackId)
		}
	},
}
