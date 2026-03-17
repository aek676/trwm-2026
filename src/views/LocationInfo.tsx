import { Layout } from "./Layout";

interface LocationInfoProps {
	title: string;
}

export function LocationInfo({ title }: LocationInfoProps) {
	return (
		<Layout title={title}>
			<div class="row banner mb-4">
				<div class="col-12">
					<h1>Starcups</h1>
				</div>
			</div>

			<div class="row">
				<div class="col-9 d-flex flex-column gap-4">
					<div class="row">
						<div class="col">
							<p class="rating">
								<i class="bi bi-star-fill"></i>
								<i class="bi bi-star-fill"></i>
								<i class="bi bi-star-fill"></i>
								<i class="bi bi-star"></i>
								<i class="bi bi-star"></i>
							</p>
							<p>125 High Street, Reading RG6 1PS </p>

							<div class="d-flex flex-column gap-4">
								<div class="card text-white bg-primary">
									<div class="card-body">
										<h2 class="card-title">Opening hours</h2>
										<p class="card-text">Monday - Friday : 7:00am - 7:00pm</p>
										<p class="card-text">Saturday : 8:00am - 5:00pm</p>
										<p class="card-text">Sunday: closed</p>
									</div>
								</div>

								<div class="card text-white bg-primary">
									<div class="card-body">
										<h2 class="card-title">Facilities</h2>
										<p class="d-flex gap-2 card-text">
											<span class="badge bg-warning"> Hot drinks</span>
											<span class="badge bg-warning"> Food</span>
											<span class="badge bg-warning"> Premium Wifi</span>
										</p>
									</div>
								</div>
							</div>
						</div>

						<div class="col">
							<div class="card text-white bg-primary">
								<div class="card-body">
									<h2 class="card-title">Location map</h2>
									<div style="width: 100%">
										<iframe
											title="Location Map"
											width="100%"
											height="300"
											frameborder="0"
											scrolling="no"
											marginheight="0"
											marginwidth="0"
											src="https://maps.google.com/maps?width=100%25&height=600&hl=es&q=Les%20Rambles,%201%20Barcelona,%20Spain+(Mi%20nombre%20de%20egocios)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
										>
											<a href="https://www.mapsdirections.info/calcular-la-poblacion-en-un-mapa/">
												Medir población
											</a>
										</iframe>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="card text-white bg-primary">
							<div class="card-body">
								<div class="d-flex justify-content-between align-items-center mb-3">
									<h2 class="card-title m-0">Customer reviews</h2>
									<button type="button" class="btn btn-danger">
										Add review
									</button>
								</div>

								<div class="d-flex flex-column gap-4">
									<div class="card-text">
										<div class="bg-secondary row justify-content-start">
											<p class="rating col-auto mb-0">
												<i class="bi bi-star-fill"></i>
												<i class="bi bi-star-fill"></i>
												<i class="bi bi-star-fill"></i>
												<i class="bi bi-star"></i>
												<i class="bi bi-star"></i>
											</p>
											<p class="col-auto mb-0"> Simon Holmes </p>
											<small class="col-auto text-white-50 pt-1">
												16 February 2019
											</small>
										</div>
										<p class="mt-2"> What a great place</p>
									</div>

									<div class="card-text">
										<div class="bg-secondary row justify-content-start">
											<p class="rating col-auto mb-0">
												<i class="bi bi-star-fill"></i>
												<i class="bi bi-star-fill"></i>
												<i class="bi bi-star-fill"></i>
												<i class="bi bi-star-fill"></i>
												<i class="bi bi-star"></i>
											</p>
											<p class="col-auto mb-0">Antonio Becerra</p>
											<small class="col-auto text-white-50 pt-1">
												14 February 2019
											</small>
										</div>
										<p class="mt-2">It was okay. Coffee wasn't great.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col">
					<p>
						Starcups is on Loc8r because it has accesible wifi and space to sit
						down with your laptop and get some work done.
					</p>
					<p>
						If you've been and you like it, or if you don't, please leave a
						review to help other people just like you.
					</p>
				</div>
			</div>
		</Layout>
	);
}
