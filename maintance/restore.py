import requests
import json
from os.path import join

SERVER_API = "http://localhost:8000"


def create_document(document):
    headers = {
        'Content-type': 'application/json',
        'Accept': 'application/json'}
    url = "{}/api/documents/".format(SERVER_API)
    r = requests.post(url, data=json.dumps(document), headers=headers)


def create_corpus(corpus):
    headers = {
        'Content-type': 'application/json',
        'Accept': 'application/json'}
    url = "{}/api/corpora/".format(SERVER_API)
    r = requests.post(url, data=json.dumps(corpus), headers=headers)
    corpus_id = r.json()["id"]
    for document in item["documents"]:
        document["corpus"] = corpus_id
        create_document(document)


if __name__ == '__main__':
    content = open(join("data", "20171017.json"), "r").read()
    corpora = json.loads(content)
    for item in corpora:
        create_corpus(item)
