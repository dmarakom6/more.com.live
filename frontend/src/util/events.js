
export function find_unique_venues(data) {

    // Finds unique venueIds

    const venueIdCount = new Map();

    data.forEach(item => {
        const venueId = item.venue.venue_id;
        if (venueIdCount.has(venueId)) {
            venueIdCount.set(venueId, venueIdCount.get(venueId) + 1);
        } else {
            venueIdCount.set(venueId, 1);
        }
    });

    const uniqueVenueIds = [];
    venueIdCount.forEach((count, venueId) => {
        if (count === 1) {
            uniqueVenueIds.push(venueId);
        }
    });

    return uniqueVenueIds;
}
