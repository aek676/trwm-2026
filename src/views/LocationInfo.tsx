import { formatDate } from "../utils/date";
import { Layout } from "./Layout";

interface CustomerReview {
	name: string;
	rating: number;
	date: string;
	review: string;
}

interface OpeningHoursData {
	days: string;
	opening?: string;
	closing?: string;
	isClosed: boolean;
}

interface LocationInfoProps {
	title: string;
	rating: number;
	address: string;
	shedule: OpeningHoursData[];
	facilities: string[];
	customerReviews: CustomerReview[];
}

export function LocationInfo({
	title,
	rating,
	address,
	shedule,
	facilities,
	customerReviews,
}: LocationInfoProps) {
	return (
		<Layout title={title}>
			<h1>Starcups</h1>

			<div class="row">
				<div class="col-9 d-flex flex-column gap-4">
					<div class="row">
						<div class="col">
							<p class="rating">
								{[1, 2, 3, 4, 5].map((n) => (
									<i class={`bi bi-star${n <= rating ? "-fill" : ""}`} />
								))}
							</p>
							<p>{address}</p>

							<div class="d-flex flex-column gap-4">
								<div class="card text-white bg-primary">
									<h2 class="card-header">Opening hours</h2>
									<div class="card-body">
										{shedule.map((entry) => (
											<p class="card-text">
												{entry.days}:{" "}
												{entry.isClosed
													? "closed"
													: `${entry.opening} - ${entry.closing}`}
											</p>
										))}
									</div>
								</div>

								<div class="card text-white bg-primary">
									<h2 class="card-header">Facilities</h2>
									<div class="card-body">
										<p class="d-flex gap-2 card-text">
											{facilities.map((facility) => (
												<span class="badge bg-warning">{facility}</span>
											))}
										</p>
									</div>
								</div>
							</div>
						</div>

						<div class="col">
							<div class="card text-white bg-primary">
								<h2 class="card-header">Location map</h2>
								<div class="card-body">
									<div style="width: 100%">
										<iframe
											title="Location Map"
											width="100%"
											height="300"
											frameborder="0"
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
							<div class="card-header d-flex justify-content-between align-items-center">
								<h2>Customer reviews</h2>
								<a class="btn btn-danger" href="/location/review/new">
									Add review
								</a>
							</div>

							<div class="card-body">
								<div class="d-flex flex-column gap-4">
									{customerReviews.map((customerReview) => (
										<div class="card-text">
											<div class="bg-secondary row justify-content-start">
												<p class="rating col-auto mb-0">
													{[1, 2, 3, 4, 5].map((n) => (
														<i
															class={`bi bi-star${n <= customerReview.rating ? "-fill" : ""}`}
														/>
													))}
												</p>
												<p class="col-auto mb-0">{customerReview.name}</p>
												<small class="col-auto text-white-50">
													{formatDate(customerReview.date)}
												</small>
											</div>
											<p class="mt-2">{customerReview.review}</p>
										</div>
									))}
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
