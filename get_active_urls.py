from requests_html import HTMLSession
from bs4 import BeautifulSoup
import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0'
}

# Get all event info from the main tickets page
def get_event_info():
    
    url = 'https://www.more.com/en/tickets/'
    session = HTMLSession()
    response = session.get(url, headers=headers)
    soup = BeautifulSoup(response.html.html, 'html.parser')
    event_info = []

    div = soup.find('div', id='play_results')
    
    if div:
        links = div.find_all('a', href=True)
         
        for link in links:
            event_title = link.find('h3').get_text(strip=True) if link and link.find('h3') else 'No Title'
            event_date = link.find('time').get_text(strip=True) if link and link.find('time') else 'No Date'
            article_tag = div.find('article')
            a_tag = article_tag.find('a', id="ItemLink")
            aside_tag = a_tag.find('aside')
            img_tag = aside_tag.find('img')
            event_thumbnail_url = img_tag['src']
            
            
            
            info = {'event_url': link['href'], 'event_title':event_title, 'event_date': event_date, 'event_thumbnail_url': event_thumbnail_url}
            
            
            event_info.append(info)
    
    return event_info


# Extract eventGroupCode from an event page
def get_event_group_code(event_url):
    response = requests.get(event_url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    for i in soup.find_all('script'):
        if i.get('src'):
            pass #TODO: FIND AND RETURN eventGroupCode


def main():
    event_group_codes = []
    event_info = get_event_info()
    print(event_info)
    pass
    # for event_link in event_info:
    #     event_url = f'https://www.more.com{event_link}'
    #     print(get_event_links())
        # print(event_url)
        # event_group_code = get_event_group_code(event_url)
        # print(event_group_code)
        # event_group_codes.append(event_group_code)
        
    return event_group_codes




if __name__ == "__main__":
    a = main()
    print(a)
