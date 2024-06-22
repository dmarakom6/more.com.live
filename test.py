from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import json

# Enable browser logging
d = DesiredCapabilities.CHROME
d['goog:loggingPrefs'] = {'performance': 'ALL'}

# Set up the WebDriver
driver = webdriver.Chrome()

# Open the web page
driver.get('https://www.more.com/music/festival/primer-music-festival-2024/')  # Replace with the target URL

# Get the performance logs
logs = driver.get_log('performance')

# Filter and extract XHR/JSON GET requests
xhr_requests = []
for log in logs:
    log_message = json.loads(log['message'])
    message = log_message['message']
    if message['method'] == 'Network.requestWillBeSent':
        request = message['params']['request']
        if request['method'] == 'GET' and 'json' in request['url']:
            xhr_requests.append(request['url'])

# Print the XHR/JSON GET requests
for request in xhr_requests:
    print(request)

# Close the driver
driver.quit()
