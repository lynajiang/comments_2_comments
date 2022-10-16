import time
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

url = 'https://www.hulu.com/watch/e3e44e69-6b56-44e9-b083-cbcb7c9730a5'
xpath = '//*[@id="web-player-app"]/div[6]/div[3]/div/div[1]/div[2]/div[2]'

def familyGuyTime():
    driver = webdriver.Chrome(executable_path=ChromeDriverManager().install())
    driver.get(url)
    driver.find_element_by_xpath(xpath)
    


