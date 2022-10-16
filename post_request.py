import requests
import json
from datetime import date

new_comment = {
  id : 0, 
  author : "lyna", 
  comment_data : 'hihi', 
  time_posted : , 
  num_likes INT, 
  num_dislikes INT,
  group_time INT
}


response = requests.post('http://127.0.0.1:5000', json = new_airbnb)

print(json.dumps(response.json(), indent=2))
