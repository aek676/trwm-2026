db = db.getSiblingDB("lc8r");

db.locations.insertMany([
	{
		name: "Starcups",
		address: "125 High Street, Reading, RG6 1PS",
		rating: 3,
		facilities: ["Hot drinks", "Food", "Premium wifi"],
		coords: {
			type: "Point",
			coordinates: [-0.96962, 51.45543],
		},
		openingTimes: [
			{
				day: "Monday - Friday",
				opening: "7:00am",
				closing: "7:00pm",
				closed: false,
			},
			{
				day: "Saturday",
				opening: "8:00am",
				closing: "5:00pm",
				closed: false,
			},
			{
				day: "Sunday",
				closed: true,
			},
		],
		reviews: [
			{
				author: "Simon Holmes",
				rating: 3,
				reviewText: "What a great place.",
				createdOn: new Date("2019-02-16"),
			},
			{
				author: "Antonio Becerra",
				rating: 4,
				reviewText: "It was okay. Coffee wasn't great.",
				createdOn: new Date("2019-02-14"),
			},
		],
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: "Cafe Hero",
		address: "125 High Street, Reading, RG6 1PS",
		rating: 4,
		facilities: ["Hot drinks", "Food", "Premium wifi"],
		coords: {
			type: "Point",
			coordinates: [-0.96992, 51.45553],
		},
		openingTimes: [],
		reviews: [],
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: "Burger Queen",
		address: "125 High Street, Reading, RG6 1PS",
		rating: 2,
		facilities: ["Food", "Premium wifi"],
		coords: {
			type: "Point",
			coordinates: [-0.97022, 51.45563],
		},
		openingTimes: [],
		reviews: [],
		createdAt: new Date(),
		updatedAt: new Date(),
	},
]);

print("Database seeded with 3 locations");
