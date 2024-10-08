from bs4 import BeautifulSoup
import requests
import json
import sys

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0',
    'cookie': 'Country=GR'
}

# Get all event info from the main tickets page
def get_main_page_event_info():
    
    url = 'https://www.more.com/en/tickets/'
    soup = BeautifulSoup(requests.get(url, headers=headers).text, 'html.parser')
    event_info = []
    div = soup.find('div', id='play_results')

    
    if div:
        articles = div.find_all('article')

        for article_tag in articles:
            description = article_tag.find('meta', attrs={'itemprop': 'description'}).get('content')
            event_group_code = article_tag['data-code']
            event_date_tag = article_tag.find('time')
            event_date = event_date_tag.get_text(strip=True)
            a_tag = article_tag.find('a', id="ItemLink")
            playinfo = a_tag.find(class_="playinfo")
            playinfo_venue = playinfo.find(class_="playinfo__venue")
            venue_span = playinfo_venue.find("span").get_text(strip=True)
            event_title_tag = playinfo.find('h3')    
            event_url = a_tag['href'] if a_tag else None
            event_title = event_title_tag.get_text(strip=True)
            aside_tag = article_tag.find('aside')
            img_tag = aside_tag.find('img') if aside_tag else None
            event_thumbnail_url = img_tag['data-original'] if img_tag else None # 'src' is the relative path, while 'data-original' is the absolute path with a starting width, that can be modified.
            
            info = {
                'event_url': event_url,
                'event_title': event_title,
                'event_location': venue_span,
                'event_description': description,
                'event_date': event_date,
                'event_thumbnail_url': event_thumbnail_url,
                'event_group_code': event_group_code
            }
            
            result = get_event_info(info)
            result['venue'] = get_venue_info(info)
            
            
            event_info.append(result)
    
    return event_info



def get_event_and_venue_info(info):

    event_url = 'https://www.more.com/_api/playdetails/getevents?eventGroupCode=' + info.get('event_group_code') # Avoids KeyError
    raw_data = requests.get(event_url, headers=headers).json()[0] # Dictionary inside a list
    
    filtered_info = {
        # 'event_id': raw_data['eventId'],
        'duration': raw_data['duration'],
        'venue_name': raw_data['venueName'],
        'venue_id': raw_data['venueId'],
        'latitude': float(raw_data['venueLatitude'].replace(",", ".")),
        'longitude': float(raw_data['venueLongitude'].replace(",", ".")),
        'producer_name': raw_data['producerName']
    }

    return filtered_info

def get_event_info(info):
    filtered_info = get_event_and_venue_info(info)
    return {
        # "event_id": filtered_info["event_id"],
        "event_group_code": info['event_group_code'],
        "event_url": info["event_url"],
        "duration": filtered_info["duration"],
        "producer_name": filtered_info["producer_name"],
        "event_title": info['event_title'],
        "event_location": info['event_location'],
        "event_description": info['event_description'],
        "event_date": info['event_date'],
        "event_thumbnail_url": info['event_thumbnail_url'],
    }
    
    
def get_venue_info(info):
    filtered_info = get_event_and_venue_info(info)
    return {
        "venue_name": filtered_info["venue_name"],
        "venue_id": filtered_info["venue_id"],
        "latitude": filtered_info["latitude"],
        "longitude": filtered_info["longitude"]
    }
        


def main():
    main_page_event_info = get_main_page_event_info()
    return main_page_event_info
    # get_event_info(main_page_event_info, flush=True)
    



if __name__ == "__main__":
    a = main()
    json.dump(a, sys.stdout, ensure_ascii=False)
    # print(a) Will force a timeout, really slow


# TODO : Split into sub-scripts to extract data separately, in order to achieve better error handling