import { Layout } from "./Layout";

interface PageHeader {
	title: string;
	strapline: string;
}

interface Location {
	name: string;
	address: string;
	rating: number;
	facilities: string[];
	distance: string;
}

interface LoadingListProps {
	title: string;
	pageHeader: PageHeader;
	locations: Location[];
}

export function LoadingList({
	title,
	pageHeader,
	locations,
}: LoadingListProps) {
	return (
		<Layout title={title}>
			<div class="row banner col-12">
				<h1>
					{pageHeader.title}
					<small> &nbsp; {pageHeader.strapline}</small>
				</h1>
			</div>
			<div class="row">
				<div class="col-12 col-md-8">
					{locations.map((loc) => (
						<div class="card mb-1">
							<div class="card-header">
								<h2>
									<a href="/location">{loc.name}</a>
									<small>
										<div class="d-inline-flex gap-1">
											{[1, 2, 3, 4, 5].map((n) => (
												<i
													class={`bi bi-star${n <= loc.rating ? "-fill" : ""}`}
												/>
											))}
										</div>
									</small>
									<span class="badge rounded-pill float-end bg-primary">
										{loc.distance}
									</span>
								</h2>
							</div>
							<div class="card-body">
								<p class="address">{loc.address}</p>
								<p class="d-flex gap-2">
									{loc.facilities.map((fac) => (
										<span class="badge bg-warning">{fac}</span>
									))}
								</p>
							</div>
						</div>
					))}
				</div>
				<div class="col-12 col-md-4">
					<p class="lead">
						Looking for wifi and a seat? Loc8r helps you find places to work
						when out and about. Perphaps with coffee, cake or a pint? Let Loc8r
						help you find the place you're looking for.
					</p>
				</div>
			</div>
		</Layout>
	);
}
