## Project Requirements

|                 **Feature**                	| **Data/Service Required**                                                 	|
|:------------------------------------------:	|---------------------------------------------------------------------------	|
| Events pinned on map                       	| venueLatitude, venueLongitude, OpenLayers library (map interaction)       	|
| Event info when pin is clicked             	| eventTitle, duration, thumbnail_url, *eventGroupCode*, producerName, date 	|
| Link to book a ticket                      	| event_url, *eventGroupCode*                                               	|
| User's own location relative to the events 	| GeolocationAPI(js), IP-Based Geolocation Service (Fallback)               	|
|                                            	|                              

## Notes

1. If multiple events are located in the same pin, give the user a list with the names and respective dates of the events for him to choose.