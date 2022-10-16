import time
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

url = "https://www.hulu.com/watch/e3e44e69-6b56-44e9-b083-cbcb7c9730a5"
xpath = ""

def familyGuyTime():
    driver = webdriver.Chrome(executable_path=ChromeDriverManager().install())
    driver.get(url)
    driver.find_element_by_xpath(xpath)
    

