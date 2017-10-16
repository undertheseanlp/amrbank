import requests
import json
from os.path import join

from underthesea.feature_engineering.text import Text
from underthesea.util.file_io import write

url = "http://localhost:8000/api/corpora/"
headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'}
r = requests.get(url, headers=headers)
content = Text(json.dumps(r.json(), ensure_ascii=False))
write(join("data", "20171016.json"), content)
