import { Layout } from "./Layout";

interface LoadingListProps {
	title: string;
}

export function LoadingList({ title }: LoadingListProps) {
	return (
		<Layout title={title}>
			<div>
				<div class="row banner col-12">
					<h1>
						Loc8r
						<small> &nbsp; Find a places to work with wifi near you!</small>
					</h1>
				</div>
				<div class="row">
					<div class="col-12 col-md-8">
						<div class="card">
							<div class="card-header">
								<h2>
									<a href="/location"> Starcups</a>
									<small>
										<div class="d-inline-flex gap-1">
											<i class="bi bi-star-fill"></i>
											<i class="bi bi-star-fill"></i>
											<i class="bi bi-star-fill"></i>
											<i class="bi bi-star"></i>
											<i class="bi bi-star"></i>
										</div>
									</small>
									<span class="badge rounded-pill float-end bg-primary">
										100m
									</span>
								</h2>
							</div>
							<div class="card-body">
								<p class="address">125 High Street, Reading RG6 1PS</p>
								<p class="d-flex gap-2">
									<span class="badge bg-warning"> Hot drinks</span>
									<span class="badge bg-warning"> Food</span>
									<span class="badge bg-warning"> Premium Wifi</span>
								</p>
							</div>
						</div>
					</div>
					<div class="col-12 col-md-4">
						<p class="lead">
							Looking for wifi and a seat? Loc8r helps you find places to work
							when out and about. Perphaps with coffee, cake or a pint? Let
							Loc8r help you find the place you're looking for.
						</p>
					</div>
				</div>
			</div>
		</Layout>
	);
}
