export interface ColorProps {
	primaryColor?: string;
	secondaryColor?: string;
	backgroundColor?: string;
	textColor?: string;
	accentColor?: string;
	surfaceColor?: string;
	borderColor?: string;
	successColor?: string;
	warningColor?: string;
	errorColor?: string;
}

/**
 * Validates if a color value is safe and properly formatted
 * Prevents CSS injection attacks by allowing only valid color formats
 */
export const validateColor = (color: string): boolean => {
	if (!color || typeof color !== 'string') {
		return false;
	}

	// Trim whitespace and convert to lowercase for validation
	const trimmedColor = color.trim();
	
	// Allow hex colors (3, 4, 6, or 8 digits)
	const hexPattern = /^#[0-9A-Fa-f]{3,8}$/;
	
	// Allow rgb() and rgba() functions
	const rgbPattern = /^rgba?\(\s*([01]?\d\d?|2[0-4]\d|25[0-5])\s*,\s*([01]?\d\d?|2[0-4]\d|25[0-5])\s*,\s*([01]?\d\d?|2[0-4]\d|25[0-5])\s*(?:,\s*[01]?\.?\d*)?\s*\)$/;
	
	// Allow hsl() and hsla() functions
	const hslPattern = /^hsla?\(\s*([0-2]?\d?\d|3[0-5]\d|360)\s*,\s*([01]?\d?\d|100)%\s*,\s*([01]?\d?\d|100)%\s*(?:,\s*[01]?\.?\d*)?\s*\)$/;
	
	// Allow named colors (basic CSS color keywords)
	const namedColors = [
		'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond', 'blue',
		'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk',
		'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgrey', 'darkgreen', 'darkkhaki',
		'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen',
		'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue',
		'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro',
		'ghostwhite', 'gold', 'goldenrod', 'gray', 'grey', 'green', 'greenyellow', 'honeydew', 'hotpink', 'indianred',
		'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral',
		'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgrey', 'lightgreen', 'lightpink', 'lightsalmon',
		'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime',
		'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple',
		'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue',
		'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange',
		'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff',
		'peru', 'pink', 'plum', 'powderblue', 'purple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon',
		'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey',
		'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white',
		'whitesmoke', 'yellow', 'yellowgreen', 'transparent'
	];

	return hexPattern.test(trimmedColor) || 
		   rgbPattern.test(trimmedColor) || 
		   hslPattern.test(trimmedColor) || 
		   namedColors.includes(trimmedColor.toLowerCase());
};

/**
 * Composable for handling custom colors with validation and security
 */
export const useCustomColors = (colorProps: ColorProps) => {
	
	/**
	 * Generates CSS custom properties with validated colors
	 */
	const generateCustomColorCSS = (): string => {
		try {
			const colorMappings = {
				'--custom-primary': colorProps.primaryColor,
				'--custom-secondary': colorProps.secondaryColor,
				'--custom-background': colorProps.backgroundColor,
				'--custom-text': colorProps.textColor,
				'--custom-accent': colorProps.accentColor,
				'--custom-surface': colorProps.surfaceColor,
				'--custom-border': colorProps.borderColor,
				'--custom-success': colorProps.successColor,
				'--custom-warning': colorProps.warningColor,
				'--custom-error': colorProps.errorColor
			};

			let cssContent = '\n\n/* Custom Colors */\n:host, :root {\n';
			
			// Validate and add only safe colors
			Object.entries(colorMappings).forEach(([property, value]) => {
				if (value && validateColor(value)) {
					cssContent += `  ${property}: ${value};\n`;
				} else if (value) {
					console.warn(`Invalid color value provided for ${property}: ${value}`);
				}
			});
			
			cssContent += '}\n\n';

			// Add Tailwind utility overrides when custom colors are provided and validated
			if (colorProps.primaryColor && validateColor(colorProps.primaryColor)) {
				cssContent += `.bg-primary { background-color: var(--custom-primary) !important; }\n`;
				cssContent += `.text-primary { color: var(--custom-primary) !important; }\n`;
				cssContent += `.border-primary { border-color: var(--custom-primary) !important; }\n`;
			}
			
			if (colorProps.secondaryColor && validateColor(colorProps.secondaryColor)) {
				cssContent += `.bg-secondary { background-color: var(--custom-secondary) !important; }\n`;
				cssContent += `.text-secondary { color: var(--custom-secondary) !important; }\n`;
			}
			
			if (colorProps.backgroundColor && validateColor(colorProps.backgroundColor)) {
				cssContent += `.bg-white { background-color: var(--custom-background) !important; }\n`;
			}
			
			if (colorProps.textColor && validateColor(colorProps.textColor)) {
				cssContent += `.text-white { color: var(--custom-text) !important; }\n`;
				cssContent += `.text-black { color: var(--custom-text) !important; }\n`;
			}
			
			if (colorProps.surfaceColor && validateColor(colorProps.surfaceColor)) {
				cssContent += `.bg-surface-0, .bg-surface-50 { background-color: var(--custom-surface) !important; }\n`;
			}
			
			if (colorProps.borderColor && validateColor(colorProps.borderColor)) {
				cssContent += `.border, .border-gray-200 { border-color: var(--custom-border) !important; }\n`;
			}

			return cssContent;
		} catch (error) {
			console.error('Error generating custom color CSS:', error);
			return '';
		}
	};

	/**
	 * Gets validated color values
	 */
	const getValidatedColors = (): Record<string, string> => {
		const validatedColors: Record<string, string> = {};
		
		Object.entries(colorProps).forEach(([key, value]) => {
			if (value && validateColor(value)) {
				validatedColors[key] = value;
			}
		});
		
		return validatedColors;
	};

	/**
	 * Checks if any valid custom colors are provided
	 */
	const hasValidColors = (): boolean => {
		return Object.keys(getValidatedColors()).length > 0;
	};

	return {
		generateCustomColorCSS,
		getValidatedColors,
		hasValidColors,
		validateColor
	};
};