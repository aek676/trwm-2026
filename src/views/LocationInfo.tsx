import { Layout } from "./Layout";

interface LocationInfoProps {
	title: string;
}

export function LocationInfo({ title }: LocationInfoProps) {
	return (
		<Layout title={title}>
			<div class="row banner">
				<div class="col-12">
					<h1>Starcups</h1>
				</div>
			</div>
			<div class="row">
				<div class="col-12 col-lg-9">
					<div class="row">
						<div class="col-12 col-md-6">
							<p class="rating">
								<i class="bi bi-star-fill"></i>
								<i class="bi bi-star-fill"></i>
								<i class="bi bi-star-fill"></i>
								<i class="bi bi-star"></i>
								<i class="bi bi-star"></i>
							</p>
							<p>125 High Street, Reading RG6 1PS </p>
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
				</div>
			</div>
		</Layout>
	);
}
