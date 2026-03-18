import { Layout } from "./Layout";

interface LocationReviewFormProps {
	title: string;
}

export function LocationReviewForm({ title }: LocationReviewFormProps) {
	return (
		<Layout title={title}>
			<div class="row banner">
				<div class="col-12">
					<h1>Review Star</h1>
				</div>
			</div>
			<div class="row">
				<div class="col-12 col-md-8">
					<form action="/location" method="GET">
						<div class="row mb-3">
							<label for="name" class="col-sm-2 col-form-label">
								Name
							</label>
							<div class="col-sm-10">
								<input id="name" class="form-control" name="name" />
							</div>
						</div>

						<div class="row mb-3">
							<label class="col-10 col-sm-2 col-form-label" for="rating">
								Rating
							</label>
							<div class="col-12 col-sm-2">
								<select
									id="rating"
									class="form-select form-select-sm"
									name="rating"
								>
									<option>5</option>
									<option>4</option>
									<option>3</option>
									<option>2</option>
									<option>1</option>
								</select>
							</div>
						</div>

						<div class="row mb-3">
							<label class="col-sm-2 col-form-label" for="review">
								Review
							</label>
							<div class="col-sm-10">
								<textarea
									id="review"
									class="form-control"
									name="review"
									rows="5"
								/>
							</div>
						</div>

						<button class="btn btn-primary float-end" type="submit">
							Add my review
						</button>
					</form>
				</div>
			</div>
		</Layout>
	);
}
