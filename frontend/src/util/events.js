
export function get_unique_venues(data) {

    const venues = {}

    data.forEach(item => {
        const { venue, ...group } = item
        const venueId = venue.venue_id
        if (!venues[venueId]) {
            venues[venueId] = {
                ...venue,
                groups: [
                    group
                ]

            }
        } else {
            venues[venueId].groups.push(group)
        }
    })
    return Object.values(venues)
}

