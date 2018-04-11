window.tabler = {
	colors: {
		'blue': '#467fcf',
		'azure': '#45aaf2',
		'indigo': '#6574cd',
		'purple': '#a55eea',
		'pink': '#f66d9b',
		'red': '#e74c3c',
		'orange': '#fd9644',
		'yellow': '#f1c40f',
		'lime': '#7bd235',
		'green': '#5eba00',
		'teal': '#2bcbba',
		'cyan': '#17a2b8',
		'gray': '#868e96',
		'gray-dark': '#343a40',
	},
	hexToRgba: function(hex, opacity) {
		let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		let rgb = result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;

		return 'rgba('
			+ rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + opacity
			+ ')';
	},
	generateSparkline: function($element, data, params) {
		$element.sparkline(data, {
			type: $elem.attr('data-sparkline-type'),
			height: '100%',
			barColor: params.color,
			lineColor: params.color,
			fillColor: 'transparent',
			spotColor: params.color,
			spotRadius: 0,
			lineWidth: 2,
			highlightColor: tabler.hexToRgba(params.color, .6),
			highlightLineColor: '#666',
			defaultPixelsPerValue: 5
		});
	},
	mixColors: function (color1, color2, weight) {
		let color = "#"
		let color1 = color1.substr(0, 1) == '#' ? color1.substr(1, 6) : color1
		let color2 = color2.substr(0, 1) == '#' ? color2.substr(1, 6) : color2

		for (let i in [0, 2, 4]) {
			let v1 = parseInt(color1.substr(i, 2), 16)
			let v2 = parseInt(color2.substr(i, 2), 16)

			let val = v2 + (v1 - v2) * (weight / 100.0)
			val = Math.round(val).toString(16)

			while (val.length < 2) {
				val = '0' + val
			}

			color += val
		}

		return color
	},
	init: function () {
		if (Object.keys(tabler.colors).length === 14) {
			for (let k in Object.assign({}, tabler.colors)) {
				let color = tabler.colors[ k ]
				let mix = tabler.mixColors

				tabler.colors[k + '-darkest'] = mix(color, '#000000', 20)
				tabler.colors[k + '-darker'] = mix(color, '#000000', 40)
				tabler.colors[k + '-dark'] = mix(color, '#000000', 80)
				tabler.colors[k + '-light'] = mix(color, '#ffffff', 70)
				tabler.colors[k + '-lighter'] = mix(color, '#ffffff', 30)
				tabler.colors[k + '-lightest'] = mix(color, '#ffffff', 10)
			}
		}
	}
}
