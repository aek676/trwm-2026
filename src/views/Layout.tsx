interface LayoutProps {
	title?: string;
	children?: string | JSX.Element;
}

export function Layout({ title, children }: LayoutProps) {
	return (
		<html lang="en">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>{title || "TRWM"}</title>

				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/minty/bootstrap.min.css"
					integrity="sha384-H4X+4tKc7b8s4GoMrylmy2ssQYpDHoqzPa9aKXbDwPoPUA3Ra8PA5dGzijN+ePnH"
					crossorigin="anonymous"
				/>

				<link rel="stylesheet" href="/stylesheets/style.css" />

				<script
					src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
					integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
					crossorigin="anonymous"
				/>
			</head>
			<body>{children}</body>
		</html>
	);
}
