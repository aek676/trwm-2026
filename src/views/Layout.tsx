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
					href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
				/>

				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/bootswatch@5.3.8/dist/pulse/bootstrap.min.css"
					integrity="sha256-o//3hBDveRLQUla4SY0ZWD9uGrNz8nJZc8cuqV7K81g="
					crossorigin="anonymous"
				/>

				<link rel="stylesheet" href="/stylesheets/style.css" />
			</head>
			<body>
				<header>
					<nav
						class="navbar fixed-top navbar-expand-md bg-primary"
						data-bs-theme="dark"
					>
						<div class="container-fluid">
							<a class="navbar-brand" href="/">
								Loc8r
							</a>
							<button
								class="navbar-toggler"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#navbarMain"
								aria-controls="navbarMain"
								aria-expanded="false"
								aria-label="Toggle navigation"
							>
								<span class="navbar-toggler-icon" />
							</button>
							<div class="collapse navbar-collapse" id="navbarMain">
								<ul class="navbar-nav">
									<li class="nav-item">
										<a class="nav-link" href="/about">
											About
										</a>
									</li>
								</ul>
							</div>
						</div>
					</nav>
				</header>
				<main class="mt-5"> {children} </main>
				<footer class="container text-center">
					<small>&copy; Getting Mean - Simon Holmes/Clive Harber 2018</small>
				</footer>

				<script
					src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
					integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
					crossorigin="anonymous"
				></script>
			</body>
		</html>
	);
}
