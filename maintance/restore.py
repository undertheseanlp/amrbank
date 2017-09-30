import requests
import json

from os.path import join

content = open(join("backup", "20170930.json"), "r").read()
data = json.loads(content)
for item in data:
    url = "http://localhost:8000/api/tasks/"
    data = item
    headers = {
        'Content-type': 'application/json',
        'Accept': 'application/json'}
    r = requests.post(url, data=json.dumps(data), headers=headers)
    print(0)
print(0)