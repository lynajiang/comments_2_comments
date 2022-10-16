import requests
import json
from datetime import date

new_comment_1 = {
  'author' : 'lyna', 
  'comment_data' : 'hihi', 
  'time_posted' : date.min.isoformat(), 
  'num_likes' : 5, 
  'num_dislikes' : 7,
  'group_time' : 4
}

new_comment_2 = {
  'author' : 'anjo', 
  'comment_data' : 'byebye', 
  'time_posted' : time.time(), 
  'num_likes' : 1, 
  'num_dislikes' : 100000,
  'group_time' : 8
}


response_1 = requests.post('http://127.0.0.1:5646', json = new_comment_1)
response_2 = requests.post('http://127.0.0.1:5646', json = new_comment_2)

print(json.dumps(response_1.json(), indent=2))
print(json.dumps(response_2.json(), indent=2))

