
export function find_unique_venues(data) {

    // Finds unique venueIds

    const venueIdCount = new Map()

    data.forEach(item => {
        const venueId = item.venue.venue_id
        if (venueIdCount.has(venueId)) {
            venueIdCount.set(venueId, venueIdCount.get(venueId) + 1)
        } else {
            venueIdCount.set(venueId, 1)
        }
    })

    const uniqueVenueIds = []
    venueIdCount.forEach((count, venueId) => {
        if (count === 1) {
            uniqueVenueIds.push(venueId)
        }
    })

    return uniqueVenueIds
}

export function find_unique_groups_per_venue(data) {
    const venueEventGroupMap = {}

    data.forEach(item => {
        const venueId = item.venue.venue_id
        const eventGroupCode = item.group.event_group_code

        if (!venueEventGroupMap[venueId]) {
            venueEventGroupMap[venueId] = {}
        }

        if (!venueEventGroupMap[venueId][eventGroupCode]) {
            venueEventGroupMap[venueId][eventGroupCode] = 0
        }

        venueEventGroupMap[venueId][eventGroupCode]++
    })

    const result = {}
    for (const [venueId, eventGroupCodes] of Object.entries(venueEventGroupMap)) {
        result[venueId] = Object.keys(eventGroupCodes).filter(
            groupCode => eventGroupCodes[groupCode] === 1
        )
    }

    return result
}

