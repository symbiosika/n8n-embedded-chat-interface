export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts}"],
	darkMode: ["class", "class"],
	theme: {
		extend: {
			colors: {
				primary: {
					"50": "#f6f6f6",
					"100": "#e7e7e7",
					"200": "#cccccc",
					"300": "#b3b3b3",
					"400": "#8c8c8c",
					"500": "#666666",
					"600": "#4d4d4d",
					"700": "#333333",
					"800": "#222222",
					"900": "#181818",
					"950": "#0f0f0f",
					DEFAULT: "#333333",
				},
				secondary: {
					"50": "#f8f9f9",
					"100": "#f2f3f4",
					"200": "#e5e7e8",
					"300": "#cfd3d6",
					"400": "#b2b8bd",
					"500": "#959da3",
					"600": "#7a8389",
					"700": "#666d72",
					"800": "#515559",
					"900": "#3d4144",
					"950": "#24262a",
					DEFAULT: "#7a8389",
				},
				surface: {
					"0": "#ffffff",
					"50": "#fafafa",
					"100": "#f4f4f5",
					"200": "#e4e4e7",
					"300": "#d4d4d8",
					"400": "#a1a1aa",
					"500": "#71717a",
					"600": "#52525b",
					"700": "#3f3f46",
					"800": "#27272a",
					"900": "#18181b",
					"950": "#09090b",
				},
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
			},
			borderRadius: {
				lg: "0.5rem",
				md: "0.375rem",
				sm: "0.25rem",
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--reka-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--reka-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
		screens: {
			coxs: "375px",
			xs: "425px",
			cosm: "500px",
			sm: "576px",
			comd: "650px",
			md: "768px",
			colg: "850px",
			lg: "992px",
			coxl: "1050px",
			xl: "1200px",
			"1280px": "1200px",
			co2xl: "1320px",
			"2xl": "1440px",
			"3xl": "1660px",
			"4xl": "1800px",
			max: "2000px",
			maxcoxs: {
				max: "374.5px",
			},
			maxxs: {
				max: "424.5px",
			},
			maxcosm: {
				max: "499.5px",
			},
			maxsm: {
				max: "575.5px",
			},
			maxcomd: {
				max: "649.5px",
			},
			maxmd: {
				max: "767.5px",
			},
			maxlg: {
				max: "991.5px",
			},
			maxxl: {
				max: "1199.5px",
			},
			"sm-to-lg": {
				min: "576px",
				max: "992px",
			},
			max1280px: {
				max: "1279.5px",
			},
			smallHeight: {
				raw: "(max-height: 750px)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
