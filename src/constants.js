const { combineRgb } = require('@companion-module/base')


function getValue(base, offset) {

	let out = parseInt(base) + parseInt(offset)

	if (out > 255) {
		out = 255
	} else if (out < 0) {
		out = 0
	}

	return out
};

const StyleColors = {

	Red		:	combineRgb(255, 0, 0),
	Lime	:	combineRgb(0, 255, 0),
	Blue	:	combineRgb(0, 0, 255),
	Cyan	: 	combineRgb(0, 255, 255),
	Silver	:	combineRgb(192, 192, 192),
	Gray	:	combineRgb(128, 128, 128),
	Maroon	:	combineRgb(128, 0, 0),
	Olive	:	combineRgb(128, 128, 0),
	Purple	:	combineRgb(128, 0, 128),
	Navy	:	combineRgb(0, 0, 128),
	

	Orange	:	combineRgb(255, 128, 0),
	Brown	:	combineRgb(154, 76, 0),	

	Teal	:	combineRgb(1, 165, 190),	
	Aqua	:	combineRgb(1, 93, 150),	

	Scarlet	:	combineRgb(152, 0, 0),
	Magenta	: 	combineRgb(152, 0, 152),
	Blue	:	combineRgb(0, 0, 152),
	Green	:	combineRgb(0, 100, 0),
	Black	:	combineRgb(0, 0, 0),
	White	:	combineRgb(255, 255, 255),
	DarkGrey:	combineRgb(72, 72, 72),
	Yellow	:	combineRgb(255, 255, 0),
};

function getPresetStyle(text, color, bgcolor, image, size = 14, alignment = 'center:center' ) {

	if (null != image) {
		style = { text: text, size: size, color: color, bgcolor: bgcolor, alignment: alignment, png64: image }
	} else {
		style = { text: text, size: size, color: color, bgcolor: bgcolor, alignment: alignment }
	}

	return style
}

const FeedbackStyles = {
	Yellow: { color: StyleColors.Black, bgcolor: StyleColors.Yellow }	
};

function getFeedbackStyle( color, bgcolor, image ) {

	if (null != image) {
		style = { color: color, bgcolor: bgcolor, png64: image }
	} else {
		style = { color: color, bgcolor: bgcolor }
	}

	return style
}

const Choices = {
	AudioMeter: [
		{ id: 'VU (-20dBFS Ref)', label: 'VU (-20dBFS Ref)', presetId: '0', presetText: 'VU\\n-20dBFS', image: 'audio-meter-0' },
		{ id: 'VU (-18dBFS Ref)', label: 'VU (-18dBFS Ref)', presetId: '1', presetText: 'VU\\n-18dBFS', image: 'audio-meter-1' },
		{ id: 'PPM EBU (-20dBFS Ref)', label: 'PPM EBU (-20dBFS Ref)', presetId: '2', presetText: 'PPM EBU\\n-20 dBFS', image: 'audio-meter-2' },
		{ id: 'PPM EBU (-18dBFS Ref)', label: 'PPM EBU (-18dBFS Ref)', presetId: '3', presetText: 'PPM EBU\\n-18 dBFS', image: 'audio-meter-3' },
		{ id: 'PPM BBC (-20dBFS Ref)', label: 'PPM BBC (-20dBFS Ref)', presetId: '4', presetText: 'PPM BBC\\n-20 dBFS', image: 'audio-meter-4' },
		{ id: 'PPM BBC (-18dBFS Ref)', label: 'PPM BBC (-18dBFS Ref)', presetId: '5', presetText: 'PPM BBC\\n-18 dBFS', image: 'audio-meter-5' },
		{ id: 'Loudness (EBU +9 scale)', label: 'Loudness (EBU +9 scale)', presetId: '6', presetText: 'LOUD\\nEBU +9', image: 'audio-meter-6' },
		{ id: 'Loudness (EBU +18 scale)', label: 'Loudness (EBU +18 scale)', presetId: '7', presetText: 'LOUD\\nEBU +18', image: 'audio-meter-7' }
	],
	AudioInput: [
		{ id: 'Speaker Stereo SDI Stereo 1-2', label: 'SDI Stereo 1-2', presetId: '0', presetText: 'SDI\\nSTEREO\\n1-2', image: 'audio-input-0' },
		{ id: 'Speaker Stereo SDI Stereo 3-4', label: 'SDI Stereo 3-4', presetId: '1', presetText: 'SDI\\nSTEREO\\n3-4', image: 'audio-input-1' },
		{ id: 'Speaker Stereo SDI Stereo 5-6', label: 'SDI Stereo 5-6', presetId: '2', presetText: 'SDI\\nSTEREO\\n5-6', image: 'audio-input-2' },
		{ id: 'Speaker Stereo SDI Stereo 7-8', label: 'SDI Stereo 7-8', presetId: '3', presetText: 'SDI\\nSTEREO\\n7-8', image: 'audio-input-3' },
		{ id: 'Speaker Stereo SDI Stereo 9-10', label: 'SDI Stereo 9-10', presetId: '4', presetText: 'SDI\\nSTEREO\\n9-10', image: 'audio-input-4' },
		{ id: 'Speaker Stereo SDI Stereo 11-12', label: 'SDI Stereo 11-12', presetId: '5', presetText: 'SDI\\nSTEREO\\n11-12', image: 'audio-input-5' },
		{ id: 'Speaker Stereo SDI Stereo 13-14', label: 'SDI Stereo 13-14', presetId: '6', presetText: 'SDI\\nSTEREO\\n13-14', image: 'audio-input-6' },
		{ id: 'Speaker Stereo SDI Stereo 15-16', label: 'SDI Stereo 15-16', presetId: '7', presetText: 'SDI\\nSTEREO\\n15-16', image: 'audio-input-7' },
		{ id: 'Speaker Stereo XLR AES/EBU Stereo 1-2', label: 'XLR AES/EBU Stereo', presetId: '8', presetText: 'XLR\\nAES/EBU\\nSTEREO', image: 'audio-input-8' },
		{ id: 'Speaker Stereo XLR Analog Stereo', label: 'XLR Analogue Stereo', presetId: '9', presetText: 'XLR\\nANAL\\nSTEREO', image: 'audio-input-9' },
		{ id: 'Speaker Stereo RCA Stereo', label: 'RCA Stereo', presetId: '10', presetText: 'RCA\\nSTEREO', image: 'audio-input-10' }
	],
	Mute: [
		{ id: 'false', label: 'Off', presetId: '0', presetText: 'MUTE\\nOFF', image: 'mute-0' },
		{ id: 'true', label: 'On', presetId: '1', presetText: 'MUTE\\nON', image: 'mute-1' }
	],
	Solo: [
		{ id: 'Off', label: 'Off', presetId: '0', presetText: 'SOLO\\nOFF', image: 'solo-0' },
		{ id: 'Left', label: 'Left', presetId: '1', presetText: 'SOLO\\nLEFT', image: 'solo-1' },
		{ id: 'Right', label: 'Right', presetId: '2', presetText: 'SOLO\\nRIGHT', image: 'solo-2' }
	],
	HeadphoneVolumne: [
		{ id: '0', label: '0', presetId: '0', presetText: 'HPHONE\\nVOL\\n\\n0', image: 'headphone-1' },
		{ id: '127', label: '127', presetId: '1', presetText: 'HPHONE\\nVOL\\n\\n127', image: 'headphone-2' },
		{ id: '255', label: '255', presetId: '2', presetText: 'HPHONE\\nVOL\\n\\n255', image: 'headphone-3' }
	],
	SpeakerVolumne: [
		{ id: '0', label: '0', presetId: '0', presetText: 'SPKR\\nVOL\\n\\n0', image: 'speaker-1' },
		{ id: '127', label: '127', presetId: '1', presetText: 'SPKR\\nVOL\\n\\n127', image: 'speaker-2' },
		{ id: '255', label: '255', presetId: '2', presetText: 'SPKR\\nVOL\\n\\n255', image: 'speaker-3' }
	]
}

const Fields = {
	AudioMeter: 	{ type: 'dropdown', label: 'Audio Meter', id: 'val', choices: Choices.AudioMeter, default: Choices.AudioMeter[0].id },
	AudioInput: 	{ type: 'dropdown', label: 'Audio Input', id: 'val', choices: Choices.AudioInput, default: Choices.AudioInput[0].id },
	Mute: 			{ type: 'dropdown', label: 'Mute', id: 'val', choices: Choices.Mute, default: Choices.Mute[0].id },
	Solo: 			{ type: 'dropdown', label: 'Solo', id: 'val', choices: Choices.Solo, default: Choices.Solo[0].id },
	Increase: 		{ type: 'number', label: 'Increase Amount (1-20)', id: 'val', min: 1, max: 20, default: 5, required: true, range: true },
	Decrease: 		{ type: 'number', label: 'Decrease Amount (1-20)', id: 'val', min: 1, max: 20, default: 5, required: true, range: true },
	Level: function (defaultLevel) {
		return {
			type: 'number',
			label: 'Set the level 0-255',
			id: 'val',
			min: 0,
			max: 255,
			default: defaultLevel,
			required: true,
			range: true,
		}
	}
}

const Presets = {
	Types: [
		{ name: 'standard', label: ' (Standard)', presetBg: StyleColors.DarkGrey },
		{ name: 'colored', label: ' (Colored)' },
		{ name: 'images', label: ' (Images)' }
	],
	States: [
		{ action: 'audio_meter', category: 'Audio Meter', presetColor: StyleColors.White, presetBg: StyleColors.Green, feedbackColor: StyleColors.Black, feedbackBg: StyleColors.Yellow, choices: Choices.AudioMeter },
		{ action: 'audio_input', category: 'Audio Input', presetColor: StyleColors.White, presetBg: StyleColors.Blue, feedbackColor: StyleColors.Black, feedbackBg: StyleColors.Yellow, choices: Choices.AudioInput },
		{ action: 'mute', category: 'Mute', presetColor: StyleColors.White, presetBg: StyleColors.Magenta, feedbackColor: StyleColors.Black, feedbackBg: StyleColors.Yellow, choices: Choices.Mute },
 		{ action: 'solo', category: 'Solo', presetColor: StyleColors.White, presetBg: StyleColors.Scarlet, feedbackColor: StyleColors.Black, feedbackBg: StyleColors.Yellow, choices: Choices.Solo },
 		{ action: 'headphone_volume', category: 'Headphone', presetColor: StyleColors.White, presetBg: StyleColors.Brown, feedbackColor: StyleColors.Black, feedbackBg: StyleColors.Yellow, choices: Choices.HeadphoneVolumne },
		{ action: 'speaker_volume', category: 'Speaker', presetColor: StyleColors.White, presetBg: StyleColors.Aqua, feedbackColor: StyleColors.Black, feedbackBg: StyleColors.Yellow, choices: Choices.SpeakerVolumne }
	],
	Values: [
		{ action: 'headphone_volume', category: 'Headphone', default: '0', presetColor: StyleColors.White, presetBg: StyleColors.Orange, presetText: 'HPHONE\\nVOL', presetVar: '$(audiomonitor:monitor_headphone_volume)', presetImage: 'headphone-0', steps: false },
		{ action: 'headphone_volume_up', category: 'Headphone', default: '5', presetColor: StyleColors.White, presetBg: StyleColors.Orange, presetText: 'HPHONE\\nVOL\\n\\nUP', PresetVar: '', presetImage: 'arrow-up', steps: true },
		{ action: 'headphone_volume_down', category: 'Headphone', default: '5', presetColor: StyleColors.White, presetBg: StyleColors.Orange, presetText: 'HPHONE\\nVOL\\n\\nDOWN', PresetVar: '', presetImage: 'arrow-down', steps: true },
		{ action: 'speaker_volume', category: 'Speaker', default: '0', presetColor: StyleColors.White, presetBg: StyleColors.Teal, presetText: 'SPKR\\nVOL', presetVar: '$(audiomonitor:monitor_speaker_volume)', presetImage: 'speaker-0', steps: false },
		{ action: 'speaker_volume_up', category: 'Speaker', default: '5', presetColor: StyleColors.White, presetBg: StyleColors.Teal, presetText: 'SPKR\\nVOL\\n\\nUP', PresetVar: '', presetImage: 'arrow-up', steps: true },
		{ action: 'speaker_volume_down', category: 'Speaker', default: '5',presetColor: StyleColors.White, presetBg: StyleColors.Teal, presetText: 'SPKR\\nVOL\\n\\nDOWN', PresetVar: '', presetImage: 'arrow-down', steps: true }
	]
}

module.exports = {
	getValue,
	getPresetStyle,
	FeedbackStyles,
	getFeedbackStyle,
	Choices,
	Fields,
	Presets
}