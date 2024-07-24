from bs4 import BeautifulSoup
import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0'
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
            event_group_code = article_tag['data-code']
            event_date_tag = article_tag.find('time')
            event_date = event_date_tag.get_text(strip=True)
            a_tag = article_tag.find('a', id="ItemLink")
            playinfo = a_tag.find(class_="playinfo")
            event_title_tag = playinfo.find('h3')    
            event_url = a_tag['href'] if a_tag else 'No URL'
            event_title = event_title_tag.get_text(strip=True)
            aside_tag = article_tag.find('aside')
            img_tag = aside_tag.find('img') if aside_tag else None
            event_thumbnail_url = img_tag['data-original'] if img_tag else None # 'src' is the relative path, while 'data-original' is the absolute path with a starting width, that can be modified.
            
            info = {
                'event_url': event_url,
                'event_title': event_title,
                'event_date': event_date,
                'event_thumbnail_url': event_thumbnail_url,
                'event_group_code': event_group_code
            }
            
            event_info.append(info)
    
    return event_info


# Get info for every event in the main page
def get_event_info(info):
    event_info = []
    for event in info:
        event_url = 'https://www.more.com/_api/playdetails/getevents?eventGroupCode=' + event.get('event_group_code') # Avoids KeyError
        raw_data = requests.get(event_url, headers=headers).json()[0] # Dictionary inside a list
        
        filtered_info = {
            'event_id': raw_data['eventId'],
            'duration': raw_data['duration'],
            'latitude': raw_data['venueLatitude'],
            'longtitude': raw_data['venueLongitude'],
            'producer_name': raw_data['producerName']
        }

        event_info.append(filtered_info)
        
            
    return event_info #Really slow
        


def main():
    main_page_event_info = get_main_page_event_info()
    get_event_info(main_page_event_info, flush=True)
    



if __name__ == "__main__":
    a = main()
    # print(a) Will force a timeout, really slow


# TODO : Split into sub-scripts to extract data separately, in order to achieve better error handling