const { Presets, getPresetStyle, getFeedbackStyle } = require('./constants')
const images = require('./images')

module.exports = {
	
	initPresets() {

		let presets = {}

		for (let presetDef in Presets.States) {
			let preset = Presets.States[presetDef]

			for (let presetTypes in Presets.Types) {
				let presetType = Presets.Types[presetTypes]

				let presetBg = ('standard' == presetType.name ? presetType.presetBg : preset.presetBg);

				for (let id in preset.choices) {
					let choice = preset.choices[id]
					
					let presetImage = ('images' == presetType.name ? images.presetImages[choice.image] : null);
					let feedbackImage = ('images' == presetType.name ? images.presetImages[`${choice.image}-active`] : null);
					let presetText = ('images' == presetType.name ? null : choice.presetText);

					presets[`${preset.action}_${choice.presetId}_${presetType.name}`] = {
						type: 'button',
						category: preset.category + presetType.label,
						name: preset.action + choice.presetId + presetType.name,
						style: getPresetStyle (presetText, preset.presetColor, presetBg, presetImage ),
						steps: [
							{
								down: [
									{
										actionId: preset.action,
										options: { val: choice.id },
									},
								],
								up: [],
							},
						],
						feedbacks: [
							{
								feedbackId: preset.action,
								options: { val: choice.id },
								style: getFeedbackStyle ( preset.feedbackColor, preset.feedbackBg, feedbackImage ),
							},
						],
					}
				}
			}
		}

		for (let presetDef in Presets.Values) {
			let preset = Presets.Values[presetDef]

			for (let presetTypes in Presets.Types) {
				let presetType = Presets.Types[presetTypes]

				let presetBg = ('standard' == presetType.name ? presetType.presetBg : preset.presetBg);
				let presetImage = ('images' == presetType.name ? images.presetImages[preset.presetImage] : null);

				if (preset.steps === true) {

					let presetText = ('images' == presetType.name ? null : preset.presetText);

					presets[`${preset.action}_${presetType.name}`] = {
						type: 'button',
						category: preset.category + presetType.label,
						name: preset.action + presetType.name,
						style: getPresetStyle ( presetText, preset.presetColor, presetBg, presetImage ),
						steps: [
							{
								down: [
									{
										actionId: preset.action,
										options: { val: preset.default },
									},
								],
								up: [],
							},
						],
						feedbacks: [],
					}

				} else {

					let presetText = ('images' == presetType.name ? `\\n\\n${preset.presetVar}` : `${preset.presetText}\\n\\n( ${preset.presetVar} )`);					
					let textSize = ('images' == presetType.name ? '18' : '14');

					presets[`${preset.action}_${presetType.name}`] = {
						type: 'button',
						category: preset.category + presetType.label,
						name: preset.action + presetType.name,
						style: getPresetStyle ( presetText, preset.presetColor, presetBg, presetImage, textSize ),
						steps: [],
						feedbacks: [],
					}

				}
			}
		}

		this.setPresetDefinitions(presets)

	}
}