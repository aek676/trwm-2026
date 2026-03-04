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
					href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.3/lumen/bootstrap.min.css"
				/>
				<link rel="stylesheet" href="/stylesheets/style.css" />
			</head>
			<body>
				{children}
				<script
					src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
					integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
					crossorigin="anonymous"
				/>
			</body>
		</html>
	);
}
